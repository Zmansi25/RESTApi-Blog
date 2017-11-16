var mongoose = require('mongoose');


//connection to database
var dbPath = "mongodb://localhost/blogApp";
db = mongoose.connect(dbPath);

//Check db connection
mongoose.connection.once('open',function(){
	console.log("databse connection now open");
});
