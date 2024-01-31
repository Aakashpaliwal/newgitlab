import React, { Component } from 'react'
import './Employee.css'
import { connect } from 'react-redux';
import { postNewEmployee } from '../../../store/actions/Employee/employee';
import { Whatsapp } from '../../Home/Whatsapp';
import SimpleReactValidator from "simple-react-validator";
class Employee extends Component {
  constructor(props) {
    super(props);
    // React state
    this.state = {
      employee_id: "",
      name: "",
      role_id: "",
      gender: "",
      email: "",
      number: "",
      password: ""

    };
    this.validator = new SimpleReactValidator();
  }

  // by using arrow functions, we retain value of 'this', and don't need to bind 'this' in the constructor
  handleChange = e => {
    this.setState({
      // get computed property name and set its matching value
      // (works only if the name matches what's in state! but is a nice way to generalize form changes on different types of inputs)
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      let body = {

        ui_name: this.state.name,
        ui_role: this.state.role_id,
        ui_email: this.state.email,
        ui_mobile: this.state.number,
        ui_password: this.state.password,
        ui_gender: this.state.gender,
        ui_company_code: "FSJARS"
      };
      console.log('value here', body)
      const res = await this.props.postNewEmployee(body);
      console.log('upper response', res)
      if (res.status === 200) {
        // console.log('200res', res)
        alert(res.data.data.description);
        this.props.history.push('/ViewEmployee');
      }
      else {
        // console.log('error res',res.error)
        if (res.error.status === 422) {
          alert('failure - ' + res.error.data.errors[0].message)
          // console.log(
          //  'error response',res.error.data.errors[0].message
          // )
          // this.state.ui_name = this.state.ui_name
          // this.setState({
          //   ui_name : this.state.ui_name
          // })
          // return false
          // window.stop();
          // console.log(res.error.data.errors[0])
        }
        if(res.error.status === 400)
        {
          // console.log('employeerrro', res.error.data.message)
          alert(res.error.data.message)
        }
      }

      // this.props.history.push('/viewEmployee');
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };
  render() {
    return (
      <div>
        <div class="breadcrumb-holder">
          <div class="container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Forms </li>
            </ul>
          </div>
        </div>
        <br />
        <section class="forms">
          <div class="container">
            <div className="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header d-flex align-items-center">
                    <h4>Add Employee</h4>
                  </div>
                  <div class="card-body">
                    <p>Fill below details to add employee.</p>
                    <form className="custom-content-form">
                      <div className="form-row">

                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Name
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="name"
                                value={this.state.name}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "Employee Name",
                                  this.state.name,
                                  "required|min:3|max:50"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputSubcategory"
                              className="col-sm-3 col-form-label"
                            >
                              Role
                        </label>
                            <div class="col-sm-9">
                              <select
                                className="form-control"
                                value={this.state.role_id}
                                name="role_id"
                                onChange={e => this.handleChange(e)}
                              >
                                <option value="">Choose...</option>
                                <option value="Admin">ADMIN</option>
                                <option value="Accountant">ACCOUNTANT</option>
                                {/* <option value="3">Role 3</option> */}
                              </select>
                              <span className="text-danger">
                                {this.validator.message(
                                  "Role",
                                  this.state.role_id,
                                  "required"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputSubcategory"
                              className="col-sm-3 col-form-label"
                            >
                              Gender
                        </label>
                            <div class="col-sm-9">
                              <select
                                className="form-control"
                                value={this.state.gender}
                                name="gender"
                                onChange={e => this.handleChange(e)}
                              >
                                <option value="">Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                {/* <option value="3">Role 3</option> */}
                              </select>
                              <span className="text-danger">
                                {this.validator.message(
                                  "Gender",
                                  this.state.gender,
                                  "required"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Contact Number
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="number"
                                value={this.state.number}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "Contact Number",
                                  this.state.number,
                                  "required|min:10|max:10"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <section class="forms">
          <div class="container">
            <div className="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header d-flex align-items-center">
                    <h4>Login Details</h4>
                  </div>
                  <div class="card-body">
                    <p>It's Mandatory Fields. Please Remember Email and Password</p>
                    <form className="custom-content-form">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Email ID
                    </label>
                        <div class="col-sm-10">
                          <input
                            type="email"
                            className="form-control"
                            value={this.state.email}
                            name="email"
                            onChange={e => this.handleChange(e)}
                          />
                          <span className="text-danger">
                            {this.validator.message(
                              "Employee Email",
                              this.state.email,
                              "required|email"
                            )}
                          </span>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Password
                    </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.password}
                            name="password"
                            onChange={e => this.handleChange(e)}
                          />
                          <span className="text-danger">
                            {this.validator.message(
                              "Password",
                              this.state.password,
                              "required|min:8"
                            )}
                          </span>

                        </div>
                      </div>
                      <small>* This Fields are Mandatory . </small>
                      <br />
                      <button
                        class="btn btn-primary"
                        onClick={this.handleSubmit.bind(this)}
                      >
                        Submit
                  </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Whatsapp />
              </div>
            </div>
          </div>
        </section>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewEmployee })(Employee);

