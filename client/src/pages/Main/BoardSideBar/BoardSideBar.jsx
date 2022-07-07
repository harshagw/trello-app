import React from "react";
import { useSelector, useDispatch } from "react-redux";

const BoardSideBar = () => {
  const { board } = useSelector((state) => state.board);
  const { data: user } = useSelector((state) => state.auth);

  return (
    <div className="board_sidebar">
      <div>
        {board.description.length > 0 && (
          <section>
            <h6>Description</h6>
            <p>{board.description}</p>
          </section>
        )}

        <section>
          <h6>Members</h6>
          <ul>
            {board.members.map((member) => {
              return (
                <li key={member._id}>
                  <p>
                    {member.name} {board.adminId == member._id && <span>(Admin)</span>}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <footer>{board.adminId != user?.user?._id && <button className="red">Leave</button>}</footer>
    </div>
  );
};

export default BoardSideBar;
