import React from "react";
import { motion } from "framer-motion";
import "./sidebar.scss";
import Activities, { FewActivities } from "./Activities";
import Members, { FewMembers } from "./Members";

const DetailSidebar = ({ setOpen, type }) => {
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
    <motion.div
      onClick={(e) => e.stopPropagation()}
      variants={slide}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="details_sidebar"
    >
      <div className="details_sidebar_header">
        <h6>Activites</h6>
        <p onClick={() => setOpen(false)}>Back</p>
      </div>
      <div className="details_sidebar_body">
        {type == "activities" && <Activities />}
        <Members />
      </div>
    </motion.div>
  );
};

export default DetailSidebar;
