import React from "react";
import { Row, Col } from "react-bootstrap";
import ac from "./../../../assests/images/ac.png";
import wifi from "./../../../assests/images/wifi.png";
import privacy from "./../../../assests/images/privacy.png";
import mute from "./../../../assests/images/mute.png";
import toilet from "./../../../assests/images/toilet.png";
import chair from "./../../../assests/images/chair.png";
import books from "./../../../assests/images/books.png";
import rupee from "./../../../assests/images/rupee.png";
import "./WhyEcoworksSection.css";

const WhyEcoworksSection = () => {
  return (
    <div className="container WhyEcoworksSectionRow" id="whyEcoworks">
      <span className="WhyEcoworkH0">Why Ecoworks?</span>
      <Row className="container WhyEcoworkRowcontainer">
        <Col lg={3} className="whyEcoworkCol">
          <img src={ac} className="whyEcoworkImage" alt="banner" /> <br />
          <span className="WhyEcoworkH1"> Fully Air Conditioned</span>
          <div className="WhyEcoworkH2"></div>
        </Col>
        <Col lg={3} className="whyEcoworkCol">
          <img src={wifi} className="whyEcoworkImage" alt="banner" />
          <br />
          <span className="WhyEcoworkH1">High Speed WIFI </span>
          <div className="WhyEcoworkH2"></div>
        </Col>
        <Col lg={3} className="whyEcoworkCol">
          <img src={privacy} className="whyEcoworkImage" alt="banner" />
          <br />
          <span className="WhyEcoworkH1">Privacy </span>
          <div className="WhyEcoworkH2"></div>
        </Col>
        <Col lg={3} className="whyEcoworkCol">
          <img src={mute} className="whyEcoworkImage" alt="banner" />
          <br />
          <span className="WhyEcoworkH1">Noise Free </span>
          <div className="WhyEcoworkH2"></div>
        </Col>
      </Row>
      <Row className="container whyEcoWorkRow2">
        <Col lg={3} className="whyEcoworkCol">
          <img src={toilet} className="whyEcoworkImage" alt="banner" />
          <br />
          <span className="WhyEcoworkH1">Attached Washroom </span>
          <div className="WhyEcoworkH2"></div>
        </Col>
        <Col lg={3} className="whyEcoworkCol">
          <img src={chair} className="whyEcoworkImage" alt="banner" />
          <br />
          <span className="WhyEcoworkH1"> Comfortable Seats</span>
          <div className="WhyEcoworkH2"></div>
        </Col>
        <Col lg={3} className="whyEcoworkCol">
          <img src={books} className="whyEcoworkImage" alt="banner" />
          <br />
          <span className="WhyEcoworkH1">Free books to Read </span>
          <div className="WhyEcoworkH2"></div>
        </Col>
        <Col lg={3} className="whyEcoworkCol ">
        <img src={rupee} className="whyEcoworkImagerupee" alt="banner" />
          <br />
          <div className="WhyEcoworkH1"> Cost Effective</div>
        </Col>
      </Row>
    </div>
  );
};

export default WhyEcoworksSection;
