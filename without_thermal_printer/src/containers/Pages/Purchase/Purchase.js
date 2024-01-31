import React, { Component } from 'react'
import './purchase.css'
import { connect } from 'react-redux';
import { postNewPurchase } from "../../../store/actions/Purchase/purchase";
import { Whatsapp } from '../../Home/Whatsapp';
import SimpleReactValidator from "simple-react-validator";
export class Purchase extends Component {
    constructor(props) {
        super(props);
        // React state
        this.state = {

            ui_party_name: '',
            ui_details: '',
            ui_gstin: '',
            ui_gst: "",
            ui_hsn: '',
            ui_quantity: '',
            ui_rate: '',
            ui_tax: '',
            ui_total: ''


        };
        this.validator = new SimpleReactValidator();
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
            console.log('value here', this.state)
            const res = await this.props.postNewPurchase(this.state);
            // this.props.history.push('/ViewProduct');
            if (res) {
                if (res.status === 200) {
                  console.log('200res', res)
                  alert(res.data.data.description);
                  this.props.history.push('/ViewPurchase/1');
                }
                else {
                  // console.log('error res',res.error)
                  this.state.validationbadge = res.error.data.errors[0].message
                  this.state.demostatus = true
                  // if (this.state.demostatus) {
          
                  // }
                  this.state.demobadge = 'demobadge'
                  this.setState({
                    demobadge: 'demobagehere'
                  })
                  console.log(this.state.demobadge)
                  if (res.error.status === 422) {
                    this.state.valiationstatus = true
          
                    alert('failure - ' + res.error.data.errors[0].message)
                    // this.setState({
                    //   valiationstatus: true,
                    //   validationbadge: res.error.data.errors[0].message
                    // })
          
          
          
                    console.log(
                      this.state.validationbadge
                    )
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
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // this.forceUpdate();
        }
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
                                                                name="ui_party_name"
                                                                value={this.state.ui_party_name}
                                                                onChange={e => this.handleChange(e)}
                                                            />
                                                            <span className="text-danger">
                                                                {this.validator.message(
                                                                    "Partyn Name",
                                                                    this.state.ui_party_name,
                                                                    "required|min:3|max:50"
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
                                                           Product Details
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="ui_details"
                                                                value={this.state.ui_details}
                                                                onChange={e => this.handleChange(e)}
                                                            />
 <span className="text-danger">
                                                                {this.validator.message(
                                                                    "Details",
                                                                    this.state.ui_details,
                                                                    "required|min:3|max:50"
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
                                                            GSTIN
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="ui_gstin"
                                                                value={this.state.ui_gstin}
                                                                onChange={e => this.handleChange(e)}
                                                            />
 <span className="text-danger">
                                                                {this.validator.message(
                                                                    "GSTIN",
                                                                    this.state.ui_gstin,
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
                                                            HSN
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
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
                                                            Quantity
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="ui_quantity"
                                                                value={this.state.ui_quantity}
                                                                onChange={e => this.handleChange(e)}
                                                            />
<span className="text-danger">
                                                                {this.validator.message(
                                                                    "Quantity",
                                                                    this.state.ui_quantity,
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
                                                            Rate
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="ui_rate"
                                                                value={this.state.ui_rate}
                                                                onChange={e => this.handleChange(e)}
                                                            />
<span className="text-danger">
                                                                {this.validator.message(
                                                                    "Rate",
                                                                    this.state.ui_rate,
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
                                                            GST Percentage
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="ui_gst"
                                                                value={this.state.ui_gst}
                                                                onChange={e => this.handleChange(e)}
                                                            />
<span className="text-danger">
                                                                {this.validator.message(
                                                                    "GST percentage",
                                                                    this.state.ui_gst,
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
                                                            Tax
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="ui_tax"
                                                                value={this.state.ui_tax}
                                                                onChange={e => this.handleChange(e)}
                                                            />
<span className="text-danger">
                                                                {this.validator.message(
                                                                    "Tax",
                                                                    this.state.ui_tax,
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
                                                            Total
                            </label>
                                                        <div class="col-sm-9">
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="inputPassword"
                                                                name="ui_total"
                                                                value={this.state.ui_total}
                                                                onChange={e => this.handleChange(e)}
                                                            />
<span className="text-danger">
                                                                {this.validator.message(
                                                                    "Total",
                                                                    this.state.ui_total,
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


export default connect(mapStateToProps, { postNewPurchase })(Purchase);
