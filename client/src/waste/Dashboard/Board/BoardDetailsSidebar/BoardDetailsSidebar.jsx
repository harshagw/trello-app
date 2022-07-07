import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./sidebar.scss";
import { FewActivities } from "./Activities";
import { FewMembers } from "./Members";
import DetailSidebar from "./DetailSidebar";

const BoardDetailsSidebar = () => {
  const [detailSidebarIsOpen, setDetailSidebarIsOpen] = useState(false);

  const slide = {
    hidden: {
      width: "0",
    },

    visible: {
      width: "300px",
    },

    exit: {
      width: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="board_main_sidebar">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={slide}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="board_sidebar"
      >
        <div className="sidebar_section description">
          <div className="sidebar_section_header">
            <h6>General</h6>
            <p onClick={() => setDetailSidebarIsOpen(true)}>Edit</p>
          </div>
          <div className="sidebar_section_body">
            <h6>Open House Plans</h6>
            <p>
              It helps us to take design decision. Everybody has to maintain
              their own list and update the cards daily according to the
              progress.
            </p>
          </div>
        </div>
        <FewMembers />
        <FewActivities />
        <div className="sidebar_section settings">
          <div className="sidebar_section_header">
            <h6>Settings</h6>
          </div>
          <div className="sidebar_section_body">
            <p>
              Do you want to leave this board ? <a href="#">Click this</a>
            </p>
            <p>
              Do you want to permanently delete this board ?{" "}
              <a href="#">Click this</a>
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {detailSidebarIsOpen && (
          <DetailSidebar setOpen={setDetailSidebarIsOpen} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoardDetailsSidebar;
