import $ from "jquery";
import React, { Component } from "react";
import styles from "./Invoice.module.scss";
import { Link } from "react-router-dom";
import "./invoice.css";
import LineItems from "./LineItems";
import Example from "./InvoicePdf";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import { postNewInvoice } from "../../../store/actions/Invoice/invoice";
import { Whatsapp } from "../../Home/Whatsapp";
import { fetchHomeProduct } from "../../../store/actions/Product/homeProduct";
import Modal from "react-awesome-modal";
import axios from "axios";
import {
  COMPANY_NAME,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_PHONE,
  COMPANY_GSTIN,
  COMPANY_LOGO_PATH,
  COMPANY_TERMS_CONDITIONS,
} from "../../../constants/companyconstant";
import mainLogo from "../img/Elipi-logo-PNG--Business-card.png";

// var d = new Date();
class Invoice extends Component {
  locale = "en-IN";
  currency = "INR";

  state = {
    taxRate: 0.0,
    order_number: 0,
    cust_name: "Akash Goyal",
    cust_mobile: "8019808705",
    sub_total: 0,
    gst_percentage: 0,
    gst_amount: 0,
    total: 0,
    lineItems: [
      {
        id: 1, // react-beautiful-dnd unique key
        name: "",
        item: "",
        quantity: 1,
        price: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
      },
    ],
    visible: false,
    prodid: "",
    prodbatch: "",
    prodcgst: "",
    prodcostprice: "",
    prodfree: "",
    prodhsn: "",
    prodigst: "",
    prodsellingprice: "",
    prodsgst: "",
    customerAmount: 0,
    local_storage_item_arr: [],
  };
  openModal() {
    this.setState({
      visible: true,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }

  // timeStr(d) {
  //   return '' +
  //     d.getFullYear() +
  //     ('0' + (d.getMonth() + 1)).slice(-2) +
  //     ('0' + d.getDate()).slice(-2) +
  //     ('0' + d.getHours()).slice(-2) +
  //     ('0' + d.getMinutes()).slice(-2) +
  //     ('0' + d.getSeconds()).slice(-2);
  //     console.log('neworder',d)
  // }

  // manualprint() {
  //   $().ready(function () {
  //     $('.modal.printable').on('shown.bs.modal', function () {
  //       $('.modal-dialog', this).addClass('focused');
  //       $('body').addClass('modalprinter');

  //     }).on('hidden.bs.modal', function () {
  //       $('.modal-dialog', this).removeClass('focused');
  //       $('body').removeClass('modalprinter');
  //     });
  //   });
  // }
  componentWillMount() {
    var d = new Date();
    function timeStr(d) {
      return (
        "" +
        d.getFullYear() +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        ("0" + d.getDate()).slice(-2) +
        ("0" + d.getHours()).slice(-2) +
        ("0" + d.getMinutes()).slice(-2) +
        ("0" + d.getSeconds()).slice(-2)
      );
    }

    timeStr(d);
    // this.setState({
    //   order_number : timeStr(d)
    // })
    this.state.order_number = timeStr(d);

    //print setgment below

    this.forceUpdate();
    // this.manualprint();
  }

  componentDidMount() {
    this.props.fetchHomeProduct(this.props);
  }

  handleInvoiceChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLineItemChange = (elementIndex) => async (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item;
      return { ...item, [event.target.name]: event.target.value };
    });
    await this.setState({ lineItems });
    // console.log("line item check",this.state.lineItems[elementIndex].cgst, this.state.lineItems[elementIndex].quantity)
    // this.state.lineItems[elementIndex].cgst=this.state.lineItems[elementIndex].cgst*this.state.lineItems[elementIndex].quantity;
    // this.forceUpdate();
    // this.setState({ lineItems });
    console.log("line item check", this.state.lineItems[elementIndex]);
    // console.log('items',i)
    this.itemChange(
      this.state.lineItems[elementIndex].batch,
      this.state.lineItems[elementIndex].item,
      elementIndex
    );
  };

