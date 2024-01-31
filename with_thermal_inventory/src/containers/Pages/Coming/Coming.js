import React, { Component } from 'react'
import "./coming.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEmployee } from "../../../store/actions/Employee/employee";
export class Coming extends Component {
    // componentDidMount() {
    //     this.props.fetchEmployee();
    // }
    // componentDidUpdate() {
    //     this.props.fetchEmployee();
    // }

    render() {
        const { employee } = this.props;
        return (
            <div>
                <div class="breadcrumb-holder">
                    <div class="container-fluid">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li class="breadcrumb-item active">Coming Soon </li>
                        </ul>
                    </div>
                </div>
                <br />
                <div className="card">
                    <div class="card-body">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="text-center">Coming Soon!!!</h2>
                            </div>
                        </div>
                        {/* <div className="row">
                  <div className="offset-md-1 col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                    <Link to={process.env.PUBLIC_URL + "/Employee"}>
                      <button class="btn btn-info">User</button>
                    </Link>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                    <Link to={process.env.PUBLIC_URL + "/ComingSoon"}>
                      <button class="btn btn-info" disabled>
                        Allocate Region
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                    <Link to={process.env.PUBLIC_URL + "/ComingSoon"}>
                      <button class="btn btn-info" disabled>
                        Allocate Area
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                    <Link to={process.env.PUBLIC_URL + "/ComingSoon"}>
                      <button class="btn btn-info" disabled>
                        Allocate Plant
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                    <Link to={process.env.PUBLIC_URL + "/ComingSoon"}>
                      <button class="btn btn-info" disabled>
                        List Of Users
                      </button>
                    </Link>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <hr />
                  </div>
                </div> */}
                        {/* <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <hr />
                    <Link to="/Employee">
                      <button
                        className="btn btn-primary"
                        style={{ float: "right" }}
                      >
                        Add Employee
                      </button>
                    </Link>
                  </div>
                </div>
                <br />
                <div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee ? (
                        employee.map(function(item, id) {
                          return (
                            <tr key={id}>
                              <th scope="row">{item.name || "NO DATA"}</th>
                              <th scope="row">{item.role_id===1?"ADMIN":"EMLOYEE" || "NO DATA"}</th>
                              <th scope="row">{item.email_id || "NO DATA"}</th>
                              <th scope="row">{item.contact_number || "NO DATA"}</th>
                            </tr>
                          );
                        }, this)
                      ) : (
                        <span>Data is loading....</span>
                      )}
                    </tbody>
                  </table>
                </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        employee: state.employee,
        currentUser: state.currentUser.user.id // we only need the current user's id, to check against the user id of each message
    };
}

export default connect(
    mapStateToProps,
    // { fetchEmployee }
)(Coming);
