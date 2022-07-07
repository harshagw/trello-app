import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { boardEmit } from "../../../app/features/boardSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AiOutlineClose } from "react-icons/ai";
import Modal from "@mui/material/Modal";

const schema = yup
  .object({
    name: yup.string().required("Board Name is Required."),
    description: yup.string(),
  })
  .required();

const BoardDetails = ({ data, open, handleClose }) => {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteCard = () => {
    dispatch(boardEmit({ name: "board:delete", data: { _id: data._id } }));
    handleClose();
  };

  const handleBoardSave = (newData) => {
    const newUpdates = {
      name: newData.name,
      description: newData.description,
    };

    dispatch(
      boardEmit({
        name: "board:update",
        data: newUpdates,
      })
    );

    handleClose();
  };

  const handleBoardDelete = (newData) => {
    dispatch(
      boardEmit({
        name: "board:delete",
      })
    );

    handleClose();

    navigate("../../dashboard");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal_container">
        <div className="modal_header">
          <h1 className="modal_heading">Board Settings</h1>
        </div>
        <div className="modal_body">
          <div className="input">
            <label>Title</label>
            <input type="text" {...register("name")} />
          </div>
          <div className="input">
            <label>Description</label>
            <textarea {...register("description")}></textarea>
          </div>
        </div>
        <div className="modal_footer">
          <button onClick={handleBoardDelete}>Delete</button>
          <div className="action_buttons">
            <button onClick={handleClose}>Close</button>
            <button onClick={handleSubmit(handleBoardSave)} className="blue">
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BoardDetails;
