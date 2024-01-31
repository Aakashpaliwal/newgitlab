import {LOAD_PRODUCT} from '../actionTypes';

const product = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case LOAD_PRODUCT:
			return [...action.product];
		default:
			return state;
	}
};

export default product;