const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please enter your username'],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter your password'],
		},
		name: String,
		address: String,
		phone: String,
		email: String,
		confirmed: {
			type: Boolean,
			default: false,
		},
		type: {
			type: Number,
			default: 0, //0=user  1=admin
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
