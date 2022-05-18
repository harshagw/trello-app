import React from "react";
import Card from "./Card";
import { BsThreeDots } from "react-icons/bs";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";

const List = () => {
  return (
    <div className="board_list">
      <div className="board_list_header">
        <h5>Design</h5>
        <DropdownMenu
          menuItem={<BsThreeDots />}
          className="board_list_header_menu"
        >
          <a className="board_list_header_menu_item">Rename</a>
          <a className="board_list_header_menu_item">Delete</a>
        </DropdownMenu>
      </div>

      <div className="board_cards">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="add_card">
        <h5>Add new card</h5>
      </div>
    </div>
  );
};

export default List;
