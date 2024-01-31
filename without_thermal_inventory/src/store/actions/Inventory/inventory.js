import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_INVENTORY } from '../../actionTypes';



export const loadInventory = inventory => ({
    type: LOAD_INVENTORY,
    inventory
});

export const fetchInventory = props => {
    return dispatch => {
        return apiCall('get', `item/inventory/list?page_no=${props.match.params.id}&limit=7`)
            .then((res) => {
                console.log(res)
                localStorage.setItem(
                    "number_of_pages",
                    res.data.data.items[0].numberOfPages
                );
                dispatch(loadInventory(res.data.data.items[0].items, res.data.data.items[0].numberOfPages));
                // dispatch(loadInventory(res.data.data.items));
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