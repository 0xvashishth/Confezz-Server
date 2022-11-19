const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split('Bearer ')[1];
  try {
    const verify = jwt.verify(token, process.env['JWT_SECRET']);
    next();
  } catch (error) {
    return res.status(401).json({ errors: [{ msg: error.message }] });
  }
}
