import React, { useState } from "react";
import MaterialTable from "material-table";
import { Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import axiosMain from "../../../http/axios/axios_main";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function LocationTable() {
  const [Location, setLocation] = useState([]);
  React.useEffect(() => {
    LocationApi();
  }, []);

  const LocationApi = async () => {
    const response = await axiosMain.get(`admin/locationList`);
    console.log("locres",response.data.data)
    setLocation(response.data.data);
  };

  console.log("Location", Location);

  const columns = [
    { field: "_id", title: "Id", minWidth: 10, editable: false },

    { field: "completeAddress", title: "Address", minWidth: 10, align: "right" },

    {
      field: "landmark",
      title: "Landmark",
      minWidth: 10,
      align: "right",
    },

    {
      field: "Location.coordinates[0]",
      title: "Latitude",
      minWidth: 10,
      align: "right",
    },

    {
      field: "Location.coordinates[1]",
      title: "Longitude",
      minWidth: 10,
      align: "right",
    },

    {
      field: "seatCapacity",
      title: "Seat Capasity",
      minWidth: 10,
      align: "right",
    },

    {
      field: "ratePerHour",
      title: "Rate/Hour",
      minWidth: 10,
      align: "right",
    },

    {
      field: "spaceStartingTime",
      title: "Start Time",
      minWidth: 10,
      align: "right",
    },

    {
      field: "spaceEndingTime",
      title: "End Time",
      minWidth: 10,
      align: "right",
    },

    // {
    //   field: "Delete",
    //   title: "Delete",
    //   minWidth: 10,
    //   align: "right",
    // },
  ];

  const AddLocation = async (value) => {
    const response = await axiosMain.post(`admin/places/`, value);
    console.log("LocationAdded", response);

    return response.data.msg;
  };

  const LocationAdd = (updatedRows) => {
    const LocationLength = Location.length;
    const NewArray = updatedRows[LocationLength];
    delete NewArray.tableData;
    delete NewArray.id;
      console.log("nrew",updatedRows)
    AddLocation(NewArray);
  };
  
  const UpdateLocationApi = async (value) => {
    console.log("start");
    const response = await axiosMain.put(`admin/places`, value);
    console.log("LocationUpdated", response.data.msg);
    return response.data.msg;
  };

  const DeleteLocation = async (value) => {
    const response = axios.delete("https://ecoworksbiz.com/api/admin/places", {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
      data: {
        id: Location[value]._id      
      },
    }) 
    return response;}

  // const LocationDelete = (updatedRows) => {
  //   const LocationLength = Location.length;
  //   const NewArray = updatedRows[LocationLength];
  //   delete NewArray.tableData;
  //   delete NewArray.id;

  //   DeleteLocation(NewArray);
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
        title="Location"
        data={Location}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updatedRows = [
                ...Location,
                { id: Math.floor(Math.random() * 100), ...newRow },
              ];
              LocationAdd(updatedRows);
              setTimeout(() => {
                setLocation(updatedRows);
                resolve();               
              }, 2000);
              console.log("updatedRows", updatedRows);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              const updatedRows = [...Location];
              updatedRows.splice(index, 1);
              DeleteLocation(selectedRow.tableData.id);
              setTimeout(() => {
                setLocation(updatedRows);
                resolve();                
              }, 2000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updatedRows = [...Location];
              updatedRows[index] = updatedRow;
              UpdateLocationApi(updatedRow)
              setTimeout(() => {
                setLocation(updatedRows);
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

export default LocationTable;
