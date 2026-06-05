const Razorpay = require("razorpay");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
};

// SAVE PAYMENT AFTER SUCCESS
exports.paymentSuccess = async (req, res) => {

  try {

    const {
      courseId,
      amount,
      paymentId
    } = req.body;

    const payment = new Payment({
      user: req.user.id,
      course: courseId,
      amount,
      paymentId
    });

    await payment.save();

    res.json({
      message: "Payment saved successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};