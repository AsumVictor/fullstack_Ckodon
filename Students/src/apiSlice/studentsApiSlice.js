import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/undergrads',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags:  ['Refresh']
        }),
        
    }),
})

export const {
    useUpdateUserMutation,
} = usersApiSlice
