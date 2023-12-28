import React from "react";
import AdminSidebar from "../../components/admin_sidebar";
import AdminHeader from "../../components/admin_header";
import DeliveriesTable from "../../components/DeliveriesTable/DeliveriesTable";

const Drivers = () => {
  return (
    <div>
      <AdminSidebar />
      <AdminHeader />
      <div className="container2">
        <div className="content">
          <h1 className="content-title" id="content-title">
            Delivery Drivers
          </h1>
          <DeliveriesTable />
        </div>
      </div>
    </div>
  );
};

export default Drivers;
