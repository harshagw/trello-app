import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BoardTile from "./BoardTile";
import InvitationTile from "./InvitationTile";

const SharedBoards = () => {
  const { boards, invitations } = useSelector((state) => state.user);
  const { data: user } = useSelector((state) => state.auth);

  let sharedBoards = boards.map((board) => {
    if (board.adminId != user?.user?._id) return <BoardTile key={board["_id"]} board={board} />;
  });

  return (
    <div className="boards">
      {sharedBoards.length > 0 ? (
        <div className="boards_section">
          <h3 className="boards_section_heading">Shared Boards</h3>
          <div className="boards_list">{sharedBoards}</div>
        </div>
      ) : (
        <div className="boards_section">
          <h3 className="boards_section_heading">No Shared Boards</h3>
        </div>
      )}

      {invitations.length > 0 && (
        <div className="boards_section">
          <h3 className="boards_section_heading">Invitations</h3>
          <div className="boards_list">
            {invitations.map((invite) => {
              return <InvitationTile key={invite["_id"]} invite={invite} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedBoards;
