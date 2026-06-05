<<<<<<< HEAD
console.log("AUTH CONTOLLER LOADED");
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const transporter=require('../config/email')
const tranEmailApi = require("../config/brevo");




exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      status: role === "instructor" ? "pending" : "approved",
      otp,
      otpExpiry,
    });

    await user.save();


    //    await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: email,
    //   subject: "OTP Verification",
    //   html: `<h2>Your OTP is: ${otp}</h2>`,
    // });


    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL,
        name: "LearnHub",
      },
      to: [
        {
          email: email,
        },
      ],
      subject: "OTP Verification",
      htmlContent: `<h2>Your OTP is: ${otp}</h2>`,
    });

    res.json({
      message: "OTP sent to your email",
    });

    if (role === "instructor") {


      //       await transporter.sendMail({
      //   from: process.env.EMAIL,
      //   to: process.env.EMAIL,
      //   subject: "New Instructor Approval Request",
      //   html: `
      //     <h2>New Instructor Registration</h2>
      //     <p>Name: ${name}</p>
      //     <p>Email: ${email}</p>
      //   `,
      // });


      await tranEmailApi.sendTransacEmail({
        sender: {
          email: process.env.EMAIL,
          name: "LearnHub",
        },
        to: [{ email: process.env.EMAIL }],
        subject: "New Instructor Approval Request",
        htmlContent: `
    <h2>New Instructor Registration</h2>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
  `,
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    if (user.otp != otp) {
      return res.status(400).json({
        message: "Invalid Otp"
      })
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired"
      })
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      message: "Email verified successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
}

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    //    await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: email,
    //   subject: "Resend OTP",
    //   html: `<h2>Your new OTP is: ${otp}</h2>`,
    // });


    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL,
        name: "LearnHub",
      },
      to: [{ email }],
      subject: "Resend OTP",
      htmlContent: `<h2>Your new OTP is: ${otp}</h2>`,
    });

    res.json({ message: "OTP resent successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }
    if (
      user.role === "instructor" &&
      user.status !== "approved"
    ) {
      return res.status(403).json({
        message: "Waiting for admin approval"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // email verification check

    if (!user.isVerified) {
      return res.status(400).json({
        message: "please verify your email with otp"
      });
    }

    // create token

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );
    res.json({
      message: "Login Success",
      token,
      user: {
        id: user._id,
        role: user.role,
        name: user.name
      }
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    });
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    //     await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: email,
    //   subject: "Password Reset OTP",
    //   html: `<h2>Your OTP is: ${otp}</h2>`,
    // });

    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL,
        name: "LearnHub",
      },
      to: [{ email }],
      subject: "Password Reset OTP",
      htmlContent: `<h2>Your OTP is: ${otp}</h2>`,
    });
    res.json({ message: "OTP sent to email" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    );

    res.json({
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

=======
console.log("AUTH CONTOLLER LOADED");
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const transporter=require('../config/email')
const tranEmailApi = require("../config/brevo");




exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      status: role === "instructor" ? "pending" : "approved",
      otp,
      otpExpiry,
    });

    await user.save();


    //    await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: email,
    //   subject: "OTP Verification",
    //   html: `<h2>Your OTP is: ${otp}</h2>`,
    // });


    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL,
        name: "LearnHub",
      },
      to: [
        {
          email: email,
        },
      ],
      subject: "OTP Verification",
      htmlContent: `<h2>Your OTP is: ${otp}</h2>`,
    });

    res.json({
      message: "OTP sent to your email",
    });

    if (role === "instructor") {


      //       await transporter.sendMail({
      //   from: process.env.EMAIL,
      //   to: process.env.EMAIL,
      //   subject: "New Instructor Approval Request",
      //   html: `
      //     <h2>New Instructor Registration</h2>
      //     <p>Name: ${name}</p>
      //     <p>Email: ${email}</p>
      //   `,
      // });


      await tranEmailApi.sendTransacEmail({
        sender: {
          email: process.env.EMAIL,
          name: "LearnHub",
        },
        to: [{ email: process.env.EMAIL }],
        subject: "New Instructor Approval Request",
        htmlContent: `
    <h2>New Instructor Registration</h2>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
  `,
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    if (user.otp != otp) {
      return res.status(400).json({
        message: "Invalid Otp"
      })
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired"
      })
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      message: "Email verified successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
}

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    //    await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: email,
    //   subject: "Resend OTP",
    //   html: `<h2>Your new OTP is: ${otp}</h2>`,
    // });


    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL,
        name: "LearnHub",
      },
      to: [{ email }],
      subject: "Resend OTP",
      htmlContent: `<h2>Your new OTP is: ${otp}</h2>`,
    });

    res.json({ message: "OTP resent successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }
    if (
      user.role === "instructor" &&
      user.status !== "approved"
    ) {
      return res.status(403).json({
        message: "Waiting for admin approval"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // email verification check

    if (!user.isVerified) {
      return res.status(400).json({
        message: "please verify your email with otp"
      });
    }

    // create token

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );
    res.json({
      message: "Login Success",
      token,
      user: {
        id: user._id,
        role: user.role,
        name: user.name
      }
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    });
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    //     await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: email,
    //   subject: "Password Reset OTP",
    //   html: `<h2>Your OTP is: ${otp}</h2>`,
    // });

    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL,
        name: "LearnHub",
      },
      to: [{ email }],
      subject: "Password Reset OTP",
      htmlContent: `<h2>Your OTP is: ${otp}</h2>`,
    });
    res.json({ message: "OTP sent to email" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    );

    res.json({
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

>>>>>>> 5d06d87ca6f485ce0a7c362e03ccc8f12feb42c4
};