import React from "react";
import { useSelector } from "react-redux";
import { selectReviewById } from "../../../../apiSlice/reviewsApiSlice";
import { Link } from "react-router-dom";
import { HiBadgeCheck } from "react-icons/hi";


const Review = ({ reviewId, index }) => {
  const review = useSelector((state) => selectReviewById(state, reviewId))
  if (review) {
    const reviewTrContent = (
        <tr className="bg-white cursor-pointer border-2 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4 tabel-hide">{index}</td>
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
        >{
          review.status == "unresolved"
            ? "pending"
            : review.status == "resolved"
            ?( <>
            <HiBadgeCheck />
            <span>resolved</span>
            </>  )
                         : null
        }</td>
        <td className="px-6 py-4 tabel-hide">{review.deadline}</td>
        <td className="px-6 py-4 ">{`${review.student.firstName} ${review.student.lastName}`}</td>
        <td className="px-6 py-4 text-right">
          <Link
            to={`${review.id}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Review Document
          </Link>
        </td>
      </tr>
    );

    return reviewTrContent;
  }
};
export default Review;

