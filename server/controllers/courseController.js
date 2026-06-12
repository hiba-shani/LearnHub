
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const User = require("../models/User");
const Progress = require("../models/Progress");
const Review = require("../models/Review");

exports.createCourse = async (req, res) => {
  
  console.log("Body Data:",req.body);
  console.log("File data:",req.file);

  try {

    
  if(!req.file){
    return res.status(400).json({message:"file not uploaded"});
  }

    const {
      title,
      shortDescription,
      longDescription,
      price,
      instructorName,
      category,
    } = req.body;

    let reviews=[];

    if (category ==="WebDevelopment") {

      reviews = [

        {

          userName: "Rahul",

          rating: 5,

          comment: "Best MERN stack course for beginners"

        },

        {

          userName: "Arjun",

          rating: 4,

          comment: "Projects helped me understand React and Node easily"

        },

        {

          userName: "Neha",

          rating: 5,

          comment: "Loved the real-world project section"

        },

        {

          userName: "Aisha",

          rating: 4,

          comment: "Good explanation of MongoDB and Express"

        },

        {

          userName: "Farhan",

          rating: 5,

          comment: "Very useful for freshers"

        }

      ];

    }


    else if (category ==="Marketing") {

      reviews = [

        {

          userName: "Sneha",

          rating: 5,

          comment: "SEO concepts were explained clearly"

        },

        {

          userName: "Aditya",

          rating: 4,

          comment: "Meta ads section was very helpful"

        },

        {

          userName: "Niya",

          rating: 5,

          comment: "Excellent digital marketing course"

        },

        {

          userName: "Vishnu",

          rating: 4,

          comment: "Easy to understand for beginners"

        },

        {

          userName: "Kiran",

          rating: 5,

          comment: "Practical examples made learning simple"

        }

      ];

    }

    

    else if (category ==="UI/UX Design") {

      reviews = [

        {

          userName: "Anjali",

          rating: 5,

          comment: "Python basics explained very well"

        },

        {

          userName: "Rahul",

          rating: 4,

          comment: "Coding exercises were useful"

        },

        {

          userName: "Ameen",

          rating: 5,

          comment: "Perfect course for beginners"

        },

        {

          userName: "Sneha",

          rating: 4,

          comment: "Loved the mini projects"

        },

        {

          userName: "Adarsh",

          rating: 5,

          comment: "One of the best Python courses online"

        }

      ];

    }

    

    else {

      reviews = [

        {

          userName: "Rahul",

          rating: 5,

          comment: "Excellent course"

        },

        {

          userName: "Neha",

          rating: 4,

          comment: "Very informative and easy to follow"

        },

        {

          userName: "Arjun",

          rating: 5,

          comment: "Loved the practical sessions"

        },

        {

          userName: "Aisha",

          rating: 4,

          comment: "Good course for beginners"

        },

        {

          userName: "Farhan",

          rating: 5,

          comment: "Worth the money"

        }
      ];
    }

    const course = new Course({

      title,
     shortDescription,
      longDescription,
      price,
      instructorName,
      category,
      reviews,

      image: req.file
        ? req.file.filename
        : null,

      instructor: req.user.id

    });

    await course.save();

    res.json({
      message: "Course created",
      course
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

};
exports.getCourses = async (req, res) => {

  try {

    let query = {};

    //  Search by title
    if (req.query.search) {

      query.title = {
        $regex: req.query.search,
        $options: "i"
      };

    }

    
    console.log("QUERY:", query);

    //  Pagination
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    //  Get Courses
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      courses
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};


exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).populate("instructor", "name email");

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        res.json({
            course
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        });

    }
}


exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    // ONLY OWNER INSTRUCTOR OR ADMIN
    if (
      req.user.role === "instructor" &&
      course.instructor.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        message: "You can edit only your courses"
      });
    }

   
    let updateData = { ...req.body };

    
    if (req.file) {
      updateData.image = req.file.filename; 
      
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Course updated successfully 🎉",
      updatedCourse
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
};




