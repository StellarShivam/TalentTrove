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
            <a href="#features" class="nav-link">
              Explore
            </a>
            {auth.isLoggedIn && (
              <a href="/appliedJobs" class="nav-link">
                Applied Jobs
              </a>
            )}
            <a href="#blog" class="nav-link">
              Post a Job
            </a>
            <a href="#about" class="nav-link">
              About
            </a>
            {!auth.isLoggedIn && (
              <a href="/auth" class="contact-button">
                Create Account
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
