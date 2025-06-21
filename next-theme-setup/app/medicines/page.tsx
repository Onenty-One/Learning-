import { Navigation } from "@/components/navigation"
import { MedicineStore } from "@/components/medicine-store"
import { Footer } from "@/components/footer"

export default function MedicinesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <MedicineStore />
      </main>
      <Footer />
    </div>
  )
}
