import React from "react";
import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import "./globals.scss";
import "./app.scss";
import DashboardMainPage from "./pages/Dashboard/DashboardMainPage";
import LandingMainPage from "./pages/Landing/LandingMainPage";
import { PrivateRoute } from "./app/routes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<LandingMainPage />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardMainPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
