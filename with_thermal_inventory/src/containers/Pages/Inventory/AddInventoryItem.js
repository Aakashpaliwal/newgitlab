import $ from "jquery";
import React, { Component } from "react";
import "./inventory.css";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { postNewProduct } from "../../../store/actions/Product/product";
import { Whatsapp } from "../../Home/Whatsapp";
import { fetchTotalProduct } from "../../../store/actions/Product/product";
import { fetchTotalVendors } from "../../../store/actions/Vendors/vendors";
import { postNewInventory } from "../../../store/actions/Inventory/inventory";
import SimpleReactValidator from "simple-react-validator";
import { API_URL } from "../../../url/url";
export class AddInventoryItem extends Component {
  locale = "en-IN";
  currency = "INR";
  constructor(props) {
    super(props);
    // React state
    this.state = {
      ui_vendor_id: "",
      ui_vendor_name: "",
      ui_vendor_mobile: "",
      ui_vendor_gstin: "",
      ui_vendor_email: "",
      item_batch: "",
      ui_items: [
        {
          item_cgst_amount: 0,
          item_sgst_amount: 0,
          item_igst_amount: 0,
          item_price: 0,
          item_name: "",
          item_id: "",
          item_inventory_quantity: 0,
          item_batch: "",
          item_batch_expiry: "",
          item_sgst_percentage: 0,
          item_cgst_percentage: 0,
          item_igst_percentage: 0,
          item_total_gst_amount: 0,
          item_tax_percentage: 0,
          item_sub_total: 0,
          item_total: 0
        }
      ],
      cgstAmount: "",
      sgstAmount: "",
      igstAmount: "",
      gstAmount: "",
      subTotal: "",
      totalAmount: ""
    };
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    this.props.fetchTotalProduct(this.props);
    this.props.fetchTotalVendors(this.props);
    $(function() {
      var dtToday = new Date();

      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if (month < 10) month = "0" + month.toString();
      if (day < 10) day = "0" + day.toString();

      var maxDate = year + "-" + month + "-" + day;
      // alert(maxDate);
      $("#expiration").attr("min", maxDate);
    });
  }

  vendorclick = async e => {
    for (let i = 0; i < this.props.vendors.length; ++i) {
      if (this.props.vendors[i].id == this.state.name) {
        console.clear();
        console.log(this.props.vendors[i]);

        await this.setState({
          ui_vendor_id: this.props.vendors[i].id,
          ui_vendor_name: this.props.vendors[i].name,
          ui_vendor_mobile: this.props.vendors[i].mobile,
          ui_vendor_gstin: this.props.vendors[i].gstin,
          ui_vendor_email: this.props.vendors[i].email
        });
      }
    }
  };

  formatCurrency = amount => {
    return new Intl.NumberFormat(this.locale, {
      // style: 'currency',
      // currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  change = idx => async e => {
    const newShareholders = this.state.ui_items.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, [e.target.name]: e.target.value };
    });
    for (let i = 0; i < newShareholders.length; i++) {
      newShareholders[i].item_cgst_amount =
        (newShareholders[i].item_cgst_percentage *
          newShareholders[i].item_price *
          newShareholders[i].item_inventory_quantity) /
        100;
      newShareholders[i].item_sgst_amount =
        (newShareholders[i].item_sgst_percentage *
          newShareholders[i].item_price *
          newShareholders[i].item_inventory_quantity) /
        100;
      newShareholders[i].item_igst_amount =
        (newShareholders[i].item_igst_percentage *
          newShareholders[i].item_price *
          newShareholders[i].item_inventory_quantity) /
        100;
      newShareholders[i].item_total_gst_amount =
        +newShareholders[i].item_cgst_amount +
        +newShareholders[i].item_sgst_amount +
        +newShareholders[i].item_igst_amount;
      newShareholders[i].item_sub_total =
        newShareholders[i].item_price *
        newShareholders[i].item_inventory_quantity;
      newShareholders[i].item_total =
        +newShareholders[i].item_sub_total +
        +newShareholders[i].item_total_gst_amount;
    }

