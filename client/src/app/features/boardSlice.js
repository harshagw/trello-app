import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  board: null,
  lists: [],
  isLoading: true,
  error: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    initializeBoard: (state, action) => {
      state.id = action.payload;
    },
    boardEmit: (state, action) => {},
    setBoard: (state, action) => {
      state.board = action.payload.board;
      state.lists = action.payload.lists;
      state.isLoading = false;
    },
    updateBoard: (state, action) => {
      console.log(action.payload);
      state.board = action.payload;
    },
    setError: (state) => {
      state.isLoading = false;
      state.error = "Connect error from server";
    },
    resetBoard: (state) => {
      console.log("reseting the board");
      state.id = null;
      state.board = null;
      state.lists = [];
      state.error = "";
      state.isLoading = true;
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter((list) => list._id != action.payload._id);
    },
    renameList: (state, action) => {
      state.lists = state.lists.map((list) => {
        if (list._id == action.payload._id) {
          list.name = action.payload.newName;
        }

        return list;
      });
    },
    reorderList: (state, action) => {
      state.lists = action.payload;
    },
    addCard: (state, action) => {
      state.lists = state.lists.map((list) => {
        if (list._id == action.payload.listId) {
          list.cards.push(action.payload);
        }

        return list;
      });
    },
    updateCard: (state, action) => {
      state.lists = state.lists.map((list) => {
        if (list._id == action.payload.listId) {
          list.cards = list.cards.map((card) => {
            if (card._id == action.payload._id) {
              return action.payload;
            }
            return card;
          });
        }

        return list;
      });
    },
    deleteCard: (state, action) => {
      state.lists = state.lists.map((list) => {
        if (list._id == action.payload.listId) {
          list.cards = list.cards.filter((card) => card._id != action.payload._id);
        }

        return list;
      });
    },
    reorderCards: (state, action) => {
      state.lists = state.lists.map((list) => {
        if (list._id == action.payload._id) {
          list.cards = action.payload.cards;
        }

        return list;
      });
    },
  },
});

export const {
  initializeBoard,
  setBoard,
  resetBoard,
  setError,
  boardEmit,
  addList,
  deleteList,
  renameList,
  addCard,
  updateCard,
  reorderList,
  updateBoard,
  deleteCard,
  reorderCards,
} = boardSlice.actions;
export default boardSlice.reducer;
