import React from 'react';

import Container from '../components/Container';
import Editor from '../components/Editor';
import MessageContainer from '../components/MessageContainer';
import Message from '../components/Message';

import NoteActions from '../actions/Actions';
import NoteStore from '../store/NoteStore';

class NoteView extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	        notes: []
	    };
	}
	componentWillMount() {
		//NoteActions.loadNotes();
		NoteStore.getState();
	}
	componentWillUnmount() {
		console.log("componentWillUnmount() this will remove NoteView", this);
	}




	/*componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps() NoteView");
	}

	componentDidMount(){
		console.log("componentDidMount() NoteView");
	}

	shouldComponentUpdate(){
		console.log("shouldComponentUpdate() NoteView");
		return true;
	}
	componentWillUpdate(){
		console.log("componentWillUpdate() NoteView");
	}
	componentDidUpdate(){
		console.log("componentDidUpdate() NoteView");
	}*/


	onRemove(item){
		if(item){
			this.props.onRemoveItem(item);
		}
	}

	render() {
		let remove = this.props.onRemoveItem;
		let edit = this.props.onEditItem;

		console.log("this.props.messages Render", this.props.messages);
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

