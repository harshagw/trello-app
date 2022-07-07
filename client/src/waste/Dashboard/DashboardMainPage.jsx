import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./dashboard.scss";

// import MainSidebar from "./MainSidebar/MainSidebar";
import BoardsPage from "./Boards/BoardsPage";
import BoardPage from "./Board/BoardPage";
import MainHeader from "./MainHeader/MainHeader";

const DashboardMainPage = () => {
  return (
    <div className="dashboard">
      {/* <MainSidebar /> */}
      <MainHeader />
      <div className="dashboard_body">
        <Routes>
          <Route path="/" element={<BoardsPage />} />
          <Route path="/board/:id" element={<BoardPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardMainPage;
