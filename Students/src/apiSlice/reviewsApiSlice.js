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
   
    getSpecificReview: builder.query({
      query: (id) => ({
        url: `/undergradeReviews/id/${id}`,
        method: "GET",
      }),
      providesTags: ["SpecficReview"],
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
        'SpecficReview',
        'ReviewByUser'
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
      invalidatesTags: [
        'SpecficReview',
        'ReviewByUser'
      ],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/undergradeReviews/${id}`,
        method: "DELETE",
              }),
      invalidatesTags: [
        'SpecficReview',
        'ReviewByUser',
      ],
    }),
  }),
});

export const {
  useGetSpecificReviewQuery,
  useGetReviewByUserQuery,
  useAddNewReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} = reviewsApiSlice;

