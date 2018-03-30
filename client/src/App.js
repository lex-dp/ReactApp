import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*import Editor from './components/Editor';
import Container from './components/Container';
import MessageContainer from "./components/MessageContainer";
import Message from "./components/Message";*/

import NoteContainer from './containers/NoteContainer';




class App extends Component {
	state = {users: []}
	componentDidMount() {
		fetch('/users')
			.then(res => res.json())
			.then(users => this.setState({ users }));

		/*fetch('/users', { method: 'POST' })
			.then(res => res.json())
			.then(function (msg) {
				console.log("msg", msg);
			})*/
			//.then(users => this.setState({ users }));

	}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

		<NoteContainer/>

		<div className="users">
		  <h1>Users</h1>
		  {this.state.users.map(user =>
			  <div key={user.id}>{user.username}</div>
		  )}
		</div>

      </div>
    );
  }
}

export default App;
