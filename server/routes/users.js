exports.get = function(req, res) {
	res.json([{
		id: 1,
		username: "samsepi0l"
	}, {
		id: 2,
		username: "D0loresH4ze"
	}]);
};

exports.post = function (req, res) {
	const User = require('../models/User');
	const Note = require('../models/Note');



	/*User.find({}, function (err, users) {
		console.log("users backend", users);
		res.json(users);
	});*/

	Note.find({}, function (err, msg) {
		console.log("users backend", msg);
		res.json(msg);
	});
};