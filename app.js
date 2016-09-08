var express = require('express');
var nodemon = require('nodemon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var User = require('./models/users');
var Books = require('./models/books');
var bookRoute = require('./routes/books');
var indexRoute = require('./routes/index');

var app = express();


//Databases
//mongoose.connect("mongodb://localhost/jacsbooks");
mongoose.connect(process.env.DATABASEURL);



//Passport Config
app.use(require('express-session')({
	secret: "secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

// var books = [
// 	{title: "Zero To One", author: "Peter Thiel", image: "https://images-na.ssl-images-amazon.com/images/I/41puRJbtwkL.jpg"},
// 	{title: "Millionaire Next Door", author: "Thomas J. Stanley", image: "https://images-na.ssl-images-amazon.com/images/I/71t4Nl9Bt3L.jpg"},
// 	{title: "Financial Peace", author: "Dave Ramsey", image: "https://images-na.ssl-images-amazon.com/images/I/519ahlSKJEL._SX315_BO1,204,203,200_.jpg"}
// ]

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.use(methodOverride("_method"));

app.use(indexRoute);
app.use(bookRoute);


app.listen(process.env.PORT || 3000, function(){
	console.log("Books2Read has started");
});