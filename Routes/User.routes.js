const { registerUser, loginUser } = require("../Controllers/User.controllers");

const router = require("express").Router();

// register
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
