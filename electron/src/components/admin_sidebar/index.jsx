import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="side-panel">
      <img className="logo" src={logo} alt="logo"></img>
      <div className="donor-btn" id="users-btn" onClick={goDonors}>
        Donors
      </div>
    </div>
  );
};

export default AdminSidebar;
