import {LOAD_INVOICE} from '../actionTypes';

const invoice = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case LOAD_INVOICE:
			return [...action.invoice];
		default:
			return state;
	}
};

export default invoice;