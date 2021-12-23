import React, { useEffect, useState } from 'react'
import bannerImg from './../../../assests/images/header.jpg'
import scroll from './../../../assests/images/scroll.png'
import mission from './../../../assests/images/mission.png'
import vision from './../../../assests/images/vision.png'
import { Row, Col, Button, Form, Image } from 'react-bootstrap'
import AliceCarousel from 'react-alice-carousel'
import axios from 'axios'
import 'react-alice-carousel/lib/alice-carousel.css'
import './FindYourBestWorkspace.css'
import Login from '../Model/Login/Login'
import Loader from '../../Loader/Loader'
import { useHistory } from 'react-router'
import axiosMain from '../../../http/axios/axios_main'

const responsive = {
	300: { items: 1 },
	568: { items: 1 },
	1208: { items: 1 },
	1500: { items: 1 },
}

// const items = [
//   <div className="item">
//     <img src={bannerImg} className="bannersliderimg" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={bannerImg} className="bannersliderimg" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={bannerImg} className="bannersliderimg" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={bannerImg} className="bannersliderimg" alt="banner" />
//   </div>,
//   <div className="item">
//     <img src={bannerImg} className="bannersliderimg" alt="banner" />
//   </div>,
// ];

const FindYourBestWorkspace = () => {
	const [showimg, setShowimg] = useState()
	const [locationList, setLocationList] = useState([])
	const [places, setPlaces] = useState([])
	const history = useHistory()

	useEffect(() => {
		makeAPIcallForbanner()
	}, [])
	const makeAPIcallForbanner = () => {
		axios
			.get(`https://ecoworksbiz.com/api/news/imageList?type=Header`)
			.then((response) => {
				console.log('xxxxx', response.data)
				setShowimg(response.data.data)
			})
	}

	useEffect(() => {
		const getLocation = async () => {
			const Location = {
				lat: '22.9921',
				long: '72.6325',
			}
			const response = await axiosMain.get(`place`)
			console.log('Location Repsonse ===>', response)
			setPlaces(response.data)
			const locationDDListData =
				places &&
				places?.map((place) => {
					return {
						label: place.landmark + ',' + place.city,
						value: place._id,
					}
				})
			setLocationList(locationDDListData)
		}
		getLocation()
	}, [])

	const items =
		showimg &&
		showimg.length &&
		showimg.map((banner, index) => (
			<div className="item" key={index}>
				<img
					src={
						`https://space-image-store.s3.ap-south-1.amazonaws.com/${banner.imageKey}` ||
						bannerImg
					}
					className="bannersliderimg"
					alt="banner"
				/>
			</div>
		))

	const [modalShow, setModalShow] = useState(false)
	const [SignUpmodalShow, setSignUpModalShow] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const updateLoginModalstate = (LoginModalState) => {
		setModalShow(LoginModalState)
	}
	const updateSignUpModalstate = (SignUpmodalShow) => {
		setSignUpModalShow(SignUpmodalShow)
	}

	const CheckLoginStatus = () => {
		console.log('logintoken', sessionStorage.token)
		if (sessionStorage.token) history.push('/roombooking')
		else {
			setModalShow(true)
		}
	}

	return (
		<div className="container background">
			<Loader display={isLoading} />
			<div className="float-container bannercontainer">
				<div className="float-child citybox">
					<span className="CityboxHeading">
						Find Your Best <br /> Workspace
					</span>
					<br />
					<span className="CityboxContent">
						Discover your nearest suitable location.
					</span>
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
										<option value={option.value}>
											{option.label}
										</option>
									))}
								</Form.Control>
								<i class=" fas fa-angle-down drop"></i>
							</Form.Group>

							<Button
								className="citygobtn"
								onClick={CheckLoginStatus}
							>
								Go
							</Button>
							<Login
								show={modalShow}
								onHide={updateLoginModalstate}
								LoginModalState={modalShow}
								updateLoginModalstate={updateLoginModalstate}
								SignUpmodalShow={SignUpmodalShow}
								updateSignUpModalstate={updateSignUpModalstate}
								setIsLoading={setIsLoading}
							/>
						</Form.Row>
					</Form>
				</div>
				<div className="float-child bannerdiv alicebannerrow">
					<AliceCarousel
						duration={400}
						autoPlay={false}
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
						// paddingLeft={170}
						// paddingright={0}
						mouseTracking={true}
						disableDotsControls={true}
					/>
					{/* <img src={bannerImg} alt="banner" className="bannerimg" /> */}
				</div>
			</div>
			<div
				className="container aboutuscontainer"
				title="aboutUs"
				id="aboutUs"
			>
				<div className="row">
					<div className="col-lg-12 col-sm-12 col-xs-12">
						<img src={scroll} alt="banner" className="scrollImg" />
					</div>
					<br />
					<span className="allignAboutus">About us</span> <br />
					<span className="allignCentre">We are ECOWORKS!</span>{' '}
					<br />
					<div className="aboutUsContent col-xl-8 col-lg-8 offset-xl-2 offset-lg-2">
						Ecoworks provides a workspace and embrace such an
						environment for like-minded people to collaborate with
						comfort and cost-effectively, enlighten your inner
						productivity with desired privacy and work in the best
						environment with the luxury of time.
					</div>
				</div>
			</div>

			<div className="fluid-container Aboutusrow">
				<Row>
					<Col
						lg={{ span: 2, offset: 1 }}
						sm={3}
						className="aboutusrow1"
					>
						<img
							src={vision}
							alt="banner"
							className="aboutUsImages"
						/>
					</Col>
					<Col lg={3} sm={9} className="aboutusrow2">
						<span className="ourVision"> Our Vision </span> <br />
						<span className="ourVisionContent">
							Working towards providing the best productive
							environment to the community{' '}
						</span>
					</Col>
					<Col
						lg={{ span: 2, offset: 1 }}
						sm={3}
						className="missionCol"
					>
						<img
							src={mission}
							alt="banner"
							className="aboutUsImages aboutUsImagesmission"
						/>
					</Col>
					<Col lg={3} sm={9} className="aboutusrow3">
						<span className="ourVision"> Our Mission </span> <br />
						<span className="ourVisionContent">
							Aims to provide a workspace where anyone can engage
							with their ideas, collaborate with others and
							operate effectively.{' '}
						</span>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default FindYourBestWorkspace
