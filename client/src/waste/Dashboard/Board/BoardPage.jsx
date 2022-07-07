import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./board.scss";
import { Navigate, useParams } from "react-router";
import { initializeBoard, resetBoard } from "../../../app/features/boardSlice";
import Board from "./ Board";

const BoardPage = () => {
  const { id } = useParams();

  const { isLoading, error } = useSelector((state) => state.board);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBoard(id));

    return () => {
      console.log("clearing the board page");
      dispatch(resetBoard());
    };
  }, []);

  if (isLoading) {
    return (
      <div className="board">
        <div className="board_body">
          <div className="board_header">
            <h6>Loading...</h6>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <Navigate to="/dashboard" replace />;
  }

  return <Board />;
};

export default BoardPage;
