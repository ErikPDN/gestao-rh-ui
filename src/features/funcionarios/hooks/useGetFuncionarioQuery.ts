import { useQuery } from '@tanstack/react-query'
import { getFuncionario } from '../api'

export const useGetFuncionarioQuery = (funcionarioId: string) => {
  return useQuery({
    queryKey: ['funcionario', funcionarioId],
    queryFn: () => getFuncionario(funcionarioId),
    enabled: !!funcionarioId,
    retry: false,
  })
}
