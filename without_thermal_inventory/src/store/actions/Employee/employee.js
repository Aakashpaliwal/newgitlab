import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_EMPLOYEE } from '../../actionTypes';



export const loadEmployee = employee => ({
	type: LOAD_EMPLOYEE,
	employee
});

export const fetchEmployee = () => {
	return dispatch => {
		return apiCall('get', 'employee/list/all?page_no=1&limit=10')
            .then((res) => {
                console.log(res.data.data.items[0].employeeList)
				dispatch(loadEmployee(res.data.data.items[0].employeeList));
			})
			.catch((err) => {
				console.log(err.message)
				dispatch(addError(err.message));
			});
	};
};

export const postNewEmployee = text => (dispatch, getState) => {
    console.log(text);
	//let { currentUser } = getState();
	//const id = currentUser.user.id;			// get id so we know who is posting a message
	// send message to db, from correct user
	return apiCall('post', `employee/register/user`,  text )
		.then(res =>
			res 
			// {
			// alert("Employee has been is Added") }
		)	
		.catch(err => dispatch(addError(err)));
}