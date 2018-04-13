import React from 'react';

import './css/Message.css';
import Error from './Error';


class Message extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			title: props.title,
			message: props.message,
			edit: false,
			titleBeforeEdit: null,
			messageBeforeEdit: null,
			id: props.id,


			err: false,
			maxTitleLength: 80,
			maxMsgLength: 80,
		};
		this.handleClickRemove = this.handleClickRemove.bind(this);
		this.handleClickEditWindow = this.handleClickEditWindow.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onMessageChange = this.onMessageChange.bind(this);
		this.editItemCancel = this.editItemCancel.bind(this);
		this.editItemChange = this.editItemChange.bind(this);
	}

	onMessageChange(e) {
		this.setState({
			message: e.target.value
		});
	}

	onTitleChange(e) {
		this.setState({
			title: e.target.value
		});
	}

	handleClickRemove() {
		this.props.onRemove(this.state.id);
	}

	handleClickEditWindow() {
		this.setState({
			titleBeforeEdit: this.state.title,
			messageBeforeEdit: this.state.message,
			edit: true
		});
	}

	editItemCancel() {
		this.setState({
			title: this.state.titleBeforeEdit,
			message: this.state.messageBeforeEdit,
			edit: false
		});
	}

	editItemChange() {
		this.setState({
			edit: false
		});

		let editData = {
			title: this.state.title,
			message: this.state.message,
			id: this.state.id
		};

		this.props.onEdit(editData);
	}

	//new one
	checkTitleLength() {
		let titleArr = this.state.title.split(' ');
		for (let i = 0; i < titleArr.length; i++) {
			if (titleArr[i].length > this.state.maxTitleLength) {
				this.setState({
					errMessage: `Title word can\'t be bigger than ${this.state.maxTitleLength} symbols. Please fix this word: \n` +  titleArr[i]
				});
				return false;
			}
		}
		return true;
	}

	checkMsgLength() {
		let msgArr = this.state.message.split(' ');
		for (let i = 0; i < msgArr.length; i++) {
			if (msgArr[i].length > this.state.maxMsgLength) {
				this.setState({
					errMessage: `Message word can\'t be bigger than ${this.state.maxMsgLength} symbols. Please fix this word: \n` +  msgArr[i]
				});
				return false;
			}
		}
		return true;
	}

	checkTitleErr() {
		if (!this.checkTitleLength()) {
			this.setState({
				err: true
			});
		} else {
			this.setState({
				err: false
			});
		}
	}

	checkMessageErr() {
		if (!this.checkMsgLength()) {
			this.setState({
				err: true
			});
		} else {
			this.setState({
				err: false
			});
		}
	}


	render() {
		if (this.state.edit && !this.state.err) {
			return (
				<div className={'message message_edit'}>
					<input type="text" value={this.state.title} onChange={this.onTitleChange}/>
					<textarea
						cols="25"
						rows="7"
						placeholder={'Message'}
						value={this.state.message}
						onChange={this.onMessageChange}
					></textarea>
					<button type={'button'} onClick={this.editItemCancel}>Cancel</button>
					<button type={'button'} onClick={this.editItemChange}>Edit</button>
				</div>
			)
		}else if (this.state.edit && this.state.err) {
			return (
				<div className={'container_error'} >
					<div className={'message message_edit'}>
						<input type="text" value={this.state.title} onChange={this.onTitleChange}/>
						<textarea
							cols="25"
							rows="7"
							placeholder={'Message'}
							value={this.state.message}
							onChange={this.onMessageChange}
						></textarea>
						<button type={'button'} onClick={this.editItemCancel}>Cancel</button>
						<button type={'button'} onClick={this.editItemChange}>Edit</button>
					</div>
					<Error/>
				</div>

			)
		}

		else {
			return(
				<div className={'message'}>
					<h3>{this.props.title}</h3>
					<figure className={'quote'}>
						<blockquote className={'curly_quotes'}>{this.props.message}</blockquote>
					</figure>
					<figcaption className={'quote_by'}>— Jim Rohn</figcaption>
					<span className={'close_btn'}  onClick={this.handleClickRemove}>X</span>
					<span className={'edit_btn'} onClick={this.handleClickEditWindow}></span>
				</div>
			);
		}
	}
}


export default Message;