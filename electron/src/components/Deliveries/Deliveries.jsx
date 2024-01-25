import React, { useState, useEffect } from "react";
import "./style.css"; // Import the CSS file
import UseHttp from "../../hooks/http-hook";

const ConfirmDeletionModal = ({ show, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={`confirm-modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <h2 style={{ color: "#146C94" }}>Confirm Deletion</h2>
        <p>Are you sure you want to delete this donor?</p>
        <div className="button-container">
          <button className="confirm-button" onClick={handleConfirm}>
            Yes
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const Tr = (props) => {
  const formData = new FormData();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isApproved, setIsApproved] = useState(
    props.data.delivery_info.is_approved
  );

  const deleteDelivery = async (delivery_id) => {
    formData.append("id", delivery_id);
    setShowModal(true);
  };

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
      // Update the state after a successful API call
      setIsApproved(is_approved === 0 ? 1 : 0);
    } catch (error) {
      console.error("Error:", error.message);
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
      console.log("Deletion successful", data);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle other errors if necessary
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (isDeleted) {
    return null;
  }

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
                deleteDelivery(props.data.delivery_info.delivery_id)
              }
            >
              Delete
            </div>
            <ConfirmDeletionModal
              show={showModal}
              onClose={handleCloseModal}
              onConfirm={() =>
                handleDeleteClick(props.data.delivery_info.delivery_id)
              }
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default Tr;
