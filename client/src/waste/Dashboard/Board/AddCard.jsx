import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { boardEmit } from "../../../app/features/boardSlice";
import { AiOutlineClose } from "react-icons/ai";

const AddCard = ({ listId }) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const dispatch = useDispatch();

  const flipAddCard = () => {
    setShowAddCard((state) => !state);
  };

  const getInputValue = (e) => {
    setNewCardTitle(e.target.value);
  };

  const handleAddCard = () => {
    dispatch(
      boardEmit({
        name: "card:add",
        data: { listId: listId, title: "New Card" },
      })
    );
    setNewCardTitle("");
    flipAddCard();
  };

  return (
    <div className="add_card">
      {/* {showAddCard ? (
        <div className="add_card_back">
          <div className="add_card_header">
            <AiOutlineClose onClick={flipAddCard} />
          </div>
          <div className="add_card_footer">
            <div className="input_block">
              <input type="text" placeholder="title" value={newCardTitle} onChange={getInputValue} />
              <button className="button" onClick={handleAddCard}>
                add
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="add_card_front">
          <h6 onClick={flipAddCard}>+ Add a card</h6>
        </div>
      )} */}
      <div className="add_card_front">
        <h6 onClick={handleAddCard}>+ Add a card</h6>
      </div>
    </div>
  );
};

export default AddCard;
