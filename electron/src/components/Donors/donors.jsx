import React, { useState } from "react";
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
  const [isDeleted, setIsDeleted] = useState(false);
  const formData = new FormData();
  const [showModal, setShowModal] = useState(false);

  const deleteDonor = async (donorId) => {
    // Use donorId instead of donor_id
    formData.append("id", donorId);
    setShowModal(true);
  };

  const handleConfirmDeletion = async () => {
    try {
      const data = await UseHttp(
        `deleteDonor/${props.data.id}`,
        "DELETE",
        formData,
        {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      );
      console.log(data);
      setIsDeleted(true);
    } catch (error) {
      console.error(error.message);
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
      <td>
        {props.data.first_name} {props.data.last_name}
      </td>
      <td>{props.data.email}</td>
      <td>{props.data.phone}</td>
      <td className="width">
        <div
          className="delete_btn_donor"
          onClick={() => deleteDonor(props.data.id)}
        >
          Delete
        </div>
        <ConfirmDeletionModal
          show={showModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDeletion}
        />
      </td>
    </tr>
  );
};

export default Tr;
