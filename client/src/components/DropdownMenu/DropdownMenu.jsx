import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./dropdownmenu.scss";

const DropdownMenu = ({ children, menuItem }) => {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover((prev) => !prev);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.3,
        delay: 0.1,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="menu-item"
        onHoverStart={toggleHoverMenu}
        onHoverEnd={toggleHoverMenu}
      >
        {menuItem}
        <motion.div
          className="sub-menu"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DropdownMenu;
