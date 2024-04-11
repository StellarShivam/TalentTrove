import React from "react";
import { useState, useEffect } from "react";
import Modal from "../../components/modal/modal.component";
import Number from "../../components/AnimatedNumber/number.component";
import axios from "axios";
import "./jobs.css";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const Jobs = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [jobs, setJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [jobTypeFilter, setJobTypeFilter] = useState([]);
  const [locations, setLocations] = useState([]);
  const [displayJob, setDisplayJob] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3002/api/jobs/locations`
      );
      setLocations(data.uniqueCities);
    };
    fetchData();
  }, []);

  const handleLocationFilter = async (e) => {
    const clickedValue = e.target.value;
    const index = locationFilter.indexOf(clickedValue);
    if (index == -1) {
      locationFilter.push(clickedValue);
    } else {
      locationFilter.splice(index, 1);
    }
    let locationString = locationFilter.join("-");
    if (locationString == "") {
      locationString = "-";
    }

    let jobTypeString = jobTypeFilter.join("-");
    if (jobTypeString == "") {
      jobTypeString = "-";
    }

    const { data } = await axios.get(
      `http://localhost:3002/api/jobs/${title}/${locationString}/${jobTypeString}`
    );
    setJobs(data.jobs);
  };

  const handleJobTypeFilter = async (e) => {
    const clickedValue = e.target.value;
    const index = jobTypeFilter.indexOf(clickedValue);
    if (index == -1) {
      jobTypeFilter.push(clickedValue);
    } else {
      jobTypeFilter.splice(index, 1);
    }
    let locationString = locationFilter.join("-");
    if (locationString == "") {
      locationString = "-";
    }

    let jobTypeString = jobTypeFilter.join("-");
    if (jobTypeString == "") {
      jobTypeString = "-";
    }

    const { data } = await axios.get(
      `http://localhost:3002/api/jobs/${title}/${locationString}/${jobTypeString}`
    );
    setJobs(data.jobs);
  };

  const handleClick = async () => {
    if (title === "") {
      console.log("Please enter title");
    }
    let URL = `http://localhost:3002/api/jobs/${title}/${city}/-`;
    if (city === "") {
      URL = `http://localhost:3002/api/jobs/${title}/-/-`;
    }
    console.log(title, city);
    const { data } = await axios.get(URL);

    // setCity("");
    // setTitle("");
    setJobs(data.jobs);
    setDisplayJob(true);
  };

  return (
    <>
      <div class="search-section">
        <section class="search-box-div">
          <div class="search-text">
            <p class="search-label">#1PLATFORMFORJOB</p>
            <h1 class="search-title">
              Find Your Dream Job That Suit With Exciting Opportunities
            </h1>
            <p class="search-description">
              Embark on a journey towards your dream career, your ultimate
              job-finding companion!We've curated a platfrom that connects
              talented individuals with exciting opportunities
            </p>
          </div>
          <div class="search-box">
            <div class="inputs">
              <div class="search-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <div class="job-input">
                <input
                  value={title}
                  type="text"
                  placeholder="Job title or keyword"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <div class="location-icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div class="location-input">
                <input
                  value={city}
                  type="text"
                  placeholder="Add city"
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
            </div>
            <a href="#search" class="search-button" onClick={handleClick}>
              Search
            </a>
          </div>
          <div class="search-counts">
            <div class="count-box-1">
              <p class="count-box-title">Live Jobs</p>
              <p class="count-box-count" data-val="30000">
                <Number n={30000} />
                <span>+</span>
              </p>
            </div>
            <div class="count-box-2">
              <p class="count-box-title">Daily Jobs</p>
              <p class="count-box-count" data-val="5000">
                <Number n={5000} />
                <span>+</span>
              </p>
            </div>
            <div class="count-box-3">
              <p class="count-box-title">People Hired</p>
              <p class="count-box-count" data-val="25000">
                <Number n={25000} />
                <span>+</span>
              </p>
            </div>
            <div class="count-box-4">
              <p class="count-box-title">Comapnies</p>
              <p class="count-box-count" data-val="1000">
                <Number n={1000} />
                <span>+</span>
              </p>
            </div>
          </div>
        </section>
      </div>

      <div class="search-result">
        {displayJob && (
          <section class="search-result-div">
            <div class="filters">
              <p>All Filters</p>
              <div className="location-filter">
                <div className="location-filter-heading">
                  <h3>Location</h3>
                </div>
                <div className="location-filter-values">
                  <div class="options">
                    <input
                      type="checkbox"
                      value="Delhi"
                      checked={locationFilter.includes("Delhi")}
                      onClick={handleLocationFilter}
                    ></input>
                    <label>Delhi</label>
                  </div>
                  <div class="options">
                    <input
                      type="checkbox"
                      value="Bengaluru"
                      checked={locationFilter.includes("Bengaluru")}
                      onClick={handleLocationFilter}
                    ></input>
                    <label>Bengaluru</label>
                  </div>
                  <div class="options">
                    <input
                      type="checkbox"
                      value="Mumbai"
                      checked={locationFilter.includes("Mumbai")}
                      onClick={handleLocationFilter}
                    ></input>
                    <label>Mumbai</label>
                  </div>
                  <div
                    style={BUTTON_WRAPPER_STYLES}
                    onClick={() => console.log("clicked")}
                  >
                    <a href="#modal" onClick={() => setIsOpen(true)}>
                      View More
                    </a>

                    <Modal
                      open={isOpen}
                      onClose={() => setIsOpen(false)}
                      locations={locations}
                      handleLocationFilter={handleLocationFilter}
                    >
                      <div className="modal-location-filter">
                        {locations.map((loc) => (
                          <div class="options">
                            <input
                              type="checkbox"
                              value={loc}
                              checked={locationFilter.includes(loc)}
                              onClick={handleLocationFilter}
                            ></input>
                            <label>{loc}</label>
                          </div>
                        ))}
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
              <div className="location-filter">
                <div className="location-filter-heading">
                  <h3>Job Type</h3>
                </div>
                <div className="location-filter-values">
                  <div class="options">
                    <input
                      type="checkbox"
                      value="Internship"
                      checked={jobTypeFilter.includes("Internship")}
                      onClick={handleJobTypeFilter}
                    ></input>
                    <label>Internship</label>
                  </div>
                  <div class="options">
                    <input
                      type="checkbox"
                      value="Fulltime"
                      checked={jobTypeFilter.includes("Fulltime")}
                      onClick={handleJobTypeFilter}
                    ></input>
                    <label>Fulltime</label>
                  </div>
                  <div class="options">
                    <input
                      type="checkbox"
                      value="PartTime"
                      checked={jobTypeFilter.includes("PartTime")}
                      onClick={handleJobTypeFilter}
                    ></input>
                    <label>PartTime</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="jobs-listings">
              {jobs.length > 0 &&
                jobs.map((job) => (
                  <div class="job-container">
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
                      <p class="job-posted">{job.jobPosted}</p>
                    </div>
                    <a
                      href={`jobdesc/${job._id}`}
                      target="_blank"
                      class="details"
                    >
                      <i class="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                ))}
              {jobs.length == 0 && (
                <div className="no-jobs">
                  <div className="no-job-image">
                    <img
                      src="https://static.naukimg.com/s/9/121/_next/static/media/zeroJobs-found.72c8c9ae.png"
                      alt="search-img"
                    />
                    <h3>No results found</h3>
                    <p>
                      Modify search criteria or create an alert to get relevant
                      jobs as soon as they’re posted
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Jobs;
