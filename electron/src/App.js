import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import HomePage from "./pages/HomePage/index";
import Drivers from "./pages/Drivers/Drivers";
import Donations from "./pages/Donations/Donations";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin_panel" element={<HomePage />} />
      <Route path="/admin_panel/drivers" element={<Drivers />} />
      <Route path="/admin_panel/donations" element={<Donations />} />
    </Routes>
  );
}

export default App;
