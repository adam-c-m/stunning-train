export interface VideoNote {
  id: string
  videoId: string
  userId: string
  content: string
  timestamp: number
  tags: string[]
  isPrivate: boolean
  createdAt: string
  updatedAt?: string
}

export interface LearningAnalytics {
  userId: string
  totalWatchTime: number
  videosCompleted: number
  currentStreak: number
  longestStreak: number
  skillLevels: {
    leadership: number
    strategy: number
    skills: number
  }
  weeklyProgress: Array<{
    week: string
    watchTime: number
    videosCompleted: number
  }>
  goals: Array<{
    id: string
    title: string
    target: number
    current: number
    deadline: string
    type: "videos" | "hours" | "skills"
  }>
  insights: Array<{
    type: "recommendation" | "achievement" | "warning"
    title: string
    description: string
    actionUrl?: string
  }>
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

/**
 * Map minutes-spent to a skill level and a descriptive title.
 *  • 0 – 119 min  → Level 1  (Beginner)
 *  • 120 – 299 min → Level 2  (Developing)
 *  • 300 – 599 min → Level 3  (Proficient)
 *  • 600 – 999 min → Level 4  (Advanced)
 *  • ≥ 1000 min    → Level 5  (Expert)
 */
export function getSkillLevel(timeSpent: number): { level: number; title: string } {
  if (timeSpent < 120) return { level: 1, title: "Beginner" }
  if (timeSpent < 300) return { level: 2, title: "Developing" }
  if (timeSpent < 600) return { level: 3, title: "Proficient" }
  if (timeSpent < 1000) return { level: 4, title: "Advanced" }
  return { level: 5, title: "Expert" }
}

// Mock data
export const mockVideoNotes: VideoNote[] = [
  {
    id: "1",
    videoId: "1",
    userId: "current-user",
    content:
      "Key insight about transformational leadership - focus on vision, inspiration, and individual consideration.",
    timestamp: 1245,
    tags: ["leadership", "framework", "important"],
    isPrivate: true,
    createdAt: "2024-01-28T10:30:00Z",
  },
  {
    id: "2",
    videoId: "1",
    userId: "current-user",
    content: "Digital transformation requires cultural change first, then technology implementation.",
    timestamp: 2100,
    tags: ["digital-transformation", "culture"],
    isPrivate: false,
    createdAt: "2024-01-28T10:45:00Z",
  },
]

export const mockAnalytics: LearningAnalytics = {
  userId: "current-user",
  totalWatchTime: 12450,
  videosCompleted: 8,
  currentStreak: 5,
  longestStreak: 12,
  skillLevels: {
    leadership: 75,
    strategy: 60,
    skills: 45,
  },
  weeklyProgress: [
    { week: "Week 1", watchTime: 180, videosCompleted: 2 },
    { week: "Week 2", watchTime: 240, videosCompleted: 3 },
    { week: "Week 3", watchTime: 300, videosCompleted: 2 },
    { week: "Week 4", watchTime: 420, videosCompleted: 4 },
  ],
  goals: [
    {
      id: "1",
      title: "Complete 10 Leadership Videos",
      target: 10,
      current: 7,
      deadline: "2024-02-15",
      type: "videos",
    },
    {
      id: "2",
      title: "Watch 20 Hours This Month",
      target: 20,
      current: 12.5,
      deadline: "2024-01-31",
      type: "hours",
    },
  ],
  insights: [
    {
      type: "recommendation",
      title: "Recommended: Strategic Planning Fundamentals",
      description: "Based on your learning pattern, this course aligns with your interests.",
      actionUrl: "/training/3",
    },
    {
      type: "achievement",
      title: "Congratulations! 5-day streak achieved",
      description: "You've maintained consistent learning for 5 days straight.",
    },
    {
      type: "warning",
      title: "Goal deadline approaching",
      description: "Your monthly watch time goal deadline is in 3 days.",
    },
  ],
}
