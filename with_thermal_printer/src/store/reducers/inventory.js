import {LOAD_INVENTORY} from '../actionTypes';

const inventory = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case LOAD_INVENTORY:
			return [...action.inventory];
		default:
			return state;
	}
};

export default inventory;