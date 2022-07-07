import React from "react";
import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import "./app.scss";

import LandingMainPage from "./pages/Landing/LandingMainPage";
import { PrivateRoute } from "./app/routes";
// import DashboardMainPage from "./pages/Dashboard/DashboardMainPage";
import MainPage from "./pages/Main/MainPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<LandingMainPage />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <MainPage />
              {/* <DashboardMainPage /> */}
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
