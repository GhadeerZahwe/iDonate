import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import HomePage from "./pages/HomePage/index";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin_panel" element={<HomePage />} />
    </Routes>
  );
}

export default App;
