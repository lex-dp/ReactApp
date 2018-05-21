import ActionsTypes from './ActionsTypes';
import NoteDispatcher from '../dispatcher/NoteDispatcher';

import api from '../api';

const Actions = {
	loadNotes() {
		NoteDispatcher.dispatch({
			type: ActionsTypes.LOAD_NOTES_REQUEST
		});

		api.listNotes()
			.then(({ data }) =>
				NoteDispatcher.dispatch({
					type: ActionsTypes.LOAD_NOTES_SUCCESS,
					notes: data
				})
			)
			.catch(err =>
				NoteDispatcher.dispatch({
					type: ActionsTypes.LOAD_NOTES_FAIL,
					error: err
				})
			);
	},
	addItem(item) {
		api.createNote(item)
			.then(({ data }) =>
				NoteDispatcher.dispatch({
					type: ActionsTypes.ADD_ITEM,
					notes: data
				})
			);
	},
	removeItem(itemId) {
		api.deleteNote(itemId)
			.then(({ data }) =>
				NoteDispatcher.dispatch({
					type: ActionsTypes.REMOVE_ITEM,
					notes: data
				})
			);
	},
	editItem(editData) {
		api.editNote(editData)
			.then(({ data }) =>
				NoteDispatcher.dispatch({
					type: ActionsTypes.EDIT_ITEM,
					notes: data
				})
			);
	}
};

export default Actions;