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
import axios from "axios";
import { RefreshToolkit } from "../../../../components/toolkits/tollkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiBadgeCheck } from "react-icons/hi";
import { CoverLoaderMedium } from "../../../../components/loaders/loader";

function ReviewDetails() {
  const loaderData = useLoaderData();

  return (
    <>
      <Page>
        <Link
          to=".."
          relative="path"
          className="text-MdBlue font-semibold mt-10 flex items-center gap-1"
        >
          <HiChevronDoubleLeft /> Back to all review documents
        </Link>
        <Suspense fallback={<CoverLoaderMedium />}>
          <Await resolve={loaderData.review}>
            {(review) => {
              //Declare global varaible
              const [updateReview] = useUpdateReviewMutation();
              const [reviewDoc, setReviewDoc] = useState(review.document);
              const [status, setStatus] = useState(review.status);
              const [loading, setLoading] = useState(false);

              // Convert textarea value to HTML elements

              let DocumentType = review.onModel;
              let content;

              // ------------------General function------------ //

              // ------------------End of General function------------ //

              // ------------------Honor functions------------ //
              //Update honor Rate
              function UpdateHonorRate(index, text) {
                const updatedHonors = [...reviewDoc.honors];
                updatedHonors[index] = {
                  ...updatedHonors[index],
                  rate: text,
                };
                setReviewDoc({ ...reviewDoc, honors: updatedHonors });
              }

              function UpdateHonorComment(e, index) {
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
              async function DoneReviewHonor() {
                setLoading(true);
                const Honors = reviewDoc.honors.map((honor) => {
                  return {
                    ...honor,
                    comments: [...honor.comments, { comment: "" }],
                  };
                });

                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "resolved",
                  });
                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/honors", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        honors: Honors,
                        status: "resolved",
                        submitted: false,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }
                        toast.success(`Review has been resolved`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("resolved");
                        setReviewDoc({
                          ...reviewDoc,
                          honors: Honors,
                        });
                      })
                      .catch((error) => console.log("Error: ", error))
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }

              //re-review Honor
              async function reReviewHonor() {
                setLoading(true);
                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "unresolved",
                  });
                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/honors", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        status: "unresolved",
                        submitted: true,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }

                        toast.success(
                          `You can review this ${review.onModel} again`,
                          {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        );
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("unresolved");
                        setReviewDoc({
                          ...reviewDoc,
                          id: reviewDoc._id,
                          status: "unresolved",
                          submitted: true,
                        });
                      })
                      .catch((error) => console.log("Error: ", error))
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }
              // ------------------Honor functions ends------------ //

              // ------------------Activity functions starts------------ //
              function UpdateActivityRate(index, text) {
                const updatedActivities = [...reviewDoc.activities];
                updatedActivities[index] = {
                  ...updatedActivities[index],
                  rate: text,
                };
                setReviewDoc({ ...reviewDoc, activities: updatedActivities });
              }

              function UpdateActivityComment(e, index) {
                const updatedActivities = [...reviewDoc.activities];
                const updatedComment = [...updatedActivities[index].comments];
                updatedComment[updatedComment.length - 1] = {
                  ...updatedComment[updatedComment.length - 1],
                  comment: e.target.value,
                  timeDate: new Date(),
                };
                updatedActivities[index] = {
                  ...updatedActivities[index],
                  comments: updatedComment,
                };

                setReviewDoc({ ...reviewDoc, activities: updatedActivities });
              }

              //Done review
              async function DoneReviewActivity() {
                setLoading(true);
                const Activities = reviewDoc.activities.map((activity) => {
                  return {
                    ...activity,
                    comments: [...activity.comments, { comment: "" }],
                  };
                });

                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "resolved",
                  });

                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/activities", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        status: "resolved",
                        submitted: false,
                        activities: Activities,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }
                        toast.success(`Review has been resolved`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("resolved");
                        setReviewDoc({
                          ...reviewDoc,
                          activities: Activities,
                        });
                      })
                      .catch((error) => {
                        console.log("Error: ", error);
                        toast.error(`${error.response.data.message}`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  console.log(error);
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }

              //re-review Activity
              async function reReviewActivity() {
                setLoading(true);
                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "unresolved",
                  });
                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/activities", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        status: "unresolved",
                        submitted: true,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }

                        toast.success(
                          `You can review this ${review.onModel} again`,
                          {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        );
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("unresolved");
                        setReviewDoc({
                          ...reviewDoc,
                          id: reviewDoc._id,
                          status: "unresolved",
                          submitted: true,
                        });
                      })
                      .catch((error) => console.log("Error: ", error))
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }

              // ------------------Activity functions ends------------ //

              // ------------------Aidas functions starts------------ //
              function UpdateEssayRate(index, text) {
                const updatedEssays = [...reviewDoc.essays];
                updatedEssays[index] = {
                  ...updatedEssays[index],
                  rate: text,
                };
                setReviewDoc({ ...reviewDoc, essays: updatedEssays });
              }

              function UpdateEssayComment(e, index) {
                const updatedEssays = [...reviewDoc.essays];
                const updatedComment = [...updatedEssays[index].comments];
                updatedComment[updatedComment.length - 1] = {
                  ...updatedComment[updatedComment.length - 1],
                  comment: e.target.value,
                  timeDate: new Date(),
                };
                updatedEssays[index] = {
                  ...updatedEssays[index],
                  comments: updatedComment,
                };

                setReviewDoc({ ...reviewDoc, essays: updatedEssays });
              }

              async function DoneReviewEssay() {
                setLoading(true);
                const Essays = reviewDoc.essays.map((essay) => {
                  return {
                    ...essay,
                    comments: [...essay.comments, { comment: "" }],
                  };
                });

                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "resolved",
                  });

                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/essays", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        status: "resolved",
                        submitted: false,
                        essays: Essays,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }
                        toast.success(`Review has been resolved`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("resolved");
                        setReviewDoc({
                          ...reviewDoc,
                          essays: Essays,
                        });
                      })
                      .catch((error) => {
                        console.log("Error: ", error);
                        toast.error(`${error.response.data.message}`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  console.log(error);
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }

              async function reReviewEssay() {
                setLoading(true);
                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "unresolved",
                  });
                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/essays", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        status: "unresolved",
                        submitted: true,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }

                        toast.success(
                          `You can review this ${review.onModel} again`,
                          {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        );
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("unresolved");
                        setReviewDoc({
                          ...reviewDoc,
                          id: reviewDoc._id,
                          status: "unresolved",
                          submitted: true,
                        });
                      })
                      .catch((error) => console.log("Error: ", error))
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }

              // ------------------Essayas functions ends------------ //

              // ------------------Recommendation functions starts------------ //
              function UpdateLetterRate(
                recommendationIndex,
                letterIndex,
                text
              ) {
                let updatedRecommendations = [...reviewDoc.recommendations];
                let updatedRecommendation = {
                  ...updatedRecommendations[recommendationIndex],
                };
                let updatedLetter = [...updatedRecommendation.letters];

                updatedLetter[letterIndex] = {
                  ...updatedLetter[letterIndex],
                  rate: text,
                };

                updatedRecommendation = {
                  ...updatedRecommendation,
                  letters: updatedLetter,
                };

                updatedRecommendations[recommendationIndex] =
                  updatedRecommendation;

                setReviewDoc({
                  ...reviewDoc,
                  recommendations: updatedRecommendations,
                });
              }

              function UpdateLetterComment(
                e,
                recommendationIndex,
                letterIndex
              ) {
                let updatedRecommendations = [...reviewDoc.recommendations];
                let updatedRecommendation = {
                  ...updatedRecommendations[recommendationIndex],
                };
                let updatedLetters = [...updatedRecommendation.letters];
                let updatedLetter = { ...updatedLetters[letterIndex] };

                let updatedComments = [...updatedLetter.comments];
                let updatedComment = {
                  ...updatedComments[updatedComments.length - 1],
                };
                updatedComment = {
                  ...updatedComment,
                  comment: e.target.value,
                };

                updatedComments[updatedComments.length - 1] = updatedComment;
                updatedLetter = {
                  ...updatedLetter,
                  comments: updatedComments,
                };

                updatedLetters[letterIndex] = updatedLetter;
                updatedRecommendation = {
                  ...updatedRecommendation,
                  letters: updatedLetters,
                };

                updatedRecommendations[recommendationIndex] =
                  updatedRecommendation;

                setReviewDoc({
                  ...reviewDoc,
                  recommendations: updatedRecommendations,
                });
              }

              async function DoneReviewRecommendation() {
                setLoading(true);
                const Recommendations = reviewDoc.recommendations.map(
                  (recommendation) => {
                    let letters = recommendation.letters.map(
                      (letter, index) => {
                        return {
                          ...letter,
                          comments: [...letter.comments, { comment: "" }],
                        };
                      }
                    );

                    return {
                      ...recommendation,
                      letters: letters,
                    };
                  }
                );

                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "resolved",
                  });

                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/recommendations", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        status: "resolved",
                        submitted: false,
                        recommendations: Recommendations,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }
                        toast.success(`Review has been resolved`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("resolved");
                        setReviewDoc({
                          ...reviewDoc,
                          recommendations: Recommendations,
                        });
                      })
                      .catch((error) => {
                        console.log("Error: ", error);
                        toast.error(`${error.response.data.message}`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  console.log(error);
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }

              async function reReviewRecommendation() {
                setLoading(true);
                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "unresolved",
                  });
                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/recommendations", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        status: "unresolved",
                        submitted: true,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }

                        toast.success(
                          `You can review this ${review.onModel} again`,
                          {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        );
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("unresolved");
                        setReviewDoc({
                          ...reviewDoc,
                          id: reviewDoc._id,
                          status: "unresolved",
                          submitted: true,
                        });
                      })
                      .catch((error) => console.log("Error: ", error))
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }

              // ------------------Recommendations functions ends------------ //

              // ------------------Essayas functions starts------------ //
              function UpdateAidRate(index, text) {
                const updatedAids = [...reviewDoc.aids];
                updatedAids[index] = {
                  ...updatedAids[index],
                  rate: text,
                };
                setReviewDoc({ ...reviewDoc, aids: updatedAids });
              }

              function UpdateAidComment(e, index) {
                const updatedAids = [...reviewDoc.aids];
                const updatedComment = [...updatedAids[index].comments];
                updatedComment[updatedComment.length - 1] = {
                  ...updatedComment[updatedComment.length - 1],
                  comment: e.target.value,
                  timeDate: new Date(),
                };
                updatedAids[index] = {
                  ...updatedAids[index],
                  comments: updatedComment,
                };

                setReviewDoc({ ...reviewDoc, aids: updatedAids });
              }

              async function DoneReviewAid() {
                setLoading(true);
                const Aids = reviewDoc.aids.map((aid) => {
                  return {
                    ...aid,
                    comments: [...aid.comments, { comment: "" }],
                  };
                });

                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "resolved",
                  });

                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/aids", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        status: "resolved",
                        submitted: false,
                        aids: Aids,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }
                        toast.success(`Review has been resolved`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("resolved");
                        setReviewDoc({
                          ...reviewDoc,
                          aids: Aids,
                        });
                      })
                      .catch((error) => {
                        console.log("Error: ", error);
                        toast.error(`${error.response.data.message}`, {
                          position: "bottom-right",
                          autoClose: 5000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  console.log(error);
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }

              async function reReviewAid() {
                setLoading(true);
                try {
                  let res = await updateReview({
                    ...review,
                    id: review._id,
                    status: "unresolved",
                  });
                  if (res.data) {
                    await axios
                      .patch("http://localhost:5000/aids", {
                        ...reviewDoc,
                        id: reviewDoc._id,
                        status: "unresolved",
                        submitted: true,
                      })
                      .then((res) => {
                        if (!res.status == 200) {
                          toast.error(`Error occured try again!!`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        }

                        toast.success(
                          `You can review this ${review.onModel} again`,
                          {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        );
                      })
                      .then(() => {
                        setLoading(false);
                        setStatus("unresolved");
                        setReviewDoc({
                          ...reviewDoc,
                          id: reviewDoc._id,
                          status: "unresolved",
                          submitted: true,
                        });
                      })
                      .catch((error) => console.log("Error: ", error))
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                } catch (error) {
                  toast.error(`${error.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setLoading(false);
                }
              }

              //Render according document type
              //Render Honors

              if (loading) {
                return <CoverLoaderMedium />;
              }

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

                      {status == "resolved" ? (
                        <div className="flex flex-row items-center gap-x-3">
                          <h2 className="flex flex-row gap-x-2 text-emerald-600 font-bold text-20 items-center">
                            <HiBadgeCheck /> Resolved
                          </h2>
                          <button
                            className="px-2 py-1 font-bold bg-MdBlue text-white rounded-md"
                            onClick={() => reReviewHonor()}
                          >
                            Re-review
                          </button>
                        </div>
                      ) : (
                        <button
                          className="flex flex-row gap-x-1 items-center capitalize py-1 px-2 bg-MdBlue font-bold text-white rounded-md"
                          onClick={() => DoneReviewHonor()}
                        >
                          <HiCheck /> Done review
                        </button>
                      )}
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
                                className={`text-red-500  font-bold px-2 border-2 rounded-md border-red-500 cursor-pointer ${
                                  honor.rate == "bad"
                                    ? "bg-red-500 text-white"
                                    : null
                                }`}
                                onClick={() => UpdateHonorRate(index, "bad")}
                              >
                                Bad
                              </span>
                              <span
                                className={`text-blue-500  font-bold px-2 border-2 rounded-md border-blue-500 cursor-pointer ${
                                  honor.rate == "normal"
                                    ? "bg-blue-500 text-white"
                                    : null
                                }`}
                                onClick={() => UpdateHonorRate(index, "normal")}
                              >
                                Normal
                              </span>
                              <span
                                className={`text-emerald-500  font-bold px-2 border-2 rounded-md border-emerald-500 cursor-pointer ${
                                  honor.rate == "good"
                                    ? "bg-emerald-500 text-white"
                                    : null
                                }`}
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
                                value={
                                  honor.comments[honor.comments.length - 1]
                                    .comment
                                }
                                className="w-full md:w-8/12 resize-none border-2 border-blue-400 p-3"
                                rows="10"
                                onChange={(e) => UpdateHonorComment(e, index)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        {/* Previous Comments here */}
                        <div className="w-full md:w-4/12 py-2 bg-slate-200 flex flex-col px-2 h-96 overflow-y-auto mt-3 overflow-x-hidden">
                          <h2 className="self-center font-bold capitalize">
                            Your Previous comments
                          </h2>
                          {honor.comments.map((comment) => {
                            if (comment.comment !== "" && comment.comment) {
                              const lines = comment.comment.split("\n");
                              const commentParagraphs = lines.map(
                                (line, index) => (
                                  <span
                                    className="mt-1 w-full overflow-x-hidden"
                                    key={index}
                                  >
                                    {line}
                                  </span>
                                )
                              );

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
                      <h1 className="capitalize flex-col flex">
                        <span className="font-bold">
                          {`submitted by: ${review.user.firstName} ${review.user.lastName}`}
                        </span>
                        <span className="text-gray-700 font-semibold">
                          {`from: ${review.user.school}`}
                        </span>
                      </h1>

                      {status == "resolved" ? (
                        <div className="flex flex-row items-center gap-x-3">
                          <h2 className="flex flex-row gap-x-2 text-emerald-600 font-bold text-20 items-center">
                            <HiBadgeCheck /> Resolved
                          </h2>
                          <button
                            className="px-2 py-1 font-bold bg-MdBlue text-white rounded-md"
                            onClick={() => reReviewActivity()}
                          >
                            Re-review
                          </button>
                        </div>
                      ) : (
                        <button
                          className="flex flex-row gap-x-1 items-center capitalize py-1 px-2 bg-MdBlue font-bold text-white rounded-md"
                          onClick={() => DoneReviewActivity()}
                        >
                          <HiCheck /> Done review
                        </button>
                      )}
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
                              {activity.rate == "notRated"
                                ? "Not rated"
                                : activity.rate}
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
                                {activity.participstedAllYear && (
                                  <span> Year </span>
                                )}
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
                          <div className="w-full flex flex-row px-2 gap-x-5 mt-5">
                            <span
                              className={`text-red-500  font-bold px-2 border-2 rounded-md border-red-500 cursor-pointer ${
                                activity.rate == "bad"
                                  ? "bg-red-500 text-white"
                                  : null
                              }`}
                              // onClick={() => UpdateActivityRate(index, "bad")}
                            >
                              Bad
                            </span>
                            <span
                              className={`text-blue-500  font-bold px-2 border-2 rounded-md border-blue-500 cursor-pointer ${
                                activity.rate == "normal"
                                  ? "bg-blue-500 text-white"
                                  : null
                              }`}
                              onClick={() =>
                                UpdateActivityRate(index, "normal")
                              }
                            >
                              Normal
                            </span>
                            <span
                              className={`text-emerald-500  font-bold px-2 border-2 rounded-md border-emerald-500 cursor-pointer ${
                                activity.rate == "good"
                                  ? "bg-emerald-500 text-white"
                                  : null
                              }`}
                              // onClick={() => UpdateActivityRate(index, "good")}
                            >
                              Good
                            </span>
                          </div>
                          <div className="w-full flex flex-col px-2">
                            <h2 className="mt-10">Add comment here</h2>

                            <textarea
                              name="comment"
                              id="comment"
                              value={
                                activity.comments[activity.comments.length - 1]
                                  .comment
                              }
                              className="w-full md:w-8/12 resize-none border-2 border-blue-400 p-3"
                              rows="10"
                              onChange={(e) => UpdateActivityComment(e, index)}
                            ></textarea>
                          </div>
                        </div>

                        <div className="w-full md:w-4/12 py-2 bg-slate-200 flex flex-col px-2 h-96 overflow-y-auto mt-5">
                          <h2 className="self-center font-bold capitalize">
                            Your Previous comments
                          </h2>

                          {activity.comments.map((comment) => {
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
                      <h1 className="capitalize flex-col flex">
                        <span className="font-bold">
                          {`submitted by: ${review.user.firstName} ${review.user.lastName}`}
                        </span>
                        <span className="text-gray-700 font-semibold">
                          {`from: ${review.user.school}`}
                        </span>
                      </h1>

                      {status == "resolved" ? (
                        <div className="flex flex-row items-center gap-x-3">
                          <h2 className="flex flex-row gap-x-2 text-emerald-600 font-bold text-20 items-center">
                            <HiBadgeCheck /> Resolved
                          </h2>
                          <button
                            className="px-2 py-1 font-bold bg-MdBlue text-white rounded-md"
                            onClick={() => reReviewEssay()}
                          >
                            Re-review
                          </button>
                        </div>
                      ) : (
                        <button
                          className="flex flex-row gap-x-1 items-center capitalize py-1 px-2 bg-MdBlue font-bold text-white rounded-md"
                          onClick={() => DoneReviewEssay()}
                        >
                          <HiCheck /> Done review
                        </button>
                      )}
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
                                {essay.rate == "notRated"
                                  ? "Not rated"
                                  : essay.rate}
                              </span>
                            </h2>

                            <h2 className="font-bold mt-2">{essay.question}</h2>

                            <div className="w-full mt-4">{essayParagraphs}</div>

                            <div className="w-full flex flex-row px-2 gap-x-5 mt-5">
                              <span
                                className={`text-red-500  font-bold px-2 border-2 rounded-md border-red-500 cursor-pointer ${
                                  essay.rate == "bad"
                                    ? "bg-red-500 text-white"
                                    : null
                                }`}
                                onClick={() => UpdateEssayRate(index, "bad")}
                              >
                                Bad
                              </span>
                              <span
                                className={`text-blue-500  font-bold px-2 border-2 rounded-md border-blue-500 cursor-pointer ${
                                  essay.rate == "normal"
                                    ? "bg-blue-500 text-white"
                                    : null
                                }`}
                                onClick={() => UpdateEssayRate(index, "normal")}
                              >
                                Normal
                              </span>
                              <span
                                className={`text-emerald-500  font-bold px-2 border-2 rounded-md border-emerald-500 cursor-pointer ${
                                  essay.rate == "good"
                                    ? "bg-emerald-500 text-white"
                                    : null
                                }`}
                                onClick={() => UpdateEssayRate(index, "good")}
                              >
                                Good
                              </span>
                            </div>

                            <div className="w-full flex flex-col px-2">
                              <h2 className="mt-10">Add comment here</h2>

                              <textarea
                                name="comment"
                                id="comment"
                                value={
                                  essay.comments[essay.comments.length - 1]
                                    .comment
                                }
                                className="w-full md:w-8/12 resize-none border-2 border-blue-400 p-3"
                                rows="10"
                                onChange={(e) => UpdateEssayComment(e, index)}
                              ></textarea>
                            </div>
                          </div>

                          <div className="w-full md:w-4/12 py-2 bg-slate-200 flex flex-col px-2 h-96 overflow-y-auto mt-5 overflow-x-hidden">
                            <h2 className="self-center font-bold capitalize">
                              Your Previous comments
                            </h2>

                            {essay.comments.map((comment) => {
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
                      );
                    })}
                  </>
                );
              }

              if (DocumentType == "Recommendation") {
                content = (
                  <>
                    <h1 className="self-center text-2xl font-bold text-MdBlue">
                      All Recommendation
                    </h1>
                    <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2 md:justify-between justify-around items-center w-full flex-wrap gap-y-2 mt-5   sticky -top-5">
                      <h1 className="capitalize flex-col flex">
                        <span className="font-bold">
                          {`submitted by: ${review.user.firstName} ${review.user.lastName}`}
                        </span>
                        <span className="text-gray-700 font-semibold">
                          {`from: ${review.user.school}`}
                        </span>
                      </h1>

                      {status == "resolved" ? (
                        <div className="flex flex-row items-center gap-x-3">
                          <h2 className="flex flex-row gap-x-2 text-emerald-600 font-bold text-20 items-center">
                            <HiBadgeCheck /> Resolved
                          </h2>
                          <button
                            className="px-2 py-1 font-bold bg-MdBlue text-white rounded-md"
                            onClick={() => reReviewRecommendation()}
                          >
                            Re-review
                          </button>
                        </div>
                      ) : (
                        <button
                          className="flex flex-row gap-x-1 items-center capitalize py-1 px-2 bg-MdBlue font-bold text-white rounded-md"
                          onClick={() => DoneReviewRecommendation()}
                        >
                          <HiCheck /> Done review
                        </button>
                      )}
                    </div>

                    {reviewDoc.recommendations.map(
                      (recommendation, recoIndex) => {
                        return (
                          <div
                            className="flex w-full flex-col py-1 bg-slate-100 mt-10"
                            key={recommendation._id}
                          >
                            <h2 className="text-20 text-black font-bold  capitalize">{`${recommendation.recommenderName}'s recommendation letters`}</h2>

                            {recommendation.letters.map(
                              (letter, letterIndex) => {
                                const lines = letter.letter.split("\n");
                                const letterParagraphs = lines.map(
                                  (line, index) => (
                                    <p className="mt-3" key={index}>
                                      {line}
                                    </p>
                                  )
                                );
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
                                      <div className="w-full mt-4">
                                        {letterParagraphs}
                                      </div>

                                      <div className="w-full flex flex-row px-2 gap-x-5 mt-5">
                                        <span
                                          className={`text-red-500  font-bold px-2 border-2 rounded-md border-red-500 cursor-pointer ${
                                            letter.rate == "bad"
                                              ? "bg-red-500 text-white"
                                              : null
                                          }`}
                                          onClick={() =>
                                            UpdateLetterRate(
                                              recoIndex,
                                              letterIndex,
                                              "bad"
                                            )
                                          }
                                        >
                                          Bad
                                        </span>
                                        <span
                                          className={`text-blue-500  font-bold px-2 border-2 rounded-md border-blue-500 cursor-pointer ${
                                            letter.rate == "normal"
                                              ? "bg-blue-500 text-white"
                                              : null
                                          }`}
                                          onClick={() =>
                                            UpdateLetterRate(
                                              recoIndex,
                                              letterIndex,
                                              "normal"
                                            )
                                          }
                                        >
                                          Normal
                                        </span>
                                        <span
                                          className={`text-emerald-500  font-bold px-2 border-2 rounded-md border-emerald-500 cursor-pointer ${
                                            letter.rate == "good"
                                              ? "bg-emerald-500 text-white"
                                              : null
                                          }`}
                                          onClick={() =>
                                            UpdateLetterRate(
                                              recoIndex,
                                              letterIndex,
                                              "good"
                                            )
                                          }
                                        >
                                          Good
                                        </span>
                                      </div>

                                      <div className="w-full flex flex-col px-2">
                                        <h2 className="mt-10">
                                          Add comment here
                                        </h2>

                                        <textarea
                                          name="comment"
                                          id="comment"
                                          value={
                                            letter.comments[
                                              letter.comments.length - 1
                                            ].comment
                                          }
                                          className="w-full md:w-8/12 resize-none border-2 border-blue-400 p-3"
                                          rows="10"
                                          onChange={(e) =>
                                            UpdateLetterComment(
                                              e,
                                              recoIndex,
                                              letterIndex
                                            )
                                          }
                                        ></textarea>
                                      </div>
                                    </div>

                                    <div className="w-full md:w-4/12 py-2 bg-slate-300 flex flex-col px-2 h-96 overflow-y-auto mt-5 overflow-x-hidden">
                                      <h2 className="self-center font-bold capitalize">
                                        Your Previous comments
                                      </h2>

                                      {letter.comments.map((comment) => {
                                        if (
                                          comment.comment !== "" &&
                                          comment.comment
                                        ) {
                                          const lines =
                                            comment.comment.split("\n");
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
                              }
                            )}
                          </div>
                        );
                      }
                    )}
                  </>
                );
              }

              if (DocumentType == "Aid") {
                content = (
                  <>
                    <h1 className="self-center text-2xl font-bold text-MdBlue">
                      All Financial Aids Documents
                    </h1>
                    <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2 md:justify-between justify-around items-center w-full flex-wrap gap-y-2 mt-5   sticky -top-5">
                      <h1 className="capitalize flex-col flex">
                        <span className="font-bold">
                          {`submitted by: ${review.user.firstName} ${review.user.lastName}`}
                        </span>
                        <span className="text-gray-700 font-semibold">
                          {`from: ${review.user.school}`}
                        </span>
                      </h1>

                      {status == "resolved" ? (
                        <div className="flex flex-row items-center gap-x-3">
                          <h2 className="flex flex-row gap-x-2 text-emerald-600 font-bold text-20 items-center">
                            <HiBadgeCheck /> Resolved
                          </h2>
                          <button
                            className="px-2 py-1 font-bold bg-MdBlue text-white rounded-md"
                            onClick={() => reReviewAid()}
                          >
                            Re-review
                          </button>
                        </div>
                      ) : (
                        <button
                          className="flex flex-row gap-x-1 items-center capitalize py-1 px-2 bg-MdBlue font-bold text-white rounded-md"
                          onClick={() => DoneReviewAid()}
                        >
                          <HiCheck /> Done review
                        </button>
                      )}
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
                                {aid.rate == "notRated"
                                  ? "Not rated"
                                  : aid.rate}
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

                            <div className="w-full flex flex-row px-2 gap-x-5 mt-10">
                              <span
                                className={`text-red-500 font-bold px-2 border-2 rounded-md border-red-500 cursor-pointer ${
                                  aid.rate == "bad"
                                    ? "bg-red-500 text-white"
                                    : null
                                }`}
                                onClick={() => UpdateAidRate(index, "bad")}
                              >
                                Bad
                              </span>
                              <span
                                className={`text-blue-500  font-bold px-2 border-2 rounded-md border-blue-500 cursor-pointer ${
                                  aid.rate == "normal"
                                    ? "bg-blue-500 text-white"
                                    : null
                                }`}
                                onClick={() => UpdateAidRate(index, "normal")}
                              >
                                Normal
                              </span>
                              <span
                                className={`text-emerald-500  font-bold px-2 border-2 rounded-md border-emerald-500 cursor-pointer ${
                                  aid.rate == "good"
                                    ? "bg-emerald-500 text-white"
                                    : null
                                }`}
                                onClick={() => UpdateAidRate(index, "good")}
                              >
                                Good
                              </span>
                            </div>

                            <div className="w-full flex flex-col px-2">
                              <h2 className="mt-10">Add comment here</h2>

                              <textarea
                                name="comment"
                                id="comment"
                                value={
                                  aid.comments[aid.comments.length - 1].comment
                                }
                                className="w-full md:w-8/12 resize-none border-2 border-blue-400 p-3"
                                rows="10"
                                onChange={(e) => UpdateAidComment(e, index)}
                              ></textarea>
                            </div>
                          </div>

                          <div className="w-full md:w-4/12 py-2 bg-slate-300 flex flex-col px-2 h-96 overflow-y-auto mt-10 overflow-x-hidden">
                            <h2 className="self-center font-bold capitalize">
                              Your Previous comments
                            </h2>
                          {aid.comments.map((comment) => {
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
                  </>
                );
              }

              return content;
            }}
          </Await>
        </Suspense>
      </Page>
      <ToastContainer />
    </>
  );
}

export default ReviewDetails;

export function SpecficReviewLoader({ params }) {
  return defer({ review: getASpecificReview(params.id) });
}
