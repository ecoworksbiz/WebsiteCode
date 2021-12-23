import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../../Homepage/Footer/Footer'
import Header from '../../Homepage/Header/Header'
import AdminTable from '../AdminTable/AdminTable'
import EventTable from '../EventTable/EventTable'
import LocationTable from '../LocationTable/LocationTable'
import NewsTable from '../NewsTable/NewsTable'
import PromoCodeTable from '../PromoCodeTable/PromoCodeTable'
import './AdminPage.css'

const AdminPage = () => {
	return (
		<div>
			<Header />
			<Row>
				<Col md={8} xl={8} sm={8} xs={8} className=" RoomBookingCol1">
					<span className="RoomBookingTitle">Admin</span>
				</Col>
				<Col
					xl={4}
					md={4}
					sm={4}
					xs={4}
					className=" RoomBookingCol2"
				></Col>
			</Row>
			<Row>
				<Col xl={6} md={8} className="RoomBookingURL">
					<Link to="/" className="BookingPagenav">
						Home
					</Link>{' '}
					/ Admin
				</Col>
				<Col>
					{/* <Button href="/bookingHistory" className="BookingHistory">
            Admin
          </Button> */}
				</Col>
			</Row>
			<Row className="row justify-content-center TableRow">
				<Col xs={10} className="AdminTable">
					<AdminTable />
				</Col>
			</Row>
			<Row className="row justify-content-center TableRow">
				<Col xs={10} className="AdminTable">
					<NewsTable />
				</Col>
			</Row>
			<Row className="row justify-content-center TableRow">
				<Col xs={10} className="AdminTable">
					<EventTable />
				</Col>
			</Row>
			<Row className="row justify-content-center TableRow">
				<Col xs={10} className="AdminTable">
					<PromoCodeTable />
				</Col>
			</Row>
			<Row className="row justify-content-center TableRow">
				<Col xs={10} className="AdminTable">
					<LocationTable />
				</Col>
			</Row>

			<Row className="ImageRow">
				<Col
					md={{ span: 9, offset: 1 }}
					xs={{ span: 8, offset: 1 }}
					sm={{ span: 8, offset: 1 }}
				>
					<div className="ImageTitle"> Image Upload</div>
					<Row>
						<Col md={1} sm={1} xs={1}>
							Image
						</Col>
						<Col md={1} sm={1} xs={1}>
							<Button className="imageAdmin">Browse</Button>
						</Col>
						<Col md={1} sm={1} xs={1}>
							<Button className="imageAdmin">Upload</Button>
						</Col>
					</Row>
					<Row>
						<Col md={1} sm={1} xs={1}>
							Image
						</Col>
						<Col md={1} sm={1} xs={1}>
							<Button className="imageAdmin">Browse</Button>
						</Col>
						<Col md={1} sm={1} xs={1}>
							<Button className="imageAdmin">Upload</Button>
						</Col>
					</Row>
					<Row>
						<Col md={1} sm={1} xs={1}>
							Image
						</Col>
						<Col md={1} sm={1} xs={1}>
							<Button className="imageAdmin">Browse</Button>
						</Col>
						<Col md={1} sm={1} xs={1}>
							<Button className="imageAdmin">Upload</Button>
						</Col>
					</Row>
					<Row>
						<Col md={1} sm={1} xs={1}>
							Image
						</Col>
						<Col md={1} sm={1} xs={1}>
							<Button className="imageAdmin">Browse</Button>
						</Col>
						<Col md={1} sm={1} xs={1}>
							<Button className="imageAdmin">Upload</Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<Footer />
		</div>
	)
}

export default AdminPage
