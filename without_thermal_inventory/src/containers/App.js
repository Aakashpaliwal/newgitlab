import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Main from './Main';
import Sidebar from './Sidebar/Sidebar';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';		// takes second part of jwt (payload) and decode into correct object to setCurrentUser

// we configure our store using the configureStore function from ../store/index.js
const store = configureStore();

// if there is a token in local storage when page refreshes, then make sure token is added to all future requests while user remains logged in
// (localStorage.jwt is cleared on logout, so this allows a user to persist as logged in)
// ('rehydrate' state with current user's token--gets user data on redux refresh)
if(localStorage.jwt) {
	setAuthorizationToken(localStorage.jwt);
	// prevent user tampering with jwt key in localStorage
	try {
		// try to set the current user on page refresh by getting their local token
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwt)));
	} catch(err) {
		// forcibly log user out if token is modified
		store.dispatch(setCurrentUser({}));
	}
}

const App = () => (
	// always wrap application within BrowserRouter component to enable routing
	// and always wrap BrowserRouter within Provider component to enable Redux state management
	<Provider store={store}>
		<Router>
			<div >
				<Sidebar />
				<div class="page">
			<Navbar/>
			<Main/>
				</div>
				</div>
		</Router>
	</Provider>
)

export default App;
