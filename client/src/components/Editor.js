import React from 'react';

import './css/Editor.css';

import NoteActions from '../actions/Actions';

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			message: ''
		};
		this.onMessageChange = this.onMessageChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.checkMsgLength = this.checkMsgLength.bind(this);
		this.checkTitleLength = this.checkTitleLength.bind(this);
		this.addItem = this.addItem.bind(this);
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

	checkMsgLength() {
		let msgArr = this.state.message.split(' ');
		for (let i = 0; i < msgArr.length; i++) {
			if (msgArr[i].length > 80) {
				console.log(msgArr[i]);
				return false;
			}
		}
		return true;
	}

	checkTitleLength() {
		let titleArr = this.state.title.split(' ');
		for (let i = 0; i < titleArr.length; i++) {
			if (titleArr[i].length > 80) {
				console.log(titleArr[i]);
				return false;
			}
		}
		return true;
	}

	addItem() {
		if (this.state.message) {
			this.props.onAddItem(this.state);
		}

		this.setState({
			title: '',
			message: ''
		});
	}

	handleClick(e) {
		/*if (this.checkLength()) {
			this.addItem();
		}*/
		this.checkMsgLength();
		this.checkTitleLength();
		this.addItem();

	}

    render() {
        return(
            <div className={'editor'}>
				<input type="text"
					   placeholder={'Title'}
					   value={this.state.title}
					   onChange={this.onTitleChange}
				/>
				<textarea
					cols="25"
					rows="7"
					placeholder={'Message'}
					value={this.state.message}
					onChange={this.onMessageChange}></textarea>
				<button type={'button'} onClick={this.handleClick}>Add</button>
            </div>
        );
    }
}

export default Editor;