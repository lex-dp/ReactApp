import axios from 'axios';

export default {
	listNotes() {
		return axios.get('/notes');
	},

	createNote(data) {
		return axios.post('/notes', data);
	},

	deleteNote(noteId) {
		return axios.delete(`/notes/${noteId}`);
	},

	editNote(editData) {
		return axios.put(`/notes/${editData.id}` , editData);
	}

}