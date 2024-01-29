import React from "react";
import { Form, useActionData } from "react-router-dom";
import { useContext } from "react";
import { Ctx } from "../../util/reducer";
import "./LoginForm.css";

const LoginForm = () => {
  const data = useActionData();
  const { state } = useContext(Ctx);
  return (
    <div className="form-container">
      <Form method="post" className="form">
        <h2 className={`login-header ${state.isNight ? "night" : ""}`}>
          ClimateTrackr
        </h2>

        <div className="inputGroup">
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
          />
        </div>

        <div className="inputGroup">
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="btnContainer">
          <button className="loginButton">Login</button>
        </div>

        {data && !data.success && (
          <div className="error">
            <p>{data.message}</p>
          </div>
        )}
      </Form>
    </div>
  );
};

export default LoginForm;
