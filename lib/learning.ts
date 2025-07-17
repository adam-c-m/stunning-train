export interface VideoBookmark {
  id: string
  videoId: string
  userId: string
  timestamp: number
  title: string
  note?: string
  createdAt: string
}

export interface KeyTakeaway {
  id: string
  videoId: string
  userId: string
  content: string
  timestamp?: number
  likes: number
  createdAt: string
  author: {
    name: string
    avatar: string
    level: number
  }
}

export interface VideoProgress {
  id: string
  videoId: string
  userId: string
  watchedDuration: number
  totalDuration: number
  completed: boolean
  lastWatchedAt: string
  completedAt?: string
}

export interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  level: "beginner" | "intermediate" | "advanced"
  estimatedHours: number
  videos: string[]
  prerequisites?: string[]
  skills: string[]
  progress: {
    completed: number
    total: number
    currentVideo?: string
  }
}

export const formatTimestamp = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`
}

export const formatDuration = (seconds: number): string => {
  return formatTimestamp(seconds)
}

// Mock data
export const mockBookmarks: VideoBookmark[] = [
  {
    id: "1",
    videoId: "1",
    userId: "current-user",
    timestamp: 1245,
    title: "Key Leadership Principles",
    note: "Important framework for digital leadership",
    createdAt: "2024-01-28",
  },
  {
    id: "2",
    videoId: "1",
    userId: "current-user",
    timestamp: 2100,
    title: "Cultural Change Strategy",
    createdAt: "2024-01-28",
  },
]

export const mockTakeaways: KeyTakeaway[] = [
  {
    id: "1",
    videoId: "1",
    userId: "user-1",
    content:
      "The most important aspect of transformational leadership is creating a compelling vision that inspires others to achieve more than they thought possible.",
    timestamp: 1500,
    likes: 12,
    createdAt: "2024-01-28",
    author: {
      name: "Sarah Johnson",
      avatar: "SJ",
      level: 8,
    },
  },
  {
    id: "2",
    videoId: "1",
    userId: "user-2",
    content: "Digital transformation is 20% technology and 80% people. Focus on the human element first.",
    timestamp: 2200,
    likes: 8,
    createdAt: "2024-01-27",
    author: {
      name: "Mike Chen",
      avatar: "MC",
      level: 6,
    },
  },
]

export const mockProgress: VideoProgress[] = [
  {
    id: "1",
    videoId: "1",
    userId: "current-user",
    watchedDuration: 1800,
    totalDuration: 2730,
    completed: false,
    lastWatchedAt: "2024-01-28T15:30:00Z",
  },
]

export const mockLearningPaths: LearningPath[] = [
  {
    id: "1",
    title: "Leadership Fundamentals",
    description: "Master the core principles of effective leadership in modern organizations",
    category: "Leadership",
    level: "beginner",
    estimatedHours: 12,
    videos: ["1", "2", "3", "4"],
    skills: ["Communication", "Team Management", "Decision Making"],
    progress: {
      completed: 1,
      total: 4,
      currentVideo: "2",
    },
  },
  {
    id: "2",
    title: "Strategic Planning Mastery",
    description: "Learn to develop and execute winning business strategies",
    category: "Strategy",
    level: "intermediate",
    estimatedHours: 18,
    videos: ["5", "6", "7", "8", "9"],
    prerequisites: ["1"],
    skills: ["Strategic Thinking", "Analysis", "Planning"],
    progress: {
      completed: 0,
      total: 5,
    },
  },
]
