const { default: mongoose } = require("mongoose");
require("dotenv").config();

// Connect to DB
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;