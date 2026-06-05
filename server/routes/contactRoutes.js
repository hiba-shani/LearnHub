<<<<<<< HEAD
const express = require("express");

const router = express.Router();

const {
  sendContactMessage
} = require("../controllers/contactController");

router.post(
  "/send",
  sendContactMessage
);

=======
const express = require("express");

const router = express.Router();

const {
  sendContactMessage
} = require("../controllers/contactController");

router.post(
  "/send",
  sendContactMessage
);

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
module.exports = router;