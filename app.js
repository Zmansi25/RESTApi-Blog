var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//app middleware
app.use(function(req,res,next){
	console.log("Time and Date Log ",new Date());
	console.log("Request URL Log ",req.originalUrl);
	next();
});

//connection to database
var dbPath = "mongodb://localhost/blogApp";
db = mongoose.connect(dbPath);

//Check db connection
mongoose.connection.once('open',function(){
	console.log("databse connection now open");
});

//include modedl
var Blog = require('./blogModel.js');
var blogModel = mongoose.model('Blog');

//basic route
app.get('/', function(req,res){

	res.send("This is a blog application");

})

//api to create blogs
app.post('/blog/create',function(req,res){
	var newBlog= new blogModel({
		title 	 : req.body.title,
		subTitle : req.body.subTitle,
		blogBody : req.body.blogBody
	});
	var today = Date.now();
	newBlog.created = today;

	var allTags  = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):'';
	newBlog.tags = allTags;

	var authorInfo = {fullName:req.body.authorFullName,email:req.body.authorEmail,phone:req.body.authorPhone};
	newBlog.authorInfo = authorInfo;


	newBlog.save(function(error){
		
		if(error){
			res.send(error);
		}
		else{
			res.send(newBlog);
		}

	});

});

//api to view all blogs
app.get('/blogs',function(req,res){
	blogModel.find(function(err,result){
		
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}

	});
});

//api to view a particular blog
app.get('/blogs/:id',function(req,res){
	blogModel.findOne({'_id':req.params.id},function(error,result){
		
		if(error){
			res.send(error);
		}
		else{
			res.send(result);
		}

	});
});

//api to edit a blog
app.put('/blogs/:id/edit',function(req,res){
	var update = req.body;
	blogModel.findOneAndUpdate({'_id':req.params.id},update,function(error,result){
		
		if(error){
			res.send(error);
		}
		else{
			res.send(result);
		}

	});
});

//api to delete a blog
app.post('/blogs/:id/delete',function(req, res) {
	blogModel.remove({'_id':req.params.id},function(err,result){
		
		if(err){
			console.log("some error");
			res.send(err)
		}
		else{
			res.send(result)
		}

	});
});

//listening to port 8000 for requests
app.listen(8000,function(){
	console.log("Listening on port 8000!");
})

//error handling middleware
app.use(function(req, res) {
   res.status('404').send("OOPS! Page not Found");
   console.log("Page not found!");
});
app.use(function(req, res) {
   res.status('500').send("OOPS! Internal Server Error");
   console.log("Internal Server Error");
});

