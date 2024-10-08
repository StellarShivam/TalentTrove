import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Navigation from "./routes/Navigation/navigation.component";
import Home from "./routes/Home/home.component";
import Jobs from "./routes/Jobs/jobs.component";
import Authentication from "./routes/Authentication/authentication.component";
import AppliedJobs from "./components/applied-jobs/appliedJobs.component";
import JobDesc from "./routes/Jobs/jobDesc.component";
import MyJobs from "./routes/Jobs/myJobs.component";
import PostJobs from "./routes/Jobs/post-jobs/postJob.component";
import { Signup } from "./components/sign-up-form/signup.component";
import JobAlert from "./routes/Jobs/jobAlert.component";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="auth/*" element={<Authentication />} />
          <Route path="jobs/*" element={<Jobs />} />
          <Route path="appliedJobs" element={<AppliedJobs />} />
          <Route path="postJob" element={<PostJobs />} />
          <Route path="myJobs" element={<MyJobs />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
      <ToastContainer style={{ width: "22rem" }} />
    </>
  );
};

export default App;
