<<<<<<< HEAD
const mongoose = require('mongoose');
const Course = require('./Course');

const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    completedLessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson"
        }
    ]
}, { timestamps: true });

=======
const mongoose = require('mongoose');
const Course = require('./Course');

const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    completedLessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson"
        }
    ]
}, { timestamps: true });

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
module.exports = mongoose.model("Progress", progressSchema);