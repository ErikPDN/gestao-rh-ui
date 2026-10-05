import { DashboardSkeletonCard } from './DashboardSkeletonCard'

export const DashboardSkeleton = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <DashboardSkeletonCard />
      <DashboardSkeletonCard />
    </div>
  )
}
