"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Play,
  Star,
  User,
  Clock,
  BookOpen,
  Users,
  TrendingUp,
  Trophy,
  Share2,
  Download,
  Flag,
  Eye,
  Calendar,
  Award,
  Target,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/role-guard"
import { getCurrentUser } from "@/lib/auth"
import { VideoPlayer } from "@/components/video-player"

interface TrainingVideo {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  category: "leadership" | "strategy" | "skills"
  level: "beginner" | "intermediate" | "advanced"
  isPremium: boolean
  thumbnail: string
  rating: number
  views: number
  tags: string[]
  publishedDate: string
  transcript?: string
  learningObjectives: string[]
  resources?: Array<{
    title: string
    type: "pdf" | "link" | "template"
    url: string
    description: string
  }>
  relatedVideos: Array<{
    id: string
    title: string
    instructor: string
    duration: string
    rating: number
    thumbnail: string
  }>
}

// Mock video data
const getVideoById = (id: string): TrainingVideo | null => {
  const videos: TrainingVideo[] = [
    {
      id: "1",
      title: "Transformational Leadership in the Digital Age",
      description:
        "Learn how to lead teams effectively in today's digital workplace with proven strategies from industry experts. This comprehensive course covers the fundamentals of transformational leadership, including how to inspire and motivate teams, drive organizational change, and create a culture of innovation in digital environments. You'll discover practical frameworks for building trust in virtual teams, fostering creativity, and navigating the complexities of modern leadership challenges.",
      instructor: "Dr. Sarah Mitchell",
      duration: "45:30",
      category: "leadership",
      level: "intermediate",
      isPremium: false,
      thumbnail: "/placeholder.svg?height=400&width=600",
      rating: 4.8,
      views: 1250,
      tags: ["leadership", "digital transformation", "team management", "innovation", "culture"],
      publishedDate: "2024-01-15",
      learningObjectives: [
        "Understand the core principles of transformational leadership",
        "Learn to build trust and engagement in virtual teams",
        "Develop strategies for driving organizational change",
        "Master techniques for fostering innovation and creativity",
        "Apply digital leadership frameworks in real-world scenarios",
      ],
      transcript: `Welcome to Transformational Leadership in the Digital Age. 

In today's rapidly evolving business landscape, traditional leadership approaches are no longer sufficient. Digital transformation has fundamentally changed how we work, communicate, and collaborate.

Key topics we'll cover:
1. Understanding digital leadership principles
2. Building trust in virtual environments
3. Fostering innovation and adaptability
4. Leading through change and uncertainty

Let's begin with the core principles of transformational leadership...

[Transcript continues with detailed content about leadership principles, practical examples, case studies, and actionable frameworks that leaders can implement immediately in their organizations.]`,
      resources: [
        {
          title: "Leadership Assessment Tool",
          type: "pdf",
          url: "/resources/leadership-assessment.pdf",
          description:
            "Comprehensive self-assessment to evaluate your current leadership style and identify areas for improvement",
        },
        {
          title: "Digital Leadership Framework",
          type: "template",
          url: "/resources/digital-leadership-framework.xlsx",
          description: "Ready-to-use template for implementing digital leadership strategies in your organization",
        },
        {
          title: "Harvard Business Review - Digital Leadership",
          type: "link",
          url: "https://hbr.org/digital-leadership",
          description: "Additional reading on digital leadership trends and best practices",
        },
        {
          title: "Team Engagement Checklist",
          type: "pdf",
          url: "/resources/team-engagement-checklist.pdf",
          description: "Practical checklist for maintaining high team engagement in virtual environments",
        },
      ],
      relatedVideos: [
        {
          id: "3",
          title: "Emotional Intelligence for Leaders",
          instructor: "Dr. Lisa Chen",
          duration: "52:45",
          rating: 4.7,
          thumbnail: "/placeholder.svg?height=120&width=160",
        },
        {
          id: "2",
          title: "Building High-Performance Teams",
          instructor: "Marcus Johnson",
          duration: "38:15",
          rating: 4.9,
          thumbnail: "/placeholder.svg?height=120&width=160",
        },
        {
          id: "4",
          title: "Change Management Strategies",
          instructor: "Dr. Sarah Mitchell",
          duration: "41:20",
          rating: 4.6,
          thumbnail: "/placeholder.svg?height=120&width=160",
        },
      ],
    },
    {
      id: "2",
      title: "Building High-Performance Teams",
      description:
        "Master the art of creating and managing high-performance teams that deliver exceptional results consistently. This advanced course explores team dynamics, performance optimization, and leadership strategies.",
      instructor: "Marcus Johnson",
      duration: "38:15",
      category: "leadership",
      level: "advanced",
      isPremium: true,
      thumbnail: "/placeholder.svg?height=400&width=600",
      rating: 4.9,
      views: 890,
      tags: ["team building", "performance", "management", "collaboration"],
      publishedDate: "2024-01-20",
      learningObjectives: [
        "Design high-performance team structures",
        "Implement effective performance measurement systems",
        "Master conflict resolution techniques",
        "Create accountability frameworks",
      ],
      resources: [],
      relatedVideos: [],
    },
  ]

  return videos.find((video) => video.id === id) || null
}

