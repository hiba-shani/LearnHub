<<<<<<< HEAD
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("Database Error:", error);
    process.exit(1);
  }
};

=======
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("Database Error:", error);
    process.exit(1);
  }
};

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
module.exports = connectDB;