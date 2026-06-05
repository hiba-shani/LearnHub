
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");

// ❌ REMOVE THIS (nodemailer)
// const transporter = require("./config/email");

const app = express();

// DB
connectDB();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://learnhub-hnws.onrender.com",
      "https://learn-hub-sandy-gamma.vercel.app"
    ],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("LMS API Running");
});

app.use("/api", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// Error handling
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
});