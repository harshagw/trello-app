import React, { useEffect, Fragment } from "react";
import Modal from "@mui/material/Modal";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../app/features/authSlice";

const Logout = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClose = () => {
    setOpen(() => false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="confirmation_container">
        <p className="heading">Do you want to logout?</p>
        <p className="subheading"></p>
        <footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={handleLogout} className="blue">
            Logout
          </button>
        </footer>
      </div>
    </Modal>
  );
};

export default Logout;
