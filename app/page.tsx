"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Circle, Trophy, Zap, Target, Calendar, Star, Flame } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"

interface Task {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly"
  points: number
  completed: boolean
  category: string
}

interface UserStats {
  level: number
  totalPoints: number
  streak: number
  completedTasks: number
  achievements: string[]
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    // Daily Tasks
    {
      id: "1",
      title: "Review Daily Goals",
      description: "Set and review your top 3 priorities for today",
      type: "daily",
      points: 10,
      completed: false,
      category: "Planning",
    },
    {
      id: "2",
      title: "Network Check-in",
      description: "Reach out to one professional contact",
      type: "daily",
      points: 15,
      completed: false,
      category: "Networking",
    },
    {
      id: "3",
      title: "Skill Development",
      description: "Spend 30 minutes learning something new",
      type: "daily",
      points: 20,
      completed: true,
      category: "Growth",
    },

    // Weekly Tasks
    {
      id: "4",
      title: "Business Plan Review",
      description: "Review and update your business strategy",
      type: "weekly",
      points: 50,
      completed: false,
      category: "Strategy",
    },
    {
      id: "5",
      title: "Financial Analysis",
      description: "Analyze your business metrics and KPIs",
      type: "weekly",
      points: 40,
      completed: false,
      category: "Finance",
    },
    {
      id: "6",
      title: "Team Meeting",
      description: "Conduct weekly team sync and planning",
      type: "weekly",
      points: 30,
      completed: true,
      category: "Leadership",
    },

    // Monthly Tasks
    {
      id: "7",
      title: "Market Research",
      description: "Conduct comprehensive market analysis",
      type: "monthly",
      points: 100,
      completed: false,
      category: "Research",
    },
    {
      id: "8",
      title: "Quarterly Planning",
      description: "Plan next quarter objectives and milestones",
      type: "monthly",
      points: 150,
      completed: false,
      category: "Strategy",
    },
  ])

  const [userStats, setUserStats] = useState<UserStats>({
    level: 5,
    totalPoints: 1250,
    streak: 7,
    completedTasks: 23,
    achievements: ["First Week", "Networking Pro", "Strategic Thinker"],
  })

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newCompleted = !task.completed
          if (newCompleted) {
            setUserStats((stats) => ({
              ...stats,
              totalPoints: stats.totalPoints + task.points,
              completedTasks: stats.completedTasks + 1,
            }))
          } else {
            setUserStats((stats) => ({
              ...stats,
              totalPoints: stats.totalPoints - task.points,
              completedTasks: stats.completedTasks - 1,
            }))
          }
          return { ...task, completed: newCompleted }
        }
        return task
      }),
    )
  }

  const getTasksByType = (type: "daily" | "weekly" | "monthly") => {
    return tasks.filter((task) => task.type === type)
  }

  const getCompletionRate = (type: "daily" | "weekly" | "monthly") => {
    const typeTasks = getTasksByType(type)
    const completed = typeTasks.filter((task) => task.completed).length
    return typeTasks.length > 0 ? (completed / typeTasks.length) * 100 : 0
  }

  const TaskCard = ({ task }: { task: Task }) => (
    <Card
      className={`transition-all duration-200 ${task.completed ? "bg-green-50 border-green-200" : "hover:shadow-md"}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="sm" onClick={() => toggleTask(task.id)} className="p-0 h-auto">
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </Button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</h4>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {task.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  {task.points}
                </Badge>
              </div>
            </div>
            <p className={`text-sm text-gray-600 ${task.completed ? "line-through" : ""}`}>{task.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold">BusinessPro Academy</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-gray-900">
                Leaderboard
              </Link>
              <Link href="/store" className="text-gray-600 hover:text-gray-900">
                Store
              </Link>
              <Link href="/training" className="text-gray-600 hover:text-gray-900">
                Training
              </Link>
              <Link href="/learning-paths" className="text-gray-600 hover:text-gray-900">
                Learning Paths
              </Link>
              <Link href="/events" className="text-gray-600 hover:text-gray-900">
                Events
              </Link>
              <Link href="/analytics" className="text-gray-600 hover:text-gray-900">
                Analytics
              </Link>
              {getCurrentUser().role === "admin" && (
                <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                  Admin
                </Link>
              )}
              <Badge variant="outline" className="capitalize">
                {getCurrentUser().role}
              </Badge>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Level</p>
                  <p className="text-2xl font-bold text-blue-600">{userStats.level}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Points</p>
                  <p className="text-2xl font-bold text-green-600">{userStats.totalPoints}</p>
                </div>
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Streak</p>
                  <p className="text-2xl font-bold text-orange-600">{userStats.streak} days</p>
                </div>
                <Flame className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-purple-600">{userStats.completedTasks}</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Daily Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>{Math.round(getCompletionRate("daily"))}%</span>
                </div>
                <Progress value={getCompletionRate("daily")} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>{Math.round(getCompletionRate("weekly"))}%</span>
                </div>
                <Progress value={getCompletionRate("weekly")} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Monthly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>{Math.round(getCompletionRate("monthly"))}%</span>
                </div>
                <Progress value={getCompletionRate("monthly")} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
            <CardDescription>Complete tasks to earn points and level up your business skills</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
                <TabsTrigger value="weekly">Weekly Tasks</TabsTrigger>
                <TabsTrigger value="monthly">Monthly Tasks</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-4 mt-6">
                {getTasksByType("daily").map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </TabsContent>

              <TabsContent value="weekly" className="space-y-4 mt-6">
                {getTasksByType("weekly").map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </TabsContent>

              <TabsContent value="monthly" className="space-y-4 mt-6">
                {getTasksByType("monthly").map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userStats.achievements.map((achievement, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  <Trophy className="h-3 w-3 mr-1" />
                  {achievement}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
