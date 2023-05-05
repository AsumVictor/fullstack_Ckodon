import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";



export const recommendationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getSpecificRecommendation: builder.query({
      query: (id) => ({
        url: `/recommendations/id/${id}`,
        method: "GET",
      }),
      providesTags: ['SpecificRecommendation'],
    }),

    getRecommendationByUser: builder.query({
      query: (id) => ({
        url: `/recommendations/user/${id}`,
        method: "GET",
      }),
      providesTags: ['UserRecommendation'],

    }),

    addNewRecommendation: builder.mutation({
      query: (initialRecommendationData) => ({
        url: "/recommendations",
        method: "POST",
        body: {
          ...initialRecommendationData,
        },
      }),
      invalidatesTags: ['UserRecommendation','SpecificRecommendation'],
    }),

    updateRecommendation: builder.mutation({
      query: (initialRecommendationData) => ({
        url: "/recommendations",
        method: "PATCH",
        body: {
          ...initialRecommendationData,
        },
      }),
      invalidatesTags: ['UserRecommendation','SpecificRecommendation'],
    }),
  }),
});

export const {
  
  useGetSpecificRecommendationQuery,
  useGetRecommendationByUserQuery,
  useAddNewRecommendationMutation,
  useUpdateRecommendationMutation,
} = recommendationsApiSlice;
