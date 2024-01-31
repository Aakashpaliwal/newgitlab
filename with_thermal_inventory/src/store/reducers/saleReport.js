import { LOAD_SALE_REPORT } from '../actionTypes';

const saleReport = (state = [], action) => {
    // console.log("action"+action);
    switch (action.type) {
        case LOAD_SALE_REPORT:
            return [...action.saleReport];
        default:
            return state;
    }
};

export default saleReport;