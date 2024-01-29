const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  return jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user?.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7days",
    }
  );
};

const sendVerificationCode = async (user, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: user?.email,
    subject: "Email Verification",
    html: `<p>Your OTP for email verification is: ${otp}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });

  // if (emailSent === true) {
  //   return true;
  // }
};

module.exports = {
  generateToken,
  sendVerificationCode,
};
