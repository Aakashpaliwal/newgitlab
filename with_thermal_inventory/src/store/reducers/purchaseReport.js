import { LOAD_PURCHASE_REPORT } from '../actionTypes';

const purchaseReport = (state = [], action) => {
    // console.log("action"+action);
    switch (action.type) {
        case LOAD_PURCHASE_REPORT:
            return [...action.purchaseReport];
        default:
            return state;
    }
};

export default purchaseReport;