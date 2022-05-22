import React from "react";
import Modal from "../../../components/Modal/Modal";

const CardDetails = ({ setOpen }) => {
  return (
    <Modal onClose={() => setOpen((prev) => setOpen(false))}>
      <div className="modal_body card-details">
        <h4>Update the newest IOS build</h4>
      </div>
    </Modal>
  );
};

export default CardDetails;
