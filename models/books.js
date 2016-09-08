var mongoose = require('mongoose');

//Schema Setup
var booksSchema = new mongoose.Schema({
	title: String,
	author: String,
	image: String,
	description: String,
	reader: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});
module.exports = mongoose.model('Book', booksSchema);