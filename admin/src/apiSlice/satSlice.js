import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";


export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "/sats",
          
    }),



    getSatByUser: builder.query({
      query: (id) => ({
        url: `/sats/${id}`,
        method: "GET",
      }),
    }),

    
  }),
});

export const {
  useGetReviewsQuery,
  useGetSatByUserQuery,

} = reviewsApiSlice;
