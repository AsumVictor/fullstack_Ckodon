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


export const activitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getSpecificActivity: builder.query({
      query: (id) => ({
        url: `/activities/id/${id}`,
        method: "GET",
      }),
      providesTags:['SpecificActivity'],
    }),

    getActivityByUser: builder.query({
      query: (id) => ({
        url: `/activities/user/${id}`,
        method: "GET",
      }),
      providesTags:['UserActivity'],
    }),

    addNewActivity: builder.mutation({
      query: (initialActivityData) => ({
        url: "/activities",
        method: "POST",
        body: {
          ...initialActivityData,
        },
      }),
      invalidatesTags: ['SpecificActivity','UserActivity'],
    }),

    updateActivity: builder.mutation({
      query: (initialActivityData) => ({
        url: "/activities",
        method: "PATCH",
        body: {
          ...initialActivityData,
        },
      }),
      invalidatesTags: ['SpecificActivity','UserActivity'],
    }),
  }),
});

export const {
  
  useGetSpecificActivityQuery,
  useGetActivityByUserQuery,
  useAddNewActivityMutation,
  useUpdateActivityMutation,
  
} = activitiesApiSlice;

