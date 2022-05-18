import React from "react";
import BoardTile from "./BoardTile";
import "./boards.scss";

const BoardsPage = () => {
  return (
    <div className="boards">
      <div className="boards_section">
        <h1>Favourite Boards</h1>
        <div className="boards_list">
          <BoardTile />
          <BoardTile />
        </div>
      </div>

      <div className="boards_section">
        <h1>Your Boards</h1>
        <div className="boards_list">
          <BoardTile />
          <BoardTile />
          <BoardTile />
          <BoardTile />
          <BoardTile />
          <BoardTile />
        </div>
      </div>

      <div className="boards_section">
        <h1>Shared Boards</h1>
        <div className="boards_list">
          <BoardTile />
          <BoardTile />
          <BoardTile />
          <BoardTile />
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;
