import { apiSlice } from "../app/api/apiSlice";

export const undergraduateApplicantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
    addNewUndergraduateApplicant: builder.mutation({
      query: (initialUserData) => ({
        url: "/undergraduteApplicants",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "UndergraduateApplicant", id: "LIST" }],
    }),

  }),
});

export const {
  useAddNewUndergraduateApplicantMutation,
} = undergraduateApplicantsApiSlice;

