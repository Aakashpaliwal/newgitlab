import React, { Component } from "react";
import PropTypes from "prop-types";
import { MdDelete as DeleteIcon } from "react-icons/md";
import styles from "./LineItem.module.scss";
import "./invoice.css";
import { connect } from "react-redux";
import axios from "axios";
import { API_URL } from "../../../url/url";
import { fetchHomeProduct } from "../../../store/actions/Product/homeProduct";
class LineItem extends Component {
  constructor() {
    super();
    this.state = {
      homeprodid: "",
      homeprodbatch: [],
      prodId: "",
      batch: "",
    };
  }
  manualchangefunc = async (e, index) => {
    // this.props.itemChange(this.props.index)
    await this.setState({
      batch: e.target.value,
    });
    this.props.itemChange(this.state.batch, this.state.prodId, index);
  };
  customfunc = async (e, index) => {
    e.preventDefault();
    // console.log('homeprodis ', e.target.value)
    await this.setState({
      prodId: e.target.value,
    });
    this.props.itemChange(this.state.batch, this.state.prodId, index);
    axios
      .get(
        `${API_URL}item/batch/details/${this.state.prodId}`,
        (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
          "jwt"
        ))
      )
      .then((response) => {
        // console.log('batch detail', response);
        this.setState({
          homeprodbatch: response.data.data.items,
        });
      });
    // this.props.itemChange(index)
    // console.log("props",this.props);
  };
  componentDidMount() {
    this.props.fetchHomeProduct();
  }

  render = () => {
    // console.log(this.props)
    const {
      index,
      name,
      item,
      quantity,
      price,
      homeproduct,
      cgst,
      sgst,
      igst,
      costprice,
      free,
      hsn,
      sellingprice,
    } = this.props;

    return (
      <div className={styles.lineItem}>
        <div>{this.props.index + 1}</div>
        <div>
          {/* <input list="products" name="name" type="text" value={item} onChange={this.props.changeHandler(index)} /> */}
          <select
            className="form-control"
            style={{ width: "100%" }}
            name="item"
            //  onChange={this.props.itemChange(index)}
            onChange={(e) => this.customfunc(e, index)}
            // onClick={e => this.customfunc(e)}
          >
            <option value="">Select One </option>
            {homeproduct ? (
              homeproduct.map(function (item, id) {
                return (
                  <option value={item.id} key={id}>
                    {item.name}{" "}
                  </option>
                );
              }, this)
            ) : (
              <span>Data is loading....</span>
            )}
          </select>
          {/* <datalist id="products">
            {product ? (
              product.map(function (item, id) {
                return (
                  <option value={item.name} key={id}>{item.id}</option>
                );
              }, this)
            ) : (
                <span>Data is loading....</span>
              )}
          </datalist> */}
        </div>
        <div className={styles.currency}>
          <select
            className="form-control"
            name="batch"
            onClick={(e) => this.manualchangefunc(e, index)}
          >
            <option value="">Choose ....</option>
            {this.state.homeprodbatch ? (
              this.state.homeprodbatch.map(function (item, id) {
                return (
                  <option key={id} value={item.batch}>
                    {item.batch}
                  </option>
                );
              })
            ) : (
              <span>Data is loading....</span>
            )}
          </select>
        </div>
        {/* <input name="price" type="number" step="1" min="0.00" max="9999999.99" value={price} onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /> */}

        <div>
          <input
            name="quantity"
            type="number"
            step="1"
            min="1"
            value={quantity}
            onChange={this.props.changeHandler(this.props.index)}
            onFocus={this.props.focusHandler}
          />
        </div>

        <div className={styles.currency}>
          {price}
          {/* <input name="price" type="number" step="1" min="0.00" max="9999999.99" value={price} onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /> */}
        </div>
        {/* <div className={styles.currency}>{cgst || '0'} */}
        {/* - {(cgst/100)*price} */}
        {/* <input name="price" type="number" step="1" min="0.00" max="9999999.99" value={price} onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /> */}
        {/* </div> */}
        <div className={styles.currency}>
          {this.props.currencyFormatter(cgst) || "0"}
        </div>
        {/* <div className={styles.currency}>{sgst || '0'} */}
        {/* - {(sgst/100)*price} */}
        {/* <input name="price" type="number" step="1" min="0.00" max="9999999.99" value={price} onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /> */}
        {/* </div> */}
        <div className={styles.currency}>
          {this.props.currencyFormatter(sgst) || "0"}
        </div>
        {/* <div className={styles.currency}>{igst || '0'} */}
        {/* - {(igst/100)*price} */}
        {/* <input name="price" type="number" step="1" min="0.00" max="9999999.99" value={price} onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /> */}
        {/* </div> */}
        <div className={styles.currency}>
          {this.props.currencyFormatter(igst) || "0"}
        </div>
        <div className={styles.currency}>
          {this.props.currencyFormatter(+igst + +cgst + +sgst)}
        </div>
        <div className={styles.currency}>{hsn || "NO DATA"}</div>
        {/* <div className={styles.currency}>{free || '0'}</div>
         <div className={styles.currency}>{costprice || '0'}</div>
         <div className={styles.currency}>{'0'}</div>
         <div className={styles.currency}>{sellingprice || '0'}</div> */}
        <div className={styles.currency}>
          {this.props.currencyFormatter(quantity * price)}
        </div>
        <div>
          <i
            class="lni-trash"
            onClick={this.props.deleteHandler(this.props.index)}
          ></i>
        </div>
      </div>
    );
  };
}

// export default LineItem
function mapStateToProps(state) {
  return {
    homeproduct: state.homeproduct,
    currentUser: state.currentUser.user.id, // we only need the current user's id, to check against the user id of each message
  };
}

export default connect(mapStateToProps, { fetchHomeProduct })(LineItem);

LineItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
