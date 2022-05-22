import React, { useState } from "react";
import "./board.scss";
import List from "./List";
import BoardDetailsSidebar from "./BoardDetailsSidebar/BoardDetailsSidebar";
import { AnimatePresence } from "framer-motion";
import CardDetails from "./CardDetails";

const BoardPage = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [cardDetailsOpen, setCardDetailsOpen] = useState(false);

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
              <h5>Open House Plans</h5>
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
