import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";


export const aidsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getSpecificAid: builder.query({
      query: (id) => ({
        url: `/aids/id/${id}`,
        method: "GET",
      }),
      providesTags: ['SpecificAid'],
    }),

    getAidByUser: builder.query({
      query: (id) => ({
        url: `/aids/user/${id}`,
        method: "GET",
      }),
      providesTags: ['UserAid'],
    }),

    addNewAid: builder.mutation({
      query: (initialAidData) => ({
        url: "/aids",
        method: "POST",
        body: {
          ...initialAidData,
        },
      }),
      invalidatesTags: ['UserAid', 'SpecificAid'],
    }),

    updateAid: builder.mutation({
      query: (initialAidData) => ({
        url: "/aids",
        method: "PATCH",
        body: {
          ...initialAidData,
        },
      }),
      invalidatesTags:['UserAid', 'SpecificAid'],
    }),
  }),
});

export const {
  useGetAidsQuery,
  useGetSpecificAidQuery,
  useGetAidByUserQuery,
  useAddNewAidMutation,
  useUpdateAidMutation,
  
} = aidsApiSlice;
