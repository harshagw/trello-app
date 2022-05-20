import React from "react";
import Card from "./Card";
import { BsThreeDots } from "react-icons/bs";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";

const List = ({ setCardDetailsOpen }) => {
  return (
    <div className="board_list">
      <div className="board_list_header">
        <h6>Design</h6>
        {/* <DropdownMenu
          menuItem={<BsThreeDots />}
          className="board_list_header_menu"
        >
          <a className="board_list_header_menu_item">Rename</a>
          <a className="board_list_header_menu_item">Delete</a>
        </DropdownMenu> */}
        <BsThreeDots />
      </div>

      <div className="board_cards">
        <Card setCardDetailsOpen={setCardDetailsOpen} />
        <Card setCardDetailsOpen={setCardDetailsOpen} />
        <Card setCardDetailsOpen={setCardDetailsOpen} />
        <Card setCardDetailsOpen={setCardDetailsOpen} />
        <Card setCardDetailsOpen={setCardDetailsOpen} />
      </div>

      <div className="add_card">
        <h6>Add new card</h6>
      </div>
    </div>
  );
};

export default List;
