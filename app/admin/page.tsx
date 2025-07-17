"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Settings,
  Package,
  Users,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  EyeOff,
  Star,
  Crown,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/role-guard"
import { getCurrentUser, type User, type UserRole } from "@/lib/auth"

interface StoreItem {
  id: string
  name: string
  description: string
  price: number
  category: "digital" | "physical" | "experiences" | "upgrades"
  inStock: boolean
  popular: boolean
  exclusive: boolean
  totalSales: number
  revenue: number
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const currentUser = getCurrentUser()

  const [storeItems, setStoreItems] = useState<StoreItem[]>([
    {
      id: "1",
      name: "Business Strategy Template Pack",
      description: "Professional templates for business planning, SWOT analysis, and strategic roadmaps",
      price: 150,
      category: "digital",
      inStock: true,
      popular: true,
      exclusive: false,
      totalSales: 45,
      revenue: 6750,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Premium Course: Leadership Mastery",
      description: "8-week comprehensive leadership development course with video lessons and exercises",
      price: 500,
      category: "digital",
      inStock: true,
      popular: false,
      exclusive: true,
      totalSales: 23,
      revenue: 11500,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-20",
    },
    {
      id: "3",
      name: "BusinessPro Academy Mug",
      description: "Premium ceramic mug with motivational business quotes",
      price: 75,
      category: "physical",
      inStock: false,
      popular: true,
      exclusive: false,
      totalSales: 89,
      revenue: 6675,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-25",
    },
  ])

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@businesspro.com",
      role: "admin",
      level: 5,
      totalPoints: 1250,
      joinDate: "2024-01-15",
      lastActive: "2024-01-30",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah@businesspro.com",
      role: "premium",
      level: 8,
      totalPoints: 2450,
      joinDate: "2024-01-10",
      lastActive: "2024-01-30",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      email: "mike@businesspro.com",
      role: "basic",
      level: 6,
      totalPoints: 1680,
      joinDate: "2024-01-20",
      lastActive: "2024-01-28",
      status: "inactive",
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma@businesspro.com",
      role: "premium",
      level: 4,
      totalPoints: 980,
      joinDate: "2024-01-22",
      lastActive: "2024-01-29",
      status: "active",
    },
    {
      id: "5",
      name: "Guest User",
      email: "guest@example.com",
      role: "guest",
      level: 1,
      totalPoints: 0,
      joinDate: "2024-01-30",
      lastActive: "2024-01-30",
      status: "active",
    },
  ])

  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUserEditDialogOpen, setIsUserEditDialogOpen] = useState(false)

  const [newItem, setNewItem] = useState<Partial<StoreItem>>({
    name: "",
    description: "",
    price: 0,
    category: "digital",
    inStock: true,
    popular: false,
    exclusive: false,
  })

  const handleAddItem = () => {
    const item: StoreItem = {
      id: Date.now().toString(),
      name: newItem.name || "",
      description: newItem.description || "",
      price: newItem.price || 0,
      category: newItem.category || "digital",
      inStock: newItem.inStock || true,
      popular: newItem.popular || false,
      exclusive: newItem.exclusive || false,
      totalSales: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setStoreItems([...storeItems, item])
    setNewItem({
      name: "",
      description: "",
      price: 0,
      category: "digital",
      inStock: true,
      popular: false,
      exclusive: false,
    })
    setIsAddDialogOpen(false)
  }

  const handleEditItem = () => {
    if (!selectedItem) return

    setStoreItems(
      storeItems.map((item) =>
        item.id === selectedItem.id ? { ...selectedItem, updatedAt: new Date().toISOString().split("T")[0] } : item,
      ),
    )
    setIsEditDialogOpen(false)
    setSelectedItem(null)
  }

  const handleDeleteItem = (itemId: string) => {
    setStoreItems(storeItems.filter((item) => item.id !== itemId))
  }

  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  const toggleItemStock = (itemId: string) => {
    setStoreItems(
      storeItems.map((item) =>
        item.id === itemId
          ? { ...item, inStock: !item.inStock, updatedAt: new Date().toISOString().split("T")[0] }
          : item,
      ),
    )
  }

  const toggleItemPopular = (itemId: string) => {
    setStoreItems(
      storeItems.map((item) =>
        item.id === itemId
          ? { ...item, popular: !item.popular, updatedAt: new Date().toISOString().split("T")[0] }
          : item,
      ),
    )
  }

  const toggleItemExclusive = (itemId: string) => {
    setStoreItems(
      storeItems.map((item) =>
        item.id === itemId
          ? { ...item, exclusive: !item.exclusive, updatedAt: new Date().toISOString().split("T")[0] }
          : item,
      ),
    )
  }

  const totalRevenue = storeItems.reduce((sum, item) => sum + item.revenue, 0)
  const totalSales = storeItems.reduce((sum, item) => sum + item.totalSales, 0)
  const activeUsers = users.filter((user) => user.status === "active").length
  const totalUsers = users.length

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "premium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "basic":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "guest":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const ItemFormDialog = ({
    isOpen,
    onClose,
    onSave,
    item,
    title,
  }: {
    isOpen: boolean
    onClose: () => void
    onSave: () => void
    item: Partial<StoreItem>
    title: string
  }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {title.includes("Add") ? "Create a new store item" : "Edit store item details"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={item.name || ""}
              onChange={(e) =>
                title.includes("Add")
                  ? setNewItem({ ...newItem, name: e.target.value })
                  : setSelectedItem({ ...selectedItem!, name: e.target.value })
              }
              placeholder="Enter item name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (Points)</Label>
            <Input
              id="price"
              type="number"
              value={item.price || 0}
              onChange={(e) =>
                title.includes("Add")
                  ? setNewItem({ ...newItem, price: Number.parseInt(e.target.value) || 0 })
                  : setSelectedItem({ ...selectedItem!, price: Number.parseInt(e.target.value) || 0 })
              }
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={item.category || "digital"}
              onValueChange={(value) =>
                title.includes("Add")
                  ? setNewItem({ ...newItem, category: value as any })
                  : setSelectedItem({ ...selectedItem!, category: value as any })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="digital">Digital</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="experiences">Experiences</SelectItem>
                <SelectItem value="upgrades">Upgrades</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={item.inStock || false}
                onCheckedChange={(checked) =>
                  title.includes("Add")
                    ? setNewItem({ ...newItem, inStock: checked })
                    : setSelectedItem({ ...selectedItem!, inStock: checked })
                }
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="popular"
                checked={item.popular || false}
                onCheckedChange={(checked) =>
                  title.includes("Add")
                    ? setNewItem({ ...newItem, popular: checked })
                    : setSelectedItem({ ...selectedItem!, popular: checked })
                }
              />
              <Label htmlFor="popular">Popular Item</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="exclusive"
                checked={item.exclusive || false}
                onCheckedChange={(checked) =>
                  title.includes("Add")
                    ? setNewItem({ ...newItem, exclusive: checked })
                    : setSelectedItem({ ...selectedItem!, exclusive: checked })
                }
              />
              <Label htmlFor="exclusive">Exclusive Item</Label>
            </div>
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={item.description || ""}
              onChange={(e) =>
                title.includes("Add")
                  ? setNewItem({ ...newItem, description: e.target.value })
                  : setSelectedItem({ ...selectedItem!, description: e.target.value })
              }
              placeholder="Enter item description"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>{title.includes("Add") ? "Add Item" : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <RoleGuard requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Settings className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
              </div>
              <nav className="flex items-center gap-4">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Back to App
                </Link>
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Admin
                </Badge>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">{totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">points earned</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sales</p>
                    <p className="text-2xl font-bold text-blue-600">{totalSales}</p>
                    <p className="text-xs text-gray-500">items sold</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-purple-600">{activeUsers}</p>
                    <p className="text-xs text-gray-500">of {totalUsers} total</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Store Items</p>
                    <p className="text-2xl font-bold text-orange-600">{storeItems.length}</p>
                    <p className="text-xs text-gray-500">total products</p>
                  </div>
                  <Package className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inventory">Store Inventory</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Store Inventory Tab */}
            <TabsContent value="inventory">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Store Inventory Management</CardTitle>
                      <CardDescription>Manage store items, pricing, and availability</CardDescription>
                    </div>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storeItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500 max-w-xs truncate">{item.description}</div>
                              <div className="flex gap-1 mt-1">
                                {item.popular && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Star className="h-3 w-3 mr-1" />
                                    Popular
                                  </Badge>
                                )}
                                {item.exclusive && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Exclusive
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {item.price}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {item.inStock ? (
                                <Badge variant="default">In Stock</Badge>
                              ) : (
                                <Badge variant="destructive">Out of Stock</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{item.totalSales}</TableCell>
                          <TableCell>{item.revenue.toLocaleString()}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedItem(item)
                                    setIsEditDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleItemStock(item.id)}>
                                  {item.inStock ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {item.inStock ? "Mark Out of Stock" : "Mark In Stock"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleItemPopular(item.id)}>
                                  <Star className="h-4 w-4 mr-2" />
                                  {item.popular ? "Remove Popular" : "Mark Popular"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleItemExclusive(item.id)}>
                                  <Crown className="h-4 w-4 mr-2" />
                                  {item.exclusive ? "Remove Exclusive" : "Mark Exclusive"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteItem(item.id)} className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Management Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage user accounts, roles, and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Level {user.level}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {user.totalPoints.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateUserRole(user.id, "admin")}>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Make Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateUserRole(user.id, "premium")}>
                                  <Crown className="h-4 w-4 mr-2" />
                                  Make Premium
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateUserRole(user.id, "basic")}>
                                  <Users className="h-4 w-4 mr-2" />
                                  Make Basic
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Top Selling Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {storeItems
                        .sort((a, b) => b.totalSales - a.totalSales)
                        .slice(0, 5)
                        .map((item, index) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                              </div>
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.totalSales} sales</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{item.revenue.toLocaleString()}</div>
                              <div className="text-sm text-gray-500">points</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Role Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(["admin", "premium", "basic", "guest"] as UserRole[]).map((role) => {
                        const roleUsers = users.filter((user) => user.role === role)
                        const percentage = (roleUsers.length / users.length) * 100

                        return (
                          <div key={role} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="capitalize font-medium flex items-center gap-2">
                                <Badge variant="outline" className={getRoleBadgeColor(role)}>
                                  {role}
                                </Badge>
                              </span>
                              <span className="text-sm text-gray-500">{roleUsers.length} users</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <div className="text-sm text-gray-600">{percentage.toFixed(1)}% of total users</div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Item Dialog */}
        <ItemFormDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSave={handleAddItem}
          item={newItem}
          title="Add New Item"
        />

        {/* Edit Item Dialog */}
        <ItemFormDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false)
            setSelectedItem(null)
          }}
          onSave={handleEditItem}
          item={selectedItem || {}}
          title="Edit Item"
        />
      </div>
    </RoleGuard>
  )
}
