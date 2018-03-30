const mongoose = require('mongoose');
const config = require('../config');
mongoose.connect(config.get('dbPath'));
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
	title: {
		type: String
	},
	message: {
		type: String,
		require: true
	}
});

/*UserSchema.pre('save', function(next) {
	let self = this;

	if(!self.isModified('message')) { return next(); }

	bcrypt.hash(this.password, 12, function(err, hash) {
		self.password = hash;
		next();
	});

});*/



module.exports = mongoose.model('Notes', NoteSchema);

