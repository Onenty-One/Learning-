"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  FileText,
  Camera,
  Settings,
  Users,
  Clock,
  Calendar,
} from "lucide-react"

const availableDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    consultationFee: 150,
    availableNow: true,
    nextAvailable: "Now",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.9,
    consultationFee: 120,
    availableNow: false,
    nextAvailable: "2:30 PM",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "General Physician",
    rating: 4.7,
    consultationFee: 100,
    availableNow: true,
    nextAvailable: "Now",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function TelemedicineInterface() {
  const [activeCall, setActiveCall] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Dr. Johnson", message: "Hello! How can I help you today?", time: "10:30 AM" },
    { id: 2, sender: "You", message: "I've been experiencing chest pain", time: "10:31 AM" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const startCall = (doctorId: number) => {
    setActiveCall(true)
  }

  const endCall = () => {
    setActiveCall(false)
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: "You",
          message: newMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setNewMessage("")
    }
  }

  if (activeCall) {
    return (
      <div className="h-screen bg-black text-white">
        {/* Video Call Interface */}
        <div className="relative h-full">
          {/* Main video area */}
          <div className="h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg?height=128&width=128" />
                <AvatarFallback className="text-2xl">SJ</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold mb-2">Dr. Sarah Johnson</h2>
              <p className="text-gray-400">Cardiologist</p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Connected</span>
              </div>
            </div>
          </div>

          {/* Self video (picture-in-picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
            <div className="h-full flex items-center justify-center">
              <span className="text-gray-400">Your Video</span>
            </div>
          </div>

          {/* Call controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
              <Button
                size="icon"
                variant={audioEnabled ? "secondary" : "destructive"}
                className="rounded-full"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>

              <Button
                size="icon"
                variant={videoEnabled ? "secondary" : "destructive"}
                className="rounded-full"
                onClick={() => setVideoEnabled(!videoEnabled)}
              >
                {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>

              <Button size="icon" variant="secondary" className="rounded-full">
                <MessageSquare className="h-4 w-4" />
              </Button>

              <Button size="icon" variant="secondary" className="rounded-full">
                <FileText className="h-4 w-4" />
              </Button>

              <Button size="icon" variant="destructive" className="rounded-full" onClick={endCall}>
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat sidebar (can be toggled) */}
          <div className="absolute top-0 right-0 w-80 h-full bg-white text-black border-l">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Chat</h3>
            </div>
            <div className="flex-1 p-4 space-y-4 h-[calc(100%-8rem)] overflow-y-auto">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button size="sm" onClick={sendMessage}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Telemedicine</h1>
        <p className="text-muted-foreground">Connect with doctors instantly through secure video consultations</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Available Doctors */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="mr-2 h-5 w-5" />
                Available Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableDoctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-muted-foreground">{doctor.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-yellow-500">★ {doctor.rating}</span>
                          <span className="text-muted-foreground">${doctor.consultationFee}</span>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{doctor.nextAvailable}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doctor.availableNow && <Badge className="bg-green-100 text-green-800">Available Now</Badge>}
                      <Button onClick={() => startCall(doctor.id)} disabled={!doctor.availableNow}>
                        <Video className="mr-2 h-4 w-4" />
                        {doctor.availableNow ? "Start Call" : "Schedule"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Family Consultation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Choose a Doctor</h4>
                  <p className="text-sm text-muted-foreground">Select from available specialists</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Start Video Call</h4>
                  <p className="text-sm text-muted-foreground">Connect instantly or schedule for later</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Get Treatment</h4>
                  <p className="text-sm text-muted-foreground">Receive diagnosis and prescriptions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Camera className="h-4 w-4 text-green-500" />
                <span>Camera: Enabled</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mic className="h-4 w-4 text-green-500" />
                <span>Microphone: Enabled</span>
              </div>
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4 text-green-500" />
                <span>Connection: Stable</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Test Audio/Video
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
