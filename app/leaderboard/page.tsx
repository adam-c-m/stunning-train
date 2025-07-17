"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"

export default function Leaderboard() {
  const leaderboardData = {
    weekly: [
      { rank: 1, name: "Sarah Chen", points: 450, level: 8, streak: 12, avatar: "SC" },
      { rank: 2, name: "Alex Johnson", points: 420, level: 5, streak: 7, avatar: "AJ" },
      { rank: 3, name: "Mike Rodriguez", points: 380, level: 6, streak: 5, avatar: "MR" },
      { rank: 4, name: "Emma Wilson", points: 350, level: 4, streak: 9, avatar: "EW" },
      { rank: 5, name: "David Kim", points: 320, level: 7, streak: 3, avatar: "DK" },
      { rank: 6, name: "Lisa Thompson", points: 290, level: 5, streak: 8, avatar: "LT" },
      { rank: 7, name: "James Brown", points: 270, level: 4, streak: 4, avatar: "JB" },
      { rank: 8, name: "Anna Davis", points: 250, level: 6, streak: 6, avatar: "AD" },
    ],
    monthly: [
      { rank: 1, name: "Sarah Chen", points: 1850, level: 8, streak: 12, avatar: "SC" },
      { rank: 2, name: "David Kim", points: 1720, level: 7, streak: 3, avatar: "DK" },
      { rank: 3, name: "Mike Rodriguez", points: 1680, level: 6, streak: 5, avatar: "MR" },
      { rank: 4, name: "Anna Davis", points: 1520, level: 6, streak: 6, avatar: "AD" },
      { rank: 5, name: "Alex Johnson", points: 1450, level: 5, streak: 7, avatar: "AJ" },
      { rank: 6, name: "Lisa Thompson", points: 1380, level: 5, streak: 8, avatar: "LT" },
      { rank: 7, name: "Emma Wilson", points: 1250, level: 4, streak: 9, avatar: "EW" },
      { rank: 8, name: "James Brown", points: 1180, level: 4, streak: 4, avatar: "JB" },
    ],
    allTime: [
      { rank: 1, name: "Sarah Chen", points: 8450, level: 8, streak: 12, avatar: "SC" },
      { rank: 2, name: "David Kim", points: 7820, level: 7, streak: 3, avatar: "DK" },
      { rank: 3, name: "Anna Davis", points: 6920, level: 6, streak: 6, avatar: "AD" },
      { rank: 4, name: "Mike Rodriguez", points: 6580, level: 6, streak: 5, avatar: "MR" },
      { rank: 5, name: "Lisa Thompson", points: 5980, level: 5, streak: 8, avatar: "LT" },
      { rank: 6, name: "Alex Johnson", points: 5450, level: 5, streak: 7, avatar: "AJ" },
      { rank: 7, name: "James Brown", points: 4780, level: 4, streak: 4, avatar: "JB" },
      { rank: 8, name: "Emma Wilson", points: 4250, level: 4, streak: 9, avatar: "EW" },
    ],
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-200"
      case 3:
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const LeaderboardTable = ({ data }: { data: typeof leaderboardData.weekly }) => (
    <div className="space-y-3">
      {data.map((user, index) => (
        <Card
          key={index}
          className={`transition-all duration-200 hover:shadow-md ${user.rank <= 3 ? "ring-2 ring-blue-100" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12">{getRankIcon(user.rank)}</div>

              <Avatar className="h-12 w-12">
                <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{user.name}</h4>
                  <Badge variant="outline" className={getRankBadgeColor(user.rank)}>
                    Level {user.level}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {user.points} points
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {user.streak} day streak
                  </span>
                </div>
              </div>

              <div className="text-right">
                <Badge variant={user.rank <= 3 ? "default" : "secondary"}>#{user.rank}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
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
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how you stack up against other members in the BusinessPro Academy. Complete tasks, earn points, and
            climb the rankings!
          </p>
        </div>

        {/* Top 3 Spotlight */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Top Performers This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leaderboardData.weekly.slice(0, 3).map((user, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-20 w-20 mx-auto">
                      <AvatarImage src={`/placeholder.svg?height=80&width=80`} />
                      <AvatarFallback className="text-xl">{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-2 -right-2">{getRankIcon(user.rank)}</div>
                  </div>
                  <h3 className="font-semibold mb-1">{user.name}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{user.points}</div>
                  <div className="text-sm text-gray-600">points this week</div>
                  <Badge variant="outline" className="mt-2">
                    Level {user.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
            <CardDescription>View rankings by different time periods</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
                <TabsTrigger value="allTime">All Time</TabsTrigger>
              </TabsList>

              <TabsContent value="weekly" className="mt-6">
                <LeaderboardTable data={leaderboardData.weekly} />
              </TabsContent>

              <TabsContent value="monthly" className="mt-6">
                <LeaderboardTable data={leaderboardData.monthly} />
              </TabsContent>

              <TabsContent value="allTime" className="mt-6">
                <LeaderboardTable data={leaderboardData.allTime} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
