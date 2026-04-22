import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

interface CourseCardProps {
  id: string
  title: string
  icon: string
  level: string
  lessonsCount: number
  progress: number
  color: string
}

export function CourseCard({
  id,
  title,
  icon,
  level,
  lessonsCount,
  progress,
  color,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group cursor-pointer h-full">
        <div
          className={`${color} rounded-xl p-6 h-full flex flex-col gap-4 transition-all hover:shadow-md hover:scale-105 hover:-translate-y-1`}
        >
          {/* Icon and Level */}
          <div className="flex items-start justify-between">
            <div className="text-4xl">{icon}</div>
            <div className="px-3 py-1 bg-white/70 rounded-full text-xs font-semibold text-primary">
              {level}
            </div>
          </div>

          {/* Title */}
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-foreground/70">
              <span>{lessonsCount} lessons</span>
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* CTA */}
          <Button
            variant="default"
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg"
            size="sm"
          >
            Continue →
          </Button>
        </div>
      </div>
    </Link>
  )
}
