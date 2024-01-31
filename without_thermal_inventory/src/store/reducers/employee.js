import {LOAD_EMPLOYEE} from '../actionTypes';

const employee = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case LOAD_EMPLOYEE:
			return [...action.employee];
		default:
			return state;
	}
};

export default employee;