exports.deleteCourse = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {

      return res.status(404).json({
        message: "Course not found"
      });

    }

    // ONLY OWNER INSTRUCTOR OR ADMIN

    if (

      req.user.role === "instructor" &&

      course.instructor.toString() !==
      req.user.id.toString()

    ) {

      return res.status(403).json({
        message:
          "You can delete only your courses"
      });

    }

    await Course.findByIdAndDelete(id);

    res.json({
      message:
        "Course deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};
exports.enrollCourses = async (req, res) => {
  try {

    const courseId = req.params.id;
    const userId = req.user.id;

    console.log("USER ID:", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    // ADMIN CANNOT BUY
    if (req.user.role === "admin") {
      return res.status(400).json({
        message: "Admin cannot purchase courses"
      });
    }

    // INSTRUCTOR CANNOT BUY OWN COURSE
    if (
      course.instructor.toString() ===
      userId.toString()
    ) {
      return res.status(400).json({
        message: "You cannot purchase your own course"
      });
    }

    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }

    const alreadyEnrolled =
      user.enrolledCourses.some(
        (id) => id.toString() === courseId
      );

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "Already Enrolled"
      });
    }

    user.enrolledCourses.push(courseId);

    await user.save();

    res.json({
      message: "Enrolled Successfully 🎉"
    });

  } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }
};

