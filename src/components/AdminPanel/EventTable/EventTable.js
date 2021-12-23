import React, { useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import axiosMain from "../../../http/axios/axios_main";
import { Col, Form, Row } from "react-bootstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./EventTable.css";

function EventTable() {
  const [Event, setEvent] = useState([]);
  React.useEffect(() => {
    EventApi();
  }, []);

  const EventApi = async () => {
    const response = await axiosMain.get(`admin/adminPlacesEvents`);
    setEvent(response.data.data.placesList);
  };

  console.log("event", Event);

  const columns = [
    { field: "_id", title: "Id", minWidth: 10, editable: false },

    { field: "title", title: "Title", minWidth: 10, align: "right" },

    {
      field: "description",
      title: "Description",
      minWidth: 10,
      align: "right",
    },

    {
      field: "startDate",
      title: "Scheduled Start Time",
      minWidth: 10,
      align: "right",
    },

    {
      field: "endDate",
      title: "Scheduled End Time",
      minWidth: 10,
      align: "right",
    },

    {
      field: "userName",
      title: "User Name",
      minWidth: 10,
      align: "right",
    },

    {
      field: "userEmail",
      title: "User Email",
      minWidth: 10,
      align: "right",
    },

    {
      field: "mobileNumber",
      title: "Mobile",
      minWidth: 10,
      align: "right",
    },

    {
      field: "numberOfUsers",
      title: "No Of Seat",
      minWidth: 10,
      align: "right",
    },

    // {
    //   field: "isDeleted",
    //   title: "Deleted",
    //   minWidth: 10,
    //   align: "right",
    // },
  ];

  const AddEventApi = async (value) => {
    const response = await axiosMain.post(`admin/addPlaceEvent`, value);
    console.log("eventadd", response);
    return response.data.msg;
  };

  const UpdateEventApi = async (value) => {
    console.log("start");
    const response = await axiosMain.put(`admin/updatePlaceEvent`, value);
    console.log("EcentUpdated", response.data.msg);
    return response.data.msg;
  };
  
  const EventAdd = (updatedRows) => {
    const EventLength = Event.length;
    const NewArray = updatedRows[EventLength];
    delete NewArray.tableData;
    delete NewArray.id;

    AddEventApi(NewArray);
  };

  const DeleteEventApi = async (value) => {
    const response =  axios.delete("https://ecoworksbiz.com/api/admin/placeEvent", {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
      data: {
        id: Event[value]._id      
      },
    }) 
    return response;}

  // const EventDelete = (updatedRows) => {
  //   const EventLength = Event.length;
  //   const NewArray = updatedRows[EventLength];
  //   delete NewArray.tableData;
  //   delete NewArray.id;

  //   DeleteEventApi(NewArray);
  // };

  return (
    <div className="App">
      <Row>
        <Form className="Adminheader d-flex flex-row-reverse">
          <Form.Group as={Col} xl={2} md={2}>
            <Form.Control as="select" size="xs">
              <option>Day</option>
              <option value="true">11</option>
              <option value="false">11</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Row>
      <MaterialTable
        title="Event"
        data={Event}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updatedRows = [
                ...Event,
                { id: Math.floor(Math.random() * 100), ...newRow },
              ];
              EventAdd(updatedRows);
              setTimeout(() => {
                setEvent(updatedRows);
                resolve();                
              }, 2000);

              console.log("updatedRows", updatedRows);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              const updatedRows = [...Event];
              updatedRows.splice(index, 1);
              DeleteEventApi(selectedRow.tableData.id);
              setTimeout(() => {
                setEvent(updatedRows);
                resolve();                
              }, 2000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updatedRows = [...Event];
              updatedRows[index] = updatedRow;
              UpdateEventApi(updatedRow)
              setTimeout(() => {
                setEvent(updatedRows);
                resolve();
              }, 2000);
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
          paging: true,
          pageSizeOptions: [5],
          pageSize: 5,
          showFirstLastPageButtons: false,
        }}
        icons={{ Add: () => <AddCircleIcon /> }}
      />
    </div>
  );
}

export default EventTable
