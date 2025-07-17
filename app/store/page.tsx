"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Star,
  BookOpen,
  Users,
  Zap,
  Crown,
  Gift,
  ShoppingCart,
  Coffee,
  Briefcase,
  Award,
  Calendar,
  Video,
  FileText,
  Headphones,
  Palette,
  Check,
} from "lucide-react"
import Link from "next/link"

interface StoreItem {
  id: string
  name: string
  description: string
  price: number
  category: "digital" | "physical" | "experiences" | "upgrades"
  icon: any
  image: string
  inStock: boolean
  popular?: boolean
  exclusive?: boolean
}

interface UserInventory {
  itemId: string
  purchaseDate: string
  used: boolean
}

// Mock function to get current user role
const getCurrentUser = () => {
  return { role: "admin" } // Or "user"
}

export default function Store() {
  const [userPoints, setUserPoints] = useState(1250)
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null)
  const [inventory, setInventory] = useState<UserInventory[]>([
    { itemId: "1", purchaseDate: "2024-01-15", used: false },
    { itemId: "8", purchaseDate: "2024-01-20", used: true },
  ])

  const storeItems: StoreItem[] = [
    // Digital Rewards
    {
      id: "1",
      name: "Business Strategy Template Pack",
      description: "Professional templates for business planning, SWOT analysis, and strategic roadmaps",
      price: 150,
      category: "digital",
      icon: FileText,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
      popular: true,
    },
    {
      id: "2",
      name: "Premium Course: Leadership Mastery",
      description: "8-week comprehensive leadership development course with video lessons and exercises",
      price: 500,
      category: "digital",
      icon: Video,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
      exclusive: true,
    },
    {
      id: "3",
      name: "Financial Planning Spreadsheet Suite",
      description: "Advanced Excel templates for budgeting, forecasting, and financial analysis",
      price: 200,
      category: "digital",
      icon: FileText,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
    },
    {
      id: "4",
      name: "Productivity Audiobook Collection",
      description: "5 bestselling audiobooks on productivity, time management, and efficiency",
      price: 300,
      category: "digital",
      icon: Headphones,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
    },

    // Physical Rewards
    {
      id: "5",
      name: "BusinessPro Academy Mug",
      description: "Premium ceramic mug with motivational business quotes",
      price: 75,
      category: "physical",
      icon: Coffee,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
      popular: true,
    },
    {
      id: "6",
      name: "Executive Notebook Set",
      description: "Leather-bound notebook with business planning templates and goal-setting pages",
      price: 120,
      category: "physical",
      icon: BookOpen,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
    },
    {
      id: "7",
      name: "BusinessPro Branded Polo Shirt",
      description: "High-quality polo shirt with embroidered BusinessPro Academy logo",
      price: 180,
      category: "physical",
      icon: Briefcase,
      image: "/placeholder.svg?height=200&width=300",
      inStock: false,
    },

    // Experiences
    {
      id: "8",
      name: "1-on-1 Business Coaching Session",
      description: "60-minute personalized coaching session with a certified business mentor",
      price: 400,
      category: "experiences",
      icon: Users,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
      exclusive: true,
    },
    {
      id: "9",
      name: "Virtual Networking Event Access",
      description: "Exclusive access to monthly virtual networking events with industry leaders",
      price: 250,
      category: "experiences",
      icon: Calendar,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
    },
    {
      id: "10",
      name: "Masterclass Workshop Series",
      description: "Access to quarterly masterclass workshops on advanced business topics",
      price: 600,
      category: "experiences",
      icon: Award,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
      popular: true,
    },

    // Upgrades
    {
      id: "11",
      name: "Double XP Boost (7 days)",
      description: "Earn double points from all completed tasks for one week",
      price: 100,
      category: "upgrades",
      icon: Zap,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
      popular: true,
    },
    {
      id: "12",
      name: "Premium Profile Badge",
      description: "Exclusive golden badge displayed on your profile and leaderboard",
      price: 80,
      category: "upgrades",
      icon: Crown,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
    },
    {
      id: "13",
      name: "Custom Avatar Frame",
      description: "Personalized avatar frame with your choice of design and colors",
      price: 60,
      category: "upgrades",
      icon: Palette,
      image: "/placeholder.svg?height=200&width=300",
      inStock: true,
    },
  ]

  const purchaseItem = (item: StoreItem) => {
    if (userPoints >= item.price && item.inStock) {
      setUserPoints((prev) => prev - item.price)
      setInventory((prev) => [
        ...prev,
        {
          itemId: item.id,
          purchaseDate: new Date().toISOString().split("T")[0],
          used: false,
        },
      ])
      setSelectedItem(null)
    }
  }

  const getItemsByCategory = (category: string) => {
    return storeItems.filter((item) => item.category === category)
  }

  const isItemOwned = (itemId: string) => {
    return inventory.some((item) => item.itemId === itemId)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "digital":
        return <FileText className="h-5 w-5" />
      case "physical":
        return <Gift className="h-5 w-5" />
      case "experiences":
        return <Users className="h-5 w-5" />
      case "upgrades":
        return <Zap className="h-5 w-5" />
      default:
        return <ShoppingCart className="h-5 w-5" />
    }
  }

  const StoreItemCard = ({ item }: { item: StoreItem }) => {
    const IconComponent = item.icon
    const owned = isItemOwned(item.id)

    return (
      <Card
        className={`transition-all duration-200 hover:shadow-lg ${!item.inStock ? "opacity-60" : ""} ${item.popular ? "ring-2 ring-blue-200" : ""}`}
      >
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              {item.popular && (
                <Badge className="bg-blue-600 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              {item.exclusive && (
                <Badge className="bg-purple-600 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Exclusive
                </Badge>
              )}
              {owned && (
                <Badge className="bg-green-600 text-white">
                  <Check className="h-3 w-3 mr-1" />
                  Owned
                </Badge>
              )}
            </div>
            {!item.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconComponent className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-bold text-lg">{item.price}</span>
                <span className="text-sm text-gray-600">points</span>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" disabled={!item.inStock || owned} onClick={() => setSelectedItem(item)}>
                    {owned ? "Owned" : !item.inStock ? "Out of Stock" : "View Details"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      {item.name}
                    </DialogTitle>
                    <DialogDescription>{item.description}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm text-gray-600">Price</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold text-xl">{item.price}</span>
                          <span className="text-gray-600">points</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Your Balance</div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-blue-500" />
                          <span className="font-bold text-xl">{userPoints}</span>
                          <span className="text-gray-600">points</span>
                        </div>
                      </div>
                    </div>

                    {userPoints < item.price && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">
                          You need {item.price - userPoints} more points to purchase this item.
                        </p>
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={() => purchaseItem(item)}
                      disabled={userPoints < item.price || !item.inStock || owned}
                      className="w-full"
                    >
                      {owned
                        ? "Already Owned"
                        : !item.inStock
                          ? "Out of Stock"
                          : userPoints < item.price
                            ? "Insufficient Points"
                            : `Purchase for ${item.price} points`}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

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
              <Link href="/leaderboard" className="text-gray-600 hover:text-gray-900">
                Leaderboard
              </Link>
              <Link href="/training" className="text-gray-600 hover:text-gray-900">
                Training
              </Link>
              {getCurrentUser().role === "admin" && (
                <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
                <Star className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-600">{userPoints}</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Reward Store</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Spend your hard-earned points on valuable rewards, exclusive experiences, and powerful upgrades to enhance
            your business journey.
          </p>
        </div>

        {/* Points Balance */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Point Balance</h2>
                <p className="text-gray-600">Earn more points by completing daily, weekly, and monthly tasks</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <span className="text-4xl font-bold text-blue-600">{userPoints}</span>
                </div>
                <p className="text-sm text-gray-600">Available Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Categories */}
        <Tabs defaultValue="digital" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="digital" className="flex items-center gap-2">
              {getCategoryIcon("digital")}
              Digital
            </TabsTrigger>
            <TabsTrigger value="physical" className="flex items-center gap-2">
              {getCategoryIcon("physical")}
              Physical
            </TabsTrigger>
            <TabsTrigger value="experiences" className="flex items-center gap-2">
              {getCategoryIcon("experiences")}
              Experiences
            </TabsTrigger>
            <TabsTrigger value="upgrades" className="flex items-center gap-2">
              {getCategoryIcon("upgrades")}
              Upgrades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="digital">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Digital Resources</h2>
              <p className="text-gray-600">Templates, courses, and digital tools to accelerate your business growth</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getItemsByCategory("digital").map((item) => (
                <StoreItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="physical">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Physical Rewards</h2>
              <p className="text-gray-600">
                Tangible items to celebrate your achievements and show your BusinessPro pride
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getItemsByCategory("physical").map((item) => (
                <StoreItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Exclusive Experiences</h2>
              <p className="text-gray-600">
                One-on-one coaching, networking events, and premium learning opportunities
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getItemsByCategory("experiences").map((item) => (
                <StoreItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upgrades">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Account Upgrades</h2>
              <p className="text-gray-600">Boost your progress and customize your profile with special upgrades</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getItemsByCategory("upgrades").map((item) => (
                <StoreItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* My Purchases */}
        {inventory.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                My Purchases
              </CardTitle>
              <CardDescription>Items you've purchased with your points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inventory.map((purchase, index) => {
                  const item = storeItems.find((i) => i.id === purchase.itemId)
                  if (!item) return null

                  const IconComponent = item.icon
                  return (
                    <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <IconComponent className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Purchased {purchase.purchaseDate}</p>
                      </div>
                      <Badge variant={purchase.used ? "secondary" : "default"}>
                        {purchase.used ? "Used" : "Available"}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
