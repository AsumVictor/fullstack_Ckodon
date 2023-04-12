import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['UndergraduateApplicant', 'User', "Honor", "Activity", "Essay", 'Aid', 'Recommendation', "UndergraduateReview"],
    endpoints: builder => ({})
})