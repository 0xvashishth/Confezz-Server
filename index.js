const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const connectDB = require('./config/db');


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

const middleware = (req, res, next) => {
  console.log("Hello my middleware");
  next();
}


app.get('/', (req, res) => {
  console.log("Hello Askoverflosw!!");
  res.send('Hello Askoverflosw!!')
});

app.get('/contact', middleware, (req, res) => {
  console.log("Hello my contact");
  res.send('Hello Contact')
});



const port = process.env['PORT'] || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));