const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: { type: String, required: true },
    confessId: { type: Schema.Types.ObjectId, ref: "Confess", required: true },
    author: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);