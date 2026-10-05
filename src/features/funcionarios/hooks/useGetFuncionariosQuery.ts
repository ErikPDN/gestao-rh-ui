import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getFuncionarios, type GetFuncionariosParams } from '../api'

export const useGetFuncionariosQuery = (params: GetFuncionariosParams = {}) => {
  return useQuery({
    queryKey: ['funcionarios', params],
    queryFn: () => getFuncionarios(params),
    placeholderData: keepPreviousData, // evita que a tela fique piscando quando o usuário muda de página, mantendo os dados da página anterior até que os novos dados sejam carregados
    retry: false,
  })
}
