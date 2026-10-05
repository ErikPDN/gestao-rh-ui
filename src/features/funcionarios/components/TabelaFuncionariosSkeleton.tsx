const larguras = ['w-[55%]', 'w-24', 'w-[70%]', 'w-20']

export const TabelaFuncionariosSkeleton = () => (
  <div className="">
    <div className="h-11 border-b border-zinc-200 bg-zinc-100" />
    <table className="w-full table-fixed">
      <tbody>
        {Array.from({ length: 6 }, (_, i) => (
          <tr key={i} className="border-b border-zinc-200 last:border-b-0">
            {larguras.map((w, j) => (
              <td key={j} className="px-5 py-5">
                <div
                  className={`h-2.5 animate-pulse rounded-full bg-zinc-200 ${w} ${
                    j === larguras.length - 1 ? 'ml-auto' : ''
                  }`}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
