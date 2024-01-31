import { apiCall } from '../../../services/api';
import { addError } from '../errors';
import { LOAD_INVENTORY } from '../../actionTypes';



export const loadInventory = inventory => ({
    type: LOAD_INVENTORY,
    inventory
});

export const fetchInventory = props => {
    return dispatch => {
        return apiCall('get', `item/inventory/list?limit=7&page_no=${props.match.params.id}`)
            .then((res) => {
                console.log(res.data.data.items[0].items)
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

export const postNewInventory = text => (dispatch, getState) => {
    return apiCall('put', `item/add_items`, text)
        .then(res =>
            res 
            // {
            // alert("Employee has been is Added") }
        )    
        .catch(err => dispatch(addError(err)));
}