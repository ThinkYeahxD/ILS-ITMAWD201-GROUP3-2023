const express = require('express');
const collection = require("./config");
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));




// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(express.static("public"));

// default page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// index page
app.get('/index', function(req, res) {
  res.render('pages/index');
});

// shop page
app.get('/shop', function(req, res) {
  res.render('pages/shop');
});

// login page
app.get('/login', function(req, res) {
  res.render('pages/login');
});

// register page
app.get('/signup', function(req, res) {
  res.render('pages/register');
});

//register function
app.post("/signup", async (req, res) => {

  const data = {
      name: req.body.userdata,
      password: req.body.password
  }

  // Check if the username already exists in the database
  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
      res.send('User already exists. Please choose a different username.');
  } else {
      // Hash the password using bcrypt
      const saltRounds = 10; // Number of salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      data.password = hashedPassword; // Replace the original password with the hashed one

      const datauser = await collection.insertMany(data);
      console.log(datauser);
      res.render('pages/login');
  }

});

// Login user 
app.post("/login", async (req, res) => {
  try {
      const check = await collection.findOne({ name: req.body.userdata });
      if (!check) {
        console.log("User name cannot found");
      }
      // Compare the hashed password from the database with the plaintext password
      const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
      if (!isPasswordMatch) {
        console.log("wrong Password");
      }
      else {
        res.render('pages/shop');
      }
  }
  catch {
    console.log("wrong Details");
  }
});

app.listen(8080);
console.log('Server is listening on port 8080');