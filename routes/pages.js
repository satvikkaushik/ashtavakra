var express=require('express');
var router=express.Router(); 

var Category=require('../models/categories.js');
var Product=require('../models/products.js');


router.get('/',function(req,res){
			Category.find(function(err,categories){
				if(err) return console.log(err);
				Product.find(function(err,products){
					var data= JSON.stringify({categories:categories, products: products})
					// console.log(JSON.parse(data).categories);
					res.render('index',{
						data:data
					});
				})
				
				
			});	
	// res.render('index');
		});



router.get('/category/store/:id',function(req,res){
	var cat=req.params.id;	
	Product.find({category: cat},function(err,data){
		res.render('store',{
			products:data
		});
	});
});


router.get('/product/:id',function(req,res){
	var product=req.params.id;
	Product.findOne({_id:product}, function(err, product){
		if (err){
			console.log("errr",err);
			//return done(err, null);
		}else{
			res.render('product',{
				product:product
			});
		}
	});
});



module.exports=router; 