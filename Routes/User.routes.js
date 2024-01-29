const {
  registerUser,
  loginUser,
  emailVerification,
} = require("../Controllers/User.controllers");

const router = require("express").Router();

// register
router.post("/register", registerUser);
router.post("/login", loginUser);

router.patch("/verifyEmail", emailVerification);

module.exports = router;
