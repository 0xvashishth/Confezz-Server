const mongoose = require("mongoose");
const User = require('../models/Users.js');
const Confess = require('../models/Confess.js');
const Comment = require('../models/Comment.js');

const doComment = async (req, res, nxt) => {
  const { id, comment, author } = req.body;
  // here id is confession id
  try {
    const response = await Comment.create({
      comment,
      confessId: id,
      author
    });
    return res.status(200).json({ msg: "Your comment has been added successfully", response });
  }
  catch (err) {
    return res.status(500).json({ errors: err, msg: err.message })
  }
}


module.exports = {
  doComment
}