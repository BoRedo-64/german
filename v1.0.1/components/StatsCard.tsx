import { Progress } from '@/components/ui/progress'

interface ProgressCardProps {
  level: string
  progress: number
  streakDays: number
}

export function ProgressCard({
  level,
  progress,
  streakDays,
}: ProgressCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-soft">
      <h3 className="text-lg font-bold text-foreground mb-4">Your Progress</h3>

      <div className="space-y-6">
        {/* Level Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Current Level</span>
            <span className="text-xl font-bold text-primary">{level}</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Streak Section */}
        <div className="flex items-center gap-3 bg-white rounded-lg p-4">
          <div className="text-4xl">🔥</div>
          <div>
            <div className="text-2xl font-bold text-accent">{streakDays}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: string
  title: string
  value: string | number
  bgColor?: string
}

export function StatCard({
  icon,
  title,
  value,
  bgColor = 'bg-gradient-to-br from-yellow-50 to-yellow-100',
}: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-soft`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}

interface ExerciseCardProps {
  title: string
  icon: string
  level: string
}

export function ExerciseCard({ title, icon, level }: ExerciseCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-border hover:shadow-md hover:scale-105 transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground">{level}</p>
        </div>
      </div>
    </div>
  )
}
