import React, { useEffect, useState, Suspense } from "react";
import Page from "../../../../components/shared/page";
import { Link, useParams, useLoaderData, defer, Await } from "react-router-dom";
import { HiChevronDoubleLeft } from "react-icons/hi";
import {
  selectReviewById,
  useGetSpecificReviewQuery,
  useGetReviewsQuery,
  useUpdateReviewMutation,
} from "../../../../apiSlice/reviewsApiSlice";
import { getASpecificReview } from "../../../../app/api/api";
import { HiCheck } from "react-icons/hi";

import { RefreshToolkit } from "../../../../components/toolkits/tollkit";

function ReviewDetails() {
  const loaderData = useLoaderData();

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
        <Suspense fallback={<h1>Loading..</h1>}>
          <Await resolve={loaderData.review}>
            {(review) => {
              //Declare global varaible
              const [updateReview] = useUpdateReviewMutation();
              const [reviewDoc, setReviewDoc] = useState(review.document);
              //State to manage Comments

              console.log(review);
              let DocumentType = review.onModel;
              let content;

              //Update honor Rate
              function UpdateHonorRate(index, text) {
                const updatedHonors = [...reviewDoc.honors];
                updatedHonors[index] = {
                  ...updatedHonors[index],
                  rate: text,
                };
                setReviewDoc({ ...reviewDoc, honors: updatedHonors });
              }

              function UpdateComment(e, index) {
                const updatedHonors = [...reviewDoc.honors];
                const updatedComment = [...updatedHonors[index].comments];
                updatedComment[updatedComment.length - 1] = {
                  ...updatedComment[updatedComment.length - 1],
                  comment: e.target.value,
                  date: new Date(),
                };
                updatedHonors[index] = {
                  ...updatedHonors[index],
                  comments: updatedComment,
                };

                setReviewDoc({ ...reviewDoc, honors: updatedHonors });
              }

              // When Click on Done review for honors
              //Update review
              //Update document
              //Update state
              //Show notification
               function DoneReview() {
                let updateResponse = updateReview({
                  ...review,
                  id: review._id,
                  status: "resolved",
                });

              }

              //Honor comment

              //Render according document type

              //Render Honors
              if (DocumentType == "Honor") {
                content = (
                  <>
                    <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2 md:justify-between justify-around items-center w-full flex-wrap gap-y-2 mt-5   sticky -top-5">
                      <h1 className="capitalize flex-col flex">
                        <span className="font-bold">
                          {`submitted by: ${review.user.firstName} ${review.user.lastName}`}
                        </span>
                        <span className="text-gray-700 font-semibold">
                          {`from: ${review.user.school}`}
                        </span>
                      </h1>
                      <button className="flex flex-row gap-x-1 items-center capitalize py-1 px-2 bg-MdBlue font-bold text-white rounded-md"
                      onClick={()=>DoneReview()}
                      >
                        <HiCheck /> Done review
                      </button>
                    </div>

                    {reviewDoc.honors.map((honor, index) => (
                      <div
                        key={honor._id}
                        className="w-full flex flex-row flex-wrap mt-14"
                      >
                        <div className="w-full md:w-8/12 py-2 flex flex-col">
                          <h1 className="font-bold flex flex-row gap-x-3 px-2 text-MdBlue">
                            <span>{`Honor ${index + 1}`}</span>

                            <span
                              className={`capitalize no-underline ${
                                honor.rate == "bad"
                                  ? "text-red-500"
                                  : honor.rate == "good"
                                  ? "text-emerald-600"
                                  : honor.rate == " normal"
                                  ? "text-blue-500"
                                  : null
                              }`}
                            >
                              {honor.rate}
                            </span>
                          </h1>

                          {/* Honor content */}
                          <div className="flex flex-col md:flex-row flex-wrap py-1 w-full">
                            <div className="md:w-7/12  py-2 px-2 font-semibold">
                              {honor.honorTitle}
                            </div>
                            <div className="md:w-3/12 py-2 px-2">
                              {honor.isRecognisedInSchool && (
                                <span> School,</span>
                              )}
                              {honor.isRecognisedInState && (
                                <span> State/Regional,</span>
                              )}
                              {honor.isRecognisedNational && (
                                <span> National, </span>
                              )}
                              {honor.isRecognisedInternational && (
                                <span> International</span>
                              )}
                            </div>
                            <div className="md:w-2/12 py-2 px-2">
                              {honor.didItInGrade9 && <span> 9,</span>}
                              {honor.didItInGrade10 && <span> 10,</span>}
                              {honor.didItInGrade11 && <span> 11,</span>}
                              {honor.didItInGrade12 && <span> 12,</span>}
                              {honor.didItAfterSchool && (
                                <span> post graduate</span>
                              )}
                            </div>
                            {/* Rate This honor */}
                            <div className="w-full flex flex-row px-2 gap-x-5 mt-5">
                              <span
                                className="text-red-500 font-bold px-2 border-2 rounded-md border-red-500 cursor-pointer"
                                onClick={() => UpdateHonorRate(index, "bad")}
                              >
                                Bad
                              </span>
                              <span
                                className="text-blue-500 font-bold px-2 border-2 rounded-md border-blue-500 cursor-pointer"
                                onClick={() => UpdateHonorRate(index, "normal")}
                              >
                                Normal
                              </span>
                              <span
                                className="text-emerald-500 font-bold px-2 border-2 rounded-md border-emerald-500 cursor-pointer"
                                onClick={() => UpdateHonorRate(index, "good")}
                              >
                                Good
                              </span>
                            </div>

                            {/* add comment here */}
                            <div className="w-full flex flex-col px-2">
                              <h2 className="mt-10">Add comment here</h2>

                              <textarea
                                name="comment"
                                id="comment"
                                className="w-full md:w-8/12 resize-none border-2 border-blue-400 p-3"
                                rows="10"
                                onChange={(e) => UpdateComment(e, index)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        {/* Previous Comments here */}
                        <div className="w-full md:w-4/12 py-2 bg-slate-200 flex flex-col px-2 h-96 overflow-y-auto mt-3">
                          <h2 className="self-center font-bold capitalize">
                            comments
                          </h2>
                          <div className="w-full bg-slate-300 py-1 px-2 rounded-md flex flex-col">
                            <h2>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Consectetur veritatis nam consequuntur
                              ratione aut earum, eius dolorum molestias quia
                              neque. Dolorum itaque ipsam iusto eveniet
                              reiciendis consectetur dignissimos cumque nulla?
                            </h2>

                            <span className="self-end font-bold">
                              20/12/2022
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                );
              }

              return content;
            }}
          </Await>
        </Suspense>
      </Page>
    </>
  );
}

export default ReviewDetails;

export function SpecficReviewLoader({ params }) {
  return defer({ review: getASpecificReview(params.id) });
}
