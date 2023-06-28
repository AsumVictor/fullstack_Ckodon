import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";

const mentorAdapter = createEntityAdapter({});

export const mentorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMentors: builder.query({
      query: () => "/mentors",
      providesTags: ["Mentors"],
    }),

    addNewMentor: builder.mutation({
      query: (initialmentorData) => ({
        url: "/mentors",
        method: "POST",
        body: {
          ...initialmentorData,
        },
      }),
      invalidatesTags: ["Mentors"],
    }),
    updateMentor: builder.mutation({
      query: (initialmentorData) => ({
        url: "/mentors",
        method: "PATCH",
        body: {
          ...initialmentorData,
        },
      }),
      invalidatesTags: ["Mentors", "SpecificMentor"],
    }),
    deleteMentor: builder.mutation({
      query: ({ id }) => ({
        url: `/mentors`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Mentors", "SpecificMentor"],
    }),
    getMentor: builder.query({
      query: (id) => ({
        url: `/mentors/${id}`,
        method: "GET",
      }),
      providesTags: ["SpecificMentor"],
    }),
    assignMentor: builder.mutation({
      query: (initialmentorData) => ({
        url: "/mentors/asign",
        method: "PATCH",
        body: {
          ...initialmentorData,
        },
      }),
      invalidatesTags: ["Mentors"],
    }),
    inviteMentor: builder.mutation({
      query: (initialmentorData) => ({
        url: "/mentors/invite",
        method: "POST",
        body: {
          ...initialmentorData,
        },
      }),
    }),
  }),
});

export const {
  useGetMentorsQuery,
  useAddNewMentorMutation,
  useUpdateMentorMutation,
  useDeleteMentorMutation,
  useGetMentorQuery,
  useAssignMentorMutation,
  useInviteMentorMutation
} = mentorApiSlice;
