import { ChangeEvent, useContext, useState } from "react";
import "./signup.css";
import axios from "axios";
import logo from "./logo.svg";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

import { render } from "react-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const strengthLabels = ["weak", "medium", "strong"];

export const Signup = ({ toggleHasAccount, role }) => {
  const auth = useContext(AuthContext);
  const [strength, setStrength] = useState("");
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
      console.log(role);
      const { data } = await axios.post(
        "http://localhost:3002/api/users/signup",
        { email, password, role: role },
        config
      );

      toast.update(id, {
        render: "Regitered Successfully",
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

  const getStrength = (password) => {
    console.log(password);

    let strengthIndicator = -1;

    let upper = false,
      lower = false,
      numbers = false;

    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!upper && char >= 65 && char <= 90) {
        upper = true;
        strengthIndicator++;
      }

      if (!numbers && char >= 48 && char <= 57) {
        numbers = true;
        strengthIndicator++;
      }

      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        strengthIndicator++;
      }
    }

    setStrength(strengthLabels[strengthIndicator] ?? "");
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
    getStrength(e.target.value);
  };

  return (
    <>
      <div className="signup-container">
        <div className="login-card">
          <img src={logo} />
          {role == "seeker" ? <h2>Sign Up</h2> : <h2>Become A Recruiter</h2>}
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
              onChange={handleChange}
            />

            <div className={`bars ${strength}`}>
              <div></div>
            </div>
            <div className="strength">
              {strength && <>{strength} password</>}
            </div>
            <button className="control" type="button" onClick={handleClick}>
              JOIN NOW
            </button>
            {role == "Seeker" ? (
              <a href="" onClick={toggleHasAccount}>
                Already have an account?
              </a>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
};
