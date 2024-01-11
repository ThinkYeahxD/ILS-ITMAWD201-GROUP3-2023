const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/ShopDB"; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



    console.log("Connected to MongoDB");

    const database = client.db("ShopDB");
    
    
    
    
 

   module.exports = database;


