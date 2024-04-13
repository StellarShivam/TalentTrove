import React, { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
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
      console.log(data.jobData);
      setJobData(data.jobData);
    };
    fetchData();
  }, []);

  const handleApply = async () => {
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
    } catch (e) {}
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
              {applyed && <p>Already Applied??</p>}
              <a onClick={handleApply} class="contact-button">
                Applied
              </a>
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
