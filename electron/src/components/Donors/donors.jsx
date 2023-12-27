import React from "react";

const Tr = (props) => {
  const formData = new FormData();
  const deleteDonor = async (donor_id) => {
    formData.append("id", donor_id);
  };
  return (
    <tr>
      <td>{}</td>
    </tr>
  );
};

export default Tr;
