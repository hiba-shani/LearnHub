const { body, validationResult } = require("express-validator");


exports.registerValidation = [
  body("name")
    .notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail().withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 }).withMessage("Min 6 characters")
];

exports.otpValidation = [
  body("otp")
    .notEmpty().withMessage("OTP required")
    .isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits")
    .isNumeric().withMessage("OTP must be numeric")
];

exports.loginValidation = [
  body("email")
    .isEmail().withMessage("Valid email required"),

  body("password")
    .notEmpty().withMessage("Password required")
];


exports.courseValidation = [
  body("title")
    .notEmpty().withMessage("Title required"),

  body("shortDescription")
    .isLength({ min: 10 }).withMessage("Min 10 characters"),

  body("longDescription")
    .isLength({ min: 10 }).withMessage("Min 10 characters"),

  body("price")
    .trim()
    .notEmpty().withMessage("Price is required")
    .toFloat() 
    .isFloat({ min: 0 }).withMessage("Price must be positive"),

  body("category")
    .notEmpty().withMessage("Category required"),
];



exports.lessonValidation = [
  body("title")
    .notEmpty().withMessage("Lesson title required"),

  body("videoUrl")
    .isURL().withMessage("Valid video URL required")
];



exports.reviewValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("comment")
    .isLength({ min: 3 })
    .withMessage("Comment too short")
];



exports.progressValidation = [
  body("lessonId")
    .isMongoId()
    .withMessage("Invalid lesson ID")
];

// global validation

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};

    
    errors.array().forEach((err) => {
      if (!formattedErrors[err.path]) {
        formattedErrors[err.path] = err.msg;
      }
    });

    return res.status(400).json({
      errors: formattedErrors
    });
  }

  next();
};