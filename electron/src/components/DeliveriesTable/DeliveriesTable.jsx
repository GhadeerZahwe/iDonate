import React, { useEffect, useState } from "react";
import Tr from "../Deliveries/Deliveries";

const DeliveriesTable = () => {
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
