import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const aidsAdapter = createEntityAdapter({
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

const initialState = aidsAdapter.getInitialState();

export const aidsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAids: builder.query({
      query: () => "/aids",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedAids = responseData.map((aid) => {
          aid.id = aid._id;
          return aid;
        });
        return aidsAdapter.setAll(initialState, loadedAids);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Aid", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Aid", id })),
          ];
        } else return [{ type: "Aid", id: "LIST" }];
      },
    }),

    getSpecificAid: builder.query({
      query: (id) => ({
        url: `/aids/id/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Aid", id: "LIST" }],
    }),

    getAidByUser: builder.query({
      query: (id) => ({
        url: `/aids/user/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Aid", id: "LIST" }],
    }),

    addNewAid: builder.mutation({
      query: (initialAidData) => ({
        url: "/aids",
        method: "POST",
        body: {
          ...initialAidData,
        },
      }),
      invalidatesTags: [{ type: "Aid", id: "LIST" }],
    }),

    updateAid: builder.mutation({
      query: (initialAidData) => ({
        url: "/aids",
        method: "PATCH",
        body: {
          ...initialAidData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Aid", id: arg.id }],
    }),
  }),
});

export const {
  useGetAidsQuery,
  useGetSpecificAidQuery,
  useGetAidByUserQuery,
  useAddNewAidMutation,
  useUpdateAidMutation,
  
} = aidsApiSlice;

// returns the query result object
export const selectAidsResult =
  aidsApiSlice.endpoints.getAids.select();

// creates memoized selector
const selectAidsData = createSelector(
  selectAidsResult,
  (aidsResult) => aidsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllAids,
  selectById: selectAidById,
  selectIds: selectAidIds,
  // Pass in a selector that returns the aids slice of state
} = aidsAdapter.getSelectors(
  (state) => selectAidsData(state) ?? initialState
);
