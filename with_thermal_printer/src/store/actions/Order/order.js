import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_ORDER } from '../../actionTypes';



export const loadOrder = order => ({
    type: LOAD_ORDER,
    order
});

export const fetchOrder = props => {
    return dispatch => {
        return apiCall('get', `billing/list?page_no=1&limit=10`)
            .then((res) => {
                // console.log('billing data',res)
                localStorage.setItem(
                    "number_of_pages_order",
                    res.data.data.items[0].numberOfPages
                );
                dispatch(loadOrder(res.data.data.items[0].bills, res.data.data.items[0].numberOfPages));
            })
            .catch((err) => {
                dispatch(addError(err.message));
            });
    };
};

// export const postNewInvoice = text => (dispatch, getState) => {
//     // console.log("data",text);
//     //let { currentUser } = getState();
//     //const id = currentUser.user.id;			// get id so we know who is posting a message
//     // send message to db, from correct user
//     return apiCall('post', `billing/add`, text)
//         .then(res => { 
//             console.log("response",res)
//         alert("Bill has been is Added") 
//         return res;
//     })
//         .catch(err => {
//             console.log("err",err)
//             return err;
//         });
// }