import React from 'react';

import Container from '../components/Container';
import Editor from '../components/Editor';
import MessageContainer from '../components/MessageContainer';
import Message from '../components/Message';

class NoteView extends React.Component {
	onRemove(item){
		if(item){
			this.props.onRemoveItem(item);
		}
	}

	render() {
		let remove = this.props.onRemoveItem;
		let edit = this.props.onEditItem;

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

