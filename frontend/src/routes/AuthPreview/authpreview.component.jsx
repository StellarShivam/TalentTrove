import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Signup } from "../../components/sign-up-form/signup.component";
import SignIn from "../../components/sign-in/signin.component";
import "./authentication.css";

const AuthPreview = () => {
  return (
    <>
      <div className="content">
        <div>
          <h1>Who are You?</h1>
        </div>
        <div className="options">
          {/* <div className="recruiter">
              <Link to="recruiter">Recruiter</Link>
              <img
                src="https://via.placeholder.com/800x400"
                alt="Section 1 Image"
              />
              <div class="overlay-bg"></div>
              <div class="text-overlay">Section 1: Some Text</div>
            </div>
            <div className="seeker">
              <Link to="seeker">Seeker</Link>
              <img
                src="https://via.placeholder.com/800x400"
                alt="Section 2 Image"
              />
              <div class="overlay-bg"></div>
              <div class="text-overlay">Section 2: More Text</div>
            </div> */}
          <Link class="section" to="recruiter">
            <img
              src="https://lh5.googleusercontent.com/proxy/jmAiphA2r4yfqFOUlg669ToZBYzlz2fmyUkBhHeWNhR5zRJ_NMHAq4mCzNp4lKMa7SbSpd-4hM2tXQktrDBOM7AlX0IU9_PZAwAt3hU3zlrnzURpvkWY7a5P-_OqFYL98qu5NLaEp-te8ebE"
              alt="Section 1 Image"
            />
            <div class="overlay-bg"></div>
            <div class="text-overlay">Recruiter</div>
          </Link>

          <Link class="section" to="seeker">
            <img
              src="https://media.istockphoto.com/id/1279104620/photo/top-view-of-a-white-desktop-concept-job-search.jpg?s=612x612&w=0&k=20&c=Ow_kvA2wQ4rLlqX_oFHgpjLb1JMKyPQKLOPzbu6w6qw="
              alt="Section 2 Image"
            />
            <div class="overlay-bg"></div>
            <div class="text-overlay">Seeker</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthPreview;
