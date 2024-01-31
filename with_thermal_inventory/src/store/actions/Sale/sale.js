import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_SALE_REPORT, LOAD_PURCHASE_REPORT } from '../../actionTypes';



export const loadSaleReport = saleReport => ({
	type: LOAD_SALE_REPORT,
	saleReport
});
export const loadPurchaseReport = purchaseReport => ({
	type: LOAD_PURCHASE_REPORT,
	purchaseReport
});

export const fetchPurchaseReport = props => {
    let date= new Date();
    let prev=new Date();;
    prev.setMonth(prev.getMonth()-1);
    // console.log("date",date.toISOString().split('T')[0]);
    // console.log("prev",prev.toISOString().split('T')[0]);
	return dispatch => {
		return apiCall('get', `vendor/purchase/list?from=${prev.toISOString().split('T')[0]}&to=${date.toISOString().split('T')[0]}&limit=100&page_no=${props.match.params.id}`)
            .then((res) => {
				console.log(res.data.data.items[0].list)
				// localStorage.setItem(
				// 	"number_of_pages",
				// 	res.data.data.items[0].numberOfPages
				// );
				dispatch(loadPurchaseReport(res.data.data.items[0].list));
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};
export const fetchSaleReport = props => {
    let date= new Date();
    let prev=new Date();;
    prev.setMonth(prev.getMonth()-1);
    // console.log("date",date.toISOString().split('T')[0]);
    // console.log("prev",prev.toISOString().split('T')[0]);
	return dispatch => {
		return apiCall('get', `item/sale/list?from=${prev.toISOString().split('T')[0]}&to=${date.toISOString().split('T')[0]}&limit=100&page_no=${props.match.params.id}`)
            .then((res) => {
				console.log(res.data.data.items[0].items)
				// localStorage.setItem(
				// 	"number_of_pages",
				// 	res.data.data.items[0].numberOfPages
				// );
				dispatch(loadSaleReport(res.data.data.items[0].items));
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};

