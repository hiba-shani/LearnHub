<<<<<<< HEAD
const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

const authMiddleware = require("../middleWares/authMiddleWare");
const roleMiddleWare=require("../middleWares/roleMiddleWare")


// ✅ Dashboard Stats
router.get(
  "/stats",
  authMiddleware,
  adminController.getStats
);


// ✅ Delete Course
router.delete(
  "/course/:id",
  authMiddleware,
  adminController.deleteCourseAdmin
);


// ✅ Block User
router.put(
  "/block-user/:id",
  authMiddleware,
  adminController.blockUser
);


// ✅ Unblock User
router.put(
  "/unblock-user/:id",
  authMiddleware,
  adminController.unblockUser
);


// ✅ Search Users
router.get(
  "/search-users",
  authMiddleware,
  adminController.searchUsers
);


// ✅ Search Courses
router.get(
  "/search-courses",
  authMiddleware,
  adminController.searchCourses
);

router.get(
  "/pending-instructors",
  authMiddleware,
  roleMiddleWare("admin"),
  adminController.getPendingInstructors
);

router.put(
  "/approve-instructor/:id",
  authMiddleware,
  roleMiddleWare("admin"),
  adminController.approveInstructor
);

router.delete(
  "/reject-instructor/:id",
authMiddleware,
  roleMiddleWare("admin"),
  adminController.rejectInstructor
);
router.get("/users",authMiddleware,roleMiddleWare("admin"),adminController.getAllUsers);

=======
const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

const authMiddleware = require("../middleWares/authMiddleWare");
const roleMiddleWare=require("../middleWares/roleMiddleWare")


// ✅ Dashboard Stats
router.get(
  "/stats",
  authMiddleware,
  adminController.getStats
);


// ✅ Delete Course
router.delete(
  "/course/:id",
  authMiddleware,
  adminController.deleteCourseAdmin
);


// ✅ Block User
router.put(
  "/block-user/:id",
  authMiddleware,
  adminController.blockUser
);


// ✅ Unblock User
router.put(
  "/unblock-user/:id",
  authMiddleware,
  adminController.unblockUser
);


// ✅ Search Users
router.get(
  "/search-users",
  authMiddleware,
  adminController.searchUsers
);


// ✅ Search Courses
router.get(
  "/search-courses",
  authMiddleware,
  adminController.searchCourses
);

router.get(
  "/pending-instructors",
  authMiddleware,
  roleMiddleWare("admin"),
  adminController.getPendingInstructors
);

router.put(
  "/approve-instructor/:id",
  authMiddleware,
  roleMiddleWare("admin"),
  adminController.approveInstructor
);

router.delete(
  "/reject-instructor/:id",
authMiddleware,
  roleMiddleWare("admin"),
  adminController.rejectInstructor
);
router.get("/users",authMiddleware,roleMiddleWare("admin"),adminController.getAllUsers);

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
module.exports = router;