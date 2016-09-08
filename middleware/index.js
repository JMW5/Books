var Books = require("../models/books");


var middlewareObj = {};


middlewareObj.checkBookOwnership = function(req, res, next){
	if (req.isAuthenticated()){
		Books.findById(req.params.id, function(err, foundBook){
			if (err) {
				res.redirect('back');
			} else {
				if(foundBook.reader.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		})
	} else {
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	console.log("Please login");
	req.flash("error", "Please Login or Signup First!")
	res.redirect("/");
}



module.exports = middlewareObj;