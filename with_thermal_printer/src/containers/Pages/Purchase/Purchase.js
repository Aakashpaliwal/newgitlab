import React, { Component } from "react";
import "./purchase.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postNewPurchase } from "../../../store/actions/Purchase/purchase";
import { Whatsapp } from "../../Home/Whatsapp";
import SimpleReactValidator from "simple-react-validator";
export class Purchase extends Component {
  constructor(props) {
    super(props);
    // React state
    this.state = {
      ui_party_name: "",
      ui_details: "",
      ui_gstin: "",
      ui_gst: "",
      ui_hsn: "",
      ui_quantity: "",
      ui_rate: "",
      ui_tax: 0.0,
      ui_total: 0.0
    };
    this.validator = new SimpleReactValidator();
  }
  formatCurrency = amount => {
    // console.log("ammmmm",amount)
    return new Intl.NumberFormat(this.locale, {
      // style: 'currency',
      // currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  // by using arrow functions, we retain value of 'this', and don't need to bind 'this' in the constructor
  handleChange = async e => {
    await this.setState({
      // get computed property name and set its matching value
      // (works only if the name matches what's in state! but is a nice way to generalize form changes on different types of inputs)
      [e.target.name]: e.target.value
    });
    let taxRate =
      (this.state.ui_rate * this.state.ui_quantity * this.state.ui_gst) / 100;
    let total = this.state.ui_rate * this.state.ui_quantity;
    let amount = +total + +taxRate;
    await this.setState({
      ui_tax: taxRate,
      ui_total: amount
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
      console.log("value here", this.state);
      const res = await this.props.postNewPurchase(this.state);
      // this.props.history.push('/ViewProduct');
      if (res) {
        if (res.status === 200) {
          // console.log('200res', res)
          // alert(res.data.data.description);
          this.props.history.push("/ViewPurchase/1");
        } else {
          // console.log('error res',res.error)
          this.state.validationbadge = res.error.data.errors[0].message;
          this.state.demostatus = true;
          // if (this.state.demostatus) {

          // }
          this.state.demobadge = "demobadge";
          this.setState({
            demobadge: "demobagehere"
          });
          console.log(this.state.demobadge);
          if (res.error.status === 422) {
            this.state.valiationstatus = true;

            alert("failure - " + res.error.data.errors[0].message);
            // this.setState({
            //   valiationstatus: true,
            //   validationbadge: res.error.data.errors[0].message
            // })

            console.log(this.state.validationbadge);
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
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active">Business Expenses </li>
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
                    <h4>Add Business Expenses</h4>
                  </div>
                  <div class="card-body">
                    {/* <p>Fill below details to add Purchase Item in a whole.</p> */}
                    <form
                      className="custom-content-form"
                      id="needs-validation"
                      novalidate
                    >
                      <div className="form-row">
                        <div class="field form-group col-md-12 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "Party Name",
                              this.state.ui_party_name,
                              "required|min:3|max:100"
                            )}
                          </p>
                          <label for="total" class="inp">
                            <input
                              type="text"
                              id="total"
                              placeholder="&nbsp;"
                              name="ui_party_name"
                              value={this.state.ui_party_name}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Party Name</span>
                            <span class="border"></span>
                             <small>(e.g : John Doe)</small> 
                          </label>
                          {/* <input type="text" name="ui_party_name" value={this.state.ui_party_name} onChange={e => this.handleChange(e)} id="fullname" placeholder="Jane Appleseed" />

                                                    <label for="fullname">Party Name</label>
                                                    <p className="text-danger">
                                                        {this.validator.message(
                                                            "Party Name",
                                                            this.state.ui_party_name,
                                                            "required|min:3|max:100"
                                                        )}
                                                    </p> */}
                        </div>

                        <div class="field form-group col-md-4 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "Details",
                              this.state.ui_details,
                              "required|min:3|max:50"
                            )}
                          </p>
                          <label for="details" class="inp">
                            <input
                              type="text"
                              id="details"
                              placeholder="&nbsp;"
                              name="ui_details"
                              value={this.state.ui_details}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Product Details</span>
                            <span class="border"></span>
                             <small>(e.g : Tea)</small> 
                          </label>
                          {/* <input type="text" name="ui_details" value={this.state.ui_details} onChange={e => this.handleChange(e)} id="batch" placeholder="12batch" />

                                                    <label for="batch">Product Details</label>
                                                    <p className="text-danger">
                                                        {this.validator.message(
                                                            "Details",
                                                            this.state.ui_details,
                                                            "required|min:3|max:50"
                                                        )}
                                                    </p> */}
                        </div>

                        <div class="field form-group col-md-4 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "GSTIN",
                              this.state.ui_gstin,
                              "required|min:6"
                            )}
                          </p>
                          <label for="gstin" class="inp">
                            <input
                              type="text"
                              id="gstin"
                              placeholder="&nbsp;"
                              name="ui_gstin"
                              value={this.state.ui_gstin}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">GSTIN</span>
                            <span class="border"></span>
                             <small>(e.g : 23BABPG5109C1ZJ)</small> 
                          </label>
                          {/* <input type="text" name="ui_gstin" value={this.state.ui_gstin} onChange={e => this.handleChange(e)} id="hsn" placeholder="026585" />
                                                    <label for="hsn">GSTIN</label>
                                                    <p className="text-danger">
                                                        {this.validator.message(
                                                            "GSTIN",
                                                            this.state.ui_gstin,
                                                            "required|min:6"
                                                        )}
                                                    </p> */}
                        </div>

                        <div class="field form-group col-md-4 custom-product-field">
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
                            <small>(e.g : 20)</small>
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

                        <div class="field form-group col-md-4 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "Quantity",
                              this.state.ui_quantity,
                              "required"
                            )}
                          </p>
                          <label for="quantity" class="inp">
                            <input
                              type="text"
                              id="quantity"
                              placeholder="&nbsp;"
                              name="ui_quantity"
                              value={this.state.ui_quantity}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Quantity</span>
                            <span class="border"></span>
                            <small>(e.g : 1000)</small>
                          </label>
                          {/* <input type="text" name="ui_quantity" value={this.state.ui_quantity} onChange={e => this.handleChange(e)} id="quantity" placeholder="58" />
                                                    <label for="quantity">Quantity</label>
                                                    <p className="text-danger">
                                                        {this.validator.message(
                                                            "Quantity",
                                                            this.state.ui_quantity,
                                                            "required"
                                                        )}
                                                    </p> */}
                        </div>

                        <div class="field form-group col-md-4 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "Rate",
                              this.state.ui_rate,
                              "required"
                            )}
                          </p>
                          <label for="rate" class="inp">
                            <input
                              type="text"
                              id="rate"
                              placeholder="&nbsp;"
                              name="ui_rate"
                              value={this.state.ui_rate}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">Rate</span>
                            <span class="border"></span>
                            <small>(e.g : 200.00)</small>
                          </label>
                          {/* <input type="text" name="ui_rate" value={this.state.ui_rate} onChange={e => this.handleChange(e)} id="rate" placeholder="58" />
                                                    <label for="rate">Rate</label>
                                                    <p className="text-danger">
                                                        {this.validator.message(
                                                            "Rate",
                                                            this.state.ui_rate,
                                                            "required"
                                                        )}
                                                    </p> */}
                        </div>
                        <div class="field form-group col-md-4 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "GST Percentage",
                              this.state.ui_gst,
                              "required"
                            )}
                          </p>
                          <label for="gst" class="inp">
                            <input
                              type="text"
                              id="gst"
                              placeholder="&nbsp;"
                              name="ui_gst"
                              value={this.state.ui_gst}
                              onChange={e => this.handleChange(e)}
                            />
                            <span class="label">GST Percentage</span>
                            <span class="border"></span>
                            <small>(e.g : 5%)</small>
                          </label>
                          {/* <input type="text" name="ui_gst" value={this.state.ui_gst} onChange={e => this.handleChange(e)} id="gstper" placeholder="58" />
                                                    <label for="gstper">GST Percentage</label>
                                                    <p className="text-danger">
                                                        {this.validator.message(
                                                            "GST Percentage",
                                                            this.state.ui_gst,
                                                            "required"
                                                        )}
                                                    </p> */}
                        </div>

                        <div class="field form-group col-md-6 custom-product-field">
                          <p className="text-danger">
                            {this.validator.message(
                              "Tax",
                              this.state.ui_tax,
                              "required"
                            )}
                          </p>
                          <label for="tax" class="inp">
                            <input
                              type="text"
                              id="tax"
                              placeholder="&nbsp;"
                              name="ui_tax"
                              value={this.state.ui_tax}
                              disabled
                            />
                            <span class="label">TAX</span>
                            <span class="border"></span>
                          </label>
                          {/* <input type="text" name="ui_tax" value={this.state.ui_tax} onChange={e => this.handleChange(e)} id="tax" placeholder="58" />
                                                    <label for="tax">Tax</label>
                                                    <p className="text-danger">
                                                        {this.validator.message(
                                                            "Tax",
                                                            this.state.ui_tax,
                                                            "required"
                                                        )}
                                                    </p> */}
                        </div>
                        <div class="field form-group col-md-6 custom-product-field">
                          <label for="total" class="inp">
                            <input
                              type="text"
                              id="total"
                              placeholder="&nbsp;"
                              name="ui_total"
                              value={this.state.ui_total}
                              disabled
                            />
                            <span class="label">TOTAL</span>
                            <span class="border"></span>
                          </label>
                          {/* <input type="text" name="ui_total" value={this.state.ui_total} onChange={e => this.handleChange(e)} id="total" placeholder="58" />
                                                    <label for="total">Total</label>
                                                    <p className="text-danger">
                                                        {this.validator.message(
                                                            "Total",
                                                            this.state.ui_total,
                                                            "required"
                                                        )}
                                                    </p> */}
                        </div>

                        <button
                          class="btn btn-primary"
                          onClick={this.handleSubmit.bind(this)}
                          style={{ float: "right" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    {/* <form className="custom-content-form">
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
                                        </form> */}
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
