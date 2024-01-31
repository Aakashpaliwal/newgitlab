import React, { Component } from "react";
import "./inventory.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchInventory } from "../../../store/actions/Inventory/inventory";
import axios from "axios";
import { Whatsapp } from "../../Home/Whatsapp";
import { API_URL } from "../../../url/url";
export class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_no_count: "",
      limit: 4,
      click: 0,
      itemname: "",
      price: "",
      quantity: "",
      orderdetails: [],
      item_id: "",
      ui_inventory_quantity: "",
      item_name: "",
      minquantitystatus: false,
    };
    this.detailCheck = this.detailCheck.bind(this);
  }
  handleClick() {
    this.props.fetchInventory(this.props);
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
      .then((response) => {
        console.log(response);

        this.setState({
          // itemname: response.data.data.items[0].orderitems.itemName,
          // price: response.data.data.items[0].orderitems.itemPrice,
          // quantity: response.data.data.items[0].orderitems.quantity,
          orderdetails: response.data.data.items[0].orderItems,
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
      .catch((error) => {
        console.log(error);
      });
    // this.props.fetchInvoice();
  }
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  editfunc(item) {
    console.log(item);
    this.setState({
      item_id: item.inventoryItemId,
      ui_inventory_quantity: item.noOfItemsAdded,
      item_name: item.inventoryItemName,
    });
    console.log(this.state);
    // axios
    //   .delete(
    //     `http://api.billing.letswegrow.com/item/delete/${item.id}`,
    //     (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
    //       "jwt"
    //     ))
    //   )
    //   .then(response => {
    //     console.log(response);
    //     if (response.data.data.description == "Item deleted successfully") {
    //       alert("Product deleted successfully");
    //       this.forceUpdate();
    //       this.handleClick();
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    // if (this.validator.allValid()) {
    let body = {
      ui_inventory_quantity: this.state.ui_inventory_quantity,
    };
    console.log("state here", body);

    axios
      .put(
        `${API_URL}item/add_items/${this.state.item_id}`,
        body,
        (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
          "jwt"
        ))
      )
      .then((response) => {
        console.log(response);
        if (response.data.data.kind == "Item addition") {
          alert("Product in inventory edited successfully");
          // this.forceUpdate();
          // this.handlClick();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  prevhandler() {
    let dataskip = --this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    let no_pages = this.props.match.params.id;
    console.log("no-pages", no_pages);
    this.props.history.push(`/Inventory/${this.props.match.params.id}`);
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
    this.props.history.push(`/Inventory/${this.props.match.params.id}`);
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handleClick();
  }

  render() {
    let prevbtndipsplay;
    let nextbtndisplay;
    // let page_count = localStorage.getItem('new_page_count');
    // let final_page_count = localStorage.getItem('number_of_pages')
    // console.log('page_count',page_count)
    // console.log('no_page',final_page_count)
    const { inventory } = this.props;
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
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item active">Inventory Table </li>
            </ul>
          </div>
        </div>
        <br />
        <div className="card">
          <div class="card-body">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <hr />
                <Link to="/AddInventoryItem">
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    Add Items in Inventory
                  </button>
                </Link>
              </div>
            </div>
            <br />

            <div>
              <table className="table table-bordered table-responsive-sm table-responsive-md">
                <thead>
                  <tr>
                    <th scope="col">Sr. No.</th>
                    {/* <th scope="col">Inventory Item Id</th> */}
                    <th scope="col">Item Name</th>
                    <th scope="col">Added On</th>
                    <th scope="col">Quantity Added</th>
                    {/* <th scope="col">GST Ammount</th>
                                        <th scope="col">GST Percentage</th>
                                        <th scope="col">Sub Total (Before GST)</th>
                                        <th scope="col">Total (After GST)</th> */}
                    {/* <th scope="col">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {inventory ? (
                    inventory.map(function (item, id) {
                      let newDate = new Date(item.itemsAddedOn);
                      newDate = newDate.toDateString();
                      return (
                        <tr key={id}>
                          <td scope="row">{id + 1 || "NO DATA"}</td>
                          {/* <th scope="row">{item.inventoryItemId || "NO DATA"}</th> */}
                          <td scope="row">
                            {item.inventoryItemName || "NO DATA"}
                          </td>
                          <td scope="row">{newDate || "NO DATA"}</td>
                          <td scope="row">{item.noOfItemsAdded || "0"}</td>
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
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
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
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col ">Name</th>
                                <th scope="col">Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td scope="row">
                                  {/* {this.state.productname || "NO DATA"} */}
                                  <input
                                    type="text"
                                    // placeholder="Web Developer"
                                    class="form-control"
                                    name="item_name"
                                    value={this.state.item_name}
                                    onChange={(e) => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td scope="row">
                                  {/* {this.state.productname || "NO DATA"} */}
                                  <input
                                    type="text"
                                    // placeholder="Web Developer"
                                    class="form-control"
                                    name="ui_inventory_quantity"
                                    value={this.state.ui_inventory_quantity}
                                    onChange={(e) => this.change(e)}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="submit"
                            class="btn btn-primary"
                            data-dismiss="modal"
                            onClick={(e) => this.handleSubmit(e)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                                <div className="col-lg-3 offset-lg-3 offset-md-3 col-md-3 col-sm-12 col-xs-12 text-center">
                                    {prevbtndipsplay}
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
                                    {nextbtndisplay}
                                </div>
                                <div className="col-12">
                                    <div
                                        class="modal fade"
                                        id="exampleModal"
                                        tabindex="-1"
                                        role="dialog"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div class="modal-dialog" role="document">
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
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col ">Item Name</th>
                                                                <th scope="col ">Price</th>
                                                                <th scope="col ">Quantity</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.orderdetails ? (
                                                                this.state.orderdetails.map(function (item, id) {
                                                                    return (
                                                                        <tr key={id}>
                                                                            <td scope="row">{item.itemName || "NO DATA"}</td>
                                                                            <td scope="row">{item.itemPrice || "NO DATA"}</td>
                                                                            <td scope="row">{item.quantity || "NO DATA"}</td>

                                                                        </tr>
                                                                    );
                                                                }, this)
                                                            ) : (
                                                                    <span>Data is loading....</span>
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
                            </div> */}
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
    inventory: state.inventory,
    currentUser: state.currentUser.user.id, // we only need the current user's id, to check against the user id of each message
  };
}

export default connect(mapStateToProps, { fetchInventory })(Inventory);
