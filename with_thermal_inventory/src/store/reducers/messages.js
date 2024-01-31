import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';

const message = (state=[], action) => {
	switch(action.type) {
		case LOAD_MESSAGES:
			// return a copy of messages
			return [...action.messages];
		case REMOVE_MESSAGE:
			// .filter() is a pure function,
			// here we only get back messages which don't match the id passed in
			return state.filter(message=>message._id!==action.id);
		default:
			return state;
	}
};

export default message;