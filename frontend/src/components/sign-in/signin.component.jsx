import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const SignIn = ({ toggleHasAccount }) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
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
      auth.login(data.userId, data.token);
      navigate("/");
    } catch (e) {}
  };

  return (
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

        {/* <div className={`bars ${strength}`}>
          <div></div>
        </div>
        <div className="strength">{strength && <>{strength} password</>}</div> */}
        <button className="control" type="button" onClick={handleClick}>
          Sign In
        </button>
        <a href="" onClick={toggleHasAccount}>
          Create a new account
        </a>
      </form>
    </div>
  );
};

export default SignIn;
