"use client"

import { Button } from "@/components/ui/button"
import { Search, MapPin, Calendar, Pill, Video } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-20 text-primary-foreground">
      <div className="hero-pattern absolute inset-0 opacity-10" />
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">Your Health, Our Priority</h1>
          <p className="mb-8 text-xl text-primary-foreground/90">
            Connect with top doctors, order medicines, and manage your health records all in one secure platform.
            Healthcare made simple and accessible.
          </p>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/doctors">
                <Search className="mr-2 h-4 w-4" />
                Find Doctors
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link href="/telemedicine">
                <Video className="mr-2 h-4 w-4" />
                Start Video Consultation
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-2xl rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Button variant="ghost" className="h-auto flex-col space-y-2 p-4 text-white hover:bg-white/20" asChild>
                <Link href="/doctors">
                  <MapPin className="h-6 w-6" />
                  <span className="text-sm">Find Nearby Doctors</span>
                </Link>
              </Button>
              <Button variant="ghost" className="h-auto flex-col space-y-2 p-4 text-white hover:bg-white/20" asChild>
                <Link href="/medicines">
                  <Pill className="h-6 w-6" />
                  <span className="text-sm">Order Medicines</span>
                </Link>
              </Button>
              <Button variant="ghost" className="h-auto flex-col space-y-2 p-4 text-white hover:bg-white/20" asChild>
                <Link href="/dashboard">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Book Appointment</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
