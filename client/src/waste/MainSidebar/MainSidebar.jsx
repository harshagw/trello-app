import React, { useState } from "react";
import "./mainsidebar.scss";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineLogout, AiOutlineBell, AiOutlinePlus } from "react-icons/ai";
import Logout from "./Logout";

const MainSidebar = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <Logout open={logoutOpen} setOpen={setLogoutOpen} />
      <div className="main_sidebar">
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
                setLogoutOpen(() => true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSidebar;
