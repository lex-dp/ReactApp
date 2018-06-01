const Note = require('../models/Note');

function sendNotes(res) {
	Note.find({}, function (err, list) {
		if (err) {
			console.error('Load list error');
			return false;
		}
		res.json(list);
	});
}


exports.get = function(req, res) {
	sendNotes(res);
};

exports.post = function (req, res) {
	const body = {
		title: req.body.title,
		message: req.body.message
	};

	if (body) {
		const newItem = new Note(body);
		newItem.save(function (err, item) {
			if (err) {
				console.error('Save Error!');
				return false;
			}

			sendNotes(res);
		});

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

		note.remove();

		sendNotes(res);
	});
};

exports.put = function (req, res) {
	const id = req.params.id;

	const newData = {
		title: req.body.title,
		message: req.body.message
	};

	Note.update({ _id: id }, { $set: { title: newData.title, message: newData.message }}, function (err, editNote) {
		if (err) {
			console.error('Update list error');
			return false;
		}

		sendNotes(res);
	});
};