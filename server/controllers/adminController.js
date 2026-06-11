
const User = require("../models/User");
const Course = require("../models/Course");

const transEmailApi = require("../config/brevo")
// const transporter=require("../config/email")



exports.getStats = async (req, res) => {

  try {

    //  Total Counts
    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
      role: "student"
    });

    const totalInstructors = await User.countDocuments({
      role: "instructor"
    });

    const totalCourses = await Course.countDocuments();

    //  Revenue

    const allCourses = await Course.find();

    let revenue = 0;

    for (const course of allCourses) {

      const enrolledStudents = await User.find({
        enrolledCourses: course._id,
        role: "student"
      });

      revenue += enrolledStudents.length * Number(course.price);
    }
    //  Enrollments
    const users = await User.find();

    let enrollments = 0;

    users.forEach((user) => {
      enrollments += user.enrolledCourses.length;
    });

    //  Instructor Data
    const instructors = await User.find({
      role: "instructor"
    });

    const instructorData = await Promise.all(

      instructors.map(async (inst) => {

        const totalCourses = await Course.countDocuments({
          instructor: inst._id
        });

        return {
          _id: inst._id,
          name: inst.name,
          email: inst.email,
          totalCourses,
          isBlocked: inst.isBlocked || false
        };

      })

    );


    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Recent Courses
    const recentCourses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({

      totalUsers,
      totalStudents,
      totalInstructors,
      totalCourses,

      revenue,
      enrollments,

      instructors: instructorData,

      recentUsers,
      recentCourses

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};
exports.getPendingInstructors = async (req, res) => {

  try {

    const instructors = await User.find({
      role: "instructor",
      status: "pending"
    });

    res.json(instructors);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.approveInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "approved";
    await user.save();


    //     await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: user.email,
    //   subject: "Instructor Approved",
    //   html: `
    //     <h2>Congratulations ${user.name}</h2>
    //     <p>Your instructor account has been approved.</p>
    //     <p>You can now login and create courses.</p>
    //   `,
    // });

    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL,
        name: "LearnHub",
      },
      to: [{ email: user.email }],
      subject: "Instructor Approved",
      htmlContent: `
    <h2>Congratulations ${user.name}</h2>
    <p>Your instructor account has been approved.</p>
    <p>You can now login and create courses.</p>
  `,
    });

    res.json({
      message: "Instructor approved successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.rejectInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    //     await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: user.email,
    //   subject: "Instructor Request Rejected",
    //   html: `
    //     <h2>Hello ${user.name}</h2>
    //     <p>Your instructor request has been rejected by admin.</p>
    //     <p>Please contact support for more details.</p>
    //   `,
    // });

    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL,
        name: "LearnHub",
      },
      to: [{ email: user.email }],
      subject: "Instructor Request Rejected",
      htmlContent: `
    <h2>Hello ${user.name}</h2>
    <p>Your instructor request has been rejected by admin.</p>
    <p>Please contact support for more details.</p>
  `,
    });

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Instructor rejected successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


exports.deleteCourseAdmin = async (req, res) => {

  try {

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: "Course deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



exports.blockUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.isBlocked = true;

    await user.save();

    res.json({
      message: "User blocked"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



exports.unblockUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.isBlocked = false;

    await user.save();

    res.json({
      message: "User unblocked"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



exports.searchUsers = async (req, res) => {

  try {

    const keyword = req.query.keyword || "";

    const users = await User.find({

      $or: [

        {
          name: {
            $regex: keyword,
            $options: "i"
          }
        },

        {
          email: {
            $regex: keyword,
            $options: "i"
          }
        }

      ]

    });

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};



exports.searchCourses = async (req, res) => {

  try {

    const keyword = req.query.keyword || "";

    const courses = await Course.find({

      title: {
        $regex: keyword,
        $options: "i"
      }

    });

    res.json(courses);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getAllUsers = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      users,
      totalUsers,
      page,
      pages: Math.ceil(totalUsers / limit)
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};


exports.getAllInstructors = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalInstructors = await User.countDocuments({
      role: "instructor",
      status: "approved"
    });

    const instructors = await User.find({
      role: "instructor",
      status: "approved"
    })
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const instructorData = await Promise.all(

      instructors.map(async (inst) => {

        const totalCourses = await Course.countDocuments({
          instructor: inst._id
        });

        return {
          _id: inst._id,
          name: inst.name,
          email: inst.email,
          status: inst.status,
          isBlocked: inst.isBlocked,
          totalCourses
        };

      })

    );

    res.json({
      instructors: instructorData,
      totalInstructors,
      page,
      pages: Math.ceil(totalInstructors / limit)
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};



exports.getAllCoursesAdmin = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalCourses =
      await Course.countDocuments();

    const courses =
      await Course.find()
      .populate(
        "instructor",
        "name email"
      )
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      courses,
      totalCourses,
      page,
      pages: Math.ceil(
        totalCourses / limit
      )
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getRevenueData = async (req, res) => {
  try {

    const courses = await Course.find()
      .populate("instructor", "name");

    const revenueData = [];

    let totalRevenue = 0;
    let totalEnrollments = 0;

    for (const course of courses) {

      const students =
        await User.countDocuments({
          enrolledCourses: course._id,
          role: "student"
        });

      const revenue =
        students * Number(course.price);

      totalRevenue += revenue;
      totalEnrollments += students;

      revenueData.push({
        courseId: course._id,
        title: course.title,
        instructor:
          course.instructor?.name ||
          "Unknown",
        price: course.price,
        students,
        revenue
      });

    }

    res.json({
      totalRevenue,
      totalEnrollments,
      totalCourses: courses.length,
      revenueData
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

