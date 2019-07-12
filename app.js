var express=require("express");
var app=express();
var bodyParser = require("body-parser");
var logger=require("morgan");
var mongoose=require('mongoose');
// var session=require('express-session');


app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger("dev"));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:ucusd-7@cluster0-wuqbf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

var pages=require('./routes/pages.js');
var adminPages=require('./routes/admin_pages.js');
var adminCategories=require('./routes/admin_categories.js');
var adminProducts=require('./routes/admin_products.js');

app.use('/',pages);
app.use('/admin/pages',adminPages);
app.use('/admin/categories',adminCategories);
app.use('/admin/products',adminProducts);



app.listen(process.env.PORT || 3003, () => {
  console.log(“server started at port 3003”);
  });