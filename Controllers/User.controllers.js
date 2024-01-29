const db = require("../Models");
const { generateToken } = require("../utils/auth");
const bcryptjs = require("bcryptjs");

const User = db.user;

const registerUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (user) {
      res.status(403).json({
        success: false,
        message: `${email} is already Exist!`,
      });
    } else {
      const newUser = await User.create(req.body);

      const token = await generateToken(newUser);
      res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
        accessToken: token,
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
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email address!",
      });
      return;
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid password!",
      });
      return;
    }

    const token = await generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      accessToken: token,
    });
  } catch (error) {
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
};
