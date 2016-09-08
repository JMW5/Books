var express = require('express');
var router = express.Router();

var Books = require('../models/books');
var middleware = require('../middleware');

router.get("/books", middleware.isLoggedIn, function(req, res){
	//Get Books from MongoDB
	Books.find({}, function(err, allBooks){
		if (err) {
			console.log(err);
		} else {
			res.render("index", {books: allBooks, currentUser: req.user});
		}
	});
})

router.post("/books", middleware.isLoggedIn, function(req, res){
	//Get data from form and add to the books array


	var title = req.body.title;
	var author = req.body.author;
	var image = req.body.image;
	var description = req.body.description; 

	var reader = {
		id: req.user._id,
		username: req.user.username
	}
	var newBooks = {
		title: title, 
		author: author, 
		image: image, 
		reader: reader, 
		description: description
	}
	Books.create(newBooks, function(err, newBook){
		if (err) {
			console.log(err);
		} else {
			//Redirect to books page
			console.log(newBook);
			res.redirect("/books");

		}
	})
})

//Get the Form
router.get("/books/new", middleware.isLoggedIn, function(req, res){
	res.render("new.ejs");
})


//Shows info about the particular book
router.get("/books/:id", middleware.isLoggedIn, function(req, res){
	//find the campground with provided ID
	Books.findById(req.params.id, function(err, foundBook){
		if (err) {
			console.log(err)
		} else {
			//render show template with that book
			console.log(foundBook);
			res.render("show", {books: foundBook});
		}
	});
})




//Edit Books route
router.get("/books/:id/edit", middleware.checkBookOwnership, function(req, res){
	Books.findById(req.params.id, function(err, foundBook){
		res.render("edit", {book: foundBook});
	})
})


//Update Books route
router.put("/books/:id", function(req, res){
	//Find and update the correct book
	Books.findByIdAndUpdate(req.params.id, req.body.books, function(err, updatedBook){
		if (err) {
			res.redirect("/books")
		} else {
			res.redirect("/books/" + req.params.id);
		}
	})
	//Redirect to show page
})



//Delete Book
router.delete("/books/:id", function(req, res){
	Books.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			res.redirect('/books');
		} else {
			res.redirect('/books');
		}
	})
})

//Middleware


//Middleware


module.exports = router;