export default function VideoTrainingPage({ params }: { params: { videoId: string } }) {
  const currentUser = getCurrentUser()
  const video = getVideoById(params.videoId)

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Video Not Found</h2>
            <p className="text-gray-600 mb-4">The requested training video could not be found.</p>
            <Link href="/training">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Training
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const canAccessVideo = () => {
    if (!video.isPremium) return true
    return currentUser.role === "admin" || currentUser.role === "premium"
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "leadership":
        return <Users className="h-4 w-4" />
      case "strategy":
        return <TrendingUp className="h-4 w-4" />
      case "skills":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Play className="h-4 w-4" />
    }
  }

  if (!canAccessVideo()) {
    return (
      <RoleGuard requiredRole="basic">
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-900">BusinessPro Academy</h1>
                </div>
                <nav className="flex items-center gap-6">
                  <Link href="/training" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Training
                  </Link>
                  <Badge variant="outline" className="capitalize">
                    {currentUser.role}
                  </Badge>
                </nav>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Premium Content</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  This video is part of our premium training library. Upgrade your membership to access advanced content
                  and unlock your full potential.
                </p>
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3"
                  >
                    <Award className="h-5 w-5 mr-2" />
                    Upgrade to Premium
                  </Button>
                  <p className="text-sm text-gray-500">
                    Get access to 100+ premium videos, certificates, and exclusive resources
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </RoleGuard>
    )
  }

  return (
    <RoleGuard requiredRole="basic">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">BusinessPro Academy</h1>
              </div>
              <nav className="flex items-center gap-6">
                <Link href="/training" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Training
                </Link>
                <Link href="/analytics" className="text-gray-600 hover:text-gray-900">
                  Analytics
                </Link>
                <Link href="/learning-paths" className="text-gray-600 hover:text-gray-900">
                  Learning Paths
                </Link>
                <Badge variant="outline" className="capitalize">
                  {currentUser.role}
                </Badge>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Video Player */}
              <VideoPlayer videoId={video.id} title={video.title} duration={video.duration} />

              {/* Video Information */}
              <Card className="shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-4 text-gray-900">{video.title}</h1>
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{video.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{video.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{video.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>{video.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(video.publishedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge className={getLevelColor(video.level)} variant="outline">
                      {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(video.category)}
                      {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                    </Badge>
                    {video.isPremium && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">
                        <Trophy className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    {video.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed text-lg mb-8">{video.description}</p>

                  {/* Learning Objectives */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Learning Objectives
                    </h3>
                    <ul className="space-y-3">
                      {video.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                          </div>
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Transcript */}
              {video.transcript && (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Video Transcript
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                        {video.transcript}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Instructor Info */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {video.instructor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{video.instructor}</h4>
                      <p className="text-sm text-gray-600">Leadership Expert & Consultant</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">4.9 instructor rating</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Dr. Sarah Mitchell is a renowned leadership consultant with over 15 years of experience helping
                    organizations transform their leadership capabilities. She has worked with Fortune 500 companies and
                    startups alike, specializing in digital transformation and team dynamics.
                  </p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">25+</div>
                      <div className="text-xs text-gray-600">Courses</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">15K+</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Card */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Video Progress</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-blue-600">3</div>
                        <div className="text-xs text-gray-600">Bookmarks</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">5</div>
                        <div className="text-xs text-gray-600">Notes</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              {video.resources && video.resources.length > 0 && (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {video.resources.map((resource, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              {resource.type === "pdf" && <BookOpen className="h-5 w-5 text-blue-600" />}
                              {resource.type === "link" && <TrendingUp className="h-5 w-5 text-blue-600" />}
                              {resource.type === "template" && <Download className="h-5 w-5 text-blue-600" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm mb-1">{resource.title}</h4>
                              <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                              <Badge variant="outline" className="text-xs capitalize">
                                {resource.type}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="sm" className="flex-shrink-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Videos */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Related Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {video.relatedVideos.map((relatedVideo) => (
                      <Link key={relatedVideo.id} href={`/training/${relatedVideo.id}`}>
                        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <img
                            src={relatedVideo.thumbnail || "/placeholder.svg"}
                            alt={relatedVideo.title}
                            className="w-20 h-14 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm mb-1 line-clamp-2">{relatedVideo.title}</h4>
                            <p className="text-xs text-gray-600 mb-1">{relatedVideo.instructor}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{relatedVideo.duration}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs font-medium">{relatedVideo.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Engagement */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Discussion Posts</span>
                      <Badge variant="secondary">12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Key Takeaways</span>
                      <Badge variant="secondary">8</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Questions</span>
                      <Badge variant="secondary">5</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Join Discussion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
