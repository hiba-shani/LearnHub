
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


module.exports = router;