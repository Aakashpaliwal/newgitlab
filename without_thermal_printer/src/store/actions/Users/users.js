import { apiCall } from "../../../services/api";
import { addError } from "../errors";
import { USER_LIST } from "../../actionTypes";

export const loadusers = users => ({
  type: USER_LIST,
  users
});

export const fetchusers = props => {
  return dispatch => {
    return apiCall(
      "get",
      `/user/list?page_no=${props.match.params.id}&limit=4`
    )
      .then(res => {
        console.log(res);
        localStorage.setItem(
          "number_of_pages",
          res.data.data.items[0].numberOfPages
        );
        let manual_pages_new = res.data.data.items[0].numberOfPages;
        console.log(manual_pages_new);
        dispatch(
          loadusers(
            res.data.data.items[0].usersList,
            res.data.data.items[0].numberOfPages
          )
        );
      })
      .catch(errors => {
        dispatch(addError(errors));
      });
  };
};

// export const postNewJob = text => (dispatch, getState) => {
//   console.log(text);
//   //let { currentUser } = getState();
//   //const id = currentUser.user.id;			// get id so we know who is posting a message
//   // send message to db, from correct user
//   return apiCall("post", `job/post/add`, text)
//     .then(res => res)
//     .catch(err => {
//       // alert(err);
//       dispatch(addError(err));
//       return err;
//     });
// };
