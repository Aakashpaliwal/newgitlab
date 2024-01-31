import React, { Component } from "react";
import "./Home.css";
import { Whatsapp } from "./Whatsapp";
import { fetchOrder } from "../../store/actions/Order/order";
import { fetchTotalOrder } from "../../store/actions/Order/totalorder";
import { fetchTotalTodayOrder } from "../../store/actions/Order/todayorder";
import { fetchEmployee } from "../../store/actions/Employee/employee";
import { fetchHomeProduct } from "../../store/actions/Product/homeProduct";
import { API_URL } from "../../url/url";
import axios from "axios";
import { connect } from "react-redux";
import ReactSvgPieChart from "react-svg-piechart";
import BarChart from "react-bar-chart";
import PieChart from "react-minimal-pie-chart";
// import PieChart from 'react-minimal-pie-chart';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page_no_count: "",
      limit: 10,
      click: 0,
      itemname: "",
      price: "",
      quantity: "",
      orderdetails: []
    };
    this.detailCheck = this.detailCheck.bind(this);
  }
  async handleClick() {
    this.props.fetchOrder(this.props);
    this.props.fetchTotalOrder(this.props);
    this.props.fetchTotalTodayOrder(this.props);
    this.props.fetchEmployee(this.props);
    await this.props.fetchHomeProduct();
  }
  componentDidMount() {
    this.handleClick();
    this.fiveMonth();
  }
  fiveMonth() {
    // let bar=axios.get(
    //   `https://wrapbilling.herokuapp.com/billing/dashboard/month/report`,
    //   (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
    //     "jwt"
    //   ))
    // );
    // console.log("bar",bar)
    const data = [
      { text: "July", value: 100 },
      { text: "August", value: 150 },
      { text: "September", value: 450 },
      { text: "October", value: 300 }
    ];
    return data;
  }

  componentDidUpdate() {
    this.graphplot();
  }
  graphplot() {
    let product = this.props.homeproduct;
    let data = [];
    let item = {};
    for (let i = 0; i < product.length; i++) {
      item["title"] = product[i].name;
      item["value"] = product[i].noOfItemsInInventory;
      item["color"] = this.hexColor();
      data = [...data, item];
      item = {};
    }
    return data;
  }
  hexColor() {
    let str = "#";
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    for (let i = 0; i < 6; i++) {
      let index = Number.parseInt(Math.random() * 16);
      str += arr[index];
    }
    return str;
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
        console.log(response);

        this.setState({
          // itemname: response.data.data.items[0].orderitems.itemName,
          // price: response.data.data.items[0].orderitems.itemPrice,
          // quantity: response.data.data.items[0].orderitems.quantity,
          orderdetails: response.data.data.items[0].orderItems
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
  render() {
    const {
      order,
      totalorder,
      totaltodayorder,
      employee,
      homeproduct
    } = this.props;
    return (
      <div>
        <section class="dashboard-counts section-padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                <div className="card">
                  <div class="card-body">
                    <div class="wrapper count-title d-flex">
                      {/* <div class="icon"><i class="icon-user"></i></div> */}
                      <div>
                        <h3>
                          <i
                            className="fa fa-shopping-basket"
                            aria-hidden="true"
                          >
                            {" "}
                            Number Of Orders
                          </i>{" "}
                        </h3>

                        <div className="row">
                          <div className="col-12">
                            <hr />
                          </div>
                          <div className="col-6">
                            <p className="text-muted">Today's Orders</p>
                          </div>
                          <div className="col-6">
                            <p
                              className="text-muted"
                              style={{ float: "right", fontSize: "1.5rem" }}
                            >
                              {localStorage.getItem("total_order") || 0}
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted">Total Orders</p>
                          </div>
                          <div className="col-6">
                            <p
                              className="text-muted"
                              style={{ float: "right", fontSize: "1.5rem" }}
                            >
                              {localStorage.getItem("total_order_all")}
                            </p>
                          </div>
                        </div>
                        {/* <p className="text-muted">TOTAL SHOPS</p>
                        <p className="text-muted">LAST ACTIVE SHOPS</p> */}
                      </div>
                      {/* <div class="icon"><i class="icon-user"></i></div>
                  <div class="name"><strong class="text-uppercase">Orders</strong>
                    <span>Last 7 days</span>
                  
                    <div class="count-number">{localStorage.getItem('total_order')}</div>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                <div className="card">
                  <div class="card-body">
                    <div class="wrapper count-title d-flex">
                      {/* <div class="icon"><i class="icon-user"></i></div> */}
                      <div>
                        <h3>
                          <i class="fa fa-inr" aria-hidden="true">
                            {" "}
                            Amount Collected
                          </i>
                        </h3>

                        <div className="row">
                          <div className="col-12">
                            <hr />
                          </div>
                          <div className="col-6">
                            <p className="text-muted">Today's Amount</p>
                          </div>
                          <div className="col-6">
                            <p
                              className="text-muted"
                              style={{ float: "right", fontSize: "1.5rem" }}
                            >
                              {localStorage.getItem("total_today_amount") !==
                              "null"
                                ? localStorage.getItem("total_today_amount")
                                : 0}
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted">Total Amount</p>
                          </div>
                          <div className="col-6">
                            <p
                              className="text-muted"
                              style={{ float: "right", fontSize: "1.5rem" }}
                            >
                              {localStorage.getItem("total_amount_all")}
                            </p>
                          </div>
                        </div>
                        {/* <p className="text-muted">TOTAL SHOPS</p>
                        <p className="text-muted">LAST ACTIVE SHOPS</p> */}
                      </div>
                      {/* <div class="icon"><i class="icon-user"></i></div>
                  <div class="name"><strong class="text-uppercase">Orders</strong>
                    <span>Last 7 days</span>
                  
                    <div class="count-number">{localStorage.getItem('total_order')}</div>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                <div className="card">
                  <div class="card-body">
                    <div class="wrapper count-title d-flex">
                      {/* <div class="icon"><i class="icon-user"></i></div> */}
                      <div>
                        <h3>
                          <i class="fa fa-address-card" aria-hidden="true">
                            {" "}
                            GST Collected
                          </i>
                        </h3>

                        <div className="row">
                          <div className="col-12">
                            <hr />
                          </div>
                          <div className="col-6">
                            <p className="text-muted">Today's GST</p>
                          </div>
                          <div className="col-6">
                            <p
                              className="text-muted"
                              style={{ float: "right", fontSize: "1.5rem" }}
                            >
                              {localStorage.getItem("total_today_gst") !==
                              "null"
                                ? localStorage.getItem("total_today_gst")
                                : 0}
                            </p>
                          </div>
                          <div className="col-6">
                            <p className="text-muted">Total GST</p>
                          </div>
                          <div className="col-6">
                            <p
                              className="text-muted"
                              style={{ float: "right", fontSize: "1.5rem" }}
                            >
                              {localStorage.getItem("total_gst_all")}
                            </p>
                          </div>
                        </div>
                        {/* <p className="text-muted">TOTAL SHOPS</p>
                        <p className="text-muted">LAST ACTIVE SHOPS</p> */}
                      </div>
                      {/* <div class="icon"><i class="icon-user"></i></div>
                  <div class="name"><strong class="text-uppercase">Orders</strong>
                    <span>Last 7 days</span>
                  
                    <div class="count-number">{localStorage.getItem('total_order')}</div>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div class="col-xl-2 col-md-4 col-6">
                <div class="wrapper count-title d-flex">
                  <div class="icon"><i class="icon-padnote"></i></div>
                  <div class="name"><strong class="text-uppercase">Total Orders</strong>
                    <span>Last 5 days</span>
                    <div class="count-number">{localStorage.getItem('total_order_all')}</div>
                  </div>
                </div>
              </div> */}

              {/* <div class="col-xl-2 col-md-4 col-6">
                <div class="wrapper count-title d-flex">
                  <div class="icon"><i class="icon-check"></i></div>
                  <div class="name"><strong class="text-uppercase">New Quotes</strong>
                  <span>Last 2 months</span>
                    <div class="count-number">342</div>
                  </div>
                </div>
              </div> */}

              {/* <div class="col-xl-2 col-md-4 col-6">
                <div class="wrapper count-title d-flex">
                  <div class="icon"><i class="icon-bill"></i></div>
                  <div class="name"><strong class="text-uppercase">New Invoices</strong><span>Last 2 days</span>
                    <div class="count-number">123</div>
                  </div>
                </div>
              </div>

              <div class="col-xl-2 col-md-4 col-6">
                <div class="wrapper count-title d-flex">
                  <div class="icon"><i class="icon-list"></i></div>
                  <div class="name"><strong class="text-uppercase">Open Cases</strong><span>Last 3 months</span>
                    <div class="count-number">92</div>
                  </div>
                </div>
              </div>

              <div class="col-xl-2 col-md-4 col-6">
                <div class="wrapper count-title d-flex">
                  <div class="icon"><i class="icon-list-1"></i></div>
                  <div class="name"><strong class="text-uppercase">New Cases</strong><span>Last 7 days</span>
                    <div class="count-number">70</div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="row">
              <div className="col-6">
                <div className="card" style={{ marginTop: "30px" }}>
                  <div class="card-body">
                    <h4 style={{ color: "#33b35a" }}>
                      Item Remaining In Inventory
                    </h4>
                    <hr />
                    <table className="table table-bordered table-responsive-sm table-responsive-md">
                      <thead>
                        <tr>
                          {/* <th scope="col">Order Id</th> */}
                          <th>Item Name</th>
                          <th>Quantity</th>
                          {/* <th scope="col">Order Number</th>
                          <th scope="col">Date Of Purchase</th> */}
                          {/* <th scope="col">GST Ammount</th> */}
                          {/* <th scope="col">GST Percentage</th> */}
                          {/* <th scope="col">Sub Total (Before GST)</th> */}
                          {/* <th scope="col">Amount</th> */}
                          {/* <th scope="col">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {homeproduct ? (
                          homeproduct
                            .sort(
                              (a, b) =>
                                a.noOfItemsInInventory - b.noOfItemsInInventory
                            )
                            .slice(0, 11)
                            .map(function(item, id) {
                              return item.noOfItemsInInventory < 15 ? (
                                <tr
                                  className="table-danger"
                                  role="alert"
                                  key={id}
                                >
                                  <td>{item.name || "NO DATA"}</td>
                                  <td>{item.noOfItemsInInventory || "0"}</td>
                                </tr>
                              ) : (
                                <tr key={id}>
                                  <td>{item.name || "NO DATA"}</td>
                                  <td>{item.noOfItemsInInventory || "0"}</td>
                                </tr>
                              );
                            }, this)
                        ) : (
                          <span>Data is loading....</span>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card" style={{ marginTop: "30px" }}>
                  <div class="card-body">
                    <h4 style={{ color: "#33b35a" }}>Item Inventory</h4>
                    <hr />
                    {/* <PieChart
                    data={this.graphplot()}
                    /> */}
                    {/* <PieChart>
                    {homeproduct ? (
            homeproduct.map(function (item, id) {
                return (
                  
                  data={[
                        { title: `{item.name}` ,color: '#E38627' }
                      
                      ]}
                );
              }, this)
            ) : (
                <span>Data is loading....</span>
              )}
                     
              style={{
                        height: '100px'
                      }}
                    </PieChart>; */}
                    {/* <ReactSvgPieChart
                      data={this.graphplot()}
                      // If you need expand on hover (or touch) effect
                      expandOnHover
                      // If you need custom behavior when sector is hovered (or touched)
                      // onSectorHover={(d, i, e) => {
                      //   if (d) {
                      //     console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                      //   } else {
                      //     console.log("Mouse leave - Index:", i, "Event:", e)
                      //   }
                      // }}
                      // viewBoxSize = '800'
                    /> */}
                    {/* PIE CHART EXCERCIESE */}
                    <PieChart
                      // data={[
                      //   { title: "One", value: 10, color: "#E38627" },
                      //   { title: "Two", value: 15, color: "#C13C37" },
                      //   { title: "Three", value: 20, color: "#6A2135" }
                      // ]}
                      data={this.graphplot()}
                      label
                      labelPosition={50}
                      labelStyle={{
                        fill: "#121212",
                        fontFamily: "sans-serif",
                        fontSize: "5px"
                      }}
                      lengthAngle={360}
                      lineWidth={100}
                      onClick={undefined}
                      onMouseOut={undefined}
                      onMouseOver={undefined}
                      paddingAngle={0}
                      radius={50}
                      rounded={false}
                      startAngle={0}
                      viewBoxSize={[100, 100]}
                    />
                    {/* END PIE CHART EXCERCISE */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row"> */}
            {/* <div className="col-lg-3 offset-lg-3 offset-md-3 col-md-3 col-sm-12 col-xs-12 text-center">
                      {prevbtndipsplay}
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
                      {nextbtndisplay}
                    </div> */}
            {/* <div className="col-12"> */}
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
                    <table className="table table-bordered table-responsive-sm table-responsive-md">
                      <thead>
                        <tr>
                          <th scope="col ">Item Name</th>
                          <th scope="col ">Price</th>
                          <th scope="col ">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.orderdetails ? (
                          this.state.orderdetails.map(function(item, id) {
                            return (
                              <tr key={id}>
                                <td scope="row">
                                  {item.itemName || "NO DATA"}
                                </td>
                                <td scope="row">
                                  {item.costPrice || "NO DATA"}
                                </td>
                                <td scope="row">
                                  {item.quantity || "NO DATA"}
                                </td>
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
            {/* </div> */}
            {/* </div> */}

            <div className="row">
              <div className="col-6">
                <div className="card" style={{ marginTop: "30px" }}>
                  <div class="card-body">
                    <div>
                      <h4>Last Five Month Collection</h4>
                      <hr />
                      <div style={{ width: "100%" }}>
                        <BarChart
                          ylabel="Amount"
                          height={300}
                          width={500}
                          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                          data={this.fiveMonth()}
                          // onBarClick={this.handleBarClick}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card" style={{ marginTop: "30px" }}>
                  <div class="card-body">
                    <div>
                      <h4>Employee List</h4>
                      <hr />
                      <table className="table table-bordered table-responsive-sm table-responsive-md table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employee ? (
                            employee.map(function(item, id) {
                              return (
                                <tr key={id}>
                                  <td scope="row">
                                    {item.empName || "NO DATA"}
                                  </td>
                                  {/* <th scope="row">{item.role_id===1?"ADMIN":"EMLOYEE" || "NO DATA"}</th> */}
                                  <td scope="col">
                                    {item.empRole || "NO DATA"}
                                  </td>
                                  <td scope="row">
                                    {item.empEmail || "NO DATA"}
                                  </td>
                                  <td scope="row">
                                    {item.empMobile || "NO DATA"}
                                  </td>
                                </tr>
                              );
                            }, this)
                          ) : (
                            <span>Data is loading....</span>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card" style={{ marginTop: "30px" }}>
                  <div class="card-body">
                    <h4>Latest Order</h4>
                    <hr />
                    <table className="table table-bordered table-responsive-sm table-responsive-md l table-responsive">
                      <thead>
                        <tr>
                          <th scope="col">Order Id</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Customer Mobile</th>
                          <th scope="col">Order Number</th>
                          <th scope="col">Date Of Purchase</th>
                          <th scope="col">GST Ammount</th>
                          <th scope="col">GST Percentage</th>
                          <th scope="col">Sub Total (Before GST)</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order ? (
                          order.slice(0, 7).map(function(item, id) {
                            let newDate = new Date(item.dateOfPurchase);
                            newDate = newDate.toDateString();
                            return (
                              <tr key={id}>
                                <td scope="row">{item.orderId || "NO DATA"}</td>
                                <td scope="row">
                                  {item.customerName || "NO DATA"}
                                </td>
                                <td scope="row">
                                  {item.customerMobile || "NO DATA"}
                                </td>
                                <td scope="row">
                                  {item.orderNumber || "NO DATA"}
                                </td>
                                <td scope="row">{newDate || "NO DATA"}</td>
                                <td scope="row">{item.GSTAmount || "0"}</td>
                                <td scope="row">{item.GSTPercentage || "0"}</td>
                                <td scope="row">
                                  {item.subTotal || "NO DATA"}
                                </td>
                                <td scope="row">{item.total || "NO DATA"}</td>
                                <td>
                                  <span
                                    class="tooltip-toggle"
                                    aria-label="Details"
                                    tabindex="0"
                                  >
                                    <button
                                      className="btn btn-success custom-edit-btn btn-sm"
                                      onClick={this.detailCheck.bind(
                                        this,
                                        item
                                      )}
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                    >
                                      <i class="fa fa-eye" aria-hidden="true" />
                                    </button>
                                  </span>
                                </td>
                              </tr>
                            );
                          }, this)
                        ) : (
                          <span>Data is loading....</span>
                        )}
                      </tbody>
                    </table>
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
    order: state.order,
    totalorder: state.totalorder,
    totaltodayorder: state.totaltodayorder,
    employee: state.employee,
    homeproduct: state.homeproduct,
    currentUser: state.currentUser.user.id // we only need the current user's id, to check against the user id of each message
  };
}

export default connect(mapStateToProps, {
  fetchOrder,
  fetchTotalOrder,
  fetchTotalTodayOrder,
  fetchEmployee,
  fetchHomeProduct
})(Home);
