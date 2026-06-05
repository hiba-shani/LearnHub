<<<<<<< HEAD
module.exports = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      message: "Admin access only"
    });

  }

  next();

=======
module.exports = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      message: "Admin access only"
    });

  }

  next();

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
};