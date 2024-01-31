import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_HOME_PRODUCT } from '../../actionTypes';



export const loadHomeProduct = homeproduct => ({
	type: LOAD_HOME_PRODUCT,
	homeproduct
});

export const fetchHomeProduct = props => {
	return dispatch => {
		return apiCall('get', `item/list?page_no=1&limit=100`)
			.then((res) => {
				console.log('home_product',res.data.data.items[0].items)
				// localStorage.setItem(
				// 	"number_of_pages",
				// 	res.data.data.items[0].numberOfPages
				// );
                dispatch(loadHomeProduct(res.data.data.items[0].items
                    //  res.data.data.items[0].numberOfPages
                    ));
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};

