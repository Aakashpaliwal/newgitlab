import { LOAD_PURCHASE } from '../actionTypes';

const purchase = (state = [], action) => {
    // console.log("action"+action);
    switch (action.type) {
        case LOAD_PURCHASE:
            return [...action.purchase];
        default:
            return state;
    }
};

export default purchase;