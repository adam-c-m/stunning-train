"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { StickyNote, Edit, Trash2, Clock, Tag, Search, PlusCircle, Lock, Unlock } from "lucide-react"
import { formatTimestamp } from "@/lib/analytics"

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

interface VideoNotesProps {
  videoId: string
  currentTime: number
  onSeekTo: (timestamp: number) => void
}

export function VideoNotes({ videoId, currentTime, onSeekTo }: VideoNotesProps) {
  const [notes, setNotes] = useState<VideoNote[]>([])
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showPrivateOnly, setShowPrivateOnly] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<VideoNote | null>(null)

  const addNote = () => {
    if (!content.trim()) return
    const newNote: VideoNote = {
      id: Date.now().toString(),
      videoId,
      userId: "current-user",
      timestamp: currentTime,
      content,
      createdAt: new Date().toISOString().split("T")[0],
      isPrivate,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }
    setNotes([newNote, ...notes])
    setContent("")
    setTags("")
    setIsPrivate(true)
    setIsAddDialogOpen(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id))
  }

  const handleEditNote = () => {
    if (!editingNote) return

    setNotes(
      notes.map((note) =>
        note.id === editingNote.id ? { ...editingNote, updatedAt: new Date().toISOString() } : note,
      ),
    )
    setEditingNote(null)
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => note.tags.includes(tag))
    const matchesPrivacy = !showPrivateOnly || note.isPrivate

    return matchesSearch && matchesTags && matchesPrivacy
  })

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)))

  const NoteCard = ({ note }: { note: VideoNote }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSeekTo(note.timestamp)}
              className="p-0 h-auto text-blue-600 hover:text-blue-800 font-medium"
            >
              <Clock className="h-4 w-4 mr-2" />
              {formatTimestamp(note.timestamp)}
            </Button>
            <Badge variant="outline" className="text-xs">
              {new Date(note.createdAt).toLocaleDateString()}
            </Badge>
            {note.isPrivate ? (
              <Lock className="h-4 w-4 text-gray-500" />
            ) : (
              <Unlock className="h-4 w-4 text-green-500" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => setEditingNote(note)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Note</DialogTitle>
                  <DialogDescription>Update your note at {formatTimestamp(note.timestamp)}</DialogDescription>
                </DialogHeader>
                {editingNote && (
                  <div className="space-y-4">
                    <Textarea
                      value={editingNote.content}
                      onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                      rows={4}
                      placeholder="Update your note..."
                    />
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="edit-private"
                        checked={editingNote.isPrivate}
                        onCheckedChange={(checked) => setEditingNote({ ...editingNote, isPrivate: checked })}
                      />
                      <Label htmlFor="edit-private">Private note</Label>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button onClick={handleEditNote}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-gray-800 mb-3 leading-relaxed">{note.content}</p>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-blue-600" />
          My Notes ({notes.length})
        </h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
              <DialogDescription>Create a note at {formatTimestamp(currentTime)}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
              />
              <Input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
              <div className="flex items-center space-x-2">
                <Switch id="private" checked={isPrivate} onCheckedChange={setIsPrivate} />
                <Label htmlFor="private">Private note</Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addNote} disabled={!content.trim()}>
                Add Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes and tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="private-filter" checked={showPrivateOnly} onCheckedChange={setShowPrivateOnly} />
              <Label htmlFor="private-filter" className="text-sm">
                Private only
              </Label>
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium mb-2 block">Filter by tags:</Label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => {
                      setSelectedTags(
                        selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag],
                      )
                    }}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes List */}
      {filteredNotes.length > 0 ? (
        <div>
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="p-12 text-center">
            <StickyNote className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
            <p className="text-gray-600 mb-4">
              Start taking notes to capture key insights and important moments from this video
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your First Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No matching notes</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
