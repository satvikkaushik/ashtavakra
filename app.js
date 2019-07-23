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

mongoose.connect('mongodb://localhost:27017/ashtavakra', {useNewUrlParser: true});

// const MongoClient = require(‘mongodb’).MongoClient;
// const uri = "mongodb+srv://admin:raghava3b3@cluster0-wuqbf.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   client.close();
// });


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



// app.listen(3000,function(){
// 	console.log("Ashtavakra's server is working just fine!");
// });

app.listen(process.env.PORT || 3000);