import rootReducer from './reducers';		// same as './reducers/index'
import { createStore, applyMiddleware, compose } from 'redux';	// compose allows functions to be combined, applyMiddleware helps, well, apply middleware (ie redux-thunk)
import thunk from 'redux-thunk';

// creates store that is passed into App.js

export function configureStore() {
	// store always takes a reducer as first parameter
	const store = createStore(rootReducer,
		compose(
			applyMiddleware(thunk),
			//window.devToolsExtension ? window.devToolsExtension() : f => f		// allows redux devtools
		)
	);
	return store;
}