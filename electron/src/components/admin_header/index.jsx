import React from "react";

const AdminHeader = () => {
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
