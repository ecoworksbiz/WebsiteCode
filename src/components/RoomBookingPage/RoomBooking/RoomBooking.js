import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import EcoworkAppSection from "../../Homepage/EcoworkAppSection/EcoworkAppSection";
import { Row, Col, Button, Form } from "react-bootstrap";
import axiosMain from "./../../../http/axios/axios_main";
import Footer from "../../Homepage/Footer/Footer";
import Header from "../../Homepage/Header/Header";
import InstagramAndNewsletterSection from "../../Homepage/InstagramAndNewsletterSection/InstagramAndNewsletterSection";
import RoomBookingConfirmation from "../RoomBookingConfirmation/RoomBookingConfirmation";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Stack from "@mui/material/Stack";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./RoomBooking.css";
import map from "./../../../assests/images/RoomBooking/map.png";
import Loader from "../../Loader/Loader";
import toastr from "toastr";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DateTimePicker from "@mui/lab/DateTimePicker";

import "toastr/build/toastr.min.css";
import BulkBooking from "./BulKBooking";

export const additionalRequirementList = [
  {
    label: "Projector",
    value: "projector",
  },
  {
    label: "Tea/Coffee",
    value: "teacoffee",
  },
  {
    label: "Room Decoration",
    value: "roomdecoration",
  },
  {
    label: "Speakers",
    value: "speakers",
  },
  {
    label: "Others",
    value: "others",
  },
];

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const UserDateRange = [
  {
    startDate: " ",
    endDate: " ",
  },
];

