import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_PURCHASE } from '../../actionTypes';



export const loadPurchase = purchase => ({
	type: LOAD_PURCHASE,
	purchase
});

export const fetchPurchase = props => {
	return dispatch => {
		return apiCall('get', `purchase/list?page_no=${props.match.params.id}&limit=5`)
            .then((res) => {
				console.log(res.data.data.items[0].purchases , 	res.data.data.items[0].numberOfPages)
				localStorage.setItem(
					"number_of_pages",
					res.data.data.items[0].numberOfPages
				);
				dispatch(loadPurchase(res.data.data.items[0].purchases));
			})
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};

export const postNewPurchase = text => (dispatch, getState) => {
    console.log(text);
	//let { currentUser } = getState();
	//const id = currentUser.user.id;			// get id so we know who is posting a message
	// send message to db, from correct user
	return apiCall('post', `purchase/add`,  text )
		.then(res => {alert("New Purchase Item has been is Added") })	
		.catch(err => dispatch(addError(err)));
}