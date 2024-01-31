import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_PRODUCT } from '../../actionTypes';



export const loadProduct = product => ({
	type: LOAD_PRODUCT,
	product
});

export const fetchProduct = props => {
	return dispatch => {
		return apiCall('get', `item/list?page_no=${props.match.params.id}&limit=5`)
			.then((res) => {
				// console.log('prod here',res)
				localStorage.setItem(
					"number_of_pages",
					res.data.data.items[0].numberOfPages
				);
				dispatch(loadProduct(res.data.data.items[0].items, res.data.data.items[0].numberOfPages));
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};
export const fetchTotalProduct = props => {
	return dispatch => {
		return apiCall('get', `item/list?page_no=1&limit=100`)
			.then((res) => {
				// console.log(res.data.data.items)
				localStorage.setItem(
					"number_of_pages",
					res.data.data.items[0].numberOfPages
				);
				dispatch(loadProduct(res.data.data.items[0].items, res.data.data.items[0].numberOfPages));
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};



export const postNewProduct = text => (dispatch, getState) => {
	console.log(text);
	//let { currentUser } = getState();
	//const id = currentUser.user.id;			// get id so we know who is posting a message
	// send message to db, from correct user
	return apiCall('post', `item/add`, text)
		.then(res => 
			// { 
			// alert("Product has been is Added")
			// console.log(res),
			res
		//  }
		)
		.catch(err => dispatch(addError(err)));
}