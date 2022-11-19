const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const secret_key = process.env['JWT_SECRET'];

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: false },
  password: { type: String, required: true, minlength: 6 },
  confessions: [{ type: mongoose.Types.ObjectId, ref: 'Confess' }],
  tokens: [{ token: { type: String, required: true } }],
}, { timestamps: true });


userSchema.methods.generateAuthToken = async function() {
  try {
    let newtoken = jwt.sign({ _id: this._id }, secret_key);
    this.tokens = this.tokens.concat({ token: newtoken });
    await this.save();
    return newtoken;
  } catch (err) {
    console.log(err);
  }
}


module.exports = mongoose.model("User", userSchema);