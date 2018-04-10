import React from 'react';

import './css/Error.css';

class Error extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	        message: this.props.message,
			type: this.props.type
	    };
	}


	render() {
		if (this.state.type == 'warning') {
			return(
				<div className={'warning'}>
					{
						this.state.message
					}
				</div>
			);
		} else {
			return(
				<div className={'error'}>
					{
						this.state.message
					}
				</div>
			);
		}
	}

}

export default Error;

