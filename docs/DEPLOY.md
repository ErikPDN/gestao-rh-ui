# Deploy do frontend (Cloud Run)

Este guia descreve como publicar o frontend do Nexo no Google Cloud Run. O deploy do backend (gateway e microsserviços) está documentado no repositório [`gestao-rh`](../../gestao-rh).

## Como funciona

O frontend é servido por um container nginx que também atua como proxy reverso para o gateway. O navegador só conversa com uma origem (o front); tudo que começa com `/api/` é repassado ao gateway.

```
Navegador ──► Cloud Run: frontend (nginx) ──┬─► /*      arquivos estáticos (SPA)
                                            └─► /api/*  ──► Cloud Run: api-gateway
```

Por que assim:

- **Mesma origem**: o cookie de refresh usa `sameSite: 'strict'`, que só funciona se o navegador falar com uma única origem.
- **Sem URL fixa na imagem**: a URL do gateway entra por variável de ambiente na subida do container.

### Arquivos envolvidos

| Arquivo                                  | Papel                                                                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`Dockerfile`](../Dockerfile)            | Build em duas etapas: Node gera o `dist/`, nginx serve os arquivos                                    |
| [`nginx.conf`](../nginx.conf)            | Template do nginx: fallback de SPA, cache de `/assets/` e proxy de `/api/`                            |
| [`infra/deploy.sh`](../infra/deploy.sh)  | Build, push da imagem e deploy no Cloud Run                                                           |

### Variáveis

| Variável        | Quando é usada                | Valor em produção                                                  |
| --------------- | ----------------------------- | ------------------------------------------------------------------ |
| `VITE_API_URL`  | **Build** da imagem (`--build-arg`) | `/api` (relativa, passa pelo proxy do nginx)                 |
| `GATEWAY_HOST`  | **Execução** do container     | URL do gateway **sem** `https://` (ex.: `api-gateway-xxxx-uc.a.run.app`) |

A `VITE_API_URL` é embutida no JavaScript durante o build, então trocá-la exige gerar uma nova imagem. Já o `GATEWAY_HOST` é lido quando o container sobe: a imagem do nginx aplica `envsubst` nos arquivos de `/etc/nginx/templates/` e gera o `default.conf` final.

### O bloco `/api/` do nginx

```nginx
location /api/ {
    proxy_pass https://${GATEWAY_HOST}/;
    proxy_ssl_server_name on;
    proxy_set_header Host ${GATEWAY_HOST};
    proxy_cookie_path /auth /api/auth;
}
```

- **Barra final no `proxy_pass`**: remove o prefixo, então `/api/auth/login` chega ao gateway como `/auth/login`.
- **`proxy_ssl_server_name` e `Host`**: o Cloud Run exige os dois para aceitar a conexão HTTPS.
- **`proxy_cookie_path`**: o gateway grava o cookie de refresh com `path=/auth`; o navegador chama `/api/auth/refresh`, e sem essa linha o cookie não seria enviado.

## Pré-requisitos

- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) (`gcloud`) autenticado no projeto
- Docker
- Repositório Docker no Artifact Registry. O script faz o push, mas não o cria:

  ```bash
  gcloud artifacts repositories create gestao-rh \
    --repository-format=docker --location=us-central1 --project sd-ufg-2026
  ```

- Autenticação do Docker no Artifact Registry (uma vez por máquina):

  ```bash
  gcloud auth configure-docker us-central1-docker.pkg.dev
  ```

- **Gateway já publicado** como serviço `api-gateway` na mesma região, com acesso público (`--allow-unauthenticated`). O nginx chama o gateway sem token do Google; a proteção é o JWT do próprio gateway.

## Ordem do deploy

1. **Gateway** (backend)
2. **Frontend**
3. **`FRONTEND_URL` do gateway**: atualizar com a URL pública do front

A ordem importa. O nginx resolve o `GATEWAY_HOST` ao iniciar, então o container do front não sobe se o gateway não existir. E o `OriginGuard` do gateway (refresh e logout) compara o header `Origin` do navegador com o `FRONTEND_URL`, que só é conhecido depois que o front é publicado.

## Publicar o frontend

Na raiz do projeto, com as mudanças commitadas (a tag da imagem vem do commit atual):

```bash
bash infra/deploy.sh
```

O script, em ordem:

