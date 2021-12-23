import React from "react";
import "./Footer.css";
import logo from "./../../../assests/images/logo.png";
import facebook from "./../../../assests/images/facebook.png";
import instagram from "./../../../assests/images/instagram.png";
import linkedin from "./../../../assests/images/linkedin.png";
import twitter from "./../../../assests/images/twitter.png";
import top from "./../../../assests/images/top.png";

const Footer = () => {
  return (
    <footer>
      <div className="container footercon">
        <div className="row footer">
          <div className="col-lg-3 col-md-6 footerrow1">
            <img alt="logo" src={logo} className="logoSizeFooter" />
          </div>

          <div className="col-lg-2 col-md-6 footerCompany">
            <h3
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              COMPANY
            </h3>

            <div className="collapse dont-collapse-sm" id="collapseExample">
              <div className="well">
                <ul>
                  <li>
                    <a href="/">Vision</a>
                  </li>

                  <li>
                    <a href="/"> Mission</a>
                  </li>
                  {/* <li>
                    <a href="/">Inclusion & Diversity </a>
                  </li>
                  <li>
                    <a href="/">Careers</a>
                  </li>
                  <li>
                    <a href="/">Investors</a>
                  </li>
                  <li>
                    <a href="/">Newsrooms</a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h3
              data-toggle="collapse"
              data-target="#collapseExample1"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              PARTNERSHIPS
            </h3>
            <div className="collapse dont-collapse-sm" id="collapseExample1">
              <div className="well">
                <ul>
                  {/* <li>
                    <a href="/">Brokers</a>
                  </li>
                  <li>
                    <a href="/">Landlords</a>
                  </li> */}
                  <li>
                    <a href="/">Refer a Friend</a>
                  </li>
                  {/* <li>
                    <a href="/">Event Planners</a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h3
              data-toggle="collapse"
              data-target="#collapseExample2"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              SUPPORT
            </h3>
            <div className="collapse dont-collapse-sm" id="collapseExample2">
              <div className="well">
                <ul style={{ marginLeft: "0px" }}>
                  <li>
                    <a href="/">COVID Response</a>
                  </li>
                  <li>
                    <a href="/">FAQ</a>
                  </li>
                  <li>
                    <a href="/">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h3
              data-toggle="collapse"
              data-target="#collapseExample3"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Locations
            </h3>
            <div className="collapse dont-collapse-sm" id="collapseExample3">
              <div className="well">
                <ul>
                  <li>
                    <a href="/">Gandhinagar</a>
                  </li>

                  <li className="invisible">
                    <a href="/">Bodakdev</a>
                  </li>
                  <li className="invisible">
                    <a href="/">Science city Road</a>
                  </li>
                  <li className="invisible">
                    <a href="/">Prahlad Nagar</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="follow_us">
              <h5>Find us on social media</h5>
              <ul className="socialLogo">
                <li>
                  <a href="#0">
                    <img alt="banner" src={facebook} className="" />
                  </a>
                </li>
                <li>
                  <a href="#0">
                    <img alt="banner" src={twitter} className="" />
                  </a>
                </li>
                <li>
                  <a href="#0">
                    <img alt="banner" src={linkedin} className="" />
                  </a>
                </li>
                <li>
                  <a href="#0">
                    <img alt="banner" src={instagram} className="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a href="#top">
          {" "}
          <div className="top">
            <i class="fas fa-chevron-up"></i>
          </div>
        </a>
        <hr className="footerBottomLine" />
        <div className="row add_bottom_25 footerBottomLine">
          <div className="col-lg-12 bottomRowFooter">
            <span className="bottomRowContent">
              © 2021 Ecoworks, All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
