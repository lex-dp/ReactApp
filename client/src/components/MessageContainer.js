import React from 'react';
import Masonry from 'react-masonry-component';

import './css/MessageContainer.css';

const masonryOptions = {
	itemSelector: '.message',
	gutter: 10,
	isFitWidth: true,
	//transitionDuration: '0.7s',
	//stagger: 200
};

class MessageContainer extends React.Component {
	render() {
		return(
			<div className={'message_container'}>
				<Masonry
					className={'masonry_container'}
					options={masonryOptions}
				>
					{this.props.children}
				</Masonry>
			</div>

		);
	}
}

export default MessageContainer;