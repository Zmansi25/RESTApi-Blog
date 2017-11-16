var express = require('express');
var mongoose = require('mongoose');

var blogRouter = express.Router();

var blogModel = mongoose.model('Blog');


module.exports.controller = function (app) {
	//basic route
	blogRouter.get('/', function (req, res) {

		res.send("This is a blog application");

	})

	//api to create blogs
	blogRouter.post('/blog/create', function (req, res) {
		var newBlog = new blogModel({
			title: req.body.title,
			subTitle: req.body.subTitle,
			blogBody: req.body.blogBody
		});
		var today = Date.now();
		newBlog.created = today;

		var allTags = (req.body.allTags) ? req.body.allTags.split(',') : '';
		newBlog.tags = allTags;

		var authorInfo = {
			fullName: req.body.authorFullName,
			email: req.body.authorEmail,
			phone: req.body.authorPhone
		};
		newBlog.authorInfo = authorInfo;


		newBlog.save(function (error) {

			var result = error ? "Some error occured!" : newBlog;
			res.send(result);

		});

	});

	//api to view all blogs
	blogRouter.get('/blogs', function (req, res) {
		blogModel.find(function (error, blogs) {

			var result = error ? "Some error occured!" : blogs;
			res.send(result);

		});
	});

	//api to view a particular blog
	blogRouter.get('/blogs/:id', function (req, res) {
		blogModel.findOne({'_id': req.params.id}, function (error, blogs) {

			var result = error ? "Some error occured!" : blogs;
			res.send(result);

		});
	});

	//api to edit a blog
	blogRouter.put('/blogs/:id', function (req, res) {
		var update = req.body;
		console.log(update);
		blogModel.findOneAndUpdate({'_id': req.params.id}, update, function (error, blogs) {

			var result = error ? "Some error occured!" : blogs;
			res.send(result);

		});
	});

	//api to delete a blog
	blogRouter.delete('/blogs/:id', function (req, res) {
		blogModel.remove({'_id': req.params.id}, function (error, blogs) {

			var result = error ? "Some error occured!" : blogs;
			res.send(result);

		});
	});

	app.use(blogRouter);


}