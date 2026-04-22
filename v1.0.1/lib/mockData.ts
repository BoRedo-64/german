// Mock data for the German learning platform

export interface Course {
  id: string
  title: string
  description: string
  level: string
  lessonsCount: number
  icon: string
  progress: number
  color: string
}

export interface Exercise {
  id: string
  title: string
  level: string
  type: 'quiz' | 'listening' | 'writing' | 'speaking'
  icon: string
}

export interface Level {
  code: string
  title: string
  description: string
}

export interface User {
  id: string
  name: string
  level: string
  streakDays: number
  correctAnswers: number
  lessonsDone: number
}

export interface Meeting {
  id: string
  title: string
  date: string
  link: string
  participants: number
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'German Basics',
    description: 'Learn the fundamentals of German grammar and vocabulary',
    level: 'A1',
    lessonsCount: 24,
    icon: '📚',
    progress: 65,
    color: 'bg-blue-100',
  },
  {
    id: '2',
    title: 'Phrases & Expressions',
    description: 'Master common German phrases for everyday conversations',
    level: 'A1-A2',
    lessonsCount: 18,
    icon: '💬',
    progress: 40,
    color: 'bg-yellow-100',
  },
  {
    id: '3',
    title: 'Grammar',
    description: 'Deep dive into German grammar rules and sentence structure',
    level: 'A2-B1',
    lessonsCount: 32,
    icon: '✏️',
    progress: 25,
    color: 'bg-green-100',
  },
  {
    id: '4',
    title: 'Conversational German',
    description: 'Practice speaking and understanding conversations',
    level: 'B1-B2',
    lessonsCount: 28,
    icon: '🎤',
    progress: 10,
    color: 'bg-purple-100',
  },
  {
    id: '5',
    title: 'Advanced Vocabulary',
    description: 'Expand your German vocabulary with advanced topics',
    level: 'B2-C1',
    lessonsCount: 40,
    icon: '📖',
    progress: 0,
    color: 'bg-pink-100',
  },
  {
    id: '6',
    title: 'Business German',
    description: 'Learn professional German for business contexts',
    level: 'B2-C2',
    lessonsCount: 26,
    icon: '💼',
    progress: 0,
    color: 'bg-indigo-100',
  },
]

export const mockExercises: Exercise[] = [
  {
    id: '1',
    title: 'Vocabulary Quiz',
    level: 'A1',
    type: 'quiz',
    icon: '❓',
  },
  {
    id: '2',
    title: 'Listening Practice',
    level: 'A1',
    type: 'listening',
    icon: '🎧',
  },
  {
    id: '3',
    title: 'Writing Exercise',
    level: 'A2',
    type: 'writing',
    icon: '✍️',
  },
  {
    id: '4',
    title: 'Speaking Challenge',
    level: 'B1',
    type: 'speaking',
    icon: '🗣️',
  },
  {
    id: '5',
    title: 'Comprehension Test',
    level: 'B2',
    type: 'quiz',
    icon: '📝',
  },
]

export const mockLevels: Level[] = [
  { code: 'A1', title: 'Beginner 1', description: 'Complete beginner' },
  { code: 'A2', title: 'Beginner 2', description: 'Elementary proficiency' },
  { code: 'B1', title: 'Intermediate 1', description: 'Threshold proficiency' },
  { code: 'B2', title: 'Intermediate 2', description: 'Vantage proficiency' },
  { code: 'C1', title: 'Advanced 1', description: 'Effective operational proficiency' },
  { code: 'C2', title: 'Advanced 2', description: 'Mastery proficiency' },
]

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    level: 'B1',
    streakDays: 10,
    correctAnswers: 342,
    lessonsDone: 48,
  },
  {
    id: '2',
    name: 'John Doe',
    level: 'A2',
    streakDays: 7,
    correctAnswers: 156,
    lessonsDone: 24,
  },
  {
    id: '3',
    name: 'Maria Garcia',
    level: 'B2',
    streakDays: 15,
    correctAnswers: 512,
    lessonsDone: 72,
  },
  {
    id: '4',
    name: 'Pierre Martin',
    level: 'A1',
    streakDays: 3,
    correctAnswers: 48,
    lessonsDone: 8,
  },
  {
    id: '5',
    name: 'Emma Wilson',
    level: 'C1',
    streakDays: 21,
    correctAnswers: 784,
    lessonsDone: 120,
  },
]

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'German Conversation Group',
    date: '2024-04-22 18:00',
    link: 'https://meet.example.com/group-1',
    participants: 12,
  },
  {
    id: '2',
    title: 'Grammar Workshop',
    date: '2024-04-23 15:30',
    link: 'https://meet.example.com/grammar',
    participants: 8,
  },
  {
    id: '3',
    title: 'Pronunciation Training',
    date: '2024-04-24 10:00',
    link: 'https://meet.example.com/pronunciation',
    participants: 6,
  },
]

export const currentUser: User = {
  id: 'current',
  name: 'You',
  level: 'A2',
  streakDays: 10,
  correctAnswers: 234,
  lessonsDone: 32,
}
