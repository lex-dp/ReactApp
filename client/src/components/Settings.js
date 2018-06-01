import React from 'react';

import '../components/css/Settings.css';

class Settings extends React.Component {
	constructor() {
		super();

		this.toggleList = this.toggleList.bind(this);
		this.setClass = this.setClass.bind(this);
	}

	componentDidMount() {
		let pageView = this.refs.pageView;
		this.setClass(pageView, this.props.pageView);
	}


	toggleList(e) {
		let list = e.target;
		if (list.tagName != 'BUTTON') {
			return;
		}

		let active = list.parentNode.querySelector('.active');
		if (active) {
			active.classList.remove('active')
		}
		list.classList.toggle('active');
	}

	setClass(list, item) {
		let target = list.querySelectorAll('button[type="button"]');
		for (let i = 0; i < target.length; i++) {
			if (target[i].innerText == item) {
				target[i].classList.add('active');
				return;
			}
		}
	}

	render() {
		return(
			<div className={'settings'}>
				<div className={'page_view'} onClick={this.toggleList} ref={'pageView'}>
					<button type={'button'} onClick={this.props.onChangeCountViewPages}>15</button>
					<button type={'button'} onClick={this.props.onChangeCountViewPages}>25</button>
					<button type={'button'} onClick={this.props.onChangeCountViewPages}>50</button>
				</div>
				<div className={'mode'} onClick={this.toggleList}>
					<button type={'button'} onClick={this.props.onChangePageMode}>Classic</button>
					<button type={'button'} onClick={this.props.onChangePageMode}>Modern</button>
				</div>
			</div>
		);
	}
}


export default Settings;