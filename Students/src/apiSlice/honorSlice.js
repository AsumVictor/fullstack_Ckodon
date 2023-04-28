import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const honorsAdapter = createEntityAdapter({
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

const initialState = honorsAdapter.getInitialState();

export const honorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getSpecificHonor: builder.query({
      query: (id) => ({
        url: `/honors/id/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Honor", id: "LIST" },{ type: "Review", id: "LIST" }],
    }),

    getHonorByUser: builder.query({
      query: (id) => ({
        url: `/honors/user/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Honor", id: "LIST" },{ type: "Review", id: "LIST" }],
    }),

    addNewHonor: builder.mutation({
      query: (initialHonorData) => ({
        url: "/honors",
        method: "POST",
        body: {
          ...initialHonorData,
        },
      }),
      invalidatesTags: [{ type: "Honor", id: "LIST" },{ type: "Review", id: "LIST" }],
    }),

    updateHonor: builder.mutation({
      query: (initialHonorData) => ({
        url: "/honors",
        method: "PATCH",
        body: {
          ...initialHonorData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Honor", id: arg.id },{ type: "Review", id: "LIST" }],
    }),
  }),
});

export const {
  
  useGetSpecificHonorQuery,
  useGetHonorByUserQuery,
  useAddNewHonorMutation,
  useUpdateHonorMutation,
  
} = honorsApiSlice;

// returns the query result object
export const selectHonorsResult =
  honorsApiSlice.endpoints.getHonors.select();

// creates memoized selector
const selectHonorsData = createSelector(
  selectHonorsResult,
  (honorsResult) => honorsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllHonors,
  selectById: selectHonorById,
  selectIds: selectHonorIds,
  // Pass in a selector that returns the honors slice of state
} = honorsAdapter.getSelectors(
  (state) => selectHonorsData(state) ?? initialState
);
