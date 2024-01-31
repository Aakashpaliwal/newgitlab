import {LOAD_VENDORS} from '../actionTypes';

const vendors = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case LOAD_VENDORS:
			return [...action.vendors];
		default:
			return state;
	}
};

export default vendors;