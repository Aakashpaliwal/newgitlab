import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_TOTAL_ORDER } from '../../actionTypes';

export const loadTotalOrder = totalorder => ({
    type: LOAD_TOTAL_ORDER,
    totalorder
});

export const fetchTotalOrder = props => {
    return dispatch => {
        return apiCall('get', `billing/dashboard/today/total/orders`)
            .then((res) => {
                console.log(res)
                localStorage.setItem(
                    "total_order",
                    res.data.data.items[0].totalOrders
                );
                localStorage.setItem(
                    "total_today_amount",
                    res.data.data.items[0].totalAmount
                );
                localStorage.setItem(
                    "total_today_gst",
                    res.data.data.items[0].totalGST
                );
                dispatch(loadTotalOrder(res.data.data.items[0].totalOrders));
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