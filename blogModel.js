var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating model for blog application.
var blogSchema = new Schema({

	title 			: { type:String, default:'', required:true },
	subTitle 		: { type:String, default:'' },
	blogBody 		: { type:String, default:'' },
	tags 			: [],
	created 		: { type:Date },
	authorInfo 		: {}

});

mongoose.model('Blog',blogSchema);