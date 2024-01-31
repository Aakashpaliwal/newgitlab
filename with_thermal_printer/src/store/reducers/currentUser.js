import { SET_CURRENT_USER } from '../actionTypes';

// initialize a default state
const DEFAULT_STATE = {
	isAuthenticated: false,		// should be true when a user is logged in
	user: {}		// will be user information when logged in
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				// if there is 1 or more keys inside of the action's user object, the user is authenticated (otherwise the user object is an empty object, as set in default state)
				isAuthenticated: Object.keys(action.user).length > 0,		// alternative: !!Object.keys(action.user).length
				user: action.user		// gets entire user object from action
			};
		default:
			return state;
	}
}