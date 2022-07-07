import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { boardEmit } from "../../../app/features/boardSlice";
import Card from "../Card/Card";

import { Draggable, Droppable } from "react-beautiful-dnd";
import ListHeader from "./ListHeader";

const List = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddCard = () => {
    dispatch(
      boardEmit({
        name: "card:add",
        data: { listId: data["_id"], title: "New Card" },
      })
    );
  };

  console.log("rendering list - ", data._id, data.order);

  return (
    <Draggable draggableId={data["_id"]} index={data["order"]} type="list">
      {(provided) => {
        return (
          <div className="list" {...provided.draggableProps} ref={provided.innerRef}>
            <ListHeader data={data} dragProps={provided.dragHandleProps} />

            <Droppable droppableId={data._id} type="card">
              {(provided) => {
                return (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {data.cards?.map((card, index) => {
                      return <Card key={card._id} data={card} />;
                    })}
                    {provided.placeholder}
                  </ul>
                );
              }}
            </Droppable>

            <footer onClick={handleAddCard}>+ Add a new card</footer>
          </div>
        );
      }}
    </Draggable>
  );
};

export default List;
