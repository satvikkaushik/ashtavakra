var express=require('express');
var router=express.Router() ; 
// var flash=require('connect-flash');

var Category=require('../models/categories.js');
var Product=require('../models/products.js');
var z='1';


	router.get('/',function(req,res){
			Product.find(function(err,product){
				if(err) return console.log(err);
				res.render('admin/products',{
					product:product
				});
			});
		});

	router.get('/add-product',function(req,res){
		Category.find(function(err,categories){
			if(err) return console.log(err);
			res.render('admin/add-product',{
				categories:categories
			});
		});
	});

	router.post('/add-product',function(req,res){
		var title=req.body.productname;
		var category=req.body.category;
		var description=req.body.description;
		var details=req.body.details;

		var slug=title.replace(/\s+/g,'-').toLowerCase();
		var img1=req.body.imgUrl1;
		var img2=req.body.imgUrl2;
		var img3=req.body.imgUrl3;
		var img4=req.body.imgUrl4;
		var flipUrl=req.body.flipUrl;
		var amazonUrl=req.body.amazonUrl;

		// var errors=req.validationErrors();
		// if(errors){
		// 	res.render('admin/add-category',{
		// 		title:title,
		// 		errors:errors
		// 	});
		// }else{
			Product.findOne({slug:slug},function(err,pro){
				if(pro){
					// req.flash('danger','category slug exists, choose another title');
					res.render('admin/add-category',{
						titpagespagespagesle:title
					});
				}else{
					var product= new Product({
						title:title,
						details:details,
						description:description,
						category:category,
						slug:slug,
						imgUrl1:img1,
						imgUrl2:img2,
						imgUrl3:img3,
						imgUrl4:img4,
						flipkartUrl:flipUrl,
						amazonUrl:amazonUrl,


					});
					product.save(function(err){
						if(err){
							return console.log(err);
						}
						// req.flash('success','Category Added');
						res.redirect('/admin/categories');
					});
				}

			});
		// }

	});



module.exports=router;