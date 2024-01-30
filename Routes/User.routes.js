const {
  registerUser,
  loginUser,
  emailVerification,
  reSendEmailVerificationCode,
  changePassword,
} = require("../Controllers/User.controllers");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resendVerificationCode", reSendEmailVerificationCode);

router.patch("/verifyEmail", emailVerification);
router.patch("/updatePassword", changePassword);

module.exports = router;
