const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');

const getAllUser = async (req, res, nxt) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    condole.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: 'No user found' });
  }
  return res.status(200).json({ users });
}

const registerValiations = [
  body('name').not().isEmpty().trim().withMessage('Name is required'),
  body('email').not().isEmpty().trim().withMessage('Email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters long'),
];

// router.post("/signup", userC.signup);
const signup = async (req, res, nxt) => {
  const { email, nickname, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(422).json({ errors: [{ msg: 'Email is already taken' }] });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
  }

  const newUser = new User({
    email,
    nickname,
    password: hashedPassword,
    confessions: [],
    token: null
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: err });
  }
  return res.status(201).json({ _id: newUser.id, user: newUser, token: generateToken(newUser), message: 'User created successfully' });
}

const loginValiations = [
  body('email').not().isEmpty().trim().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
];

const login = async (req, res, nxt) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const matched = await bcrypt.compare(password, existingUser.password);
      if (matched) {
        return res.status(200).json({ _id: existingUser.id, user: existingUser, token: generateToken(existingUser), message: 'User logged in successfully' });
      }
      else {
        return res.status(401).json({ errors: [{ msg: 'Password is not correct' }] });
      }
    }
    else {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ errors: err });
  }

}

const getMe = async (req, res, next) => {
  const { _id, name, email } = await User.findById(req.userId);
  res.status(200).json({ id: _id, name, email });
  next()
}

// Generate a token
// const generateToken = (user) => {
//   return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

module.exports = { getAllUser, signup, login, getMe, registerValiations, loginValiations };