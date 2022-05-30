import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "../../../components/Modal/Modal";
import { logout } from "../../../app/features/authSlice";

const Logout = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Modal onClose={() => setOpen((prev) => setOpen(false))}>
      <div className=" modal_body logout_modal ">
        <h4>Logout</h4>
        <p>
          Are you sure that you want to logout? ps: make sure that everything is
          saved.
        </p>
        <div className="modal_bottom">
          <a
            href="#"
            className="button"
            onClick={() => setOpen((prev) => setOpen(false))}
          >
            Close
          </a>
          <a className="button button_lighter" onClick={handleLogout}>
            Sure
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default Logout;
