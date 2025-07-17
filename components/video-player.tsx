"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  Bookmark,
  MessageSquare,
  Share2,
  ThumbsUp,
  Clock,
  Settings,
  PictureInPicture,
  RotateCcw,
} from "lucide-react"
import { VideoNotes } from "./video-notes"
import { mockBookmarks, mockTakeaways, mockProgress, formatTimestamp } from "@/lib/learning"

interface VideoPlayerProps {
  videoId: string
  title: string
  duration: string
}

export function VideoPlayer({ videoId, title, duration }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [playbackRate, setPlaybackRate] = useState(1)

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Convert duration string to seconds for progress calculation
  const durationInSeconds = duration.split(":").reduce((acc, time) => 60 * acc + +time, 0)
  const progress = (currentTime / durationInSeconds) * 100

  // Mock data for this video
  const bookmarks = mockBookmarks.filter((b) => b.videoId === videoId)
  const takeaways = mockTakeaways.filter((t) => t.videoId === videoId)
  const videoProgress = mockProgress.find((p) => p.videoId === videoId)

  // Simulate video playback
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = Math.min(prev + playbackRate, durationInSeconds)
          if (newTime >= durationInSeconds) {
            setIsPlaying(false)
          }
          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, durationInSeconds, playbackRate])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (time: number) => {
    setCurrentTime(Math.max(0, Math.min(time, durationInSeconds)))
  }

  const skip = (seconds: number) => {
    handleSeek(currentTime + seconds)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!isFullscreen) {
      container.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }

  const addBookmark = () => {
    console.log("Adding bookmark at", formatTimestamp(currentTime))
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * durationInSeconds
    handleSeek(newTime)
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div
        ref={containerRef}
        className="relative bg-black rounded-xl overflow-hidden shadow-2xl"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Display */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              {isPlaying ? <Pause className="h-12 w-12 opacity-90" /> : <Play className="h-12 w-12 opacity-90 ml-1" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm opacity-75">
              {formatTimestamp(currentTime)} / {duration}
            </p>
            <div className="mt-4 w-64 mx-auto">
              <div className="w-full bg-white/20 rounded-full h-1">
                <div
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Click overlay for play/pause */}
          <div className="absolute inset-0 cursor-pointer" onClick={togglePlay} />
        </div>

        {/* Video Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div
                className="w-full bg-white/20 rounded-full h-2 cursor-pointer hover:h-3 transition-all"
                onClick={handleProgressClick}
              >
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-300 relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/80 mt-2">
                <span>{formatTimestamp(currentTime)}</span>
                <span>{duration}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => skip(-10)}
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => skip(10)}
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <div className="text-white text-sm">{playbackRate}x</div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addBookmark}
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white">
                  <PictureInPicture className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Information and Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="overview" className="text-sm">
            Overview
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="text-sm">
            Bookmarks ({bookmarks.length})
          </TabsTrigger>
          <TabsTrigger value="takeaways" className="text-sm">
            Takeaways ({takeaways.length})
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-sm">
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Video Progress
              </h3>
              {videoProgress ? (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Watched: {formatTimestamp(videoProgress.watchedDuration)}</span>
                    <span>Total: {formatTimestamp(videoProgress.totalDuration)}</span>
                  </div>
                  <Progress
                    value={(videoProgress.watchedDuration / videoProgress.totalDuration) * 100}
                    className="h-3"
                  />
                  <div className="flex items-center gap-3">
                    {videoProgress.completed ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">✓ Completed</Badge>
                    ) : (
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        In Progress
                      </Badge>
                    )}
                    <span className="text-sm text-gray-600">
                      Last watched: {new Date(videoProgress.lastWatchedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Start watching to track your progress</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarks" className="space-y-4 mt-6">
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSeek(bookmark.timestamp)}
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {formatTimestamp(bookmark.timestamp)}
                        </Button>
                        <Badge variant="outline" className="text-xs">
                          {new Date(bookmark.createdAt).toLocaleDateString()}
                        </Badge>
                      </div>
                      <h4 className="font-semibold mb-2">{bookmark.title}</h4>
                      {bookmark.note && <p className="text-sm text-gray-600 leading-relaxed">{bookmark.note}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="shadow-sm">
              <CardContent className="p-12 text-center">
                <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                <p className="text-gray-600 mb-4">Click the bookmark button while watching to save important moments</p>
                <Button variant="outline" onClick={addBookmark}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Add Your First Bookmark
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="takeaways" className="space-y-4 mt-6">
          {takeaways.length > 0 ? (
            takeaways.map((takeaway) => (
              <Card key={takeaway.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {takeaway.author.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-semibold">{takeaway.author.name}</span>
                        <Badge variant="outline" className="text-xs">
                          Level {takeaway.author.level}
                        </Badge>
                        {takeaway.timestamp && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSeek(takeaway.timestamp!)}
                            className="p-0 h-auto text-blue-600 hover:text-blue-800"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimestamp(takeaway.timestamp)}
                          </Button>
                        )}
                      </div>
                      <p className="text-gray-800 mb-4 leading-relaxed">{takeaway.content}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <Button variant="ghost" size="sm" className="p-0 h-auto hover:text-blue-600">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {takeaway.likes} likes
                        </Button>
                        <Button variant="ghost" size="sm" className="p-0 h-auto hover:text-blue-600">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <span>{new Date(takeaway.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="shadow-sm">
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No takeaways shared yet</h3>
                <p className="text-gray-600 mb-4">Be the first to share a key insight from this video</p>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Share Your Takeaway
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <VideoNotes videoId={videoId} currentTime={currentTime} onSeekTo={handleSeek} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
