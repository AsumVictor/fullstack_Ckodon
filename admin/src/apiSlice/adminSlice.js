import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice"

const adminsAdapter = createEntityAdapter({})

const initialState = adminsAdapter.getInitialState()

export const adminsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdmins: builder.query({
            query: () => '/undergrads',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAdmins = responseData.map(admin => {
                    admin.id = admin._id
                    return admin
                });
                return adminsAdapter.setAll(initialState, loadedAdmins)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Admin', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Admin', id }))
                    ]
                } else return [{ type: 'Admin', id: 'LIST' }]
            }
        }),
        
        addNewAdmin: builder.mutation({
            query: initialAdminData => ({
                url: '/admins',
                method: 'POST',
                body: {
                    ...initialAdminData,
                }
            }),
            invalidatesTags: [
                { type: 'Admin', id: "LIST" }
            ]
        }),
        updateAdmin: builder.mutation({
            query: initialAdminData => ({
                url: '/admins',
                method: 'PATCH',
                body: {
                    ...initialAdminData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Admin', id: arg.id }
            ]
        }),
        deleteAdmin: builder.mutation({
            query: ({ id }) => ({
                url: `/admins`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Admin', id: arg.id }
            ]
        }),
        getAdmin: builder.query({
            query: (id) => ({
              url: `/admins/${id}`,
              method: "GET",
            }),
            providesTags:['Admin'],
          }),
    }),
})

export const {
    useGetAdminsQuery,
    useAddNewAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
    useGetAdminQuery
} = adminsApiSlice

// returns the query result object
export const selectAdminsResult = adminsApiSlice.endpoints.getAdmins.select()

// creates memoized selector
const selectAdminsData = createSelector(
    selectAdminsResult,
    adminsResult => adminsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAdmins,
    selectById: selectAdminById,
    selectIds: selectAdminIds
    // Pass in a selector that returns the admins slice of state
} = adminsAdapter.getSelectors(state => selectAdminsData(state) ?? initialState)
