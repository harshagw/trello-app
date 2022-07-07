import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { declineInvite, userEmit } from "../../../app/features/userSlice";

const InvitationTile = ({ invite }) => {
  const bgcolor = "gray";
  const by = "Harsh Agarwal";

  const dispatch = useDispatch();

  const handleDecline = () => {
    dispatch(
      userEmit({
        name: "user:declineInvite",
        data: invite._id,
      })
    );

    dispatch(declineInvite(invite._id));
  };

  const handleAccept = () => {
    dispatch(
      userEmit({
        name: "user:acceptInvite",
        data: invite._id,
      })
    );

    dispatch(declineInvite(invite._id));
  };

  return (
    <div className="board_tile shared_board_tile" style={{ backgroundColor: `var(--${bgcolor}-2)` }}>
      <h5>{invite.board.name}</h5>
      <div className="actions">
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

export default InvitationTile;
