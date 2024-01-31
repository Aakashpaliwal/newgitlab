import { apiCall } from "../../../services/api";
import { addError } from "../errors";
import { LOAD_PRODUCT_DETAIL } from "../../actionTypes";

export const loadProductDetail = productdetail => ({
  type: LOAD_PRODUCT_DETAIL,
  productdetail
});

export const fetchProductDetail = () => {
  return dispatch => {
    return apiCall(
      "get",
      `item/update/${localStorage.getItem('id')}`
    )
      .then(res => {
        console.log(res)
        // console.log(res.data.data.items[0][0]);

        // dispatch(
        //   loadJobDetail(
        //     res.data.data.items[0][0]
        //   )
        // );
      })
      .catch(errors => {
        dispatch(addError(errors));
      });
  };
};
