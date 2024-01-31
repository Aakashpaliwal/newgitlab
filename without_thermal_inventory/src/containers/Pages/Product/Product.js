import React, { Component } from 'react'
import './product.css'
import { connect } from 'react-redux';
import { postNewProduct } from "../../../store/actions/Product/product";
import { Whatsapp } from '../../Home/Whatsapp';
import SimpleReactValidator from "simple-react-validator";
export class Product extends Component {
  constructor(props) {
    super(props);
    // React state
    this.state = {

      ui_name: "",
      ui_cost_price: "",
      ui_inventory_quantity: '0',
      ui_batch_no: "",
      ui_dl_no: '',
      ui_hsn: '',
      ui_free: '',
      ui_cgst: '',
      ui_cost_price: '',
      ui_igst: '',
      ui_selling_price: '',
      ui_sgst: '',
      ui_expiration_date : '',
      valiationstatus: false,
      validationbadge: '',
      demobadge: "",
      demostatus: false,
      sendingstatus : false


    }; this.validator = new SimpleReactValidator();
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

      ui_price: this.state.number,
      ui_inventory_quantity: this.state.quantity,
      ui_batch_no: this.state.ui_batch_no,
      ui_dl_no: this.state.ui_dl_no

    };
    console.log('value here', this.state)
    const res = await this.props.postNewProduct(this.state);
  
    console.log('upper re', res)
    if (res) {
      if (res.status === 200) {
        console.log('200res', res)
        this.state.sendingstatus = true
        alert(res.data.data.description);
        this.setState({
          sendingstatus : false
        })
        this.props.history.push('/ViewProduct/1');
      }
      else {
        // console.log('error res',res.error)
        // this.state.validationbadge = res.error.data.errors[0].message
        // this.state.demostatus = true
        // if (this.state.demostatus) {

        // }
        // this.state.demobadge = 'demobadge'
        // this.setState({
        //   demobadge: 'demobagehere'
        // })
        // console.log(this.state.demobadge)
        if (res.error.status === 422) {
          this.state.valiationstatus = true

          alert('failure - ' + res.error.data.errors[0].message)
          // this.setState({
          //   valiationstatus: true,
          //   validationbadge: res.error.data.errors[0].message
          // })



          // console.log(
          //   this.state.validationbadge
          // )
          // if (this.state.valiationstatus) {
          //   this.state.validationbadge = res.error.data.errors[0].message
          //   console.log(this.state.validationbadge)
          // }
          // this.state.ui_name = this.state.ui_name
          // this.setState({
          //   ui_name : this.state.ui_name
          // })
          // return false
          // window.stop();
          // console.log(res.error.data.errors[0])
        }

      }
    }
    // this.props.history.push('/ViewProduct/1');
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };
  render() {
    let loadingbtn;
    if(this.state.sendingstatus == true) {
      loadingbtn = (
        <button
        class="btn btn-primary"
        onClick={this.handleSubmit.bind(this)}
        style={{ float: 'right' }}
        disabled
      >
        Loading...
</button>
      )
    }
    else {
      loadingbtn = (
        <button
        class="btn btn-primary"
        onClick={this.handleSubmit.bind(this)}
        style={{ float: 'right' }}
      >
       Submit
</button>
      )
    }
    let validationalert;
    if (this.state.valiationstatus === true) {
      console.log('validationalert', validationalert)
      validationalert = (
        <h4 className="text-danger">
          {this.state.validationbadge}
        </h4>
      )

    }
    let badgetext;
    if (this.state.demostatus) {
      badgetext = (
        'demobadgehere'
      )
    }
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
        <section class="forms product-forms">
          <div class="container">
            <div className="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header d-flex align-items-center">
                    <h4>Add Item</h4>
                  </div>
                  <div class="card-body">
                    <p>Fill below details to add Item.</p>
                    <form className="custom-content-form">
                      <div className="form-row">

                        <div class="form-group col-md-12">

                          {/* <div class="alert alert-warning" role="alert">
                            {validationalert}
                          </div> */}
                          <div class="form-group row">

                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Name
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="ui_name"
                                value={this.state.ui_name}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "Product Name",
                                  this.state.ui_name,
                                  "required|min:3|max:100"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Batch Number
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="ui_batch_no"
                                value={this.state.ui_batch_no}
                                onChange={e => this.handleChange(e)}
                              />
                              {/* <span className="text-danger">
                                {this.validator.message(
                                  "Batch Number",
                                  this.state.ui_batch_no,
                                  "required|min:3|max:100"
                                )}
                              </span> */}
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              D/L Number
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="ui_dl_no"
                                value={this.state.ui_dl_no}
                                onChange={e => this.handleChange(e)}
                              />
                              {/* <span className="text-danger">
                                {this.validator.message(
                                  "Product Name",
                                  this.state.ui_name,
                                  "required|min:3|max:100"
                                )}
                              </span> */}
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              HSN Number
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="ui_hsn"
                                value={this.state.ui_hsn}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "HSN",
                                  this.state.ui_hsn,
                                  "required|min:6"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Free Quantity
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="ui_free"
                                value={this.state.ui_free}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "Quantity",
                                  this.state.ui_free,
                                  "required"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>



                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Cost Price
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="ui_cost_price"
                                value={this.state.ui_cost_price}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "Product Cost Price",
                                  this.state.ui_cost_price,
                                  "required|numeric"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Selling Price
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="ui_selling_price"
                                value={this.state.ui_selling_price}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "Product Selling Price",
                                  this.state.ui_selling_price,
                                  "required|numeric"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              CGST
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="ui_cgst"
                                value={this.state.ui_cgst}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "CGST",
                                  this.state.ui_cgst,
                                  "required"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              SGST
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="ui_sgst"
                                value={this.state.ui_sgst}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "SGST",
                                  this.state.ui_sgst,
                                  "required"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              IGST
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="ui_igst"
                                value={this.state.ui_igst}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "IGST",
                                  this.state.ui_igst,
                                  "required"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Inventory Quantity
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="ui_inventory_quantity"
                                value={this.state.ui_inventory_quantity}
                                onChange={e => this.handleChange(e)}
                              />
                               <span className="text-danger">
                                {this.validator.message(
                                  "Product Quantity for Inventory",
                                  this.state.ui_inventory_quantity,
                                  "required|numeric"
                                )}
                              </span>

                            </div>
                          </div>
                        </div>

                         <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Expiration Date
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="date"
                                class="form-control"
                                id="inputPassword"
                                name="ui_expiration_date"
                                value={this.state.ui_expiration_date}
                                onChange={e => this.handleChange(e)}
                              />
                               <span className="text-danger">
                                {this.validator.message(
                                  "Product Expiration Date",
                                  this.state.ui_expiration_date,
                                  "required"
                                )}
                              </span>

                            </div>
                          </div>
                        </div>

                        {/* <button
                          class="btn btn-primary"
                          onClick={this.handleSubmit.bind(this)}
                          style={{ float: 'right' }}
                        >
                          Submit
                  </button> */}
                  {loadingbtn}
                      </div>
                    </form>
                    {/* <div className="row">
                      <div className="col-12">
                        <h4> {this.state.validationbadge || 'NO DATA'}</h4>
                        <h4>{this.state.demobadge}</h4>
                        <h4>something</h4>
                      </div>
                    </div> */}
                  </div>
                  {/* <div class="alert alert-danger" role="alert">
                   
                    {badgetext}
                  </div> */}
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

export default connect(mapStateToProps, { postNewProduct })(Product);