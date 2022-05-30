import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./board.scss";
import List from "./List";
import BoardDetailsSidebar from "./BoardDetailsSidebar/BoardDetailsSidebar";
import { AnimatePresence } from "framer-motion";
import CardDetails from "./CardDetails";
import { Navigate, useParams } from "react-router";
import {
  boardEmit,
  initializeBoard,
  resetBoard,
} from "../../../app/features/boardSlice";
import AddList from "./AddList";

const BoardPage = () => {
  const { id } = useParams();

  const { board, lists, isLoading, error } = useSelector(
    (state) => state.board
  );

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [cardDetailsOpen, setCardDetailsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBoard(id));

    return () => {
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
              <button
                onClick={() =>
                  dispatch(
                    boardEmit({
                      name: "list:add",
                      data: {
                        name: "New List",
                      },
                    })
                  )
                }
              >
                Create list
              </button>
              <p onClick={() => setSidebarIsOpen((prev) => !prev)}>
                {sidebarIsOpen ? "Hide Menu" : "Show Menu"}
              </p>
            </div>
          </div>

          <div className="board_lists">
            {lists.length == 0 ? (
              <p>It has not lists.</p>
            ) : (
              lists.map((list) => {
                return (
                  <List
                    key={list._id}
                    data={list}
                    setCardDetailsOpen={setCardDetailsOpen}
                  />
                );
              })
            )}
            {/* <AddList /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardPage;
