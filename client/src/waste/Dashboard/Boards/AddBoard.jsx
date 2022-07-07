import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAddBoardMutation } from "../../../app/features/boardsSlice";

const AddBoard = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [createBoard] = useAddBoardMutation();
  const flipAddCard = () => {
    setShowAddCard((state) => !state);
  };

  const getInputValue = (e) => {
    setNewBoardName(e.target.value);
  };

  const handleCreateBoard = () => {
    console.log(newBoardName);
    createBoard(newBoardName);
    setNewBoardName("");
    flipAddCard();
  };

  return (
    <div className="add_new_board">
      {showAddCard ? (
        <div className="board_tile back">
          <div className="board_tile_header">
            <h6>Create new board</h6>
            <AiOutlineClose onClick={flipAddCard} />
          </div>
          <div className="board_tile_body">
            {/* <p>Manage a new board</p> */}
          </div>
          <div className="board_tile_footer">
            <div className="input_block">
              <input
                type="text"
                placeholder="name"
                value={newBoardName}
                onChange={getInputValue}
              />
              <button className="button" onClick={handleCreateBoard}>
                create
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="board_tile front">
          <h6 onClick={flipAddCard}>Add new board</h6>
        </div>
      )}
    </div>
  );
};

export default AddBoard;
