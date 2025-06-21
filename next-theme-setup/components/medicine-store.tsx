"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, ShoppingCart, Upload, Pill, Clock, Plus, Minus, Star, Shield } from "lucide-react"

// Sample medicine data
const sampleMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    manufacturer: "PharmaCorp",
    price: 12.99,
    originalPrice: 15.99,
    category: "Pain Relief",
    inStock: true,
    quantity: 50,
    rating: 4.5,
    reviews: 234,
    prescriptionRequired: false,
    image: "/placeholder.svg?height=200&width=200",
    description: "Effective pain relief and fever reducer",
    dosage: "1-2 tablets every 4-6 hours",
    sideEffects: ["Nausea", "Dizziness"],
    contraindications: ["Liver disease", "Alcohol dependency"],
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    genericName: "Amoxicillin",
    manufacturer: "MediPharm",
    price: 24.99,
    originalPrice: 29.99,
    category: "Antibiotics",
    inStock: true,
    quantity: 30,
    rating: 4.7,
    reviews: 156,
    prescriptionRequired: true,
    image: "/placeholder.svg?height=200&width=200",
    description: "Broad-spectrum antibiotic for bacterial infections",
    dosage: "1 capsule 3 times daily",
    sideEffects: ["Stomach upset", "Diarrhea"],
    contraindications: ["Penicillin allergy"],
  },
  {
    id: 3,
    name: "Vitamin D3 1000 IU",
    genericName: "Cholecalciferol",
    manufacturer: "HealthPlus",
    price: 18.99,
    originalPrice: 22.99,
    category: "Vitamins",
    inStock: true,
    quantity: 100,
    rating: 4.3,
    reviews: 89,
    prescriptionRequired: false,
    image: "/placeholder.svg?height=200&width=200",
    description: "Essential vitamin for bone health and immunity",
    dosage: "1 tablet daily with food",
    sideEffects: ["Rare: Hypercalcemia"],
    contraindications: ["Hypercalcemia", "Kidney stones"],
  },
]

const categories = [
  "All Categories",
  "Pain Relief",
  "Antibiotics",
  "Vitamins",
  "Heart Health",
  "Diabetes",
  "Mental Health",
  "Skin Care",
]

export function MedicineStore() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [prescriptionDialog, setPrescriptionDialog] = useState(false)

  const filteredMedicines = sampleMedicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || medicine.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (medicineId: number) => {
    setCart((prev) => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1,
    }))
  }

  const removeFromCart = (medicineId: number) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--
      } else {
        delete newCart[medicineId]
      }
      return newCart
    })
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const medicine = sampleMedicines.find((m) => m.id === Number.parseInt(id))
      return total + (medicine?.price || 0) * quantity
    }, 0)
  }

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Medicine Store</h1>
        <p className="text-muted-foreground">Order prescription and over-the-counter medicines with home delivery</p>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Medicines</TabsTrigger>
          <TabsTrigger value="prescription">Upload Prescription</TabsTrigger>
          <TabsTrigger value="refills">Refill Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          {getCartItemCount() > 0 && (
            <Card className="border-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    <span className="font-medium">{getCartItemCount()} items in cart</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold">${getCartTotal().toFixed(2)}</span>
                    <Button>Checkout</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Medicine Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMedicines.map((medicine) => (
              <Card key={medicine.id} className="transition-shadow hover:shadow-lg">
                <CardHeader className="p-4">
                  <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={medicine.image || "/placeholder.svg"}
                      alt={medicine.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{medicine.name}</h3>
                      <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
                      <p className="text-xs text-muted-foreground">by {medicine.manufacturer}</p>
                    </div>
                    {medicine.prescriptionRequired && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="mr-1 h-3 w-3" />
                        Rx
                      </Badge>
                    )}
                  </div>

                  <div className="mb-2 flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{medicine.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({medicine.reviews} reviews)</span>
                  </div>

                  <p className="mb-3 text-sm text-muted-foreground">{medicine.description}</p>

                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary">${medicine.price}</span>
                      {medicine.originalPrice > medicine.price && (
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ${medicine.originalPrice}
                        </span>
                      )}
                    </div>
                    <Badge variant={medicine.inStock ? "secondary" : "destructive"}>
                      {medicine.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    {cart[medicine.id] ? (
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => removeFromCart(medicine.id)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium">{cart[medicine.id]}</span>
                        <Button size="sm" variant="outline" onClick={() => addToCart(medicine.id)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" onClick={() => addToCart(medicine.id)} disabled={!medicine.inStock}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prescription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                Upload Prescription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="prescription-upload">Prescription Image</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-muted-foreground/25 px-6 py-10">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                      <label
                        htmlFor="prescription-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
                      >
                        <span>Upload a file</span>
                        <input
                          id="prescription-upload"
                          name="prescription-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*,.pdf"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="doctor-name">Doctor's Name</Label>
                <Input id="doctor-name" placeholder="Enter prescribing doctor's name" />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any special instructions or notes..." rows={3} />
              </div>

              <Button className="w-full">Submit Prescription</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Refill Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Metformin 500mg</h4>
                    <p className="text-sm text-muted-foreground">Next refill due: March 15, 2024</p>
                  </div>
                  <Button size="sm">
                    <Pill className="mr-2 h-4 w-4" />
                    Reorder
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="font-medium">Lisinopril 10mg</h4>
                    <p className="text-sm text-muted-foreground">Next refill due: March 20, 2024</p>
                  </div>
                  <Button size="sm">
                    <Pill className="mr-2 h-4 w-4" />
                    Reorder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
