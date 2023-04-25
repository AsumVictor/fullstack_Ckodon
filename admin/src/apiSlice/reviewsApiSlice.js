import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const reviewsAdapter = createEntityAdapter({
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

const initialState = reviewsAdapter.getInitialState();

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "/undergradeReviews",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedReviews = responseData.map((review) => {
          review.id = review._id;
          return review;
        });
        return reviewsAdapter.setAll(initialState, loadedReviews);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "UndergraduateReview", id: "LIST" },
            ...result.ids.map((id) => ({ type: "UndergraduateReview", id })),
          ];
        } else return [{ type: "UndergraduateReview", id: "LIST" }];
      },
    }),

    getSpecificReview: builder.query({
      query: (id) => ({
        url: `/undergradeReviews/id/${id}`,
        method: "GET",
      }),
      providesTags: ["ReviewByUser"],
    }),

    getReviewByUser: builder.query({
      query: (id) => ({
        url: `/undergradeReviews/user/${id}`,
        method: "GET",
      }),
      providesTags: ["ReviewByUser"],
    }),

    addNewReview: builder.mutation({
      query: (initialReviewData) => ({
        url: "/undergradeReviews",
        method: "POST",
        body: {
          ...initialReviewData,
        },
      }),
      invalidatesTags: [
        { type: "UndergraduateReview", id: "LIST" },
        { type: "ReviewByUser" },
      ],
    }),

    updateReview: builder.mutation({
      query: (initialReviewData) => ({
        url: "/undergradeReviews",
        method: "PATCH",
        body: {
          ...initialReviewData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "UndergraduateReview", id: arg.id },
        { type: "ReviewByUser" },
      ],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetSpecificReviewQuery,
  useGetReviewByUserQuery,
  useAddNewReviewMutation,
  useUpdateReviewMutation,
} = reviewsApiSlice;

// returns the query result object
export const selectReviewsResult =
  reviewsApiSlice.endpoints.getReviews.select();

// creates memoized selector
const selectReviewsData = createSelector(
  selectReviewsResult,
  (reviewsResult) => reviewsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllReviews,
  selectById: selectReviewById,
  selectIds: selectReviewIds,
  // Pass in a selector that returns the reviews slice of state
} = reviewsAdapter.getSelectors(
  (state) => selectReviewsData(state) ?? initialState
);
