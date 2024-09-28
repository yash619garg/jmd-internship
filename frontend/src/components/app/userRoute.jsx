import { useGetUserQuery } from "@/redux/api/userSlice";
import { setCredentials } from "@/redux/features/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const UserRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default UserRoute;
