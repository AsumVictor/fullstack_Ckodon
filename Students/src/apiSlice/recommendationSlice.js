import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const recommendationsAdapter = createEntityAdapter({
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

const initialState = recommendationsAdapter.getInitialState();

export const recommendationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getSpecificRecommendation: builder.query({
      query: (id) => ({
        url: `/recommendations/id/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Recommendation", id: "LIST" }],
    }),

    getRecommendationByUser: builder.query({
      query: (id) => ({
        url: `/recommendations/user/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Recommendation", id: "LIST" }],
    }),

    addNewRecommendation: builder.mutation({
      query: (initialRecommendationData) => ({
        url: "/recommendations",
        method: "POST",
        body: {
          ...initialRecommendationData,
        },
      }),
      invalidatesTags: [{ type: "Recommendation", id: "LIST" }],
    }),

    updateRecommendation: builder.mutation({
      query: (initialRecommendationData) => ({
        url: "/recommendations",
        method: "PATCH",
        body: {
          ...initialRecommendationData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Recommendation", id: arg.id }],
    }),
  }),
});

export const {
  
  useGetSpecificRecommendationQuery,
  useGetRecommendationByUserQuery,
  useAddNewRecommendationMutation,
  useUpdateRecommendationMutation,
} = recommendationsApiSlice;
