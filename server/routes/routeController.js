const express = require('express');
const router = express.Router();

const index = require('./index');
const users = require('./users');
const notes = require('./notes');



module.exports = function(app) {

	app.get('/', index);

	app.get('/users', users.get);
	app.post('/users', users.post);

	app.get('/notes', notes.get);
	app.post('/notes', notes.post);
	app.delete('/notes/:id', notes.delete);


};


