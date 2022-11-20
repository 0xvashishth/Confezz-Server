const express = require("express");
const router = express.Router();
const confessC = require("../controllers/confess-controller");
const auth = require("../middleware/auth");

// Get all confession
router.get("/", confessC.getAllConfession);

// Create Confession
router.post("/new", confessC.createConfession);

// Fetch all confession by user
router.get("/uc/:uid", confessC.getConfessionByUser);

// Fetch perticular confession by id
router.get("/c/:cid", confessC.getConfessionById);

module.exports = router;