    await this.setState({
      ui_items: newShareholders
    });
    await this.setState({
      igstAmount: this.formatCurrency(this.calcIgstAmount()),
      cgstAmount: this.formatCurrency(this.calcCgstAmount()),
      sgstAmount: this.formatCurrency(this.calcSgstAmount()),
      gstAmount: this.formatCurrency(this.calGstAmount()),
      subTotal: this.formatCurrency(this.calcSubAmount()),
      totalAmount: this.formatCurrency(this.calcTotalAmount())
    });
  };
  handleAddShareholder = () => {
    this.setState({
      ui_items: this.state.ui_items.concat([
        {
          item_cgst_amount: 0,
          item_sgst_amount: 0,
          item_igst_amount: 0,
          item_price: 0,
          item_name: "",
          item_id: "",
          item_inventory_quantity: 0,
          item_batch: "",
          item_batch_expiry: "",
          item_sgst_percentage: 0,
          item_cgst_percentage: 0,
          item_igst_percentage: 0,
          item_total_gst_amount: 0,
          item_tax_percentage: 0,
          item_sub_total: 0,
          item_total: 0
        }
      ])
    });
  };
  handleChange = e => {
    this.setState({
      // get computed property name and set its matching value
      // (works only if the name matches what's in state! but is a nice way to generalize form changes on different types of inputs)
      [e.target.name]: e.target.value
    });
  };
  calcCgstAmount = () => {
    return this.state.ui_items.reduce(
      (prev, cur) => prev + +cur.item_cgst_amount,
      0
    );
  };
  calcSgstAmount = () => {
    return this.state.ui_items.reduce(
      (prev, cur) => prev + +cur.item_sgst_amount,
      0
    );
  };
  calcIgstAmount = () => {
    return this.state.ui_items.reduce(
      (prev, cur) => prev + +cur.item_igst_amount,
      0
    );
  };
  calGstAmount = () => {
    return this.state.ui_items.reduce(
      (prev, cur) => prev + +cur.item_total_gst_amount,
      0
    );
  };
  calcSubAmount = () => {
    return this.state.ui_items.reduce(
      (prev, cur) => prev + +cur.item_sub_total,
      0
    );
  };
  calcTotalAmount = () => {
    return this.state.ui_items.reduce((prev, cur) => prev + +cur.item_total, 0);
  };
  taxClick = idx => async e => {
    const newShareholders = this.state.ui_items.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, [e.target.name]: e.target.value };
    });
    for (let i = 0; i < newShareholders.length; i++) {
      newShareholders[i].item_sgst_percentage =
        newShareholders[i].item_cgst_percentage;
      newShareholders[i].item_cgst_amount =
        (newShareholders[i].item_cgst_percentage *
          newShareholders[i].item_price *
          newShareholders[i].item_inventory_quantity) /
        100;
      newShareholders[i].item_sgst_amount =
        (newShareholders[i].item_sgst_percentage *
          newShareholders[i].item_price *
          newShareholders[i].item_inventory_quantity) /
        100;
      newShareholders[i].item_igst_amount =
        (newShareholders[i].item_igst_percentage *
          newShareholders[i].item_price *
          newShareholders[i].item_inventory_quantity) /
        100;
      newShareholders[i].item_total_gst_amount =
        +newShareholders[i].item_cgst_amount +
        +newShareholders[i].item_sgst_amount +
        +newShareholders[i].item_igst_amount;
      newShareholders[i].item_sub_total =
        newShareholders[i].item_price *
        newShareholders[i].item_inventory_quantity;
      newShareholders[i].item_total =
        +newShareholders[i].item_sub_total +
        +newShareholders[i].item_total_gst_amount;
    }
    await this.setState({
      ui_items: newShareholders
    });
    await this.setState({
      igstAmount: this.calcIgstAmount(),
      cgstAmount: this.calcCgstAmount(),
      sgstAmount: this.calcSgstAmount(),
      gstAmount: this.calGstAmount(),
      subTotal: this.calcSubAmount(),
      totalAmount: this.calcTotalAmount()
    });
  };
  //   handleSubmit = e => {
  //     e.preventDefault();
  //     let body = {

  //       ui_name: this.state.name,

  //       ui_price: this.state.number,
  //       ui_inventory_quantity: this.state.quantity

  //     };
  //     console.log('value here', body)
  //     this.props.postNewProduct(body);
  //      this.props.history.push('/Inventory');
  //   };
  handleSubmit = async e => {
    e.preventDefault();
     if (this.validator.allValid()) {
    let body = {
      ui_vendor_id: this.state.ui_vendor_id,
      ui_vendor_name: this.state.ui_vendor_name,
      ui_inv_sgst_amount: this.state.sgstAmount,
      ui_inv_cgst_amount: this.state.cgstAmount,
      ui_inv_igst_amount: this.state.igstAmount,
      ui_inv_total_gst_amount: this.state.gstAmount,
      ui_inv_sub_total: this.state.subTotal,
      ui_inv_total: this.state.totalAmount,
      ui_items: this.state.ui_items
    };
    console.log("values here", body);
    let res = await this.props.postNewInventory(body);
    console.clear()
    console.log(res)
   if (res.status === 200) {
        
        alert(res.data.data.description);
        this.props.history.push("/Inventory/1");
      } else {
        
        if (res.error.status === 422) {
          alert("failure - " + res.error.data.errors[0].message);
        }
        if (res.error.status === 400) {
          alert(res.error.data.message);
        }
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };
  render() {
    const { vendors } = this.props;
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
        <section class="forms product-forms">
          <div class="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h4>Add Items in Inventory</h4>
                  </div>
                  <div className="card-body">
                    <p>Fill below details to add Item to Inventory.</p>
                    <form className="custom-content-form">
                      <div className="form-row">
                        <div class="field form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputSubcategory"
                              className="col-sm-3 col-form-label"
                            >
                              Select Vendor
                            </label>
                            <div class="col-sm-9">
                              <select
                                className="form-control"
                                style={{ width: "100%" }}
                                name="name"
                                value={this.state.name}
                                onClick={e => this.vendorclick(e)}
                                onChange={e => this.handleChange(e)}
                                // onChange={(e) => this.setState({item_id: e.target.value})}
                              >
                                <option>Select One </option>
                                {this.props.vendors ? (
                                  this.props.vendors.map(function(item, id) {
                                    return (
                                      <option value={item.id} key={id}>
                                        {item.name}{" "}
                                      </option>
                                    );
                                  }, this)
                                ) : (
                                  <span>Data is loading....</span>
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputSubcategory"
                              className="col-sm-3 col-form-label"
                            >
                              Contact
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="ui_vendor_mobile"
                                value={this.state.ui_vendor_mobile}
                                onChange={e => this.handleChange(e)}
                                disabled
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
                              GSTIN
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="ui_vendor_gstin"
                                value={this.state.ui_vendor_gstin}
                                onChange={e => this.handleChange(e)}
                                disabled
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
                              Email
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="email"
                                class="form-control"
                                id="inputPassword"
                                name="ui_vendor_email"
                                value={this.state.ui_vendor_email}
                                onChange={e => this.handleChange(e)}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="card">
                  {/* <div class="card-header d-flex align-items-center">
                    <h4>Add Item in Inventory</h4>
                  </div> */}
                  <div class="card-body">
                    {/* <p>Fill below details to add an Item to Inventory.</p> */}
                    {this.state.ui_items.map((shareholder, idx) => (
                      <>
                        <form className="custom-content-form">
                          <div className="form-row">
                            <div class="field form-group col-md-4">
                              <select
                                className="form-control"
                                style={{ width: "100%" }}
                                name="item_id"
                                onChange={this.change(idx)}
                              >
                                <option>Select One </option>
                                {this.props.product ? (
                                  this.props.product.map(function(item, id) {
                                    return (
                                      <option value={item.id} key={id}>
                                        {item.name}{" "}
                                      </option>
                                    );
                                  }, this)
                                ) : (
                                  <span>Data is loading....</span>
                                )}
                              </select>
                              <label
                                for="inputSubcategory"
                                className="col-sm-3 col-form-label"
                              >
                                Item Name
                              </label>
                            </div>
                            {/* <div class="form-group col-md-6">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-3 col-form-label"
                              >
                                Item Name
                        </label>
                              <div class="col-sm-9">
                               
                                <select className="form-control" style={{ width: "100%" }} name="item_id" onChange={e => this.handleChange(e)}>
                                  <option >Select One </option>
                                  {this.props.product ? (
                                    this.props.product.map(function (item, id) {
                                      return (
                                        <option value={item.id} key={id}>{item.name} </option>
                                      );
                                    }, this)
                                  ) : (
                                      <span>Data is loading....</span>
                                    )}
                                </select>

                              </div>
                            </div>
                          </div> */}
                            {/* <div class="field form-group col-4 custom-product-field">

                            <label for="name" class="inp" >
                              <input type="text" id="name" placeholder="&nbsp;" name="item_name" value={shareholder.item_name} onChange={this.change(idx)} />
                              <span class="label">Item Name</span>
                              <span class="border"></span>
                            </label>



                          </div> */}

                            <div class="field form-group col-4 custom-product-field">
                              <label for="quantity" class="inp">
                                <input
                                  type="number"
                                  id="quantity"
                                  name="item_inventory_quantity"
                                  placeholder="&nbsp;"
                                  value={shareholder.item_inventory_quantity}
                                  onChange={this.change(idx)}
                                />
                                <span class="label">Item Quantity</span>
                                <span class="border"></span>
                              </label>
                            </div>

                            <div class="field form-group col-4 custom-product-field">
                              {/* <p className="text-danger">
                            {this.validator.message(
                              "Quantity",
                              this.state.passitem_inventory_quantityword,
                              "required"
                            )}
                          </p> */}
                              <label for="price" class="inp">
                                <input
                                  type="number"
                                  id="price"
                                  placeholder="&nbsp;"
                                  name="item_price"
                                  value={shareholder.item_price}
                                  onChange={this.change(idx)}
                                />
                                <span class="label">Item Price</span>
                                <span class="border"></span>
                              </label>
                              {/* <input type="text"
                              name="item_inventory_quantity"
                              value={this.state.item_inventory_quantity}
                              onChange={e => this.handleChange(e)}
                              id="quantity"
                              placeholder="100" />

                            <label for="quantity">Item Quantity</label> */}
                            </div>

                            <div class="field form-group col-6 custom-product-field">
                              {/* <p className="text-danger">
                            {this.validator.message(
                              "Quantity",
                              this.state.passitem_inventory_quantityword,
                              "required"
                            )}
                          </p> */}
                              <label
                                for="batch"
                                class="inp inp_position_top_9"
                                name="item_batch"
                                value={shareholder.item_batch}
                                onChange={this.change(idx)}
                              >
                                <input id="batch" placeholder="&nbsp;" />
                                <span class="label">Batch Number</span>
                                <span class="border"></span>
                                <small>(e.g : ba0123456)</small> 
                              </label>
                              {/* <input type="text"
                              name="item_batch"
                              value={this.state.item_batch}
                              onChange={e => this.handleChange(e)}
                              id="batch"
                              placeholder="1256batc" />

                            <label for="batch">Batch Batch Number</label> */}
                              {/* <p className="text-danger">
                              {this.validator.message(
                                "Employee Name",
                                this.state.name,
                                "required|min:3|max:100"
                              )}
                            </p> */}
                            </div>

                            <div class="field form-group col-6 custom-product-field">
                              <label for="expiration" class="inp">
                                <input
                                  type="date"
                                  id="expiration"
                                  placeholder="&nbsp;"
                                  name="item_batch_expiry"
                                  value={shareholder.item_batch_expiry}
                                  onChange={this.change(idx)}
                                />
                                <span class="label">Batch Expiration Date</span>
                                <span class="border"></span>
                                 <small>(e.g : 05/25/2020)</small> 
                              </label>
                              {/* <input type="text"
                              name="item_batch_expiry"
                              value={this.state.item_batch_expiry}
                              onChange={e => this.handleChange(e)}
                              id="expiry"
                              placeholder="10/12/1997" />

                            <label for="expiry">Batch Expiration Date</label> */}
                              {/* <p className="text-danger">
                              {this.validator.message(
                                "Employee Name",
                                this.state.name,
                                "required|min:3|max:100"
                              )}
                            </p> */}
                            </div>
                            {/* <div class="field form-group col-4 custom-product-field">
                            <label for="cgst" class="inp" >
                              <input type="number" id="cgst" placeholder="&nbsp;" name="item_cgst_percentage" value={this.state.item_cgst_percentage} onChange={e => this.handleChange(e) }/>
                              <span class="label">CGST Percentage </span>
                              <span class="border"></span>
                            </label>
                           

                          </div> */}
                            {/* <div class="field form-group col-4 custom-product-field">
                            <label for="sgst" class="inp" >
                              <input type="number" id="sgst" placeholder="&nbsp;" name="item_sgst_percentage" value={this.state.item_sgst_percentage} onChange={e => this.handleChange(e)}/>
                              <span class="label">SGST Percentage</span>
                              <span class="border"></span>
                            </label>
                           

                          </div> */}
                            <div class="field form-group col-md-6">
                              <select
                                className="form-control"
                                style={{ width: "100%" }}
                                name="item_cgst_percentage"
                                value={shareholder.item_cgst_percentage}
                                onChange={this.taxClick(idx)}
                                // onChange={e=>{this.change(idx) ; this.taxClick(e)}}
                                // onChange={this.change(idx) }
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
                                className="col-sm-3 col-form-label"
                              >
                                CGST + SGST (%)
                              </label>
                            </div>
                            <div class="field form-group col-4 custom-product-field">
                              <label for="igst" class="inp">
                                <input
                                  id="igst"
                                  placeholder="&nbsp;"
                                  name="item_igst_percentage"
                                  value={shareholder.item_igst_percentage}
                                  onChange={this.change(idx)}
                                />
                                <span class="label">IGST Percentage</span>
                                <span class="border"></span>
                              </label>
                            </div>
                            <div class="field form-group col-4 custom-product-field">
                              <label for="cgst" class="inp">
                                <input
                                  type="text"
                                  id="cgst"
                                  placeholder="&nbsp;"
                                  name="item_cgst_amount"
                                  value={shareholder.item_cgst_amount}
                                  onChange={this.change(idx)}
                                  disabled
                                />
                                <span class="label">CGST Amount </span>
                                <span class="border"></span>
                              </label>
                            </div>
                            <div class="field form-group col-4 custom-product-field">
                              <label for="sgst" class="inp">
                                <input
                                  type="text"
                                  id="sgst"
                                  placeholder="&nbsp;"
                                  name="item_sgst_amount"
                                  value={shareholder.item_sgst_amount}
                                  onChange={this.change(idx)}
                                  disabled
                                />
                                <span class="label">SGST Amount</span>
                                <span class="border"></span>
                              </label>
                            </div>
                            <div class="field form-group col-4 custom-product-field">
                              <label for="igst" class="inp">
                                <input
                                  type="text"
                                  id="igst"
                                  placeholder="&nbsp;"
                                  name="item_igst_amount"
                                  value={shareholder.item_igst_amount}
                                  onChange={this.change(idx)}
                                  disabled
                                />
                                <span class="label">IGST Amount</span>
                                <span class="border"></span>
                              </label>
                            </div>

                            <div class="field form-group col-md-4 custom-product-field">
                              <label for="total" class="inp">
                                <input
                                  id="total"
                                  placeholder="&nbsp;"
                                  name=" item_sub_total"
                                  value={shareholder.item_sub_total}
                                  onChange={this.change(idx)}
                                  disabled
                                />
                                <span class="label">Sub-Total </span>
                                <span class="border"></span>
                              </label>
                              {/* <input type="text"
                              name="item_total_gst_amount"
                              value={this.state.item_total_gst_amount}
                              onChange={e => this.handleChange(e)}
                              id="fullname"
                              placeholder="50" />

                            <label for="fullname">Total GST Amount</label> */}
                              {/* <p className="text-danger">
                              {this.validator.message(
                                "Employee Name",
                                this.state.name,
                                "required|min:3|max:100"
                              )}
                            </p> */}
                            </div>
                            <div class="field form-group col-md-4 custom-product-field">
                              <label for="total" class="inp">
                                <input
                                  id="total"
                                  placeholder="&nbsp;"
                                  name="item_total_gst_amount"
                                  value={shareholder.item_total_gst_amount}
                                  onChange={this.change(idx)}
                                  disabled
                                />
                                <span class="label">Total GST Amount</span>
                                <span class="border"></span>
                              </label>
                              {/* <input type="text"
                              name="item_total_gst_amount"
                              value={this.state.item_total_gst_amount}
                              onChange={e => this.handleChange(e)}
                              id="fullname"
                              placeholder="50" />

                            <label for="fullname">Total GST Amount</label> */}
                              {/* <p className="text-danger">
                              {this.validator.message(
                                "Employee Name",
                                this.state.name,
                                "required|min:3|max:100"
                              )}
                            </p> */}
                            </div>
                            <div class="field form-group col-md-4 custom-product-field">
                              <label for="total" class="inp">
                                <input
                                  id="total"
                                  placeholder="&nbsp;"
                                  name="item_total"
                                  value={shareholder.item_total}
                                  onChange={this.change(idx)}
                                  disabled
                                />
                                <span class="label">Total Item Amount</span>
                                <span class="border"></span>
                              </label>
                              {/* <input type="text"
                              name="item_total_gst_amount"
                              value={this.state.item_total_gst_amount}
                              onChange={e => this.handleChange(e)}
                              id="fullname"
                              placeholder="50" />

                            <label for="fullname">Total GST Amount</label> */}
                              {/* <p className="text-danger">
                              {this.validator.message(
                                "Employee Name",
                                this.state.name,
                                "required|min:3|max:100"
                              )}
                            </p> */}
                            </div>

                            {/* <button
                          class="btn btn-primary"
                          onClick={this.handleSubmit.bind(this)}
                          style={{ float: 'right' }}
                        >
                          Submit
                  </button> */}
                          </div>
                          <hr />
                        </form>
                      </>
                    ))}

                    <button
                      type="button"
                      onClick={this.handleAddShareholder}
                      className="btn-info custom-more-btn"
                    >
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                      &nbsp;&nbsp;Add More Items
                    </button>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form className="row custom-content-form">
                      <div class="field form-group col-md-4 custom-product-field">
                        <label for="total" class="inp">
                          <input
                            id="total"
                            placeholder="&nbsp;"
                            name="subTotal"
                            value={this.state.subTotal}
                            disabled
                          />
                          <span class="label">Sub-Total</span>
                          <span class="border"></span>
                        </label>
                      </div>
                      <div class="field form-group col-md-4 custom-product-field">
                        <label for="total" class="inp">
                          <input
                            id="total"
                            placeholder="&nbsp;"
                            name="gstAmount"
                            value={this.state.gstAmount}
                            disabled
                          />
                          <span class="label">Total GST Amount</span>
                          <span class="border"></span>
                        </label>
                      </div>
                      <div class="field form-group col-md-4 custom-product-field">
                        <label for="total" class="inp">
                          <input
                            id="total"
                            placeholder="&nbsp;"
                            name="totalAmount"
                            value={this.state.totalAmount}
                            disabled
                          />
                          <span class="label">Total Amount</span>
                          <span class="border"></span>
                        </label>
                      </div>
                    </form>
                    <button
                      class="btn btn-primary"
                      onClick={this.handleSubmit.bind(this)}
                      style={{ float: "right" }}
                    >
                      Submit
                    </button>
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
    errors: state.errors,
    product: state.product,
    vendors: state.vendors
  };
}

export default connect(mapStateToProps, {
  postNewInventory,
  fetchTotalProduct,
  fetchTotalVendors
})(AddInventoryItem);
