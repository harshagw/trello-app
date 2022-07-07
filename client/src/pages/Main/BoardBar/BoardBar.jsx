import React, { useState } from "react";
import { AiOutlineSetting, AiOutlineLayout } from "react-icons/ai";

import { useSelector } from "react-redux";
import BoardDetails from "./BoardDetails";
import Favourite from "./Favourite";
import Invite from "./Invite";

const BoardBar = ({ toggleBoardSidebar }) => {
  const { board } = useSelector((state) => state.board);
  const { data: user } = useSelector((state) => state.auth);

  const [openBoardDetails, setBoardDetails] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);

  return (
    <>
      <BoardDetails open={openBoardDetails} handleClose={() => setBoardDetails(false)} data={board} />
      <Invite open={openInvite} handleClose={() => setOpenInvite(false)} data={board} />

      <div className="navbar board_bar">
        <div>
          <h4>{board.name}</h4>
          <Favourite boardId={board._id} />
        </div>

        <div>
          {board.adminId == user?.user?._id && (
            <>
              <button onClick={() => setOpenInvite(true)}>Invite</button>
              <AiOutlineSetting onClick={() => setBoardDetails(true)} />
            </>
          )}

          <AiOutlineLayout onClick={toggleBoardSidebar} />
        </div>
      </div>
    </>
  );
};

export default BoardBar;
