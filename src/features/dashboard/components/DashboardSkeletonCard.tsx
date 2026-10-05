export const DashboardSkeletonCard = () => {
  return (
    <div className="bg-background space-y-2 rounded-lg border border-zinc-300 p-5">
      <div className="skeleton-pulse mb-6 h-4 w-56 rounded-md bg-zinc-200" />
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex items-center justify-between gap-4" key={index}>
          <div className="skeleton-pulse h-4 w-44 rounded-md bg-zinc-200" />
          <div key={index} className="skeleton-pulse h-4 w-full rounded-md bg-zinc-200" />
        </div>
      ))}
    </div>
  )
}
