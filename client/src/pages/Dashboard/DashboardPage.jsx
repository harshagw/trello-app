import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./dashboard.scss";

import MainSidebar from "./MainSidebar";
import BoardsPage from "../Boards/BoardsPage";
import BoardPage from "../Board/BoardPage";
import Logout from "./Logout";

const DashboardPage = () => {
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
          {/* <BoardsPage /> */}
          <BoardPage />
          {/* <Routes>
          <Route exact path="/dashboard" element={<BoardsPage />} />
          <Route path="/dashboard/board/:id" element={<BoardPage />} />
        </Routes> */}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
