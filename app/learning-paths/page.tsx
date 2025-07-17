"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Trophy,
  BookOpen,
  Users,
  TrendingUp,
  Clock,
  Crown,
  Play,
  CheckCircle2,
  Lock,
  Route,
  Target,
  Award,
} from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/role-guard"
import { getCurrentUser } from "@/lib/auth"
import { mockLearningPaths, type LearningPath } from "@/lib/learning"

export default function LearningPaths() {
  const currentUser = getCurrentUser()
  const [enrolledPaths, setEnrolledPaths] = useState<string[]>(["1"])
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)

  const handleEnroll = (pathId: string) => {
    if (!enrolledPaths.includes(pathId)) {
      setEnrolledPaths([...enrolledPaths, pathId])
    }
  }

  const canAccessPath = (path: LearningPath) => {
    if (!path.isPremium) return true
    return currentUser.role === "admin" || currentUser.role === "premium"
  }

  const isEnrolled = (pathId: string) => {
    return enrolledPaths.includes(pathId)
  }

  const getPathsByCategory = (category: string) => {
    return mockLearningPaths.filter((path) => path.category === category)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "leadership":
        return <Users className="h-5 w-5" />
      case "strategy":
        return <TrendingUp className="h-5 w-5" />
      case "skills":
        return <BookOpen className="h-5 w-5" />
      default:
        return <Route className="h-5 w-5" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const PathCard = ({ path }: { path: LearningPath }) => {
    const canAccess = canAccessPath(path)
    const enrolled = isEnrolled(path.id)

    return (
      <Card className={`transition-all duration-200 hover:shadow-lg ${!canAccess ? "opacity-75" : ""}`}>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={path.thumbnail || "/placeholder.svg"}
              alt={path.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              {path.isPremium && (
                <Badge className="bg-yellow-600 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              <Badge className={getLevelColor(path.level)}>{path.level}</Badge>
              {enrolled && (
                <Badge className="bg-green-600 text-white">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Enrolled
                </Badge>
              )}
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
              {path.estimatedHours}h
            </div>
            {!canAccess && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{path.description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Users className="h-4 w-4" />
                <span>{path.instructor}</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span>Completion Rate</span>
                <span>{path.completionRate}%</span>
              </div>
              <Progress value={path.completionRate} className="h-2" />

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{path.enrolledCount} enrolled</span>
                <span>{path.videos.length} videos</span>
              </div>
            </div>

            {path.prerequisites && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Prerequisites:</p>
                <div className="flex flex-wrap gap-1">
                  {path.prerequisites.map((prereq, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {mockLearningPaths.find((p) => p.id === prereq)?.title || prereq}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPath(path)}>
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Route className="h-5 w-5" />
                      {path.title}
                    </DialogTitle>
                    <DialogDescription>{path.description}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <img
                      src={path.thumbnail || "/placeholder.svg"}
                      alt={path.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{path.estimatedHours} hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{path.enrolledCount} enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{path.completionRate}% completion rate</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-gray-500" />
                          <Badge className={getLevelColor(path.level)}>{path.level}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{path.videos.length} videos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{path.instructor}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Learning Path Content</h4>
                      <div className="space-y-2">
                        {path.videos.map((videoId, index) => (
                          <div key={videoId} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">Video {index + 1}</div>
                              <div className="text-sm text-gray-600">Training content</div>
                            </div>
                            <Play className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button size="sm" disabled={!canAccess || enrolled} onClick={() => handleEnroll(path.id)}>
                {enrolled ? "Enrolled" : !canAccess ? "Premium Required" : "Enroll Now"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <RoleGuard requiredRole="basic">
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
                <Link href="/training" className="text-gray-600 hover:text-gray-900">
                  Training
                </Link>
                <Link href="/events" className="text-gray-600 hover:text-gray-900">
                  Events
                </Link>
                <Link href="/analytics" className="text-gray-600 hover:text-gray-900">
                  Analytics
                </Link>
                <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
                </Link>
                {currentUser.role === "admin" && (
                  <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                    Admin
                  </Link>
                )}
                <Badge variant="outline" className="capitalize">
                  {currentUser.role}
                </Badge>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Learning Paths</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow structured learning journeys designed by experts to master specific business skills and advance
              your career.
            </p>
          </div>

          {/* My Learning Paths */}
          {enrolledPaths.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  My Learning Paths
                </CardTitle>
                <CardDescription>Continue your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockLearningPaths
                    .filter((path) => enrolledPaths.includes(path.id))
                    .map((path) => (
                      <div key={path.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={path.thumbnail || "/placeholder.svg"}
                            alt={path.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{path.title}</h4>
                            <p className="text-sm text-gray-600">{path.instructor}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>2 of {path.videos.length} completed</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <Button size="sm" className="w-full mt-3">
                          Continue Learning
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Learning Path Categories */}
          <Tabs defaultValue="leadership" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="leadership" className="flex items-center gap-2">
                {getCategoryIcon("leadership")}
                Leadership
              </TabsTrigger>
              <TabsTrigger value="strategy" className="flex items-center gap-2">
                {getCategoryIcon("strategy")}
                Strategy
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                {getCategoryIcon("skills")}
                Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leadership">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Leadership Development Paths</h2>
                <p className="text-gray-600">
                  Structured programs to develop your leadership capabilities from foundational skills to advanced
                  management techniques.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getPathsByCategory("leadership").map((path) => (
                  <PathCard key={path.id} path={path} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="strategy">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Strategic Planning Paths</h2>
                <p className="text-gray-600">
                  Comprehensive learning journeys covering business strategy, market analysis, and competitive
                  positioning.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getPathsByCategory("strategy").map((path) => (
                  <PathCard key={path.id} path={path} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Essential Skills Paths</h2>
                <p className="text-gray-600">
                  Master critical business skills including analytics, communication, and technical competencies.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getPathsByCategory("skills").map((path) => (
                  <PathCard key={path.id} path={path} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Premium Upgrade CTA */}
          {currentUser.role === "basic" && (
            <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-8 text-center">
                <Crown className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Unlock Premium Learning Paths</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Get access to advanced learning paths, exclusive content, and personalized learning recommendations
                  with our Premium membership.
                </p>
                <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </RoleGuard>
  )
}
