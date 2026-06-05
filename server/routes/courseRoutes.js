const express = require('express');
const router = express.Router();

const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse, enrollCourses, addLesson, getLesson, markLessonComplete, getProgress, addReview, getReviews, getAverageRating,getMyCourses, deleteLesson,
    getInstructorCourses,getInstructorStats,
    updateLesson, 
  } = require("../controllers/courseController")

const authMiddleWare = require("../middleWares/authMiddleWare")
const roleMiddleWare = require("../middleWares/roleMiddleWare")
const {courseValidation,lessonValidation,reviewValidation,progressValidation,validate}=require("../middleWares/validation");
const upload = require('../middleWares/upload');



router.post(
    "/create",
    authMiddleWare,
    roleMiddleWare("admin", "instructor"),
    upload.single("image"),
    courseValidation,
    validate,
     createCourse
);
router.get("/", getCourses);

router.get("/my-courses", authMiddleWare, getMyCourses);

router.get("/instructor/my-courses",
  authMiddleWare,
  getInstructorCourses
);

router.get("/instructor/stats",
  authMiddleWare,
  getInstructorStats
);

// lessons & others
router.post("/:id/enroll", authMiddleWare, enrollCourses);

router.get("/:id/lessons", authMiddleWare, getLesson);

router.get("/:id/progress", authMiddleWare, getProgress);

router.post("/:id/progress", authMiddleWare, progressValidation, validate, markLessonComplete);

router.post("/:id/review", authMiddleWare, reviewValidation, validate, addReview);

router.get("/:id/reviews", authMiddleWare, getReviews);

router.get("/:id/rating", authMiddleWare, getAverageRating);

router.get("/:id", getCourseById);

module.exports = router;