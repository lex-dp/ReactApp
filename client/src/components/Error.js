import React from 'react';

import './css/Error.css';

class Error extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	        message: this.props.message,
			type: this.props.type,
			onMouseEnter: this.props.onMouseEnter,
			onMouseLeave: this.props.onMouseLeave
	    };
	}

	render() {
		if (this.state.type == 'warning') {
			return(
				<div className={'warning'}
					 onMouseEnter={this.state.onMouseEnter}
					 onMouseLeave={this.state.onMouseLeave}
				>
					{
						this.state.message
					}
				</div>
			);
		} else {
			return(
				<div className={'error'}
					 onMouseEnter={this.state.onMouseEnter}
					 onMouseLeave={this.state.onMouseLeave}
				>
					{
						this.state.message
					}
				</div>
			);
		}
	}

}

export default Error;

