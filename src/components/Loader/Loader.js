import React, { Component } from "react";
import "./Loader.css";

class Loader extends Component {
  render() {
    return (
      <div
        id="loader"
        style={{
          visibility: this.props.display ? "visible" : "hidden",
          opacity: this.props.display ? "0.9" : "0",
        }}
      >
        <div
          className="bg-light h-100 w-100 d-flex"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {/* <div className="text-center my-auto mx-auto">
            <i
              className="fas fa-circle-notch fa-spin text-dark"
              style={{ fontSize: 40 }}
            ></i>
          </div> */}
          <div class="page-load-err anim1">

<div class="page-load-err__icon">
  <svg viewBox="0 0 64 64"><g class="icon-loader" stroke-width="0"><circle cx="24" cy="0" transform="translate(32,32)" r="2.09865"><animate attributeName="r" dur="750ms" values="8;7;6;5;4;3;2;1;8" repeatCount="indefinite"></animate></circle><circle cx="16.970562748477143" cy="16.97056274847714" transform="translate(32,32)" r="1.84305"><animate attributeName="r" dur="750ms" values="1;8;7;6;5;4;3;2;1" repeatCount="indefinite"></animate></circle><circle cx="1.4695761589768238e-15" cy="24" transform="translate(32,32)" r="2.84305"><animate attributeName="r" dur="750ms" values="2;1;8;7;6;5;4;3;2" repeatCount="indefinite"></animate></circle><circle cx="-16.97056274847714" cy="16.970562748477143" transform="translate(32,32)" r="3.84305"><animate attributeName="r" dur="750ms" values="3;2;1;8;7;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="-24" cy="2.9391523179536475e-15" transform="translate(32,32)" r="4.84305"><animate attributeName="r" dur="750ms" values="4;3;2;1;8;7;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="-16.970562748477143" cy="-16.97056274847714" transform="translate(32,32)" r="5.84305"><animate attributeName="r" dur="750ms" values="5;4;3;2;1;8;7;6;5" repeatCount="indefinite"></animate></circle><circle cx="-4.408728476930472e-15" cy="-24" transform="translate(32,32)" r="6.84305"><animate attributeName="r" dur="750ms" values="6;5;4;3;2;1;8;7;6" repeatCount="indefinite"></animate></circle><circle cx="16.970562748477136" cy="-16.970562748477143" transform="translate(32,32)" r="7.84305"><animate attributeName="r" dur="750ms" values="7;6;5;4;3;2;1;8;7" repeatCount="indefinite"></animate></circle></g></svg>
</div>
<p class="page-load-err__text">Loading...</p>
</div>




        </div>
      </div>
    );
  }
}

export default Loader;