1. Descobre o `GATEWAY_HOST` consultando a URL do serviço `api-gateway` no Cloud Run
2. Gera a imagem com `VITE_API_URL=/api`, com tag `<registry>/frontend:<hash-do-commit>`
3. Envia a imagem ao Artifact Registry
4. Publica o serviço `frontend` com `GATEWAY_HOST` como variável de ambiente

Ao final ele imprime a **Service URL**. Para consultá-la depois:

```bash
gcloud run services describe frontend \
  --region us-central1 --project sd-ufg-2026 --format='value(status.url)'
```

### Configurar o gateway

Passe a URL do front para o backend definir o `FRONTEND_URL` do gateway. O valor precisa ser **idêntico** à origem usada no navegador, caractere por caractere. O Cloud Run pode expor mais de um formato de URL para o mesmo serviço; use o valor de `status.url` e acesse o front por ele.

## Verificação

**1. Front no ar**

```bash
curl -i https://<url-do-front>/
```

Deve responder `200` com o HTML do app.

**2. Proxy chegando ao gateway**

```bash
curl -i -X POST https://<url-do-front>/api/auth/refresh
```

Deve responder `403` em JSON, vindo do gateway: o `curl` não envia `Origin`, e o guard rejeita. Um `502`/`504` indica falha de conexão com o gateway; um `404` em HTML do nginx indica que o bloco `/api/` não está ativo.

**3. Origem aceita pelo guard**

```bash
curl -i -X POST -H 'Origin: https://<url-do-front>' https://<url-do-front>/api/auth/refresh
```

`401` (sem cookie) indica que o `FRONTEND_URL` do gateway está correto. `403` indica que ele não bate com a URL do front.

**4. No navegador**

1. Faça login e confira, na aba Network, que as chamadas vão para `/api/...` na mesma origem.
2. Em Application → Cookies, o cookie de refresh deve ter path `/api/auth`.
3. Depois que o access token expirar, `/api/auth/refresh` deve responder `200`.

## Testar a imagem localmente

Valida a geração e a sintaxe da configuração do nginx a partir do template (não testa o fluxo real com o gateway):

```bash
docker build --build-arg VITE_API_URL=/api -t gestao-rh-front:test .
docker run --rm -e GATEWAY_HOST=example.com gestao-rh-front:test nginx -t
```

Deve aparecer `syntax is ok` e `test is successful`. O nginx resolve o host ao carregar a configuração, então use um host que exista e mantenha acesso à internet.

Para ver o bloco `/api/` já com a variável substituída:

```bash
docker run --rm -e GATEWAY_HOST=example.com gestao-rh-front:test nginx -T 2>&1 | grep -A8 "location /api/"
```

> Use `nginx -T`, e não `sh -c 'cat ...'`: o entrypoint da imagem só processa os templates quando o comando é `nginx`.

## Problemas comuns

| Sintoma                                                       | Causa provável                                                             | O que fazer                                                                  |
| ------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Container do front não sobe (`host not found in upstream`)    | O gateway não existe ou `GATEWAY_HOST` está errado                         | Publique o gateway primeiro; confira a variável                              |
| `502`/`504` em `/api/*`                                       | `GATEWAY_HOST` com `https://` ou sem `proxy_ssl_server_name`/`Host`        | Use só o host; revise o bloco `/api/`                                        |
| `403` no refresh/logout pelo navegador                        | `FRONTEND_URL` do gateway diferente da origem do navegador                 | Alinhe com o `status.url` do front e acesse por essa URL                     |
| Refresh falha e o cookie não é enviado                        | Falta o `proxy_cookie_path` ou a origem não é a mesma                      | Confira o path do cookie (`/api/auth`) e a origem                            |
| `docker build` falha com `failed to read dockerfile`          | Script rodado com outro contexto de build                                  | Use `bash infra/deploy.sh` (ele já muda para a raiz do projeto)              |
| `docker push` negado                                          | Docker sem autenticação no Artifact Registry                               | `gcloud auth configure-docker us-central1-docker.pkg.dev`                    |
| Chamadas da API vão para `localhost:3001` em produção         | A imagem foi gerada sem `VITE_API_URL=/api`                                | Gere nova imagem com o build arg (a variável é embutida no build)            |

Logs do serviço:

```bash
gcloud run services logs read frontend --region us-central1 --project sd-ufg-2026
```
