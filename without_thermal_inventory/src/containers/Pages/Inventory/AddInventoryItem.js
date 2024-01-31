import React, { Component } from 'react'
import './inventory.css'
import { connect } from 'react-redux';
import axios from 'axios';
import { postNewProduct } from "../../../store/actions/Product/product";
import { Whatsapp } from '../../Home/Whatsapp';
import { fetchTotalProduct } from "../../../store/actions/Product/product";
import SimpleReactValidator from "simple-react-validator";
import {API_URL} from '../../../url/url'
export class AddInventoryItem extends Component {
  constructor(props) {
    super(props);
    // React state
    this.state = {

      item_id: "",
      ui_inventory_quantity: '0',
      ui_batch: '',
      ui_expiration_date: ''


    }; this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    this.props.fetchTotalProduct(this.props);
  }
  // by using arrow functions, we retain value of 'this', and don't need to bind 'this' in the constructor
  handleChange = e => {
    this.setState({
      // get computed property name and set its matching value
      // (works only if the name matches what's in state! but is a nice way to generalize form changes on different types of inputs)
      [e.target.name]: e.target.value
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
      if (this.state.ui_inventory_quantity > 0) {
        let body = {
          item_id:this.state.item_id,
          ui_inventory_quantity: this.state.ui_inventory_quantity,
          ui_batch: this.state.ui_batch,
          ui_expiration_date: this.state.ui_expiration_date
        };
        console.log("state here", body);

        axios
          .put(
            `${API_URL}item/add_items/${
            this.state.item_id
            }`,
            body,
            (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
              "jwt"
            ))
          )
          .then(response => {
            console.log(response);
            if (response.data.data.kind == 'Item addition') {
              alert('Product in inventory Added successfully');
              // this.forceUpdate();
              // this.handlClick();
              // window.location.reload();
              this.props.history.push('/Inventory/1');
            }

          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("Please Provide valid Quantity");
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
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
          <div class="container-fluid">
            <div className="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header d-flex align-items-center">
                    <h4>Add Item in Inventory</h4>
                  </div>
                  <div class="card-body">
                    <p>Fill below details to add an Item to Inventory.</p>
                    <form className="custom-content-form">
                      <div className="form-row">

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Item Name
                        </label>
                            <div class="col-sm-9">
                              {/* <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="name"
                                value={this.state.name}
                                onChange={e => this.handleChange(e)}
                              /> */}
                              <select style={{ width: "100%" }} name="item_id" onChange={e => this.handleChange(e)}>
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
                        </div>
                        {/* 
                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Item Price
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="number"
                                value={this.state.number}
                                onChange={e => this.handleChange(e)}
                              />

                            </div>
                          </div>
                        </div> */}

                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Item Quantity
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                // placeholder="Web Developer"
                                class="form-control"
                                name="ui_inventory_quantity"
                                value={this.state.ui_inventory_quantity}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "Quantity",
                                  this.state.ui_inventory_quantity,
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
                              Batch Number
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                // placeholder="Web Developer"
                                class="form-control"
                                name="ui_batch"
                                value={this.state.ui_batch}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "Batch Number",
                                  this.state.ui_batch,
                                  "required|min:3|max:10"
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
                              Expiration Date
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="date"
                                // placeholder="Web Developer"
                                class="form-control"
                                name="ui_expiration_date"
                                value={this.state.ui_expiration_date}
                                onChange={e => this.handleChange(e)}
                              />
                              <span className="text-danger">
                                {this.validator.message(
                                  "Date",
                                  this.state.ui_expiration_date,
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
    errors: state.errors,
    product: state.product,
  };
}

export default connect(mapStateToProps, { postNewProduct, fetchTotalProduct })(AddInventoryItem);