import React from "react";

const Signin = () => {
  return (
    <div className="section form">
      <div className="headings">
        <h1>Welcome back,</h1>
      </div>
      <div className="input_block">
        <input type="text" placeholder="Your email address" />
      </div>
      <div className="input_block">
        <input type="password" placeholder="Your password" />
      </div>
      <a href="#" className="button button_larger">
        submit
      </a>
    </div>
  );
};

export default Signin;
