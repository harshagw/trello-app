import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

import "./board.scss";
import List from "./List";
import BoardDetailsSidebar from "./BoardDetailsSidebar/BoardDetailsSidebar";
import { AnimatePresence } from "framer-motion";
import CardDetails from "./CardDetails";
import { Navigate, useParams } from "react-router";
import { useGetBoardQuery } from "../../../features/boards/boardSlice";

const BoardPage = () => {
  const { id } = useParams();
  const { data: board, isLoading, error } = useGetBoardQuery(id);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [cardDetailsOpen, setCardDetailsOpen] = useState(false);

  const { data: auth } = useSelector((state) => state.auth);

  useEffect(() => {
    const socket = io.connect("http://localhost:3001/board", {
      extraHeaders: { Authorization: `Bearer ${auth?.accessToken}` },
      query: { boardId: id },
      // extraHeaders: { Authorization: `Bearer fsdflakd` },
      reconnection: false,
    });

    socket.on("connect_error", (err) => {
      console.log("The server sent the connect_error - ", err.message);
    });

    socket.on("connect", () => {
      console.log("connection established - ", socket.id);
    });

    // socket.emit("subscribe-board", { boardId: id });

    return () => {
      console.log("disconnecting from server");
      socket.disconnect();
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="board">
        <div className="board_body">
          <h6>Loading...</h6>
        </div>
      </div>
    );
  }
  if (error) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {cardDetailsOpen && <CardDetails setOpen={setCardDetailsOpen} />}
      </AnimatePresence>

      <div className="board">
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {sidebarIsOpen && <BoardDetailsSidebar />}
        </AnimatePresence>

        <div className="board_body">
          <div className="board_header">
            <div className="board_headers_left">
              <h5>{board["name"]}</h5>
            </div>
            <div className="board_headers_right">
              <p onClick={() => setSidebarIsOpen((prev) => !prev)}>
                {sidebarIsOpen ? "Hide Menu" : "Show Menu"}
              </p>
            </div>
          </div>

          <div className="board_lists">
            <List setCardDetailsOpen={setCardDetailsOpen} />
            <List setCardDetailsOpen={setCardDetailsOpen} />
            <List setCardDetailsOpen={setCardDetailsOpen} />
            <List setCardDetailsOpen={setCardDetailsOpen} />
            <List setCardDetailsOpen={setCardDetailsOpen} />
            <List setCardDetailsOpen={setCardDetailsOpen} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardPage;
