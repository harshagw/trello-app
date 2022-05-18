import React from 'react'
import { motion } from "framer-motion";

const Sidebar = () => {
  const slide = {
    hidden: {
        width: "0",
    },

    visible: {
        width: "400px",
    },

    exit:{
        width: 0,
        transition: {duration: 0.3 }
    }
    
};

  return (
    <motion.div 
      onClick={(e) => e.stopPropagation()} 
      variants={slide}
      initial="hidden"
      animate="visible"
      exit="exit"
      className='board_sidebar'>
        <div className='sidebar_section'>
          <h5>Members</h5>
        </div>
    </motion.div>
  )
}

export default Sidebar;