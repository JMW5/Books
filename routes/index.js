var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');

var Books = require('../models/books');

router.get("/", function(req, res){
	//Get Books from MongoDB
	Books.find({}, function(err, allBooks){
		if (err) {
			console.log(err);
		} else {
			res.render("landing", {books: allBooks, currentUser: req.user});
		}
	});
});


//Authentication Routes
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if (err){
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req,res, function(){
			res.redirect("/books");
		})
	});
});

//show login form
// router.get("/login", function(req, res){
// 	res.render("login");
// })

router.post("/login", passport.authenticate("local", {successRedirect: "/books", failureRedirect: "/login"}), function(req, res){

})


router.get("/logout", function(req, res){
	req.logout();
	req.flash('success', 'You have logged out. Come back soon!');
	res.redirect("/");
})

//Middleware


module.exports = router;