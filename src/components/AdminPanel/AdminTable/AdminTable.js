import React, { useState } from "react";
import MaterialTable from "material-table";
import { Col, Form, Row } from "react-bootstrap";
import axiosMain from "../../../http/axios/axios_main";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./AdminTable.css";

function AdminTable() {
  const [AdminData, setAdminData] = useState([]);
  React.useEffect(() => {
    GetAdminDataApi();
  }, []);

  const GetAdminDataApi = async () => {
    const response = await axiosMain.get(`/admin/bookList`);
    setAdminData(response.data.data.getEventData.data);
  };

  console.log("Admin", AdminData);

  const columns = [
    { field: "_id", title: "Booking Id", minWidth: 5, editable: false },

    {
      field: "bookingContactName",
      title: "UserName",
      minWidth: 5,
      align: "right",
    },

    {
      field: "Email",
      title: "Email",
      minWidth: 5,
      align: "right",
    },

    {
      field: "bookingContactNumber",
      title: "Phone No",
      minWidth: 5,
      align: "right",
    },

    {
      field: "bookingPurpose",
      title: "Booking Purpose",
      minWidth: 5,
      align: "right",
    },

    {
      field: "bookType",
      title: "Booking Category",
      minWidth: 5,
      align: "right",
    },

    {
      field: "createdAt",
      title: "Date",
      minWidth: 5,
      align: "right",
    },

    {
      field: "startDate",
      title: "Start Time",
      minWidth: 5,
      align: "right",
    },

    {
      field: "endDate",
      title: "End Time",
      minWidth: 5,
      align: "right",
    },

    {
      field: "isPayed",
      title: "Amount Paid",
      minWidth: 5,
      align: "right",
      render: (row) => (
        <div className={row.isPayed ? "yes" : "no"}>
          {row.isPayed ? "Yes" : "No"}
        </div>
      ),
    },
  ];

  const AddData = async (value) => {
    const response = await axiosMain.post(``, value);
    console.log("DataAdded", response);
    return response.data.msg;
  };

  const DataAdd = (updatedRows) => {
    const DataLength = AdminData.length;
    const NewArray = updatedRows[DataLength];
    delete NewArray.tableData;
    delete NewArray.id;

    AddData(NewArray);
  };

  const DeleteDataApi = async (value) => {
    const response = await axiosMain.delete(``, value);
    console.log("DataDeleted", response);
    return response.data.msg;
  };

  const DeleteData = (updatedRows) => {
    const DataLength = Event.length;
    const NewArray = updatedRows[DataLength];
    delete NewArray.tableData;
    delete NewArray.id;

    DeleteDataApi(NewArray);
  };

  return (
    <div className="App">
      <Row>
        <Form className="Adminheader d-flex flex-row-reverse">
          <Form.Group as={Col} xl={2} md={2}>
            <Form.Control as="select" size="xs">
              {/* <option>Category</option> */}
              <option value="true">Room</option>
              <option value="false">Bulk</option>
            </Form.Control>
          </Form.Group>

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
        title="Booking"
        data={AdminData}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updatedRows = [
                ...AdminData,
                { id: Math.floor(Math.random() * 100), ...newRow },
              ];
              setTimeout(() => {
                setAdminData(updatedRows);
                resolve();
                DataAdd(updatedRows);
              }, 2000);
              console.log("updatedRows", updatedRows);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              const updatedRows = [...AdminData];
              updatedRows.splice(index, 1);
              setTimeout(() => {
                setAdminData(updatedRows);
                DeleteData(updatedRows);
                resolve();
              }, 2000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updatedRows = [...AdminData];
              updatedRows[index] = updatedRow;
              setTimeout(() => {
                setAdminData(updatedRows);
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

export default AdminTable
