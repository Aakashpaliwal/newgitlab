import React, { Component } from 'react';
import './Home.css';
// import './main'
import { Link } from 'react-router-dom';
export class Whatsapp extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div id="mybutton">
            <button class="feedback">
              <a href={'https://api.whatsapp.com/send?phone=+919284720778&text=Hi%20we%20want%20to%20register%20for%20free%20Billing%20Solution'} target="_blank">
                <i class="lni-whatsapp" />
              </a>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Whatsapp;
