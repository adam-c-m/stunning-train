"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  MapPin,
  Video,
  Crown,
  Search,
  Filter,
  ExternalLink,
  Bell,
  BellOff,
  Share,
  BookOpen,
  Award,
} from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/role-guard"
import { getCurrentUser } from "@/lib/auth"
import { mockEvents, type CalendarEvent } from "@/lib/learning"

export default function Events() {
  const currentUser = getCurrentUser()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(["1", "3"])
  const [reminders, setReminders] = useState<string[]>(["1"])

  const handleRegister = (eventId: string) => {
    if (!registeredEvents.includes(eventId)) {
      setRegisteredEvents([...registeredEvents, eventId])
    }
  }

  const handleToggleReminder = (eventId: string) => {
    if (reminders.includes(eventId)) {
      setReminders(reminders.filter((id) => id !== eventId))
    } else {
      setReminders([...reminders, eventId])
    }
  }

  const canAccessEvent = (event: CalendarEvent) => {
    if (!event.isPremium) return true
    return currentUser.role === "admin" || currentUser.role === "premium"
  }

  const isRegistered = (eventId: string) => {
    return registeredEvents.includes(eventId)
  }

  const hasReminder = (eventId: string) => {
    return reminders.includes(eventId)
  }

  const filteredEvents = mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getEventsByType = (type: string) => {
    return filteredEvents.filter((event) => event.type === type)
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "webinar":
        return <Video className="h-5 w-5" />
      case "workshop":
        return <BookOpen className="h-5 w-5" />
      case "networking":
        return <Users className="h-5 w-5" />
      case "coaching":
        return <Award className="h-5 w-5" />
      case "masterclass":
        return <Crown className="h-5 w-5" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "webinar":
        return "bg-blue-100 text-blue-800"
      case "workshop":
        return "bg-green-100 text-green-800"
      case "networking":
        return "bg-purple-100 text-purple-800"
      case "coaching":
        return "bg-orange-100 text-orange-800"
      case "masterclass":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const EventCard = ({ event }: { event: CalendarEvent }) => {
    const canAccess = canAccessEvent(event)
    const registered = isRegistered(event.id)
    const hasReminderSet = hasReminder(event.id)

    return (
      <Card className={`transition-all duration-200 hover:shadow-lg ${!canAccess ? "opacity-75" : ""}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge className={getTypeColor(event.type)}>
                {getEventIcon(event.type)}
                <span className="ml-1 capitalize">{event.type}</span>
              </Badge>
              {event.isPremium && (
                <Badge className="bg-yellow-600 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              {registered && <Badge className="bg-green-600 text-white">Registered</Badge>}
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => handleToggleReminder(event.id)} disabled={!registered}>
                {hasReminderSet ? (
                  <Bell className="h-4 w-4 text-blue-600" />
                ) : (
                  <BellOff className="h-4 w-4 text-gray-400" />
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>
                {formatTime(event.startDate)} - {formatTime(event.endDate)}
              </span>
              <span>({event.duration} min)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{event.instructor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="capitalize">{event.location}</span>
            </div>
          </div>

          {event.maxAttendees && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Attendees</span>
                <span>
                  {event.currentAttendees} / {event.maxAttendees}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {getEventIcon(event.type)}
                    {event.title}
                  </DialogTitle>
                  <DialogDescription>{event.description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{formatDate(event.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {formatTime(event.startDate)} - {formatTime(event.endDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{event.instructor}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm capitalize">{event.location}</span>
                      </div>
                      {event.maxAttendees && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            {event.currentAttendees} / {event.maxAttendees} attendees
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                        {event.isPremium && <Badge className="bg-yellow-600 text-white">Premium</Badge>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {event.meetingLink && registered && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold mb-2">Meeting Details</h4>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        <a
                          href={event.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Join Meeting
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    onClick={() => handleRegister(event.id)}
                    disabled={
                      !canAccess || registered || (event.maxAttendees && event.currentAttendees >= event.maxAttendees)
                    }
                    className="w-full"
                  >
                    {registered
                      ? "Already Registered"
                      : !canAccess
                        ? "Premium Required"
                        : event.maxAttendees && event.currentAttendees >= event.maxAttendees
                          ? "Event Full"
                          : "Register Now"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              disabled={
                !canAccess || registered || (event.maxAttendees && event.currentAttendees >= event.maxAttendees)
              }
              onClick={() => handleRegister(event.id)}
            >
              {registered
                ? "Registered"
                : !canAccess
                  ? "Premium Required"
                  : event.maxAttendees && event.currentAttendees >= event.maxAttendees
                    ? "Full"
                    : "Register"}
            </Button>
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
                <Link href="/learning-paths" className="text-gray-600 hover:text-gray-900">
                  Learning Paths
                </Link>
                <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
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
            <h1 className="text-3xl font-bold mb-4">Event Calendar</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join live webinars, workshops, networking events, and masterclasses to accelerate your business learning
              journey.
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search events, instructors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{filteredEvents.length} events found</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Registered Events */}
          {registeredEvents.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  My Registered Events
                </CardTitle>
                <CardDescription>Upcoming events you're registered for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockEvents
                    .filter((event) => registeredEvents.includes(event.id))
                    .map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getTypeColor(event.type)}>
                            {getEventIcon(event.type)}
                            <span className="ml-1 capitalize">{event.type}</span>
                          </Badge>
                          <Button variant="ghost" size="sm" onClick={() => handleToggleReminder(event.id)}>
                            {hasReminder(event.id) ? (
                              <Bell className="h-4 w-4 text-blue-600" />
                            ) : (
                              <BellOff className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                        <h4 className="font-semibold mb-1">{event.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{formatDate(event.startDate)}</p>
                        <p className="text-sm text-gray-600">{formatTime(event.startDate)}</p>
                        {event.meetingLink && (
                          <Button size="sm" className="w-full mt-3" asChild>
                            <a href={event.meetingLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Join Event
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Event Categories */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="webinar">Webinars</TabsTrigger>
              <TabsTrigger value="workshop">Workshops</TabsTrigger>
              <TabsTrigger value="networking">Networking</TabsTrigger>
              <TabsTrigger value="coaching">Coaching</TabsTrigger>
              <TabsTrigger value="masterclass">Masterclass</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            {["webinar", "workshop", "networking", "coaching", "masterclass"].map((type) => (
              <TabsContent key={type} value={type}>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2 capitalize flex items-center gap-2">
                    {getEventIcon(type)}
                    {type}s
                  </h2>
                  <p className="text-gray-600">
                    {type === "webinar" && "Interactive online presentations and Q&A sessions with industry experts"}
                    {type === "workshop" && "Hands-on learning sessions with practical exercises and group activities"}
                    {type === "networking" && "Connect with fellow professionals and expand your business network"}
                    {type === "coaching" && "One-on-one and group coaching sessions for personalized guidance"}
                    {type === "masterclass" && "Premium deep-dive sessions with renowned business leaders"}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getEventsByType(type).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Premium Upgrade CTA */}
          {currentUser.role === "basic" && (
            <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-8 text-center">
                <Crown className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Unlock Premium Events</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Get access to exclusive masterclasses, premium workshops, and VIP networking events with our Premium
                  membership.
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
