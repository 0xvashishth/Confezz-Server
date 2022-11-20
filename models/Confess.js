const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const confessSchema = new Schema({
  title: { type: String, required: true },
  to: { type: String, default: 'all' },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  author: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Confess", confessSchema);