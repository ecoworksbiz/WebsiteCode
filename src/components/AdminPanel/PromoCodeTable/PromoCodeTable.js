import React, { useState } from "react";
import MaterialTable from "material-table";
import { Col, Form, Row } from "react-bootstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import axiosMain from "../../../http/axios/axios_main";

function PromoCodeTable() {
  const [Promocode, setPromocode] = useState([]);
  React.useEffect(() => {
    PromocodeApi();
  }, []);

  const PromocodeApi = async () => {
    const response = await axiosMain.get(`admin/promoCodeList`);
    setPromocode(response.data.data.response);
  };

  console.log("Promo", Promocode);

  const columns = [
    { field: "_id", title: "Id", minWidth: 10, editable: false },

    { field: "code", title: "Code", minWidth: 10, align: "right" },

    {
      field: "description",
      title: "Description",
      minWidth: 10,
      align: "right",
    },

    {
      field: "discount",
      title: "Discount",
      minWidth: 10,
      align: "right",
    },

    {
      field: "createdAt",
      title: "Start Date",
      minWidth: 10,
      align: "right",
    },

    {
      field: "expiryDate",
      title: "End Date",
      minWidth: 10,
      align: "right",
    },

    {
      field: "isActive",
      title: "Active",
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

  const AddPromoApi = async (value) => {
    const response = await axiosMain.post(`admin/promoCode`, value);
    console.log("Promoadded", response);
    return response.data.msg;
  };

  const PromoCodeAdd = (updatedRows) => {
    const PromoLength = Promocode.length;
    const NewArray = updatedRows[PromoLength];
    delete NewArray.tableData;
    delete NewArray.id;

    AddPromoApi(NewArray);
  };

  const UpdatePromoCodeApi = async (value) => {
    console.log("start");
    const response = await axiosMain.post(`admin/updatePromoCode`, value);
    console.log("PromoUpdated", response.data.msg);
    return response.data.msg;
  };

  const DeletePromoApi = async (value) => {
    console.log(Promocode[value]._id)
    const response = await axios.post("https://ecoworksbiz.com/api/admin/deletePromoCode", {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
      data: {
        id: Promocode[value]._id      
      },
    }) 
    console.log("promoDeleted",response)
    return response;}

  // const PromoCodeDelete = (updatedRows) => {
  //   const EventLength = Promocode.length;
  //   const NewArray = updatedRows[EventLength];
  //   delete NewArray.tableData;
  //   delete NewArray.id;

  //   DeletePromoApi(NewArray);
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
        title="PromoCode"
        data={Promocode}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updatedRows = [
                ...Promocode,
                { id: Math.floor(Math.random() * 100), ...newRow },
              ];
              PromoCodeAdd(updatedRows);
              setTimeout(() => {
                setPromocode(updatedRows);
                resolve();
              }, 2000);             
              console.log("updatedRows", updatedRows);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              const updatedRows = [...Promocode];
              updatedRows.splice(index, 1);
              DeletePromoApi(selectedRow.tableData.id);
              setTimeout(() => {
                setPromocode(updatedRows);
                resolve();               
              }, 2000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updatedRows = [...Promocode];
              updatedRows[index] = updatedRow;
              UpdatePromoCodeApi(updatedRow)
              setTimeout(() => {
                setPromocode(updatedRows);
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

export default PromoCodeTable
