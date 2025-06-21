import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "HealthConnect Pro made it so easy to find a specialist and book an appointment. The telemedicine feature saved me hours of travel time.",
    rating: 5,
  },
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "As a healthcare provider, I appreciate the platform's security features and how it streamlines patient communication.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The medicine delivery service is incredibly convenient. I never have to worry about running out of my prescriptions.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What Our Users Say</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Trusted by thousands of patients and healthcare providers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
