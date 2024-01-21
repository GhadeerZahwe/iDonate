import React, { useState } from "react";
import UseHttp from "../../hooks/http-hook";

const Tr = (props) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const formData = new FormData();

  const deleteDonor = async (donor_id) => {
    formData.append("id", donor_id);
    try {
      if (donor_id) {
        const data = await UseHttp(
          `deleteDonor/${donor_id}`,
          "DELETE",
          formData,
          {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        );
        console.log(data);

        // Update state to trigger re-render
        setIsDeleted(true);
      } else {
        console.error("donor_id is undefined");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Render nothing if deleted
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
          onClick={() => deleteDonor(props.data.donor_id)}
        >
          Delete
        </div>
      </td>
    </tr>
  );
};

export default Tr;
