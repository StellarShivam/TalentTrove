import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import "./jobDesc.css";

const JobDesc = () => {
  const jobId = useParams().jobId;
  const [jobData, setJobData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3002/api/jobs/jobdesc/${jobId}`
      );
      console.log(data.jobData);
      setJobData(data.jobData);
    };
    fetchData();
  }, []);

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
              <p>Already Applied??</p>
              <button>
                <i class="fa-solid fa-check"></i>
              </button>
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
