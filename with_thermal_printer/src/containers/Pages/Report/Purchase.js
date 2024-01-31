import React, { Component } from 'react'
import "./sale.css";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchPurchaseReport} from '../../../store/actions/Sale/sale';
import axios from 'axios'
import { Whatsapp } from '../../Home/Whatsapp';
import Workbook from 'react-excel-workbook'
export class PurchaseReport extends Component {
    componentDidMount() {
        this.props.fetchPurchaseReport(this.props);
    }

    render() {
        const { purchase } = this.props;
        return (
            <div>
                <div class="breadcrumb-holder">
                    <div class="container-fluid">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li class="breadcrumb-item active">Purchase Report </li>
                        </ul>
                    </div>
                </div>
                <br />
                <div className="card">
                    <div class="card-body">


                        <div className="row">
                            <div className="col-6">
                                <Link to="/ViewSale/1"><button className="btn btn-primary" style={{ float: 'right' }} >Sale Report </button></Link>
                            </div>
                             <div className="col-6">
                                      <div style={{ float: 'right' }}>
                            <Workbook filename="Purchase Report.xlsx"

                                element={
                                    <span class="tooltip-toggle-download-btn" aria-label="Download" tabindex="0">
                                        <button className="btn btn-info download-btn-ap" style={{ float: 'right' }}
                                            data-toggle="tooltip" data-placement="top" title="Download Purchase Report">
                                            <i className="fa fa-cloud-download" aria-hidden="true"></i>&nbsp; Download</button>
                                    </span>
                                }>
                                <Workbook.Sheet data={this.props.purchase} name="Sheet A">

                                    <Workbook.Column label="Vendor Name" value="vendorName" />
                                    <Workbook.Column label="Item Name" value="itemName" />
                                    <Workbook.Column label="Quantity Bought" value="quantityBought" />
                                    <Workbook.Column label="Tax (GST) Paid" value="totalGstAmount" />
                                    <Workbook.Column label="Amount Paid" value="totalAmountCollected" />
                                </Workbook.Sheet>
                            </Workbook>

                        </div>
                            </div>
                            <div className="col-12">
                             <hr />
                             </div>
                        </div>

                        <br />
                        <div>
                            {/* <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col ">Party Name</th>
                                        <th scope="col ">GSTIN</th>
                                        <th scope="col ">Product Detail</th>
                                        <th scope="col ">HSN</th>
                                        <th scope="col ">Quantity</th>
                                        <th scope="col ">Rate</th>
                                        <th scope="col ">Amount</th>
                                        <th scope="col ">GST Rate (%)</th>
                                        <th scope="col ">Input Tax</th>
                                        <th scope="col ">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {region ? (
                                        region.map(function (item, id) {
                                            return (
                                                <tr key={id}>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                    <th scope="row">{item.party_name || "NO DATA"}</th>
                                                </tr>
                                            );
                                        }, this)
                                    ) : (
                                            <span>Data is loading....</span>
                                        )}
                                </tbody>
                            </table> */}
                            <table className="table table-bordered table-responsive-sm table-responsive-md">
                                <thead>
                                    <tr>
                                        <th scope="col ">Vendor Name</th>
                                        <th scope="col ">Item Name</th>
                                        <th scope="col ">Quantity Bought</th>
                                        <th scope="col ">GST Paid</th>
                                         <th scope="col ">Amount Paid</th>
                                       {/* <th scope="col ">Rate</th>

                                        <th scope="col ">GST Rate (%)</th>
                                        <th scope="col ">Input Tax</th>
                                        <th scope="col ">Total Amount</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchase.length ? (
                                        purchase.map(function (item, id) {
                                            return (
                                                <tr key={id}>
                                                    <td scope="row">{item.vendorName || "NO DATA"}</td>
                                                    <td scope="row">{item.itemName || "NO DATA"}</td>
                                                    <td scope="row">{item.quantityBought || "NO DATA"}</td>
                                                    <td scope="row">{item.totalGstAmount || "NO DATA"}</td>
                                                     <td scope="row">{item.totalAmountCollected|| "NO DATA"}</td>
                                                    {/*<td scope="row">{item.amount || "NO DATA"}</td>

                                                    <td scope="row">{item.gst || "NO DATA"}</td>
                                                    <td scope="row">{item.taxAmount || "NO DATA"}</td>
                                                    <td scope="row">{item.totalAmount || "NO DATA"}</td> */}
                                                </tr>
                                            );
                                        }, this)
                                    ) : (
                                    <tr>
                                        <td colSpan="5">
                                            <center>
                                            <span className="data_loading"></span>
                                            </center>
                                            </td>
                                           </tr> 
                                        )}
                                </tbody>
                            </table>
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
        purchase: state.purchaseReport,
        currentUser: state.currentUser.user.id		// we only need the current user's id, to check against the user id of each message
    };
}


export default connect(mapStateToProps, { fetchPurchaseReport })(PurchaseReport);
