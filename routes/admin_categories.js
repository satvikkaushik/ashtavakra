var express=require('express');
var router=express.Router() ; 
// var flash=require('connect-flash');

var Category=require('../models/categories.js');

	router.get('/',function(req,res){
			Category.find(function(err,categories){
				if(err) return console.log(err);
				res.render('admin/categories',{
					categories:categories
				});
			});
		});

router.get('/add-category',function(req,res){
	res.render('admin/add-category');
});

router.post('/add-category',function(req,res){
	var title=req.body.categoryname;
	var slug=title.replace(/\s+/g,'-').toLowerCase();
	var img=req.body.imgUrl;

	// var errors=req.validationErrors();
	// if(errors){
	// 	res.render('admin/add-category',{
	// 		title:title,
	// 		errors:errors
	// 	});
	// }else{
		Category.findOne({slug:slug},function(err,cat){
			if(cat){
				// req.flash('danger','category slug exists, choose another title');
				res.render('admin/add-category',{
					titpagespagespagesle:title
				});
			}else{
				var category= new Category({
					title:title,
					slug:slug,
					imgUrl:img
				});
				category.save(function(err){
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


router.get('/edit-category/:id',function(req,res){
	Category.findById(req.params.id,function(err,cat){
		// if(err){
		// 	return console.log(err);
		// }
		// console.log(cat);
		// console.log(cat.title);

		res.render('admin/edit-category',{cat:cat });
	});
});
router.post('/edit-category/:id',function(req,res){
	console.log(req.body.categoryname);
	// Category.


});


module.exports=router;