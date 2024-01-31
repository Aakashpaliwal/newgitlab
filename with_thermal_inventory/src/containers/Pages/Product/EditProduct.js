import React, { Component } from 'react'
import "./Job.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchJobDetail } from "../../../store/actions/Job/jobDetail";
import axios from "axios";
export class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
          job_id: this.props.match.params.id,
          ui_title: "",
          ui_category: [],
          ui_type: "",
          ui_description: "",
          ui_link: ""
        };
      }
      editfunc(item) {}
      componentDidMount() {
        axios
          .get(
            `http://mahalakshya.dev.letswegrow.com/job/post/details/${
              this.props.match.params.id
            }`,
            (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
              "jwt"
            ))
          )
          .then(response => {
            console.log(response.data.data.items[0]);
            let arr = []
            arr.push(response.data.data.items[0][0].jobCategories)
            // let catdetailhere = this.state.ui_category.push( response.data.data.items[0][0].jobCategories)
            console.log('catdetailshere',arr)
            this.setState({
              ui_title: response.data.data.items[0][0].jobTitle,
    
              ui_type: response.data.data.items[0][0].jobType,
              ui_description: response.data.data.items[0][0].jobDescription,
              ui_link: response.data.data.items[0][0].jobLink,
              ui_category :arr
            });
            
            console.log('state here',this.state)
          })
       
          .catch(error => {
            console.log(error);
          });
      }
      change = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
      handleSubmit = async e => {
        e.preventDefault();
        // if (this.validator.allValid()) {
        let body = {
          ui_title : this.state.ui_title,
          ui_description: this.state.ui_description,
          ui_type : this.state.ui_type,
          ui_link: this.state.ui_link,
          ui_category: this.state.ui_category,
          job_id  : this.props.match.params.id
        };
        console.log("state here", body);
    
        axios
          .put(
            `http://mahalakshya.dev.letswegrow.com/job/post/modify/${
              this.props.match.params.id
            }`,
            body,
            (axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
              "jwt"
            ))
          )
          .then(response => {
            console.log(response);
    
            // this.setState({
            //   ui_title: response.data.data.items[0][0].jobTitle,
            //   ui_category: response.data.data.items[0][0].jobCategories,
            //   ui_type: response.data.data.items[0][0].jobType,
            //   ui_description: response.data.data.items[0][0].jobDescription,
            //   ui_link: response.data.data.items[0][0].jobLink
            // });
          })
          .catch(error => {
            console.log(error);
          });
      };
      render() {
        const { result } = this.props;
        return (
          <div>
            <div class="breadcrumb-holder">
              <div class="container-fluid">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Edit Item </li>
                </ul>
              </div>
            </div>
            <br />
            <section class="forms">
              <div class="container-fluid">
                <div className="row">
                  <div class="col-lg-12">
                    <div class="card">
                      <div class="card-header d-flex align-items-center">
                        <h4>Add Job</h4>
                      </div>
                      <div class="card-body">
                        {/* <p>Lorem ipsum dolor sit amet consectetur.</p> */}
                        <form>
                          <div class="form-group customjob-title-input">
                            <label>Job Title</label>
                            <input
                              type="text"
                              // placeholder="Web Developer"
                              class="form-control"
                              name="ui_title"
                              value={this.state.ui_title}
                              onChange={e => this.change(e)}
                            />
                          </div>
                          <div class="form-group customjob-title-input">
                            <label>Job Category</label>
                            <br />
    
                            <input
                              type="text"
                              // placeholder="Web Developer"
                              class="form-control"
                              name="ui_category"
                              value={this.state.ui_category}
                              onChange={e => this.change(e)}
                            />
                          </div>
                          <div class="form-group customjob-title-input">
                            <label>Job Type</label>
    
                            <input
                              type="text"
                              // placeholder="Web Developer"
                              class="form-control"
                              name="ui_type"
                              value={this.state.ui_type}
                              onChange={e => this.change(e)}
                            />
                          </div>
                          <div class="form-group customjob-title-input">
                            <label>Job Link</label>
                            <input
                              type="text"
                              // placeholder="Web Developer"
                              class="form-control"
                              name="ui_link"
                              value={this.state.ui_link}
                              onChange={e => this.handleChange(e)}
                            />
                          </div>
                          <div class="form-group">
                            <label>Job Description</label>
                            <input
                              type="text"
                              // placeholder="Web Developer"
                              class="form-control"
                              name="ui_description"
                              value={this.state.ui_description}
                              onChange={e => this.change(e)}
                            />
                          </div>
    
                          <div class="form-group">
                            <input
                              type="submit"
                              value="Submit"
                              class="btn btn-primary"
                              onClick={e => this.handleSubmit(e)}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
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
      jobdetail: state.jobdetail,
      currentUser: state.currentUser.user.id // we only need the current user's id, to check against the user id of each message
    };
  }
  export default connect(
    mapStateToProps,
    { fetchJobDetail }
  )(Editjob);
