import React, { useState } from "react";
import "./mainheader.scss";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineUser, AiOutlineLogout, AiOutlineBell, AiOutlinePlus } from "react-icons/ai";
import { HiViewBoards } from "react-icons/hi";

const MainHeader = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <Logout open={logoutOpen} setOpen={setLogoutOpen} />
      <div className="main_header">
        <div className="left_menu">
          <Link to="/dashboard" className="logo">
            Trello
          </Link>
          <Link to="/dashboard" className="link">
            <AiFillHome />
          </Link>
          <Link to="/dashboard" className="link">
            <HiViewBoards />
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

export default MainHeader;
