import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  // if (!loggedUser) {
  //   useEffect(() => {
  //     navigate("/login");
  //   }, []);
  // }
  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="pl-56 pr-3">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
