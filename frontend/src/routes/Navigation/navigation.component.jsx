import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./navigation.css";

const Navigation = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <div class="header">
        <header class="header-content">
          <Link to="/" class="logo">
            <span class="logo-text">TalentTrove</span>
          </Link>
          <nav class="nav">
            <Link to="/" class="nav-link">
              Explore
            </Link>
            {auth.isLoggedIn && auth.role == "seeker" && (
              <Link
                to={auth.isLoggedIn ? "/appliedJobs" : "/auth"}
                class="nav-link"
              >
                Applied Jobs
              </Link>
            )}
            {auth.isLoggedIn && auth.role == "recruiter" && (
              <Link to="postJob" class="nav-link">
                Post a Job
              </Link>
            )}
            {auth.isLoggedIn && auth.role == "recruiter" && (
              <Link to="myJobs" class="nav-link">
                View Your Jobs
              </Link>
            )}
            {(!auth.isLoggedIn || auth.role == "seeker") && (
              <Link to="becomeRecruiter" class="nav-link">
                Become a Recruiter
              </Link>
            )}
            {!auth.isLoggedIn && (
              <Link to="/auth" class="contact-button">
                SignUp
              </Link>
            )}
            {auth.isLoggedIn && (
              <Link to="/" onClick={auth.logout} class="contact-button">
                Log Out
              </Link>
            )}
          </nav>
          <button type="button" class="menu-button">
            <img
              src="./images/Hamburger.svg"
              alt="menuButton"
              class="menu-icon"
            />
          </button>
        </header>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
