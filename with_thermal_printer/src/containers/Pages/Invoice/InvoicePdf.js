import React from "react";
import ReactToPrint from "react-to-print";


class ComponentToPrint extends React.Component {
    state = {
        lineItems: JSON.parse(localStorage.getItem("lineItem"))      }

    render() {
      return (
        <div style={{width :'30%'}}>
        <div style={{width :'100%'}}>
        <div style={{float:'left'}} >
            <strong>Elipi Software Solution</strong><br />
            131-201 Anmol Regency<br />
            brijeshwari annaxe, Ashish nagar, Indore<br />
            8370088555
        </div>
        <div style={{float:'right'}} >
            <strong>Customer Id:</strong> 123456<br />
            <strong>Invoice No.: </strong>123456<br />
            <strong>Date:</strong>{ new Date().toJSON().slice(0,10).replace(/-/g,'/')}
        </div>
        </div>
        <br />
        <br />
        <br />  
        <table>
        <caption>Invoice</caption>
          <thead>
            <th>Sr.No.</th>
            <th>Item: </th>
            <th>Rate: </th>
            <th>Qty: </th>
          </thead>
          <tbody>
            {this.state.lineItems ? (this.state.lineItems.map(function (item, id) {
                return (
                    <tr key={id}>
                        <th >{item.id}</th>
                        <th >{item.name}</th>
                        <th>{item.price}</th>
                        <th>{item.quantity}</th>
                    </tr>
                );
            }, this)
            ) : (<span>Data is loading....</span>)}
          </tbody>
          <tfoot>
    <tr>
      <th>Items Price</th>
      <th>{localStorage.getItem("subtotal")}</th>
      </tr>
      <tr>
      <th>GST</th>
      <th>{localStorage.getItem("gst")}</th>
      </tr>
      <tr>
      <th>Amount</th>
      <th>{localStorage.getItem("amount")}</th>
    </tr>
  </tfoot>

        </table>
        </div>
      );
    }
  }
  
  class Example extends React.Component {
    render() {
      return (
        <div>
          <ReactToPrint
            trigger={() => <a href="#">Print this out!</a>}
            content={() => this.componentRef}
          />
          <ComponentToPrint ref={el => (this.componentRef = el)} />
        </div>
      );
    }
  }
  
  export default Example;
  