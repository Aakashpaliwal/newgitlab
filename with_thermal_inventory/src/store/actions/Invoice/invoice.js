import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_INVOICE } from '../../actionTypes';



export const loadInvoice = invoice => ({
    type: LOAD_INVOICE,
    invoice
});

export const fetchInvoice = props => {
    return dispatch => {
        return apiCall('get', `billing/list?page_no=${props.match.params.id}&limit=7`)
            .then((res) => {
                console.log('billingres',res.data.data.items)
                localStorage.setItem(
                    "number_of_pages",
                    res.data.data.items[0].numberOfPages
                );
                dispatch(loadInvoice(res.data.data.items[0].bills, res.data.data.items[0].numberOfPages));
            })
            .catch((err) => {
                dispatch(addError(err.message));
            });
    };
};

export const postNewInvoice = text => (dispatch, getState) => {
    // console.log("data",text);
    //let { currentUser } = getState();
    //const id = currentUser.user.id;			// get id so we know who is posting a message
    // send message to db, from correct user
    return apiCall('post', `billing/add`, text)
        .then(res => { 
            console.log("response",res)
        alert("Bill has been is Added") 
        return res;
    })
        .catch(err => {
            console.log("err",err)
            return err;
        });
}