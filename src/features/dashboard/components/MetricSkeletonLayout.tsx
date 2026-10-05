import { MetricSkeletonCard } from './MetricSkeletonCard'

export const MetricSkeletonLayout = () => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricSkeletonCard />
      <MetricSkeletonCard />
      <MetricSkeletonCard />
      <MetricSkeletonCard />
    </div>
  )
}
