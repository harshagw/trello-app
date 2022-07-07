import React, { useState, useEffect } from "react";
import "./mainpage.scss";
import { Route, Routes } from "react-router-dom";
import AppBar from "./AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import Boards from "./Boards/Boards";
import Board from "./Board/Board";
import SharedBoards from "./Boards/SharedBoards";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser, resetUser } from "../../app/features/userSlice";

const MainPage = () => {
  console.log("running the mainpage");
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("setting up the user");
    dispatch(initializeUser());

    return () => {
      console.log("clearing the user page");
      dispatch(resetUser());
    };
  }, []);

  return (
    <div className="dashboard">
      <AppBar />

      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route path="/shared" element={<SharedBoards />} />
          <Route path="/board/:id" element={<Board />} />
        </Routes>
      )}
    </div>
  );
};

export default MainPage;
