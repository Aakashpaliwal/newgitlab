import React, { Component } from 'react'
import "./sale.css";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchSaleReport} from '../../../store/actions/Sale/sale';
import axios from 'axios'
import { Whatsapp } from '../../Home/Whatsapp';
import Workbook from 'react-excel-workbook'
export class ViewSale extends Component {
    componentDidMount() {
        this.props.fetchSaleReport(this.props);
    }

    render() {
        const { sale } = this.props;
        return (
            <div>
                <div class="breadcrumb-holder">
                    <div class="container-fluid">
                        <ul class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li class="breadcrumb-item active">Sale Report </li>
                        </ul>
                    </div>
                </div>
                <br />
                <div className="card">
                    <div class="card-body">


                        <div className="row">

                            <div className="col-6">
                               
                                <Link to="/PurchaseReport/1"><button className="btn btn-primary" style={{ float: 'right' }} >Purchase Report</button></Link>
                            </div>
                            <div className="col-6">
                                      <div style={{ float: 'right' }}>
                            <Workbook filename="Sales Report.xlsx"

                                element={
                                    <span class="tooltip-toggle-download-btn" aria-label="Download" tabindex="0">
                                        <button className="btn btn-info download-btn-ap" style={{ float: 'right' }}
                                            data-toggle="tooltip" data-placement="top" title="Download Sales Report">
                                            <i className="fa fa-cloud-download" aria-hidden="true"></i>&nbsp; Download</button>
                                    </span>
                                }>
                                <Workbook.Sheet data={this.props.sale} name="Sheet A">

                                    <Workbook.Column label="Item Name" value="itemName" />
                                    <Workbook.Column label="Quantity Sold" value="quantitySold" />
                                    <Workbook.Column label="Amount Collected" value="amountCollected" />
                                    <Workbook.Column label="Tax Collected (GST Amount)" value="gstAmountCollected" />
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
                                        <th scope="col ">Item Name</th>
                                        <th scope="col ">Quantity Sold</th>
                                        <th scope="col ">GST Collected</th>
                                        <th scope="col ">Amount Collected</th>
                                        {/* <th scope="col ">Quantity</th>
                                        <th scope="col ">Rate</th>

                                        <th scope="col ">GST Rate (%)</th>
                                        <th scope="col ">Input Tax</th>
                                        <th scope="col ">Total Amount</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sale.length ? (
                                        sale.map(function (item, id) {
                                            return (
                                                <tr key={id}>
                                                    <td scope="row">{item.itemName || "NO DATA"}</td>
                                                    <td scope="row">{item.quantitySold || "NO DATA"}</td>
                                                    <td scope="row">{item.gstAmountCollected || "NO DATA"}</td>
                                                    <td scope="row">{item.amountCollected || "NO DATA"}</td>
                                                    {/* <td scope="row">{item.quantity || "NO DATA"}</td>
                                                    <td scope="row">{item.amount || "NO DATA"}</td>

                                                    <td scope="row">{item.gst || "NO DATA"}</td>
                                                    <td scope="row">{item.taxAmount || "NO DATA"}</td>
                                                    <td scope="row">{item.totalAmount || "NO DATA"}</td> */}
                                                </tr>
                                            );
                                        }, this)
                                    ) : (
                                    <tr>
                                        <td colSpan="4">
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
        sale: state.saleReport,
        currentUser: state.currentUser.user.id		// we only need the current user's id, to check against the user id of each message
    };
}


export default connect(mapStateToProps, { fetchSaleReport })(ViewSale);
