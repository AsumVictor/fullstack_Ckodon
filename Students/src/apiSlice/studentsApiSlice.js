import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStudent: builder.query({
            query: (id) => ({
              url: `/undergrads/${id}`,
              method: "GET",
            }),
            providesTags:['Student'],
          }),
        
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/undergrads',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags:  ['Student']
        }),

      
    }),
})

export const {
    useUpdateUserMutation,
    useGetStudentQuery
} = usersApiSlice
