<<<<<<< HEAD
const express = require("express");
const router = express.Router();

const {
  createOrder
} = require("../controllers/paymentController");

const authMiddleWare = require("../middleWares/authMiddleWare");

router.post(
  "/create-order",
  authMiddleWare,
  createOrder
);

=======
const express = require("express");
const router = express.Router();

const {
  createOrder
} = require("../controllers/paymentController");

const authMiddleWare = require("../middleWares/authMiddleWare");

router.post(
  "/create-order",
  authMiddleWare,
  createOrder
);

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
module.exports = router;