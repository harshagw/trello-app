import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BiCommentDetail } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { boardEmit } from "../../../app/features/boardSlice";
import { AiOutlineClose } from "react-icons/ai";

import CardDetails from "./CardDetails";

const Card = ({ data, setCardDetailsOpen }) => {
  const dispatch = useDispatch();

  const handleDeleteCard = () => {
    dispatch(boardEmit({ name: "card:delete", data: { _id: data._id } }));
  };

  return (
    <div className="board_list_card">
      <div className="card_header">
        <div className="card_tags">
          <a href="#">Family</a>
          <a href="#">High priority</a>
          <a href="#">Personal</a>
        </div>
        <AiOutlineClose onClick={handleDeleteCard} />
      </div>

      <h6 onClick={() => setCardDetailsOpen(true)}>{data.title}</h6>
      <p>{data.description}</p>

      {/* <div className="card_bottom_bar">
        <div className="card_assignees">
          <span className="name_avatar">HA</span>
          <span className="name_avatar">YA</span>
        </div>
        <div className="card_properties">
          <div className="card_property">
            <BiCommentDetail />
            <span>5</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Card;
