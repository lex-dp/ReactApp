const mongoose = require('mongoose');
const config = require('../config');
mongoose.connect(config.get('dbPath'));
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	}
});

UserSchema.pre('save', function(next) {
	let self = this;

	if(!self.isModified('password')) { return next(); }

	bcrypt.hash(this.password, 12, function(err, hash) {
		self.password = hash;
		next();
	});

});

UserSchema.methods.comparePassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, hash) {
		if(!hash) {
			return callback(err);
		}else {
			return callback(null, hash);
		}
	});
};


module.exports = mongoose.model('Users', UserSchema);

