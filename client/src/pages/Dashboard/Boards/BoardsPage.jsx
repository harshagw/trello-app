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
          <BoardTile name="Library List" by="You" at="7:40PM" bgcolor="red" />
          <BoardTile name="School Stuff" by="Yash" at="4:10PM" bgcolor="blue" />
          <BoardTile
            name="Income Funds"
            by="Harsh"
            at="3:10PM"
            bgcolor="gray"
          />
        </div>
      </div> */}

      <div className="boards_section">
        <h3 className="boards_section_heading">Your Boards</h3>
        <div className="boards_list">
          <AddBoard />
          {boards.map((board) => {
            return <BoardTile key={board["_id"]} board={board} />;
          })}
          {/* <BoardTile
            name="Income Funds"
            by="Harsh"
            at="3:10PM"
            bgcolor="yellow"
          />
          <BoardTile
            name="Subscription"
            by="Harsh"
            at="5:10PM"
            bgcolor="lime"
          />
          <BoardTile
            name="Upwork Project"
            by="Harsh"
            at="2:80PM"
            bgcolor="green"
          />
          <BoardTile name="Library List" by="Yash" at="7:40AM" bgcolor="blue" />
          <BoardTile name="ToDO" by="Megha" at="1:10AM" bgcolor="yellow" /> */}
        </div>
      </div>

      {/* <div className="boards_section">
        <h3 className="boards_section_heading">Shared Boards</h3>
        <div className="boards_list">
          <BoardTile name="Library List" by="Yash" at="7:40AM" bgcolor="blue" />
          <BoardTile name="ToDO" by="Megha" at="1:10AM" bgcolor="yellow" />
          <BoardTile
            name="Income Funds"
            by="Harsh"
            at="3:10PM"
            bgcolor="yellow"
          />
        </div>
      </div> */}
    </div>
  );
};

export default BoardsPage;
