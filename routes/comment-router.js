const express = require('express');
const router = express.Router();
const commentC = require('../controllers/comment-controller');

// To comment in a confession
router.post("comment", commentC.doComment);

module.exports = router;