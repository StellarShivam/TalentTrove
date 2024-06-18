import React, { useState } from "react";
import AuthPreview from "../AuthPreview/authpreview.component";
import "./authentication.css";
import { Route, Routes } from "react-router-dom";
import SignAuthPreview from "../SignAuthPreview/signauthpreview.component";

const Authentication = () => {
  return (
    <Routes>
      <Route index element={<AuthPreview />} />
      <Route path=":role" element={<SignAuthPreview />} />
    </Routes>
  );
};

export default Authentication;
