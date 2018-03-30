import { ReduceStore } from 'flux/utils';
import ActionsTypes from '../actions/ActionsTypes';
import NoteDispatcher from '../dispatcher/NoteDispatcher';
import NoteActions from "../actions/Actions";

let _isLoading = true;

function formatNote(note) {
	return {
		id: note._id,
		title: note.title,
		message: note.message
/*		text: note.text,
		color: note.color || '#ffffff',
		createdAt: note.createdAt*/
	};
}

class NoteStore extends ReduceStore {
    constructor(){
        super(NoteDispatcher);
    }

   /* getInitialState() {
		return Immutable.List.of({
				title: 'iPhone 7',
				message: 'New model'
			},
			{
				title:  'Google Pixel',
				message: 'Clasic model'
			});
	}*/

    getInitialState() {
		return [];
	}

	reduce(state, action) {
    	switch (action.type) {

    		case ActionsTypes.LOAD_NOTES_REQUEST:
				_isLoading = true;
				return state;

			case ActionsTypes.LOAD_NOTES_SUCCESS: {

				_isLoading = false;

				//return action.notes.map( formatNote );
				state = action.notes.map( formatNote );
				return state;
			}

			case ActionsTypes.LOAD_NOTES_FAIL: {
				console.error("LOAD_NOTES_FAIL - action.error", action.error);
				return action.error;
			}

			case ActionsTypes.ADD_ITEM:
				console.log("action add" , action);

				console.log("state add", state);
				return state;

			case ActionsTypes.REMOVE_ITEM:
				console.log("state remove", state);
				console.log("action remove", action);
				let id = action.remove._id;

				state.forEach(function (item, i, arr) {
					let search = item.id.indexOf(id);
					if (search > -1) {
						arr.splice(i, 1);
						return;
					}
					return state;
				});

				return state;
			case ActionsTypes.EDIT_ITEM:

			/*	let findIndex = state.findIndex(item => item.title === "Google Pixel");
				return state.setIn([findIndex], {
					title: action.messageObj.title,
					message: action.messageObj.message
				});*/

			default:
				return state;
		}
	}
}

export default new NoteStore();