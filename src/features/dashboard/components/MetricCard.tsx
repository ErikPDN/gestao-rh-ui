interface MetricCardProps {
  label: string
  value: string
  helperText?: string
}

export const MetricCard = ({ label, value, helperText }: MetricCardProps) => {
  return (
    <div className="bg-background rounded-lg border border-zinc-300 p-5">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-zinc-400">{helperText}</p>
    </div>
  )
}
