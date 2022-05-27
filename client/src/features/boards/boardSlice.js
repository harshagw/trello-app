import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Mutex } from "async-mutex";
import { logout, changeAccessToken } from "../auth/authSlice";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders: (headers, { getState }) => {
    console.log("running base query");

    const {
      auth: {
        data: { accessToken },
      },
    } = getState();

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const customFetchBase = async (args, api, extraOptions) => {
  console.log("running custom fetch base");
  await mutex.waitForUnlock();

  // console.log(api.getState()); // returns the full state

  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result?.error?.status === 403 || result?.meta?.response.status === 403) {
    // if (result.meta.response.status === 403) {
    console.log("getting 403 error");

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { credentials: "include", url: "auth/refresh" },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(changeAccessToken(refreshResult.data.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const boardSlice = createApi({
  reducerPath: "boardSlice",

  baseQuery: customFetchBase,

  tagTypes: ["boards"],

  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: () => "/boards/",
      transformResponse: (res) => res.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Board", id })),
              { type: "Board", id: "LIST" },
            ]
          : [{ type: "Board", id: "LIST" }],
    }),
    getBoard: builder.query({
      query: (id) => `/boards/${id}`,
      transformResponse: (res) => res.data,
      providesTags: (result, error, id) => [{ type: "Board", id }],
    }),
    addBoard: builder.mutation({
      query: (name) => ({
        url: `/boards/`,
        method: "POST",
        body: { name: name },
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
    deleteBoard: builder.mutation({
      query(id) {
        return {
          url: `/boards/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Board", id }],
    }),
    updateBoard: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          boardSlice.util.updateQueryData("getBoard", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Board", id }],
    }),
  }),
});

export const { useGetAllBoardsQuery, useGetBoardQuery, useAddBoardMutation } =
  boardSlice;
