import React from "react";
import { Row, Col } from "react-bootstrap";
import appstore from "./../../../assests/images/appstore.png";
import playstore from "./../../../assests/images/playstore.png";
import mobile from "./../../../assests/images/mobile.png";
import "./EcoworkAppSection.css";

const EcoworkAppSection = () => {
  return (
    <div className="container ecoworkappSectioncontainer">
      <Row className="ecoworkappSection">
        <Col lg={6} className="ecoworkAppCol">
          <span className="headingFont">
            Ecoworks App <br /> Download Today!
          </span>
          <br />
          <div className="subHeadingFont">
            Lorem Ipsum is simply dummy text Printing and typesetting industry
            <br />
            Industry's standard dummy text When an unknown printer took
          </div>
          <br />
          <div className="store">
            <img src={appstore} alt="banner" className="appstore" />
            <img src={playstore} alt="banner" className="playstore" />
          </div>
        </Col>
        <Col lg={4} className="mobilecol">
          <img src={mobile} alt="banner" className="mobile" />
        </Col>
      </Row>
    </div>
  );
};

export default EcoworkAppSection;
