import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./signin.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const SignIn = ({ toggleHasAccount }) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const id = toast.loading("Please wait...");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3002/api/users/signin",
        { email, password },
        config
      );

      toast.update(id, {
        render: "LoggedIn Successfully",
        type: "success",
        isLoading: false,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      auth.login(data.userId, data.token, data.role);

      navigate("/");
    } catch (e) {
      toast.update(id, {
        render: e.response.data.message,
        type: "error",
        isLoading: false,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="login-card">
        <img src={logo} />
        <h2>Sign In</h2>
        <form className="login-form">
          <div className="username">
            <input
              autoComplete="off"
              spellCheck="false"
              className="control"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="spinner" className="spinner"></div>
          </div>
          <input
            name="password"
            spellCheck="false"
            className="control"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="control" type="button" onClick={handleClick}>
            Sign In
          </button>
          <a href="" onClick={toggleHasAccount}>
            Create a new account
          </a>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default SignIn;
