import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";



export const essaysApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    getSpecificEssay: builder.query({
      query: (id) => ({
        url: `/essays/id/${id}`,
        method: "GET",
      }),
      providesTags:['SpecificEssays'],
    }),

    getEssayByUser: builder.query({
      query: (id) => ({
        url: `/essays/user/${id}`,
        method: "GET",
      }),
      providesTags:['UserEssays'],

    }),

    addNewEssay: builder.mutation({
      query: (initialEssayData) => ({
        url: "/essays",
        method: "POST",
        body: {
          ...initialEssayData,
        },
      }),
      invalidatesTags: ['SpecificEssays', 'UserEssays'],
    }),

    updateEssay: builder.mutation({
      query: (initialEssayData) => ({
        url: "/essays",
        method: "PATCH",
        body: {
          ...initialEssayData,
        },
      }),
      invalidatesTags: ['SpecificEssays', 'UserEssays'],
    }),

    deleteEssay: builder.mutation({
      query: (id) => ({
        url: `/essays/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['SpecificEssays', 'UserEssays'],
    }),

  }),
});

export const {
  useGetSpecificEssayQuery,
  useGetEssayByUserQuery,
  useAddNewEssayMutation,
  useUpdateEssayMutation,
  useDeleteEssayMutation
} = essaysApiSlice;
