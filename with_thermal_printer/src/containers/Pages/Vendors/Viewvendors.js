import React, { Component } from 'react'
import "./vendors.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVendors } from "../../../store/actions/Vendors/vendors";
import { Whatsapp } from "../../Home/Whatsapp";
import { API_URL } from '../../../url/url'
import axios from 'axios'
export class Viewvendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_no_count: "",
      limit: 10,
      click: 0,
      visible: false,
      name : '',
      mobile : '',
      gstin : '',
      email : '',
      id:  ''
    };
    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }
  handlClick() {
    this.props.fetchVendors(this.props);
  }
  async componentDidMount() {
    await this.handlClick();
  }
  // componentDidUpdate() {
  //     this.props.fetchProduct();
  // }
  deletehandler(item) {
    console.log(item);
    axios
      .delete(
        `${API_URL}vendor/delete/${item.id}`,
        (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
          "jwt"
        ))
      )
      .then(response => {
        console.log(response);
        if (response.data.data.description == "Vendor removed successfully") {
          alert("Vendor deleted successfully");
          // this.forceUpdate();
          this.handlClick();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  editfunc = async (item) => {
    console.log(item);
   await this.setState({
     name : item.name,
     mobile : item.mobile,
     gstin : item.gstin,
     email : item.email,
     id : item.id
   })
   console.clear();
   console.log(this.state)
    // axios
    //   .put(
    //     `${API_URL}item/update/${item.id}`,
    //     (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
    //       "jwt"
    //     ))
    //   )
    //   .then(response => {
    //     console.log(response);
    //     if (response.data.data.description == "Item deleted successfully") {
    //       alert("Product deleted successfully");
    //       this.forceUpdate();
    //       this.handleClick();
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
  handleChange =  e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // if (this.validator.allValid()) {
    let body = {
     ui_vendor_name : this.state.name,
     ui_vendor_mobile : this.state.mobile,
     ui_vendor_gstin : this.state.gstin,
     ui_vendor_email : this.state.email,
     vendor_id : this.state.id
    };
    console.log("state here", body);

    axios
      .put(
        `${API_URL}vendor/modify/${
        this.state.id
        }`,
        body,
        (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
          "jwt"
        ))
      )
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          alert('Vendor Edited Successfully');
          window.location.reload();
        
          // this.setState({
          //   visible: false
          // });
          // this.forceUpdate();
          // window.location.reload();
          // this.handlClick();
        }

      })
      .catch(error => {
        console.log(error);
      });
  };
  prevhandler() {
    let dataskip = --this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    let no_pages = this.props.match.params.id;
    console.log("no-pages", no_pages);
    this.props.history.push(`/Viewvendors/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handlClick();
  }
  nexthandler() {
    let dataskip = ++this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    console.log(this.props.match.params.id);
    this.state.page_no_count = this.props.match.params.id;
    console.log("no-pages", this.state.page_no_count);
    // this.history.push(`${API_URL}/area/view/${dataskip}`)
    this.props.history.push(`/Viewvendors/${this.props.match.params.id}`);
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handlClick();
  }
  render() {
    const { vendors } = this.props;
    let prevbtndipsplay;
    let nextbtndisplay;
    let vendor_table;
    // let page_count = localStorage.getItem('new_page_count');
    // let final_page_count = localStorage.getItem('number_of_pages')
    // console.log('page_count',page_count)
    // console.log('no_page',final_page_count)

    // const { jobdetail } = this.props;
    if(vendors.length == 0) {
      vendor_table = (
        <center>
        <p style={{fontSize : '15px'}}>There are no vendors addedd yet. Please add the vendor first by click on the Add Vendor button.</p>
        </center>
        )
    } else {
      vendor_table = (
 <table className="table table-bordered table-responsive-md table-responsive-sm">
                <thead>
                  <tr>
                    <th scope="col">Name</th>

                    <th scope="col">Email</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">GSTIN</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.length ? (
                    vendors.map(function (item, id) {
                      return (
                        <tr key={id}>
                          <td scope="row">{item.name || "NO DATA"}</td>
                          {/* <td scope="row">{item.role_id===1?"ADMIN":"EMLOYEE" || "NO DATA"}</td> */}
                          <td scope="col">{item.email || 'NO DATA'}</td>
                          <td scope="row">{item.mobile || "NO DATA"}</td>
                          <td scope="row">{item.gstin || "NO DATA"}</td>
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
                                onClick={this.editfunc.bind(this, item)}
                                style={{ marginRight: '10px' }}
                                
                                data-toggle="modal" data-target=".bd-example-modal-lg"

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
                                onClick={this.deletehandler.bind(this, item)}



                              >
                                <i class="fa fa-trash-o" aria-hidden="true" />
                              </button>
                            </span>

                          </td>
                        </tr>
                      );
                    }, this)
                  ) : (
                  <tr>
                    <td>
                      <center>
                      <span className="data_loading"></span>
                      </center>
                     </td>
                    </tr>  
                    )}
                </tbody>
              </table>
        )
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
    }

    
    return (
      <div>
        <div class="breadcrumb-holder">
          <div class="container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active">Vendors List </li>
            </ul>
          </div>
        </div>
        <br />
        <div className="card">
          <div class="card-body">

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <hr />
                <Link to="/Vendors">
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    Add Vendor
                  </button>
                </Link>
              </div>
            </div>
            <br />
            <div>
             {vendor_table}
              <div className="row">
                <div className="col-lg-3 offset-lg-3 offset-md-3 col-md-3 col-sm-12 col-xs-12 text-center">
                  {prevbtndipsplay}
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
                  {nextbtndisplay}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content" style={{padding : '20px'}}>
                      <form className="custom-content-form" id="needs-validation" novalidate >
                            <div className="form-row">
                              <div class="field form-group col-md-12 custom-product-field">
                            
                                <label for="inp" class="inp" >
                                  <input type="text" id="inp" placeholder="&nbsp;"  name="ui_vendor_name" value={this.state.name} onChange={e => this.setState({name : e.target.value})}/>
                                  <span class="label">Vendor's Name</span>
                                  <span class="border"></span>
                                </label>
                              
      
                              </div>

                              <div class="field form-group col-md-12 custom-product-field">
                            
                            <label for="inp" class="inp" >
                              <input type="text" id="inp" placeholder="&nbsp;"  name="ui_vendor_email" value={this.state.email} onChange={e => this.setState({email : e.target.value})}/>
                              <span class="label">Vendor's Email</span>
                              <span class="border"></span>
                            </label>
                          
  
                          </div>

                            <div class="field form-group col-md-12 custom-product-field">
                            
                            <label for="inp" class="inp" >
                              <input type="text" id="inp" placeholder="&nbsp;"  name="ui_vendor_mobile" value={this.state.mobile} onChange={e => this.setState({mobile : e.target.value})}/>
                              <span class="label">Vendor's Phone</span>
                              <span class="border"></span>
                            </label>
                          
  
                          </div>

                          <div class="field form-group col-md-12 custom-product-field">
                            
                            <label for="inp" class="inp" >
                              <input type="text" id="inp" placeholder="&nbsp;"  name="ui_vendor_gstin" value={this.state.gstin} onChange={e => this.setState({gstin : e.target.value})}/>
                              <span class="label">Vendor's GSTIIN</span>
                              <span class="border"></span>
                            </label>
                          
  
                          </div>
      
      
      
      
      
                              {/* <div class="field form-group col-md-6 custom-product-field">
      
                              <span className="text-danger">
                                  {this.validator.message(
                                    "Phone number",
                                    this.state.number,
                                    "required|min:10|max:10"
                                  )}
                                </span>
                                <label for="phone" class="inp" >
                                  <input type="number" id="phone" placeholder="&nbsp;" name="ui_vendor_mobile" value={this.state.ui_vendor_mobile} onChange={e => this.handleChange(e)}/>
                                  <span class="label">Phone Number</span>
                                  <span class="border"></span>
                                </label>
      
      
                              </div>
      
                              <div class="field form-group col-md-6 custom-product-field">
      
                              <span className="text-danger">
                                  {this.validator.message(
                                    "gstin",
                                    this.state.gstin,
                                    "required"
                                  )}
                                </span>
                                <label for="gstin" class="inp" >
                                  <input type="text" id="gstin" placeholder="&nbsp;" name="ui_vendor_gstin" value={this.state.ui_vendor_gstin} onChange={e => this.handleChange(e)}/>
                                  <span class="label">GSTIN</span>
                                  <span class="border"></span>
                                </label>
      
      
                              </div> */}
      
      
                              {/* <div class="field form-group col-md-6 custom-product-field">
                              <span className="text-danger">
                                  {this.validator.message(
                                    "email",
                                    this.state.email,
                                    "required|email"
                                  )}
                                </span>
                                <label for="email" class="inp" >
                                  <input type="text" id="email" placeholder="&nbsp;" name="ui_vendor_email" value={this.state.ui_vendor_email} onChange={e => this.handleChange(e)}/>
                                  <span class="label">Email ID</span>
                                  <span class="border"></span>
                                </label>
                               
                              </div> */}
                              <button
                              class="btn btn-primary"
                              onClick={this.handleSubmit.bind(this)}
                            >
                              Submit
                        </button>
      
      
      
      
      
      
      
      
                            </div>
                          </form>
    </div>
                    </div>
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
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    vendors: state.vendors,
    currentUser: state.currentUser.user.id // we only need the current user's id, to check against the user id of each message
  };
}

export default connect(
  mapStateToProps,
  { fetchVendors }
)(Viewvendors);
