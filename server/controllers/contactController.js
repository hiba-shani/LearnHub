
// const transporter=require("../config/email")

const tranEmailApi = require("../config/brevo")

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // VALIDATION
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    //     await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: process.env.EMAIL,
    //   subject: `New Contact Message from ${name}`,
    //   html: `
    //     <h2>New Contact Message</h2>

    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `,
    // });


    await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL,
        name: "LearnHub",
      },
      to: [{ email: process.env.EMAIL }],
      subject: `New Contact Message from ${name}`,
      htmlContent: `
    <h2>New Contact Message</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `,
    });

    res.json({
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }

};