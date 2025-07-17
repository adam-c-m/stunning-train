"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trophy, Play, User, Star, Search, Filter, BookOpen, TrendingUp, Users, Crown, Lock } from "lucide-react"
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
}

export default function Training() {
  const currentUser = getCurrentUser()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<TrainingVideo | null>(null)

  const trainingVideos: TrainingVideo[] = [
    // Leadership Category
    {
      id: "1",
      title: "Transformational Leadership in the Digital Age",
      description:
        "Learn how to lead teams effectively in today's digital workplace with proven strategies from industry experts.",
      instructor: "Dr. Sarah Mitchell",
      duration: "45:30",
      category: "leadership",
      level: "intermediate",
      isPremium: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      views: 1250,
      tags: ["leadership", "digital transformation", "team management"],
      publishedDate: "2024-01-15",
    },
    {
      id: "2",
      title: "Building High-Performance Teams",
      description: "Master the art of creating and managing high-performance teams that deliver exceptional results.",
      instructor: "Marcus Johnson",
      duration: "38:15",
      category: "leadership",
      level: "advanced",
      isPremium: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      views: 890,
      tags: ["team building", "performance", "management"],
      publishedDate: "2024-01-20",
    },
    {
      id: "3",
      title: "Emotional Intelligence for Leaders",
      description: "Develop your emotional intelligence to become a more effective and empathetic leader.",
      instructor: "Dr. Lisa Chen",
      duration: "52:45",
      category: "leadership",
      level: "beginner",
      isPremium: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      views: 2100,
      tags: ["emotional intelligence", "leadership", "communication"],
      publishedDate: "2024-01-10",
    },

    // Strategy Category
    {
      id: "4",
      title: "Strategic Planning Masterclass",
      description: "Comprehensive guide to developing and implementing winning business strategies.",
      instructor: "Robert Anderson",
      duration: "1:15:20",
      category: "strategy",
      level: "advanced",
      isPremium: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      views: 750,
      tags: ["strategic planning", "business strategy", "implementation"],
      publishedDate: "2024-01-25",
    },
    {
      id: "5",
      title: "Market Analysis and Competitive Intelligence",
      description: "Learn how to analyze markets and gather competitive intelligence for strategic advantage.",
      instructor: "Jennifer Wu",
      duration: "42:10",
      category: "strategy",
      level: "intermediate",
      isPremium: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      views: 1450,
      tags: ["market analysis", "competitive intelligence", "research"],
      publishedDate: "2024-01-18",
    },
    {
      id: "6",
      title: "Innovation and Disruption Strategies",
      description: "Discover how to innovate and disrupt markets while staying ahead of the competition.",
      instructor: "Dr. Michael Torres",
      duration: "48:35",
      category: "strategy",
      level: "advanced",
      isPremium: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      views: 680,
      tags: ["innovation", "disruption", "competitive advantage"],
      publishedDate: "2024-01-22",
    },

    // Skills Category
    {
      id: "7",
      title: "Advanced Excel for Business Analytics",
      description: "Master advanced Excel techniques for data analysis and business intelligence.",
      instructor: "David Park",
      duration: "1:05:45",
      category: "skills",
      level: "intermediate",
      isPremium: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      views: 3200,
      tags: ["excel", "data analysis", "business intelligence"],
      publishedDate: "2024-01-12",
    },
    {
      id: "8",
      title: "Presentation Skills for Executives",
      description: "Develop compelling presentation skills that engage and persuade your audience.",
      instructor: "Amanda Rodriguez",
      duration: "35:20",
      category: "skills",
      level: "beginner",
      isPremium: false,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      views: 1800,
      tags: ["presentation", "communication", "public speaking"],
      publishedDate: "2024-01-08",
    },
    {
      id: "9",
      title: "Financial Modeling and Valuation",
      description: "Learn advanced financial modeling techniques used by top investment professionals.",
      instructor: "Thomas Kim",
      duration: "1:25:15",
      category: "skills",
      level: "advanced",
      isPremium: true,
      thumbnail: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      views: 520,
      tags: ["financial modeling", "valuation", "finance"],
      publishedDate: "2024-01-28",
    },
  ]

  const filteredVideos = trainingVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getVideosByCategory = (category: string) => {
    return filteredVideos.filter((video) => video.category === category)
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
        return <Play className="h-5 w-5" />
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

  const canAccessVideo = (video: TrainingVideo) => {
    if (!video.isPremium) return true
    return currentUser.role === "admin" || currentUser.role === "premium"
  }

  const VideoCard = ({ video }: { video: TrainingVideo }) => {
    const canAccess = canAccessVideo(video)

    return (
      <Card className={`transition-all duration-200 hover:shadow-lg ${!canAccess ? "opacity-75" : ""}`}>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              {video.isPremium && (
                <Badge className="bg-yellow-600 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              <Badge className={getLevelColor(video.level)}>{video.level}</Badge>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
              {video.duration}
            </div>
            {!canAccess && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="mb-3">
              <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
            </div>

            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
              <User className="h-4 w-4" />
              <span>{video.instructor}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{video.rating}</span>
                <span className="text-sm text-gray-500">({video.views} views)</span>
              </div>
              <div className="flex gap-1">
                {video.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" disabled={!canAccess} onClick={() => setSelectedVideo(video)}>
                  {canAccess ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Watch Now
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Premium Required
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    {video.title}
                  </DialogTitle>
                  <DialogDescription>
                    Instructor: {video.instructor} • Duration: {video.duration}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <VideoPlayer videoId={video.id} title={video.title} duration={video.duration} />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <h4 className="font-semibold mb-2">About this training</h4>
                      <p className="text-gray-600 mb-4">{video.description}</p>

                      <h4 className="font-semibold mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {video.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Video Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{video.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Level:</span>
                            <Badge className={getLevelColor(video.level)} variant="outline">
                              {video.level}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Rating:</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{video.rating}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>Views:</span>
                            <span>{video.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
                </Link>
                <Link href="/leaderboard" className="text-gray-600 hover:text-gray-900">
                  Leaderboard
                </Link>
                <Link href="/store" className="text-gray-600 hover:text-gray-900">
                  Store
                </Link>
                <Link href="/analytics" className="text-gray-600 hover:text-gray-900">
                  Analytics
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
            <h1 className="text-3xl font-bold mb-4">Expert Training Videos</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn from industry experts with our comprehensive training library covering leadership, strategy, and
              essential business skills.
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search videos, instructors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{filteredVideos.length} videos found</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Categories */}
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
                <h2 className="text-xl font-semibold mb-2">Leadership Development</h2>
                <p className="text-gray-600">
                  Master the art of leadership with expert guidance on team management, emotional intelligence, and
                  transformational leadership techniques.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getVideosByCategory("leadership").map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="strategy">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Strategic Planning</h2>
                <p className="text-gray-600">
                  Learn strategic thinking, market analysis, and competitive intelligence from seasoned business
                  strategists and consultants.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getVideosByCategory("strategy").map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Essential Business Skills</h2>
                <p className="text-gray-600">
                  Develop critical business skills including data analysis, presentation techniques, financial modeling,
                  and more.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getVideosByCategory("skills").map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Premium Upgrade CTA */}
          {currentUser.role === "basic" && (
            <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-8 text-center">
                <Crown className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Unlock Premium Training</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Get access to advanced training videos, exclusive masterclasses, and expert-led workshops with our
                  Premium membership.
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
