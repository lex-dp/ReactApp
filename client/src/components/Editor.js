import React from 'react';

import './css/Editor.css';
import Error from './Error';

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			message: '',
			err: false,
			maxTitleLength: 80,
			maxMsgLength: 80,
			errMessage: '',
			titleBeforeChange: '',
			messageBeforeChange: '',
			titleClass: '',
			messageClass: ''
		};

		this.onMessageChange = this.onMessageChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.checkMsgLength = this.checkMsgLength.bind(this);
		this.checkTitleLength = this.checkTitleLength.bind(this);
		this.checkTitleErr = this.checkTitleErr.bind(this);
		this.checkMessageErr = this.checkMessageErr.bind(this);

		this.addItem = this.addItem.bind(this);

		this.handleMouserEnter = this.handleMouserEnter.bind(this);
		this.handleMouserLeave = this.handleMouserLeave.bind(this);

	}


	onMessageChange(e) {
		this.checkMessageErr();
		this.setState({
			message: e.target.value
		});
	}

	onTitleChange(e) {
		this.checkTitleErr();
		this.setState({
			title: e.target.value
		});
	}

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
		if (!this.checkMsgLength() || !this.checkTitleLength()) {
			this.setState({
			    err: true
			});
			return false;
		} else {
			this.setState({
				err: false
			});
			this.addItem();
		}
	}

	handleMouserEnter() {
		if (!this.checkTitleLength()) {
			this.setState({
			    titleClass: 'error_length'
			});
		} if (!this.checkMsgLength()) {
			this.setState({
				messageClass: 'error_length'
			});
		}

		this.setState({
		    titleBeforeChange: this.state.title,
		    messageBeforeChange: this.state.message,
			message: this.state.errMessage
		});
	}

	handleMouserLeave() {
		this.setState({
			titleBeforeChange: '',
			messageBeforeChange: '',
			message: this.state.messageBeforeChange,
			titleClass: '',
			messageClass: ''
		});
	}

    render() {
		if (this.state.err) {
			return(
				<div className={'container_error'} >
					<div className={'editor'}>
						<input type="text"
							   placeholder={'Title'}
							   value={this.state.title}
							   onChange={this.onTitleChange}
							   onBlur={this.onTitleChange}
							   className={this.state.titleClass}
						/>
						<textarea
							cols="25"
							rows="7"
							placeholder={'Message'}
							value={this.state.message}
							onChange={this.onMessageChange}
							onBlur={this.onMessageChange}
							className={this.state.messageClass}
						></textarea>
						<button type={'button'} onClick={this.handleClick}>Add</button>
					</div>
					<Error onMouseEnter={this.handleMouserEnter} onMouseLeave={this.handleMouserLeave}/>
				</div>

			);
		} else {
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
}

export default Editor;