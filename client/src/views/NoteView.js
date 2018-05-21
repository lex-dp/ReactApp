import React from 'react';

import Container from '../components/Container';
import Editor from '../components/Editor';
import MessageContainer from '../components/MessageContainer';
import Message from '../components/Message';

import Pagination from '../components/Pagination';
import NoteActions from "../actions/Actions";


class NoteView extends React.Component {
	constructor() {
		super();
		this.state = {
			pageOfItems: []
		};

		this.onChangePage = this.onChangePage.bind(this);
	}

	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({ pageOfItems: pageOfItems });

		//save page number to sessionStorage
		sessionStorage.setItem("pageNumber", Pagination.defaultProps.currentPage);
	}

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

		if (this.props.messages) {
			return(
				<Container>
					<Editor messages={this.props.messages} onAddItem={this.props.onAddItem}/>
						<MessageContainer>
							{
								this.state.pageOfItems.map(function (item) {
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
						<Pagination
							initialPage={+sessionStorage.getItem("pageNumber") || 1 }
							items={this.props.messages}
							onChangePage={this.onChangePage}
						/>
				</Container>
			);
		}else {
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
}


export default NoteView;