import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./appliedJobs.css";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getAppliedJobs = async () => {
      console.log(auth.token);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        };
        const { data } = await axios.get(
          `http://localhost:3002/api/jobs/appliedJobs`,
          config
        );
        setJobs(data.appliedJobs);
      } catch (e) {}
    };
    getAppliedJobs();
    console.log(jobs);
  }, [auth.token]);

  const appliedTime = (timestamp) => {
    const time = new Date(timestamp).getTime();
    const now = Date.now();
    const difference = now - time;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <>
      <Outlet />
      <div className="applied-jobs-container">
        <div className="applied-content">
          <div className="applied-job-box">
            {jobs.length > 0 &&
              jobs.map((job) => (
                <div class="applied-job-container">
                  <div class="job-brefing">
                    <div class="job-heading">
                      <div class="job-logo"></div>
                      <p class="title">{job.jobTitle}</p>
                      <p class="company">{job.companyName}</p>
                    </div>
                    <div class="job-tags">
                      <div className="job-type-div">
                        <i class="fa-solid fa-suitcase"></i>
                        <p class="job-type">{job.jobType}</p>
                      </div>
                      <div className="location-div">
                        <i class="fa-solid fa-location-dot"></i>
                        <p class="location">{job.location.join(", ")}</p>
                      </div>
                    </div>
                    <p class="job-applied">
                      <i class="fa-solid fa-snowflake"></i>
                      Applied {appliedTime(job.createdAt)}
                    </p>
                    <p class="job-status">
                      Status:<span>Pending....</span>
                    </p>
                  </div>
                  <a href={job.applyLink} target="_blank" class="details">
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              ))}
            {jobs.length === 0 && <div>You have not applied anywhere!!!</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppliedJobs;
