const express = require("express");
const router = express.Router();
const confessC = require("../controllers/confess-controller");
const auth = require("../middleware/auth");

// Get all posts
router.get("/", confessC.getAllConfession);