const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
		ref: 'Users',
	},
	productId: String,
	content: String,
	date: Date,
	reply: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model('Comments', commentSchema);
