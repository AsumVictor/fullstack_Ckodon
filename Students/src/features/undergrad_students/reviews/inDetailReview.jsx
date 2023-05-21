import React, { useEffect, useState, Suspense } from "react";
import Page from "../../../components/shared/page";
import { Link, useParams, useLoaderData, defer, Await } from "react-router-dom";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { getASpecificReview } from "../../../app/api/api";
import { HiCheck } from "react-icons/hi";
import axios from "axios";
import { RefreshToolkit } from "../../../components/toolkits/tollkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CoverLoaderMedium } from "../../../components/loaders/loader";
import useAuth from "../../../hooks/useAuth";
import { useGetSpecificReviewQuery } from "../../../apiSlice/reviewsApiSlice";
import PdfLogo from "../../../assets/images/pdf-icon.png";
import { HiOutlineInboxIn } from "react-icons/hi";

function StudentDocDetails_ug() {
  const params = useParams();
  const {
    data: review,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSpecificReviewQuery(params.id);
  let reviewDoc;
  let DocumentType;
  let content;
  if (isLoading) {
    return <CoverLoaderMedium />;
  }

  console.log(review);

  if (isSuccess) {
    DocumentType = review.onModel;
    reviewDoc = { ...review.document };

    if (DocumentType == "Honor") {
      content = (
        <>
          <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2 md:justify-between justify-around items-center w-full flex-wrap gap-y-2 mt-5   sticky -top-5">
            <h1 className={`capitalize flex-col flex font-bold text-2xl`}>
              {` ${
                reviewDoc.status == "unresolved"
                  ? " Honor is under review"
                  : " Honor has been resolved"
              }`}
            </h1>
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
                    {honor.isRecognisedInSchool && <span> School,</span>}
                    {honor.isRecognisedInState && <span> State/Regional,</span>}
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
              </div>
              {/* Previous Comments here */}
              <div className="w-full md:w-8/12 py-2 bg-slate-200 flex flex-col px-2 overflow-y-auto mt-3 overflow-x-hidden">
                <h2 className="self-center font-bold capitalize">Comments</h2>
                {honor.comments.map((comment) => {
                  if (comment.comment !== "" && comment.comment) {
                    const lines = comment.comment.split("\n");
                    const commentParagraphs = lines.map((line, index) => (
                      <span
                        className="mt-1 w-full overflow-x-hidden"
                        key={index}
                      >
                        {line}
                      </span>
                    ));

                    return (
                      <div
                        className="w-full bg-slate-300 py-1 px-2 mt-3 rounded-md flex flex-col"
                        key={comment._id}
                      >
                        {comment.comment && (
                          <div className="w-full flex flex-col">
                            {commentParagraphs}
                          </div>
                        )}
                        {comment.timeDate && (
                          <span className="self-end font-bold"></span>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </>
      );
    }

    if (DocumentType == "Activity") {
      content = (
        <>
          <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2 md:justify-between justify-around items-center w-full flex-wrap gap-y-2 mt-5   sticky -top-5">
            <h1 className={`capitalize flex-col flex font-bold text-2xl`}>
              {` ${
                reviewDoc.status == "unresolved"
                  ? " Activity is under review"
                  : " Activity has been resolved"
              }`}
            </h1>
          </div>

          {reviewDoc.activities.map((activity, index) => (
            <div className="w-full mt-10 py-2 flex flex-row flex-wrap rounded-md bg-slate-100">
              <div className="w-full md:w-8/12 flex flex-col py-2 ">
                <h2 className="px-5 font-bold flex items-center flex-row gap-x-2">
                  <span className="text-MdBlue text-xl">
                    Activity {index + 1}
                  </span>
                  <span
                    className={`capitalize no-underline  ${
                      activity.rate == "bad"
                        ? "text-red-500 text-xl"
                        : activity.rate == "good"
                        ? "text-emerald-600 text-xl"
                        : activity.rate == "normal"
                        ? "text-blue-500 text-xl"
                        : null
                    }`}
                  >
                    {activity.rate == "notRated" ? "Not rated" : activity.rate}
                  </span>
                </h2>

                <div className="w-full flex flex-row flex-wrap">
                  <div className="w-full order-2 px-4 md:order-1 md:w-3/12 py-1 flex flex-col ">
                    <h2>
                      {activity.didItInGrade9 && <span> 9,</span>}
                      {activity.didItInGrade10 && <span> 10,</span>}
                      {activity.didItInGrade11 && <span> 11, </span>}
                      {activity.didItInGrade12 && <span> 12</span>}
                      {activity.didItAfterSchool && <span> PG</span>}
                    </h2>
                    <h2>
                      {activity.participstedInSchoolDay && (
                        <span> School,</span>
                      )}
                      {activity.participstedInSchoolBreak && (
                        <span> Break,</span>
                      )}
                      {activity.participstedAllYear && <span> Year </span>}
                    </h2>
                    <h2>{`${activity.hourSpentPerYear} hr/wk, ${activity.weeksSpentPerYear} wk/yr`}</h2>
                  </div>

                  <div className="w-full  order-1 md:order-2 md:w-9/12 py-1 px-5 flex flex-col">
                    <h2 className="font-bold">
                      {`${activity.position}, ${activity.organisationName}`}
                    </h2>
                    <h2>{activity.description}</h2>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 py-2 bg-slate-200 flex flex-col px-2 overflow-y-auto mt-5">
                <h2 className="self-center font-bold capitalize">Comments</h2>

                {activity.comments.map((comment) => {
                  if (comment.comment !== "" && comment.comment) {
                    const lines = comment.comment.split("\n");
                    const commentParagraphs = lines.map((line, index) => (
                      <p className="mt-1" key={index}>
                        {line}
                      </p>
                    ));

                    return (
                      <div
                        className="w-full bg-slate-300 py-1 px-2 mt-3 rounded-md flex flex-col"
                        key={comment._id}
                      >
                        {comment.comment && (
                          <div className="w-full flex flex-col">
                            {commentParagraphs}
                          </div>
                        )}
                        {comment.timeDate && (
                          <span className="self-end font-bold"></span>
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </>
      );
    }

    if (DocumentType == "Essay") {
      content = (
        <>
          <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2 md:justify-between justify-around items-center w-full flex-wrap gap-y-2 mt-5   sticky -top-5">
            <h1 className={`capitalize flex-col flex font-bold text-2xl`}>
              {` ${
                reviewDoc.status == "unresolved"
                  ? " Essays are under review"
                  : " Essays have been resolved"
              }`}
            </h1>
          </div>

          <h2 className="self-center text-2xl text-MdBlue font-bold mt-5">
            {`${reviewDoc.schoolName} Essays`}
          </h2>
          {reviewDoc.essays.map((essay, index) => {
            const lines = essay.answer.split("\n");
            const essayParagraphs = lines.map((line, index) => (
              <p className="mt-3" key={index}>
                {line}
              </p>
            ));
            return (
              <div className="w-full mt-10 py-2 flex flex-row flex-wrap rounded-md bg-slate-100">
                <div className="w-full md:w-8/12 py-1 flex flex-col px-2 md:px-5">
                  <h2 className="font-bold flex items-center flex-row gap-x-2">
                    <span className="text-MdBlue text-20">
                      Essay {index + 1}
                    </span>
                    <span
                      className={`capitalize no-underline  ${
                        essay.rate == "bad"
                          ? "text-red-500"
                          : essay.rate == "good"
                          ? "text-emerald-600"
                          : essay.rate == "normal"
                          ? "text-blue-500"
                          : null
                      }`}
                    >
                      {essay.rate == "notRated" ? "Not rated" : essay.rate}
                    </span>
                  </h2>

                  <h2 className="font-bold mt-2">{essay.question}</h2>

                  <div className="w-full mt-4">{essayParagraphs}</div>
                </div>

                <div className="w-full md:w-4/12 flex flex-col  overflow-y-auto overflow-x-hidden">
                  <div className="w-full py-2 bg-slate-200 flex flex-col px-2 h-96 overflow-y-auto mt-5 overflow-x-hidden">
                    <h2 className="self-center font-bold capitalize">
                      Your Previous comments
                    </h2>

                    {essay.comments.map((comment) => {
                      if (comment.comment !== "" && comment.comment) {
                        const lines = comment.comment.split("\n");
                        const commentParagraphs = lines.map((line, index) => (
                          <p className="mt-1" key={index}>
                            {line}
                          </p>
                        ));

                        return (
                          <div
                            className="w-full bg-slate-300 py-1 px-2 mt-3 rounded-md flex flex-col"
                            key={comment._id}
                          >
                            {comment.comment && (
                              <div className="w-full flex flex-col">
                                {commentParagraphs}
                              </div>
                            )}
                            {comment.timeDate && (
                              <span className="self-end font-bold"></span>
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>

                  <div className="w-full py-2 bg-slate-200 flex flex-col px-2 h-96 overflow-y-auto mt-5 gap-3 overflow-x-hidden">
                    <h2 className="self-center font-bold capitalize">
                      Additional document
                    </h2>

                    {essay.additionalDocs.map((document, index) => {
                      return (
                        <>
                          {document.title && (
                            <div
                              className="w-full items-center flex flex-row gap-x-3 justify-between flex-wrap bg-gray-300 py-1 "
                              key={document._id}
                            >
                              <img src={PdfLogo} alt="pdf" />
                              <p className="font-bold">{document.title}</p>
                              <p className="text-emerald-600 font-semibold">
                                4 days ago
                              </p>

                              <a
                                href={document.doc}
                                download={document.title}
                                className="text-emerald-700 font-bold text-2xl mx-2"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <HiOutlineInboxIn />
                              </a>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    }

    if (DocumentType == "Recommendation") {
      content = (
        <>
          <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2 md:justify-between justify-around items-center w-full flex-wrap gap-y-2 mt-5   sticky -top-5">
            <h1 className={`capitalize flex-col flex font-bold text-2xl`}>
              {` ${
                reviewDoc.status == "unresolved"
                  ? " Recommendations are under review"
                  : " Recommendations have been resolved"
              }`}
            </h1>
          </div>

          {reviewDoc.recommendations.map((recommendation, recoIndex) => {
            return (
              <div
                className="flex w-full flex-col py-1 bg-slate-100 mt-10"
                key={recommendation._id}
              >
                <h2 className="text-20 text-black font-bold  capitalize">{`${recommendation.recommenderName}'s recommendation letters`}</h2>

                {recommendation.letters.map((letter, letterIndex) => {
                  const lines = letter.letter.split("\n");
                  const letterParagraphs = lines.map((line, index) => (
                    <p className="mt-3" key={index}>
                      {line}
                    </p>
                  ));
                  return (
                    <div
                      className="w-full mt-10 py-2 flex flex-row flex-wrap rounded-md bg-slate-200"
                      key={letter._id}
                    >
                      <div className="w-full md:w-8/12 py-1 flex flex-col px-2 md:px-5">
                        <h2 className="font-bold flex items-center flex-row gap-x-2">
                          <span className="text-MdBlue text-20 capitalize">
                            recommendation {letterIndex + 1}
                          </span>
                          <span
                            className={`capitalize no-underline  ${
                              letter.rate == "bad"
                                ? "text-red-500"
                                : letter.rate == "good"
                                ? "text-emerald-600"
                                : letter.rate == "normal"
                                ? "text-blue-500"
                                : null
                            }`}
                          >
                            {letter.rate == "notRated"
                              ? "Not rated"
                              : letter.rate}
                          </span>
                        </h2>
                        <div className="w-full mt-4">{letterParagraphs}</div>
                      </div>

                      <div className="w-full md:w-4/12 py-2 bg-slate-300 flex flex-col px-2 overflow-y-auto mt-5 overflow-x-hidden">
                        <h2 className="self-center font-bold capitalize">
                          Comments
                        </h2>

                        {letter.comments.map((comment) => {
                          if (comment.comment !== "" && comment.comment) {
                            const lines = comment.comment.split("\n");
                            const commentParagraphs = lines.map(
                              (line, index) => (
                                <p className="mt-1" key={index}>
                                  {line}
                                </p>
                              )
                            );

                            return (
                              <div
                                className="w-full bg-slate-400 py-1 px-2 mt-3 rounded-md flex flex-col"
                                key={comment._id}
                              >
                                {comment.comment && (
                                  <div className="w-full flex flex-col">
                                    {commentParagraphs}
                                  </div>
                                )}
                                {comment.timeDate && (
                                  <span className="self-end font-bold"></span>
                                )}
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      );
    }

    if (DocumentType == "Aid") {
      content = (
        <>
          <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2 md:justify-between justify-around items-center w-full flex-wrap gap-y-2 mt-5   sticky -top-5">
            <h1 className={`capitalize flex-col flex font-bold text-2xl`}>
              {` ${
                reviewDoc.status == "unresolved"
                  ? " Financial aids are under review"
                  : " Financial aids have been resolved"
              }`}
            </h1>
          </div>

          {reviewDoc.aids.map((aid, index) => {
            return (
              <div
                className="w-full mt-10 py-2 flex flex-row flex-wrap rounded-md bg-slate-200"
                key={aid._id}
              >
                <div className="w-full md:w-8/12 py-1 flex flex-col px-2 md:px-5">
                  <h2 className="font-bold flex items-center flex-row gap-x-2">
                    <span className="text-MdBlue text-20">
                      {`${aid.SchoolName} Financial Aid`}
                    </span>
                    <span
                      className={`capitalize no-underline  ${
                        aid.rate == "bad"
                          ? "text-red-500"
                          : aid.rate == "good"
                          ? "text-emerald-600"
                          : aid.rate == "normal"
                          ? "text-blue-500"
                          : null
                      }`}
                    >
                      {aid.rate == "notRated" ? "Not rated" : aid.rate}
                    </span>
                  </h2>

                  <h2 className="mt-5 flex flex-row flex-wrap gap-x-2">
                    <span className="text-gray-500 font-bold capitalize">
                      Total Family annual Income:
                    </span>
                    <span className="text-black font-bold">
                      {`$${aid.totalAnnualIncome}`}
                    </span>
                  </h2>

                  <h2 className="mt-5 flex flex-row flex-wrap gap-x-2">
                    <span className="text-gray-500 font-bold capitalize">
                      Total Family saving:
                    </span>
                    <span className="text-black font-bold">
                      {`$${aid.familySaving}`}
                    </span>
                  </h2>

                  <h2 className="mt-5 flex flex-row flex-wrap gap-x-2">
                    <span className="text-gray-500 font-bold capitalize">
                      Total Family annual expenses:
                    </span>
                    <span className="text-black font-bold">
                      {`$${aid.totalExpensePerYear}`}
                    </span>
                  </h2>

                  <h2 className="mt-5 flex flex-row flex-wrap gap-x-2">
                    <span className="text-emerald-500 font-bold capitalize">
                      Total Family annual contribution:
                    </span>
                    <span className="text-emerald-600 font-bold">
                      {`$${aid.EFC}`}
                    </span>
                  </h2>
                </div>

                <div className="w-full md:w-4/12 py-2 bg-slate-300 flex flex-col px-2 overflow-y-auto mt-10 overflow-x-hidden">
                  <h2 className="self-center font-bold capitalize">Comments</h2>
                  {aid.comments.map((comment) => {
                    if (comment.comment !== "" && comment.comment) {
                      const lines = comment.comment.split("\n");
                      const commentParagraphs = lines.map((line, index) => (
                        <p className="mt-1" key={index}>
                          {line}
                        </p>
                      ));

                      return (
                        <div
                          className="w-full bg-slate-400 py-1 px-2 mt-3 rounded-md flex flex-col"
                          key={comment._id}
                        >
                          {comment.comment && (
                            <div className="w-full flex flex-col">
                              {commentParagraphs}
                            </div>
                          )}
                          {comment.timeDate && (
                            <span className="self-end font-bold"></span>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </>
      );
    }
  }

  // useEffect(() => {
  //   if(review){
  //     setReviewDoc({...review.document})
  //   }
  // }, [review]);

  return (
    <>
      <Page>
        <Link
          to=".."
          relative="path"
          className="text-MdBlue font-semibold mt-5 flex items-center gap-1"
        >
          <HiChevronDoubleLeft />
          {`Back to my review documents`}
        </Link>
        {content}
      </Page>
      <ToastContainer />
    </>
  );
}

export default StudentDocDetails_ug;

export function GetSpecficReviewLoader({ params }) {
  return defer({ review: getASpecificReview(params.id) });
}
