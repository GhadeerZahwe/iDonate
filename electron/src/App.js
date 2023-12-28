import { Route, Routes, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import "./App.css";
import Login from "./components/login/login";
import HomePage from "./pages/HomePage/index";
import Drivers from "./pages/Drivers/Drivers";
import Donations from "./pages/Donations/Donations";
function App() {
  return (
    <>
      <AxiosNavigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin_panel" element={<HomePage />} />
        <Route path="/admin_panel/drivers" element={<Drivers />} />
        <Route path="/admin_panel/donations" element={<Donations />} />
      </Routes>
    </>
  );
}

export default App;

function AxiosNavigation() {
  // Use useRef to prevent a re-render in the useEffect.
  // A ref, cannot be used as a useEffect dependency, hence,
  // your linters shouldn't complain about missing dependencies.
  const navRef = useRef(useNavigate());
  const { fetch: originalFetch } = window;

  useEffect(() => {
    window.fetch = async (...args) => {
      let [resource, config] = args;
      const response = await originalFetch(resource, config);
      if (response.status === 401) {
        localStorage.removeItem("token");
        navRef.current("/");
      }
      return response;
    };
    return () => {};
  }, []);
  return <></>;
}
