import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const essaysAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    if (a.status === "unresolved" && b.status !== "unresolved") {
      return -1; // a comes first
    }
    if (a.status !== "unresolved" && b.status === "unresolved") {
      return 1; // b comes first
    }
    return 0; // no change in order
  },
});

const initialState = essaysAdapter.getInitialState();

export const essaysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getSpecificEssay: builder.query({
      query: (id) => ({
        url: `/essays/id/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Essay", id: "LIST" }],
    }),

    getEssayByUser: builder.query({
      query: (id) => ({
        url: `/essays/user/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Essay", id: "LIST" }],
    }),

    addNewEssay: builder.mutation({
      query: (initialEssayData) => ({
        url: "/essays",
        method: "POST",
        body: {
          ...initialEssayData,
        },
      }),
      invalidatesTags: [{ type: "Essay", id: "LIST" }],
    }),

    updateEssay: builder.mutation({
      query: (initialEssayData) => ({
        url: "/essays",
        method: "PATCH",
        body: {
          ...initialEssayData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Essay", id: arg.id }],
    }),
  }),
});

export const {
  
  useGetSpecificEssayQuery,
  useGetEssayByUserQuery,
  useAddNewEssayMutation,
  useUpdateEssayMutation,
  
} = essaysApiSlice;

// returns the query result object
export const selectEssaysResult =
  essaysApiSlice.endpoints.getEssays.select();

// creates memoized selector
const selectEssaysData = createSelector(
  selectEssaysResult,
  (essaysResult) => essaysResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllEssays,
  selectById: selectEssayById,
  selectIds: selectEssayIds,
  // Pass in a selector that returns the essays slice of state
} = essaysAdapter.getSelectors(
  (state) => selectEssaysData(state) ?? initialState
);
