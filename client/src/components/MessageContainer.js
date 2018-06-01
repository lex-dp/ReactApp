import React from 'react';
import Masonry from 'react-masonry-component';

import './css/MessageContainer.css';

const classicOptions = {
	itemSelector: '.message',
	gutter: 10,
	isFitWidth: true
};

const modernOptions = {
	itemSelector: '.message',
	gutter: 10,
	isFitWidth: true,
	transitionDuration: '0.7s',
	stagger: 200
};


class MessageContainer extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	pageMode: {}
		};

		this.setPageMode = this.setPageMode.bind(this);
	}

	setPageMode() {

	}

	render() {
		return(
			<div className={'message_container'}>
				<Masonry
					className={'masonry_container'}
					options={classicOptions}
				>
					{this.props.children}
				</Masonry>
			</div>
		);
	}
}

export default MessageContainer;