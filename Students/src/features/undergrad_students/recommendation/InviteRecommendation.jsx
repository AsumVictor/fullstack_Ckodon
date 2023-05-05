import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Lottie from "lottie-react";
import NoContent from "../../../components/indications/noContent";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi2";
import Page from "../../../components/shared/page";
import useAuth from "../../../hooks/useAuth";
import {
  useGetRecommendationByUserQuery,
  useAddNewRecommendationMutation,
  useUpdateRecommendationMutation,
} from "../../../apiSlice/recommendationSlice";
import {
  useGetReviewByDocumentQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useAddNewReviewMutation,
} from "../../../apiSlice/reviewsApiSlice";
import { CoverLoaderMedium } from "../../../components/loaders/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalBox, {
  ModalBody,
  ModalFooter,
} from "../../../components/modal.js/ModalBox";
import TextareaAutosize from "react-textarea-autosize";

export default function InviteRecommendation() {
  const student = useAuth();

  const {
    data: recommendationlist,
    isLoading: fetchLoading,
    isSuccess,
    isError,
    error,
  } = useGetRecommendationByUserQuery(student.id);
  const [addnewRecommendation, { isLoading: addLoading }] =
    useAddNewRecommendationMutation();
  const [updateRecommendation, { isLoading: updateLoading }] =
    useUpdateRecommendationMutation();
  const { data: userReview } = useGetReviewByDocumentQuery(
    recommendationlist?._id
  );
  const [updateReview] = useUpdateReviewMutation();
  const [addReview, { isLoading: addReviewLoad }] = useAddNewReviewMutation();
  const [deleteReview, { isLoading: deleteReviewLoad }] =
    useDeleteReviewMutation();
  const loading =
    fetchLoading ||
    addLoading ||
    updateLoading ||
    addReviewLoad ||
    deleteReviewLoad;
  const [Recommendation, setRecommendation] = useState(null);
  const [readyToAddRecommender, setReadyToAddRecommender] = useState(false);
  const [recommender, setRecommender] = useState("");
  useEffect(() => {
    if (recommendationlist) {
      setRecommendation({ ...recommendationlist });
    }
  }, [recommendationlist]);

  if (!Recommendation) {
    return (
      <>
        <div className="flex flex-col">
          <NoContent message={`You have added recommendation yet`} />
          <div
            className="cursor-pointer border-2 py-2 px-4 rounded-md border-MdBlue hover:bg-MdBlue hover:text-white active:scale-95 flex flex-row items-center mt-10 font-bold text-MdBlue text-18 md:text-20 self-center"
            onClick={CreatNewRecommendationList}
          >
            <HiOutlinePlus /> <span> Create new recommendations list</span>
          </div>
        </div>
        <ToastContainer />
        {loading && (
          <CoverLoaderMedium
            styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
        )}
      </>
    );
  }


  async function CreatNewRecommendationList() {
    try {
      const res = await addnewRecommendation({
        user: student.id,
        status: "unresolved",
        submitted: false,
        recommendations: [],
        submittedBefore: false,
      });

      if (res.data) {
        toast.success("You have created your recommendation list", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      if (res.error) {
        toast.error(res.error.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`Error occured! Please try again`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  //Handle Lettes change
  function hanldeLetterChange(e, index, letterIndex) {
    setRecommendation(prev=>{
      let newRecommendation = { ...prev };
      let recommendations = [...newRecommendation.recommendations];
      let currentRecommender = { ...recommendations[index] };
      let letters = [...currentRecommender.letters];
      letters[letterIndex] = {
        ...letters[letterIndex],
        letter: e.target.value,
      }
      recommendations[index] = {
        ... recommendations[index],
        letters: letters,
      }

      return {
...newRecommendation,
recommendations: recommendations,
      }
    })

    
    
  }

  //Delete recommendation Letter
  async function deleteletter(letterIndex, Recommendationindex) {
    let newRecommendation = { ...Recommendation };
    let recommendation = [...newRecommendation.recommendations];
    let letters = [...recommendation[Recommendationindex].letters];
    let updatedLetter = letters.filter(
      (child) => letters.indexOf(child) !== letterIndex
    );


    recommendation[Recommendationindex] = {
      ...recommendation[Recommendationindex],
      letters: updatedLetter,
    }

    try {
      const res = await updateRecommendation({
        ...Recommendation,
        id: Recommendation._id,
        recommendations: recommendation,
      });

      if (res.data) {
        toast.warn(`You have deleted ${recommendation[Recommendationindex].recommenderName}'s letter ${letterIndex + 1}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      if (res.error) {
        toast.error(res.error.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`Error occured! Please try again`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    
  }

  async function addLetter(index) {
    let newRecommendation = { ...Recommendation };
    let recommendation = [...newRecommendation.recommendations];
    let currentRecommender = { ...recommendation[index] };
    let letters = [...currentRecommender.letters];
    letters.push({
      letter: "",
      rate: "notRated",
      comments: [{ comment: "" }],
    });

    currentRecommender = {
      ...currentRecommender,
      letters: letters,
    };

    recommendation[index] = currentRecommender;

    try {
      const res = await updateRecommendation({
        ...Recommendation,
        id: Recommendation._id,
        recommendations: recommendation,
      });

      if (res.data) {
        toast.info(
          `You have added new letter to the ${currentRecommender.recommenderName}'s letters`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }

      if (res.error) {
        toast.error(res.error.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`Error occured! Please try again`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  async function addNewRecommender() {
    let currentRecommendation = [...Recommendation.recommendations];
    const newRecommendation = {
      recommenderName: recommender,
      voiceNOtes: [],
      additionalDocs: [],
      letters: [],
    };
    currentRecommendation.push(newRecommendation);

    try {
      const res = await updateRecommendation({
        ...Recommendation,
        id: Recommendation._id,
        recommendations: currentRecommendation,
      });
      console.log(res);

      if (res.data) {
        setRecommender("");
        setReadyToAddRecommender(false);
        toast.success("New school new recommender to your list", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      if (res.error) {
        console.log(res);
        toast.error(res.error.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error occured! Please try again`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  async function deleteRecommender(index) {
    let newRecommendation = { ...Recommendation };
    let recommendation = [...newRecommendation.recommendations];
    const updatedRecommendation = recommendation.filter(
      (child) => recommendation.indexOf(child) !== index
    );
    try {
      const res = await updateRecommendation({
        ...Recommendation,
        id: Recommendation._id,
        recommendations: updatedRecommendation,
      });

      if (res.data) {
        toast.warn("You have deleted a recommendation from the list", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      if (res.error) {
        toast.error(res.error.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`Error occured! Please try again`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  //Handle form Submit
  async function submitToReview() {
    try {
      let response =  await addReview({
        deadline: null,
        status: "unresolved",
        documentId: Recommendation._id,
        onModel: "Recommendation",
        user: Recommendation.user,
      });

      if (response.data) {
        let res = await updateRecommendation({
          ...Recommendation,
          id: Recommendation._id,
          submitted: true,
          submittedBefore: true,
        });

        if (res.data) {
          toast.success(`You have Submitted your recommendations for review.`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(`${res.error.data.message}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } else {
        toast.error(`${response.error.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

 async function saveChanges() {
    try {
      const res = await updateRecommendation({
        ...Recommendation,
        id: Recommendation._id,
      });

      if (res.data) {
        toast.success("Changes saved successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      if (res.error) {
        toast.error(res.error.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`Error occured! Please try again`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
 

  async function withdraw() {
    try {
     let response = await deleteReview(Recommendation._id)
     console.log(response)
     if (response.data) {
       let res = await updateRecommendation({
         ...Recommendation,
         id: Recommendation._id,
         submitted: false,
         submittedBefore: false,
       });
 
       if (res.data) {
         toast.warn(`You have withdraw your recommendations for review.`, {
           position: "bottom-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
         });
       } else {
         toast.error(`${res.error.data.message}`, {
           position: "bottom-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
         });
       }
     } else {
       toast.error(`${response.error.data.message}`, {
         position: "bottom-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
       });
     }

    } catch (error) {
      console.log(error)
      toast.error(`Error Occured! Try again later`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
   }

  if (Recommendation.submitted) {
    return (
      <>
        <div className="flex flex-col">
          <h1 className="mt-10 text-center px-3 font-bold text-2xl md:px-10">
            You have submitted your recommendations and it's under-review.
          </h1>
          <button
            className="mt-10 py-2 px-4 bg-red-900 active:scale-105 hover:bg-red-700 text-white rounded-md self-center font-bold"
            onClick={withdraw}
          >
            Withdraw
          </button>
        </div>
        <ToastContainer />
        {loading && (
          <CoverLoaderMedium
            styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
        )}
      </>
    );
  }


  return (
    <>
      <Page>
        <div className="w-full px-0 flex flex-col">
          <h1 className="self-center mt-2 text-2xl text-MdBlue font-semibold">
            My recommendation letters
          </h1>
          {/* Form Data of Activity*/}
          <div className="self-center w-full md:w-10/12 flex items-center flex-col pb-20">
            {/* Activity Header */}
            
          </div>

          {Recommendation.recommendations.map(
            (recommendation, Recommendationindex) => (
              <div
                key={recommendation._id}
                className="flex flex-col w-full border-2 border-MdBlue pb-10 rounded-md overflow-hidden px-2 md:px-10"
              >
                <aside className="flex flex-row relative justify-between w-full py-3 bg-MdBlue items-center px-2 md:px-10 rounded-b-lg">
                  <h3 className="text-white font-bold text-15">
                    {recommendation.recommenderName}
                  </h3>
                  <h3 className="text-white font-bold text-15">Status</h3>
                  <button
                    type="button"
                    onClick={() => deleteRecommender(Recommendationindex)}
                    className="py-1 px-2 bg-red-100 text-red-600 font-bold text-2xl mx-2 rounded-md"
                  >
                    <HiOutlineTrash />
                  </button>
                </aside>

                {/* Recommendation Letter*/}
                <div className="flex w-full flex-wrap px-2 justify-between md:px-10">
                  {recommendation.letters.map((letter, letterIndex) => (
                    <label className="w-full mt-5" key={letter._id}>
                      <div className="flex flex-row px-1 md:px-5 py-2 justify-between items-center bg-MdBlue text-white">
                        <div className="font-bold">{`${recommendation.recommenderName}'s letter ${
                          letterIndex + 1
                        } `}</div>
                        <button
                          type="button"
                          onClick={() =>
                            deleteletter(letterIndex, Recommendationindex)
                          }
                          className="py-1 px-2 bg-red-100 text-red-600 font-bold text-2xl mx-2 rounded-md"
                        >
                          <HiOutlineTrash />
                        </button>
                      </div>
                      <TextareaAutosize
                        minRows={15}
                        className="w-full mt-5 resize-none border-2 p-3 rounded-md"
                        placeholder="Paste the Draft letter here"
                        value={letter.letter}
                        name="letter"
                        onChange={(e) =>
                          hanldeLetterChange(e, Recommendationindex, letterIndex)
                        }
                      />
                    </label>
                  ))}
                </div>

                <div
                  className="px-5 py-2 bg-white hover:bg-MdBlue hover:text-white flex flex-row
                     justify-center items-center text-MdBlue font-bold rounded-md
                     mx-5 mt-10 self-center"
                  onClick={() => addLetter(Recommendationindex)}
                >
                  <HiOutlinePlus />
                  Add New Letter
                </div>
              </div>
            )
          )}

          {/* Button to new recommendation */}
          <div
            className="cursor-pointer self-center flex flex-row items-center mt-3 font-semibold text-MdBlue text-18 md:text-20"
            onClick={() => setReadyToAddRecommender(true)}
          >
            <HiOutlinePlus /> <span>Add new Recommender</span>
          </div>

          <button
            type="button"
             onClick={saveChanges}
            className="self-end mr-20 bg-MdBlue text-white px-3 py-1 rounded-md mt-4"
          >
            Save Changes
          </button>

          {/* Submit when Activity is 10 or more */}
          {/* Submit when Honor is 5 or more and Activity is 10 or more */}
          {recommendationlist.recommendations.length &&
            !recommendationlist.submittedBefore && (
              <button
                className="capitalize px-5 flex flex-row justify-center items-center disabled:bg-gray-400 py-2 bg-MdBlue rounded-md text-white font-bold mt-20"
                type="submit"
                 onClick={submitToReview}
              >
                {loading ? <>Submitting...</> : <>Submit for review </>}
              </button>
            )}

          {recommendationlist.recommendations.length && recommendationlist.submittedBefore && (
            <button
              className="capitalize px-5 flex flex-row justify-center items-center disabled:bg-red-400 py-2 bg-MdBlue rounded-md text-white font-bold mt-20"
              type="submit"
              // onClick={submitToReviewAnother}
            >
              {loading ? <>Submitting...</> : <>Submit for review </>}
            </button>
          )}
        </div>
      </Page>
      {readyToAddRecommender && (
        <ModalBox modalHeader="Invite Recommender">
          <ModalBody>
            <label
              for="recommender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              id="recommender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setRecommender(e.target.value)}
            >
              <option selected value="">
                Choose a Recommender
              </option>
              <option value="counselor" selected={recommender == "counselor"}>
                Counselor
              </option>
              <option value="teacher" selected={recommender == "teacher"}>
                Teacher
              </option>
              <option value="peer" selected={recommender == "peer"}>
                Peer
              </option>
              <option value="others" selected={recommender == "others"}>
                Others
              </option>
            </select>
          </ModalBody>
          <ModalFooter class="py-2 justify-end px-4">
            <button
              className="py-2 px-3 mx-3 font-bold text-pink-700 rounded-md disabled:text-gray-300 disabled:cursor-not-allowed"
              onClick={() => setReadyToAddRecommender(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="py-2 px-3 bg-emerald-700 font-bold text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={addNewRecommender}
              disabled={!recommender || loading}
            >
              {!loading ? "Create recommender" : "Add recommender..."}
            </button>
          </ModalFooter>
        </ModalBox>
      )}
      <ToastContainer />
      {loading && (
        <CoverLoaderMedium
          styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        />
      )}
    </>
  );
}
