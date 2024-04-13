import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navigation from "./routes/Navigation/navigation.component";
import Home from "./routes/Home/home.component";
import Jobs from "./routes/Jobs/jobs.component";
import Authentication from "./routes/Authentication/authentication.component";
import AppliedJobs from "./components/applied-jobs/appliedJobs.component";
// import { Signup } from "./components/sign-up-form/signup.component";
import JobDesc from "./routes/Jobs/jobDesc.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="appliedJobs" element={<AppliedJobs />} />
        <Route path="jobdesc/:jobId" element={<JobDesc />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
