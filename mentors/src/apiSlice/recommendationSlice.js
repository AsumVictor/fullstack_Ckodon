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
    getRecommendations: builder.query({
      query: () => "/recommendations",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedRecommendations = responseData.map((recommendation) => {
          recommendation.id = recommendation._id;
          return recommendation;
        });
        return recommendationsAdapter.setAll(initialState, loadedRecommendations);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Recommendation", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Recommendation", id })),
          ];
        } else return [{ type: "Recommendation", id: "LIST" }];
      },
    }),

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
  useGetRecommendationsQuery,
  useGetSpecificRecommendationQuery,
  useGetRecommendationByUserQuery,
  useAddNewRecommendationMutation,
  useUpdateRecommendationMutation,
  
} = recommendationsApiSlice;

// returns the query result object
export const selectRecommendationsResult =
  recommendationsApiSlice.endpoints.getRecommendations.select();

// creates memoized selector
const selectRecommendationsData = createSelector(
  selectRecommendationsResult,
  (recommendationsResult) => recommendationsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllRecommendations,
  selectById: selectRecommendationById,
  selectIds: selectRecommendationIds,
  // Pass in a selector that returns the recommendations slice of state
} = recommendationsAdapter.getSelectors(
  (state) => selectRecommendationsData(state) ?? initialState
);
