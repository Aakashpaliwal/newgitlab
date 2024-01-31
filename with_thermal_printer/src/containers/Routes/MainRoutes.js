import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withAuth from "../../hocs/withAuth";
import Home from "../Home/Home";
import Employee from "../Pages/Employee/Employee";
import ViewEmployee from "../Pages/Employee/ViewEmployee";
import  Viewuser  from "../Pages/Users/Viewuser";
import Invoice from "../Pages/Invoice/Invoice";
import  Coming  from "../Pages/Coming/Coming";
import  Product  from "../Pages/Product/Product";
import  ViewProduct  from "../Pages/Product/ViewProduct";
import  Billing  from "../Pages/Invoice/Billing";
import  Inventory  from "../Pages/Inventory/Inventory";
import  ViewInventory  from "../Pages/Inventory/ViewInventory";
import  AddInventoryItem  from "../Pages/Inventory/AddInventoryItem";
import  Purchase  from "../Pages/Purchase/Purchase";
import  ViewPurchase  from "../Pages/Purchase/ViewPurchase";
import  ViewSale  from "../Pages/Report/ViewSale";
import  PurchaseReport  from "../Pages/Report/Purchase";
import  Vendors  from "../Pages/Vendors/Vendors";
import  Viewvendors  from "../Pages/Vendors/Viewvendors";
export class MainRoutes extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={withAuth(Home)} />
        <Route path="/Employee" exact component={withAuth(Employee)} />
        <Route path="/ViewEmployee" exact component={withAuth(ViewEmployee)} />
        <Route path="/Product" exact component={withAuth(Product)} />
        <Route path="/ViewProduct/:id" exact component={withAuth(ViewProduct)} />
        <Route path="/Inventory/:id" exact component={withAuth(Inventory)} />
        <Route path="/AddInventoryItem" exact component={withAuth(AddInventoryItem)} />
        <Route path="/Editinventory/:id" exact component={withAuth(Inventory)} />
        <Route path="/ViewInvoice" exact component={withAuth(Invoice)} />
        <Route path="/ViewInventory/:id" exact component={withAuth(ViewInventory)} />
        <Route path="/Billing/:id" exact component={withAuth(Billing)} />
        <Route path="/Comingsoon" exact component={withAuth(Coming)} />
        <Route path="/Purchase" exact component={withAuth(Purchase)} />
        <Route path="/ViewPurchase/:id" exact component={withAuth(ViewPurchase)} />
        <Route path="/ViewSale/:id" exact component={withAuth(ViewSale)} />
        <Route path="/PurchaseReport/:id" exact component={withAuth(PurchaseReport)} />
        <Route path="/Viewuser/:id" exact component={Viewuser} />
        <Route path="/Vendors" exact component={withAuth(Vendors)} />
        <Route path="/Viewvendors/:id" exact component={withAuth(Viewvendors)} />
        
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    // information about current user is used to decide what view to render in Homepage component
    // get any errors from state
  };
}

// withRouter allows us to get props from router to component (to use history object to redirect)
// authUser, removeError passed as mapDispatchToProps (so they are available to Main.js within props!)
export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(MainRoutes)
);

//export default MainRoutes;
