import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { BsChevronUp, BsChevronDown, BsBell, BsGear, BsPencil } from "react-icons/bs";
import "./board.scss";
import List from "./List";
import BoardDetailsSidebar from "./BoardDetailsSidebar/BoardDetailsSidebar";
import { AnimatePresence } from "framer-motion";
import { boardEmit } from "../../../app/features/boardSlice";
import BoardDetails from "./BoardDetail";

const Board = () => {
  const { board, lists } = useSelector((state) => state.board);

  const [showOverview, setShowOverview] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [cardDetailsOpen, setCardDetailsOpen] = useState(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toogleSideBar = () => {
    setSidebarIsOpen((state) => !state);
  };

  const toogleOverview = () => {
    setShowOverview((state) => !state);
  };

  const handleDrag = async (result) => {
    console.log(result);
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (destination.droppableId == source.droppableId) {
      dispatch(
        boardEmit({
          name: "card:reorder",
          data: {
            cardId: draggableId,
            listId: source.droppableId,
            oldOrder: source.index,
            newOrder: destination.index,
          },
        })
      );
    }
  };

  const addList = () => {
    dispatch(
      boardEmit({
        name: "list:add",
        data: {
          name: "New List",
        },
      })
    );
  };

  return (
    <>
      <BoardDetails open={open} handleClose={handleClose} data={board} />

      <div className="board">
        <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
          {sidebarIsOpen && <BoardDetailsSidebar />}
        </AnimatePresence>

        <div className="board_body">
          <div className="board_header">
            <h3>{board.name}</h3>
            <div className="board_header_right">
              {/* <div className="name_avatars">
                <div className="name_avatar">
                  <span>HA</span>
                </div>
                <div className="name_avatar">
                  <span>+4</span>
                </div>
              </div>

              <button className="icon_button" onClick={toogleOverview}>
                <BsGear />
              </button>
              <button className="icon_button" onClick={toogleOverview}>
                <BsBell />
              </button> */}
              <button className="icon_button" onClick={handleOpen}>
                <BsPencil />
              </button>
              <button className="icon_button" onClick={toogleOverview}>
                {showOverview ? <BsChevronUp /> : <BsChevronDown />}
              </button>
            </div>
          </div>

          {showOverview && <div className="board_overview">{board.description}</div>}

          <div className="board_lists">
            <DragDropContext onDragEnd={handleDrag}>
              {lists.map((list) => {
                return <List key={list._id} data={list} />;
              })}
            </DragDropContext>

            <div className="board_list add_list" onClick={addList}>
              <h6>Add a list</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
