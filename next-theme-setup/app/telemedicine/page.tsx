import { Navigation } from "@/components/navigation"
import { TelemedicineInterface } from "@/components/telemedicine-interface"
import { Footer } from "@/components/footer"

export default function TelemedicinePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <TelemedicineInterface />
      </main>
      <Footer />
    </div>
  )
}
