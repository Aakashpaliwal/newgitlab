import $ from "jquery";
import React, { Component } from "react";
import "./product.css";
// import './newform.scss'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postNewProduct } from "../../../store/actions/Product/product";
import { Whatsapp } from "../../Home/Whatsapp";
import SimpleReactValidator from "simple-react-validator";
export class Product extends Component {
  constructor(props) {
    super(props);
    // React state
    this.state = {
      cgstamount: "",
      gstpercentage: "",
      ui_name: "",
      ui_cost_price: "",
      ui_inventory_quantity: 0,
      ui_batch_no: "",
      ui_dl_no: "",
      ui_hsn: "",
      ui_free: 0,
      ui_cgst: 0,
      ui_cost_price: "",
      ui_igst: 0,
      ui_selling_price: "",
      ui_sgst: 0,
      ui_expiration_date: "",
      alertstatus: false,
      produnct_name_err: "",
      batch_err: "",
      hsn_err: "",
      free_err: "",
      cgst_err: "",
      igst_err: "",
      sgst_err: "",
      cost_price_err: "",
      selling_price_err: "",
      epiration_date_err: ""
    };
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    $(function() {
      var dtToday = new Date();

      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if (month < 10) month = "0" + month.toString();
      if (day < 10) day = "0" + day.toString();

      var maxDate = year + "-" + month + "-" + day;
      // alert(maxDate);
      $("#date").attr("min", maxDate);
    });
  }

