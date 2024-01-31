import React, { Component } from 'react'
import './sale.css'
import { connect } from 'react-redux';
import { postNewPurchase } from "../../../store/actions/Purchase/purchase";
import { Whatsapp } from '../../Home/Whatsapp';
export class Sales extends Component {
    constructor(props) {
        super(props);
        // React state
        this.state = {

            name: "",
            gst: '',
            product_detail: '',
            HSN: '',
            rate: '',
            amount: "",
            GST_rate: '',
            CGST_rate : '',
            SGST_rate : '',
            IGST_rate  :'',
            UGST_rate : '',
           cess: '',
            total_amount: ''



        };
    }

    // by using arrow functions, we retain value of 'this', and don't need to bind 'this' in the constructor
    handleChange = e => {
        this.setState({
            // get computed property name and set its matching value
            // (works only if the name matches what's in state! but is a nice way to generalize form changes on different types of inputs)
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        let body = {
            name: this.state.name,
            gst: this.state.gst,
            product_detail: this.state.product_detail,
            HSN: this.state.HSN,
            rate: this.state.rate,
            amount: this.state.amount,
            GST_rate: this.state.GST_rate,
            input_tax: this.state.input_tax,
            total_amount: this.state.total_amount

        };
        console.log('value here', body)
        // this.props.postNewPurchase(body);
        // this.props.history.push('/ViewProduct');
    };
    render() {
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
                                        <h4>Add Purchase Item</h4>
                                    </div>
                                    <div class="card-body">
                                        <p>Fill below details to add Purchase Item in a whole.</p>
                                        <form className="custom-content-form">
                                            <div className="form-row">

                                                <div class="form-group col-md-12">
                                                    <div class="form-group row">
                                                        <label
                                                            for="inputPassword"
                                                            class="col-sm-3 col-form-label"
                                                        >
                                                            Party Name
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="name"
                                                                value={this.state.name}
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
                                                            GSTIN
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="gst"
                                                                value={this.state.gst}
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
                                                            Product Detail
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="product_detail"
                                                                value={this.state.product_detail}
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
                                                            HSN
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="HSN"
                                                                value={this.state.HSN}
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
                                                            Quantity
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="quantity"
                                                                value={this.state.quantity}
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
                                                            Rate
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="rate"
                                                                value={this.state.rate}
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
                                                            Amount
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="amount"
                                                                value={this.state.amount}
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
                                                            GST Rate
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="GST_rate"
                                                                value={this.state.GST_rate}
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
                                                            CGST Rate
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="CGST_rate"
                                                                value={this.state.CGST_rate}
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
                                                            SGST Rate
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="SGST_rate"
                                                                value={this.state.SGST_rate}
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
                                                            IGST Rate
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="IGST_rate"
                                                                value={this.state.IGST_rate}
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
                                                            GST Rate
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="UGST_rate"
                                                                value={this.state.UGST_rate}
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
                                                           CESS
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="cess"
                                                                value={this.state.cess}
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
                                                            Total Amount
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="total_amount"
                                                                value={this.state.total_amount}
                                                                onChange={e => this.handleChange(e)}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    class="btn btn-primary"
                                                    onClick={this.handleSubmit.bind(this)}
                                                    style={{ float: 'right' }}
                                                >
                                                    Submit
                      </button>
                                            </div>
                                        </form>
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
        errors: state.errors
    };
}

export default connect(mapStateToProps, { postNewPurchase })(Sales);

