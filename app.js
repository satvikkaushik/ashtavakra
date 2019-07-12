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

// replace the uri string with your connection string.
const uri="mongodb+srv://admin2:raghavA3B3@cluster0-wuqbf.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(uri,{ useNewUrlParser: true } ,function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
  //  const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});

//express session middleware
app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));
//Express Messages
// app.use(require('connect-flash')());
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



app.listen(process.env.PORT, process.env.IP,function(){
	console.log("Ashtavakra's server is working just fine!");
});