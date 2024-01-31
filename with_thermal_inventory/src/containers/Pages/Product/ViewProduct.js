import React, { Component } from "react";
import "./product.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../../../store/actions/Product/product";
import axios from "axios";
import { Whatsapp } from "../../Home/Whatsapp";
import { API_URL } from "../../../url/url";
import Modal from "react-awesome-modal";

// const customStyles = {
//     content : {
//       top                   : '50%',
//       left                  : '50%',
//       right                 : 'auto',
//       bottom                : 'auto',
//       marginRight           : '-50%',
//       transform             : 'translate(-50%, -50%)'
//     }
//   };
export class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      noOfItemsInInventory: "",
      sellingPrice: "",
      sgst: "",
      igst: "",
      id: "",
      cgst: "",
      costPrice: "",
      free: "",
      hsn: "",

      page_no_count: "",
      limit: 10,
      click: 0,
      visible: false
    };
    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }
  handlClick() {
    this.props.fetchProduct(this.props);
  }
  async componentDidMount() {
    await this.handlClick();
  }
  // componentDidUpdate() {
  //     this.props.fetchProduct();
  // }
  deletehandler(item) {
    console.log(item);
    axios
      .delete(
        `${API_URL}item/delete/${item.id}`,
        (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
          "jwt"
        ))
      )
      .then(response => {
        console.log(response);
        if (response.data.data.description == "Item deleted successfully") {
          alert("Product deleted successfully");
          // this.forceUpdate();
          this.handlClick();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  editfunc(item) {
    console.log(item);
    this.setState({
      name: item.name,
      costPrice: item.costPrice,
      id: item.id,
      free: item.free,
      hsn: item.hsn,
      cgst: item.cgst,
      igst: item.igst,
      sgst: item.sgst,
      noOfItemsInInventory: item.noOfItemsInInventory,
      sellingPrice: item.sellingPrice
      // visible: true
    });
    // axios
    //   .put(
    //     `${API_URL}item/update/${item.id}`,
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
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // if (this.validator.allValid()) {
    let body = {
      ui_name: this.state.name,
      ui_cost_price: this.state.costPrice,
      item_id: this.state.id,
      ui_free: this.state.free,
      ui_hsn: this.state.hsn,
      ui_cgst: this.state.cgst,
      ui_igst: this.state.igst,
      ui_sgst: this.state.sgst,
      ui_inventory_quantity: this.state.noOfItemsInInventory,
      ui_selling_price: this.state.sellingPrice
    };
    console.log("state here", body);

    axios
      .put(
        `${API_URL}item/update/${this.state.id}`,
        body,
        (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
          "jwt"
        ))
      )
      .then(response => {
        console.clear();
        console.log("edit resposnse", response);
        if (response.data.data.kind == "Item update") {
          alert("Product Edited Successfully");
          // this.setState({
          //     visible: false
          // });
          // this.forceUpdate();
          // this.handlClick();
          this.forceUpdate();
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  prevhandler() {
    let dataskip = --this.props.match.params.id;
    console.log(dataskip);
    this.props.match.params.id = dataskip;
    let no_pages = this.props.match.params.id;
    console.log("no-pages", no_pages);
    this.props.history.push(`/ViewProduct/${this.props.match.params.id}`);
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
    this.props.history.push(`/ViewProduct/${this.props.match.params.id}`);
    // console.log(`/ViewArea/${this.props.match.params.id}`);
    this.forceUpdate();
    this.handlClick();
  }
  render() {
    let prevbtndipsplay;
    let nextbtndisplay;
    let product_table;
    // let page_count = localStorage.getItem('new_page_count');
    // let final_page_count = localStorage.getItem('number_of_pages')
    // console.log('page_count',page_count)
    // console.log('no_page',final_page_count)
    const { product } = this.props;
    // const { jobdetail } = this.props;
    if(product.length == 0) {
      product_table = (
        <div>
        <center>
        <p style={{fontSize : '15px'}}>There are no products addedd yet.Please add the product by clicking Add Item button.</p>
        </center>
        </div>
        )
    } else {
      product_table = (
        <table className="table table-bordered table-responsive-sm table-responsive-md">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">HSN</th>
                    <th scope="col">Free Quantity</th>
                    <th scope="col">Number in Inventory</th>
                    <th scope="col">Cost Price</th>
                    {/* <th scope="col">Selling Price</th> */}
                    <th scope="col">CGST</th>
                    <th scope="col">SGST</th>
                    <th scope="col">IGST</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.length ? (
                    product.map(function(item, id) {
                      return (
                        <tr key={id}>
                          <td scope="row">{item.name || "NO DATA"}</td>
                          <td scope="row">{item.hsn || "NO DATA"}</td>
                          <td scope="row">{item.free || "NO DATA"}</td>
                          <td scope="col">
                            {item.noOfItemsInInventory || "0"}
                          </td>
                          <td scope="row">{item.costPrice || "NO DATA"}</td>
                          {/* <td scope="row">{item.sellingPrice || "NO DATA"}</td> */}
                          <td scope="row">{item.cgst || "NO DATA"}</td>
                          <td scope="row">{item.sgst || "NO DATA"}</td>
                          <td scope="row">{item.igst || "NO DATA"}</td>
                          <td>
                            {/* <Link to={`/EditEmploye/${item.employe_id}`}> */}
                            {/* <NavLink to ={'/Editjob'}> */}
                            <span
                              class="tooltip-toggle"
                              aria-label="Edit"
                              tabindex="0"
                            >
                              <button
                                className="btn btn-warning custom-edit-btn btn-sm"
                                onClick={this.editfunc.bind(this, item)}
                                // data-toggle="modal"
                                // data-target="#exampleModal"
                                data-toggle="modal"
                                data-target=".bd-example-modal-lg"
                              >
                                <i class="fa fa-pencil" aria-hidden="true" />
                              </button>
                            </span>
                            {/* </NavLink> */}

                            <span
                              class="tooltip-toggle"
                              aria-label="Suspend"
                              tabindex="0"
                            >
                              <button
                                className="btn btn-danger custom-edit-btn btn-sm"
                                onClick={this.deletehandler.bind(this, item)}
                              >
                                <i class="fa fa-trash-o" aria-hidden="true" />
                              </button>
                            </span>
                          </td>
                        </tr>
                      );
                    }, this)
                  ) : (
                  <tr>
                  <td colSpan="9">
                  <center>
                    <span>
                      
                     <div className="data_loading"></div>
                     
                    </span>
                    </center>
                    </td>
                    </tr>
                  )}
                </tbody>
              </table>
        )
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
    }
    
    return (
      <div>
        <div class="breadcrumb-holder">
          <div class="container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active">Items </li>
            </ul>
          </div>
        </div>
        <br />
        <div className="card">
          <div class="card-body">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <hr />
                <Link to="/Product">
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    Add Item
                  </button>
                </Link>
              </div>
            </div>
            <br />
            <div>
             {product_table}
              <div className="row">
                <div className="col-lg-3 offset-lg-3 offset-md-3 col-md-3 col-sm-12 col-xs-12 text-center">
                  {prevbtndipsplay}
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 text-center">
                  {nextbtndisplay}
                </div>
              </div>
              <div className="col-12">
                {/* <Modal visible={this.state.visible} 
                            width="1024"
                            //  height="500" 
                            style={{padding : '20px'}}
                             effect="fadeInUp" 
                             className="custom-modal-react"
                             onClickAway={() => this.closeModal()}>
                    <div>
                    <form className="custom-content-form" style={{padding : '20px'}}>
                      <div className="form-row">

                        <div class="form-group col-md-12">

                        
                          <div class="form-group row">

                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Name
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
                              HSN Number
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="hsn"
                                value={this.state.hsn}
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
                              Free Quantity
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="free"
                                value={this.state.free}
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
                              Product Cost Price
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="costPrice"
                                value={this.state.costPrice}
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
                              Product Selling Price
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="sellingPrice"
                                value={this.state.sellingPrice}
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
                              CGST
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="cgst"
                                value={this.state.cgst}
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
                              SGST
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="sgst"
                                value={this.state.sgst}
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
                              IGST
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="igst"
                                value={this.state.igst}
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
                              Product Inventory Quantity
                        </label>
                            <div class="col-sm-9">
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword"
                                name="noOfItemsInInventory"
                                value={this.state.noOfItemsInInventory}
                                onChange={e => this.handleChange(e)}
                              />
                              

                            </div>
                          </div>
                        </div>

                        

                        <button
                          class="btn btn-primary"
                          onClick={(e) => this.handleSubmit(e)}
                          style={{ float: 'right' }}
                        >
                          Submit
                  </button>
                      </div>
                    </form>
                    </div>
                </Modal> */}

                <div
                  class="modal fade bd-example-modal-lg"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="myLargeModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-lg" role="document">
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
                        <form className="custom-content-form">
                          <div className="form-row">
                            <div class="field form-group col-md-6 custom-product-field">
                              <label for="inp" class="inp">
                                <input
                                  type="text"
                                  id="inp"
                                  placeholder="&nbsp;"
                                  name="name"
                                  value={this.state.name}
                                  onChange={e => this.handleChange(e)}
                                />
                                <span class="label">Product Name</span>
                                <span class="border"></span>
                              </label>
                            </div>
                            {/* <div class="form-group col-md-12">

                        
                          <div class="form-group row">

                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Product Name
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
                        </div> */}

                            <div class="field form-group col-md-6 custom-product-field">
                              <label for="inp" class="inp">
                                <input
                                  type="text"
                                  id="inp"
                                  placeholder="&nbsp;"
                                  name="hsn"
                                  value={this.state.hsn}
                                  onChange={e => this.handleChange(e)}
                                />
                                <span class="label"> HSN Number</span>
                                <span class="border"></span>
                              </label>
                            </div>

                            {/* <div class="form-group col-md-12">
                                                            <div class="form-group row">
                                                                <label
                                                                    for="inputPassword"
                                                                    class="col-sm-3 col-form-label"
                                                                >
                                                                    HSN Number
                        </label>
                                                                <div class="col-sm-9">
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        name="hsn"
                                                                        value={this.state.hsn}
                                                                        onChange={e => this.handleChange(e)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div class="field form-group col-md-12 custom-product-field">
                              <label for="inp" class="inp">
                                <input
                                  type="text"
                                  id="inp"
                                  placeholder="&nbsp;"
                                  name="free"
                                  value={this.state.free}
                                  onChange={e => this.handleChange(e)}
                                />
                                <span class="label">Free Quantity</span>
                                <span class="border"></span>
                              </label>
                            </div>

                            {/* <div class="form-group col-md-12">
                                                            <div class="form-group row">
                                                                <label
                                                                    for="inputPassword"
                                                                    class="col-sm-3 col-form-label"
                                                                >
                                                                    Free Quantity
                        </label>
                                                                <div class="col-sm-9">
                                                                    <input
                                                                        type="text"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        name="free"
                                                                        value={this.state.free}
                                                                        onChange={e => this.handleChange(e)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div> */}

                            <div class="field form-group col-md-6 custom-product-field">
                              <label for="inp" class="inp">
                                <input
                                  type="text"
                                  id="inp"
                                  placeholder="&nbsp;"
                                  name="costPrice"
                                  value={this.state.costPrice}
                                  onChange={e => this.handleChange(e)}
                                />
                                <span class="label"> Product Cost Price</span>
                                <span class="border"></span>
                              </label>
                            </div>
                            {/* <div class="form-group col-md-12">
                                                            <div class="form-group row">
                                                                <label
                                                                    for="inputPassword"
                                                                    class="col-sm-3 col-form-label"
                                                                >
                                                                    Product Cost Price
                        </label>
                                                                <div class="col-sm-9">
                                                                    <input
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        name="costPrice"
                                                                        value={this.state.costPrice}
                                                                        onChange={e => this.handleChange(e)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div class="field form-group col-md-6 custom-product-field">
                              <label for="inp" class="inp">
                                <input
                                  type="text"
                                  id="inp"
                                  placeholder="&nbsp;"
                                  name="sellingPrice"
                                  value={this.state.sellingPrice}
                                  onChange={e => this.handleChange(e)}
                                />
                                <span class="label">
                                  {" "}
                                  Product Selling Price
                                </span>
                                <span class="border"></span>
                              </label>
                            </div>
                            {/* <div class="form-group col-md-12">
                                                            <div class="form-group row">
                                                                <label
                                                                    for="inputPassword"
                                                                    class="col-sm-3 col-form-label"
                                                                >
                                                                    Product Selling Price
                        </label>
                                                                <div class="col-sm-9">
                                                                    <input
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        name="sellingPrice"
                                                                        value={this.state.sellingPrice}
                                                                        onChange={e => this.handleChange(e)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div class="field form-group col-md-4 custom-product-field">
                              <label for="inp" class="inp">
                                <input
                                  type="text"
                                  id="inp"
                                  placeholder="&nbsp;"
                                  name="cgst"
                                  value={this.state.cgst}
                                  onChange={e => this.handleChange(e)}
                                />
                                <span class="label"> CGST</span>
                                <span class="border"></span>
                              </label>
                            </div>
                            {/* <div class="form-group col-md-12">
                                                            <div class="form-group row">
                                                                <label
                                                                    for="inputPassword"
                                                                    class="col-sm-3 col-form-label"
                                                                >
                                                                    CGST
                        </label>
                                                                <div class="col-sm-9">
                                                                    <input
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        name="cgst"
                                                                        value={this.state.cgst}
                                                                        onChange={e => this.handleChange(e)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div class="field form-group col-md-4 custom-product-field">
                              <label for="inp" class="inp">
                                <input
                                  type="text"
                                  id="inp"
                                  placeholder="&nbsp;"
                                  name="sgst"
                                  value={this.state.sgst}
                                  onChange={e => this.handleChange(e)}
                                />
                                <span class="label"> SGST</span>
                                <span class="border"></span>
                              </label>
                            </div>
                            {/* <div class="form-group col-md-12">
                                                            <div class="form-group row">
                                                                <label
                                                                    for="inputPassword"
                                                                    class="col-sm-3 col-form-label"
                                                                >
                                                                    SGST
                        </label>
                                                                <div class="col-sm-9">
                                                                    <input
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        name="sgst"
                                                                        value={this.state.sgst}
                                                                        onChange={e => this.handleChange(e)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div class="field form-group col-md-4 custom-product-field">
                              <label for="inp" class="inp">
                                <input
                                  type="text"
                                  id="inp"
                                  placeholder="&nbsp;"
                                  name="igst"
                                  value={this.state.igst}
                                  onChange={e => this.handleChange(e)}
                                />
                                <span class="label"> IGST</span>
                                <span class="border"></span>
                              </label>
                            </div>
                            {/* <div class="form-group col-md-12">
                                                            <div class="form-group row">
                                                                <label
                                                                    for="inputPassword"
                                                                    class="col-sm-3 col-form-label"
                                                                >
                                                                    IGST
                        </label>
                                                                <div class="col-sm-9">
                                                                    <input
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        name="igst"
                                                                        value={this.state.igst}
                                                                        onChange={e => this.handleChange(e)}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div> */}
                            <div class="field form-group col-md-12 custom-product-field">
                              <label for="inp" class="inp">
                                <input
                                  type="text"
                                  id="inp"
                                  placeholder="&nbsp;"
                                  name="noOfItemsInInventory"
                                  value={this.state.noOfItemsInInventory}
                                  onChange={e => this.handleChange(e)}
                                  disabled
                                />
                                <span class="label">
                                  {" "}
                                  Product Inventory Quantity
                                </span>
                                <span class="border"></span>
                              </label>
                            </div>
                            {/* <div class="form-group col-md-12">
                                                            <div class="form-group row">
                                                                <label
                                                                    for="inputPassword"
                                                                    class="col-sm-3 col-form-label"
                                                                >
                                                                    Product Inventory Quantity
                        </label>
                                                                <div class="col-sm-9">
                                                                    <input
                                                                        type="number"
                                                                        class="form-control"
                                                                        id="inputPassword"
                                                                        name="noOfItemsInInventory"
                                                                        value={this.state.noOfItemsInInventory}
                                                                        onChange={e => this.handleChange(e)}
                                                                    />


                                                                </div>
                                                            </div>
                                                        </div> */}

                            <button
                              class="btn btn-primary"
                              onClick={e => this.handleSubmit(e)}
                              style={{ float: "right" }}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="submit"
                          class="btn btn-default"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
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
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    product: state.product,
    currentUser: state.currentUser.user.id // we only need the current user's id, to check against the user id of each message
  };
}

export default connect(mapStateToProps, { fetchProduct })(ViewProduct);
