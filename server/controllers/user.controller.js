const Users = require('../models/userModel');

const register = async (req, res) => {
	try {
		res.json({ msg: 'Register Test' });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = { register };
