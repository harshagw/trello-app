import React from "react";

const Signup = () => {
  return (
    <div className="section form">
      <div className="headings">
        <h1>Create your account</h1>
      </div>
      <div className="input_block">
        <input type="text" placeholder="Your name" />
      </div>
      <div className="input_block">
        <input type="text" placeholder="Your email address" />
      </div>
      <div className="input_block">
        <input type="password" placeholder="Your password" />
      </div>
      <a href="#" className="button">
        create
      </a>
    </div>
  );
};

export default Signup;
