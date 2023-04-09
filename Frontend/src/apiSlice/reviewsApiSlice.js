import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice"

const reviewsAdapter = createEntityAdapter({})

const initialState = reviewsAdapter.getInitialState()

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query({
            query: () => '/undergradeReviews',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedReviews = responseData.map(review => {
                    review.id = review._id
                    return review
                });
                return reviewsAdapter.setAll(initialState, loadedReviews)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Review', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Review', id }))
                    ]
                } else return [{ type: 'Review', id: 'LIST' }]
            }
        }),
        
        addNewReview: builder.mutation({
            query: initialReviewData => ({
                url: '/undergradeReviews',
                method: 'POST',
                body: {
                    ...initialReviewData,
                }
            }),
            invalidatesTags: [
                { type: 'Review', id: "LIST" }
            ]
        }),
        updateReview: builder.mutation({
            query: initialReviewData => ({
                url: '/undergradeReviews',
                method: 'PATCH',
                body: {
                    ...initialReviewData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Review', id: arg.id }
            ]
        }),
        
    }),
})

export const {
    useGetReviewsQuery,
    useAddNewReviewMutation,
    useUpdateReviewMutation,
} = reviewsApiSlice

// returns the query result object
export const selectReviewsResult = reviewsApiSlice.endpoints.getReviews.select()

// creates memoized selector
const selectReviewsData = createSelector(
    selectReviewsResult,
    reviewsResult => reviewsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllReviews,
    selectById: selectReviewById,
    selectIds: selectReviewIds
    // Pass in a selector that returns the reviews slice of state
} = reviewsAdapter.getSelectors(state => selectReviewsData(state) ?? initialState)
