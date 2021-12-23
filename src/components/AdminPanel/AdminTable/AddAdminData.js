import { Button, Modal } from 'bootstrap'
import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const AddAdminData = (props) => {
	const [show, setShow] = React.useState(props.show)

	const HandlerAddData = () => {}

	return (
		<Modal
			show={show}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton onClick={() => setShow(false)}>
				<Modal.Title id="contained-modal-title-vcenter">
					Login
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Row>
						<Col>
							<Form.Control placeholder="Booking Id" />
						</Col>
						<Col>
							<Form.Control placeholder="UserName" />
						</Col>
						<Col>
							<Form.Control placeholder="Email" />
						</Col>
						<Col>
							<Form.Control placeholder="Phone No" />
						</Col>
						<Col>
							<Form.Control placeholder="Booking Purpose" />
						</Col>
						<Col>
							<Form.Control placeholder="Booking Category" />
						</Col>
						<Col>
							<Form.Control placeholder="DD/MM/YYYY" />
						</Col>
						<Col>
							<Form.Control placeholder="DD/MM/YYYY" />
						</Col>
						<Col>
							<Form.Control placeholder="HH:MM" />
						</Col>
						<Col>
							<Form.Control placeholder="Amount Paid" />
						</Col>
					</Row>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setShow(false)}>
					Close
				</Button>
				<Button variant="primary" onClick={HandlerAddData}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default AddAdminData
