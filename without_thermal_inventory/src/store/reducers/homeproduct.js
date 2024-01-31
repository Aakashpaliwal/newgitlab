import {LOAD_HOME_PRODUCT} from '../actionTypes';

const homeproduct = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case LOAD_HOME_PRODUCT:
			return [...action.homeproduct];
		default:
			return state;
	}
};

export default homeproduct;