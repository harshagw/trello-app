import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Aboutus from "./Static/Aboutus";
import Signin from "./Auth/Signin";
import Intro from "./Static/Intro";
import "./landing.scss";
import Signup from "./Auth/Signup";
import { PublicRoute } from "../../app/routes";
import NotFound from "./Static/NotFound";

const LandingMainPage = () => {
  return (
    <div className="main">
      <div className="data">
        <header>
          <Link to="/">home</Link>
          <Link to="/signin">sign in</Link>
          <Link to="/signup">sign up</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route
              path="/signin"
              element={
                <PublicRoute>
                  <Signin />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>{/* <a href="#">terms and condition</a> */}</footer>
      </div>
      <div className="carousel"></div>
    </div>
  );
};

export default LandingMainPage;
