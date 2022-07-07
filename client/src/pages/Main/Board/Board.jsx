import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router";
import { initializeBoard, resetBoard } from "../../../app/features/boardSlice";
import BoardBar from "../BoardBar/BoardBar";
import List from "../List/List";
import { boardEmit } from "../../../app/features/boardSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import BoardSideBar from "../BoardSideBar/BoardSideBar";

const Board = () => {
  const { id } = useParams();
  const [openBoardSideBar, setBoardSideBar] = useState(false);
  const { id: boardID, isLoading, error, lists } = useSelector((state) => state.board);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("setting up the board", id);
    dispatch(initializeBoard(id));

    return () => {
      console.log("clearing the board page");
      dispatch(resetBoard());
    };
  }, []);

  if (isLoading) {
    return <div className="loading">Loading..</div>;
  }

  if (error) {
    console.log(error);
    return <Navigate to="/dashboard" replace />;
  }

  const handleDrag = async (result) => {
    console.log(result);

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type == "card") {
      dispatch(
        boardEmit({
          name: "card:reorder",
          data: {
            cardId: draggableId,
            destinationListId: destination.droppableId,
            sourceListId: source.droppableId,
            oldOrder: source.index,
            newOrder: destination.index,
          },
        })
      );
    } else if (type == "list") {
      dispatch(
        boardEmit({
          name: "list:reorder",
          data: {
            listId: draggableId,
            boardId: id,
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

  const toggleBoardSidebar = () => {
    setBoardSideBar((state) => !state);
  };
  return (
    <div className="board_layout">
      <BoardBar toggleBoardSidebar={toggleBoardSidebar} />
      <div className="body">
        <div className="lists">
          <DragDropContext onDragEnd={handleDrag}>
            <Droppable type="list" droppableId="board" direction="horizontal">
              {(provided) => {
                return (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="lists_droppable">
                    {lists.map((list) => {
                      return <List key={list._id} data={list} />;
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
          <div className="list add_list">
            <header onClick={addList}>Add a list</header>
          </div>
        </div>
        {openBoardSideBar && <BoardSideBar />}
      </div>
    </div>
  );
};

export default Board;
