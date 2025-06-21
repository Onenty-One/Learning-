// MongoDB Database Schema for HealthConnect Pro

// Users Collection Schema
const userSchema = {
  _id: "ObjectId",
  email: "string",
  password: "string", // hashed
  role: "string", // 'patient', 'doctor', 'admin'
  profile: {
    firstName: "string",
    lastName: "string",
    dateOfBirth: "Date",
    gender: "string",
    phone: "string",
    address: {
      street: "string",
      city: "string",
      state: "string",
      zipCode: "string",
      country: "string",
    },
    emergencyContact: {
      name: "string",
      phone: "string",
      relationship: "string",
    },
  },
  medicalInfo: {
    bloodType: "string",
    allergies: ["string"],
    chronicConditions: ["string"],
    currentMedications: ["string"],
    insuranceProvider: "string",
    insuranceId: "string",
  },
  preferences: {
    language: "string",
    notifications: {
      email: "boolean",
      sms: "boolean",
      push: "boolean",
    },
    theme: "string",
  },
  createdAt: "Date",
  updatedAt: "Date",
  isActive: "boolean",
  emailVerified: "boolean",
  twoFactorEnabled: "boolean",
}

// Doctors Collection Schema
const doctorSchema = {
  _id: "ObjectId",
  userId: "ObjectId", // Reference to Users collection
  specialties: ["string"],
  licenseNumber: "string",
  experience: "number", // years
  education: [
    {
      degree: "string",
      institution: "string",
      year: "number",
    },
  ],
  certifications: ["string"],
  languages: ["string"],
  consultationFee: "number",
  location: {
    clinicName: "string",
    address: {
      street: "string",
      city: "string",
      state: "string",
      zipCode: "string",
      country: "string",
    },
    coordinates: {
      latitude: "number",
      longitude: "number",
    },
  },
  availability: [
    {
      dayOfWeek: "number", // 0-6
      startTime: "string",
      endTime: "string",
      isAvailable: "boolean",
    },
  ],
  rating: "number",
  reviewCount: "number",
  acceptedInsurance: ["string"],
  telemedicineEnabled: "boolean",
  isVerified: "boolean",
  createdAt: "Date",
  updatedAt: "Date",
}

// Appointments Collection Schema
const appointmentSchema = {
  _id: "ObjectId",
  patientId: "ObjectId",
  doctorId: "ObjectId",
  appointmentDate: "Date",
  duration: "number", // minutes
  type: "string", // 'in-person', 'video', 'phone'
  status: "string", // 'scheduled', 'confirmed', 'completed', 'cancelled'
  reason: "string",
  symptoms: ["string"],
  notes: "string",
  prescription: [
    {
      medicineId: "ObjectId",
      dosage: "string",
      frequency: "string",
      duration: "string",
      instructions: "string",
    },
  ],
  diagnosis: "string",
  followUpRequired: "boolean",
  followUpDate: "Date",
  consultationFee: "number",
  paymentStatus: "string",
  videoCallLink: "string",
  createdAt: "Date",
  updatedAt: "Date",
}

// Medical Records Collection Schema
const medicalRecordSchema = {
  _id: "ObjectId",
  patientId: "ObjectId",
  doctorId: "ObjectId",
  appointmentId: "ObjectId",
  recordType: "string", // 'consultation', 'lab-result', 'prescription', 'vaccination'
  date: "Date",
  title: "string",
  description: "string",
  attachments: [
    {
      fileName: "string",
      fileUrl: "string",
      fileType: "string",
      uploadDate: "Date",
    },
  ],
  labResults: [
    {
      testName: "string",
      result: "string",
      normalRange: "string",
      unit: "string",
    },
  ],
  vitals: {
    bloodPressure: "string",
    heartRate: "number",
    temperature: "number",
    weight: "number",
    height: "number",
  },
  isPrivate: "boolean",
  accessLog: [
    {
      userId: "ObjectId",
      accessDate: "Date",
      action: "string",
    },
  ],
  createdAt: "Date",
  updatedAt: "Date",
}

// Medicines Collection Schema
const medicineSchema = {
  _id: "ObjectId",
  name: "string",
  genericName: "string",
  manufacturer: "string",
  category: "string",
  description: "string",
  dosageForm: "string", // 'tablet', 'capsule', 'syrup', 'injection'
  strength: "string",
  price: "number",
  originalPrice: "number",
  prescriptionRequired: "boolean",
  inStock: "boolean",
  quantity: "number",
  expiryDate: "Date",
  batchNumber: "string",
  sideEffects: ["string"],
  contraindications: ["string"],
  interactions: ["string"],
  storageInstructions: "string",
  images: ["string"],
  rating: "number",
  reviewCount: "number",
  isActive: "boolean",
  createdAt: "Date",
  updatedAt: "Date",
}

// Orders Collection Schema
const orderSchema = {
  _id: "ObjectId",
  patientId: "ObjectId",
  orderNumber: "string",
  items: [
    {
      medicineId: "ObjectId",
      quantity: "number",
      price: "number",
      prescriptionId: "ObjectId",
    },
  ],
  totalAmount: "number",
  discountAmount: "number",
  deliveryFee: "number",
  finalAmount: "number",
  paymentMethod: "string",
  paymentStatus: "string",
  orderStatus: "string", // 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  deliveryAddress: {
    street: "string",
    city: "string",
    state: "string",
    zipCode: "string",
    country: "string",
  },
  estimatedDelivery: "Date",
  actualDelivery: "Date",
  trackingNumber: "string",
  pharmacyId: "ObjectId",
  createdAt: "Date",
  updatedAt: "Date",
}

// Health Articles Collection Schema
const articleSchema = {
  _id: "ObjectId",
  title: "string",
  slug: "string",
  content: "string",
  summary: "string",
  authorId: "ObjectId", // Doctor who authored
  category: "string",
  tags: ["string"],
  language: "string", // 'en', 'hi', etc.
  readingTime: "number", // minutes
  views: "number",
  likes: "number",
  isPublished: "boolean",
  publishedAt: "Date",
  featuredImage: "string",
  medicallyReviewed: "boolean",
  reviewedBy: "ObjectId", // Doctor who reviewed
  reviewedAt: "Date",
  seoTitle: "string",
  seoDescription: "string",
  relatedArticles: ["ObjectId"],
  createdAt: "Date",
  updatedAt: "Date",
}

// Pharmacies Collection Schema
const pharmacySchema = {
  _id: "ObjectId",
  name: "string",
  licenseNumber: "string",
  address: {
    street: "string",
    city: "string",
    state: "string",
    zipCode: "string",
    country: "string",
  },
  coordinates: {
    latitude: "number",
    longitude: "number",
  },
  phone: "string",
  email: "string",
  operatingHours: [
    {
      dayOfWeek: "number",
      openTime: "string",
      closeTime: "string",
      isOpen: "boolean",
    },
  ],
  services: ["string"], // 'delivery', 'pickup', '24hour'
  deliveryRadius: "number", // km
  rating: "number",
  reviewCount: "number",
  isActive: "boolean",
  createdAt: "Date",
  updatedAt: "Date",
}

console.log("Database schemas defined for HealthConnect Pro")
