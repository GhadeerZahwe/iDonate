import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import UseHttp from "../../hooks/http-hook";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const saveToken = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const data = await UseHttp("login", "POST", formData);
    console.log("data", data.authorisation.token);
    if (data.user) {
      localStorage.setItem("token", data.authorisation.token);
      navigate("/admin_panel");
    }
  };

  return (
    <div className="lgn-container">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <div className="login-form">
          <label htmlFor="email" className="username_title">
            Email
            <br />
            <br />
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            ref={emailRef}
          />
          <label htmlFor="password" className="password_title">
            Password
            <br />
            <br />
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            ref={passwordRef}
          />
          <div className="login-button-div">
            <button
              type="submit"
              className="login-button"
              id="login-button"
              onClick={saveToken}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