  itemChange = async (batch, prodId, elementIndex) => {
    // console.log("batch",batch, prodId)
    let prod = await this.props.homeproduct.filter(
      (homeproduct) => homeproduct.id == prodId
    );
    let lineItems = this.state.lineItems.map((item, i) => {
      //  console.log('prodhere', prod.length)
      // console.log(prod[0].id)
      // let newprodidhere = prod[0].id
      // console.log('newprodid',newprodidhere)
      this.setState({
        prodid: prod[0].id,
        prodcgst: prod[0].cgst,
        prodcostprice: prod[0].costPrice,
        prodfree: prod[0].free,
        prodhsn: prod[0].hsn,
        prodigst: prod[0].igst,
        prodsellingprice: prod[0].sellingPrice,
        prodsgst: prod[0].sgst,
      });

      if (prod.length > 0) {
        // console.log("item",i)
        // console.log("ele",elementIndex)
        if (elementIndex !== i) {
          return item;
        }
        console.log("new", this.state.lineItems[i].quantity);
        let newItem = {
          item: prodId,
          price: prod[0].sellingPrice,
          name: prod[0].name,
          cgst:
            (prod[0].cgst *
              this.state.lineItems[i].quantity *
              prod[0].sellingPrice) /
            100,
          sgst:
            (prod[0].sgst *
              this.state.lineItems[i].quantity *
              prod[0].sellingPrice) /
            100,
          igst:
            (prod[0].igst *
              this.state.lineItems[i].quantity *
              prod[0].sellingPrice) /
              100 || "0",
          batch: batch,
          cost_price: prod[0].costPrice,
          free: prod[0].free,
          hsn: prod[0].hsn,
          selling_price: prod[0].sellingPrice,
          discount: "0",
        };
        console.log("new", newItem);
        return { ...item, ...newItem };
        // this.state.newitemarr = newItem
      }
      // console.log('idhere',item.id)
    });
    await this.setState({ lineItems });
    // console.log("new",this.state);
  };

