const User = require('../models/Users.js');
const Confess = require('../models/Confess.js');
const Comment = require('../models/Comment.js');
const formidable = require("formidable");
const mongoose = require("mongoose");



const getAllConfession = async (req, res, nxt) => {
  try {
    const count = await Confess.find({}).countDocuments();
    const confessions = await Confess.find({})

    return res.status(200).json({ response: confessions, count });
  }
  catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
}

const createConfession = async (req, res, nxt) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (error, fields, files) => {
    const { title, description, to } = fields;
    id = req.userId;
    author = req.author;
    const errors = [];
    if (title === "") {
      errors.push({ msg: "Please add a title" });
    }
    if (description === "") {
      errors.push({ msg: "Please add a description" });
    }


    if (errors.length !== 0) {
      return res.status(400).json({ errors, files });
    }
    else {
      const newConfession = new Confess({ title, description, to, author, user: id });

      let existingUser;
      try {
        existingUser = await User.findById(id);
        console.log(existingUser);
      }
      catch (err) { return res.status(500).json({ errors: err, msg: err.message }) };

      try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newConfession.save({ session });
        existingUser.confessions.push(newConfession);
        await existingUser.save({ session });
        await session.commitTransaction();

        response = newConfession;
        return res.status(200).json({ msg: "Your Confession has been created successfully", response });
      }
      catch (err) { return res.status(500).json({ errors: err, msg: err.message }) }
    }
  });
}


const getConfessionByUser = async (req, res, nxt) => {
  const { uid } = req.params;
  try {
    const count = await Confess.find({ user: uid }).countDocuments();
    const response = await Confess.find({ user: uid });

    return res.status(200).json({ response: response, count });
  }
  catch (error) { return res.status(500).json({ errors: error, msg: error.message }); }
}


const getConfessionById = async (req, res, nxt) => {
  const { cid } = req.params;
  try {
    const confession = await Confess.findOne({ _id: cid });
    const comments = await Comment.find({ confessId: confession._id }).sort({ updatedAt: -1 });
    return res.status(200).json({ confession, comments });
  } catch (error) { return res.status(500).json({ errors: error, msg: error.message }) }
}

module.exports = {
  getAllConfession,
  createConfession, getConfessionByUser, getConfessionById
};
