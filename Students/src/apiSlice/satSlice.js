import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";


export const activitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getBySatUser: builder.query({
      query: (id) => ({
        url: `/sats/${id}`,
        method: "GET",
      }),
      providesTags:['Sat'],
    }),

    addNewSat: builder.mutation({
      query: (initialData) => ({
        url: "/sats",
        method: "POST",
        body: {
          ...initialData,
        },
      }),
      invalidatesTags: ['Sat'],
    }),

    updateSat: builder.mutation({
      query: (initialData) => ({
        url: "/sat",
        method: "PATCH",
        body: {
          ...initialData,
        },
      }),
      invalidatesTags: ['Sat',],
    }),
  }),
});

export const {
  
  useAddNewSatMutation,
  useGetBySatUserQuery,
  useUpdateSatMutation,
  
} = activitiesApiSlice;

