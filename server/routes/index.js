const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

function createToken(user) {
	let payload = {
		id: user.id,
		username: user.username
	};
	let token = jwt.sign(payload, config.get('secret'));
	return token;
}

module.exports = function(req, res) {
	res.send('IT Works!');
};