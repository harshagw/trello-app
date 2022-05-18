import React, { useState } from "react";
import "./board.scss";
import List from "./List";
import Sidebar from "./Sidebar";
import { AnimatePresence } from "framer-motion";
import CardDetails from "./CardDetails";

const BoardPage = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <CardDetails open={modalOpen} setOpen={setModalOpen} />}
      </AnimatePresence>

      <div className="board">
        <div className="board_header">
          <div className="board_headers_left">
            <h1>Open House Plans</h1>
          </div>
          <div className="board_headers_right">
            <h2 onClick={() => setSidebarIsOpen((prev) => !prev)}>
              {sidebarIsOpen ? "Hide Menu" : "Show Menu"}
            </h2>
          </div>
        </div>

        <div className="board_body">
          <div className="board_lists">
            <List />
            <List />
            <List />
            <List />
            <List />
            <List />
          </div>

          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => null}
          >
            {sidebarIsOpen && <Sidebar />}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default BoardPage;
