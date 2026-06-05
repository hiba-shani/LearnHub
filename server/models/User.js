const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true
    },

    password: String,

    role: {
      type: String,
      enum: ["admin", "student", "instructor"],
      default: "student"
    },
    status: {
      type: String,
      enum: ["pending", "approved", "blocked"],
      default: "pending"
    },

    otp: String,

    otpExpiry: Date,

    isVerified: {
      type: Boolean,
      default: false
    },

    // ✅ BLOCK USER
    isBlocked: {
      type: Boolean,
      default: false
    },

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  },
  {
    timestamps: true
  },

);

module.exports = mongoose.model("User", userSchema);