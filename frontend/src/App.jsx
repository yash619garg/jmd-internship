import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Auth from "./pages/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserRoute from "./components/app/userRoute";
import UploadImage from "./pages/UploadImage";
import AllImages from "./pages/Images";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/private" element={<UserRoute />}>
          <Route path="upload" element={<UploadImage />} />
          <Route path="images" element={<AllImages />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
