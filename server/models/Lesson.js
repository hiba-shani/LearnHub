
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


module.exports = mongoose.model("Lesson", lessonSchema);