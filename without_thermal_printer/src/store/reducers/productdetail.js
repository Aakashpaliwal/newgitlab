import {LOAD_PRODUCT_DETAIL} from '../actionTypes';

const productdetail = (state = [], action) => {
	// console.log("action"+action);
	switch(action.type) {
		case LOAD_PRODUCT_DETAIL:
			return [...action.productdetail];
		default:
			return state;
	}
};

export default productdetail;
