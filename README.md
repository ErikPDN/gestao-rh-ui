# Nexo — Gestão de RH (Frontend)

Interface web do sistema de gestão de recursos humanos, desenvolvida para a disciplina de Sistemas Distribuídos 2 (UFG). Consome a API do repositório [`gestao-rh`](../gestao-rh) e permite gerenciar funcionários e departamentos, além de acompanhar indicadores do quadro de pessoal em um dashboard.

## Funcionalidades

- **Autenticação**: login e logout com confirmação, renovação de sessão via refresh token e rotas protegidas com redirecionamento para a página de origem após o login.
- **Dashboard**: métricas de funcionários e departamentos, folha salarial mensal, admissões recentes e distribuição de funcionários por departamento (gráficos).
- **Funcionários**: listagem paginada com busca e filtro por status, cadastro com validação (CPF/CNPJ, datas, salário) e página de detalhes.
- **Departamentos**: listagem paginada com busca e filtro por status, cadastro via modal e página de detalhes.
- **Feedback ao usuário**: notificações (toasts) de sucesso e erro nas operações.

## Stack

| Área                  | Tecnologias                                           |
| --------------------- | ----------------------------------------------------- |
| Base                  | React 19, TypeScript, Vite                            |
| Roteamento            | React Router                                          |
| Dados do servidor     | TanStack Query, Axios                                 |
| Estado global         | Zustand (sessão de autenticação)                      |
| Formulários/validação | React Hook Form, Zod, Brazilian Utils                 |
| UI                    | Tailwind CSS, Lucide, Framer Motion, Recharts, Sonner |
| Qualidade             | Oxlint, Prettier (com `prettier-plugin-tailwindcss`)  |

## Pré-requisitos

- [Node.js](https://nodejs.org) (versão LTS recomendada)
- [pnpm](https://pnpm.io)
- API do `gestao-rh` em execução (por padrão em `http://localhost:3001`)

## Como executar

```bash
# 1. Instalar as dependências
pnpm install

# 2. Criar o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Iniciar o servidor de desenvolvimento
pnpm dev
```

A aplicação ficará disponível em <http://localhost:3000>.

### Variáveis de ambiente

| Variável       | Descrição                  | Exemplo                 |
| -------------- | -------------------------- | ----------------------- |
| `VITE_API_URL` | URL base da API do backend | `http://localhost:3001` |

> As requisições usam `withCredentials: true`, então o backend precisa permitir CORS com credenciais para a origem `http://localhost:3000`.

## Scripts

| Comando             | Descrição                                         |
| ------------------- | ------------------------------------------------- |
| `pnpm dev`          | Inicia o servidor de desenvolvimento (porta 3000) |
| `pnpm build`        | Verifica os tipos (`tsc -b`) e gera o build       |
| `pnpm preview`      | Serve localmente o build de produção              |
| `pnpm lint`         | Executa o Oxlint                                  |
| `pnpm format`       | Formata o código com o Prettier                   |
| `pnpm format:check` | Verifica a formatação sem alterar arquivos        |

## Estrutura do projeto

```
src/
├── app/          # Providers, roteamento e provider de autenticação
├── components/   # Componentes compartilhados entre features
├── constants/    # Constantes globais (ex.: paginação)
├── features/     # Módulos por domínio
│   ├── dashboard/
│   ├── departamentos/
│   ├── funcionarios/
│   └── login/
├── hooks/        # Hooks reutilizáveis (ex.: useDebounce)
├── lib/          # Cliente HTTP, query client e store de autenticação
└── types/        # Tipos compartilhados
```

Cada feature segue, em geral, a mesma organização interna: `api`, `components`, `hooks`, `pages`, `schemas` e `types`.

## Convenções

- **Requisições**: encapsuladas em funções na `api` da feature e consumidas por hooks do TanStack Query (`useQuery`/`useMutation`).
- **Formulários**: React Hook Form com schema Zod em `schemas/`.
- **Notificações**: toasts de sucesso/erro ficam nos hooks de mutation; efeitos de interface, como navegação e fechamento de modal, ficam no componente.
- **Commits**: mensagens no padrão [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, etc.).
- **Formatação**: rode `pnpm format` antes de commitar.
