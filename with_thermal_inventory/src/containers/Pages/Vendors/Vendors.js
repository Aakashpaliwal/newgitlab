import React, { Component } from 'react'
import './vendors.css'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { postNewVendors } from '../../../store/actions/Vendors/vendors';
import { Whatsapp } from '../../Home/Whatsapp';
import SimpleReactValidator from "simple-react-validator";
export class Vendors extends Component {
    constructor(props) {
        super(props);
        // React state
        this.state = {
          
          ui_vendor_name: "",
          ui_vendor_email: "",
          ui_vendor_mobile: "",
          ui_vendor_gstin : ''
    
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
    
            ui_vendor_name: this.state.ui_vendor_name,
          
            ui_vendor_email: this.state.ui_vendor_email,
            ui_vendor_mobile: this.state.ui_vendor_mobile,
           ui_vendor_gstin : this.state.ui_vendor_gstin,
            // ui_company_code: "FSJARS"
          };
          console.log('value here', this.state)
          const res = await this.props.postNewVendors(body);
          console.log('upper response', res)
          if (res.status === 200) {
            // console.log('200res', res)
            alert(res.data.data.description);
            this.props.history.push('/Viewvendors/1');
          }
        //   else {
        //     // console.log('error res',res.error)
        //     if (res.error.status === 422) {
        //       alert('failure - ' + res.error.data.errors[0].message)
        //       // console.log(
        //       //  'error response',res.error.data.errors[0].message
        //       // )
        //       // this.state.ui_name = this.state.ui_name
        //       // this.setState({
        //       //   ui_name : this.state.ui_name
        //       // })
        //       // return false
        //       // window.stop();
        //       // console.log(res.error.data.errors[0])
        //     }
        //     if (res.error.status === 400) {
        //       // console.log('employeerrro', res.error.data.message)
        //       alert(res.error.data.message)
        //     }
        //   }
    
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
                      <Link to="/">Home</Link>
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
                          <h4>Add Vendors</h4>
                        </div>
                        <div class="card-body">
                          <p>* This Fields are Mendatory.</p>
                          <form className="custom-content-form" id="needs-validation" novalidate >
                            <div className="form-row">
                              <div class="field form-group col-md-6 custom-product-field">
                              <span className="text-danger">
                                  {this.validator.message(
                                    "vendor Name",
                                    this.state.ui_vendor_name,
                                    "required|min:3|max:100"
                                  )}
                                </span>
                                <label for="inp" class="inp inp_position_top_9" >
                                  <input type="text" id="inp" placeholder="&nbsp;"  name="ui_vendor_name" value={this.state.ui_vendor_name} onChange={e => this.handleChange(e)}/>
                                  <span class="label">Vendor's Name *</span>
                                  <span class="border"></span>
                                  <small>(E.g : John doe)</small>
                                </label>
                                {/* <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} id="fullname" placeholder="Jane Appleseed" />
      
                                <label for="fullname">Employee Name</label>
                                <p className="text-danger">
                                  {this.validator.message(
                                    "Employee Name",
                                    this.state.name,
                                    "required|min:3|max:100"
                                  )}
                                </p> */}
      
                              </div>
      
      
      
      
      
                              <div class="field form-group col-md-6 custom-product-field">
      
                              <span className="text-danger">
                                  {this.validator.message(
                                    "Phone number",
                                    this.state.ui_vendor_mobile,
                                    "required|min:10|max:10"
                                  )}
                                </span>
                                <label for="phone" class="inp inp_position_top_9" >
                                  <input type="number" id="phone" placeholder="&nbsp;" name="ui_vendor_mobile" value={this.state.ui_vendor_mobile} onChange={e => this.handleChange(e)}/>
                                  <span class="label">Phone Number *</span>
                                  <span class="border"></span>
                                  <small>(E.g : 8765058574)</small>
                                </label>
      
      
                              </div>
      
                              <div class="field form-group col-md-6 custom-product-field">
      
                              <span className="text-danger">
                                  {this.validator.message(
                                    "gstin",
                                    this.state.ui_vendor_gstin,
                                    "required"
                                  )}
                                </span>
                                <label for="gstin" class="inp inp_position_top_9" >
                                  <input type="text" id="gstin" placeholder="&nbsp;" name="ui_vendor_gstin" value={this.state.ui_vendor_gstin} onChange={e => this.handleChange(e)}/>
                                  <span class="label">GSTIN *</span>
                                  <span class="border"></span>
                                  <small>(E.g : 23BABPG5109C1ZJ)</small>
                                </label>
                              </div>
                              <div class="field form-group col-md-6 custom-product-field">
                              <span className="text-danger">
                                  {this.validator.message(
                                    "email",
                                    this.state.ui_vendor_email,
                                    "required|email"
                                  )}
                                </span>
                                <label for="email" class="inp inp_position_top_9" >
                                  <input type="text" id="email" placeholder="&nbsp;" name="ui_vendor_email" value={this.state.ui_vendor_email} onChange={e => this.handleChange(e)}/>
                                  <span class="label">Email ID *</span>
                                  <span class="border"></span>
                                  <small>(E.g : johndoe34@gmail.com)</small>
                                </label>
                                {/* <input type="number" name="number" value={this.state.number} onChange={e => this.handleChange(e)} id="hsn" placeholder="87650252852" />
                                <label for="hsn">Contact Number</label>
                                <p className="text-danger">
                                  {this.validator.message(
                                    "Phone Number",
                                    this.state.number,
                                    "required|min:10|max:10"
                                  )}
                                </p> */}
                              </div>
                              <button
                              class="btn btn-primary"
                              onClick={this.handleSubmit.bind(this)}
                              style={{marginTop : '20px'}}
                            >
                              Submit
                        </button>
                            </div>
                          </form>
                          {/* <form className="custom-content-form">
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
                                   
                                    {/* </select>
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
                          </form>  */}
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
  
  export default connect(mapStateToProps, { postNewVendors })(Vendors);
