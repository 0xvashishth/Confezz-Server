const Confess = require('../models/Confess.js');




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


