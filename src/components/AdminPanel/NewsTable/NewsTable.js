import React, { useState } from "react";
import MaterialTable from "material-table";
import { Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import axiosMain from "../../../http/axios/axios_main";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomRow from "./CustomRow";

function NewsTable() {
  const [News, setNews] = useState([]);
  React.useEffect(() => {
    NewsApi();
  },  []);

  const NewsApi = async () => {
    const response = await axiosMain.get(`admin/newsList`);
    setNews(response.data.data.response);
  };

  console.log("news", News);

  const columns = [
    { field: "_id", title: "News Id", minWidth: 10, editable: false },

    { field: "title", title: "Title", minWidth: 10, align: "right" },

    {
      field: "description",
      title: "Description",
      minWidth: 10,
      align: "right",
    },

    {
      field: "newsUrl",
      title: "URL",
      minWidth: 10,
      align: "right",
    },

    {
      field: "displayDate",
      title: "Submissive Date",
      minWidth: 10,
      align: "right",
    },

    {
      field: "expiryDate",
      title: "Expiry Date ",
      minWidth: 10,
      align: "right",
    },

    {
      field: "imageUrl",
      title: "Images",
      minWidth: 10,
      align: "right",
    },

    // {
    //   field: "isDeleted",
    //   title: "Delete",
    //   minWidth: 10,
    //   align: "right",
    // },
  ];

  const AddNewsApi = async (value) => {
    const response = await axiosMain.post(`admin/news/`, value);
    console.log("newsadd", response.data.msg);
    return response.data.msg;
  };

  const UpdateNewsApi = async (value) => {
    console.log("start");
    const response = await axiosMain.put(`admin/news/`, value);
    console.log("newsupdated", response.data.msg);
    return response.data.msg;
  };

  const NewNewsArray = (updatedRows) => {
    const NewsLength = News.length;
    const NewArray = updatedRows[NewsLength];
    delete NewArray.tableData;
    delete NewArray.id;
    console.log("newsaddingg", NewArray);
    AddNewsApi(NewArray);
  };
 
  const DeleteNewsApi = async (value) => {   
    const response =  axios.delete("https://ecoworksbiz.com/api/admin/news/", {
    headers: {
      Authorization: `Bearer ${sessionStorage.token}`,
    },
    data: {
      id: News[value]._id      
    },
  }) 
  return response;}

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
        title="News"
        data={News}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updatedRows = [
                ...News,
                { id: Math.floor(Math.random() * 100), ...newRow },
              ];
              NewNewsArray(updatedRows);
              setTimeout(() => {
                setNews(updatedRows);
                resolve();              
              }, 2000);
              console.log("updatedRows", updatedRows);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              const updatedRows = [...News];
              updatedRows.splice(index, 1);             
              DeleteNewsApi(selectedRow.tableData.id);
              setTimeout(() => {
                setNews(updatedRows);
                resolve();               
              }, 2000);
            }),
          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updatedRows = [...News];
              updatedRows[index] = updatedRow;
              
              UpdateNewsApi(updatedRow)
              setTimeout(() => {
                setNews(updatedRows);
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

export default NewsTable
