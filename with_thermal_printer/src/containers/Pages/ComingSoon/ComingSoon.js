import React, { Component } from 'react'
import './ComingSoon.css'
export class ComingSoon extends Component {
  render() {
    return (
      <div>
         <div class="breadcrumb-holder">
          <div class="container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><Link to="/">Home</Link></li>
              <li class="breadcrumb-item active">Forms       </li>
            </ul>
          </div>
        </div>
        <br />
        <section class="forms">
          <div class="container">
            <div className="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header d-flex align-items-center">
                    <h4>Coming Soon !!!! </h4>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default ComingSoon
