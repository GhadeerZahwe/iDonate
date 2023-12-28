import React, { useEffect, useState } from "react";
import Tr from "../Donors/donors";
import UseHttp from "../../hooks/http-hook";

const UsersTable = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const sendRequest = async () => {
      console.log(localStorage.getItem("token"));
      const myData = await UseHttp("getAllDonors", "GET", "", {
        Authorization: "Bearer" + localStorage.getItem("token"),
      });
      setData(myData.donors);
      console.log(myData);
    };
    sendRequest();
  });
  return (
    <div className="table-container">
      <table>
        <thead id="thead">
          <tr>
            <th>Firstname</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {!!data && data.map((item) => <Tr data={item} key={item.id} />)}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
