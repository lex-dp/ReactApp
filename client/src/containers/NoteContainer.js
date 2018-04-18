import NoteView from '../views/NoteView';
import { Container } from 'flux/utils';
import React from 'react';
import NoteStore from '../store/NoteStore';
import Actions from '../actions/Actions';
import NoteActions from '../actions/Actions';

class NoteContainer extends React.Component {
    static getStores() {
    	return [NoteStore];
	}

	static calculateState(prevState) {
    	return {
    		messages: NoteStore.getState(),
			onAddItem: Actions.addItem,
			onRemoveItem: Actions.removeItem,
			onEditItem: Actions.editItem,

		};
	}

	render() {
	    return(
	        <NoteView
				messages={this.state.messages}
				onAddItem={this.state.onAddItem}
				onRemoveItem={this.state.onRemoveItem}
				onEditItem={this.state.onEditItem}
			/>
	    );
	}

}

export default Container.create(NoteContainer);