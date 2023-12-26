import React from "react";

const Login = () => {
  return (
    <div className="lgn-container">
      <div className="login-container">
        <h1 className="login-title">login</h1>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
