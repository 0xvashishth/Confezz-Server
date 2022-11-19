const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const confessSchema = new Schema({
  title: { type: String, required: true },
  to: { type: String, default: 'all' },
  descriptin: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model("Confess", confessSchema);