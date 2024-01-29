const db = require("../Models");
const { generateToken, sendVerificationCode } = require("../utils/auth");
const bcryptjs = require("bcryptjs");
const randomstring = require("randomstring");

const User = db.user;

const registerUser = async (req, res) => {
  try {
    // const { email } = req.body;
    // const user = await User.findOne({ where: { email: email } });
    // if (user) {
    //   res.status(403).json({
    //     success: false,
    //     message: `${email} is already Exist!`,
    //   });
    // } else {
    //   const newUser = await User.create(req.body);
    //   const token = await generateToken(newUser);
    //   res.status(200).json({
    //     success: true,
    //     message: "User registered successfully",
    //     data: newUser,
    //     accessToken: token,
    //   });
    // }

    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      if (existingUser.isVerified === true) {
        return res.status(403).json({
          message: `${req.body.email} is already Exist!`,
          success: 403,
        });
      } else {
        const password = bcryptjs.hashSync(req.body.password);
        const otp = randomstring.generate({ length: 6, charset: "numeric" });

        existingUser.password = password;
        existingUser.otp = otp;

        const updatedUser = await existingUser.save();

        // Assuming you have a sendVerificationCode function
        await sendVerificationCode(updatedUser, otp);

        return res.status(200).json({
          message:
            "We have sent you a verification code. Please check your email!",
          status: 200,
        });
      }
    } else {
      const otp = randomstring.generate({ length: 6, charset: "numeric" });
      //   const token = await generateToken(existingUser);

      const newUser = await User.create({
        ...req.body,
        otp,
      });

      // Assuming you have a sendVerificationCode function
      await sendVerificationCode(newUser, otp);

      return res.status(200).json({
        message:
          "We have sent you a verification code. Please check your email!",
        status: 200,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const emailVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        status: 200,
      });
    }

    if (user?.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        status: 200,
      });
    } else {
      user.isVerified = true;
      await user.save();

      const token = await generateToken(user);
      return res.status(200).json({
        message: "User verified successfully",
        user,
        accessToken: token,
        status: 200,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user?.isVerified === false) {
      return res.status(401).json({
        message: "Please verify your email.",
      });
    }

    if (
      user &&
      bcryptjs.compareSync(req.body.password, user.password) &&
      user?.isVerified === true
    ) {
      const accessToken = await generateToken(user);
      return res.status(200).json({
        message: "Logged in successfully",
        status: 200,
        user,
        accessToken,
      });
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
        status: 401,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

// const getAllUser = async (req, res) => {
//   const users = await Login.findAll({});
//   res.status(200).send(users);
// };

// const getSingleUser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  emailVerification,
};
