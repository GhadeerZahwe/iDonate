import React, { useEffect, useState } from "react";
import Tr from "../Donors/donors";
import UseHttp from "../../hooks/http-hook";

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const myData = await UseHttp("getAllDonors", "GET", "", {
          Authorization: "Bearer " + localStorage.getItem("token"),
        });
        setData(myData.donors);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    sendRequest();
  }, []);

  return (
    <div className="table-container">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <table>
          <thead id="thead">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {!!data && data.map((item) => <Tr data={item} key={item.id} />)}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
