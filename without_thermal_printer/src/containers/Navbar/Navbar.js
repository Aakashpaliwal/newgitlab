import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";

// bootstrap cdn used for styling (pulled in <head> of src/index.html)
class Navbar extends Component {
  // using arrow functions to retain 'this' and avoid need to bind 'this' in constructor
  logout = e => {
    e.preventDefault();
    // gets here through mapDispatchToProps (second param of connect() at bottom of this file)
    this.props.logout();
    console.log("logged out!");
    localStorage.clear();
  };
  render() {
    return (
      <div>
        {this.props.currentUser.isAuthenticated ? (
          <header class="header">
            <nav class="navbar">
              <div class="container-fluid">
                <div class="navbar-holder d-flex align-items-center justify-content-between">
                  <div class="navbar-header">
                    <a id="toggle-btn" href="#" class="menu-btn">
                      <i class="icon-bars"> </i>
                    </a>
                    <a href="/" class="navbar-brand">
                      <div class="brand-text d-none d-md-inline-block">
                        {/* <span>JOB </span> */}
                        <strong class="text-primary">Dashboard</strong>
                      </div>
                    </a>
                  </div>
                  <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                    {/* <li class="nav-item dropdown"> <a id="notifications" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link"><i class="fa fa-bell"></i><span class="badge badge-warning">12</span></a>
                      <ul aria-labelledby="notifications" class="dropdown-menu">
                        <li><a rel="nofollow" href="#" class="dropdown-item">
                          <div class="notification d-flex justify-content-between">
                            <div class="notification-content"><i class="fa fa-envelope"></i>You have 6 new messages </div>
                            <div class="notification-time"><small>4 minutes ago</small></div>
                          </div></a></li>
                        <li><a rel="nofollow" href="#" class="dropdown-item">
                          <div class="notification d-flex justify-content-between">
                            <div class="notification-content"><i class="fa fa-twitter"></i>You have 2 followers</div>
                            <div class="notification-time"><small>4 minutes ago</small></div>
                          </div></a></li>
                        <li><a rel="nofollow" href="#" class="dropdown-item">
                          <div class="notification d-flex justify-content-between">
                            <div class="notification-content"><i class="fa fa-upload"></i>Server Rebooted</div>
                            <div class="notification-time"><small>4 minutes ago</small></div>
                          </div></a></li>
                        <li><a rel="nofollow" href="#" class="dropdown-item">
                          <div class="notification d-flex justify-content-between">
                            <div class="notification-content"><i class="fa fa-twitter"></i>You have 2 followers</div>
                            <div class="notification-time"><small>10 minutes ago</small></div>
                          </div></a></li>
                        <li><a rel="nofollow" href="#" class="dropdown-item all-notifications text-center"> <strong> <i class="fa fa-bell"></i>view all notifications                                            </strong></a></li>
                      </ul>
                    </li>
                
                    <li class="nav-item dropdown"> <a id="messages" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link"><i class="fa fa-envelope"></i><span class="badge badge-info">10</span></a>
                      <ul aria-labelledby="notifications" class="dropdown-menu">
                        <li><a rel="nofollow" href="#" class="dropdown-item d-flex">
                          <div class="msg-profile"> <img src="img/avatar-1.jpg" alt="..." class="img-fluid rounded-circle" /></div>
                          <div class="msg-body">
                            <h3 class="h5">Jason Doe</h3><span>sent you a direct message</span><small>3 days ago at 7:58 pm - 10.06.2014</small>
                          </div></a></li>
                        <li><a rel="nofollow" href="#" class="dropdown-item d-flex">
                          <div class="msg-profile"> <img src="img/avatar-2.jpg" alt="..." class="img-fluid rounded-circle" /></div>
                          <div class="msg-body">
                            <h3 class="h5">Frank Williams</h3><span>sent you a direct message</span><small>3 days ago at 7:58 pm - 10.06.2014</small>
                          </div></a></li>
                        <li><a rel="nofollow" href="#" class="dropdown-item d-flex">
                          <div class="msg-profile"> <img src="img/avatar-3.jpg" alt="..." class="img-fluid rounded-circle" /></div>
                          <div class="msg-body">
                            <h3 class="h5">Ashley Wood</h3><span>sent you a direct message</span><small>3 days ago at 7:58 pm - 10.06.2014</small>
                          </div></a></li>
                        <li><a rel="nofollow" href="#" class="dropdown-item all-notifications text-center"> <strong> <i class="fa fa-envelope"></i>Read all messages    </strong></a></li>
                      </ul>
                    </li>
                
                    <li class="nav-item dropdown"><a id="languages" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link language dropdown-toggle"><img src="img/flags/16/GB.png" alt="English" /><span class="d-none d-sm-inline-block">English</span></a>
                      <ul aria-labelledby="languages" class="dropdown-menu">
                        <li><a rel="nofollow" href="#" class="dropdown-item"> <img src="img/flags/16/DE.png" alt="English" class="mr-2" /><span>German</span></a></li>
                        <li><a rel="nofollow" href="#" class="dropdown-item"> <img src="img/flags/16/FR.png" alt="English" class="mr-2" /><span>French                                                         </span></a></li>
                      </ul>
                    </li>
                */}
                    <li class="nav-item">
                      <a href="" class="nav-link logout" onClick={this.logout}>
                        {" "}
                        <span class="d-none d-sm-inline-block">Logout</span>
                        <i class="fa fa-sign-out" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
