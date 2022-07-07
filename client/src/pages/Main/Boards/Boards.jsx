import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useGetAllBoardsQuery } from "../../../app/features/boardsSlice";
import AddBoardTile from "./AddBoardTile";
import BoardTile from "./BoardTile";

const Boards = () => {
  // const { data: boards, isLoading } = useGetAllBoardsQuery();

  // if (isLoading) {
  //   return <h1>LOADING</h1>;
  // } else {
  //   console.log(boards);
  // }

  // if (!boards) {
  //   return <h6>Loading..</h6>;
  // }

  const { boards, favourites } = useSelector((state) => state.user);

  return (
    <div className="boards">
      {favourites.length > 0 && (
        <div className="boards_section">
          <h3 className="boards_section_heading">Favourite Boards</h3>
          <div className="boards_list">
            {boards.map((board) => {
              if (favourites.includes(board["_id"])) {
                return <BoardTile key={board["_id"]} board={board} />;
              }
            })}
          </div>
        </div>
      )}

      <div className="boards_section">
        <h3 className="boards_section_heading">Boards</h3>
        <div className="boards_list">
          <AddBoardTile />
          {boards.map((board) => {
            return <BoardTile key={board["_id"]} board={board} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Boards;
