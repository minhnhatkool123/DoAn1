const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	try {
		const { username, password, name, address, phone, email } = req.body;

		if (!username || !password)
			return res
				.status(400)
				.json({ message: 'Please fill username and password' });

		const user = await Users.findOne({ username });
		if (user)
			return res.status(400).json({ message: 'This username already exist' });

		if (password.length < 6)
			return res
				.status(400)
				.json({ message: 'Password must be at least 6 characters' });

		if (email.length != 0 && !validateEmail(email))
			return res.status(400).json({ message: 'Invalid email' });

		if (phone.length < 10)
			return res.status(400).json({ message: 'Phone number too short' });

		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = new Users({
			username,
			password: passwordHash,
			name,
			address,
			phone,
			email,
		});

		const result = await newUser.save();

		//console.log(req.body);
		// const accessToken = createAccessToken({
		// 	id: newUser._id,
		// 	username: newUser.username,
		// 	password: newUser.password,
		// });
		res.status(201).json({ message: 'Register success' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await Users.findOne({ username });
		if (!user) return res.status(400).json({ message: 'User does not exist' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res
				.status(400)
				.json({ message: 'Incorrect password or username' });

		//if login success
		const accessToken = createAccessToken({ id: user._id });
		const refresh_token = createRefreshToken({ id: user._id });

		res.cookie('refresh_token', refresh_token, {
			httpOnly: true,
			path: '/user/refresh-token',
		});

		res.json({ accessToken });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getInfoUser = async (req, res) => {
	try {
		const user = await Users.findById(req.user.id).select('-password');
		if (!user) return res.status(400).json({ message: 'User does not exist' });
		res.json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const refreshToken = (req, res) => {
	try {
		const rf_token = req.cookies.refresh_token;
		if (!rf_token) return res.status(400).json({ message: 'Please login' });
		jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
			if (error) return res.status(400).json({ message: 'Please login' });

			const accessToken = createAccessToken({ id: user.id });

			res.json({ accessToken });
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	//res.json({ rf_token });
};

const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_LIFE,
	});
};

const createRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.TOKEN_REFRESH_LIFE,
	});
};

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

module.exports = { register, login, refreshToken, getInfoUser };
