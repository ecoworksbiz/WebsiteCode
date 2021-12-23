// import React, { useState } from "react";
// import { Button, Row } from "react-bootstrap";

// const BulkBooking = (props) => {
//   const makeAPIcallForBulkBooking = async (data) => {
//     console.log("data", data);
//     console.log("op", Requirement);
//     setIsLoading(true);
//     try {
//       const response = await axiosMain.post(`event/createBulkBooking`, data);
//       console.log("response", response.data);
//       setResponse(response);
//       const axoisSuccess = response.data.msg;
//       console.log("axoisSuccess", axoisSuccess);
//       setmessage(axoisSuccess);
//       setShow(true);
//       setIsLoading(false);
//       if (axoisSuccess === "Event created") ToasterOnClick(axoisSuccess);
//       else ToasterOnClickError(axoisSuccess);
//       return response;
//     } catch (error) {
//       setIsLoading(false);
//       const axoisError = error.response?.data?.msg || error;
//       console.log("axoisError", axoisError);
//       setErrormessage(axoisError);
//       setShow(false);
//       ToasterOnClickError(axoisError);
//     }
//   };

//   const HandleSubmit = (data) => {
//     console.log("validate", validate());
//     if (validate() === true) makeAPIcallForBulkBooking(data);
//     else return null;
//   };

//   return (
//     <Row xl={4}>
//       <Button
//         className="BookingConfirmButton"
//         onClick={() => HandleSubmit(props.data)}
//       >
//         Confirm
//       </Button>
//     </Row>
//   );
// };

// export default BulkBooking;
