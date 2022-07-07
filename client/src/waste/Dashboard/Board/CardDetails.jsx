import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { boardEmit } from "../../../app/features/boardSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AiOutlineClose } from "react-icons/ai";
import Modal from "@mui/material/Modal";

const schema = yup
  .object({
    title: yup.string().required("Title is Required."),
    description: yup.string(),
  })
  .required();

const CardDetails = ({ data, open, handleClose }) => {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: data.title,
      description: data.description,
    },
  });

  const dispatch = useDispatch();

  const handleDeleteCard = () => {
    dispatch(boardEmit({ name: "card:delete", data: { _id: data._id } }));
    handleClose();
  };

  const handleCardSave = (newData) => {
    const newUpdates = {
      title: newData.title,
      description: newData.description,
    };

    dispatch(
      boardEmit({
        name: "card:update",
        data: { listId: data.listId, cardId: data._id, updates: newUpdates },
      })
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal_container card_details">
        <div className="modal_body">
          <div className="input">
            <input type="text" {...register("title")} />
          </div>
          <div className="input">
            <label>Description</label>
            <textarea {...register("description")}></textarea>
          </div>
        </div>
        <div className="modal_footer">
          <button onClick={handleDeleteCard}>Delete</button>
          <div className="action_buttons">
            <button onClick={handleClose}>Close</button>
            <button onClick={handleSubmit(handleCardSave)} className="blue">
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardDetails;
