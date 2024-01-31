import React, { Component } from "react";
import "./user.css";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchusers } from "../../../store/actions/Users/users";
import { apiCall } from "../../../services/api";
import axios from "axios";
export class Viewuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_no_count: "",
      limit: 4,
      click: 0,
      name: "",
      email: "",
      mobile: "",
      emailverified: ""
    };
    this.handleClick = this.handleClick.bind(this);
    // this.detailCheck = this.detailCheck.bind(this);
  }
  handleClick() {
    this.props.fetchusers(this.props);
  }
  componentDidMount() {
    this.handleClick();
    // localStorage.setItem("new_page_count", this.state.page_no_count);
    // localStorage.setItem("new_limit", this.state.limit);
  }

  prevhandler() {
    let dataskip = --this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    let no_pages = this.props.match.params.id;
    console.log("no-pages", no_pages);
    this.props.history.push(`/Viewuser/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
  }
  nexthandler() {
    let dataskip = ++this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    console.log(this.props.match.params.id);
    this.state.page_no_count = this.props.match.params.id;
    console.log("no-pages", this.state.page_no_count);
    // this.history.push(`${API_URL}/area/view/${dataskip}`)
    this.props.history.push(`/Viewuser/${this.props.match.params.id}`);
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
  }

  render() {
    let prevbtndipsplay;
    let nextbtndisplay;
    // let page_count = localStorage.getItem('new_page_count');
    // let final_page_count = localStorage.getItem('number_of_pages')
    // console.log('page_count',page_count)
    // console.log('no_page',final_page_count)
    const { users } = this.props;
    // const { jobdetail } = this.props;

    //next btn logic
    if (
      this.props.match.params.id === localStorage.getItem("number_of_pages")
    ) {
      nextbtndisplay = (
        <div>
          <button type="button" className="btn btn-info" disabled>
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      );
    } else {
      nextbtndisplay = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.nexthandler.bind(this)}
          >
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      );
    }
    //prev bt logic
    if (+this.props.match.params.id === 1) {
      prevbtndipsplay = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            // onClick={this.prevpagehandler.bind(this)}
            disabled
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
          </button>
        </div>
      );
    } else {
      prevbtndipsplay = (
        <div>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.prevhandler.bind(this)}
          >
            <i className="fa fa-chevron-left" aria-hidden="true" />
          </button>
        </div>
      );
    }
    return (
      <div>
        <div class="breadcrumb-holder">
          <div class="container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li class="breadcrumb-item active">Tables </li>
            </ul>
          </div>
        </div>
        <br />
        <div className="card">
          <div class="card-body">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <hr />
              </div>
              {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Link to="#">
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    Add User
                  </button>
                </Link>
              </div> */}

             
            </div>
            <br />
            <div>
              <table className="table table-bordered table-responsive-md table-responsive-sm">
                <thead>
                  <tr>
                    <th scope="col ">Name</th>
                    <th scope="col ">Email</th>
                    <th scope="col ">Mobile</th>
                    <th scope="col">Is Email Verified</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users ? (
                    users.map(function(item, id) {
                      return (
                        <tr key={id}>
                          <th scope="row">{item.name || "NO DATA"}</th>
                          <th scope="row">{item.email || "NO DATA"}</th>
                          <th scope="row">{item.mobile || "NO DATA"}</th>
                          <th scope="row">{item.isEmailVerified || "NO DATA"}</th>
                          <td>
                            {/* <Link to={`/EditEmploye/${item.employe_id}`}> */}
                            {/* <NavLink to ={'/Editjob'}> */}
                            <span
                              class="tooltip-toggle"
                              aria-label="Edit"
                              tabindex="0"
                            >
                              <button
                                className="btn btn-warning custom-edit-btn btn-sm"
                                disabled
                                // onClick={this.editfunc.bind(this, item)}
                              >
                                <i class="fa fa-pencil" aria-hidden="true" />
                              </button>
                            </span>
                            {/* </NavLink> */}

                            <span
                              class="tooltip-toggle"
                              aria-label="Suspend"
                              tabindex="0"
                            >
                              <button
                                className="btn btn-danger custom-edit-btn btn-sm"
                                // onClick={this.deletehandler.bind(this, item)}
                                disabled
                              >
                                <i class="fa fa-trash-o" aria-hidden="true" />
                              </button>
                            </span>
                            <span
                              class="tooltip-toggle"
                              aria-label="Details"
                              tabindex="0"
                            >
                              <button
                                className="btn btn-success custom-edit-btn btn-sm"
                                // onClick={this.detailCheck.bind(this, item)}
                                data-toggle="modal"
                                data-target="#exampleModal"
                                disabled
                              >
                                <i class="fa fa-eye" aria-hidden="true" />
                              </button>
                            </span>
                          </td>
                        </tr>
                      );
                    }, this)
                  ) : (
                    <span>Data is loading....</span>
                  )}
                </tbody>
              </table>
              <div className="row">
                <div className="col-lg-3 offset-lg-3 offset-md-3 col-md-3 col-sm-12 col-xs-12 text-center">
                  {prevbtndipsplay}
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
                  {nextbtndisplay}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  {/*modal*/}

                  {/* <div
                      //   class="modal fade bd-example-modal-lg"
                      //   tabindex="-1"
                      //   role="dialog"
                      //   aria-labelledby="myLargeModalLabel"
                      //   aria-hidden="true"
                      // >
                      //   <div class="modal-dialog modal-lg">
                      //     <div class="modal-content">
                      //       <table className="table table-bordered">
                      //         <thead>
                      //           <tr>
                      //             <th scope="col ">Title</th>
                      //             <th scope="col ">Categories</th>
                      //             <th scope="col ">Type</th>
                      //             <th scope="col">Description</th>
                      //           </tr>
                      //         </thead>
                      //         <tbody>
                      //           {jobdetail ? (
                      //             jobdetail.map(function(item, id) {
                      //               return (
                      //                 <tr key={id}>
                      //                   <th scope="row">
                      //                     {item.jobTitle || "NO DATA"}
                      //                   </th>
                      //                   <th scope="row">
                      //                     {item.jobCategories || "NO DATA"}
                      //                   </th>
                      //                   <th scope="row">
                      //                     {item.jobType || "NO DATA"}
                      //                   </th>
                      //                   <td>
                                        
                      //                     <span
                      //                       class="tooltip-toggle"
                      //                       aria-label="Edit"
                      //                       tabindex="0"
                      //                     >
                      //                       <button className="btn btn-warning custom-edit-btn btn-sm">
                      //                         <i
                      //                           class="fa fa-pencil"
                      //                           aria-hidden="true"
                      //                         />
                      //                       </button>
                      //                     </span>
                                      
                      //                     <span
                      //                       class="tooltip-toggle"
                      //                       aria-label="Suspend"
                      //                       tabindex="0"
                      //                     >
                      //                       <button
                      //                         className="btn btn-danger custom-edit-btn btn-sm"
                                             
                      //                       >
                      //                         <i
                      //                           class="fa fa-trash-o"
                      //                           aria-hidden="true"
                      //                         />
                      //                       </button>
                      //                     </span>
                      //                     <span
                      //                       class="tooltip-toggle"
                      //                       aria-label="Details"
                      //                       tabindex="0"
                      //                     >
                      //                       <button
                      //                         className="btn btn-success custom-edit-btn btn-sm"
                      //                         onClick={this.detailCheck.bind(
                      //                           this,
                      //                           item
                      //                         )}
                      //                         data-toggle="modal"
                      //                         data-target=".bd-example-modal-lg"
                      //                       >
                      //                         <i
                      //                           class="fa fa-eye"
                      //                           aria-hidden="true"
                      //                         />
                      //                       </button>
                      //                     </span>
                      //                   </td>
                      //                 </tr>
                      //               );
                      //             }, this)
                      //           ) : (
                      //             <span>Data is loading....</span>
                      //           )}
                      //         </tbody>
                      //       </table>
                      //     </div>
                      //   </div>
                      // </div>
                      {/*end modal*/}
                  {/* <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <table className="table table-bordered table-responsive">
                                <thead>
                                  <tr>
                                    <th scope="col ">Title</th>
                                    <th scope="col ">Categories</th>
                                    <th scope="col ">Type</th>
                                    <th scope="col">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      {this.state.jobtitle || "NO DATA"}
                                    </th>
                                    <th scope="row">
                                      {this.state.jobcategories || "NO DATA"}
                                    </th>
                                    <th scope="row">
                                      {this.state.jobtype || "NO DATA"}
                                    </th>
                                    <td>{this.state.jobdesc || "NO DATA"}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    users: state.users,
    currentUser: state.currentUser.user.id // we only need the current user's id, to check against the user id of each message
  };
}

export default connect(
  mapStateToProps,
  { fetchusers }
)(Viewuser);
