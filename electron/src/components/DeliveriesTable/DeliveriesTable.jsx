import React, { useEffect, useState } from "react";
import Tr from "../Deliveries/Deliveries";
import UseHttp from "../../hooks/http-hook";

const DeliveriesTable = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const myData = await UseHttp("getAllDeliveries", "GET", "", {
          Authorization: "Bearer" + localStorage.getItem("token"),
        });
        setData(myData.deliveries);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    sendRequest();
  }, []);

  // Function to handle delivery deletion
  const handleDeliveryDeletion = (deletedDeliveryId) => {
    setData((prevData) =>
      prevData.filter((item) => item.id !== deletedDeliveryId)
    );
  };

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
              {/* <th>Phone</th> */}
              <th>Mobility Type</th>
              <th>License Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {!!data &&
              data.map((item) => (
                <Tr
                  key={item.id}
                  data={item}
                  onDeletion={handleDeliveryDeletion}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeliveriesTable;
