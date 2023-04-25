import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const undergraduateApplicantsAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    if (
      a.applicationStatus === "pending" &&
      b.applicationStatus !== "pending"
    ) {
      return -1;
    } else if (
      a.applicationStatus !== "pending" &&
      b.applicationStatus === "pending"
    ) {
      return 1;
    } else {
      return 0;
    }
  },
});

const initialState = undergraduateApplicantsAdapter.getInitialState();

export const undergraduateApplicantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUndergraduateApplicants: builder.query({
      query: () => "/undergraduteApplicants",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedUndergraduateApplicants = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return undergraduateApplicantsAdapter.setAll(
          initialState,
          loadedUndergraduateApplicants
        );
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "UndergraduateApplicant", id: "LIST" },
            ...result.ids.map((id) => ({ type: "UndergraduateApplicant", id })),
          ];
        } else return [{ type: "UndergraduateApplicant", id: "LIST" }];
      },
    }),
    addNewUndergraduateApplicant: builder.mutation({
      query: (initialUserData) => ({
        url: "/undergraduteApplicants",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "UndergraduateApplicant", id: "LIST" }],
    }),
    updateUndergraduateApplicant: builder.mutation({
      query: (initialUserData) => ({
        url: "/undergraduteApplicants",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "UndergraduateApplicant", id: arg.id },
      ],
    }),
    deleteUndergraduateApplicant: builder.mutation({
      query: ({ id }) => ({
        url: `/undergraduteApplicants`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "UndergraduateApplicant", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetUndergraduateApplicantsQuery,
  useAddNewUndergraduateApplicantMutation,
  useUpdateUndergraduateApplicantMutation,
  useDeleteUndergraduateApplicantMutation,
} = undergraduateApplicantsApiSlice;

// returns the query result object
export const selectUndergraduateApplicantsResult =
  undergraduateApplicantsApiSlice.endpoints.getUndergraduateApplicants.select();

// creates memoized selector
const selectUndergraduateApplicantsData = createSelector(
  selectUndergraduateApplicantsResult,
  (undergraduateApplicantsResult) => undergraduateApplicantsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUndergraduateApplicants,
  selectById: selectUndergraduateApplicantById,
  selectIds: selectUndergraduateApplicantIds,
  // Pass in a selector that returns the undergraduateApplicants slice of state
} = undergraduateApplicantsAdapter.getSelectors(
  (state) => selectUndergraduateApplicantsData(state) ?? initialState
);
