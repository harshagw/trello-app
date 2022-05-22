import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./dashboard.scss";

import MainSidebar from "./MainSidebar/MainSidebar";
import BoardsPage from "./Boards/BoardsPage";
import BoardPage from "./Board/BoardPage";
import Logout from "./MainSidebar/Logout";

const DashboardMainPage = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {logoutOpen && <Logout open={setLogoutOpen} setOpen={setLogoutOpen} />}
      </AnimatePresence>
      <div className="dashboard">
        <MainSidebar setLogoutOpen={setLogoutOpen} />
        <div className="dashboard_body">
          <Routes>
            <Route path="/" element={<BoardsPage />} />
            <Route path="/board/:id" element={<BoardPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default DashboardMainPage;
