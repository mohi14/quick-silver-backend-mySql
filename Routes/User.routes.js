const {
  registerUser,
  loginUser,
  emailVerification,
  reSendEmailVerificationCode,
  changePassword,
  sendPasswordChangeLink,
  updateUserInfo,
  referNewCompany,
  allUser,
  me,
  inviteNewUser,
  getCompanyFieldAdjuster,
} = require("../Controllers/User.controllers");
const { upload } = require("../config/multerConfig");
const { isAuth } = require("../utils/middleware");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resendVerificationCode", reSendEmailVerificationCode);
router.post("/resetPassword", sendPasswordChangeLink);
router.post("/referCompany", isAuth, referNewCompany);
router.post("/referUser", isAuth, inviteNewUser);

// get and delete
router.get("/all", allUser);
router.get("/me", isAuth, me);
router.get("/getFieldAduster/:id", isAuth, getCompanyFieldAdjuster);

router.patch("/verifyEmail", emailVerification);
router.patch("/updatePassword", changePassword);
router.patch("/updateUserInfo", isAuth, upload.single("image"), updateUserInfo);

module.exports = router;
