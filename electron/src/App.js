import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import HomePage from "./pages/HomePage/index";
import Drivers from "./pages/Drivers/Drivers";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin_panel" element={<HomePage />} />
      <Route path="" element={<Drivers />} />
    </Routes>
  );
}

export default App;
