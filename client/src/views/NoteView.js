import React from 'react';

import Container from '../components/Container';
import Editor from '../components/Editor';
import MessageContainer from '../components/MessageContainer';
import Message from '../components/Message';
import Settings from '../components/Settings';

import Pagination from '../components/Pagination';
import NoteActions from "../actions/Actions";


class NoteView extends React.Component {
	constructor() {
		super();
		this.state = {
			pageOfItems: [],
			pageView:    +sessionStorage.getItem("pageView") || 15,
			pageMode: 'Classic'
		};

		this.onChangePage = this.onChangePage.bind(this);
		this.onChangeCountViewPages = this.onChangeCountViewPages.bind(this);
		this.onChangePageMode = this.onChangePageMode.bind(this);
	}

	componentWillMount() {
		NoteActions.loadNotes();
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

	onChangeCountViewPages(e) {
		this.setState({
		    pageView: +e.target.innerText
		});

		sessionStorage.setItem("pageView", e.target.innerText);
	}

	onChangePageMode(e) {
		this.setState({
			pageMode: e.target.innerText
		});
	}

	render() {
		let remove = this.props.onRemoveItem;
		let edit = this.props.onEditItem;

		if (this.props.messages) {
			return(
				<Container>

					<Settings
						pageView={this.state.pageView}
						onChangeCountViewPages={this.onChangeCountViewPages}
						onChangePageMode={this.onChangePageMode}
					/>

					<Editor messages={this.props.messages} onAddItem={this.props.onAddItem}/>
					<MessageContainer pageMode={this.state.pageMode}>
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
						pageView={this.state.pageView}
					/>
				</Container>
			);
		}else {
			return(
				<Container>

					<Settings pageView={this.state.pageView} handleClick={this.onChangeCountViewPages}/>

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