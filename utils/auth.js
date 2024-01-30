const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
};

const sendResetPassEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: data?.email,
    subject: "Email Verification!!",
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet">
        <link href="https://fonts.cdnfonts.com/css/helvetica-neue-55" rel="stylesheet">
        <title>Forgot Password</title>
    </head>
    
    <body style="margin: 0; padding: 0; outline: 0; font-family: 'Helvetica Neue', sans-serif;">
        <table
            style="border-collapse: collapse; max-width: 600px; width: 100%; margin: auto; padding: 50px; background-color: #ffffff; border: 1px solid red;">
    
    
            <tr>
    
                <td width="100%" style="border: 1px solid black; padding: 50px;">
    
                    <p
                        style="margin: 0; font-size: 32px; font-weight: 500; padding: 50px 0 30px 50px;  background-color: #F4F4F4;">
                        Resent Your Password
                    </p>
    
                    <p
                        style="margin: 0; font-size: 20px; font-weight: 400; padding: 0 0 30px 50px;  background-color: #F4F4F4;">
                        We've requested to reset your password for your account
                    </p>
    
                    <p
                        style="margin: 0; font-size: 20px; font-weight: 400; padding: 0 0 50px 50px;  background-color: #F4F4F4;">
                        <a href="${process.env.MAINWEBSITE_URL}/reset-password?user=${data?.id}"
                            style="text-decoration: none; color: white; background-color: black; padding: 10px 40px; border-radius: 50px; display: inline-block;">
                            Change password
                        </a>
                    </p>
    
    
                </td>
    
    
    
            </tr>
    
            <!-- <tr>
                <td style="padding: 30px; background-color: #c9c7c7;">Resent Your Password</td>
    
            </tr>
    
            <tr>
                <td>We've requested to reset your password for your account</td>
    
            </tr>
    
            <tr>
                <td>Change password</td>
    
            </tr> -->
    
    
        </table>
    
    </body>
    
    </html>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
};
const sendReferCompannyEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: data?.email,
    subject: "Email Verification!!",
    html: `<div>
    <p>${data?.firstName} ${data?.lastName} Refer you!</p>
    <p>Use this Refferal Id: ${data?.userId}</p>
    <p style="margin: 0; font-size: 20px; font-weight: 400; padding: 0 0 50px 50px;  background-color: #F4F4F4;">
                        <a href="${process.env.MAINWEBSITE_URL}/sign-up"
                            style="text-decoration: none; color: white; background-color: black; padding: 10px 40px; border-radius: 50px; display: inline-block;">
                            Create account
                        </a>
                    </p>
    </div>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
};
const sendReferUserEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: data?.email,
    subject: "Email Verification!!",
    html: `<div>
    <p>${data?.firstName} ${data?.lastName} Refer you!</p>
    <p style="margin: 0; font-size: 20px; font-weight: 400; padding: 0 0 50px 50px;  background-color: #F4F4F4;">
                        <a href="${process.env.MAINWEBSITE_URL}/sign-up-user?role=${data?.role}"
                            style="text-decoration: none; color: white; background-color: black; padding: 10px 40px; border-radius: 50px; display: inline-block;">
                            Create account
                        </a>
                    </p>
    </div>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
};

const removeSensitiveInfo = (user) => {
  const { password, updatedAt, createdAt, otp, ...userWithoutSensitiveInfo } =
    user.get();
  return userWithoutSensitiveInfo;
};

module.exports = {
  generateToken,
  sendVerificationCode,
  sendResetPassEmail,
  removeSensitiveInfo,
  sendReferCompannyEmail,
  sendReferUserEmail,
};
