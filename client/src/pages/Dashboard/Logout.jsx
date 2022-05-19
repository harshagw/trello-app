import React from "react";
import Modal from "../../components/Modal/Modal";

const Logout = ({ open, setOpen }) => {
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
          <a href="/" className="button button_lighter">
            Sure
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default Logout;
