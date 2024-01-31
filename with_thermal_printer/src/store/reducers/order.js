import {LOAD_ORDER} from '../actionTypes';

const order = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case LOAD_ORDER:
			return [...action.order];
		default:
			return state;
	}
};

export default order;