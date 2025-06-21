// Sample Test Data for HealthConnect Pro

// Sample Users Data
const sampleUsers = [
  {
    _id: "user_001",
    email: "john.doe@email.com",
    role: "patient",
    profile: {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date("1985-06-15"),
      gender: "male",
      phone: "+1-555-0123",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
    },
    medicalInfo: {
      bloodType: "O+",
      allergies: ["Penicillin", "Shellfish"],
      chronicConditions: ["Hypertension"],
      insuranceProvider: "Blue Cross Blue Shield",
      insuranceId: "BC123456789",
    },
    preferences: {
      language: "en",
      notifications: { email: true, sms: true, push: true },
    },
  },
  {
    _id: "user_002",
    email: "dr.sarah.johnson@healthconnect.com",
    role: "doctor",
    profile: {
      firstName: "Sarah",
      lastName: "Johnson",
      phone: "+1-555-0456",
    },
  },
]

// Sample Doctors Data
const sampleDoctors = [
  {
    _id: "doc_001",
    userId: "user_002",
    specialties: ["Cardiology", "Internal Medicine"],
    licenseNumber: "MD123456",
    experience: 12,
    education: [
      {
        degree: "MD",
        institution: "Harvard Medical School",
        year: 2008,
      },
    ],
    languages: ["English", "Spanish"],
    consultationFee: 150,
    location: {
      clinicName: "Downtown Medical Center",
      address: {
        street: "456 Health Ave",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "USA",
      },
      coordinates: { latitude: 40.7128, longitude: -74.006 },
    },
    rating: 4.8,
    reviewCount: 156,
    acceptedInsurance: ["Blue Cross", "Aetna", "Cigna"],
    telemedicineEnabled: true,
    isVerified: true,
  },
]

// Sample Medicines Data
const sampleMedicines = [
  {
    _id: "med_001",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    manufacturer: "PharmaCorp",
    category: "Pain Relief",
    description: "Effective pain relief and fever reducer",
    dosageForm: "tablet",
    strength: "500mg",
    price: 12.99,
    originalPrice: 15.99,
    prescriptionRequired: false,
    inStock: true,
    quantity: 500,
    sideEffects: ["Nausea", "Dizziness"],
    contraindications: ["Liver disease"],
    rating: 4.5,
    reviewCount: 234,
  },
  {
    _id: "med_002",
    name: "Amoxicillin 250mg",
    genericName: "Amoxicillin",
    manufacturer: "MediPharm",
    category: "Antibiotics",
    description: "Broad-spectrum antibiotic for bacterial infections",
    dosageForm: "capsule",
    strength: "250mg",
    price: 24.99,
    originalPrice: 29.99,
    prescriptionRequired: true,
    inStock: true,
    quantity: 200,
    sideEffects: ["Stomach upset", "Diarrhea"],
    contraindications: ["Penicillin allergy"],
    rating: 4.7,
    reviewCount: 156,
  },
]

// Sample Health Articles Data
const sampleArticles = [
  {
    _id: "article_001",
    title: "Understanding Heart Health: Prevention and Care",
    slug: "understanding-heart-health-prevention-care",
    content: "Heart disease remains one of the leading causes of death worldwide...",
    summary: "Learn about heart disease prevention, symptoms, and treatment options.",
    authorId: "doc_001",
    category: "Cardiology",
    tags: ["heart health", "prevention", "cardiology"],
    language: "en",
    readingTime: 8,
    views: 1250,
    likes: 89,
    isPublished: true,
    publishedAt: new Date("2024-01-15"),
    medicallyReviewed: true,
    reviewedBy: "doc_001",
  },
  {
    _id: "article_002",
    title: "Managing Diabetes: A Complete Guide",
    slug: "managing-diabetes-complete-guide",
    content: "Diabetes management involves careful monitoring of blood sugar levels...",
    summary: "Comprehensive guide to diabetes management and lifestyle changes.",
    authorId: "doc_001",
    category: "Endocrinology",
    tags: ["diabetes", "blood sugar", "management"],
    language: "en",
    readingTime: 12,
    views: 2100,
    likes: 156,
    isPublished: true,
    publishedAt: new Date("2024-01-10"),
    medicallyReviewed: true,
  },
]

console.log("Sample data created for HealthConnect Pro")
console.log(`Users: ${sampleUsers.length}`)
console.log(`Doctors: ${sampleDoctors.length}`)
console.log(`Medicines: ${sampleMedicines.length}`)
console.log(`Articles: ${sampleArticles.length}`)
