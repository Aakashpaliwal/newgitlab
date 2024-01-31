import React, { Component } from "react";
import "./Sidebar.css";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

export class Sidebar extends Component {
  constructor() {
    super();
  }

  invoiceroute() {
    window.location.assign("/ViewInvoice");
  }
  render() {
    let adminmenu;
    if (localStorage.getItem("role") == "Admin") {
      adminmenu = (
        <div>
          <li>
            <NavLink to="/ViewProduct/1">
              {" "}
              <i class="fa fa-table"></i>Item
            </NavLink>
          </li>
          <li>
            <NavLink to="/ViewEmployee">
              {" "}
              <i class="fa fa-users"></i>
              Employee
            </NavLink>
          </li>
          <li>
            <NavLink to="/Billing/1">
              {" "}
              <i class="fa fa-money "></i>Orders
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/Inventory/1">
              {" "}
              <i class="fa fa-exchange"></i>Transaction
            </NavLink>
          </li> */}
          {/* <li><NavLink to='/ViewPurchase/1'> <i class="fa fa-cart-plus"></i>Purchase</NavLink></li>
          <li><NavLink to='/ViewSale'> <i class="fa fa-share-square-o"></i>Sale</NavLink></li> */}
        </div>
      );
    }
    return (
      <div>
        {this.props.currentUser.isAuthenticated ? (
          <nav class="side-navbar">
            <div class="side-navbar-wrapper">
              <div class="sidenav-header d-flex align-items-center justify-content-center">
                <div class="sidenav-header-inner text-center">
                  <img
                    src={require("../Pages/img/Elipi-logo-PNG--Business-card.png")}
                    alt="person"
                    class="img-fluid rounded-circle"
                  />
                  <h2 class="h5">{localStorage.getItem("username")}</h2>
                  <span>{localStorage.getItem("role")}</span>
                </div>

                <div class="sidenav-header-logo">
                  <a href="#" class="brand-small text-center">
                    {" "}
                    <strong>B</strong>
                    <strong class="text-primary">D</strong>
                  </a>
                </div>
              </div>

              <div class="main-menu">
                <h5 class="sidenav-heading">Main</h5>
                <ul id="side-main-menu" class="side-menu list-unstyled">
                  <li>
                    <NavLink to="/">
                      {" "}
                      <i class="fa fa-bar-chart"></i>Dashboard
                    </NavLink>
                  </li>
                  {/* <li><NavLink to='/addjob'> <i class="icon-form"></i>Job</NavLink></li> */}
                  {/* <li><NavLink to='/ViewRegion'> <i class="fa fa-bar-chart"></i>Location</NavLink></li>
                  <li><NavLink to='/ViewEmployee'> <i class="fa fa-bar-chart"></i>Users</NavLink></li> */}
                  {/* <li><NavLink to='/ViewJob/1'> <i class="fa fa-bar-chart"></i>Job</NavLink></li> */}
                  <li>
                    <NavLink to="/ViewInvoice">
                      {" "}
                      <i class="fa fa-print"></i>Generate Bill
                    </NavLink>
                  </li>
                  {/* <li ><NavLink to='/ViewInventory/1'> <i class="fa fa-list-ol"></i>Inventory</NavLink></li> */}

                  {/* <li><NavLink to='/ViewProduct'> <i class="icon-interface-windows"></i>Product</NavLink></li>
                  <li>
                  <NavLink to='/Employee'> <i class="icon-interface-windows"></i>
                  Employee
                  </NavLink></li>
                  <li><NavLink to='/Billing/1'> <i class="icon-interface-windows"></i>Summary</NavLink></li> */}
                  {adminmenu}
                  {/* <li><NavLink to='/Audits'> <i class="icon-grid"></i>Plant &amp; Lab</NavLink></li>
                  <li><a href="#exampledropdownDropdown" aria-expanded="false" data-toggle="collapse"> <i class="icon-interface-windows"></i>Supplier Review</a>
                    <ul id="exampledropdownDropdown" class="collapse list-unstyled ">
                    <li><NavLink to='/SlitContent'>Aggregates</NavLink></li>
                      <li><NavLink to='/FinenessTest'>Fineness test</NavLink></li>
                      <li><a href="#">Water</a></li>
                      <li><a href="#">AdWater</a></li>
                    </ul>
                  </li>
                  <li><a href="#plant" aria-expanded="false" data-toggle="collapse"> <i class="icon-interface-windows"></i>Plant &amp; Lab</a>
                    <ul id="plant" class="collapse list-unstyled ">
                      <li><a href="#">Audit of Equipment</a></li>
                      <li><a href="#">Verification</a></li>
                      <li><a href="#">Replace / Repair/ Remove</a></li>
                      <li><a href="#">AdWater</a></li>
                    </ul>
                  </li>
                  <li><a href="#rmx" aria-expanded="false" data-toggle="collapse"> <i class="icon-interface-windows"></i>RMX</a>
                    <ul id="rmx" class="collapse list-unstyled ">
                      <li><a href="#">Cube Casting</a></li>
                      <li><a href="#">Bulk Yield</a></li>
                      <li><a href="#">Settling Time</a></li>
                      <li><a href="#">Test Certified</a></li>
                      <li><a href="#">trial Mix Certified</a></li>
                      <li><a href="#">Mix Design Cert.</a></li>
                      <li><a href="#">Design Report</a></li>
                    </ul>
                  </li>
                  <li><a href="login.html"> <i class="icon-interface-windows"></i>Diversion</a></li>
                  <li><a href="#master" aria-expanded="false" data-toggle="collapse"> <i class="icon-interface-windows"></i>Master</a>
                    <ul id="master" class="collapse list-unstyled ">
                      <li><a href="#">Customer Meet</a></li>
                      <li><a href="#">Supplier</a></li>
                      <li><a href="#">Mix Design</a></li>
                      <li><a href="#">Inward Lot</a></li>
                      <li><a href="#">Employee</a></li>
                      <li><a href="#">RM</a></li>
                      <li><a href="#">Site</a></li>
                    </ul>
                  </li>
                  <li><a href="login.html"> <i class="icon-interface-windows"></i>Diversion</a></li>
                  <li><a href="#reports" aria-expanded="false" data-toggle="collapse"> <i class="icon-interface-windows"></i>Reports</a>
                    <ul id="reports" class="collapse list-unstyled ">
                      <li><a href="#">R M Reports</a></li>
                      <li><a href="#">Composition of Actual and Theoritical Composition</a></li>
                      <li><a href="#">Cube Report</a></li>
                      <li><a href="#">Slump Analysis</a></li>
                      <li><a href="#">Thread Analysis</a></li>
                      <li><a href="#">Complete Specification Detail</a></li>
                      <li><a href="#">Yield Output</a></li>
                    </ul>
                  </li> */}
                  {/* <li> <a href="#"> <i class="icon-mail"></i>Demo
                <div class="badge badge-warning">6 New</div></a></li> */}
                </ul>
              </div>
              {/* <div class="admin-menu">
                <h5 class="sidenav-heading">Second menu</h5>
                <ul id="side-admin-menu" class="side-menu list-unstyled">
                  <li> <a href="#"> <i class="icon-screen"> </i>Demo</a></li>
                  <li> <a href="#"> <i class="icon-flask"> </i>Demo
                <div class="badge badge-info">Special</div></a></li>
                  <li> <a href=""> <i class="icon-flask"> </i>Demo</a></li>
                  <li> <a href=""> <i class="icon-picture"> </i>Demo</a></li>
                </ul>
              </div> */}
            </div>
          </nav>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(Sidebar);
