const { protect } = require("../middleware/auth.js");
const express = require("express");
const router = express.Router();
const userC = require("../controllers/user-controller.js");
const { loginValiations, registerValiations } = require("../controllers/user-controller.js");

// Get list of all users
router.get("/", userC.getAllUser);

// User Sign Up
router.post("/signup", registerValiations, userC.signup);

// User Login
router.post("/login", loginValiations, userC.login);

// Curently logged in user
// router.get("/me", protect, userC.getMe);

// Update user details
// router.put("/user:id", userC.updateUser);

module.exports = router;