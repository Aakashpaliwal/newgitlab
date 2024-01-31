import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_VENDORS } from '../../actionTypes';



export const loadVendors= vendors => ({
	type: LOAD_VENDORS,
	vendors
});

export const fetchVendors = props => {
	return dispatch => {
		return apiCall('get', `vendor/list?page_no=${props.match.params.id}&limit=10`)
			.then((res) => {
				console.log('vendors here',res)
				localStorage.setItem(
					"number_of_pages",
					res.data.data.items[0].numberOfPages
				);
				dispatch(loadVendors(res.data.data.items[0].vendors, res.data.data.items[0].numberOfPages));
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};

export const fetchTotalVendors = props => {
	return dispatch => {
		return apiCall('get', `vendor/list?page_no=1&limit=100`)
			.then((res) => {
				console.log('fetchvendors',res.data.data.items[0].vendors)
				
				// localStorage.setItem(
				// 	"number_of_pages",
				// 	res.data.data.items[0].numberOfPages
				// );
				dispatch(loadVendors(res.data.data.items[0].vendors));
			
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};


export const postNewVendors = text => (dispatch, getState) => {
	console.log(text);
	//let { currentUser } = getState();
	//const id = currentUser.user.id;			// get id so we know who is posting a message
	// send message to db, from correct user
	return apiCall('post', `vendor/add`, text)
		.then(res => 
			// { 
			// alert("Product has been is Added")
			// console.log(res),
			res
		//  }
		)
		.catch(err => dispatch(err));
}