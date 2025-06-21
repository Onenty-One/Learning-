import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Pill, BookOpen, Video, Shield, Clock, MapPin, Bell, Heart } from "lucide-react"

const features = [
  {
    icon: Stethoscope,
    title: "Expert Doctors",
    description: "Connect with certified healthcare professionals across all specialties",
  },
  {
    icon: Video,
    title: "Telemedicine",
    description: "Secure video consultations from the comfort of your home",
  },
  {
    icon: Pill,
    title: "Medicine Delivery",
    description: "Order prescription medicines with doorstep delivery",
  },
  {
    icon: BookOpen,
    title: "Health Articles",
    description: "Access curated health content and medical knowledge base",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your medical data is secure with end-to-end encryption",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support and emergency assistance",
  },
  {
    icon: MapPin,
    title: "Location-Based",
    description: "Find nearby healthcare providers and pharmacies",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Never miss appointments or medication schedules",
  },
  {
    icon: Heart,
    title: "Health Tracking",
    description: "Monitor your health metrics and medical history",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Comprehensive Healthcare Solutions</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Everything you need to manage your health in one integrated platform
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
