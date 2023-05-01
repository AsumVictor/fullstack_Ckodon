import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";



export const honorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getSpecificHonor: builder.query({
      query: (id) => ({
        url: `/honors/id/${id}`,
        method: "GET",
      }),
      providesTags: ['SpecificHonor'],
    }),

    getHonorByUser: builder.query({
      query: (id) => ({
        url: `/honors/user/${id}`,
        method: "GET",
      }),
      providesTags: ['UserHonor'],    }),

    addNewHonor: builder.mutation({
      query: (initialHonorData) => ({
        url: "/honors",
        method: "POST",
        body: {
          ...initialHonorData,
        },
      }),
      invalidatesTags: ['SpecificHonor','UserHonor'],
    }),

    updateHonor: builder.mutation({
      query: (initialHonorData) => ({
        url: "/honors",
        method: "PATCH",
        body: {
          ...initialHonorData,
        },
      }),
      invalidatesTags: ['SpecificHonor','UserHonor'],
    }),
  }),
});

export const {
  
  useGetSpecificHonorQuery,
  useGetHonorByUserQuery,
  useAddNewHonorMutation,
  useUpdateHonorMutation,
  
} = honorsApiSlice;