exports.addLesson = async (req, res) => {
  try {

    const { title, videoUrl, notes } = req.body;

    const courseId = req.params.id;

    
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

 
    if (
      course.instructor.toString() !== req.user.id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    //  Create lesson
    const lesson = new Lesson({

      title,
      videoUrl,
      notes,

      pdf: req.file
        ? req.file.filename
        : null,

      course: courseId

    });

    await lesson.save();

    res.json({
      message: "Lesson added successfully",
      lesson
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
};

exports.getLesson = async (
  req,
  res
) => {

  try {

    const courseId = req.params.id;

    const userId = req.user.id;

    const user = await User.findById(
      userId
    );

    const course = await Course.findById(
      courseId
    );

    if (!course) {

      return res.status(404).json({
        message: "Course not found"
      });

    }

   

    const isOwner =

      course.instructor.toString() ===
      userId.toString();

 

    const isEnrolled =
      user.enrolledCourses.some(

        (id) =>
          id.toString() === courseId

      );

   

    if (

      !isEnrolled &&
      !isOwner &&
      req.user.role !== "admin"

    ) {

      return res.status(403).json({

        message:
          "Enroll to access lessons"

      });

    }

    const lessons = await Lesson.find({

      course: courseId

    });

    res.json({
      lessons
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

};

exports.updateLesson = async (req, res) => {

  try {

    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {

      return res.status(404).json({
        message: "Lesson not found"
      });

    }

    const course = await Course.findById(
      lesson.course
    );

    // authorization

    if (

      course.instructor.toString() !==
      req.user.id.toString()

      &&

      req.user.role !== "admin"

    ) {

      return res.status(403).json({
        message: "Not authorized"
      });

    }

    // update fields

    lesson.title = req.body.title;

    lesson.videoUrl = req.body.videoUrl;

    lesson.notes = req.body.notes;

    // PDF update

    if (req.file) {

      lesson.pdf = req.file.filename;

    }

    await lesson.save();

    res.json({

      message: "Lesson updated successfully",

      lesson

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};


exports.deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const course = await Course.findById(lesson.course);

    //  Authorization
    if (
      course.instructor.toString() !== req.user.id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Lesson.findByIdAndDelete(lessonId);

    res.json({ message: "Lesson deleted 🗑️" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markLessonComplete = async (req, res) => {

  try {

    console.log("USER:", req.user);

    console.log("BODY:", req.body);

    const { lessonId } = req.body;

    const userId = req.user?.id;

    const courseId = req.params.id;

    // AUTH CHECK

    if (!userId) {

      return res.status(401).json({
        message: "Unauthorized"
      });

    }

  if (!lessonId) {

      return res.status(400).json({
        message: "Lesson ID required"
      });

    }

    // USER CHECK

    const user = await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    // COURSE CHECK

    const course = await Course.findById(courseId);

    if (!course) {

      return res.status(404).json({
        message: "Course not found"
      });

    }

    // OWNER CHECK

    const isOwner =

      course.instructor.toString() ===
      userId.toString();

    // ENROLLED CHECK

    const isEnrolled =
      user.enrolledCourses?.some(
        (id) => id.toString() === courseId
      );

    // ADMIN / OWNER / ENROLLED ONLY

    if (

      !isEnrolled &&
      !isOwner &&
      req.user.role !== "admin"

    ) {

      return res.status(403).json({

        message: "Please enroll first"

      });

    }

    // FIND PROGRESS

    let progress = await Progress.findOne({

      user: userId,

      course: courseId

    });

    // CREATE NEW PROGRESS

    if (!progress) {

      progress = new Progress({

        user: userId,

        course: courseId,

        completedLessons: []

      });

    }

    // DUPLICATE CHECK

    const alreadyDone =
      progress.completedLessons.some(

        (id) =>
          id.toString() === lessonId

      );

    if (alreadyDone) {

      return res.status(400).json({

        message: "Already completed"

      });

    }

    // ADD LESSON

    progress.completedLessons.push(
      lessonId
    );

    await progress.save();

    res.json({

      message:
        "Lesson marked as completed"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: error.message

    });

  }

};

exports.getProgress = async (req, res) => {

  try {

    const userId = req.user.id;

    const courseId = req.params.id;

    // TOTAL LESSONS

    const totalLessons =
      await Lesson.countDocuments({

        course: courseId

      });

    // USER PROGRESS

    const progress =
      await Progress.findOne({

        user: userId,

        course: courseId

      });

    // COMPLETED COUNT

    const completedLessons =
      progress?.completedLessons || [];

    // REMOVE DUPLICATES

    const uniqueLessons = [

      ...new Set(

        completedLessons.map(

          (id) => id.toString()

        )

      )

    ];

    const completed =
      uniqueLessons.length;

    // PERCENTAGE

    let percentage = 0;

    if (totalLessons > 0) {

      percentage = Math.round(

        (completed / totalLessons) * 100

      );

    }

    res.json({

      totalLessons,

      completed,

      percentage

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error: error.message

    });

  }

};



exports.addReview = async (req, res) => {

  try {

    const course = await Course.findById(req.params.id);

    const user = await User.findById(req.user.id);

    if (!course) {

      return res.status(404).json({
        message: "Course not found"
      });

    }

    // CHECK ENROLLED

    const isEnrolled = user.enrolledCourses.some(
  (c) => c.toString() === req.params.id
);

const isOwner =
  course.instructor.toString() ===
  req.user.id.toString();

const isAdmin =
  req.user.role === "admin";

if (!isEnrolled && !isOwner && !isAdmin) {
  return res.status(400).json({
    message: "Enroll to add review"
  });
}

    // CHECK ALREADY REVIEWED

    const alreadyReviewed = course.reviews.some(
      (r) =>
        r.user &&
        r.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {

      return res.status(400).json({
        message: "Already reviewed"
      });

    }

    // CREATE REVIEW

    const review = {

      user: req.user.id,

      userName: user.name,

      rating: Number(req.body.rating),

      comment: req.body.comment

    };

    course.reviews.push(review);

    await course.save();

    res.json({
      message: "Review added ⭐"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getReviews = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("reviews.user", "name");

    res.json(course.reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course.reviews.length) {
      return res.json({ average: 0 });
    }

    const avg =
      course.reviews.reduce((acc, r) => acc + r.rating, 0) /
      course.reviews.length;

    res.json({ average: avg.toFixed(1) });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyCourses = async (
  req,
  res
) => {

  try {

    console.log(
      "USER ID:",
      req.user.id
    );

    // USER WITH PURCHASED COURSES

    const user = await User.findById(
      req.user.id
    ).populate("enrolledCourses");

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    // CREATED COURSES

    const createdCourses =
      await Course.find({

        instructor: req.user.id

      });

    // MERGE BOTH

    const allCourses = [

      ...user.enrolledCourses,

      ...createdCourses

    ];

    // REMOVE DUPLICATES

    const uniqueCourses =
      allCourses.filter(

        (course, index, self) =>

          index ===
          self.findIndex(
            (c) =>
              c._id.toString() ===
              course._id.toString()
          )

      );

    res.json({

      courses: uniqueCourses

    });

  } catch (error) {

    console.log(
      "MY COURSES ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });

  }

};
exports.getInstructorCourses = async (req, res) => {

  try {

    const courses = await Course.find({
      instructor: req.user.id
    });

    res.json({
      courses
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



exports.getInstructorStats = async (req, res) => {

  try {

    const instructorId = req.user.id;

    //  Instructor Courses
    const courses = await Course.find({
      instructor: instructorId
    });

    //  Total Courses
    const totalCourses = courses.length;

    let totalStudents = 0;

    let totalRevenue = 0;

    //  Student Count + Revenue
    for (const course of courses) {

      const students = await User.countDocuments({
        enrolledCourses: course._id,
        role:"student"
      });

      totalStudents += students;

      totalRevenue += students * course.price;

    }

    //  Total Lessons
    const totalLessons = await Lesson.countDocuments({
      course: {
        $in: courses.map((c) => c._id)
      }
    });

    res.json({

      totalCourses,

      totalStudents,

      totalRevenue,

      totalLessons

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

