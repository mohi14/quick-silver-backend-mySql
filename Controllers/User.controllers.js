const db = require("../Models");
const {
  generateToken,
  sendVerificationCode,
  sendResetPassEmail,
  removeSensitiveInfo,
  sendReferCompannyEmail,
  sendReferUserEmail,
} = require("../utils/auth");
const bcryptjs = require("bcryptjs");
const randomstring = require("randomstring");

const User = db.user;

const registerUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      if (existingUser.isVerified === true) {
        return res.status(403).json({
          message: `${req.body.email} is already Exist!`,
          success: false,
        });
      } else {
        const password = bcryptjs.hashSync(req.body.password);
        const otp = randomstring.generate({ length: 6, charset: "numeric" });

        existingUser.password = password;
        existingUser.otp = otp;

        const updatedUser = await existingUser.save();

        await sendVerificationCode(updatedUser, otp);

        return res.status(200).json({
          message:
            "We have sent you a verification code. Please check your email!",
          success: true,
        });
      }
    } else {
      const otp = randomstring.generate({ length: 6, charset: "numeric" });

      const newUser = await User.create({
        ...req.body,
        otp,
      });

      await sendVerificationCode(newUser, otp);

      return res.status(200).json({
        message:
          "We have sent you a verification code. Please check your email!",
        success: true,
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
        success: false,
      });
    }

    if (user?.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    } else {
      user.isVerified = true;
      await user.save();

      const token = await generateToken(user);
      return res.status(200).json({
        message: "User verified successfully",
        user: removeSensitiveInfo(user),
        accessToken: token,
        success: true,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const reSendEmailVerificationCode = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      if (existingUser.isVerified === true) {
        return res.status(403).json({
          message: `${req.body.email} is already verified!`,
          success: false,
        });
      } else {
        const otp = randomstring.generate({ length: 6, charset: "numeric" });

        existingUser.otp = otp;

        const updatedUser = await existingUser.save();

        await sendVerificationCode(updatedUser, otp);

        return res.status(200).json({
          message:
            "We have sent you a verification code. Please check your email!",
          success: true,
        });
      }
    } else {
      return res.status(404).json({
        message: "User doesn't exists!",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user?.isVerified === false) {
      return res.status(401).json({
        message: "Please verify your email.",
        success: false,
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
        success: true,
        user: removeSensitiveInfo(user),
        accessToken,
      });
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const sendPasswordChangeLink = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      const result = await sendResetPassEmail(user);
      return res.status(200).json({
        message: "Reset password Link sent successfully!",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Invalid Email Address",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await User.findOne({ where: { id } });

    if (user) {
      const newPassword = bcryptjs.hashSync(password);

      user.password = newPassword;

      await user.save();

      return res.status(200).json({
        message: "Password updated successfully!",
        success: true,
      });
    } else {
      return res.status(201).json({
        message: "Password update failed!",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { ...info } = req.body;

    const user = await User.findOne({ where: { id: req.user.id } });

    const image = req.file ? req.file.path : undefined;

    const updateInfo = image ? { image, ...info } : info;

    if (user) {
      await user.update(updateInfo);

      const updatedUser = await User.findByPk(req.user.id);
      res.status(200).json({
        success: true,
        message: "User Info updated successfully",
        data: removeSensitiveInfo(updatedUser),
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const referNewCompany = async (req, res) => {
  try {
    const isExist = await User.findOne({ where: { email: req.body.email } });

    if (isExist) {
      return res.status(401).send({
        message: "This email already taken!",
        success: false,
      });
    } else {
      const result = await sendReferCompannyEmail({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        userId: req.user.id,
        email: req.body.email,
      });
      return res.status(200).json({
        message: "Reffered a company successfully!",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const referNewUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ where: { email: req.body.email } });

    if (isExist) {
      return res.status(401).send({
        message: "This email already taken!",
        success: false,
      });
    } else {
      const result = await sendReferUserEmail({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        userId: req.user.id,
        email: req.body.email,
        role: req.body.role,
      });
      return res.status(200).json({
        message: "Reffered a user successfully!",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
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
  reSendEmailVerificationCode,
  changePassword,
  sendPasswordChangeLink,
  updateUserInfo,
  referNewCompany,
  referNewUser,
};
