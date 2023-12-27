import React from "react";

const UsersTable = () => {
  //getAllDonors
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
      </table>
    </div>
  );
};

export default UsersTable;
