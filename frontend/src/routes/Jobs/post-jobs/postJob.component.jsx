import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import "./postJobs.css";

const PostJobs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [company, setComapny] = useState("Microsoft Corporation");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const auth = useContext(AuthContext);

  //   const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
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
        "http://localhost:3002/api/jobs/e1/createJob",
        {
          jobCategory: category,
          jobTitle: title,
          companyName: company,
          location: location,
          jobType: jobType,
          jobDescription: description,
        },
        config
      )
      .then((res) => {
        toast.update(id, {
          render: "Job posted Successfully",
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
        setComapny("");
        setDescription("");
        setJobType("");
        setLocation("");
        setTitle("");
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
  return (
    <>
      <Outlet />
      <div id="container-register">
        <div id="title">
          <i class="material-icons lock">lock</i> Post A Job
        </div>

        <form onSubmit={handleJobPost}>
          <div class="input">
            <div class="input-addon">
              <i class="material-icons">list_alt</i>
            </div>
            <input
              id="jobTitle"
              placeholder="Title"
              type="text"
              required
              class="validate"
              autocomplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div class="clearfix"></div>

          <div class="input">
            <div class="input-addon">
              <i class="material-icons">location_on</i>
            </div>
            <input
              id="location"
              placeholder="Location"
              type="text"
              required
              class="validate"
              autocomplete="off"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div class="clearfix"></div>

          <div class="input">
            <div class="input-addon">
              <i class="material-icons">payments</i>
            </div>
            <input
              id="salary"
              placeholder="Salary"
              type="text"
              required
              class="validate"
              autocomplete="off"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <div class="clearfix"></div>

          <div class="input">
            <div class="input-addon">
              <i class="material-icons">category</i>
            </div>
            <select
              name="category"
              id="jobCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="machine-learning">machine-learning</option>
              <option value="artificial-intelligence">
                artificial-intelligence
              </option>
              <option value="devops">devops</option>
              <option value="web-development">web-development</option>
              <option value="front-end-development">
                front-end-development
              </option>
              <option value="backend-development">backend-development</option>
              <option value="full-stack-development">
                full-stack-development
              </option>
              <option value="software-development">software-development</option>
              <option value="android-app-development">
                android-app-development
              </option>
              <option value="ios-app-development">ios-app-development</option>
              <option value="data-analytics">data-analytics</option>
              <option value="data-science">data-science</option>
            </select>
          </div>

          <div class="job-type">
            <h4>Job Type</h4>
            <div class="input-group">
              <input
                type="radio"
                id="job-full-time"
                name="job"
                value="full-time"
                onChange={(e) => setJobType(e.target.value)}
              />
              <label for="job-full-time">Full Time</label>
              <input
                type="radio"
                id="job-internship"
                name="job"
                value="internship"
                onChange={(e) => setJobType(e.target.value)}
              />
              <label for="job-internship">Internship</label>
              <input
                type="radio"
                id="job-remote"
                name="job"
                value="remote"
                onChange={(e) => setJobType(e.target.value)}
              />
              <label for="job-remote">Remote</label>
            </div>
          </div>

          <div class="job-desc">
            <h4>Job Description</h4>
            <div class="">
              <textarea
                rows="10"
                cols="50"
                name="comment"
                form="usrform"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>
    </>
  );
};

export default PostJobs;
