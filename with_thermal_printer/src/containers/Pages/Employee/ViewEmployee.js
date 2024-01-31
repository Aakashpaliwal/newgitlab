import React, { Component } from "react";
import "./Employee.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEmployee } from "../../../store/actions/Employee/employee";
import { Whatsapp } from "../../Home/Whatsapp";
export class ViewEmployee extends Component {
  componentDidMount() {
    this.props.fetchEmployee(this.props);
  }
  // componentDidUpdate() {
  //   this.props.fetchEmployee();
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
              <li class="breadcrumb-item active">View Employee </li>
            </ul>
          </div>
        </div>
        <br />
        <div className="card">
          <div class="card-body">
            <div className="row">
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
              <table className="table table-bordered table-responsive-sm table-responsive-md">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {employee.length ? (
                    employee.map(function(item, id) {
                      return (
                        <tr key={id}>
                          <td scope="row">{item.empName || "NO DATA"}</td>
                          {/* <td scope="row">{item.role_id===1?"ADMIN":"EMLOYEE" || "NO DATA"}</td> */}
                          <td scope="col">{item.empRole || "NO DATA"}</td>
                          <td scope="row">{item.empEmail || "NO DATA"}</td>
                          <td scope="row">{item.empMobile || "NO DATA"}</td>
                        </tr>
                      );
                    }, this)
                  ) : (
                  <tr>
                  <td colSpan="4">
                    <span><div className="loading"></div></span>
                    </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-12">
                <Whatsapp />
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
    employee: state.employee,
    currentUser: state.currentUser.user.id // we only need the current user's id, to check against the user id of each message
  };
}

export default connect(mapStateToProps, { fetchEmployee })(ViewEmployee);
