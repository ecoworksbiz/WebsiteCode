import React, { useEffect, useState } from "react";
import { Modal, Button, Dropdown, Row, Col } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosMain from "./../../../../http/axios/axios_main";
import "./SignUp.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import toastr from "toastr";
import "toastr/build/toastr.min.css";


const SignUp = (props) => {
  const UpdateStates = () => {
    props.updateLoginModalstate(true);
    props.updateSignUpModalstate(false);
  };
 
  const ToasterOnClick = (msg) => {
    toastr.options = {
      positionClass: "toast-top-full-width",
      hideDuration: 1000,
      timeOut: 1100,
    };
    toastr.clear();
    setTimeout(() => toastr.success(msg), 1000);
  };

  const ToasterOnClickError = (msg) => {
    toastr.options = {
      positionClass: 'toast-top-full-width',
      hideDuration: 1000,
      timeOut: 1100
    }
    toastr.clear()
    setTimeout(() => toastr.error(msg), 1000)
  }

  const makeAPIcallForSignup = async (value) => {
    try {
      const response = await axiosMain.post(`register`, value);
      console.log("response", response);
      const axoisError = response.data.msg;
      setSignupError(axoisError);
      console.log("axoiserror", axoisError);
      // setShowSignupError(true);
      ToasterOnClick(axoisError)
      props.updateSignUpModalstate(false);
      props.updateLoginModalstate(true);
     
    } catch (error) {
      const axoisError = error.response.data.msg;
      console.log("axoiserror", axoisError);
      setSignupError(axoisError);
      // setShowSignupError(true);
      ToasterOnClickError(axoisError)
    }
  };

  const errorMessage = () => {
    const message = ` ${signupError}`;
    return message;
  };

  const [signupError, setSignupError] = useState();
  const [showSignupError, setShowSignupError] = useState();
  const passwordTest =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{8,16}$/;
   const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
 const mobileTest  = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const [Occupation, setOccupation] = useState('WorkingProfessional')
  

  const OccupationSelectHandler = (event) => {
    setOccupation(event.target.value);
  };
 
  console.log("room", Occupation);
  return (
    <Modal
      className="signupmodal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            gender: "",
            occupation: Occupation,
            document: null,
            password: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            let errors = {};
           
            if (!emailTest.test(values.email)) {
              errors.email =
                "Enter valid Email ";
            } else 
            if (!mobileTest.test(values.phone)) {
              errors.phone =
                "Enter valid mobile no";
            } else
            if (!passwordTest.test(values.password)) {
              errors.password =
                "Passwords should contain Uppercase letters: A-Z. Lowercase letters: a-z. Numbers: 0-9.";
            }  
            return errors;
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("First Name is required"),
            email: Yup.string()
              .email("Email is invalid")
              .required("Email is required"),
            phone: Yup.string().required("Mobile No is required"),
            occupation: Yup.string().required("occupation is required"),
            gender: Yup.string().required("Gender is required"),
            // document:Yup.string().required("Document required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm Password is required"),
          })}
          onSubmit={(values, onSubmitProps) => {
            console.log("details", values);
            makeAPIcallForSignup(values);
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form autoComplete="on" onClick={() => setShowSignupError(false)}>
               <Row>  <Col className="input-block">
             <label>Name</label>
                <Field
                  type="text"
                  name="name"
                  id="input-text"
                  required
                  spellcheck="false"
                  placeholder="Name"
                  className={
                    "form-control" +
                    (errors.name && touched.name ? " is-invalid" : "")
                  }
                  value={values.name}
                />

                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <br />
              <Col className="input-block">
                <label>Email</label>
                <Field
                  type="text"
                  name="email"
                  id="input-text"
                  required
                  spellcheck="false"
                  placeholder="Email"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                  value={values.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </Col> </Row>
              <br />
              <Row> <Col className="input-block">
                <label>Mobile No.</label>
                <Field
                  type="text"
                  name="phone"
                  id="input-text"
                  required
                  spellcheck="false"
                  placeholder="Mobile No."
                  className={
                    "form-control" +
                    (errors.phone && touched.phone ? " is-invalid" : "")
                  }
                  value={values.phone}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="invalid-feedback"
                />
              </Col>
              <br />
              <Col> <div id="my-radio-group">Gender</div>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="gender" value="Male" required />
                  {" "}Male
                </label>
                &nbsp;
                <label>
                  <Field
                    type="radio"
                    name="gender"
                    value="Female"
                    required
                    className="ml-2"
                  />
                  {" "}Female
                </label>
                <span Gender={values.gender} />
              </div> </Col> </Row>
              <br /> 
              
              <Row> <Col><label>Occupation</label>
              <FormControl fullWidth className="input-block">
                <InputLabel ></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Occupation}
                  label="Select Occupation"
                  onChange={OccupationSelectHandler}
                 
                >
                  <MenuItem value={"Student"}>Student</MenuItem>
                  <MenuItem value={"WorkingProfessional"}>Working Professional</MenuItem>
                  <MenuItem value={"Coaching"}>Coaching</MenuItem>
                  <MenuItem value={"BusinessOwner"}>Business Owner</MenuItem>
                  <MenuItem value={"HomeMaker"}> Home-Maker </MenuItem>
                  <MenuItem value={"Retired"}>Retired</MenuItem>
                
                </Select>
              </FormControl> </Col>
              <br/>
                        

              <br />
             <Col> <div className="form-group">
                <label for="file">File upload</label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  // required
                  onChange={(event) => {
                    setFieldValue("document", event.currentTarget.files[0]);
                  }}
                  className="form-control"
                />
                <span file={values.document} />
              </div> </Col></Row>

              <br />
              <Row> <Col><div className="input-block">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  required
                  spellcheck="false"
                  placeholder="Password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                  value={values.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div> </Col>
              <br />
             <Col> <div className="input-block">
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  required
                  spellcheck="false"
                  placeholder="Confirm Password"
                  className={
                    "form-control" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div> </Col></Row>
              <br />
              <div
                className="form-group"
                style={{ justifyContent: "center", display: "flex" }}
              >
                <button
                  type="submit"
                  value="submit"
                  className="btn btn-primary mr-2 registerbtn"
                >
                  Register
                </button>
              </div>
             {showSignupError ? <div className="error">
                {showSignupError ? errorMessage() : null}{" "}
              </div> : null}
            </Form>
          )}
        </Formik>

        {/* <div className="access_social">
          <Button href="#0" className="social_btfacebook" >
            Login with Facebook
          </Button>
          <Button href="#0" className="social_btgoogle" >
            Login with Google
          </Button>
        </div> */}
        <div className="text-center mt-2">
          <small>
            Already Registered ?
            <strong>
              <span className="signupLink" onClick={UpdateStates}>
                Login
              </span>
            </strong>
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;
