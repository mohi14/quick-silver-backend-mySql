const {
  createCompany,
  updateCompanyInfo,
  getAllCompanies,
  getCompanyInfo,
  deleteCompany,
} = require("../Controllers/Company.controller");
const { upload } = require("../config/multerConfig");
const { isAuth } = require("../utils/middleware");

const router = require("express").Router();

// router.post("/create", createCompany);
router.get("/", isAuth, getAllCompanies);
router.get("/info/:id", isAuth, getCompanyInfo);
router.patch("/update/:id", isAuth, upload.single("logo"), updateCompanyInfo);
router.delete("/delete/:id", isAuth, deleteCompany);

// router.post("/login", loginUser);
// router.post("/resendVerificationCode", reSendEmailVerificationCode);
// router.post("/resetPassword", sendPasswordChangeLink);
// router.post("/referCompany", isAuth, referNewCompany);
// router.post("/referUser", isAuth, inviteNewUser);

// // get and delete
// router.get("/all", allUser);
// router.get("/me", isAuth, me);

// router.patch("/verifyEmail", emailVerification);
// router.patch("/updatePassword", changePassword);
// router.patch("/updateUserInfo", isAuth, upload.single("image"), updateUserInfo);

module.exports = router;
