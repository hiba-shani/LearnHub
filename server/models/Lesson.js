<<<<<<< HEAD
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  videoUrl: {
    type: String
  },

  notes: {
    type: String
  },

  pdf: {
    type: String
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }

}, { timestamps: true });

=======
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  videoUrl: {
    type: String
  },

  notes: {
    type: String
  },

  pdf: {
    type: String
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }

}, { timestamps: true });

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
module.exports = mongoose.model("Lesson", lessonSchema);