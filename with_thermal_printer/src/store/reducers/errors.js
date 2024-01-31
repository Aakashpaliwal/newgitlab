import { ADD_ERROR, REMOVE_ERROR } from '../actionTypes';

// creates generic error reducer, adds/removes error messages

// default export is a function with no initial error message (initial state is simple so we do it inline)
export default (state = { message: null }, action) => {
	// clone state to avoid changing directly
	let stateClone = state;
	switch (action.type) {
		case ADD_ERROR:
			return { ...stateClone, message: action.error };
		case REMOVE_ERROR:
			return { ...stateClone, message: null };
		default:
			return stateClone;
	}
};