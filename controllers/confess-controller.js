const User = require('../models/Users.js');
const Confess = require('../models/Confess.js');
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
    const { id, title, description, author, to } = fields;
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
      const newConfession = new Confess({ title, description, to, author });

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


module.exports = {
  getAllConfession,
  createConfession
};
