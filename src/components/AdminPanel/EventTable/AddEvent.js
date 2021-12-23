import { Button, Modal } from 'bootstrap';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import axiosMain from '../../../http/axios/axios_main';

const AddEvent = (props) => {

    const [show, setShow] = React.useState(props.show);
    const [title, setTitle] = React.useState();
    const [description, setDescription] = React.useState();
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [userName, setUserName] = React.useState();
    const [userEmail, setUserEmail] = React.useState();
    const [mobileNumber, setMobileNumber] = React.useState();
    const [numberOfUsers, setNumberOfUsers] = React.useState();


    const data = {
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        userName: userName,
        userEmail: userEmail,
        mobileNumber: mobileNumber,
        numberOfUsers: numberOfUsers
    }

    const HandlerAddData = async (data) => {
        const response = await axiosMain.post(`admin/addPlaceEvent`, data)
        console.log("data", data);
        console.log("response", response);
    }

    const handleTitle = (event) => {
        const value = event.target.value;
        setTitle(value);
    };
    const handleDescription = (event) => {
        const value = event.target.value;
        setDescription(value);

    };
    const handleStartDate = (event) => {
        const value = event.target.value;
        setStartDate(value);

    };
    const handleEndDate = (event) => {
        const value = event.target.value;
        setEndDate(value);

    };
    const handleUserName = (event) => {
        const value = event.target.value;
        setUserName(value);

    };
    const handleUserEmail = (event) => {
        const value = event.target.value;
        setUserEmail(value);

    };
    const handleMobileNumber = (event) => {
        const value = event.target.value;
        setMobileNumber(value);

    };
    const handleNumberOfUsers = (event) => {
        const value = event.target.value;
        setNumberOfUsers(value);

    };


    return (
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={() => setShow(false)}>
                <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Control placeholder="Title"
                                onChange={handleTitle} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Description"
                                onChange={handleDescription} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Start Time (YYYY-MM-DD HH:MM:SS)"
                                onChange={handleStartDate} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="End Time (YYYY-MM-DD HH:MM:SS)"
                                onChange={handleEndDate} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="User Name"
                                onChange={handleUserName} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="User Email"
                                onChange={handleUserEmail} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Mobile"
                                onChange={handleMobileNumber} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="No Of Seat"
                                onChange={handleNumberOfUsers} />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
          </Button>
                <Button variant="primary" onClick={() => HandlerAddData(data)}>
                    Save Changes
          </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddEvent;