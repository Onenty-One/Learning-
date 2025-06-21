"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Star, Calendar, Video, Filter, Clock, DollarSign } from "lucide-react"

// Sample doctor data
const sampleDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 156,
    experience: 12,
    location: "Downtown Medical Center",
    distance: 2.3,
    consultationFee: 150,
    availableToday: true,
    acceptsInsurance: ["Blue Cross", "Aetna", "Cigna"],
    nextAvailable: "Today 3:00 PM",
    avatar: "/placeholder.svg?height=80&width=80",
    languages: ["English", "Spanish"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.9,
    reviews: 203,
    experience: 8,
    location: "Skin Care Clinic",
    distance: 1.8,
    consultationFee: 120,
    availableToday: false,
    acceptsInsurance: ["Blue Cross", "United Health"],
    nextAvailable: "Tomorrow 10:00 AM",
    avatar: "/placeholder.svg?height=80&width=80",
    languages: ["English", "Mandarin"],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.7,
    reviews: 89,
    experience: 15,
    location: "Children's Health Center",
    distance: 3.1,
    consultationFee: 100,
    availableToday: true,
    acceptsInsurance: ["Aetna", "Cigna", "Kaiser"],
    nextAvailable: "Today 5:30 PM",
    avatar: "/placeholder.svg?height=80&width=80",
    languages: ["English", "Spanish", "Portuguese"],
  },
]

const specialties = [
  "All Specialties",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic",
  "Neurologist",
  "Psychiatrist",
  "Gynecologist",
]

const insuranceProviders = ["Blue Cross", "Aetna", "Cigna", "United Health", "Kaiser"]

export function DoctorSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([])
  const [availableToday, setAvailableToday] = useState(false)
  const [sortBy, setSortBy] = useState("distance")
  const [doctors, setDoctors] = useState(sampleDoctors)

  useEffect(() => {
    // Filter and sort doctors based on criteria
    const filtered = sampleDoctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty
      const matchesInsurance =
        selectedInsurance.length === 0 || selectedInsurance.some((ins) => doctor.acceptsInsurance.includes(ins))
      const matchesAvailability = !availableToday || doctor.availableToday

      return matchesSearch && matchesSpecialty && matchesInsurance && matchesAvailability
    })

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance
        case "rating":
          return b.rating - a.rating
        case "experience":
          return b.experience - a.experience
        case "price":
          return a.consultationFee - b.consultationFee
        default:
          return 0
      }
    })

    setDoctors(filtered)
  }, [searchTerm, selectedSpecialty, selectedInsurance, availableToday, sortBy])

  const handleInsuranceChange = (insurance: string, checked: boolean) => {
    if (checked) {
      setSelectedInsurance([...selectedInsurance, insurance])
    } else {
      setSelectedInsurance(selectedInsurance.filter((ins) => ins !== insurance))
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Find Doctors Near You</h1>
        <p className="text-muted-foreground">Search and book appointments with qualified healthcare professionals</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors, specialties, or conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Nearest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="price">Lowest Price</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="available-today" checked={availableToday} onCheckedChange={setAvailableToday} />
              <label htmlFor="available-today" className="text-sm font-medium">
                Available Today
              </label>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Insurance Accepted</h4>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {insuranceProviders.map((insurance) => (
                  <div key={insurance} className="flex items-center space-x-2">
                    <Checkbox
                      id={insurance}
                      checked={selectedInsurance.includes(insurance)}
                      onCheckedChange={(checked) => handleInsuranceChange(insurance, checked as boolean)}
                    />
                    <label htmlFor={insurance} className="text-sm">
                      {insurance}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{doctors.length} doctors found</h2>
        </div>

        {doctors.map((doctor) => (
          <Card key={doctor.id} className="transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-primary">{doctor.specialty}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {doctor.rating} ({doctor.reviews} reviews)
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {doctor.experience} years exp.
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {doctor.distance} km away
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{doctor.location}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between md:items-end">
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <DollarSign className="mr-1 h-4 w-4" />${doctor.consultationFee} consultation
                    </div>
                    <div className="text-sm">
                      Next available: <span className="font-medium">{doctor.nextAvailable}</span>
                    </div>
                    {doctor.availableToday && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Available Today
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Button>
                    <Button size="sm">
                      <Video className="mr-2 h-4 w-4" />
                      Video Consult
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {doctor.acceptsInsurance.map((insurance) => (
                  <Badge key={insurance} variant="outline" className="text-xs">
                    {insurance}
                  </Badge>
                ))}
                {doctor.languages.map((language) => (
                  <Badge key={language} variant="secondary" className="text-xs">
                    {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
