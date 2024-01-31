import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_TOTAL_TODAY_ORDER } from '../../actionTypes';



export const loadTotalTodayOrder = totaltodayorder => ({
    type: LOAD_TOTAL_TODAY_ORDER,
    totaltodayorder
});

export const fetchTotalTodayOrder = props => {
    return dispatch => {
        return apiCall('get', `billing/dashboard/total/orders`)
            .then((res) => {
                console.log('total_order',res)
                localStorage.setItem(
                    "total_order_all",
                    res.data.data.items[0].totalOrders
                );
                localStorage.setItem(
                    "total_amount_all",
                    res.data.data.items[0].totalAmount
                );
                localStorage.setItem(
                    "total_gst_all",
                    res.data.data.items[0].totalGST
                );
                dispatch(loadTotalTodayOrder(res.data.data.items[0].totalOrders,
                    res.data.data.items[0].totalAmount,
                    res.data.data.items[0].totalGST));
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