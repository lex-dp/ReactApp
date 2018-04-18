import React from 'react';

import Container from '../components/Container';
import Editor from '../components/Editor';
import MessageContainer from '../components/MessageContainer';
import Message from '../components/Message';

import Pagination from '../components/Pagination';
import NoteActions from "../actions/Actions";

class NoteView extends React.Component {

	onRemove(item){
		if(item){
			this.props.onRemoveItem(item);
		}
	}

	componentWillMount() {
		NoteActions.loadNotes();
	}

	render() {
		let remove = this.props.onRemoveItem;
		let edit = this.props.onEditItem;



		console.log("this.props.messages", this.props.messages);
	    return(
			<Container>
				<Editor messages={this.props.messages} onAddItem={this.props.onAddItem}/>
				<MessageContainer>
					{
						this.props.messages.map(function (item) {
							return <Message
								key={item.id}
								id={item.id}
								title={item.title}
								message={item.message}
								onRemove={remove}
								onEdit={edit}
							/>;
						})
					}
				</MessageContainer>
			</Container>
	    );
	}
}


export default NoteView;

