import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
// import region from "./region";
// import area from "./area";
import employee from "./employee";
// import job from "./job";
// import jobdetail from "./jobdetail";
// import jobtype from "./jobtype";
// import category from "./category";
// import syllabus from "./syllabus";
// import result from "./result";
import users from './users'
import product from './product'
import productdetail from './productdetail'
import invoice from './invoice'
import inventory from './inventory'
import order from './order'
import homeproduct from './homeproduct'
import purchase from './purchase'
// import totaltodayorder from './todayorder';
// import totalorder from './totalorder';
// reducers are bundled into index to form rootReducer

// rootReducer is built by combining our reducers
const rootReducer = combineReducers({
  currentUser,
  errors,
  // messages,
  // region,
  // area,
  employee,
  // job,
  // jobdetail,
  // category,
  // syllabus,
  // result,
  // jobtype,
  users,
  product,
  homeproduct,
  productdetail,
  invoice,
  inventory,
  order,
  purchase
  // totaltodayorder,
  // totalorder
});

export default rootReducer;
