import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axiosMain from "./../../../../http/axios/axios_main";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./Login.css";
import { useHistory } from "react-router";

const Login = (props) => {
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
      positionClass: "toast-top-full-width",
      hideDuration: 1000,
      timeOut: 1100,
    };
    toastr.clear();
    setTimeout(() => toastr.error(msg), 1000);
  };

  const UpdateStates = () => {
    props.updateLoginModalstate(false);
    props.updateSignUpModalstate(true);
  };

  const [Isfblogin, setIsfblogin] = useState(false);
  const [Isfblogout, setIsfblogout] = useState(true);
  const history = useHistory();

  const responseFacebook = (response) => {
    console.log("login", response);
    const token = response.accessToken;
    if (token) {
      sessionStorage.setItem("token", token);
      props.UpdateFbLogin(true);
      props.updateLoginModalstate(false);
      setIsfblogin(true);
      setIsfblogout(false);
    }
  };

  const onLogout = () => {
    window.FB.logout();
    setIsfblogin(false);
    setIsfblogout(true);
  };

  const componentClicked = (data) => {
    console.warn(data);
  };

  const responseGoogle = (response) => {
    console.log(response);
    const token = response.tokenId;
    if (token) {
      sessionStorage.setItem("token", token);
      setShowloginButton(false);
      setShowlogoutButton(true);
      props.updateLoginModalstate(false);
      props.UpdateGoogleLogin(true);
    }
  };

  const makeAPIcallForLogin = async (value) => {
    const response = await axiosMain.post(`login`, value);
    console.log("response", response);
    return response;
  };

  const makeAPIcallForForgetPassword = async (value) => {
    const response = await axiosMain.post(`forgotPassword`, value);
    console.log("forgetpwd", response);
    return response;
  };

  const errorMessage = () => {
    var commonHtml = ` ${message} `;
    console.log("errorm", commonHtml);
    return commonHtml;
  };

  // const LoginStatus = () => {
  //   if(showMessage === "login successFull")
  //   setShow(false);
  // }

  const handleSubmit = async (values, onSubmitProps) => {
    console.log("details", values);
    console.log("status", props.RedirectBooking);
    props.setIsLoading(true);
    try {
      const response = await makeAPIcallForLogin(values);
      const token = response.data.data.userToken;
      sessionStorage.setItem("token", token);
      if (token) {
        response.data.data.userType === "admin"
          ? history.push("/admin")
          : history.push("/");
        sessionStorage.setItem("username", response.data.data.name);
        sessionStorage.setItem("email", response.data.data.email);
        sessionStorage.setItem("contact", response.data.data.phoneNumber);
        sessionStorage.setItem("userType", response.data.data.userType);
        sessionStorage.setItem("id", response.data.data._id);
        console.log("tokenn", sessionStorage.token);
        const axoisSuccess = response.data.msg;
        ToasterOnClick(axoisSuccess);
        setmessage(axoisSuccess);
        if (props.RedirectRoomBooking || props.RedirectBooking) {
          history.push("/roomBooking");
        }
        // setshowMessage(true);
        props.updateLoginModalstate(false);
        props.setIsLoading(false);
        props.UpdatewebLogin(true);
      }
    } catch (error) {
      const axoisError = error.response.data.msg;
      console.log("axoisError", axoisError);
      setmessage(axoisError);
      ToasterOnClickError(axoisError);
      // setshowMessage(true);
      props.setIsLoading(false);
    }
    onSubmitProps.setSubmitting(false);
  };

  const handleSubmitForgetPassword = async (values, onSubmitProps) => {
    console.log("details", values);
    props.setIsLoading(true);
    try {
      const response = await makeAPIcallForForgetPassword(values);

      const axoisSuccess = response.data.msg;
      setmessage(axoisSuccess);
      // setshowMessage(true);
      if (axoisSuccess === "Mail Send Successfully")
        ToasterOnClick(axoisSuccess);
      else ToasterOnClickError(axoisSuccess);
      setTimeout(() => {
        setForgetPws(false);
        // setshowMessage(false);
      }, 1000);
      props.setIsLoading(false);
    } catch (error) {
      const axoisError = error.response.data.msg;
      console.log("axoisError", axoisError);
      // setmessage(axoisError);
      // setshowMessage(true);
      ToasterOnClickError(axoisError);
      setTimeout(() => {
        // setForgetPws(false);
      }, 1000);
      props.setIsLoading(false);
    }
    onSubmitProps.setSubmitting(false);
  };

  const [message, setmessage] = useState("");
  const [showMessage, setshowMessage] = useState("");
  const [show, setShow] = useState();
  const [ForgetPws, setForgetPws] = useState(false);
  const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  const forgetPasswordHandle = () => {
    setForgetPws(true);
  };

  // useEffect((ForgetPws)=>{

  //     setForgetPws(false);

  // })

  const ForgetPwdModalClose = () => {
    // setShow(true);
    // setForgetPws(false);
    // setshowMessage(false);
    setForgetPws(false);
    props.updateLoginModalstate(true);
  };

  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {ForgetPws ? (
          <div>
            <Modal.Header closeButton onClick={ForgetPwdModalClose}>
              <Modal.Title id="contained-modal-title-vcenter">
                Forget Password
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div id="register_bg">
                <div id="register">
                  <Formik
                    initialValues={{ email: "" }}
                    validate={(values) => {
                      let errors = {};
                      if (values.email === "") {
                        errors.email = "Email is required";
                      }
                      return errors;
                    }}
                    onSubmit={(values, onSubmitProps) =>
                      handleSubmitForgetPassword(values, onSubmitProps)
                    }
                  >
                    {({ values, touched, errors }) => (
                      <Form autoComplete="on">
                        <div className="input-block">
                          <Field
                            type="email"
                            name="email"
                            id="input-text"
                            spellCheck="false"
                            placeholder="Email"
                            className={`form-control ${
                              touched.email && errors.email ? "is-invalid" : ""
                            }`}
                            value={values.email}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group textcenter">
                          <button
                            type="submit"
                            value="submit"
                            className="btn btn-primary mr-2 Sendbtn"
                          >
                            Send
                          </button>
                        </div>
                        <div className="error">
                          {showMessage ? errorMessage() : null}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </Modal.Body>
          </div>
        ) : (
          <>
            <Modal.Header closeButton onClick={() => setShow(false)}>
              <Modal.Title id="contained-modal-title-vcenter">
                Login
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div id="register_bg">
                <div id="register">
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    validate={(values) => {
                      let errors = {};
                      if (values.email === "") {
                        errors.email = "Email is required";
                      } else if (!emailTest.test(values.email)) {
                        errors.email = "Invalid email address format";
                      }
                      if (values.password === "") {
                        errors.password = "Password is required";
                      } else if (values.password.length < 3) {
                        errors.password =
                          "Password must be 3 characters at minimum";
                      }
                      return errors;
                    }}
                    onSubmit={(values, onSubmitProps) =>
                      handleSubmit(values, onSubmitProps)
                    }
                  >
                    {({ values, touched, errors }) => (
                      <Form autoComplete="on">
                        <div className="input-block">
                          <Field
                            type="email"
                            name="email"
                            id="input-text"
                            spellCheck="false"
                            placeholder="Email"
                            className={`form-control ${
                              touched.email && errors.email ? "is-invalid" : ""
                            }`}
                            value={values.email}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <br />
                        <div className="input-block">
                          <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={`form-control ${
                              touched.password && errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            value={values.password}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <br />
                        <div className="form-group textcenter">
                          <button
                            type="submit"
                            value="submit"
                            className="btn btn-primary mr-2 loginbtn"
                          >
                            Login
                          </button>
                        </div>
                        <div className="error">
                          {showMessage ? errorMessage() : null}
                        </div>

                        <div
                          className="forgetPassword"
                          onClick={forgetPasswordHandle}
                        >
                          {" "}
                          Forget Password?{" "}
                        </div>

                        {Isfblogin ? null : (
                          <FacebookLogin
                            appId="2955998314715920"
                            autoLoad={false}
                            fields="name,email,picture"
                            onClick={componentClicked}
                            callback={responseFacebook}
                          />
                        )}

                        {Isfblogout ? null : (
                          <>
                            <button onClick={onLogout}>logout</button>
                          </>
                        )}

                        {showloginButton ? (
                          <GoogleLogin
                            clientId="22318900943-173gp7nj746plp0vkd8nt3kvm86429he.apps.googleusercontent.com"
                            buttonText="Login"
                            autoLoad={false}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            className="googlelogin"
                          />
                        ) : null}

                        {showlogoutButton ? (
                          <GoogleLogout
                            clientId="22318900943-173gp7nj746plp0vkd8nt3kvm86429he.apps.googleusercontent.com"
                            buttonText="Sign Out"
                            onLogoutSuccess={onSignoutSuccess}
                          ></GoogleLogout>
                        ) : null}

                        {/* <div className="access_social">
                    <Button className="social_btfacebook" >
                      Login with Facebook
                    </Button> 
                    <Button className="social_btgoogle" onClick={googleHandler}>
                      Login with Google
                    </Button> 
                  </div>  */}
                        <div className="text-center mt-2">
                          <small>
                            Don't have an acccount?
                            <strong>
                              <span
                                className="signupLink"
                                onClick={UpdateStates}
                              >
                                signup
                              </span>
                            </strong>
                          </small>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </Modal.Body>{" "}
          </>
        )}
      </Modal>
    </div>
  );
};

export default Login;
