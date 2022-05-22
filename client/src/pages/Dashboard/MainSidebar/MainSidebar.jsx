import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineBell,
  AiOutlinePlus,
} from "react-icons/ai";

const MainSidebar = ({ setLogoutOpen }) => {
  return (
    <div className="header">
      <Link to="/dashboard" className="logo">
        <h2>T</h2>
      </Link>
      <div className="header_menu">
        <div className="header_menu_item">
          <AiOutlinePlus />
        </div>

        <div className="header_menu_item">
          <AiOutlineBell />
        </div>

        <div className="header_menu_item">
          <AiOutlineUser />
        </div>

        <div className="header_menu_item">
          <AiOutlineLogout
            onClick={() => {
              setLogoutOpen((prev) => !prev);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
