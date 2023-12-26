import React from "react";
import UseHttp from "../../hooks/http-hook";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    const data = await UseHttp("logout", "POST", "", {
      Authorization: "Bearer" + localStorage.getItem("token"),
    });
    console.log(data);
    if (data.status === "success") {
      navigate("/");
    }
  };
  return (
    <div className="container">
      <div className="navbar">
        <div className="admin_name"> Hello Admin</div>
        <button className="logout" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
