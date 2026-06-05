const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];

    
    if (!token) {

      return res.status(401).json({
        message: "No token provided"
      });

    }

   
    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY
    );

    
    const user = await User.findById(decoded.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    //  Block Check
    if (user.isBlocked) {

      return res.status(403).json({
        message: "Your account is blocked"
      });

    }

    //  Save User Data
    req.user = {
      id: user._id,
      role: user.role
    };

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = authMiddleware;