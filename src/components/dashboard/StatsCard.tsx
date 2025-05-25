import Card from '../ui/Card'

interface StatsCardProps {
  value: string | number
  label: string
  color?: 'blue' | 'green' | 'purple' | 'yellow'
}

export default function StatsCard({ value, label, color = 'blue' }: StatsCardProps) {
  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400',
  }

  return (
    <Card variant="stats">
      <div className={`text-3xl font-bold ${colorClasses[color]} mb-2`}>
        {value}
      </div>
      <div className="text-slate-400">
        {label}
      </div>
    </Card>
  )
}