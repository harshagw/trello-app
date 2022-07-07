import React, { useState } from "react";

import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { HiViewBoards } from "react-icons/hi";
import Logout from "./Logout";

const AppBar = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <Logout open={logoutOpen} setOpen={setLogoutOpen} />
      <div className="navbar app_bar">
        <div className="left_menu">
          <Link to="/" className="logo">
            Home
          </Link>
          <Link to="/dashboard" className="logo">
            My Board
          </Link>
          <Link to="/dashboard/shared" className="logo">
            Shared
          </Link>
        </div>
        <div className="center_menu"></div>
        <div className="right_menu">
          <span className="link">
            <AiOutlineLogout
              onClick={() => {
                setLogoutOpen(() => true);
              }}
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default AppBar;
