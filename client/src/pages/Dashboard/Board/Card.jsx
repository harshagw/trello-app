import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BiCommentDetail } from "react-icons/bi";

import CardDetails from "./CardDetails";

const Card = ({ data, setCardDetailsOpen }) => {
  return (
    <div className="board_list_card" onClick={() => setCardDetailsOpen(true)}>
      <div className="card_header">
        <div className="card_tags">
          <a href="#">Family</a>
          <a href="#">High priority</a>
          <a href="#">Personal</a>
        </div>
      </div>

      <h6>{data.title}</h6>
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