  // by using arrow functions, we retain value of 'this', and don't need to bind 'this' in the constructor
  handleChange = async e => {
    await this.setState({
      // get computed property name and set its matching value
      // (works only if the name matches what's in state! but is a nice way to generalize form changes on different types of inputs)
      [e.target.name]: e.target.value
    });
    this.calcCgstAmount();
  };
  taxClick = async e => {
    await this.setState({
      ui_cgst: e.target.value,
      ui_sgst: e.target.value
    });
    console.log(this.state.ui_sgst);

    let newvar = document.getElementById("ddlViewBy");
    let strUser = newvar.options[newvar.selectedIndex].text;
    console.clear();
    let newtype = typeof strUser;
    console.log(newtype);

    let totaltext = parseFloat(strUser) * 2;
    // let newtaxpercentage = totaltext / 2

    // console.log(totaltext)
    await this.setState({
      gstpercentage: totaltext
    });
    console.clear();
    console.log(this.state.gstpercentage);
    this.calcCgstAmount();
    // this.formatCurrency(this.calcCgstAmount())
    // //  this.state.ui_items[0].item_cgst_percentage = parseFloat(strUser) * 2
    // // for(let i=0;i < this.state.ui_items.length;i++) {
    // // }

    // //  this.formatCurrency(this.calcCgstAmount())
    // //  this.formatCurrency(this.calcGstAmount())
  };
  formatCurrency = amount => {
    return new Intl.NumberFormat(this.locale, {
      // style: 'currency',
      // currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  calcCgstAmount = async () => {
    let newcgstAmount =
      (+this.state.gstpercentage / 100) * +this.state.ui_selling_price;
    await this.setState({
      cgstamount: newcgstAmount
    });
    console.log(this.state.cgstamount);
  };
  handleSubmit = async e => {
    e.preventDefault();
    // return false;
    if (this.validator.allValid()) {
      let body = {
        ui_name: this.state.ui_name,
        ui_cost_price: this.state.ui_cost_price,
        ui_inventory_quantity: this.state.ui_inventory_quantity,
        ui_batch_no: this.state.ui_batch_no,
        ui_hsn: this.state.ui_hsn,
        ui_free: 0,
        ui_cgst: 0,
        ui_cost_price: this.state.ui_cost_price,
        ui_igst: 0,
        ui_selling_price: this.state.ui_selling_price,
        ui_sgst: 0,
        ui_expiration_date: this.state.ui_expiration_date
      };
      const res = await this.props.postNewProduct(body);
      console.log("upper re", res);
      if (res.status === 200) {
        // console.log('200res', res)
        alert(res.data.data.description);
        this.props.history.push("/ViewProduct/1");
      } 
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };
  render() {
    let loadingbtn;
    if (this.state.sendingstatus == true) {
      loadingbtn = (
        <button
          class="btn btn-primary"
          onClick={this.handleSubmit.bind(this)}
          style={{ float: "right" }}
          disabled
        >
          Loading...
        </button>
      );
    } else {
      loadingbtn = (
        <button
          class="btn btn-primary"
          onClick={this.handleSubmit.bind(this)}
          style={{ float: "right" }}
        >
          Submit
        </button>
      );
    }
    let alertecontent;
    if (this.state.alertstatus) {
      alertecontent = (
        <div class="alert alert-danger">
          <strong>Danger!</strong> This alert box could indicate a dangerous or
          potentially negative action.
        </div>
      );
    } else {
      alertecontent = <p>NOTHING</p>;
    }
    return (
      <div>
        <div class="breadcrumb-holder">
          <div class="container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active">Add Item </li>
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
                    <p>* This Fields are Mendatory.</p>
                    <form
                      className="custom-content-form"
                      id="needs-validation"
                      novalidate
                    >
                      <div className="form-row">
                        <div class="field form-group col-md-12 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "Product Name",
                              this.state.ui_name,
                              "required|min:3|max:100"
                            )}
                          </p>
                          <label for="inp" class="inp">
                            <input
                              type="text"
                              id="inp"
                              placeholder="&nbsp;"
                              name="ui_name"
                              value={this.state.ui_name}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Product Name *</span>
                            <span class="border"></span>
                            <small>(e.g : Tea)</small> 
                          </label>

                          {/* <input type="text" name="ui_name" value={this.state.ui_name} onChange={e => this.handleChange(e)} id="fullname" placeholder="Jane Appleseed" />

                          <label for="fullname">Product Name</label>
                          <p className="text-danger">
                          {this.validator.message(
                            "Product Name",
                            this.state.ui_name,
                            "required|min:3|max:100"
                          )}
                        </p> */}
                        </div>

                        <div class="field form-group col-md-4 custom-product-field">
                          <span className="text-danger">
                            {this.validator.message(
                              "batch",
                              this.state.ui_batch_no,
                              "required"
                            )}
                          </span>
                          <label for="batch" class="inp inp_position_top_9">
                            <input
                              type="text"
                              id="batch"
                              placeholder="&nbsp;"
                              name="ui_batch_no"
                              value={this.state.ui_batch_no}
                              onChange={e => this.handleChange(e)}
                            />

                            <span class="label">Batch No. *</span>
                            <span class="border"></span>
                            <small>(e.g : ba0123456)</small>  
                          </label>
                          {/* <input type="text" name="ui_batch_no" value={this.state.ui_batch_no} onChange={e => this.handleChange(e)} id="batch" placeholder="12batch" />

                          <label for="batch">Batch Number</label> */}
                        </div>

                        <div class="field form-group col-md-4 custom-product-field">
                          <span className="text-danger">
                            {this.validator.message(
                              "HSN",
                              this.state.ui_hsn,
                              "required|min:2"
                            )}
                          </span>
                          <label for="hsn" class="inp inp_position_top_9">
                            <input
                              type="text"
                              id="hsn"
                              placeholder="&nbsp;"
                              name="ui_hsn"
                              value={this.state.ui_hsn}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">HSN *</span>
                            <span class="border"></span>
                            <small>(e.g : 123456)</small>
                          </label>
                          {/* <input type="text" name="ui_hsn" value={this.state.ui_hsn} onChange={e => this.handleChange(e)} id="hsn" placeholder="026585" />
                          <label for="hsn">HSN</label>
                          <p className="text-danger">
                            {this.validator.message(
                              "HSN",
                              this.state.ui_hsn,
                              "required|min:6"
                            )}
                          </p> */}
                        </div>

                        <div class="field form-group col-md-4 custom-product-field">
                          <span className="text-danger">
                            {this.validator.message(
                              "Quanitty",
                              this.state.ui_free,
                              "required"
                            )}
                          </span>
                          <label for="free" class="inp">
                            <input
                              type="text"
                              id="free"
                              placeholder="&nbsp;"
                              name="ui_free"
                              value={this.state.ui_free}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Free Quantity</span>
                            <span class="border"></span>
                          </label>
                          {/* <input type="text" name="ui_free" value={this.state.ui_free} onChange={e => this.handleChange(e)} id="fre" placeholder="58" />
                          <label for="fre">Free Quantity</label>
                          <p className="text-danger">
                            {this.validator.message(
                              "Free Quantity",
                              this.state.ui_hsn,
                              "required"
                            )}
                          </p> */}
                        </div>

                        <div class="field form-group col-md-6 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "Product Cost Price",
                              this.state.ui_cost_price,
                              "required|numeric"
                            )}
                          </p>
                          <label for="cost" class="inp">
                            <input
                              type="number"
                              id="cost"
                              placeholder="&nbsp;"
                              name="ui_cost_price"
                              value={this.state.ui_cost_price.replace(
                                /^0+/,
                                ""
                              )}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Product Cost Price *</span>
                            <span class="border"></span>
                            <small>(e.g : 10.00)</small> 
                          </label>
                          {/* <input type="text" name="ui_cost_price" value={this.state.ui_cost_price} onChange={e => this.handleChange(e)} id="cost" placeholder="58" />
                          <label for="cost">Product Cost Price</label>
                          <p className="text-danger">
                            {this.validator.message(
                              "Product Cost Price",
                              this.state.ui_cost_price,
                              "required|numeric"
                            )}
                          </p> */}
                        </div>

                        <div class="field form-group col-md-6 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "Product Selling Price",
                              this.state.ui_selling_price,
                              "required|numeric"
                            )}
                          </p>
                          <label for="selling" class="inp">
                            <input
                              type="number"
                              id="selling"
                              placeholder="&nbsp;"
                              name="ui_selling_price"
                              value={this.state.ui_selling_price.replace(
                                /^0+/,
                                ""
                              )}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Product Selling Price *</span>
                            <span class="border"></span>
                            <small>(e.g : 20.00)</small> 
                          </label>
                          {/* <input type="text" name="ui_selling_price" value={this.state.ui_selling_price} onChange={e => this.handleChange(e)} id="selling" placeholder="58" />
                          <label for="selling">Product Selling Price</label>
                          <p className="text-danger">
                            {this.validator.message(
                              "Product Selling Price",
                              this.state.ui_selling_price,
                              "required|numeric"
                            )}
                          </p> */}
                        </div>

                        <div class="field form-group col-md-6">
                          <select
                            className="form-control"
                            style={{ width: "100%" }}
                            name="item_cgst_percentage"
                            onChange={e => this.taxClick(e)}
                            // onChange={e => this.handleChange(e)}
                            id="ddlViewBy"
                          >
                            <option>Choose...</option>
                            <option value="0">0 + 0</option>
                            <option value="2.5">2.500 + 2.500</option>
                            <option value="6">6 + 6</option>
                            <option value="9">9 + 9</option>
                            <option value="14">14 + 14</option>
                            <option value="1.5">1.500 + 1.500</option>
                            <option value="0.5">0.50 + 0.50</option>
                            <option value="0.125">0.125 + 0.125</option>
                            <option value="0.25">0.250 + 0.250</option>
                          </select>
                          <label
                            for="inputSubcategory"
                            className="col-sm-4 col-form-label"
                          >
                            CGST + SGST (%)
                          </label>
                        </div>

                        {/* <div class="field form-group col-md-4 custom-product-field">
                        <p className="text-danger">
                            {this.validator.message(
                              "CGST",
                              this.state.ui_cgst,
                              "required|numeric"
                            )}
                          </p>
                          <label for="cgst" class="inp" >
                            <input type="number" id="cgst" placeholder="&nbsp;" name="ui_cgst" value={this.state.ui_cgst} onChange={e => this.handleChange(e)}/>
                            <span class="label">CGST</span>
                            <span class="border"></span>
                          </label>
                          
                        </div>



                        <div class="field form-group col-md-4 custom-product-field">
                        <p className="text-danger">
                            {this.validator.message(
                              "SGST",
                              this.state.ui_sgst,
                              "required|numeric"
                            )}
                          </p>
                          <label for="sgst" class="inp" >
                            <input type="number" id="sgst" placeholder="&nbsp;" name="ui_sgst" value={this.state.ui_sgst} onChange={e => this.handleChange(e)}/>
                            <span class="label">SGST</span>
                            <span class="border"></span>
                          </label>
                          
                        </div> */}
                        <div class="field form-group col-md-6">
                          <select
                            className="form-control"
                            style={{ width: "100%" }}
                            name="item_cgst_percentage"
                            onClick={e => this.taxClick(e)}
                            onChange={e => this.handleChange(e)}
                            id="ddlViewBy"
                            disabled
                          >
                            <option>Choose...</option>
                            <option value="0">0 + 0</option>
                            <option value="1">2.500 + 2.500</option>
                            <option value="2">6 + 6</option>
                            <option value="3">9 + 9</option>
                            <option value="4">14 + 14</option>
                            <option value="5">1.500 + 1.500</option>
                            <option value="6">0.050 + 0.050</option>
                            <option value="7">0.125 + 0.125</option>
                            <option value="8">0.250 + 0.250</option>
                          </select>
                          <label
                            for="inputSubcategory"
                            className="col-sm-4 col-form-label"
                          >
                            IGST
                          </label>
                        </div>

                        {/* <div class="field form-group col-md-4 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "IGST",
                              this.state.ui_igst,
                              "required|numeric"
                            )}
                          </p>
                          <label for="igst" class="inp" >
                            <input type="number" id="igst" placeholder="&nbsp;" name="ui_igst" value={this.state.ui_igst} onChange={e => this.handleChange(e)} />
                            <span class="label">IGST</span>
                            <span class="border"></span>
                          </label>
                        
                        </div> */}
                        <div class="field form-group col-md-12 custom-product-field">
                          <label for="igst" class="inp">
                            <input
                              type="number"
                              id="igst"
                              placeholder="&nbsp;"
                              name="cgstamount"
                              value={this.state.cgstamount}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Total GST Amount</span>
                            <span class="border"></span>
                          </label>
                        </div>

                        <div class="field form-group col-md-12 custom-product-field">
                          <label for="date" class="inp">
                            <input
                              type="date"
                              id="date"
                              placeholder="&nbsp;"
                              name="ui_expiration_date"
                              value={this.state.ui_expiration_date}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Expiration Date</span>
                            <span class="border"></span>
                            <small>(e.g : 05/25/2020)</small> 
                          </label>
                          {/* <input type="date" name="ui_expiration_date" value={this.state.ui_expiration_date} onChange={e => this.handleChange(e)} id="expiration" placeholder="6" />
                          <label for="expiration">Expiration Date</label>
                          <p className="text-danger">
                            {this.validator.message(
                              "Expiration Date",
                              this.state.ui_expiration_date,
                              "required"
                            )}
                          </p> */}
                        </div>

                        <button
                          class="btn btn-primary text-center center-block"
                          onClick={this.handleSubmit.bind(this)}
                          style={{ float: "right", marginTop: "30px" }}
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    {/* <form className="custom-content-form" >
                      <div className="form-row">

                        <div class="form-group col-md-12">
                          <div class="form-group row float-container">

                            <label
                              for="productName"
                              class="col-sm-2 col-form-label"
                            >
                              Product Name*
                        </label>
                            <div class="col-sm-10">
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

                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Batch Number*
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
                            
                            </div>
                          </div>
                        </div>

                      
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              HSN Number*
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



                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Cost Price*
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

                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Selling Price*
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

                        <div class="form-group col-md-4">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              CGST*
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

                        <div class="form-group col-md-4">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              SGST*
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

                        <div class="form-group col-md-4">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              IGST*
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

                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Inventory Quantity*
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

                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Expiration Date*
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
                       
                      
                        <button
          class="btn btn-primary"
          onClick={this.handleSubmit.bind(this)}
          style={{ float: 'right' }}
          type="submit"
        >
          Submit
</button>
                      </div>
                    </form> */}
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
                  {/* <center><h1>{this.state.hsn_err || 'NO DATA'}</h1></center> */}
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
