"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Star, Flame, Target, Calendar, TrendingUp, Award, Users } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"

export default function Profile() {
  const userProfile = {
    name: "Alex Johnson",
    email: "alex@businesspro.com",
    memberSince: "January 2024",
    level: 5,
    totalPoints: 1250,
    streak: 7,
    completedTasks: 23,
    nextLevelPoints: 1500,
    achievements: [
      { name: "First Week", description: "Completed your first week of tasks", icon: Calendar, earned: "2024-01-07" },
      { name: "Networking Pro", description: "Made 10 professional connections", icon: Users, earned: "2024-01-15" },
      { name: "Strategic Thinker", description: "Completed 5 strategy tasks", icon: Target, earned: "2024-01-22" },
      { name: "Consistent Performer", description: "Maintained a 7-day streak", icon: Flame, earned: "2024-01-28" },
    ],
    stats: {
      dailyTasksCompleted: 45,
      weeklyTasksCompleted: 12,
      monthlyTasksCompleted: 3,
      favoriteCategory: "Strategy",
      averagePointsPerDay: 25,
    },
  }

  const progressToNextLevel = ((userProfile.totalPoints % 300) / 300) * 100

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
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Dashboard
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="text-2xl">AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
                <p className="text-gray-600 mb-4">{userProfile.email}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Member since {userProfile.memberSince}</span>
                  <span>•</span>
                  <span>Level {userProfile.level}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600 mb-1">{userProfile.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Level Progress
            </CardTitle>
            <CardDescription>
              {userProfile.nextLevelPoints - userProfile.totalPoints} points to reach Level {userProfile.level + 1}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level {userProfile.level}</span>
                <span>Level {userProfile.level + 1}</span>
              </div>
              <Progress value={progressToNextLevel} className="h-3" />
              <div className="text-center text-sm text-gray-600">
                {userProfile.totalPoints} / {userProfile.nextLevelPoints} points
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold text-orange-600">{userProfile.streak}</p>
                  <p className="text-xs text-gray-500">days</p>
                </div>
                <Flame className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
                  <p className="text-2xl font-bold text-green-600">{userProfile.completedTasks}</p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Points/Day</p>
                  <p className="text-2xl font-bold text-blue-600">{userProfile.stats.averagePointsPerDay}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
                <Star className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Favorite Category</p>
                  <p className="text-lg font-bold text-purple-600">{userProfile.stats.favoriteCategory}</p>
                  <p className="text-xs text-gray-500">most completed</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Task Completion Breakdown</CardTitle>
            <CardDescription>Your performance across different task types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{userProfile.stats.dailyTasksCompleted}</div>
                <div className="text-sm text-gray-600">Daily Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{userProfile.stats.weeklyTasksCompleted}</div>
                <div className="text-sm text-gray-600">Weekly Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{userProfile.stats.monthlyTasksCompleted}</div>
                <div className="text-sm text-gray-600">Monthly Tasks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Your earned badges and accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProfile.achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{achievement.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <Badge variant="outline" className="text-xs">
                        Earned {achievement.earned}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
