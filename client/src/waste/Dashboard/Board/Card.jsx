import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { BiCommentDetail } from "react-icons/bi";

import CardDetails from "./CardDetails";

const Card = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CardDetails open={open} handleClose={handleClose} data={data} />

      <Draggable draggableId={data["_id"]} index={data["order"]}>
        {(provided, snapshot) => (
          <div
            className="board_list_card"
            onClick={handleOpen}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h6 className="board_list_card_title">{data.title}</h6>

            <h6 className="board_list_card_desc">{data.description}</h6>

            {/* <div className="card_tags">
              <a href="#" style={{ background: "var(--green-1)", color: "var(--green-8)" }}>
                Optimisation
              </a>
              <a href="#" style={{ background: "var(--yellow-1)", color: "var(--yellow-8)" }}>
                High
              </a>
              <a href="#" style={{ background: "var(--red-1)", color: "var(--red-8)" }}>
                New Project
              </a>
            </div> */}

            {/* <div className="card_bottom_bar">
            <div className="name_avatars">
              <div className="name_avatar">
                <span>HA</span>
              </div>
              <div className="name_avatar">
                <span>YA</span>
              </div>
            </div>
            <div className="card_comments">
              <p>6 comments</p>
              <BiCommentDetail />
            </div>
          </div> */}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Card;
