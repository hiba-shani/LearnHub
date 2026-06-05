<<<<<<< HEAD
const express = require('express')
const router = express.Router();
const authMiddleWare=require("../middleWares/authMiddleWare")

const {
    register,
    login,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    getMe
} = require('../controllers/authController');
const { registerValidation, loginValidation,otpValidation,validate } = require('../middleWares/validation');


router.post("/register",registerValidation,validate, register);
router.post("/verify-otp",otpValidation,validate,verifyOtp);
router.post("/resend-otp",resendOtp);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword)
router.post("/login",loginValidation,validate, login);

router.get("/me",authMiddleWare,getMe);

=======
const express = require('express')
const router = express.Router();
const authMiddleWare=require("../middleWares/authMiddleWare")

const {
    register,
    login,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    getMe
} = require('../controllers/authController');
const { registerValidation, loginValidation,otpValidation,validate } = require('../middleWares/validation');


router.post("/register",registerValidation,validate, register);
router.post("/verify-otp",otpValidation,validate,verifyOtp);
router.post("/resend-otp",resendOtp);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",resetPassword)
router.post("/login",loginValidation,validate, login);

router.get("/me",authMiddleWare,getMe);

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
module.exports = router;