const Note = require('../models/Note');

exports.get = function(req, res) {
	Note.find({}, function (err, list) {
		if (err) {
			console.error('Load list error');
			return false;
		}
		res.json(list);
	})
};

exports.post = function (req, res) {
	const body = {
		title: req.body.title,
		message: req.body.message
	};

	if (body) {
		const newItem = new Note(body);
		newItem.save();

		res.json(body);
	} else {
		res.json({
			status: 'Error',
			message: 'Information not saved!'
		}).status(500);
	}
};

exports.delete = function (req, res) {
	const id = req.params.id;
	Note.findById(id, function (err, note) {
		if (err) {
			console.error('Load list error');
			return false;
		}
		console.log("note", note);
		note.remove();
		res.json(note).status(200);
	})
};