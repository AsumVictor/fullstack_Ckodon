import React, { useEffect, useState } from "react";
import Page from "../../../../components/shared/page";
import { Link, useParams } from "react-router-dom";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  selectReviewById,
  useGetReviewsQuery,
  useUpdateReviewMutation,
} from "../../../../apiSlice/reviewsApiSlice";
import { RefreshToolkit } from "../../../../components/toolkits/tollkit";

function ReviewDetails() {
  const params = useParams();
  const reviewId = params.id;

  const {
    data: reviews,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReviewsQuery();
  const review = useSelector((state) => selectReviewById(state, reviewId));

  let content;

  //   if (isLoading) {
  //     content = <h1>Loading...</h1>;
  //   }

  if (isSuccess) {
    let DocumentType = review.onModel;
    const document = review.document;
    console.log(document);
    if (DocumentType == "Honor") {
      content = (
        <>
          <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2      md:justify-between justify-end items-center w-full flex-wrap gap-y-2 mt-5   sticky top-0">
            {review.status == "pending" ? (
              <>
                <div className="flex flex-row justify-between text-16 font-bold items-center w-full gap-2 md:w-5/12">
                  {`${DocumentType} was submitted by: ${review?.student.firstName}`}
                </div>
                <div className="self-end flex flex-row justify-between items-center gap-5 md:gap-3 flex-wrap">
                  <button
                    id="reject"
                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                      setShowModal({
                        show: true,
                        text: "reject",
                      })
                    }
                  >
                    {`reject ${DocumentType}`}
                  </button>

                  <button
                    id="accept"
                    className="bg-emerald-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                      setShowModal({
                        show: true,
                        text: "admit",
                      })
                    }
                  >
                    {`approve ${DocumentType}`}
                  </button>
                  <RefreshToolkit />
                </div>
              </>
            ) : review.status == "approved" ? (
              <div className="md:flex flex-row justify-center text-emerald-600 text-2xl font-bold items-center w-full">
                {`${DocumentType} has been approved`}
              </div>
            ) : (
              <div className="md:flex flex-row justify-center text-pink-600 text-2xl font-bold items-center w-full">
                {`${DocumentType} has been rejected`}
              </div>
            )}
          </div>

          <div className="mt-10 w-full py-2 bg-slate-100 rounded-md px-2 flex flex-col items-center">
            <div className="w-full flex flex-col items-start">
              {document.honors.map((honor, index) => (
                <>
                  <h1 className="font-bold underline px-2 mt-10 text-MdBlue">{`Honor ${
                    index + 1
                  }`}</h1>
                  <div className="flex flex-col md:flex-row flex-wrap py-1 w-full md:w-8/12">
                    <div className="md:w-7/12  py-2 px-2 font-semibold">
                      {honor.honorTitle}
                    </div>
                    <div className="md:w-3/12 py-2 px-2">
                      {honor.isRecognisedInSchool && <span> School,</span>}
                      {honor.isRecognisedInState && (
                        <span> State/Regional,</span>
                      )}
                      {honor.isRecognisedNational && <span> National, </span>}
                      {honor.isRecognisedInternational && (
                        <span> International</span>
                      )}
                    </div>
                    <div className="md:w-2/12 py-2 px-2">
                      {honor.didItInGrade9 && <span> 9,</span>}
                      {honor.didItInGrade10 && <span> 10,</span>}
                      {honor.didItInGrade11 && <span> 11,</span>}
                      {honor.didItInGrade12 && <span> 12,</span>}
                      {honor.didItAfterSchool && <span> post graduate</span>}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      );
    }

    if (DocumentType == "Activity") {
      content = "Activity";
    }

    if (DocumentType == "Aid") {
      content = "Aid";
    }

    if (DocumentType == "Essay") {
      content = "Essay";
    }

    if (DocumentType == "Recommendation") {
      content = "Recommendation";
    }
  }

  return (
    <>
      <Page>
        <Link
          to=".."
          relative="path"
          className="text-MdBlue font-semibold flex items-center gap-1"
        >
          <HiChevronDoubleLeft /> Back to all review documents
        </Link>

        {content}
      </Page>
    </>
  );
}

export default ReviewDetails;
