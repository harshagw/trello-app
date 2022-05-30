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
    resetBoard: (state) => {
      state.id = null;
      state.board = null;
      state.lists = [];
      state.error = null;
      state.isLoading = true;
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(
        (list) => list._id != action.payload._id
      );
    },
    renameList: (state, action) => {
      state.lists = state.lists.map((list) => {
        if (list._id == action.payload._id) {
          list.name = action.payload.newName;
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
  boardEmit,
  addList,
  deleteList,
  renameList,
} = boardSlice.actions;
export default boardSlice.reducer;
