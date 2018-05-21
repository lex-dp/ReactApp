const passport = require('passport');
const config = require('../config');
const User = require('../models/User');

const JwtStrategy = require('passport-jwt').Strategy;
const cookieExtractor = function(req) {
	let token = null;
	if (req && req.cookies)
	{
		token = req.cookies['token'];
	}
	return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.get('secret');

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	User.findOne({_id: jwt_payload.id}, function(err, user) {
		if (err) {
			return done(err, false);
		}
		if (!user) {
			return done(err, false);
		}

		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
			// or you could create a new account
		}
	});
}));

module.exports = passport;