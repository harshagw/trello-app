import React from "react";
import "./landing.scss";

const LandingPage = () => {
  return (
    <div className="main">
      <div className="left-main">
        <header>
          <a href="#">About</a>
          <a href="#">Contact us</a>
        </header>
        <main>
          <h1>Colloborate, Manage, Productity</h1>
          <p>
            Start working like never before, create list or cards. You have the
            power to customire and expand
          </p>
        </main>
        <footer>
          <a href="#">Sign up</a>
          <a href="#">Sign in</a>
        </footer>
      </div>
      <div className="right-main"></div>
    </div>
  );
};

export default LandingPage;
