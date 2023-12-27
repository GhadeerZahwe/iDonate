import React from "react";
import AdminSidebar from "../../components/admin_sidebar";
import AdminHeader from "../../components/admin_header";
import UsersTable from "../../components/users_table";

const HomePage = () => {
  return (
    <body>
      <AdminSidebar />
      <AdminHeader />
      <div className="container2">
        <div className="content">
          <h1 className="content-title" id="content-title">
            Donors
          </h1>
          <UsersTable />
        </div>
      </div>
    </body>
  );
};

export default HomePage;
