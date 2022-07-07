import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Modal from "@mui/material/Modal";
import { userEmit } from "../../../app/features/userSlice";

const schema = yup
  .object({
    email: yup.string().email("This should be valid email address.").required("Email is Required."),
  })
  .required();

const Invite = ({ data, open, handleClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const members = data.members.map((member) => member.email);

  const handleInvite = (newData) => {
    console.log("inviting ");
    console.log(newData);

    console.log(members);

    if (members.includes(newData.email)) {
      setError("email", { type: "custom", message: "User is already a member.", shouldFocus: true });
      return;
    }

    console.log(newData.email);

    dispatch(
      userEmit({
        name: "user:addInvite",
        data: {
          boardId: data._id,
          from: data.adminId,
          to: newData.email,
        },
      })
    );

    resetField();

    handleClose();
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
          <h1 className="modal_heading">Invite Members</h1>
        </div>
        <div className="modal_body">
          <div className="input">
            <input type="text" {...register("email")} placeholder="Email" />
          </div>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="modal_footer">
          <div></div>
          <div className="action_buttons">
            <button onClick={handleClose}>Close</button>
            <button onClick={handleSubmit(handleInvite)} className="blue">
              Invite
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Invite;
