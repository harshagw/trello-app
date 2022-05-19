import React from "react";
import { Route, Routes } from "react-router-dom";

import "./globals.scss";
import "./app.scss";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LandingPage from "./pages/Landing/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default App;
