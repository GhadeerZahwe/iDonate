import React, { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file
import UseHttp from "../../hooks/http-hook";

const Tr = (props) => {
  const formData = new FormData();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApproved, setIsApproved] = useState(
    props.data.delivery_info.is_approved
  );

  const handleButtonClick = async (delivery_id, is_approved) => {
    formData.append("id", delivery_id);
    try {
      setIsProcessing(true);
      const data = await UseHttp(
        is_approved === 0
          ? `acceptDelivery/${delivery_id}`
          : `cancelDeliveryAcceptance/${delivery_id}`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      );
      // Update the state after successful API call
      setIsApproved(is_approved === 0 ? 1 : 0);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle other errors if necessary
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteClick = async (deliveryId) => {
    formData.append("id", deliveryId);
    try {
      setIsProcessing(true);
      const data = await UseHttp(
        `deleteDelivery/${deliveryId}`,
        "DELETE",
        formData,
        {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      );
      console.log("Deletion successful".data);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle other errors if necessary
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <tr>
      <td>{props.data.first_name}</td>
      <td>{props.data.last_name}</td>
      <td>{props.data.email}</td>
      <td>{props.data.phone}</td>
      <td>{props.data.delivery_info.mobility_type}</td>
      <td>{props.data.delivery_info.license_number}</td>

      <td>
        {isProcessing ? (
          <div>Processing...</div>
        ) : (
          <>
            {/* <div
              className={isApproved ? "btn-cancel" : "btn-approve"}
              onClick={() =>
                handleButtonClick(
                  props.data.delivery_info.delivery_id,
                  isApproved
                )
              }
            >
              <strong>{isApproved ? "CANCEL" : "APPROVE"}</strong>
            </div> */}
            {/* <button
              className="delete_btn"
              type="button"
              onClick={() =>
                handleDeleteClick(props.data.delivery_info.delivery_id)
              }
            >
              <strong>DELETE</strong>
            </button> */}
            <div
              className={isApproved ? "cancel_btn" : "approve_btn"}
              onClick={() =>
                handleButtonClick(
                  props.data.delivery_info.delivery_id,
                  isApproved
                )
              }
            >
              {isApproved ? "Cancel" : "Approve"}
            </div>

            <div
              className="delete_btn"
              onClick={() =>
                handleDeleteClick(props.data.delivery_info.delivery_id)
              }
            >
              Delete
            </div>
          </>
        )}
      </td>
    </tr>
  );
};

export default Tr;
