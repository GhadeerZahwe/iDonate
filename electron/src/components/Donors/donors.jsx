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
      <td>{}</td>
    </tr>
  );
};

export default Tr;
