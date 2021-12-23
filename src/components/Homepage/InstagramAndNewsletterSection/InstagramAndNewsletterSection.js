import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
// import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./InstagramAndNewsletterSection.css";
// import insta1 from "./../../assests/images/insta1.jpg";
// import insta2 from "./../../assests/images/insta2.jpg";
// import insta3 from "./../../assests/images/insta3.jpg";
// import insta4 from "./../../assests/images/insta4.jpg";
// import insta5 from "./../../assests/images/insta5.jpg";
// import insta6 from "./../../assests/images/insta6.jpg";
import arrow from "./../../../assests/images/arrow.png";

// const responsive = {
//   0: { items: 1 },
//   550: { items: 2 },
//   907: { items: 3 },
//   1100: { items: 4 },
//   1300: { items: 5 },
//   1500: { items: 6 },
// };

// const items = [
//   <div className="item">
//     <img src={insta1} className="sliderimg1" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={insta2} className="sliderimg1" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={insta3} className="sliderimg1" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={insta4} className="sliderimg1" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={insta5} className="sliderimg1" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={insta6} className="sliderimg1" alt="banner" />
//   </div>,
// ];

const InstagramAndNewsletterSection = () => {
  return (
    <div>
      {/* <div className="container">
        <Row className="instagramSection" id="blog">
          <Col className="instagramRow1">
            <span className="SubHeading">#Instagram</span>
            <div className="heading">
              We build some successful
              <br /> story on Instagram
            </div>
            <span className="subcontent">
              Reimagining brand identities and business model approaches.
            </span>
          </Col>
          <Col className="instagramRow2">
            <div className="Content">
              Lorem Ipsum is simply dummy text of the printing <br />
              and typesetting
              <br />
              industry. Lorem Ipsum has been the #industry's standard
              <br /> dummy
              <br /> text ever since the 1500s, when an unknown printer took a
              gallery
              <br /> of type and scrambled it to make a type specimen book.
            </div>
          </Col>
        </Row>
      </div>
      <Row className="fluid-container imageSlider">
        <AliceCarousel
          duration={400}
          autoPlay={true}
          startIndex={1}
          fadeOutAnimation={true}
          autoPlayInterval={2000}
          autoPlayDirection="ltr"
          items={items}
          responsive={responsive}
          disableButtonsControls={true}
          mouseDragEnabled={true}
          mouseTracking={true}
          swipeDisabled={false}
          // paddingLeft={50}
          // paddingRight={50}
          disableDotsControls={true}
          infinite={true}
        ></AliceCarousel>
      </Row> */}
      <div className="fluid-container" id="contactUs">
        <Row className="emailsection">
          <Col xs={6} className="emailCaption">
            Stay up to date with our news,
            <br />
            ideas and updates
          </Col>
          <Col xs={6} className="emailform">
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="email"
                    placeholder="Your Email Address"
                    className="emailbox"
                  />
                </Form.Group>
                <Col>
                  <Button type="submit" className="emailsubmitbtn">
                    <img src={arrow} alt="banner" />
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InstagramAndNewsletterSection;
