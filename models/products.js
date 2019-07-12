var mongoose=require('mongoose');

var ProductSchema=mongoose.Schema({
	
	title:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	description:{
		type:String
	},
	details:{
		type:String
	},
	slug:{
		type:String
	},
	imgUrl1:{
		type:String
	},
	imgUrl2:{
		type:String
	},imgUrl3:{
		type:String
	},imgUrl4:{
		type:String
	},
	flipkartUrl:{
		type:String
	},
	amazonUrl:{
		type:String
	}
 
});

var Product=module.exports=mongoose.model('Product',ProductSchema);