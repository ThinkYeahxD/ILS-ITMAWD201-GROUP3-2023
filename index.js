const express = require('express');
const collection = require("./config");
//const database = require("./coms");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/ShopDB"; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Connected to MongoDB");
const database = client.db("ShopDB");
const invcollection = database.collection("Inventory");


// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(express.static("public"));

// default page
app.get('/', function(req, res) {
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
  };

  try {
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const insertedUser = await collection.insertOne(data); // Use insertOne for single document
    res.json({ message: 'Signup successful', user: insertedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//login
app.post("/login", async (req, res) => {
  try {
    const user = await collection.findOne({ name: req.body.userdata, password: req.body.password });
    if (!user) {
      res.render('pages/login', { error: 'Incorrect username or password' });
    } else {
      res.redirect('/shop');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/shopdata', async (req, res) => {
  try {
    const results = await invcollection.find().toArray();


    const filteredResults = results.map(item => ({
      // only included in db
      name: item.name,
      catagory: item.catagory,
      image: item.image,
      price: item.price,
      seller: item.seller,
      strand: item.strand
    }));

    res.set({ 'Content-Type': 'application/json' });
    res.json(filteredResults);
    console.log(filteredResults);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});


app.listen(1111);
console.log('Server is listening on port 1111');