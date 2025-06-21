"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, FileText, Pill, Heart, Activity, TrendingUp, Video, Phone, MapPin } from "lucide-react"

// Sample dashboard data
const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2024-03-15",
    time: "10:00 AM",
    type: "video",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "2024-03-18",
    time: "2:30 PM",
    type: "in-person",
    status: "pending",
  },
]

const recentRecords = [
  {
    id: 1,
    type: "Lab Results",
    date: "2024-03-10",
    doctor: "Dr. Sarah Johnson",
    summary: "Blood work - All values normal",
  },
  {
    id: 2,
    type: "Prescription",
    date: "2024-03-08",
    doctor: "Dr. Emily Rodriguez",
    summary: "Metformin 500mg - Diabetes management",
  },
  {
    id: 3,
    type: "Consultation",
    date: "2024-03-05",
    doctor: "Dr. Michael Chen",
    summary: "Skin examination - Follow-up in 3 months",
  },
]

const currentMedications = [
  {
    id: 1,
    name: "Metformin 500mg",
    dosage: "Twice daily with meals",
    nextRefill: "2024-03-20",
    pillsLeft: 15,
  },
  {
    id: 2,
    name: "Lisinopril 10mg",
    dosage: "Once daily in morning",
    nextRefill: "2024-03-25",
    pillsLeft: 8,
  },
]

const healthMetrics = [
  { name: "Blood Pressure", value: "120/80", status: "normal", trend: "stable" },
  { name: "Heart Rate", value: "72 bpm", status: "normal", trend: "stable" },
  { name: "Weight", value: "165 lbs", status: "normal", trend: "down" },
  { name: "Blood Sugar", value: "95 mg/dL", status: "normal", trend: "stable" },
]

export function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Welcome back, John!</h1>
        <p className="text-muted-foreground">Here's your health overview and upcoming appointments</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Next Appointment</p>
                    <p className="text-2xl font-bold">Mar 15</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Medications</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recent Records</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                    <p className="text-2xl font-bold">85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {appointment.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{appointment.doctor}</h4>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {appointment.date} at {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {appointment.type === "video" ? (
                          <>
                            <Video className="mr-2 h-4 w-4" />
                            Join Call
                          </>
                        ) : (
                          <>
                            <MapPin className="mr-2 h-4 w-4" />
                            View Location
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">{metric.name}</h4>
                      <p className="text-2xl font-bold text-primary">{metric.value}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={metric.status === "normal" ? "secondary" : "destructive"}>{metric.status}</Badge>
                      <div className="mt-1 flex items-center text-sm text-muted-foreground">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        {metric.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Appointments</h2>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Book New Appointment
            </Button>
          </div>

          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {appointment.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{appointment.doctor}</h3>
                        <p className="text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {appointment.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                      <Button size="sm">
                        {appointment.type === "video" ? (
                          <>
                            <Video className="mr-2 h-4 w-4" />
                            Join Video Call
                          </>
                        ) : (
                          <>
                            <Phone className="mr-2 h-4 w-4" />
                            Call Doctor
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Medical Records</h2>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Request Records
            </Button>
          </div>

          <div className="space-y-4">
            {recentRecords.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{record.type}</h3>
                      <p className="text-muted-foreground">{record.summary}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{record.date}</span>
                        <span>•</span>
                        <span>{record.doctor}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Current Medications</h2>
            <Button variant="outline">
              <Pill className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </div>

          <div className="space-y-4">
            {currentMedications.map((medication) => (
              <Card key={medication.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{medication.name}</h3>
                      <p className="text-muted-foreground">{medication.dosage}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">Next refill: {medication.nextRefill}</span>
                        <span className="text-muted-foreground">Pills left: {medication.pillsLeft}</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Supply remaining</span>
                          <span>{Math.round((medication.pillsLeft / 30) * 100)}%</span>
                        </div>
                        <Progress value={(medication.pillsLeft / 30) * 100} className="mt-1" />
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      <Button size="sm">Refill Now</Button>
                      <Button size="sm" variant="outline">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Health Metrics</h2>
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Add Reading
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {healthMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{metric.name}</span>
                    <Badge variant={metric.status === "normal" ? "secondary" : "destructive"}>{metric.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    Trend: {metric.trend}
                  </div>
                  <div className="mt-4 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Chart visualization</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