const RoomBooking = (props) => {
  const [BookingPurpose, Setbookingpurpose] = useState("");
  const [BookingPurposeError, setBookingPurposeError] = useState("");
  const [IsExtended, SetisExtended] = useState("");
  const [IsExtendedError, setIsExtendedError] = useState("");
  const [SelfBooking, setSelfBooking] = useState("");
  const [SelfBookingError, setSelfBookingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Errormessage, setErrormessage] = useState("");
  const [message, setmessage] = useState("");
  const [Show, setShow] = useState();
  const [BookingType, setBookingType] = useState();
  const [BookingTypeError, setBookingTypeError] = useState("");
  const [Response, setResponse] = useState();
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 1 * 86400000)
  );
  const [EndDate, setEndDate] = useState("");
  const [value, setValue] = React.useState(new Date("2020-01-01 13:00"));
  const [EndTime, setEndTime] = React.useState(new Date("2020-01-01 14:00"));
  const [optionSelected, setOptionSelected] = useState([]);
  const [Requirement, setRequirement] = useState([]);
  // const [DateRange, setDateRange] = useState(UserDateRange);
  const [Name, SetName] = useState(sessionStorage.username);
  const [MobileNo, SetMobileNo] = useState(sessionStorage.contact);
  const [NameError, setNameError] = useState("");
  const [MobileNoError, setMobileNoError] = useState("");
  const [BookingCategory, setBookingCategory] = useState("");
  const [RequiredHour, setRequiredHour] = useState("");
  const [bulkBookingType, setbulkBookingType] = useState("");
  const [inputList, setInputList] = useState([
    {
      startDate: new Date("2020-01-01 13:00"),
      endDate: new Date("2020-01-01 14:00"),
    },
  ]);

  const history = useHistory();

  // const BookType = props.location.state.BookType;
  console.log("booktype", props.location);
  React.useEffect(() => {
    setBookingType(props?.location?.state?.BookType || "");
    Setbookingpurpose(props?.location?.state?.data?.bookingPurpose || "");
    SetMobileNo(props?.location?.state?.data?.bookingContactNumber || "");
    SetName(props?.location?.state?.data?.bookingContactName || "");
    setRequirement(props?.location?.state?.data?.additionalRequirements || "");
    setBookingType(props?.location?.state?.data?.bookType || "");
    setSelfBooking(props?.location?.state?.data?.isSelfBooking || "");
    SetisExtended(props?.location?.state?.data?.isExtended || "");
  }, []);

  if (!sessionStorage.token) history.push("/");

  const ToasterOnClick = (msg) => {
    toastr.options = {
      positionClass: "toast-top-full-width",
      hideDuration: 800,
      timeOut: 900,
    };
    toastr.clear();
    setTimeout(() => toastr.success(msg), 800);
  };

  const ToasterOnClickError = (msg) => {
    toastr.options = {
      positionClass: "toast-top-full-width",
      hideDuration: 1000,
      timeOut: 1100,
    };
    toastr.clear();
    setTimeout(() => toastr.error(msg), 1000);
  };

  const handleChange = (selected) => {
    console.log(selected);
    setOptionSelected(selected);

    const result = optionSelected.map((a) => a.value);

    setRequirement(result);
  };

  // console.log("ary", Requirement);

  const UserDate =
    (startDate.getFullYear() < 10 ? "0" : "") +
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1 < 10 ? "0" : "") +
    (startDate.getMonth() + 1) +
    "-" +
    (startDate.getDate() < 10 ? "0" : "") +
    startDate.getDate();
  const Time =
    (value.getHours() < 10 ? "0" : "") +
    value.getHours() +
    ":" +
    (value.getMinutes() < 10 ? "0" : "") +
    value.getMinutes() +
    ":" +
    "00";
  // (value.getSeconds() < 10 ? "0" : "") +
  // value.getSeconds();

  const mintime = parseInt(
    (value.getMinutes() < 10 ? "0" : "") + value.getMinutes()
  );

  console.log("min", mintime);

  const BookingEndTime =
    (EndTime.getHours() < 10 ? "0" : "") +
    EndTime.getHours() +
    ":" +
    (EndTime.getMinutes() < 10 ? "0" : "") +
    EndTime.getMinutes() +
    ":" +
    "00";
  // (EndTime.getSeconds() < 10 ? "0" : "") +
  // EndTime.getSeconds();

  const StartTime = `${UserDate} ${Time} `;
  const BEndTime = `${UserDate} ${BookingEndTime} `;

  const BulkStartTime = UserDate;
  const BulkEndTime = UserDate;

  // console.log("time", StartTime);

  const data = {
    bookingPurpose: BookingPurpose,
    placeId: "613b975bb38ba01b34ecfdc0",
    startDate: StartTime,
    endDate: BEndTime,
    isExtended: IsExtended,
    isSelfBooking: SelfBooking,
    bookType: BookingType,
    bookingContactName: Name,
    bookingContactNumber: MobileNo,
    additionalRequirements: ["speaker"],
    reason: "",
  };

  const FixedHourBulkData = {
    bookingPurpose: BookingPurpose,
    placeId: "613b975bb38ba01b34ecfdc0",
    isExtended: IsExtended,
    isSelfBooking: SelfBooking,
    bookType: BookingType,
    bookingContactName: Name,
    bookingContactNumber: MobileNo,
    additionalRequirements: ["speaker"],
    dateRanges: inputList,
    reason: "",
  };

  const VariableHourBulkData = {
    bookingPurpose: BookingPurpose,
    placeId: "613b975bb38ba01b34ecfdc0",
    startDate: BulkStartTime,
    endDate: BulkEndTime,
    isExtended: IsExtended,
    isSelfBooking: SelfBooking,
    bookType: BookingType,
    bookingContactName: Name,
    bookingContactNumber: MobileNo,
    additionalRequirements: ["speaker"],
    seat: RequiredHour,
    reason: "",
  };

  // const data = {
  //   bookingPurpose: "seat",
  //   placeId: "613b975bb38ba01b34ecfdc0",
  //   startDate: "2021-07-09 11:30:00",
  //   endDate: "2021-07-09 13:30:00",
  //   isExtended: false,
  //   isSelfBooking: true,
  //   bookType: "seat",
  //   bookingContactName: "dsadjkads",
  //   bookingContactNumber: "1234567890",
  //   additionalRequirements: Requirement,
  //   reason: "nai kevu",
  // };

  const makeAPIcallForRoomBooking = async (data) => {
    console.log("data", data);
    console.log("op", Requirement);
    setIsLoading(true);
    try {
      const response = await axiosMain.post(`event/checkAvailable`, data);
      console.log("response", response.data);
      setResponse(response);
      const axoisSuccess = response.data.msg;
      console.log("axoisSuccess", axoisSuccess);
      setmessage(axoisSuccess);
      setShow(true);
      setIsLoading(false);
      if (axoisSuccess === "Event created") ToasterOnClick(axoisSuccess);
      else ToasterOnClickError(axoisSuccess);
      return response;
    } catch (error) {
      setIsLoading(false);
      const axoisError = error.response?.data?.msg || error;
      console.log("axoisError", axoisError);
      setErrormessage(axoisError);
      setShow(false);
      ToasterOnClickError(axoisError);
    }
  };

  const validate = () => {
    if (BookingType === "") {
      const error = "Select  Booking Type";
      console.log("data", error);
      setBookingTypeError(error);
    } else if (BookingPurpose === "") {
      const error = "Enter Booking Purpose";
      console.log("data", error);
      setBookingPurposeError(error);
    } else if (IsExtended === "") {
      const error = "Select the field";
      setIsExtendedError(error);
    } else if (SelfBooking === "") {
      const error = "Select the field";
      setSelfBookingError(error);
    } else if (SelfBooking === "false" && Name === sessionStorage.username) {
      const error = "Enter Name";
      setNameError(error);
    } else if (SelfBooking === "false" && MobileNo === sessionStorage.contact) {
      const error = "Enter MobileNo.";
      setMobileNoError(error);
    }
    //     else if (SelfBooking === "true") {
    //   SetName(sessionStorage.username)
    //   SetMobileNo(sessionStorage.contact)
    // }
    else return true;
  };

  const HandleSubmit = (data) => {
    console.log("validate", validate());
    if (validate() === true) makeAPIcallForRoomBooking(data);
    else return null;
  };

  const HandleBulkSubmit = (data) => {
    makeAPIcallForBulkBooking(data);
  };

  const handleBookingPurpose = (event) => {
    const value = event.target.value;
    Setbookingpurpose(value);
    setBookingPurposeError("");
    setmessage("");
  };

  const RequiredHourHandler = (event) => {
    const value = event.target.value;
    setRequiredHour(value);
  };

  const handleBookingCategory = (event) => {
    const value = event.target.value;
    setBookingCategory(value);
    // setBookingPurposeError("");
    // setmessage("");
  };

  const handleIsExtended = (event) => {
    const value = event.target.value;
    SetisExtended(value);
    setIsExtendedError("");
    setmessage("");
  };

  const SelfBookingHandler = (event) => {
    const value = event.target.value;
    setSelfBooking(value);
    setSelfBookingError("");
    setmessage("");
    console.log("user", SelfBooking);
  };

  const bulkBookingTypeHandler = (event) => {
    const value = event.target.value;
    setbulkBookingType(value);
    // setSelfBookingError("");
    // setmessage("");
  };

  const NameHandler = (event) => {
    const value = event.target.value;
    SetName(value);
    setNameError("");
    setmessage("");
    console.log("user", SetName);
  };

  const ContactHandler = (event) => {
    const value = event.target.value;
    SetMobileNo(value);
    setMobileNoError("");
    setmessage("");
    console.log("user", SetMobileNo);
  };

  const GoogleMap = () => {
    window.open(
      "https://www.google.com/maps/place/SHARAN+BUSINESS/@23.2560872,72.6386263,19z/data=!3m1!4b1!4m19!1m13!4m12!1m4!2m2!1d78.9401376!2d29.201814!4e1!1m6!1m2!1s0x395c2c7534fa62d9:0x2b2d8a7153b946c4!2sSHARAN+BUSINESS,+beside+D'Mart,+Green+City,+Sector+26,+Gandhinagar,+Gujarat!2m2!1d72.6391554!2d23.2560952!3m4!1s0x395c2c7534fa62d9:0x2b2d8a7153b946c4!8m2!3d23.2560952!4d72.6391554",
      "_blank"
    );
  };

  function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  const next = AddMinutesToDate(value, 60);

  React.useEffect(() => {
    if (message === "Event created") setmessage("");
  }, [value, EndTime, startDate, EndDate]);

  console.log("efdf", new Date(startDate.getTime() + 86400000));

  // handle input change
  const handleInputChange = (e, index, dayType) => {
    // console.log("tarfet",e)
    // const { } = e.target;
    const list = [...inputList];
    list[index][dayType] = e;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    console.log("time", inputList);
    setInputList([...inputList, { startDate: "", endDate: "" }]);
  };

  // const endtime = parseInt(
  //   (inputList.startDate.getMinutes() < 10 ? "0" : "") + inputList.startDate.getMinutes()
  // );

  const makeAPIcallForBulkBooking = async (data) => {
    console.log("data", data);
    console.log("op", Requirement);
    setIsLoading(true);
    try {
      const response = await axiosMain.post(`event/createBulkBooking`, data);
      console.log("response", response.data);
      setResponse(response);
      const axoisSuccess = response.data.msg;
      console.log("axoisSuccess", axoisSuccess);
      setmessage(axoisSuccess);
      setShow(true);
      setIsLoading(false);
      if (axoisSuccess === "Event created") ToasterOnClick(axoisSuccess);
      else ToasterOnClickError(axoisSuccess);
      return response;
    } catch (error) {
      setIsLoading(false);
      const axoisError = error.response?.data?.msg || error;
      console.log("axoisError", axoisError);
      setErrormessage(axoisError);
      setShow(false);
      ToasterOnClickError(axoisError);
    }
  };

  const [locationList, setLocationList] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      const Location = {
        "lat": "22.9921",
        "long": "72.6325"
      }
      const response = await axiosMain.get(`place?lat=${Location.lat}&long=${Location.long}`)
      console.log('Location Repsonse ===>', response)
      setPlaces(response.data);
      const locationDDListData = places.map((place) => {
        return {
          label: place.landmark + ',' + place.city,
          value: place._id
        }
      });
      setLocationList(locationDDListData)
    };
    getLocation();
  }, []);

  return (
    <div>
      <Loader display={isLoading} />
      <Header />
      <Row>
        <Col md={8} xl={8} sm={8} xs={8} className=" RoomBookingCol1">
          <span className="RoomBookingTitle">Booking</span>
        </Col>
        <Col xl={4} md={4} sm={4} xs={4} className=" RoomBookingCol2"></Col>
      </Row>
      <Row>
        <Col xl={6} md={8} className="RoomBookingURL">
          <Link to="/" className="BookingPagenav">
            Home
          </Link>{" "}
          / Booking
        </Col>
        <Col>
          <Link to="/bookingHistory">
            <Button className="BookingHistory">Booking History</Button>{" "}
          </Link>
        </Col>
      </Row>
      <div className="container RoomBookingBody">
        <Row>
          <Col xl={7} sm={10} xs={10} md={10}>
            <Row>
              <Col xl={9} className="location">
                <Row className="BookingLocation">
                  <Col>  <div className="BookingDetails">Select Location</div>
                  <Form>
            <Form.Row className="formcity">
              <Form.Group as={Col}>
                <Form.Control
                  as="select"
                  defaultValue="Select City"
                  className="cityselect"
                  size="sm"
                >
                  
                  {locationList.map((option) => (
           <option value={option.value}>{option.label}</option>
         ))}                               
                </Form.Control>
               
              </Form.Group>
             
            </Form.Row>
          </Form>
                  </Col>
                </Row>{" "}
              </Col>
              <Col>
                <img src={map} className="map" alt="map" onClick={GoogleMap} />
              </Col>{" "}
            </Row>
            <Row className="BookingType">
              <div> Booking Category</div>
              <Row className="BookingRadioFormRow">
                <div className="row mb-3 ">
                  <Col className="BookingRadioFormCol1" for="inline-radio-1">
                    <Form.Check
                      inline
                      label="Seat Booking"
                      name="group1"
                      type="radio"
                      id="inline-radio-1"
                      className="RadioForm"
                      value="seat"
                      checked={BookingType === "seat"}
                      onChange={() => {
                        setBookingType("seat");
                        setBookingTypeError("");
                        setmessage("");
                      }}
                    />
                  </Col>

                  <Col className="BookingRadioFormCol">
                    <Form.Check
                      inline
                      label="Room Booking"
                      name="group1"
                      type="radio"
                      id={`inline-radio-2`}
                      className="RadioForm"
                      value="room"
                      checked={BookingType === "room"}
                      onChange={() => {
                        setBookingType("room");
                        setBookingTypeError("");
                        setmessage("");
                      }}
                    />
                  </Col>

                  <Col className="BookingRadioFormCol">
                    <Form.Check
                      inline
                      label="Bulk Booking"
                      name="group1"
                      type="radio"
                      id={`inline-radio-3`}
                      className="RadioForm"
                      value="bulk"
                      onChange={() => {
                        setBookingType("bulk");
                        setBookingTypeError("");
                        setmessage("");
                      }}
                    />
                  </Col>
                </div>

                {!BookingTypeError ? null : (
                  <p className="errormsg"> {BookingTypeError} </p>
                )}
              </Row>
            </Row>
            <Row className="BookingDetailsRow">
              {BookingType === "bulk" ? (
                <>
                  <div className="BookingDetails">Booking Category</div>
                  <Form className="BookingCategory">
                    <Form.Row className="BookingPurposeRow">
                      <Form.Group as={Col} xl={5}>
                        <FormControl fullWidth className="input-block">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={BookingCategory}
                            label=""
                            onChange={handleBookingCategory}
                            className="bookingPurposeSelect"
                          >
                            <MenuItem value={"FixedHour"}>Fixed Hour</MenuItem>
                            <MenuItem value={"VariableHour"}>
                              Variable Hour
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Form.Group>
                    </Form.Row>
                  </Form>{" "}
                </>
              ) : null}
              <div className="BookingDetails">Booking Details</div>
              <Form>
                <Row className="BookingPurposeRow">
                  <Form.Group as={Col} lg={5}>
                    <Form.Label>Booking Purpose</Form.Label>
                    <FormControl fullWidth className="input-block">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={BookingPurpose}
                        label=""
                        onChange={handleBookingPurpose}
                        className="bookingPurposeSelect"
                      >
                        <MenuItem value={"selfstudy"}>Self-Study</MenuItem>
                        <MenuItem value={"examination"}>Examination</MenuItem>
                        <MenuItem value={"onlineclass"}>Online Class</MenuItem>
                        <MenuItem value={"officework"}>Office Work</MenuItem>
                        <MenuItem value={"others"}>Others</MenuItem>
                      </Select>
                    </FormControl>
                    {!BookingPurposeError ? null : (
                      <p className="errormsg"> {BookingPurposeError} </p>
                    )}
                  </Form.Group>
                  {BookingPurpose === "others" ? (
                    <>
                      {/* <div className="SelectTime">Name</div> */}
                      <Form.Row className="BookingPurposeRow">
                        <Form.Group as={Col} xl={5}>
                          <Form.Control
                            placeholder="Booking Purpose"
                            onChange={handleBookingPurpose}
                          />
                          {!BookingPurposeError ? null : (
                            <p className="errormsg"> {BookingPurposeError} </p>
                          )}
                        </Form.Group>
                      </Form.Row>
                    </>
                  ) : null}

                  {BookingType != "bulk" ? (
                    <Form.Group as={Col} lg={7}>
                      <Form.Label>Date</Form.Label>
                      <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date(Date.now() + 1 * 86400000)}
                        maxDate={addMonths(new Date(), 1)}
                        showDisabledMonthNavigation
                        id="PromoCodeinput"
                      />
                    </Form.Group>
                  ) : null}
                </Row>
                {BookingCategory === "VariableHour" &&
                BookingType === "bulk" ? (
                  <>
                    {" "}
                    <div className="SelectTime">Select Date</div>
                    <Row className="BookingPurposeRow">
                      <Form.Group as={Col}>
                        <Form.Label>Start Date</Form.Label>
                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          minDate={new Date(Date.now() + 1 * 86400000)}
                          maxDate={addMonths(new Date(), 1)}
                          showDisabledMonthNavigation
                          id="PromoCodeinput"
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>End Date</Form.Label>
                        <DatePicker
                          dateFormat="yyyy/MM/dd"
                          selected={EndDate}
                          onChange={(date) => setEndDate(date)}
                          minDate={new Date(startDate.getTime() + 86400000)}
                          maxDate={addMonths(new Date(), 1)}
                          showDisabledMonthNavigation
                          id="PromoCodeinput"
                        />
                      </Form.Group>
                    </Row>
                    <div className="SelectTime">Required Hours</div>
                    <Form.Row className="BookingPurposeRow">
                      <Form.Group as={Col} xl={5}>
                        <Form.Control
                          placeholder="Enter Hours (minimum: 10)"
                          onChange={RequiredHourHandler}
                        />
                      </Form.Group>
                    </Form.Row>
                  </>
                ) : null}
                {BookingType != "bulk" ? (
                  <>
                    {" "}
                    <div className="SelectTime">Select Time</div>
                    <Row className="BookingPurposeRow">
                      <Form.Group as={Col}>
                        <Form.Label>Start Time</Form.Label>
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          id="PromoCodeinput"
                        >
                          <Stack spacing={3}>
                            <TimePicker
                              ampm={true}
                              openTo="hours"
                              views={["hours", "minutes"]}
                              inputFormat="HH:mm"
                              mask="__:__:__"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              shouldDisableTime={(timeValue, clockType) => {
                                if (
                                  clockType === "minutes" &&
                                  timeValue !== 30 &&
                                  clockType === "minutes" &&
                                  timeValue !== 0
                                ) {
                                  return true;
                                }

                                return false;
                              }}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>End Time</Form.Label>
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          id="PromoCodeinput"
                        >
                          <Stack spacing={3}>
                            <TimePicker
                              ampm={true}
                              openTo="hours"
                              views={["hours", "minutes"]}
                              inputFormat="HH:mm"
                              mask="__:__:__"
                              value={EndTime}
                              onChange={(newValue) => {
                                setEndTime(newValue);
                              }}
                              minTime={next}
                              // maxTime={next}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              shouldDisableTime={(timeValue, clockType) => {
                                if (
                                  clockType === "minutes" &&
                                  timeValue !== mintime
                                ) {
                                  return true;
                                }

                                return false;
                              }}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </Form.Group>
                    </Row>{" "}
                  </>
                ) : null}
                {BookingCategory === "FixedHour" && BookingType === "bulk" ? (
                  <>
                    {" "}
                    <Row>
                      {" "}
                      <Col>
                        {" "}
                        <div className="SelectTime">Select Time</div>
                      </Col>
                      {/* <Col> <Button onClick={AddSlotHandler}> ADD Slot </Button> </Col>  */}
                    </Row>
                    {inputList.map((x, i) => {
                      return (
                        <Row className="BookingPurposeRow" key={i}>
                          <Form.Group as={Col}>
                            <Form.Label>Start Time</Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                renderInput={(props) => (
                                  <TextField {...props} />
                                )}
                                dateFormat="yyyy/MM/dd"
                                minDate={new Date(Date.now() + 1 * 86400000)}
                                maxDate={addMonths(new Date(), 1)}
                                value={x.startDate}
                                onChange={(e) =>
                                  handleInputChange(e, i, "startDate")
                                }
                                shouldDisableTime={(timeValue, clockType) => {
                                  if (
                                    clockType === "minutes" &&
                                    timeValue !== 30 &&
                                    clockType === "minutes" &&
                                    timeValue !== 0
                                  ) {
                                    return true;
                                  }

                                  return false;
                                }}
                              />
                            </LocalizationProvider>
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>End Time</Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                renderInput={(props) => (
                                  <TextField {...props} />
                                )}
                                // label="DateTimePicker"
                                value={x.endDate}
                                dateFormat="yyyy/MM/dd"
                                minDate={new Date(Date.now() + 1 * 86400000)}
                                maxDate={addMonths(new Date(), 1)}
                                onChange={(e) =>
                                  handleInputChange(e, i, "endDate")
                                }
                                shouldDisableTime={(timeValue, clockType) => {
                                  if (
                                    clockType === "minutes" &&
                                    timeValue !== 30 &&
                                    clockType === "minutes" &&
                                    timeValue !== 0
                                  ) {
                                    return true;
                                  }

                                  return false;
                                }}
                              />
                            </LocalizationProvider>
                          </Form.Group>
                          <div className="btn-box">
                            {inputList.length !== 1 && (
                              <button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}
                              >
                                Remove
                              </button>
                            )}
                            {inputList.length - 1 === i && (
                              <button onClick={handleAddClick}>Add</button>
                            )}
                          </div>
                        </Row>
                      );
                    })}{" "}
                  </>
                ) : null}

                {BookingType === "bulk" ? (
                  <>
                    {" "}
                    <div className="BookingDetailsSeats">Seats</div>
                    <Form.Row className="BookingPurposeRow">
                      <Form.Group as={Col} xl={5}>
                        <Form.Control
                          as="select"
                          defaultValue=""
                          size="sm"
                          required
                        >
                          {" "}
                          <option value="0">
                            {BookingType === "seat" ? "1 Seat" : "10 Seat"}{" "}
                          </option>
                        </Form.Control>
                      </Form.Group>
                    </Form.Row>{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="BookingDetailsSeats">Booking Type</div>
                    <Form.Row className="BookingPurposeRow">
                      <Form.Group as={Col} xl={5}>
                        <FormControl fullWidth className="input-block">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={bulkBookingType}
                            label=""
                            onChange={bulkBookingTypeHandler}
                            className="bookingPurposeSelect"
                          >
                            <MenuItem value={"room"}>Room</MenuItem>
                            <MenuItem value={"seat"}>Seat</MenuItem>
                          </Select>
                        </FormControl>
                        {/* {!SelfBookingError ? null : (
                      <p className="errormsg"> {SelfBookingError} </p>
                    )} */}
                      </Form.Group>
                    </Form.Row>
                  </>
                )}
              </Form>
            </Row>
            <Row className="BookingDetailsRow">
              <div className="BookingDetails">Require Time Extension?</div>
              <Form>
                <Row className="BookingRadioFormRow">
                  <div className="row mb-3 ">
                    <Col className="">
                      <Form.Check
                        required
                        inline
                        label="Yes"
                        name="group1"
                        type="radio"
                        id={`inline-radio-1`}
                        className="RadioForm"
                        value="true"
                        // checked={IsExtended === true}
                        onChange={handleIsExtended}
                      />
                    </Col>
                    <Col className="">
                      <Form.Check
                        required
                        inline
                        label="No"
                        name="group1"
                        type="radio"
                        id={`inline-radio-2`}
                        className="RadioForm"
                        value="false"
                        // checked={IsExtended === false}
                        onChange={handleIsExtended}
                      />
                    </Col>
                  </div>
                  {!IsExtendedError ? null : (
                    <p className="errormsg"> {IsExtendedError} </p>
                  )}
                </Row>

                <div className="SelectTime">Booking For</div>
                <Form.Row className="BookingPurposeRow">
                  <Form.Group as={Col} xl={5}>
                    <FormControl fullWidth className="input-block">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={SelfBooking}
                        label=""
                        onChange={SelfBookingHandler}
                        className="bookingPurposeSelect"
                      >
                        <MenuItem value={"true"}>Self</MenuItem>
                        <MenuItem value={"false"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                    {!SelfBookingError ? null : (
                      <p className="errormsg"> {SelfBookingError} </p>
                    )}
                  </Form.Group>
                </Form.Row>

                {/* SelfBooking === "true" ? 
                <> {SetName(sessionStorage.username)}
                {SetMobileNo(sessionStorage.contact)} */}

                {SelfBooking === "false" ? (
                  <>
                    {" "}
                    <div className="SelectTime">Name</div>
                    <Form.Row className="BookingPurposeRow">
                      <Form.Group as={Col} xl={5}>
                        <Form.Control
                          placeholder="Enter Name"
                          onChange={NameHandler}
                        />
                        {!NameError ? null : (
                          <p className="errormsg"> {NameError} </p>
                        )}
                      </Form.Group>
                    </Form.Row>
                    <div className="SelectTime">Mobile No.</div>
                    <Form.Row className="BookingPurposeRow">
                      <Form.Group as={Col} xl={5}>
                        <Form.Control
                          placeholder="Enter Mobile No."
                          onChange={ContactHandler}
                        />
                        {!MobileNoError ? null : (
                          <p className="errormsg"> {MobileNoError} </p>
                        )}
                      </Form.Group>
                    </Form.Row>{" "}
                  </>
                ) : null}
              </Form>
            </Row>
            {BookingType === "seat" ? null : (
              <Row className="BookingDetailsRow">
                <div className="SelectTime">Additional Requirements</div>
                <br />
                <div
                  class="d-inline-block"
                  data-toggle="popover"
                  data-trigger="focus"
                  data-content="Please selecet account(s)"
                >
                  <ReactSelect
                    options={additionalRequirementList}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                    onChange={handleChange}
                    allowSelectAll={true}
                    value={optionSelected}
                  />
                </div>
              </Row>
            )}
            {/* { BookingType === "bulk" ? <BulkBooking data={bulkData}/> : */}
            <Row xl={4}>
              {BookingType === "bulk" && BookingCategory === "FixedHour" ? (
                <Button
                  className="BookingConfirmButton"
                  onClick={() => HandleBulkSubmit(FixedHourBulkData)}
                >
                  Confirm
                </Button>
              ) : BookingType === "bulk" &&
                BookingCategory === "VariableHour" ? (
                <Button
                  className="BookingConfirmButton"
                  onClick={() => HandleBulkSubmit(VariableHourBulkData)}
                >
                  Confirm
                </Button>
              ) : (
                <Button
                  className="BookingConfirmButton"
                  onClick={() => HandleSubmit(data)}
                >
                  Confirm
                </Button>
              )}
            </Row>
            {/* {Show ? (
              <div className="errormsg">               
                {message}
              </div>
            ) :  <div className="errormsg">
            {Errormessage}          
          </div>} */}
          </Col>

          {message === "Event created" ? (
            <RoomBookingConfirmation
              Name={Response?.data?.data?.eventData?.bookingContactName || ""}
              MobileNo={
                Response?.data?.data?.eventData?.bookingContactNumber || ""
              }
              Date={Response?.data?.data?.eventData?.startDate || ""}
              Seat={Response?.data?.data?.eventData?.seatBooked || ""}
              Extended={
                Response?.data?.data?.eventData?.isExtended === true
                  ? "Yes"
                  : ""
              }
              NoExtended={
                Response?.data?.data?.eventData?.isExtended === false
                  ? "No"
                  : ""
              }
              Location={Response?.data?.data?.placeData?.completeAddress || ""}
              TotalAmount={Response?.data?.data?.eventData?.totalRate || ""}
              Id={Response?.data?.data?.eventData?._id || ""}
            />
          ) : null}
        </Row>
      </div>

      <EcoworkAppSection />
      <InstagramAndNewsletterSection />
      <Footer />
    </div>
  );
};

export default RoomBooking;
