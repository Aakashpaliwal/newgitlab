import {LOAD_TOTAL_TODAY_ORDER} from '../actionTypes';

const totaltodayorder = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case LOAD_TOTAL_TODAY_ORDER:
			return [...action.totaltodayorder];
		default:
			return state;
	}
};

export default totaltodayorder;