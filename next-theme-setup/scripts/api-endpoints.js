// Backend API Endpoints for HealthConnect Pro
// Node.js/Express Server Implementation

const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { MongoClient } = require("mongodb")

const app = express()
app.use(express.json())

// MongoDB Connection
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/healthconnect"
const client = new MongoClient(uri)

let db

async function connectToDatabase() {
  try {
    await client.connect()
    db = client.db()
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
    process.exit(1)
  }
}

connectToDatabase()

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// User Authentication Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, role, profile } = req.body

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = {
      email,
      password: hashedPassword,
      role,
      profile,
      createdAt: new Date(),
      isActive: true,
      emailVerified: false,
    }

    // Save to database
    const result = await db.collection("users").insertOne(user)

    // Generate JWT token
    const token = jwt.sign({ userId: result.insertedId, email, role }, process.env.JWT_SECRET, { expiresIn: "24h" })

    res.status(201).json({
      success: true,
      token,
      user: { id: result.insertedId, email, role },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await db.collection("users").findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" })
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ success: false, error: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })

    res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, role: user.role },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Doctor Routes
app.get("/api/doctors", async (req, res) => {
  try {
    const { specialty, location, insurance, availableToday, sortBy } = req.query

    const query = { isVerified: true }

    // Apply filters
    if (specialty && specialty !== "All Specialties") {
      query.specialties = specialty
    }

    if (insurance) {
      query.acceptedInsurance = { $in: insurance.split(",") }
    }

    // Get doctors with user profile data
    const doctors = await db
      .collection("doctors")
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userProfile",
          },
        },
        { $unwind: "$userProfile" },
      ])
      .toArray()

    // Sort results
    if (sortBy === "rating") {
      doctors.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "experience") {
      doctors.sort((a, b) => b.experience - a.experience)
    } else if (sortBy === "price") {
      doctors.sort((a, b) => a.consultationFee - b.consultationFee)
    }

    res.json({ success: true, doctors })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get("/api/doctors/:id", async (req, res) => {
  try {
    const doctor = await db
      .collection("doctors")
      .aggregate([
        { $match: { _id: req.params.id } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userProfile",
          },
        },
        { $unwind: "$userProfile" },
      ])
      .toArray()

    if (!doctor.length) {
      return res.status(404).json({ success: false, error: "Doctor not found" })
    }

    res.json({ success: true, doctor: doctor[0] })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Appointment Routes
app.post("/api/appointments", authenticateToken, async (req, res) => {
  try {
    const appointment = {
      ...req.body,
      patientId: req.user.userId,
      status: "scheduled",
      createdAt: new Date(),
    }

    const result = await db.collection("appointments").insertOne(appointment)

    // Send confirmation notifications
    // Implementation for SMS/Email notifications using Twilio/SendGrid

    res.status(201).json({
      success: true,
      appointmentId: result.insertedId,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get("/api/appointments", authenticateToken, async (req, res) => {
  try {
    const query = req.user.role === "patient" ? { patientId: req.user.userId } : { doctorId: req.user.userId }

    const appointments = await db
      .collection("appointments")
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: "users",
            localField: req.user.role === "patient" ? "doctorId" : "patientId",
            foreignField: "_id",
            as: "otherParty",
          },
        },
      ])
      .toArray()

    res.json({ success: true, appointments })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Medicine Routes
app.get("/api/medicines", async (req, res) => {
  try {
    const { search, category, prescriptionRequired } = req.query

    const query = { isActive: true, inStock: true }

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { genericName: { $regex: search, $options: "i" } }]
    }

    if (category && category !== "All Categories") {
      query.category = category
    }

    if (prescriptionRequired !== undefined) {
      query.prescriptionRequired = prescriptionRequired === "true"
    }

    const medicines = await db.collection("medicines").find(query).toArray()

    res.json({ success: true, medicines })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post("/api/orders", authenticateToken, async (req, res) => {
  try {
    const order = {
      ...req.body,
      patientId: req.user.userId,
      orderNumber: `ORD${Date.now()}`,
      orderStatus: "pending",
      paymentStatus: "pending",
      createdAt: new Date(),
    }

    const result = await db.collection("orders").insertOne(order)

    res.status(201).json({
      success: true,
      orderId: result.insertedId,
      orderNumber: order.orderNumber,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Health Articles Routes
app.get("/api/articles", async (req, res) => {
  try {
    const { category, language = "en", search } = req.query

    const query = { isPublished: true, language }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { tags: { $in: [new RegExp(search, "i")] } }]
    }

    const articles = await db
      .collection("articles")
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        { $sort: { publishedAt: -1 } },
      ])
      .toArray()

    res.json({ success: true, articles })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Medical Records Routes
app.get("/api/medical-records", authenticateToken, async (req, res) => {
  try {
    const records = await db
      .collection("medicalRecords")
      .find({ patientId: req.user.userId })
      .sort({ date: -1 })
      .toArray()

    res.json({ success: true, records })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Telemedicine Routes
app.post("/api/telemedicine/session", authenticateToken, async (req, res) => {
  try {
    const { appointmentId } = req.body

    // Generate video call link (integration with video service)
    const videoCallLink = `https://video.healthconnect.com/room/${appointmentId}`

    // Update appointment with video link
    await db
      .collection("appointments")
      .updateOne({ _id: appointmentId }, { $set: { videoCallLink, status: "in-progress" } })

    res.json({ success: true, videoCallLink })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Emergency Services Routes
app.get("/api/emergency/nearby", async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query

    // Find nearby hospitals and emergency services
    const emergencyServices = await db
      .collection("emergencyServices")
      .find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [longitude, latitude] },
            $maxDistance: radius * 1000, // Convert km to meters
          },
        },
      })
      .toArray()

    res.json({ success: true, services: emergencyServices })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Health Metrics Routes
app.post("/api/health-metrics", authenticateToken, async (req, res) => {
  try {
    const metric = {
      ...req.body,
      patientId: req.user.userId,
      recordedAt: new Date(),
    }

    const result = await db.collection("healthMetrics").insertOne(metric)

    res.status(201).json({ success: true, metricId: result.insertedId })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get("/api/health-metrics", authenticateToken, async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query

    const query = { patientId: req.user.userId }

    if (type) {
      query.type = type
    }

    if (startDate && endDate) {
      query.recordedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const metrics = await db.collection("healthMetrics").find(query).sort({ recordedAt: -1 }).toArray()

    res.json({ success: true, metrics })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`HealthConnect Pro API server running on port ${PORT}`)
})

module.exports = app
