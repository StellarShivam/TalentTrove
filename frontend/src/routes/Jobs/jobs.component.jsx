import React from "react";
import { useState, useEffect } from "react";
import Modal from "../../components/modal/modal.component";
import Number from "../../components/AnimatedNumber/number.component";
import axios from "axios";
import "./jobs.css";
import InstaIcon from "../../images/instagram.svg";
import TwitterIcon from "../../images/twitter.svg";
import LinkedInIcon from "../../images/linkedin.svg";
import MicrosoftIcon from "../../images/Microsoft.svg";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const Jobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [jobs, setJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [jobTypeFilter, setJobTypeFilter] = useState([]);
  const [locations, setLocations] = useState([]);
  const [displayJob, setDisplayJob] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = jobs.slice(firstIndex, lastIndex);
  const npage = Math.ceil(jobs.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
    setCurrentPage(1);
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
    setCurrentPage(1);
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
    setCurrentPage(1);
  };

  const handlePrevPagination = () => {
    if (currentPage === 1) {
      setCurrentPage(npage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPagination = () => {
    if (currentPage === npage) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
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
                records.map((job) => (
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
              {jobs.length > 0 && (
                <div className="pagination">
                  <button onClick={handlePrevPagination}>Prev</button>
                  <p>{currentPage}</p>
                  <p> of </p>
                  <p>{npage}</p>
                  <button onClick={handleNextPagination}>Next</button>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
      <div class="footer-container">
        <footer class="footer">
          <div class="footer-top">
            <div class="comp-logo">
              <a class="logo-link" href="#home">
                TalentTrove
              </a>
            </div>
            <p class="filler-text">Seamless Learning for Brighter Futures.</p>
            <div class="social">
              <a class="social-link" href="#instagram">
                <img alt="icon" src={InstaIcon} class="social-icon" />
              </a>
              <a href="#linkedin" class="social-link">
                <img alt="icon" src={LinkedInIcon} class="social-icon" />
              </a>
              <a href="#microsoft" class="social-link">
                <img alt="icon" src={MicrosoftIcon} class="social-icon" />
              </a>
              <a href="#twitter" class="social-link">
                <img alt="icon" src={TwitterIcon} class="social-icon" />
              </a>
            </div>
          </div>

          <div class="footer-grid">
            {/* <!-- column 1 --> */}
            <div class="footer-grid-column">
              <div class="footer-grid-heading">Products</div>
              <ul class="footer-links-list">
                <li>
                  <a href="#overview" class="footer-link">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Solutions
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Customers
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- column 2 --> */}
            <div class="footer-grid-column">
              <div class="footer-grid-heading">Company</div>
              <ul class="footer-links-list">
                <li>
                  <a href="#overview" class="footer-link">
                    About
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Investor Relations
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- column 3 --> */}
            <div class="footer-grid-column">
              <div class="footer-grid-heading">Support</div>
              <ul class="footer-links-list">
                <li>
                  <a href="#overview" class="footer-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Chat
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div class="footer-grid-column">
              <div class="footer-grid-heading">Legal</div>
              <ul class="footer-links-list">
                <li>
                  <a href="#overview" class="footer-link">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Cookie Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
        <div class="footer-copyright">
          © 2024 - Present TalentTrove. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Jobs;
