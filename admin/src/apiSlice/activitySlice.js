import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const activitiesAdapter = createEntityAdapter({
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

const initialState = activitiesAdapter.getInitialState();

export const activitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => "/activities",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedActivities = responseData.map((activity) => {
          activity.id = activity._id;
          return activity;
        });
        return activitiesAdapter.setAll(initialState, loadedActivities);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Activity", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Activity", id })),
          ];
        } else return [{ type: "Activity", id: "LIST" }];
      },
    }),

    getSpecificActivity: builder.query({
      query: (id) => ({
        url: `/activities/id/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Activity", id: "LIST" }],
    }),

    getActivityByUser: builder.query({
      query: (id) => ({
        url: `/activities/user/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Activity", id: "LIST" }],
    }),

    addNewActivity: builder.mutation({
      query: (initialActivityData) => ({
        url: "/activities",
        method: "POST",
        body: {
          ...initialActivityData,
        },
      }),
      invalidatesTags: [{ type: "Activity", id: "LIST" }],
    }),

    updateActivity: builder.mutation({
      query: (initialActivityData) => ({
        url: "/activities",
        method: "PATCH",
        body: {
          ...initialActivityData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Activity", id: arg.id }],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetSpecificActivityQuery,
  useGetActivityByUserQuery,
  useAddNewActivityMutation,
  useUpdateActivityMutation,
  
} = activitiesApiSlice;

// returns the query result object
export const selectActivitiesResult =
  activitiesApiSlice.endpoints.getActivities.select();

// creates memoized selector
const selectActivitiesData = createSelector(
  selectActivitiesResult,
  (activitiesResult) => activitiesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllActivities,
  selectById: selectActivityById,
  selectIds: selectActivityIds,
  // Pass in a selector that returns the activities slice of state
} = activitiesAdapter.getSelectors(
  (state) => selectActivitiesData(state) ?? initialState
);
