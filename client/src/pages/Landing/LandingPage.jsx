import React, { useState } from "react";
import Signin from "./Signin";
import Intro from "./Intro";
import "./landing.scss";
import Signup from "./Signup";

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const showLogin = () => {
    setIsLogin((prev) => true);
    setShowForm((prev) => true);
  };

  const showSignUp = () => {
    setIsLogin((prev) => false);
    setShowForm((prev) => true);
  };

  return (
    <div className="main">
      <div className="data">
        <header>
          <a href="#" onClick={() => setShowForm(false)}>
            home
          </a>
          <a href="/dashboard">about us</a>
          <a href="#" onClick={showLogin}>
            sign in
          </a>
          <a href="#" onClick={showSignUp}>
            sign up
          </a>
        </header>
        <main>{!showForm ? <Intro /> : isLogin ? <Signin /> : <Signup />}</main>
        <footer>
          <a href="#">terms and condition</a>
        </footer>
      </div>
      <div className="carousel"></div>
    </div>
  );
};

export default LandingPage;
