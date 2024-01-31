import React, { Component } from 'react'
import "./purchase.css";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchPurchase } from '../../../store/actions/Purchase/purchase';
import axios from 'axios'
import { Whatsapp } from '../../Home/Whatsapp';
import Workbook from 'react-excel-workbook'
export class ViewPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ui_name: '',
            ui_price: '',
            id: '',
            page_no_count: "",
            limit: 10,
            click: 0,
        };
    }
    handlClick() {
        this.props.fetchPurchase(this.props);
    }
    async componentDidMount() {
        await this.handlClick();
    }
    prevhandler() {
        let dataskip = --this.props.match.params.id;
        console.log(dataskip);
        this.props.match.params.id = dataskip;
        let no_pages = this.props.match.params.id;
        console.log("no-pages", no_pages);
        this.props.history.push(`/ViewPurchase/${this.props.match.params.id}`);
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
        this.props.history.push(`/ViewPurchase/${this.props.match.params.id}`);
        // console.log(`/ViewArea/${this.props.match.params.id}`);
        this.forceUpdate();
        this.handlClick();
    }

    render() {
        let prevbtndipsplay;
        let nextbtndisplay;
        // let page_count = localStorage.getItem('new_page_count');
        // let final_page_count = localStorage.getItem('number_of_pages')
        // console.log('page_count',page_count)
        // console.log('no_page',final_page_count)
        const { purchase } = this.props;
        // const { jobdetail } = this.props;

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
                                <Link to="/Purchase"><button className="btn btn-primary" style={{ float: 'right' }}>Add Purchase</button></Link>
                            </div>
                        </div>

                        <br />

                        <div style={{ float: 'right' }}>
                            <Workbook filename="Purchase Data.xlsx"

                                element={
                                    <span class="tooltip-toggle-download-btn" aria-label="Download" tabindex="0">
                                        <button className="btn btn-info download-btn-ap" style={{ float: 'right' }}
                                            data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                                            <i className="fa fa-cloud-download" aria-hidden="true"></i>&nbsp; Download</button>
                                    </span>
                                }>
                                <Workbook.Sheet data={this.props.purchase} name="Sheet A">

                                    <Workbook.Column label="Party Name" value="partyName" />
                                    <Workbook.Column label="GSTIN" value="gstin" />
                                    <Workbook.Column label="Details" value="details" />
                                    <Workbook.Column label="HSN" value="hsn" />
                                    <Workbook.Column label="Quantity" value="quantity" />
                                    <Workbook.Column label="Amount" value="amount" />
                                    <Workbook.Column label="GST" value="gst" />
                                    <Workbook.Column label="Tax Amount" value="taxAmount" />
                                    <Workbook.Column label="Total Amount" value="totalAmount" />
                                </Workbook.Sheet>
                                {/* <Workbook.Sheet data={this.state.proddata} name="Sheet B">
      <Workbook.Column label="Product Name" value="product_name"/>
        <Workbook.Column label="Product Category" value="product_type_name"/>
        <Workbook.Column label="Quantity" value="quantity"/>
        <Workbook.Column label="Employe Name" value="employe_name"/>
        <Workbook.Column label="Employe Mobile" value="employe_mobile"/>
        <Workbook.Column label="Date Of Delivery" value="date_of_delivery"/>
        </Workbook.Sheet> */}
                            </Workbook>

                        </div>
                        <div>
                            <table className="table table-bordered table-responsive-sm table-responsive-md">
                                <thead>
                                    <tr>
                                        <th scope="col ">Party Name</th>
                                        <th scope="col ">GSTIN</th>
                                        <th scope="col ">Product Detail</th>
                                        <th scope="col ">HSN</th>
                                        <th scope="col ">Quantity</th>
                                        <th scope="col ">Rate</th>

                                        <th scope="col ">GST Rate (%)</th>
                                        <th scope="col ">Input Tax</th>
                                        <th scope="col ">Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchase ? (
                                        purchase.map(function (item, id) {
                                            return (
                                                <tr key={id}>
                                                    <td scope="row">{item.partyName || "NO DATA"}</td>
                                                    <td scope="row">{item.gstin || "NO DATA"}</td>
                                                    <td scope="row">{item.details || "NO DATA"}</td>
                                                    <td scope="row">{item.hsn || "NO DATA"}</td>
                                                    <td scope="row">{item.quantity || "NO DATA"}</td>
                                                    <td scope="row">{item.amount || "NO DATA"}</td>

                                                    <td scope="row">{item.gst || "NO DATA"}</td>
                                                    <td scope="row">{item.taxAmount || "NO DATA"}</td>
                                                    <td scope="row">{item.totalAmount || "NO DATA"}</td>
                                                </tr>
                                            );
                                        }, this)
                                    ) : (
                                            <span>Data is loading....</span>
                                        )}
                                </tbody>
                            </table>

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

export default connect(mapStateToProps, { fetchPurchase })(ViewPurchase);
