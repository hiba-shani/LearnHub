const { body ,validationResult} = require("express-validator");


//  AUTH VALIDATION
exports.registerValidation = [
  body("name")
    .notEmpty().withMessage("Name is required"), //  Required

  body("email")
    .isEmail().withMessage("Valid email required"), //  Format validation

  body("password")
    .isLength({ min: 6 }).withMessage("Min 6 characters") //  Length validation
];

exports.otpValidation = [
  body("otp")
    .notEmpty().withMessage("OTP required")
    .isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits")
    .isNumeric().withMessage("OTP must be numeric")
];

exports.loginValidation = [
  body("email")
    .isEmail().withMessage("Valid email required"), //  Format

  body("password")
    .notEmpty().withMessage("Password required") //  Required
];


//  COURSE VALIDATION
exports.courseValidation = [
  body("title")
    .notEmpty().withMessage("Title required"), //  Required

  body("shortDescription")
    .isLength({ min: 10 }).withMessage("Min 10 characters"),
     body("longDescription")
    .isLength({ min: 10 }).withMessage("Min 10 characters"),  //  Length

  body("price")
    .isFloat({ min: 0 }).withMessage("Price must be positive"), // Type + Range

  body("category")
    .notEmpty().withMessage("Category required"), // Required

 
];


//  LESSON VALIDATION
exports.lessonValidation = [
  body("title")
    .notEmpty().withMessage("Lesson title required"), //  Required

  body("videoUrl")
    .isURL().withMessage("Valid video URL required") //  Format
];


//  REVIEW VALIDATION
exports.reviewValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"), //  Range

  body("comment")
    .isLength({ min: 3 })
    .withMessage("Comment too short") //  Length
];


//  PROGRESS VALIDATION
exports.progressValidation = [
  body("lessonId")
    .isMongoId()
    .withMessage("Invalid lesson ID") //  Type (MongoDB ID)
];




exports.validate = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    const formattedErrors = {};

    errors.array().forEach((err) => {
      formattedErrors[err.path] = err.msg;
    });

    return res.status(400).json({
      errors: formattedErrors
    });

  }

  next();

};