import { Navigation } from "@/components/navigation"
import { PatientDashboard } from "@/components/patient-dashboard"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <PatientDashboard />
      </main>
      <Footer />
    </div>
  )
}
