import React, { useMemo } from "react";
import { useOutletContext, Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { useGetUsersQuery } from "../../../../apiSlice/usersApiSlice";
import { useGetReviewByUserQuery } from "../../../../apiSlice/reviewsApiSlice";
import { selectUserById } from "../../../../apiSlice/usersApiSlice";
import { useSelector } from "react-redux";
import { CoverLoaderMedium } from "../../../../components/loaders/loader";
function StudentDoc() {
    const context = useOutletContext()
    const studentId = context.studentId
    const student = useSelector((state) => selectUserById(state, studentId));
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
      } = useGetUsersQuery()

   const {
    data: reviews = [],
    isSuccess: reviewFinishLoading,
    isLoading: reviewsLoading,
  } = useGetReviewByUserQuery(studentId)
  let content
  
const sortedReviews = useMemo(()=>{
  const sortedReviews = reviews.slice()
  sortedReviews.sort((a, b) => {
    if (a.status === "unresolved" && b.status !== "unresolved") {
      return -1; // a comes first
    }
    if (a.status !== "unresolved" && b.status === "unresolved") {
      return 1; // b comes first
    }
    return 0; // no change in order
  });
  return sortedReviews
},[reviews])

  if (isLoading || reviewsLoading) {
    return (
      <div className="flex justify-center mt-20">
        <CoverLoaderMedium />
      </div>
      
      )
  }

  
 if (reviewFinishLoading) {
    if (!sortedReviews.length) {
      content =  (
        <h2 className="mt-10 self-center flex flex-row flex-wrap gap-2 font-bold text-20 ">
          No review Submitted by <span>

          {`${student?.firstName} ${student?.lastName}`}
          </span>
        </h2>
      );
    }else{

      content = (
        <>
          <h2 className="text-center mt-10 text-2xl font-bold">{`${student?.firstName}'s Documents`}</h2>
 
          <div className="relative mb-24 shadow-md rounded-md mt-5">
            <table className="w-full rounded-md text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3 tabel-hide">
                    NO.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Document type
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3 tabel-hide">
                    deadline
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              {sortedReviews.map((review, index) => {
                return (
                  <tr className="bg-white cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 tabel-hide">{index + 1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {review.onModel}
                    </th>
                    <td
                      className={`px-6 py-4 capitalize flex flex-row gap-x-1 items-center ${
                        review.status == "unresolved"
                          ? "text-blue-600 font-bold"
                          : review.status == "resolved"
                          ? "text-emerald-500 font-bold"
                          : null
                      }`}
                    >
                      {review.status == "unresolved" ? (
                        "pending"
                      ) : review.status == "resolved" ? (
                        <>
                          <HiBadgeCheck />
                          <span>resolved</span>
                        </>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 tabel-hide">
                      {review.deadline}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`${review._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Review Document
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          </>
      )}}
  
  return (
    <>
      <h2 className="font-bold px-2 md:px-5 text-18">
        {`${student.firstName} ${student.lastName}'s recent submitted documents`}
      </h2>
     {content}
    </>
  );
}

export default StudentDoc;
