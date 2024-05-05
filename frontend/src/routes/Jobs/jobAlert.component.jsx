import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./postJobs.css";
// import { Context } from "../../main";
const JobAlert = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const auth = useContext(AuthContext);

  //   const { isAuthorized, user } = useContext(Context);

  const handleJobAlert = async (e) => {
    e.preventDefault();
    const id = toast.loading("Please wait...");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    };
    await axios
      .post(
        "http://localhost:3002/api/jobs/jobAlert",
        {
          jobCategory: category,
          location: location,
          jobType: jobType,
        },
        config
      )
      .then((res) => {
        toast.update(id, {
          render: "Job alert created Successfully",
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
        setCategory("");
        setJobType("");
        setLocation("");
      })
      .catch((err) => {
        toast.update(id, {
          render: "Something went wrong",
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
      });
  };

  //   const navigateTo = useNavigate();
  //   if (!isAuthorized || (user && user.role !== "Employer")) {
  //     navigateTo("/");
  //   }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>CREATE JOB ALERT</h3>
          <form onSubmit={handleJobAlert}>
            <div className="wrapper">
              <input
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                placeholder="JobType"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <div className="wrapper">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
            </div>
            <button type="submit">Create Job Alert</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default JobAlert;
