import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./navigation.css";

const Navigation = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <div class="header">
        <header class="header-content">
          <a href="/" class="logo">
            <span class="logo-text">TalentTrove</span>
          </a>
          <nav class="nav">
            <a href="/" class="nav-link">
              Explore
            </a>
            {auth.isLoggedIn && auth.role == "Seeker" && (
              <a
                href={auth.isLoggedIn ? "/appliedJobs" : "/auth"}
                class="nav-link"
              >
                Applied Jobs
              </a>
            )}
            {auth.isLoggedIn && auth.role == "Recruiter" && (
              <a href="postJob" class="nav-link">
                Post a Job
              </a>
            )}
            {auth.isLoggedIn && auth.role == "Recruiter" && (
              <a href="myJobs" class="nav-link">
                View Your Jobs
              </a>
            )}
            {(!auth.isLoggedIn || auth.role == "Seeker") && (
              <a href="becomeRecruiter" class="nav-link">
                Become a Recruiter
              </a>
            )}
            {!auth.isLoggedIn && (
              <a href="/auth" class="contact-button">
                SignUp
              </a>
            )}
            {auth.isLoggedIn && (
              <a href="/" onClick={auth.logout} class="contact-button">
                Log Out
              </a>
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
