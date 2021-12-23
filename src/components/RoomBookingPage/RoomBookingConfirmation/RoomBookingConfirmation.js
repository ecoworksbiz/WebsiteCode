import React from "react";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import "./RoomBookingConfirmation.css";
import clock from "./../../../assests/images/RoomBooking/clock.png";
import user from "./../../../assests/images/RoomBooking/user.png";
import email from "./../../../assests/images/RoomBooking/email.png";
import mobile from "./../../../assests/images/RoomBooking/mobile.png";
import seat from "./../../../assests/images/RoomBooking/seat.png";
import path from "./../../../assests/images/RoomBooking/path.png";
import Group from "./../../../assests/images/RoomBooking/Group.png";
import axiosMain from "../../../http/axios/axios_main";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const RoomBookingConfirmation = (props) => {

  const ChargesOfBooking = props.TotalAmount;
  

  const [PromoResponse, setPromoResponse] = useState();
  const [promo, setPromo] = useState();
  const [promoCodeResponse, setPromoCodeResponse] = useState();
  const [OrderId, setOrderId] = useState();
  const [Amount, setAmount] = useState(ChargesOfBooking);
  const [BulkOrder, setBulkOrder] = useState(false);
  const PromoData = {
    eventId: props.Id,
    promoCode: promo,
    isBulkOrder: BulkOrder
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const ConfirmBookData = {
    eventId: props.Id,
    promoCode: promo,   
  }
  
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

// async function displayRazorpay() {
//     const res = await loadScript(
//         "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//         alert("Razorpay SDK failed to load. Are you online?");
//         return;
//     }

  
//     const options = {
//         key: "rzp_test_LhI7aif5u8vPXR", 
//         amount: Amount*100 ,
//         currency: "INR",
//         name: "Ecowork Corp.",
//         description: "Test Transaction",       
//         OrderId: OrderId,
//         handler: async function (response) {
//           const data = {
//             orderId: OrderId,
//           paymentId: response.razorpay_payment_id,
//           // orderId: response.razorpay_order_id,
//           signature: response.razorpay_signature
//       };  console.log("razor",data)

//     //  const data = {orderId: "order_I1oBvqxlcDswjG", 
//     //   paymentId: "pay_I1oCQNb5QaLnBT", 
//     //   signature: "0fefe90d76dd6254843e89141c955318af18981d3376d81162b513f635504e8d",
//     //    bulkOrder: "false", bulkBooingId: ""}
      
//       // const result = await axios.post("https://ecoworksbiz.com/api/event/payConfirm", data)
//       const result = await axios.post("https://ecoworksbiz.com/api/event/payConfirm", data, {
//         headers: {
//           'Authorization': `Bearer ${sessionStorage.token}`,
//         },
//       })
//             console.log("result",result)
//             alert(result.data.msg);
//         },
//         prefill: {
//             name: "EcoWork corp",
//             email: "EcoWork@example.com",
//             contact: "9999999999",
//         },
//         notes: {
//             address: "EcoWork Corporate ",
//         },
//         theme: {
//             color: "#61dafb",
//         },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

    
// }
  const PromocodeApi = async (data) => {
    try {
      const promoResponse = await axiosMain.post(`event/confirmBook`, data);
      setPromoResponse(promoResponse.data);
      console.log(promoResponse.data)
      // setAmount(promoResponse.data.data.amount)
      // setOrderId(promoResponse.data.data.id)
      if(promoResponse.data.data.id){
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

  
    const options = {
        key: "rzp_test_LhI7aif5u8vPXR", 
        amount: Amount*100 ,
        currency: "INR",
        name: "Ecowork Corp.",
        description: "Test Transaction",       
        order_id: promoResponse.data.data.id,
        handler: async function (response) {
          console.log("razorpay",response);
          const data = {
            orderId: promoResponse.data.data.id,
          paymentId: response.razorpay_payment_id,         
          signature: response.razorpay_signature
      };  console.log("razor",data)

 
      const result = await axios.post("https://ecoworksbiz.com/api/event/payConfirm", data, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.token}`,
        },
      })
            console.log("result",result)
            // alert(result.data.msg);
            if (result.status == 200) {
              setShow(true);
            }

   
        },
        prefill: {
            name: "EcoWork corp",
            email: "EcoWork@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "EcoWork Corporate ",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open(); }

      console.log("orderid",OrderId);
    
    } catch (error) {
      console.log(PromoResponse?.data.msg)
    }
  }
 
  const CheckPromoCode = async (data) => {
    try {
      const promoResponse = await axiosMain.post(`event/checkPromoCode`, data);
      console.log(promoResponse);
      setPromoCodeResponse(promoResponse.msg);
      console.log(promoResponse.data)      
      return PromoResponse;
    } catch (error) {
      console.log(error)
    }
  }
  
  const handlePromoCode = (event) => {
    const value = event.target.value;
    setPromo(value);
    console.log(promo);
    console.log(props.Id);
  };

  const HandlerPromoApiCall = (data) => {
    PromocodeApi(data);
    // console.log("ptonoo")
    // displayRazorpay();
  }

  console.log(Amount)
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Booking successfull</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Col
        xl={3}
        sm={8}
        lg={8}
        md={8}
        xs={8}
        className="RoomBookingConfirmationColxl4"
      >
        <Row className="BookingConfirmationRow">
          <div className="BookingConfirmation">Confirmation</div>
          <div className="userBookingDetails">
            <img src={user} className="" alt="banner" />
            <span className="Detailbox">{props.Name}</span>
          </div>
          <div className="userBookingDetails">
            <img src={email} className="" alt="banner" />
            <span className="Detailbox">{sessionStorage.email}</span>
          </div>
          <div className="userBookingDetails">
            <img src={mobile} className="" alt="banner" />
            <span className="Detailbox">{props.MobileNo}</span>
          </div>
          <div className="userBookingDetails">
            <img src={Group} className="" alt="banner" />
            <span className="Detailbox">{props.Date}</span>
          </div>
          <div className="userBookingDetails">
            <img src={clock} className="" alt="banner" />
            <span className="Detailbox">{props.Date}</span>
          </div>
          <div className="userBookingDetails">
            <img src={path} className="" alt="banner" />
            <span className="Detailbox">{props.Location}</span>
          </div>
          <div className="userBookingDetails">
            <img src={seat} className="" alt="banner" />
            <span className="Detailbox">{props.Seat} Seat Booked</span>
          </div>
          <div className="userBookingDetails">
            <img src={clock} className="" alt="banner" />
            <span className="Detailbox">
              Require Time Extension: {props.Extended}
              {props.NoExtended}
            </span>
          </div>
        </Row>
        <Row className="BookingAmountConfirmationRow">
          <Row className="TotalAmountHeadingRow">
            <div className="TotalAmountHeading">Total Amount</div>
            <div className="TotalAmountNo ">Rs. {Amount}</div>
          </Row>
          <Row className="PromoCodeRow">
            <div className="PromoCode">Promo Code</div>
            <div className="ApplyPromoCodeHere">Apply Promo Code Here</div>
            <div className="ApplyPromo">
              <input
                type="text"
                placeholder="Enter Promo Code"
                id="PromoCodeinput"
                onChange={handlePromoCode}
              />
              {/* <Button className="ApplyButton" onClick={() => { HandlerPromoApiCall(PromoData) }}>APPLY</Button> */}
              <Button
                className="ApplyButton"
                onClick={() => {
                  CheckPromoCode(PromoData);
                }}
              >
                APPLY
              </Button>
            </div>
          </Row>
        </Row>
        {/* <Button className="ProceedButton" onClick={() => {displayRazorpay() }}>Proceed</Button> */}
        <Button
          className="ProceedButton"
          onClick={() => {
            HandlerPromoApiCall(ConfirmBookData);
          }}
        >
          Proceed
        </Button>
      </Col>
    </>
  );
};

export default RoomBookingConfirmation;
