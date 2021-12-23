import React, { useState } from 'react'
import { Navbar, Nav, Row, Col, Button } from 'react-bootstrap'
import { useHistory, NavLink, Link } from 'react-router-dom'
import logo from './../../../assests/images/logo.png'
import search from './../../../assests/images/search.png'
import profile from './../../../assests/images/profile.png'
import signOut from './../../../assests/images/signout.svg'
import fsignOut from './../../../assests/images/facebook.png'
import Login from '../Model/Login/Login'
import SignUp from '../Model/SignUp/Signup'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import './Header.css'
import Loader from '../../Loader/Loader'

const Header = () => {
	const [modalShow, setModalShow] = useState(false)
	const [SignUpmodalShow, setSignUpModalShow] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [RedirectRoomBooking, setRedirectRoomBooking] = useState(false)
	const [FbLogin, setFbLogin] = useState(false)
	const [GoogleLogin, setGoogleLogin] = useState(false)
	const [webLogin, setwebLogin] = useState(false)
	const history = useHistory()

	const updateLoginModalstate = (LoginModalState) => {
		setModalShow(LoginModalState)
	}

	const UpdateFbLogin = (UpdateFbLogin) => {
		setFbLogin(UpdateFbLogin)
	}

	const UpdateGoogleLogin = (GoogleSocialLogin) => {
		setGoogleLogin(GoogleSocialLogin)
	}

	const UpdatewebLogin = (UpdatewebLogin) => {
		setwebLogin(UpdatewebLogin)
	}

	const updateSignUpModalstate = (SignUpmodalShow) => {
		setSignUpModalShow(SignUpmodalShow)
	}

	const checkstatus = () => {
		setModalShow(true)
		setRedirectRoomBooking(true)
	}

	const CheckLoginStatus = () => {
		console.log('logintoken', sessionStorage.token)
		if (sessionStorage.token)
			//  window.open("/roomBooking", "_self");
			history.push('/roomBooking')
		else {
			checkstatus()
		}
	}

	const logoutHandler = () => {
		sessionStorage.clear()
		history.push('/')
	}

	const onSignoutSuccess = () => {
		sessionStorage.clear()

		history.push('/')
	}

	const onLogout = () => {
		window.FB.logout()
		sessionStorage.clear()
		history.push('/')
	}

	const CheckLoginMethod = () => {
		// console.log("fb",FbLogin);
		// console.log("google",GoogleLogin);
		// console.log("token",sessionStorage.token);
		// console.log("webtoken",webLogin);
	}

	return (
		<div className="container" id="top">
			<Loader display={isLoading} />
			<Row className="navbody">
				<Col sm={2} xs={2} className="logorow">
					<Link to="/">
						<img alt="logo" src={logo} className="logoSize" />{' '}
					</Link>
				</Col>
				<Col sm={10} xs={10} className="navcol">
					<Navbar collapseOnSelect expand="lg" className="header">
						<Navbar.Brand href="home"></Navbar.Brand>
						<Navbar.Toggle aria-controls="responsive-navbar-nav" />
						<Nav className="navbtn">
							{/* <img alt="search" src={search} className="search" /> */}

							{sessionStorage.token ? (
								<>
									{' '}
									{CheckLoginMethod()}
									{sessionStorage.userType == 'admin' ? (
										<Button
											className="bookMeeting"
											onClick={() =>
												history.push('/admin')
											}
										>
											Admin
										</Button>
									) : null}
									{FbLogin ? (
										<img
											src={signOut}
											onClick={onLogout}
											className="profile"
										/>
									) : GoogleLogin ? (
										<GoogleLogout
											clientId="22318900943-173gp7nj746plp0vkd8nt3kvm86429he.apps.googleusercontent.com"
											buttonText="Sign Out"
											onLogoutSuccess={onSignoutSuccess}
											className="profile"
										></GoogleLogout>
									) : (
										<img
											alt="profile"
											src={signOut}
											className="profile"
											onClick={logoutHandler}
											title="Logout"
										/>
									)}
								</>
							) : (
								<>
									{/* <img
                    alt="profile"
                    src={profile}
                    className="profile"
                   
                  /> */}
									<Button
										className="bookMeeting"
										onClick={() => setModalShow(true)}
									>
										Login
									</Button>
									<Login
										show={modalShow}
										onHide={updateLoginModalstate}
										LoginModalState={modalShow}
										updateLoginModalstate={
											updateLoginModalstate
										}
										SignUpmodalShow={SignUpmodalShow}
										updateSignUpModalstate={
											updateSignUpModalstate
										}
										setIsLoading={setIsLoading}
										RedirectRoomBooking={
											RedirectRoomBooking
										}
										UpdateFbLogin={UpdateFbLogin}
										UpdateGoogleLogin={UpdateGoogleLogin}
										UpdatewebLogin={UpdatewebLogin}
										// FbSocialLogin={FbLogin}
										// GoogleSocialLogin={GoogleLogin}
									/>
									{SignUpmodalShow ? (
										<SignUp
											show={SignUpmodalShow}
											onHide={() =>
												setSignUpModalShow(false)
											}
											LoginModalState={modalShow}
											updateLoginModalstate={
												updateLoginModalstate
											}
											SignUpmodalShow={SignUpmodalShow}
											updateSignUpModalstate={
												updateSignUpModalstate
											}
										/>
									) : null}
								</>
							)}
							{/* <Button className="bookMeeting" onClick={CheckLoginStatus}>
                Book a Meeting
              </Button> */}
						</Nav>
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="mr-auto navlinks ">
								<Nav.Link href="/">HOME</Nav.Link>
								<Nav.Link href="/#aboutUs">ABOUT US</Nav.Link>
								<Nav.Link href="/#whyEcoworks">
									WHY ECOWORKS
								</Nav.Link>
								{/* <Nav.Link href="#testimonial">TESTIMONIALS</Nav.Link>
                <Nav.Link href="#blog">BLOG</Nav.Link> */}
								<Nav.Link href="#contactUs">
									CONTACT US
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</Col>
			</Row>
		</div>
	)
}

export default Header
