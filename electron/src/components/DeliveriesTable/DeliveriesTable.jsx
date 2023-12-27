import React, { useEffect, useState } from "react";
import Tr from "../Deliveries/Deliveries";
import UseHttp from "../../hooks/http-hook";

const DeliveriesTable = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const sendRequest = async () => {
      const myData = await UseHttp("getAllDeliveries", "GET", "");
      setData(myData.deliveries);
    };
    sendRequest();
  });
  return (
    <div className="table-container">
      <table>
        <thead id="thead">
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Mobility Type</th>
            <th>License Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {!!data && data.map((item) => <Tr data={item} />)}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveriesTable;
