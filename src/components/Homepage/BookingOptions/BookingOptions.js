import React, { useEffect, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import singleBooking from "./../../../assests/images/singleBooking.png";
import roomBooking from "./../../../assests/images/roomBooking.png";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./BookingOptions.css";
import axios from "axios";
import caraousal1 from "./../../../assests/images/caraousal1.jpg";
import caraousal2 from "./../../../assests/images/caraousal2.jpg";
import check from "./../../../assests/images/check.png";
import Login from "../Model/Login/Login";
import Loader from "../../Loader/Loader";


const responsive = {
  300: { items: 1 },
  568: { items: 1 },
  1208: { items: 1 },
  1500: { items: 1 },
};

// const items = [
//   <div className="item">
//     <img src={caraousal1} className="sliderimg" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={caraousal2} className="sliderimg" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={caraousal2} className="sliderimg" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={caraousal2} className="sliderimg" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={caraousal2} className="sliderimg" alt="banner" />
//   </div>,
// ];

const BookingOptions = () => {
  const [showimg, setShowimg] = useState();

  useEffect(() => {
    makeAPIcallForbanner();
  },[]);
  const makeAPIcallForbanner = () => {
    axios
      .get(`https://ecoworksbiz.com/api/news/imageList?type=slider`)
      .then((response) => {
        console.log("xxxxx",response.data);
        setShowimg(response.data.data);
      });
  };

  const items =   
      showimg &&
        showimg.length &&
        showimg.map((banner, index) => (
          <div className="item" key={index}>
            <img
              src={`https://space-image-store.s3.ap-south-1.amazonaws.com/${banner.imageKey}`||caraousal1}
              className="bannersliderimg"
              alt="banner"
            />
          </div>
        ))
    
        const [modalShow, setModalShow] = useState(false);
        const [SignUpmodalShow, setSignUpModalShow] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [RedirectBooking, setRedirectBooking] = useState(false);
        const [BookType, setBookType] = useState("");
        const history = useHistory();
        
       
        
        const updateLoginModalstate = (LoginModalState) => {
          setModalShow(LoginModalState);
        };
        const updateSignUpModalstate = (SignUpmodalShow) => {
          setSignUpModalShow(SignUpmodalShow);
        };

        const checkstatus = () => {
          setModalShow(true);
          setRedirectBooking(true);
        };
      
        // const CheckLoginStatus = () =>{    
         
        //   console.log("status",RedirectBooking)  
        //   if(sessionStorage.token)         
        //   window.open("/roomBooking",'_self')
        //   else
        //   {  checkstatus();         
        //   }
        // }

       const CheckLogin = () => {
         if(!sessionStorage.token)
         {setModalShow(true);
         setRedirectBooking(true);}
         else
         history.push("/roombooking")
       }  

        const SeatBookHandler = () => {      
        
          if(sessionStorage.token)
          {history.push('/roomBooking', {BookType:"seat"});  
          // window.open("/roomBooking",'_self')
          console.log("type",BookType);}
          else
          {  checkstatus();         
          }
        }

        const RoomBookHandler = () => {     
          console.log("clicked")
          if(sessionStorage.token)
         {history.push('/roomBooking', {BookType:"room"});  
          // window.open("/roomBooking",'_self')
          console.log("type",BookType);}
          else
          {  checkstatus();         
          }
        }

      
 
  return (
    <div className="container bookingRowCon">
      <Loader display={isLoading} />
      <Row className="bookingRow">
        <Col xl={{ span: 3, offset: 1 }} lg={{ span: 2, offset: 1 }}>
          <span className="bookingSectionHeading1"> Browse by Workspace </span>
        </Col>
        <Col
          xl={{ span: 3, offset: 1 }}
          lg={{ span: 2, offset: 1 }}
          className="singlebookingcol"
        >
          <img
            src={singleBooking}
            alt="banner"
            className="bookingImg singlebookimg"
            usemap="#image-map"
            onClick={() => SeatBookHandler()}
          />

          {/* <map name="image-map">
            <area
              shape="rect"
              coords="108,87,171,106"
              alt="Computer"
              className="bookingTab"
            />
          </map> */}
        </Col>

        <Col className="roombookingcol">
          <img
            src={roomBooking}
            alt="banner"
            className="bookingImg roombookingimg"
            usemap="#image-map"
            onClick={() => RoomBookHandler()}
          />
          {/* <map name="image-map">
            <area
              shape="rect"
              coords="108,87,171,106"
              alt="Computer"
              className="bookingTab"
            />
          </map> */}
        </Col>
        <Login
          show={modalShow}
          onHide={updateLoginModalstate}
          LoginModalState={modalShow}
          updateLoginModalstate={updateLoginModalstate}
          SignUpmodalShow={SignUpmodalShow}
          updateSignUpModalstate={updateSignUpModalstate}
          setIsLoading={setIsLoading}
          RedirectBooking={RedirectBooking}
        />
      </Row>

      <Row className="bulkbooking">
        <Col lg={6} className="alicerow">
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
            activeIndex={4}
            mouseDragEnabled={true}
            infinite={true}
            paddingLeft={170}
            paddingright={0}
            mouseTracking={true}
          />
        </Col>
        <Col lg={4} className="bulkbookingFeatureSection">
          <span className="bulkbookingfont">
            Bulk Booking <br />
            Feature
          </span>
          <br />
          <div className="bulkbookingfeaturefont">
            <img src={check} className="" alt="banner" /> Fixed slots Booking
            <br />
            <img src={check} className="" alt="banner" /> Flexible Booking Time
            <br />
            <img src={check} className="" alt="banner" /> Discounted Price
            <br />
            <img src={check} className="" alt="banner" /> Multi-Purpose Space
            <br />
            <img src={check} className="" alt="banner" /> Application Based
            Booking
            <br />
          </div>
          <Button className="bulkbookingbtn" onClick={CheckLogin}> Bulk Booking</Button>
        </Col>
      </Row>
    </div>
  );
};

export default BookingOptions;
