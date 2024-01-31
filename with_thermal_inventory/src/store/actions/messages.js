import { apiCall } from '../../services/api';		// use to get messages from db
import { addError } from './errors';		// in case anything goes wrong
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

// action creators

export const loadMessages = messages => ({
	type: LOAD_MESSAGES,
	messages
});

export const remove = id => ({
	type: REMOVE_MESSAGE,
	id
});

//thunk
export const removeMessage = (user_id, message_id) => {
	return dispatch => {
		return apiCall('delete', `/api/users/${user_id}/messages/${message_id}`)	// delete from db
			.then(()=>dispatch(remove(message_id)))			// delete from redux state
			.catch(err=>dispatch(addError(err.message)));
	}
}

// thunk
export const fetchMessages = () => {
	// dispatch an api call, then dispatch loadMessages, passing in the response
	return dispatch => {
		return apiCall('get', '/api/messages')
			.then((res) => {
				dispatch(loadMessages(res));
			})
			// if anything goes wrong, add the error
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};

//thunk
export const postNewMessage = text => (dispatch, getState) => {
	let { currentUser } = getState();
	const id = currentUser.user.id;			// get id so we know who is posting a message
	// send message to db, from correct user
	return apiCall('post', `/api/users/${id}/messages`, { text })
		// return an object on response
		.then(res => { })	// the response data not super important here (loadMessages runs after a post to get all messages, including the new one)
		// make sure to dispatch the created action from addError
		.catch(err => dispatch(addError(err.message)));
}