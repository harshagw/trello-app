import React, { useState, useEffect } from "react";

import { useGetAllBoardsQuery } from "../../../app/features/boardsSlice";
import AddBoard from "./AddBoard";

import BoardTile from "./BoardTile";
import "./boards.scss";

const BoardsPage = () => {
  const { data: boards, isLoading } = useGetAllBoardsQuery();

  if (isLoading) {
    return <h1>LOADING</h1>;
  } else {
    console.log(boards);
  }

  if (!boards) {
    return <h6>Loading..</h6>;
  }

  return (
    <div className="boards">
      {/* <div className="boards_section">
        <h3 className="boards_section_heading">Favourite Boards</h3>
        <div className="boards_list">
          {boards.map((board) => {
            return <BoardTile key={board["_id"]} board={board} />;
          })}
        </div>
      </div> */}

      <div className="boards_section">
        <h3 className="boards_section_heading">Your Boards</h3>
        <div className="boards_list">
          <AddBoard />
          {boards.map((board) => {
            return <BoardTile key={board["_id"]} board={board} />;
          })}
        </div>
      </div>

      {/* <div className="boards_section">
        <h3 className="boards_section_heading">Shared Boards</h3>
        <div className="boards_list">
          {boards.map((board) => {
            return <BoardTile key={board["_id"]} board={board} />;
          })}
        </div>
      </div> */}
    </div>
  );
};

export default BoardsPage;
