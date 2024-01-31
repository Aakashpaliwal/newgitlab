import {ADD_ERROR, REMOVE_ERROR} from '../actionTypes';

// simple actionCreators,
// for handling errors and displaying information to end user

// returns an object { type ADD_ERROR, error: error }
export const addError = error => ({
	type: ADD_ERROR,
	error
});

// returns an object { type: REMOVE_ERROR }
export const removeError = () => ({
	type: REMOVE_ERROR
});

// these are used in /store/actions/auth.js to show/remove errors