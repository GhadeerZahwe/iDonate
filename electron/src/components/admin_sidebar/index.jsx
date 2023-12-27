import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const goDonors = () => {
    navigate("/admin_panel");
  };

  const goDrivers = () => {
    navigate("/admin_panel/drivers");
  };

  const goDonations = () => {
    navigate("/admin_panel/donations");
  };

  return (
    <div className="side-panel">
      <img className="logo" src={logo} alt="logo"></img>
      <div className="donor-btn" id="users-btn" onClick={goDonors}>
        Donors
      </div>
      <div className="driver-btn" id="users-btn" onClick={goDrivers}>
        Drivers
      </div>
      <div className="driver-btn" id="users-btn" onClick={goDonations}>
        Donations
      </div>
    </div>
  );
};

export default AdminSidebar;
