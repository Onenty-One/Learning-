import { Navigation } from "@/components/navigation"
import { DoctorSearch } from "@/components/doctor-search"
import { Footer } from "@/components/footer"

export default function DoctorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <DoctorSearch />
      </main>
      <Footer />
    </div>
  )
}
