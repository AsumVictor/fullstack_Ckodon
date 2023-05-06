import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice"


export const filesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFiles: builder.query({
            query: () => '/files',          
            providesTags:  ['File']
            
        }),
        
        addNewfile: builder.mutation({
            query: initialfileData => ({
                url: '/files',
                method: 'POST',
                body: {
                    ...initialfileData,
                }
            }),
            invalidatesTags:  ['File']
        }),
        // updatefile: builder.mutation({
        //     query: initialfileData => ({
        //         url: '/files',
        //         method: 'PATCH',
        //         body: {
        //             ...initialfileData,
        //         }
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'file', id: arg.id }
        //     ]
        // }),
        // deletefile: builder.mutation({
        //     query: ({ id }) => ({
        //         url: `/files`,
        //         method: 'DELETE',
        //         body: { id }
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'file', id: arg.id }
        //     ]
        // }),
    }),
})

export const {
    useGetFilesQuery,
    useAddNewfileMutation,
    // useUpdatefileMutation,
    // useDeletefileMutation,
} = filesApiSlice
