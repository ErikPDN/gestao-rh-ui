import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface DepartmentData {
  name: string
  value: number
}

const data: DepartmentData[] = [
  { name: 'Tecnologia da Informação', value: 6 },
  { name: 'Comercial', value: 4 },
  { name: 'Recursos Humanos', value: 3 },
  { name: 'Financeiro', value: 3 },
]

export const DashboardChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={150}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 13, fill: '#3f3f46' }}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16} fill="#2563eb">
          <LabelList dataKey="value" position="right" style={{ fontSize: 13, fill: '#3f3f46' }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
