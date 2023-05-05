import React, { Suspense, useState, useEffect } from "react";
import {
  Await,
  defer,
  useLoaderData,
  Link,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { getAUserReview } from "../../../app/api/api";
import { CoverLoaderMedium } from "../../../components/loaders/loader";
import NoContent from "../../../components/indications/noContent";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { HiBadgeCheck } from "react-icons/hi";
import Page from "../../../components/shared/page";
import useAuth from "../../../hooks/useAuth";
import { useGetReviewByUserQuery } from "../../../apiSlice/reviewsApiSlice";

function Student_reviews() {
  const student = useAuth();
  const {
    data: review,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReviewByUserQuery(student.id);
const [reviews, setReviews] = useState(null)
  useEffect(() => {
    if (review) {
      setReviews([...review ]);
    }
  }, [review]);

  if (isLoading) {
    return <CoverLoaderMedium />;
  }

  if (isError) {
    return <h1>{error}</h1>;
  }

  if (!reviews?.length) {
    return (
      <NoContent message="You have not submitted any document for review" />
    )
  }

  reviews.sort((a, b) => {
    if (a.status === "unresolved" && b.status !== "unresolved") {
      return 1; // a comes first
    }
    if (a.status !== "unresolved" && b.status === "unresolved") {
      return -1; // b comes first
    }
    return 0; // no change in order
  });

  return (
    <Page>
      <>
        <div className="flex flex-col">
          <h1 className="text-2xl self-center mt-5 font-bold text-MdBlue">
            My submitted documents
          </h1>

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
              {reviews.map((review, index) => {
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
                    <td className="px-6 py-4 tabel-hide">{review.deadline}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`${review._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Check
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </>
    </Page>
  );
}

export default Student_reviews;

export function GetReviewFromUserLoader(id) {
  return defer({ reviews: getAUserReview("643e93e228fe348dc275fe37") });
}
