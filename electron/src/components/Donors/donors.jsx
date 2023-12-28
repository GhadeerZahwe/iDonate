import React from "react";
import UseHttp from "../../hooks/http-hook";

const Tr = (props) => {
  const formData = new FormData();
  const deleteDonor = async (donor_id) => {
    formData.append("id", donor_id);
    const data = await UseHttp("delete_user", "POST", formData, {
      Authorization: "Bearer" + localStorage.getItem("token"),
    });
  };
  return (
    <tr>
      <td>{props.data.first_name}</td>
      <td>{props.data.last_name}</td>
      <td>{props.data.email}</td>
      <td>{props.data.phone}</td>
      <td>{props.data.description}</td>
      <td className="delete-cell">
        {/* <div
          className="delete_btn"
          onClick={() => deleteDonor(props.data.donor_id)}
        >
          Delete
        </div> */}
        <button class="btn" type="button">
          <strong>DELETE</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </button>
      </td>
    </tr>
  );
};

export default Tr;
