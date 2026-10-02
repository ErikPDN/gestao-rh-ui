import { useMemo, useState } from 'react'

interface Named {
  nome: string
  cpfCnpj?: string
}

export function useSearch<T extends Named>(items: T[]) {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredItems = useMemo(() => {
    if (!items || !searchTerm.trim()) return items

    const normalizedSearchTerm = searchTerm.trim().toLowerCase()
    return items.filter((item) => {
      const normalizedNome = item.nome.toLowerCase()
      const normalizedCpfCnpj = item.cpfCnpj?.toLowerCase()
      return (
        normalizedNome.includes(normalizedSearchTerm) ||
        normalizedCpfCnpj?.includes(normalizedSearchTerm)
      )
    })
  }, [items, searchTerm])

  return { onSearch: setSearchTerm, filteredItems }
}
