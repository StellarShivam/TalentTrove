import React, { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import "./jobDesc.css";
import { AuthContext } from "../../context/auth-context";

const JobDesc = () => {
  const auth = useContext(AuthContext);
  const jobId = useParams().jobId;
  const [jobData, setJobData] = useState({});
  const [applyed, setApplyed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3002/api/jobs/jobdesc/${jobId}`
      );
      setJobData(data.jobData);
    };
    fetchData();
  }, []);

  const handleApply = async () => {
    const id = toast.loading("Please wait...");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
      };
      const { data } = await axios.post(
        `http://localhost:3002/api/jobs/addToAppliedJob`,
        {
          jobTitle: jobData.jobTitle,
          companyName: jobData.companyName,
          location: jobData.location,
          jobType: jobData.jobType,
          applyLink: jobData.applyLink,
        },
        config
      );
      toast.update(id, {
        render: "Job added to applied jobs",
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
      setApplyed(true);
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
      <Outlet />
      <div className="job-description">
        <div className="jd-heading">
          <div class="job-container">
            <div class="job-brefing">
              <div class="job-heading">
                <div class="job-logo"></div>
                <p class="title">{jobData.jobTitle}</p>
                <p class="company">{jobData.companyName}</p>
              </div>
              <div class="job-tags">
                <div className="job-type-div">
                  <i class="fa-solid fa-suitcase"></i>
                  <p class="job-type">{jobData.jobType}</p>
                </div>
                <div className="location-div">
                  <i class="fa-solid fa-location-dot"></i>
                  <p class="location">{jobData.location}</p>
                </div>
              </div>
              <p class="job-posted">{jobData.jobPosted}</p>
              <a
                href={jobData.applyLink}
                target="_blank"
                class="contact-button"
              >
                Apply Now
              </a>
              {applyed && <p>Already Applied!!</p>}
              {!applyed && (
                <a href="#" onClick={handleApply} class="contact-button">
                  Applied
                </a>
              )}
              <h3>Job Description</h3>
              <p>{jobData.jobDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDesc;
