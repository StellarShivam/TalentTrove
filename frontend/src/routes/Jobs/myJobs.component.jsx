import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../../context/auth-context";
import "./myJobs.css";

import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const auth = useContext(AuthContext);

  //   const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        };
        const { data } = await axios.get(
          `http://localhost:3002/api/jobs/e1/myJobs`,
          config
        );
        console.log(data);
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, [auth]);
  //   if (!isAuthorized || (user && user.role !== "Employer")) {
  //     navigateTo("/");
  //   }

  //   //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //   //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    const id = toast.loading("Please wait...");
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.put(
        "http://localhost:3002/api/jobs/e1/myJobs/update/:jobId",
        updatedJob,
        config
      );

      toast.update(id, {
        render: "Updated Successfully",
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

  //   //Function For Deleting Job
  //   const handleDeleteJob = async (jobId) => {
  //     await axios
  //       .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         toast.success(res.data.message);
  //         setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  //       })
  //       .catch((error) => {
  //         toast.error(error.response.data.message);
  //       });
  //   };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Jobs</h1>
          {myJobs.length > 0 ? (
            <>
              <div className="posted-jobs">
                {myJobs.map((job) => (
                  <div class="job-container">
                    <div className="title">
                      <h3>{job.jobTitle}</h3>
                    </div>
                    <div class="job-brefing">
                      <div class="job-heading">
                        {/* <p class="title">{job.jobTitle}</p> */}
                        <div className="job-title">
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={editingMode !== job._id ? true : false}
                            value={job.jobTitle}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "jobTitle",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="job-category">
                          <span>Category:</span>
                          <select
                            value={job.jobCategory}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "jobCategory",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== job._id ? true : false}
                          >
                            <option value="machine-learning">
                              machine-learning
                            </option>
                            <option value="artificial-intelligence">
                              artificial-intelligence
                            </option>
                            <option value="devops">devops</option>
                            <option value="web-development">
                              web-development
                            </option>
                            <option value="front-end-development">
                              front-end-development
                            </option>
                            <option value="backend-development">
                              backend-development
                            </option>
                            <option value="full-stack-development">
                              full-stack-development
                            </option>
                            <option value="software-development">
                              software-development
                            </option>
                            <option value="android-app-development">
                              android-app-development
                            </option>
                            <option value="ios-app-development">
                              ios-app-development
                            </option>
                            <option value="data-analytics">
                              data-analytics
                            </option>
                            <option value="data-science">data-science</option>
                          </select>
                        </div>

                        <div className="job-location">
                          <span>Location:</span>
                          <input
                            type="text"
                            disabled={editingMode !== job._id ? true : false}
                            value={job.location}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="job-salary">
                          <span>Salary:</span>
                          <input
                            type="text"
                            disabled={editingMode !== job._id ? true : false}
                            // value={job.salary}
                            // onChange={(e) =>
                            //   handleInputChange(
                            //     job._id,
                            //     "salary",
                            //     e.target.value
                            //   )
                            // }
                          />
                        </div>

                        <div className="job-type">
                          <span>Job Type:</span>
                          <div class="input-group">
                            <input
                              type="radio"
                              id="job-full-time"
                              name="job"
                              value="full-time"
                              disabled={editingMode !== job._id ? true : false}
                              onChange={(e) =>
                                handleInputChange(
                                  job._id,
                                  "jobType",
                                  e.target.value
                                )
                              }
                              checked={
                                job.jobType === "full-time" ? true : false
                              }
                            />
                            <label for="job-full-time">Full Time</label>
                            <input
                              type="radio"
                              id="job-internship"
                              name="job"
                              value="internship"
                              disabled={editingMode !== job._id ? true : false}
                              onChange={(e) =>
                                handleInputChange(
                                  job._id,
                                  "jobType",
                                  e.target.value
                                )
                              }
                              checked={
                                job.jobType === "internship" ? true : false
                              }
                            />
                            <label for="job-internship">Internship</label>
                            <input
                              type="radio"
                              id="job-remote"
                              name="job"
                              value="remote"
                              disabled={editingMode !== job._id ? true : false}
                              onChange={(e) =>
                                handleInputChange(
                                  job._id,
                                  "jobType",
                                  e.target.value
                                )
                              }
                              checked={job.jobType === "remote" ? true : false}
                            />
                            <label for="job-remote">Remote</label>
                          </div>
                        </div>
                        <div className="job-desc">
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={job.jobDescription}
                            disabled={editingMode !== job._id ? true : false}
                            onChange={(e) =>
                              handleInputChange(
                                job._id,
                                "jobDescription",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="button-groups">
                          <button class="contact-button" href="/">
                            View Applicants
                          </button>
                          {editingMode === job._id ? (
                            <button
                              class="contact-button"
                              onClick={() => handleUpdateJob(job._id)}
                            >
                              Update
                            </button>
                          ) : (
                            <button
                              class="contact-button"
                              onClick={() => handleEnableEdit(job._id)}
                            >
                              Edit
                            </button>
                          )}
                          <button class="contact-button" href="/">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
