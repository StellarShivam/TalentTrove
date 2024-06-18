import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Signup } from "../../components/sign-up-form/signup.component";
import SignIn from "../../components/sign-in/signin.component";
import "./authentication.css";

const AuthPreview = () => {
  return (
    <>
      <div className="">
        <Link to="recruiter">Recruiter</Link>
        <Link to="seeker">Seeker</Link>
      </div>
    </>
  );
};

export default AuthPreview;
