export const MetricSkeletonCard = () => {
  return (
    <div className="bg-background space-y-2 rounded-lg border border-zinc-300 p-5">
      <div className="skeleton-pulse h-4 max-w-32 rounded-md bg-zinc-200" />
      <div className="skeleton-pulse h-6 max-w-22 rounded-md bg-zinc-200" />
      <div className="skeleton-pulse h-4 max-w-40 rounded-md bg-zinc-200" />
    </div>
  )
}
