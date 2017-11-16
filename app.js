var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs=require('fs');
var path=require('path');
require('./config/config');

var app = express();


app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//app middleware
app.use(function(req,res,next){
	console.log("Time and Date Log ",new Date());
	console.log("Request URL Log ",req.originalUrl);
	next();
});



//including models files.
fs.readdirSync("./app/models").forEach(function(file){
  if(file.indexOf(".js")){
    require("./app/models/"+file);
  }
});

//including controllers files.
fs.readdirSync("./app/controllers").forEach(function(file){
  if(file.indexOf(".js")){
    var route = require("./app/controllers/"+file);
    //calling controllers function and passing app instance.
    route.controller(app);
  }
});


app.get('*',function(request,response,next){

	response.status = 404;
	next('Path not found');
})

// error handling middleware

app.use(function(err,req,res,next){
	console.log('Error handler was used');
	/*res.status(500).send('Something broke!');*/
	if(res.status == 404){
		res.send("Please check the url again!")
	}else {
		res.send(err);
	}
});

//listening to port 8000 for requests
app.listen(8000,function(){
	console.log("Listening on port 8000!");
})
