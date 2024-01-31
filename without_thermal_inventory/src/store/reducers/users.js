import {USER_LIST} from '../actionTypes';

const users = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case USER_LIST:
			return [...action.users];
		default:
			return state;
	}
};

export default users;