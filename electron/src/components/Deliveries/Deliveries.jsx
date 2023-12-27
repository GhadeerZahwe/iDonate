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
  return <div></div>;
};

export default Tr;