  handleAddLineItem = (event) => {
    let id = 1;
    this.setState({
      lineItems: this.state.lineItems.concat([
        {
          id: ++id,
          name: "",
          item: "",
          quantity: 1,
          price: 0,
          sgst: 0,
          igst: 0,
          cgst: 0,
        },
      ]),
    });
  };

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i;
      }),
    });
  };

  handleReorderLineItems = (newLineItems) => {
    this.setState({
      lineItems: newLineItems,
    });
  };

  handleFocusSelect = (event) => {
    event.target.select();
  };

  handlePrintButtonClick = async (event) => {
    event.preventDefault();
    let body = {
      ui_order_number: this.state.order_number,
      ui_cust_name: this.state.cust_name,
      ui_cust_mobile: this.state.cust_mobile,
      ui_sub_total: this.formatCurrency(this.calcLineItemsTotal()),
      ui_gst_percentage: this.state.taxRate,
      ui_gst_amount: this.formatCurrency(this.calcTaxTotal()),
      ui_total: this.formatCurrency(this.calcGrandTotal()),
      ui_items: this.state.lineItems,
    };
    // console.log('value here', body)
    // console.log('state', this.state)
    this.props.postNewInvoice(body);
    console.log(this.state.lineItems);

    // await localStorage.setItem('lineItem', JSON.stringify(this.state.lineItems));
    // localStorage.setItem('subtotal', this.formatCurrency(this.calcLineItemsTotal()));
    // localStorage.setItem('gst', this.state.taxRate);
    // localStorage.setItem('amount', this.formatCurrency(this.calcGrandTotal()));
    // this.forceUpdate();
    // this.openModal()
  };

  // print = () => {
  //   // event.preventDefault();

  //   window.print();
  // };

  formatCurrency = (amount) => {
    return new Intl.NumberFormat(this.locale, {
      // style: 'currency',
      // currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  calcTaxAmount = (c) => {
    return c * (this.state.taxRate / 100);
    console.log("gstpricehere", c);
  };
  cgstTaxAmount = (cgstamt) => {
    return cgstamt * (this.state.taxRate / 100);
    // console.log('gstpricehere', c)
  };

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce(
      (prev, cur) => prev + cur.quantity * cur.price,
      0
    );
  };
  calcSgstTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => prev + +cur.sgst, 0);
  };
  calcCgstTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => prev + +cur.cgst, 0);
  };
  calcIgstTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => prev + +cur.igst, 0);
  };
  calcTaxTotal = () => {
    // return this.calcLineItemsTotal() * (this.state.taxRate / 100)

    // return +this.state.prodcgst + +this.state.prodigst + +this.state.prodsgst

    return this.state.lineItems.reduce(
      (prev, cur) => prev + (+cur.cgst + +cur.sgst + +cur.igst),
      0
    );
  };

  calcGrandTotal = () => {
    return this.calcLineItemsTotal() + this.calcTaxTotal();
    // return this.calcLineItemsTotal()
  };

  printDiv = async (state) => {
    // this.state.lineItems.map(item)

    let body = {
      ui_order_number: this.state.order_number,
      ui_cust_name: this.state.cust_name,
      ui_cust_mobile: this.state.cust_mobile,
      ui_sub_total: this.calcLineItemsTotal(),
      ui_gst_percentage: this.state.taxRate,
      ui_gst_amount: this.calcTaxTotal(),
      ui_total_gst_amount: this.calcTaxTotal(),
      ui_total: this.calcGrandTotal(),
      ui_sgst_percentage: this.state.prodsgst,
      ui_sgst_amount: this.calcSgstTotal(),
      ui_cgst_percentage: this.state.prodcgst,
      ui_cgst_amount: this.calcCgstTotal(),
      ui_igst_percentage: this.state.prodigst,
      ui_igst_amount: this.calcIgstTotal(),
      ui_items: this.state.lineItems,
    };

    // console.log('value here', body)
    // let res = await this.props.postNewInvoice(body);
    // console.log("inbvoiceres", res);
    //  if (res.status == 200) {
    //   console.log("response got");
    //   window.print();
    //   alert(res.data.data.description)
    //    window.location.reload();
    // } else {
    //   console.clear();
    //   console.log('bill response',res.error.data.message)
    // }
    this.state.local_storage_item_arr.push({
      ui_order_number: this.state.order_number,
      ui_cust_name: this.state.cust_name,
      ui_cust_mobile: this.state.cust_mobile,
      ui_sub_total: this.calcLineItemsTotal(),
      ui_gst_percentage: this.state.taxRate,
      ui_gst_amount: this.calcTaxTotal(),
      ui_total_gst_amount: this.calcTaxTotal(),
      ui_total: this.calcGrandTotal(),
      ui_sgst_percentage: this.state.prodsgst,
      ui_sgst_amount: this.calcSgstTotal(),
      ui_cgst_percentage: this.state.prodcgst,
      ui_cgst_amount: this.calcCgstTotal(),
      ui_igst_percentage: this.state.prodigst,
      ui_igst_amount: this.calcIgstTotal(),
      ui_items: this.state.lineItems,
    });
    console.clear();
    console.log(this.state.local_storage_item_arr);
    localStorage.setItem(
      "new_local_storage_arr",
      JSON.stringify(this.state.local_storage_item_arr)
    );
    window.print();
    // console.log(
    //   'lineitemtotalarr',this.state.lineItems
    // )

    //  if (res.status == 200) {
    //   console.log("response got");
    //   var divToPrint = document.getElementById("DivIdToPrint");
    //   var newWin = await window.open("", "Print-Window");
    //   newWin.document.open();
    //   newWin.document.write(
    //     '<html><body onload="window.print()">' +
    //       divToPrint.innerHTML +
    //       "</body></html>"
    //   );
    //   newWin.document.write(
    //     '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">'
    //   );
    //   newWin.document.close();

    //   setTimeout(function() {
    //     newWin.print();
    //   }, 1000);
    // setTimeout(function () { newWin.close(); }, 1000);
    // window.location.reload();
    // } else {
    //   console.clear();
    //   console.log('bill response',res.error.data.message)
    //   // alert("Please select a valid item from the list");
    //   // window.location.reload();
    // }
  };

  render = () => {
    return (
      <div>
        <section className="parent-wrapper">
          <section className="header-sec">
            <div className="container-fluid">
              <div className="row">
                <div className="col-6">
                  <h1 style={{ paddingTop: "50px" }}>Invoice</h1>
                </div>
                <div className="col-6">
                  {/* <img src={require('../img/2492003.png')} className="img-fluid" alt="logo" style={{ width: '50%' }} /> */}
                  <img
                    // src = {COMPANY_LOGO_PATH}
                    // src={require('../img/Elipi-logo-PNG--Business-card.png')}
                    src={mainLogo}
                    className="img-fluid"
                    alt="logo"
                    style={{ width: "30%" }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mid-sec">
            <div className="container-fluid">
              <div className="row">
                <div className="col-6">
                  <h3>From</h3>
                  <div className="form-group row">
                    <label
                      for="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Name
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        value={COMPANY_NAME}
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Email
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="john@gmail.com"
                        value={COMPANY_EMAIL}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Address
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={COMPANY_ADDRESS}
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Phone
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="(+91) 876-404-9758"
                        value={COMPANY_PHONE}
                        disabled
                      />
                    </div>
                  </div>
                  {/* <div class="form-group row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">GSTIN</label>
                    <div class="col-sm-10">
                      <input className="form-control" placeholder="E.g : 123456789" value={COMPANY_GSTIN} disabled />
                    </div>
                  </div> */}
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      D/L No.
                    </label>
                    <div class="col-sm-10">
                      <input
                        className="form-control"
                        placeholder="E.g : 123456789"
                        value="20/1162/10/2019"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <h3>To</h3>
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Order No.
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="number"
                        class="form-control"
                        id="inputPassword"
                        name="order_number"
                        value={this.state.order_number}
                        // onChange={event => this.handleInvoiceChange(event)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Name
                    </label>
                    <div class="col-sm-10">
                      {/* <input type="text" className="form-control" placeholder="John Doe" /> */}
                      <input
                        type="text"
                        class="form-control"
                        id="inputPassword"
                        name="cust_name"
                        value={this.state.cust_name}
                        onChange={(event) => this.handleInvoiceChange(event)}
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      Phone
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="number"
                        class="form-control"
                        id="inputPassword"
                        name="cust_mobile"
                        value={this.state.cust_mobile}
                        onChange={(event) => this.handleInvoiceChange(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-12">
                  <hr />
                </div>
              </div> */}

              {/* <div className="row">
                <div className="col-12">
                  <div className="form-group row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Number</label>
                    <div class="col-sm-10">
                      <input type="text" className="form-control-plaintext" placeholder="John Doe" value="123456798" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Date</label>
                    <div class="col-sm-10">
                      <input type="email" className="form-control" placeholder="john@gmail.com" value={new Date()} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Terms</label>
                    <div class="col-sm-10">
                      <select class="form-control" id="exampleFormControlSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div> */}

              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <LineItems
                    items={this.state.lineItems}
                    currencyFormatter={this.formatCurrency}
                    addHandler={this.handleAddLineItem}
                    changeHandler={this.handleLineItemChange}
                    itemChange={this.itemChange}
                    focusHandler={this.handleFocusSelect}
                    deleteHandler={this.handleRemoveLineItem}
                    reorderHandler={this.handleReorderLineItems}
                  />

                  {/* <table class="table item-table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Item</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Price</th>
                      <th scope="col">total</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td><input name="name" type="text" value={this.state.name} onChange={event => this.handleInvoiceChange(event)} /></td>
                      <td>1</td>
                      <td><input name="quantity" type="number" step="1" min="1" value={this.state.quantity} onChange={event => this.handleInvoiceChange(event)} onFocus={this.props.focusHandler} /></td>
                      <td>0</td>
                      <td><i class="lni-trash" onClick={event => this.handleRemoveLineItem(event)}></i></td>
                    </tr>

                     <tr>
                      <th scope="row">1</th>
                      <td><input name="name" type="text" value={this.state.name} onChange={event => this.handleInvoiceChange(event)} /></td>
                      <td>1</td>
                      <td><input name="quantity" type="number" step="1" min="1" value={this.state.quantity} onChange={event => this.handleInvoiceChange(event)} onFocus={this.props.focusHandler} /></td>
                      <td>0</td>
                      <td><i class="lni-trash" onClick={event => this.handleRemoveLineItem(event)}></i></td>
                    </tr>

                  </tbody>
                </table> */}
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
              </div>

              <div className="row">
                <div className="col-8">
                  <table className="table table-bordered table-responsive-sm table-responsive-md">
                    <thead>
                      <tr>
                        <th scope="col ">Total CGST</th>
                        <th scope="col ">Total SGST</th>
                        <th scope="col ">Total IGST</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">
                          {" "}
                          {this.formatCurrency(this.calcCgstTotal())}
                        </td>
                        <td scope="row">
                          {" "}
                          {this.formatCurrency(this.calcSgstTotal())}
                        </td>
                        <td scope="row">
                          {" "}
                          {this.formatCurrency(this.calcIgstTotal())}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-4">
                  <div className="gst-right-sec">
                    <form>
                      <div
                        className={styles.valueTable}
                        style={{ float: "right" }}
                      >
                        <div className={styles.row}>
                          <div className={styles.label}>Sub Total Amount </div>
                          <div
                            className={`${styles.value} `}
                            style={{ marginLeft: "auto" }}
                          >
                            {this.formatCurrency(this.calcLineItemsTotal())}
                          </div>
                        </div>

                        <div className={styles.row}>
                          <div className={styles.label}> Total GST </div>
                          <div
                            className={`${styles.value} `}
                            style={{ marginLeft: "auto" }}
                          >
                            {this.formatCurrency(this.calcTaxTotal())}
                          </div>
                        </div>
                        <div className={styles.row}>
                          <div className={styles.label}>Total Amount </div>
                          <div
                            className={`${styles.value} `}
                            style={{ marginLeft: "auto" }}
                          >
                            {this.formatCurrency(this.calcGrandTotal())}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div className="col-12">
                <table className="table table-bordered table-responsive-sm table-responsive-md">
                                <thead>
                                    <tr>
                                        <th scope="col ">Item Prices</th>
                                        <th scope="col ">CGST</th>
                                        <th scope="col ">SGST</th>
                                        <th scope="col ">IGST</th>
                                        <th scope="col ">GST</th>
                                        <th scope="col ">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                                <tr>
                                                    <td scope="row"> {this.formatCurrency(this.calcLineItemsTotal())}</td>
                                                    <td scope="row"> {this.formatCurrency(this.calcCgstTotal())}</td>
                                                    <td scope="row"> {this.formatCurrency(this.calcSgstTotal())}</td>
                                                    <td scope="row"> {this.formatCurrency(this.calcIgstTotal())}</td>
                                                    <td scope="row">  {this.formatCurrency(this.calcTaxTotal())}</td>
                                                    <td scope="row">{this.formatCurrency(this.calcGrandTotal())}</td>
                                                </tr>
                                          
                                </tbody>
                            </table>
                </div> */}
                {/* <div className="col-6">
                  <div className="gst-left-sec">
                    <form>
                      <div className={styles.valueTable}>
                        <div className={styles.row}>
                          <div className={styles.label}>Amount By Customer</div>
                          <div className={styles.value}>
                            <input name="customerAmount" type="number" step="1" value={this.state.customerAmount} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} /></div>
                        </div>
                         Amount to Return <h3>{this.state.customerAmount - this.formatCurrency(this.calcGrandTotal())>0?(this.state.customerAmount - this.formatCurrency(this.calcGrandTotal())).toFixed(2):""}</h3> 
                      </div>
                    </form>
                  </div>
                </div> */}
                {/* <div className="col-6">
                  <div className="gst-right-sec">
                    <form>
                      <div className={styles.valueTable} style={{ float: 'right' }}>
                        <div className={styles.row}>
                          <div className={styles.label}>Items Price</div>
                          <div className={`${styles.value} `}>
                          {this.formatCurrency(this.calcLineItemsTotal())}</div>
                        </div>
                        <div className={styles.row}>
                          <div className={styles.label}> Total SGST </div>
                          <div className={`${styles.value} `}>
                          {this.formatCurrency(this.calcSgstTotal())}</div>
                        </div>
                        <div className={styles.row}>
                          <div className={styles.label}> Total CGST </div>
                          <div className={`${styles.value} `}>
                          {this.formatCurrency(this.calcCgstTotal())}</div>
                        </div>
                        <div className={styles.row}>
                          <div className={styles.label}> Total IGST </div>
                          <div className={`${styles.value} `}>
                          {this.formatCurrency(this.calcIgstTotal())}</div>
                        </div>
                        <div className={styles.row}>
                          <div className={styles.label}> Total GST </div>
                          <div className={`${styles.value} `}>
                          {this.formatCurrency(this.calcTaxTotal())}</div>
                        </div>
                        <div className={styles.row}>
                          <div className={styles.label}>Total Amount</div>
                          <div className={`${styles.value} `}>{this.formatCurrency(this.calcGrandTotal())}</div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div> */}
              </div>
              <div className="row">
                <div className="col-12">
                  <hr />
                </div>
              </div>
            </div>
          </section>

          <section className="print-sec">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <button
                    className="btn btn-info"
                    type="button"
                    onClick={this.handlePrintButtonClick}
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                    style={{ float: "left" }}
                  >
                    {/* <Link to={`${process.env.PUBLIC_URL}/print`}>  */}
                    Print Now
                    {/* </Link> */}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/*experiment modal*/}
          {/* <Modal visible={this.state.visible} width="600" height="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <div  style={{ padding: '20px' }}>
              <div className="company-detail">
                <strong>Elipi Software Solution</strong><br />
                Address : 131-201 Anmol Regency<br />
                brijeshwari annaxe, Ashish nagar, Indore<br />
                Phone : 8370088555
                          </div>
              <hr />
              <table className="table table-bordered">
                <caption>Invoice</caption>
                <thead className="modal-table-head">
                  <th>Sr.No.</th>
                  <th>Item: </th>
                  <th>Rate: </th>
                  <th>Qty: </th>
                </thead>
                <tbody>
                  {this.state.lineItems ? (this.state.lineItems.map(function (item, id) {
                    return (
                      <tr key={id}>
                        <th >{item.id}</th>
                        <th >{item.item}</th>
                        <th>{item.price}</th>
                        <th>{item.quantity}</th>
                      </tr>
                    );
                  }, this)
                  ) : (<span>Data is loading....</span>)}
                </tbody>
              </table>
              <hr />
              <div className="footer-price-content">
                <div className="row">
                  <div className="col-6">
                    <p style={{ float: 'left', fontSize: '20px' }}><strong>Item Price : </strong></p>

                  </div>

                  <div className="col-6">
                    <p style={{ float: 'right' }}><strong>{localStorage.getItem('subtotal')}</strong></p>
                  </div>

                  <div className="col-6">
                    <p style={{ float: 'left', fontSize: '20px' }}><strong>GST (%) : </strong></p>

                  </div>
                  <div className="col-6">
                    <p style={{ float: 'right' }}><strong>{localStorage.getItem('gst')}</strong></p>
                  </div>

                  <div className="col-6">
                    <p style={{ float: 'left', fontSize: '20px' }}><strong>Amount : </strong></p>

                  </div>
                  <div className="col-6">
                    <p style={{ float: 'right' }}><strong>{localStorage.getItem('amount')}</strong></p>
                  </div>
                  <div className="col-12">
                    <hr />
                    <p>**Terms &amp; Condition</p>
                    <small style={{ color: '#989898' }}>**This following sets out the terms and conditions on which you may use the content on business-standard.com</small>
                  </div>
                </div>
              </div>
            </div>
            <a href="javascript:void(0);" onClick={this.printDiv}>print this!!</a>
          </Modal> */}
          {/*end modal*/}
          <section className="modal-content">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div
                    class="modal fade printable autoprint bd-example-modal-lg"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="myLargeModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-lg"
                      role="document"
                      id="DivIdToPrint"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Billing Information
                          </h5>
                          <button
                            type="button"
                            class="close d-print-none"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body custom_modal_width_invoice">
                          <div className="company-detail">
                            <strong>{COMPANY_NAME}</strong>
                            <br />
                            {COMPANY_ADDRESS}
                            <br />
                            Phone : {COMPANY_PHONE}
                            <br />
                            GSTIN : {COMPANY_GSTIN}
                          </div>
                          <hr />
                          <table className="table table-bordered custom_modal_width_invoice_table">
                            <caption>Invoice</caption>
                            <thead className="modal-table-head thead-light custom_modal_table_invoice_thead">
                              <th>Sr.No.</th>
                              <th>Item: </th>
                              {/*<th>Batch Nummber</th>
                              <th>HSN</th>*/}

                              <th>Rate: </th>
                              <th>Qty: </th>
                            </thead>
                            <tbody>
                              {this.state.lineItems ? (
                                this.state.lineItems.map(function (item, id) {
                                  return (
                                    <tr key={id}>
                                      <td>{item.id}</td>
                                      <td>{item.name}</td>
                                      {/*<td>{item.batch || 'NO DATA'}</td>
                                      <td>{item.hsn || 'NO DATA'}</td>*/}
                                      <td>{item.price}</td>
                                      <td>{item.quantity}</td>
                                    </tr>
                                  );
                                }, this)
                              ) : (
                                <span>Data is loading....</span>
                              )}
                            </tbody>
                          </table>
                          <hr />
                          <div className="footer-price-content">
                            <div className="row">
                              <div className="col-8">
                                <p style={{ float: "left", fontSize: "20px" }}>
                                  <strong>Item Price : </strong>
                                </p>
                              </div>

                              <div className="col-4">
                                <p style={{ float: "right" }}>
                                  <strong>
                                    {this.formatCurrency(
                                      this.calcLineItemsTotal()
                                    )}
                                  </strong>
                                </p>
                              </div>

                              <div className="col-8">
                                <p style={{ float: "left", fontSize: "20px" }}>
                                  <strong>Total GST : </strong>
                                </p>
                              </div>
                              <div className="col-4">
                                <p style={{ float: "right" }}>
                                  <strong>
                                    {this.formatCurrency(this.calcTaxTotal())}
                                  </strong>
                                </p>
                              </div>

                              <div className="col-8">
                                <p style={{ float: "left", fontSize: "20px" }}>
                                  <strong>Amount : </strong>
                                </p>
                              </div>
                              <div className="col-4">
                                <p style={{ float: "right" }}>
                                  <strong>
                                    {this.formatCurrency(this.calcGrandTotal())}
                                  </strong>
                                </p>
                              </div>
                              <div className="col-12">
                                <hr />
                                <p>**Terms &amp; Condition</p>
                                <small style={{ color: "#989898" }}>
                                  {COMPANY_TERMS_CONDITIONS}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary d-print-none"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary d-print-none"
                            // id="btnPrint"
                            // onClick={this.manualprint}
                            // onClick={this.print}
                            onClick={this.printDiv}
                            // onClick={window.print()}
                          >
                            <i class="lni-printer"></i>&nbsp;&nbsp;Print
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>

            {/* </div> */}
          </section>

          <section className="whatsapp-sec">
            <div className="row">
              <div className="col-12">
                <Whatsapp />
              </div>
            </div>
          </section>

          {/* <div className={styles.invoice}>
          <div >
            <div style={{ float: 'left' }} >
              <strong>Elipi Software Solution</strong><br />
              131-201 Anmol Regency<br />
              brijeshwari annaxe, Ashish nagar, Indore<br />
              8370088555
          </div>
            <div style={{ float: 'right' }}>
              <div ><strong>Customer Id:</strong> 123456<br />
                <strong>Invoice No.: </strong>123456<br />
                <strong>Date:</strong>{new Date().toJSON().slice(0, 10).replace(/-/g, '/')}</div>
            </div>
          </div>
          <br />
          <br />

          <h3>Invoice</h3>

          <LineItems
            items={this.state.lineItems}
            currencyFormatter={this.formatCurrency}
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
            deleteHandler={this.handleRemoveLineItem}
            reorderHandler={this.handleReorderLineItems}
          />

          <div className={styles.totalContainer}>
            <form>
              <div className={styles.valueTable}>
                <div className={styles.row}>
                  <div className={styles.label}>GST (%)</div>
                  <div className={styles.value}>
                    <input name="taxRate" type="number" step="1" value={this.state.taxRate} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} /></div>
                </div>
              </div>
            </form>
            <form>
              <div className={styles.valueTable}>
                <div className={styles.row}>
                  <div className={styles.label}>Items Price</div>
                  <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLineItemsTotal())}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.label}>GST ({this.state.taxRate}%)</div>
                  <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcTaxTotal())}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.label}>Total Amount</div>
                  <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcGrandTotal())}</div>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.pay}>
            <button className={styles.payNow} onClick={this.handlePrintButtonClick}><Link to={`${process.env.PUBLIC_URL}/print`}> Print Now </Link></button>
          </div>
        </div> */}
        </section>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    // product: state.product,
    homeproduct: state.homeproduct,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, {
  postNewInvoice,
  fetchHomeProduct,
})(Invoice);
