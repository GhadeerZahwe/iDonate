import React from "react";
import UseHttp from "../../hooks/http-hook";

const Tr = (props) => {
  console.log(props);
  const formData = new FormData();
  const deleteDriver = async (delivery_id) => {
    formData.append("id", delivery_id);
    const data = await UseHttp("delete_user", "POST", formData, {
      Authorization: "Bearer" + localStorage.getItem("token"),
    });
  };

  const approveDriver = async (delivery_id) => {
    formData.append("id", delivery_id);
    const data = await UseHttp("acceptDelivery", "POST", formData, {
      Authorization: "Bearer" + localStorage.getItem("token"),
    });
  };
  return (
    <tr>
      <td>{props.data.first_name}</td>
      <td>{props.data.last_name}</td>
      <td>{props.data.email}</td>
      <td>{props.data.phone}</td>
      <td>{props.data.mobility_type}</td>
      <td>{props.data.license_number}</td>
      <td className="btn-container">
        <div
          className="delete_btn"
          onClick={() => deleteDriver(props.data.delivery_id)}
        >
          Delete
        </div>
      </td>
    </tr>
  );
};

export default Tr;
