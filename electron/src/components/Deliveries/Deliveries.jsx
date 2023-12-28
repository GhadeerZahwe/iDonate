import React, { useState } from "react";
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

      if (data.success) {
        console.log(
          is_approved === 0 ? "Approval successful" : "Cancellation successful"
        );

        // Update the state after successful API call
        setIsApproved(is_approved === 0 ? 1 : 0);

        // trigger a re-fetch of data or update the UI as needed
      } else {
        console.error(
          is_approved === 0 ? "Approval failed:" : "Cancellation failed:",
          data.error
        );
        // Handle the error, show a message, etc.
      }
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

      <td className="btn-container">
        {isProcessing ? (
          <div>Processing...</div>
        ) : (
          <div
            className={isApproved ? "btn-delete" : "btn-approve"}
            onClick={() =>
              handleButtonClick(
                props.data.delivery_info.delivery_id,
                props.data.delivery_info.is_approved
              )
            }
          >
            <strong>{isApproved ? "CANCEL" : "APPROVE"}</strong>
            <div id={`container-stars-${isApproved ? "delete" : "approve"}`}>
              <div id={`stars-${isApproved ? "delete" : "approve"}`}></div>
            </div>
            <div id={`glow-${isApproved ? "delete" : "approve"}`}>
              <div
                className={`circle-${isApproved ? "delete" : "approve"}`}
              ></div>
              <div
                className={`circle-${isApproved ? "delete" : "approve"}`}
              ></div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default Tr;
