const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const connectDB = require('./config/db');

const userR = require("./routes/user-routes");
const confessR = require("./routes/confess-routes");
const commentR = require("./routes/comment-router");

//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// cors 
app.use(cors({ origin: true, credentials: true }));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log("Welcome to Confezz!!");
  return res.status(200).json({ message: 'Welcome to Confezz!!' });
});

app.use("/api/user", userR);
app.use("/api/confess", confessR);
app.use("/api/comment", commentR);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));