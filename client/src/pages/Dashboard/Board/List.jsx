import React, { useState } from "react";
import Card from "./Card";
import { BsThreeDots } from "react-icons/bs";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheckSquare,
  AiOutlineCloseSquare,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { boardEmit } from "../../../app/features/boardSlice";

const ListNameInput = ({ _id, name }) => {
  const [disableNameInput, setDisableNameInput] = useState(true);
  const [newName, setNewName] = useState(name);

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const deleteList = () => {
    console.log("delete a list");
    dispatch(boardEmit({ name: "list:delete", data: { _id: _id } }));
  };

  const cancelRename = () => {
    setDisableNameInput(true);
    setNewName(name);
  };

  const renameList = () => {
    console.log("rename a list");

    if (newName == "") return;
    dispatch(
      boardEmit({
        name: "list:rename",
        data: { _id: _id, newName: newName },
      })
    );

    setDisableNameInput(true);
  };

  return (
    <div className="board_list_header">
      <input
        type="type"
        className="board_list_header_input"
        value={disableNameInput ? name : newName}
        onChange={handleNameChange}
        disabled={disableNameInput ? "disabled" : false}
      />
      <div className="board_list_header_function">
        {disableNameInput ? (
          <AiOutlineEdit onClick={() => setDisableNameInput(false)} />
        ) : (
          <>
            <AiOutlineCheckSquare onClick={renameList} />
            <AiOutlineCloseSquare onClick={cancelRename} />
          </>
        )}

        <AiOutlineDelete onClick={deleteList} />
      </div>
    </div>
  );
};

const List = ({ data, setCardDetailsOpen }) => {
  console.log("running the list");

  return (
    <div className="board_list">
      <ListNameInput _id={data._id} name={data.name} />

      <div className="board_cards">
        {data.cards?.map((card) => {
          return (
            <Card
              key={card._id}
              data={card}
              setCardDetailsOpen={setCardDetailsOpen}
            />
          );
        })}
      </div>

      <div className="add_card">
        <h6>Add new card</h6>
      </div>
    </div>
  );
};

export default List;
