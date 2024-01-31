import React, { Component } from 'react'
import "./invoice.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchInvoice } from "../../../store/actions/Invoice/invoice";
import axios from 'axios'
import { Whatsapp } from '../../Home/Whatsapp';
import { API_URL } from '../../../url/url'
export class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_no_count: "",
      limit: 10,
      click: 0,
      itemname: '',
      price: '',
      quantity: '',
      orderdetails: [],
      totalcgcstamount: '',
      totalsgstamount: '',
      totaligstamount: '',
      totalprice: "",
      totalquantity: '',
      cgstpercentage: '',
      sgstpercentage: '',
      igstpercentage: '',
      total: '',
      subtotal: ''

    };
    this.detailCheck = this.detailCheck.bind(this);
  }
  handleClick() {
    this.props.fetchInvoice(this.props);
  }
  componentDidMount() {
    this.handleClick();

  }
  detailCheck(item) {
    console.log(item.orderId);
    localStorage.setItem("billingid", item.orderId);
    axios
      .get(
        `${API_URL}billing/details/${item.orderId}`,
        (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
          "jwt"
        ))
      )
      .then(response => {
        console.log('billingre', response)
        // this.state.orderdetails = response.data.data.items[0].orderSummary
        console.log(this.state.orderdetails);
        this.setState({
          // itemname: response.data.data.items[0].orderitems.itemName,
          // price: response.data.data.items[0].orderitems.itemPrice,
          // quantity: response.data.data.items[0].orderitems.quantity,
          orderdetails: response.data.data.items[0].orderItems,
          totalcgcstamount: response.data.data.items[0].orderSummary.totalCGSTAmount,
          totalsgstamount: response.data.data.items[0].orderSummary.totalSGSTAmount,
          totaligstamount: response.data.data.items[0].orderSummary.totalIGSTAmount,
          totalprice: response.data.data.items[0].orderSummary.total,
          cgstpercentage: response.data.data.items[0].orderSummary.cgst,
          sgstpercentage: response.data.data.items[0].orderSummary.sgst,
          igstpercentage: response.data.data.items[0].orderSummary.igst,
          total: response.data.data.items[0].orderSummary.total,
          subtotal: response.data.data.items[0].orderSummary.subTotal
          // totalquantity : response.data.data.items[0].orderSummary.totalCGSTAmount
          // jobcategories: response.data.data.items[0][0].jobCategories,
          // jobtype: response.data.data.items[0][0].jobType,
          // jobdesc: response.data.data.items[0][0].jobDescription
        });
        // let data = response.data.data.items[0]
        // this.state.jobdetail = data
        // if(this.state.jobdetail.length > 0){
        //   this.state.detailshow = true
        // }
      })
      .catch(error => {
        console.log(error);
      });

    // this.props.fetchInvoice();
  }
  prevhandler() {
    let dataskip = --this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    let no_pages = this.props.match.params.id;
    console.log("no-pages", no_pages);
    this.props.history.push(`/Billing/${this.props.match.params.id}`);
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
    this.props.history.push(`/Billing/${this.props.match.params.id}`);
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
  }

  render() {

    let prevbtndipsplay;
    let nextbtndisplay;
    let billing_table;
    // let page_count = localStorage.getItem('new_page_count');
    // let final_page_count = localStorage.getItem('number_of_pages')
    // console.log('page_count',page_count)
    // console.log('no_page',final_page_count)
    const { invoice } = this.props;
    // const { jobdetail } = this.props;
    if(invoice.length == 0) {
      billing_table = (
        <center>
        <p style={{fontSize : '18px'}}>There are no orders Today.</p>
        </center>
        )
    } else {
      billing_table = (
         <table className="table table-bordered table-responsive-sm table-responsive-md">
                <thead>
                  <tr>
                    <th scope="col">Action</th>
                    {/* <th scope="col">Order Id</th> */}
                    <th scope="col">Customer Name</th>
                    <th scope="col">Customer Mobile</th>
                    <th scope="col">Order Number</th>
                    <th scope="col">Date Of Purchase</th>
                    <th scope="col">GST Amount</th>
                    {/* <th scope="col">GST Percentage</th> */}
                    <th scope="col">Sub Total (Before GST)</th>
                    <th scope="col">Total (After GST)</th>

                  </tr>
                </thead>
                <tbody>
                  {invoice.length ? (
                    invoice.map(function (item, id) {
                      let newDate = new Date(item.dateOfPurchase);
                      newDate = newDate.toDateString();
                      return (
                        <tr key={id}>
                          <td>


                            <span
                              class="tooltip-toggle"
                              aria-label="Details"
                              tabindex="0"
                            >
                              <button
                                className="btn btn-success custom-edit-btn btn-sm"
                                onClick={this.detailCheck.bind(this, item)}
                                data-toggle="modal"
                                data-target=".bd-example-modal-lg"
                              >
                                <i class="fa fa-eye" aria-hidden="true" />
                              </button>
                            </span>

                          </td>
                          {/* <td scope="row">{item.orderId || "NO DATA"}</td> */}
                          <td scope="row">{item.customerName || "NO DATA"}</td>
                          <td scope="row">{item.customerMobile || "NO DATA"}</td>
                          <td scope="row">{item.orderNumber || "NO DATA"}</td>
                          <td scope="row">{newDate || "NO DATA"}</td>
                          <td scope="row">{item.GSTAmount || "0"}</td>
                          {/* <td scope="row">{item.GSTPercentage || "0"}</td> */}
                          <td scope="row">{item.subTotal || "NO DATA"}</td>
                          <td scope="row">{item.total || "NO DATA"}</td>

                        </tr>
                      );
                    }, this)
                  ) : (
                  <tr>
                    <td colSpan="7">
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
              <li class="breadcrumb-item active">Billing Table </li>
            </ul>
          </div>
        </div>
        <br />
        <div className="card">
          <div class="card-body">


            <div>
             {billing_table}
              <div className="row">
                <div className="col-lg-3 offset-lg-3 offset-md-3 col-md-3 col-sm-12 col-xs-12 text-center">
                  {prevbtndipsplay}
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
                  {nextbtndisplay}
                </div>
                <div className="col-12">
                  <div
                    class="modal fade bd-example-modal-lg"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-lg" role="document">
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
                          <table className="table table-bordered table-responsive table-responsive-md table-responsive-sm">
                            <thead>
                              <tr>
                                <th scope="col ">Item Name</th>
                                <th scope="col">Batch</th>
                                <th scope="col">HSN</th>
                                <th scope="col">Quantity</th>
                                <th scope="col ">Cost Price </th>
                                <th scope="col ">Selling Price </th>  
                                <th scope="col">Discount</th>
                                <th scope="col ">CGST </th>
                                <th scope="col ">SGST </th>
                                <th scope="col ">IGST </th>

                                {/* <th scope="col ">Subtotal</th>
                                <th scope="col ">Total</th> */}
                                {/* <th scope="col ">Quantity</th> */}

                              </tr>
                            </thead>
                            <tbody>
                              {this.state.orderdetails.length ? (
                                this.state.orderdetails.map(function (item, id) {
                                  return (
                                    <tr key={id}>
                                      <td scope="row">{item.itemName || "NO DATA"}</td>
                                      <td scope="row">{item.batch || "NO DATA"}</td>
                                      <td scope="row">{item.itemHSN || "NO DATA"}</td>
                                      <td scope="row">{item.quantity || "0"}</td>
                                      <td scope="row">{item.costPrice || '0'}</td>
                                      <td scope="row">{item.sellingPrice || "0"}</td>
                                      <td scope="row">{item.discount || "0"}</td>
                                      <td scope="row">{item.CGST || "0"}</td>
                                      <td scope="row">{item.SGST || "0"}</td>
                                      <td scope="row">{item.IGST || "0"}</td>

                                      {/* <td scope="row">{this.state.subtotal || "NO DATA"}</td>
                                      <td scope="row">{this.state.total || "NO DATA"}</td> */}
                                      {/* <td scope="row">{item.quantity || "NO DATA"}</td> */}

                                    </tr>
                                  );
                                }, this)
                              ) : (
                              <tr>
                                <td colSpan="10">
                                  <center>
                                  <span className="data_loading"></span>
                                  </center>
                                 </td>
                                </tr>  
                                )}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    invoice: state.invoice,
    currentUser: state.currentUser.user.id // we only need the current user's id, to check against the user id of each message
  };
}

export default connect(
  mapStateToProps,
  { fetchInvoice }
)(Billing);
