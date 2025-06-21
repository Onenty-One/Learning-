export function StatsSection() {
  const stats = [
    { number: "10,000+", label: "Registered Doctors" },
    { number: "50,000+", label: "Happy Patients" },
    { number: "1M+", label: "Consultations" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-3xl font-bold sm:text-4xl">{stat.number}</div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
