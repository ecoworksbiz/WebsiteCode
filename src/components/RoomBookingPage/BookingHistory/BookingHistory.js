import React, { useState, useEffect } from "react";
import EcoworkAppSection from "../../Homepage/EcoworkAppSection/EcoworkAppSection";
import { Row, Col, Button, Dropdown, Image } from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import Footer from "../../Homepage/Footer/Footer";
import Header from "../../Homepage/Header/Header";
import InstagramAndNewsletterSection from "../../Homepage/InstagramAndNewsletterSection/InstagramAndNewsletterSection";
import "./BookingHistory.css";
import path from "./../../../assests/images/RoomBooking/path.png";
import room from "./../../../assests/images/RoomBooking/room.png";
import roompath from "./../../../assests/images/RoomBooking/roompath.png";
import calendar from "./../../../assests/images/RoomBooking/calendar.png";
import roomimg from "./../../../assests/images/RoomBooking/roomimg.png";
import axios from "axios";
import axiosMain from "./../../../http/axios/axios_main";

const BookingHistory = () => {
  const [Room, setRoom] = useState("both");
  const [Location, setLocation] = useState("Ahemdabad");
  const [Response, setResponse] = useState([]);
  const [RepeatEventResponse, setRepeatEventResponse] = useState([]);
  useEffect(() => {
    console.log("R");
    makeAPIcallForBookingHistory();
  }, []);
  const history = useHistory();
  const RoomSelectHandler = (string) => {
    setRoom(string);
    // console.log("room",Room)
  };

  const LocationSelectHandler = (string) => {
    setLocation(string);
    // console.log("room",Room)
  };

  const makeAPIcallForBookingHistory = async () => {
    const response = await axiosMain.get(
      `event/userEvents/?userId=${sessionStorage.id}`
    );
    setResponse(response.data.data.getEventData);
  };

  console.log("Response", Response);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  const makeAPIcallForRepeatEvent = async (id) => {
    const response = await axiosMain.get(
      `/event/eventDetails?eventId=${id}`
      
    );
    setRepeatEventResponse(response.data.data.getEventData);
    console.log("Response", response);
    const data = {
      bookingPurpose: response.data.data.getEventData.bookingPurpose,  
      startDate: response.data.data.getEventData.startDate,
      endDate: response.data.data.getEventData.endDate,
      isExtended: response.data.data.getEventData.isExtended,
      isSelfBooking: response.data.data.getEventData.isSelfBooking,
      bookType: response.data.data.getEventData.bookType,
      bookingContactName: response.data.data.getEventData.bookBy.name,
      bookingContactNumber: response.data.data.getEventData.bookBy.phoneNumber,
      additionalRequirements: response.data.data.getEventData.additionalRequirements,    
    };
    console.log("Response", data);
    history.push(`/roomBooking/${id}`, {data})
  };
 
  

  return (
    <div>
      <Header />
      <Row>
        <Col md={8} xl={8} sm={8} xs={8} className=" RoomBookingCol1">
          <span className="RoomBookingTitle">Booking History</span>
        </Col>
        <Col xl={4} md={4} sm={4} xs={4} className=" RoomBookingCol2"></Col>
      </Row>
      <Row>
        <Col xl={6} className="RoomBookingURL">
        <Link to="/" className="BookingPagenav">Home</Link> / Booking History
        </Col>
        <Col xl={1} className="Sortby">
          {" "}
          Filter By{" "}
        </Col>
        <Col className="SortbyRooms">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <Image src={room} className="DDroproom" />{" "}
              <span className="DDroproomicon"> {Room} </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => RoomSelectHandler("Seat")}>
                Seat
              </Dropdown.Item>
              <Dropdown.Item onClick={() => RoomSelectHandler("Room")}>
                Room
              </Dropdown.Item>
              <Dropdown.Item onClick={() => RoomSelectHandler("Both")}>
                Both
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="SortbyLocation">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <Image src={path} className="DDropLocation" />{" "}
              <span className="DDropLocationicon"> {Location} </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item
                onClick={() => LocationSelectHandler("GandhiNagar")}
              >
                GandhiNagar
              </Dropdown.Item> */}
              <Dropdown.Item onClick={() => LocationSelectHandler("Ahemdabad")}>
                Ahemdabad
              </Dropdown.Item>
              {/* <Dropdown.Item onClick={() => LocationSelectHandler("UlasNagar")}>
                UlasNagar
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
         <Link to="/roomBooking"> <Button className="BookingHistorybtn">
            Room Booking
          </Button>{" "} </Link>
        </Col>
      </Row>
      <div className="container bookinghistory" >
        <Row className="BookingHistoryDetailsRow">
        {Response.map((user) => ( 
          <>
          { lowerFirstLetter(Room) === user.bookType || lowerFirstLetter(Room) === "both" ?
          <Col
            xl={5}
            lg={5}
            md={5}
            xs={10}
            sm={10}
            className="BookingHistoryDetailsCol"
          >
            
            <Row>
            
              
              <Col>
                {" "}
                <img src={roomimg} className="" alt="map" />
              </Col>
              
                <Col>
                  <div className="BookingHistoryPlaceDetails1">
                    {user.seatBooked} {capitalizeFirstLetter(user.bookType)} Booked
                  </div> <br/>
                  <div className="BookingHistoryPlaceDetails">
                    <img src={roompath} className="" alt="map" />
                    <span className="data">
                      {user.placeId.completeAddress}, Near {capitalizeFirstLetter(user.placeId.landmark)} - {capitalizeFirstLetter(user.placeId.city)}
                      {/* Boston House, 7th Floor, Near SG Express Highway, Prahlad
                    Nagar - Ahemdabad 380001{" "} */}
                    </span>
                  </div>
                  <div className="BookingHistoryPlaceDetails">
                    <img src={calendar} className="" alt="map" />
                    <span className="data"> {user.createdAt} </span>
                  </div>
                  <Button className="Repeatbtn" onClick={() => makeAPIcallForRepeatEvent(user._id)}>Repeat</Button>
                </Col>
           
            </Row> 
          </Col> : null }   </> ))}
        </Row>
      </div>
      <EcoworkAppSection />
      <InstagramAndNewsletterSection />
      <Footer />
    </div>
  );
};

export default BookingHistory;
