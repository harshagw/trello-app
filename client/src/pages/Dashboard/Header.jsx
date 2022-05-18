import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineBell, AiOutlinePlus } from "react-icons/ai";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <h2>Trello</h2>
      </Link>
      <div className="header_menu">
        <div className="header_menu_item">
          <AiOutlinePlus />
        </div>

        <div className="header_menu_item">
          <AiOutlineBell />
        </div>

        <div className="header_menu_item">
          <DropdownMenu menuItem={<AiOutlineUser />}>
            <a className="header_sub_menu_item">Profile</a>
            <a className="header_sub_menu_item">Settings</a>
            <a className="header_sub_menu_item">Logout</a>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
