import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";

import JobPreview from "../JobPreview/jobpreview.component";
import JobAlert from "./jobAlert.component";
import JobDesc from "./jobDesc.component";

const Jobs = () => {
  return (
    <Routes>
      <Route index element={<JobPreview />} />
      <Route path="jobAlert" element={<JobAlert />} />
      <Route path="jobdesc/:jobId" element={<JobDesc />} />
    </Routes>
  );
};

export default Jobs;
