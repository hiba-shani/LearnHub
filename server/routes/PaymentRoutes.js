
const express = require("express");
const router = express.Router();

const {
  createOrder,
  paymentSuccess
} = require("../controllers/paymentController");

const authMiddleWare = require("../middleWares/authMiddleWare");

router.post(
  "/create-order",
  authMiddleWare,
  createOrder
);

router.post(
  "/success",authMiddleWare,paymentSuccess
);


module.exports = router;