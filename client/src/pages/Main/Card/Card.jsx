import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import CardDetails from "./CardDetails";

const Card = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CardDetails open={open} handleClose={handleClose} data={data} />
      <Draggable draggableId={data["_id"]} index={data["order"]} type="card">
        {(provided, snapshot) => (
          <li onClick={handleOpen} {...provided.draggableProps} ref={provided.innerRef}>
            {/* <img src="https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png" /> */}
            <h1 {...provided.dragHandleProps}>{data.title}</h1>
            <p>{data.description}</p>
          </li>
        )}
      </Draggable>
    </>
  );
};

export default Card;
