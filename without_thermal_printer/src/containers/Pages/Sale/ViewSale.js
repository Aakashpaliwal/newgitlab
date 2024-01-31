import React, { Component } from 'react'
import "./sale.css";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchPurchase } from '../../../store/actions/Purchase/purchase';
import axios from 'axios'
import { Whatsapp } from '../../Home/Whatsapp';
export class ViewSale extends Component {
    componentDidMount() {
        // this.props.fetchPurchase();
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
                            <li class="breadcrumb-item active">Tables </li>
                        </ul>
                    </div>
                </div>
                <br />
                <div className="card">
                    <div class="card-body">


                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <hr />
                                <Link to="/Sale"><button className="btn btn-primary" style={{ float: 'right' }} >Add Sale</button></Link>
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
                            <table className="table table-bordered table-responsive">
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
                                        <th scope="col ">CGST (%)</th>
                                        <th scope="col ">SGST (%)</th>
                                        <th scope="col ">IGST (%)</th>
                                        <th scope="col ">UGST (%)</th>
                                        <th scope="col">CESS</th>
                                        <th scope="col ">Output Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td scope="row">ABC</td>
                                        <td scope="row">08ADZPM5581Z1MT</td>
                                        <td scope="row">STUDY MATERIAL</td>
                                        <td scope="row">99</td>
                                        <td scope="row">500</td>
                                        <td scope="row">10</td>
                                        <td scope="row">5000</td>
                                        <td scope="row">12%</td>
                                        <td scope="row">3%</td>
                                        <td scope="row">3%</td>
                                        <td scope="row">3%</td>
                                        <td scope="row">3%</td>
                                        <td scope="row">600</td>
                                        <td scope="row">5600</td>
                                    </tr>

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
        purchase: state.purchase,
        currentUser: state.currentUser.user.id		// we only need the current user's id, to check against the user id of each message
    };
}


export default connect(mapStateToProps, { fetchPurchase })(ViewSale);
