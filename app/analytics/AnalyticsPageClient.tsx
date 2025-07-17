"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts"
import {
  Trophy,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Star,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Award,
  Brain,
  Activity,
} from "lucide-react"
import { RoleGuard } from "@/components/role-guard"
import { getCurrentUser } from "@/lib/auth"
import {
  mockAnalytics,
  mockInsights,
  calculateLearningVelocity,
  getSkillLevel,
  formatMinutes,
  type LearningInsight,
  mockMetrics,
} from "@/lib/analytics"

export default function AnalyticsPageClient() {
  const currentUser = getCurrentUser()
  const analytics = mockAnalytics
  const insights = mockInsights
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  const learningVelocity = calculateLearningVelocity(analytics.weeklyProgress)

  const skillData = analytics.skillProgress.map((skill) => ({
    name: skill.skill,
    level: skill.level,
    progress: skill.progress,
    timeSpent: skill.timeSpent,
  }))

  const weeklyData = analytics.weeklyProgress.map((week) => ({
    name: week.week,
    watchTime: week.watchTime,
    videos: week.videosCompleted,
    engagement: week.bookmarksAdded + week.takeawaysShared + week.notesCreated,
  }))

  const categoryData = [
    { name: "Leadership", value: 45, color: "#3B82F6" },
    { name: "Strategy", value: 30, color: "#10B981" },
    { name: "Skills", value: 25, color: "#F59E0B" },
  ]

  const engagementData = [
    { name: "Bookmarks", value: analytics.engagementMetrics.bookmarksCreated },
    { name: "Takeaways", value: analytics.engagementMetrics.takeawaysShared },
    { name: "Notes", value: analytics.engagementMetrics.notesCreated },
    { name: "Forum Posts", value: analytics.engagementMetrics.forumPosts },
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case "recommendation":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "milestone":
        return <Target className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Brain className="h-5 w-5 text-gray-500" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "border-yellow-200 bg-yellow-50"
      case "recommendation":
        return "border-blue-200 bg-blue-50"
      case "milestone":
        return "border-green-200 bg-green-50"
      case "warning":
        return "border-red-200 bg-red-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const InsightCard = ({ insight }: { insight: LearningInsight }) => (
    <Card className={`${getInsightColor(insight.type)} border-l-4`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getInsightIcon(insight.type)}
          <div className="flex-1">
            <h4 className="font-semibold mb-1">{insight.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
            {insight.actionable && insight.action && (
              <Button size="sm" variant="outline">
                {insight.action}
              </Button>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {insight.priority}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <RoleGuard requiredRole="basic">
      <main className="max-w-5xl mx-auto py-10 space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold">Learning Analytics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockMetrics.map((m) => (
            <Card key={m.label}>
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-sm text-gray-500">{m.label}</p>
                <p className="text-2xl font-semibold">
                  {m.value}
                  {m.unit && <span className="text-base text-gray-400"> {m.unit}</span>}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Watch Time</p>
                  <p className="text-2xl font-bold text-blue-600">{formatMinutes(analytics.totalWatchTime)}</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-green-600">{analytics.averageCompletionRate}%</p>
                  <p className="text-xs text-gray-500">
                    {analytics.videosCompleted} of {analytics.videosStarted} videos
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                  <p className="text-2xl font-bold text-orange-600">{analytics.streakDays}</p>
                  <p className="text-xs text-gray-500">days active</p>
                </div>
                <Flame className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Learning Velocity</p>
                  <p className={`text-2xl font-bold ${learningVelocity >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {learningVelocity > 0 ? "+" : ""}
                    {learningVelocity.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">vs last week</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mb-8">
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card className="mb-8">
          <CardContent>
            <div className="space-y-4">
              {analytics.learningGoals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{goal.title}</h4>
                    <Badge variant={goal.completed ? "default" : "outline"}>
                      {goal.completed ? "Completed" : `${goal.progress}%`}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>Target: {goal.targetDate}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Tabs */}
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="watchTime" fill="#3B82F6" name="Watch Time (min)" />
                      <Bar dataKey="videos" fill="#10B981" name="Videos Completed" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        name="Engagement Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardContent>
                <div className="space-y-6">
                  {analytics.skillProgress.map((skill) => {
                    const skillLevel = getSkillLevel(skill.timeSpent)
                    return (
                      <div key={skill.skill} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{skill.skill}</h4>
                            <p className="text-sm text-gray-600">
                              {formatMinutes(skill.timeSpent)} • {skill.videosCompleted} videos completed
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">Level {skill.level}</Badge>
                            <p className="text-sm text-gray-600 mt-1">{skillLevel.title}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress to next level</span>
                            <span>{skill.progress}%</span>
                          </div>
                          <Progress value={skill.progress} className="h-2" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart data={skillData} innerRadius="30%" outerRadius="90%">
                      <RadialBar dataKey="level" cornerRadius={10} fill="#3B82F6" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Bookmarks</p>
                      <p className="text-2xl font-bold text-blue-600">{analytics.engagementMetrics.bookmarksCreated}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Takeaways</p>
                      <p className="text-2xl font-bold text-green-600">{analytics.engagementMetrics.takeawaysShared}</p>
                    </div>
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Notes</p>
                      <p className="text-2xl font-bold text-purple-600">{analytics.engagementMetrics.notesCreated}</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Session</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {analytics.engagementMetrics.averageSessionTime}m
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryData.map((category) => (
                <Card key={category.name}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: category.color }}>
                        {category.value}%
                      </div>
                      <div className="font-semibold">{category.name}</div>
                      <div className="text-sm text-gray-600">of total learning time</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </RoleGuard>
  )
}
