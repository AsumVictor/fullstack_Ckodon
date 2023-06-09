import React, { Suspense, useState, useEffect } from "react";

import { getAUserHonor } from "../../../app/api/api";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CoverLoaderMedium } from "../../../components/loaders/loader";
import { nanoid } from "@reduxjs/toolkit";
import NoContent from "../../../components/indications/noContent";
import useAuth from "../../../hooks/useAuth";
import {
  useAddNewHonorMutation,
  useGetHonorByUserQuery,
  useUpdateHonorMutation,
} from "../../../apiSlice/honorSlice";
import {
  useGetReviewByDocumentQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useAddNewReviewMutation,
} from "../../../apiSlice/reviewsApiSlice";

function CreateHonor() {
  const student = useAuth();
  const {
    data: honors,
    isLoading: fetchLoading,
    isSuccess,
    isError,
    error,
  } = useGetHonorByUserQuery(student.id);
  const [addNewHonor, { isLoading: addLoading }] = useAddNewHonorMutation();
  const [updateHonor, { isLoading: updateLoading }] = useUpdateHonorMutation();
  const { data: userReview } = useGetReviewByDocumentQuery(honors?._id);
  const [updateReview] = useUpdateReviewMutation();
  const [addReview, {isLoading: addReviewLoad}] = useAddNewReviewMutation();
  const [deleteReview, {isLoading: deleteReviewLoad}] = useDeleteReviewMutation();
  const [Honors, setHonors] = useState(null);

  useEffect(() => {
    if (honors) {
      setHonors({ ...honors });
    }
  }, [honors]);

  const loading = fetchLoading || addLoading || updateLoading || addReviewLoad || deleteReviewLoad;

  //Create new Honor for new user
  async function createNewHonor() {
    try {
      const res = await addNewHonor({
        user: student.id,
        status: "unresolved",
        submitted: false,
        honors: [
          {
            honorTitle: "",
            didItInGrade9: false,
            didItInGrade10: false,
            didItInGrade11: false,
            didItInGrade12: false,
            didItAfterSchool: false,
            isRecognisedInSchool: false,
            isRecognisedInState: false,
            isRecognisedNational: false,
            isRecognisedInternational: false,
            comments: [
              {
                comment: "",
              },
            ],
            rate: "notRated",
          },
        ],
        voiceNOtes: [],
        additionalDocs: [],
      });

      if (res.data) {
        toast.success("Honor has been Created successfully", {
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

  if (!Honors) {
    return (
      <>
        <div className="flex flex-col">
          <NoContent message={`You Don't have an honor yet`} />
          <div
            className="cursor-pointer border-2 py-2 px-4 rounded-md border-MdBlue hover:bg-MdBlue hover:text-white active:scale-95 flex flex-row items-center mt-10 font-bold text-MdBlue text-18 md:text-20 self-center"
            onClick={createNewHonor}
          >
            <HiOutlinePlus /> <span> Create new Honor</span>
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

  //When honor is submitted

 

  if (Honors.submitted) {
    return (
      <>
        <div className="flex flex-col">
          <h1 className="mt-10 text-center px-3 font-bold text-2xl md:px-10">
            You have submitted your honor and it's under-review by Selorm
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
  //Honor changes managemnt
  const handleHonorChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    setHonors((prevState) => {
      let newState = { ...prevState };
      let updatedHonor = [...newState.honors];
      let currentHonor = { ...updatedHonor[index] };
      currentHonor = {
        ...currentHonor,
        [name]: type == "checkbox" ? checked : value,
      };
      console.log(newState);
      updatedHonor[index] = currentHonor;
      newState = {
        ...newState,
        honors: updatedHonor,
      };
      return newState;
    });
  };

  //deleting Honor
  async function deleteHonor(index) {
    let newHonorObj = { ...Honors };
    let honors = newHonorObj.honors;

    const updateHhonors = honors.filter(
      (child) => honors.indexOf(child) !== index
    );

    try {
      const res = await updateHonor({
        ...Honors,
        id: Honors._id,
        honors: updateHhonors,
      });

      if (res.data) {
        toast.warn("An honor has been deleted successfully", {
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

  //add new honor
  const addHonor = async () => {
    const newHonor = {
      honorTitle: "",
      didItInGrade9: false,
      didItInGrade10: false,
      didItInGrade11: false,
      didItInGrade12: false,
      didItAfterSchool: false,
      isRecognisedInSchool: false,
      isRecognisedInState: false,
      isRecognisedNational: false,
      isRecognisedInternational: false,
      comments: [
        {
          comment: "",
        },
      ],
      rate: "notRated",
    };

    let newHonorObj = { ...Honors };
    let updateHhonors = newHonorObj.honors;
    updateHhonors = [...updateHhonors, newHonor];

    try {
      const res = await updateHonor({
        ...Honors,
        id: Honors._id,
        honors: updateHhonors,
      });

      if (res.data) {
        toast.info("New honor has been Created successfully", {
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
  };

  //saveChanges
  async function saveChanges() {
    try {
      const res = await updateHonor({
        ...Honors,
        id: Honors._id,
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

  //update state
  async function submitToReview(e) {
    e.preventDefault()
    try {
      let response = await await addReview({
        deadline: null,
        status: "unresolved",
        documentId: Honors._id,
        onModel: "Honor",
        user: Honors.user,
      });

      if (response.data) {
        let res = await updateHonor({
          ...Honors,
          id: Honors._id,
          submitted: true,
          submittedBefore: true,
        });

        if (res.data) {
          toast.success(`You have Submitted your honor for review.`, {
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

  async function submitToReviewAnother(e) {
    e.preventDefault()
    try {
      let response = await updateReview({
        status: "unresolved",
        document: Honors._id,
        model: "Honor",
        user: Honors.user,
      });

      if (response.data) {
        let res = await updateHonor({
          ...Honors,
          id: Honors._id,
          submitted: true,
        });

        if (res.data) {
          toast.success(`You have Submitted your honor for review.`, {
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


   async function withdraw() {
   try {
    let response = await deleteReview(userReview.documentId)
    if (response.data) {
      let res = await updateHonor({
        ...Honors,
        id: Honors._id,
        submitted: false,
        submittedBefore: false,
      });

      if (res.data) {
        toast.warn(`You have withdraw your honor for review.`, {
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
    
   }
  }

  return (
    <>
      <form className="self-center w-full md:w-8/12 flex items-center flex-col pb-20">
        <div
          className="honors--wrapper w-full flex flex-col justify-start items-center
                              md:w-full border-l-2 border-r-2 border-MdBlue rounded-lg mt-10 overflow-hidden"
        >
          <aside className="flex flex-row relative justify-between w-full py-3 bg-MdBlue items-center pl-3 pr-10 md:px-10">
            <h3 className="text-white font-bold text-20">Honors</h3>
            <h3 className="text-white font-bold text-15">Status</h3>
          </aside>
        </div>

        {Honors.honors.map((Honor, index) => (
          // Each Honor component
          <div
            key={Honor._id}
            className="honor w-full md:w-11/12 bg-white border-2 border-MdBlue py-4 rounded-md mt-10"
          >
            <div className="honor--header flex flex-row relative justify-between w-full items-center px-3 md:px-10">
              <h2 className="text-MdBlue font-bold flex flex-row gap-x-3 items-center">
                <span>{`Honor ${index + 1}`}</span>

                <span
                  className={`capitalize no-underline ${
                    Honor.rate == "bad"
                      ? "text-red-500"
                      : Honor.rate == "good"
                      ? "text-emerald-600"
                      : Honor.rate == " normal"
                      ? "text-blue-500"
                      : null
                  }`}
                >
                  {Honor.rate !== "notRated" && Honor.rate}
                </span>
              </h2>
              <div
                className="text-20 md:text-2xl cursor-pointer px-3 md:px-4 py-2 md:py-3 bg-slate-200 rounded-md text-red-600 flex flex-row items-center 
                                 justify-center space-x-2"
                onClick={() => deleteHonor(index)}
              >
                <HiTrash />
              </div>
            </div>

            {/* Honors inputs*/}
            <div className="honor--inputs w-full py-10 bg-tranparent mt-3 px-3 md:px-10">
              {/* Honor title */}
              <label htmlFor="title">
                <span className="font-bold">* Honor {index + 1} Title</span>
                <br />
                <textarea
                  maxlength="100"
                  name="honorTitle"
                  id="title"
                  rows={5}
                  // disabled={disableInputs}
                  value={Honor.honorTitle}
                  onChange={(e) => handleHonorChange(e, index)}
                  title="Honor title"
                  className="text-black resize-none w-full md:w-12/12 border-2 border-blue-300 disabled:cursor-not-allowed disabled:border-gray-200
                          rounded-md px-2 hover:border-MdBlue focus:border-MdBlue"
                />
              </label>

              {/* Honor Grade level */}
              <div className="flex flex-auto flex-wrap justify-around">
                {/* Grade Level */}
                <div className="flex flex-col">
                  <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                    Grade Level
                  </h3>

                  <ul
                    className="w-48 mt-2 file:text-sm font-bold text-gray-900 bg-white border border-gray-200 
                                       rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id={`Grade9${index}`}
                          type="checkbox"
                          name="didItInGrade9"
                          onChange={(e) => handleHonorChange(e, index)}
                          // disabled={disableInputs}
                          checked={Honor.didItInGrade9}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for={`Grade9${index}`}
                          className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md font-bold text-sm text-gray-900 dark:text-gray-300"
                        >
                          9
                        </label>
                      </div>
                    </li>

                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id={`Grade10${index}`}
                          type="checkbox"
                          name="didItInGrade10"
                          onChange={(e) => handleHonorChange(e, index)}
                          // disabled={disableInputs}
                          checked={Honor.didItInGrade10}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 "
                        />
                        <label
                          for={`Grade10${index}`}
                          className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md text-sm font-bold text-gray-900 dark:text-gray-300"
                        >
                          10
                        </label>
                      </div>
                    </li>

                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id={`Grade11${index}`}
                          type="checkbox"
                          onChange={(e) => handleHonorChange(e, index)}
                          // disabled={disableInputs}
                          checked={Honor.didItInGrade11}
                          name="didItInGrade11"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for={`Grade11${index}`}
                          className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md text-sm font-bold text-gray-900 dark:text-gray-300"
                        >
                          11
                        </label>
                      </div>
                    </li>

                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id={`Grade12${index}`}
                          type="checkbox"
                          onChange={(e) => handleHonorChange(e, index)}
                          // disabled={disableInputs}
                          checked={Honor.didItInGrade12}
                          name="didItInGrade12"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for={`Grade12${index}`}
                          className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md text-sm font-bold text-gray-900 dark:text-gray-300"
                        >
                          12
                        </label>
                      </div>
                    </li>

                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id={`GradePost${index}`}
                          type="checkbox"
                          onChange={(e) => handleHonorChange(e, index)}
                          // disabled={disableInputs}
                          checked={Honor.didItAfterSchool}
                          name="didItAfterSchool"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for={`GradePost${index}`}
                          className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md text-sm font-bold text-gray-900 dark:text-gray-300"
                        >
                          Post Graduate
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Level of Recognition */}
                <div className="flex flex-col">
                  <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                    Level of Recognition
                  </h3>
                  <ul className="w-48 text-sm mt-2 font-bold text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id={`School${index}`}
                          type="checkbox"
                          name="isRecognisedInSchool"
                          onChange={(e) => handleHonorChange(e, index)}
                          // disabled={disableInputs}
                          checked={Honor.isRecognisedInSchool}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for={`School${index}`}
                          className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md font-bold text-sm text-gray-900 dark:text-gray-300"
                        >
                          School
                        </label>
                      </div>
                    </li>

                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id={`Region${index}`}
                          type="checkbox"
                          onChange={(e) => handleHonorChange(e, index)}
                          // disabled={disableInputs}
                          checked={Honor.isRecognisedInState}
                          name="isRecognisedInState"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 "
                        />
                        <label
                          for={`Region${index}`}
                          className="w-full cursor-pointer font-bold py-3 ml-2 text-sm  text-gray-900 dark:text-gray-300"
                        >
                          Region State
                        </label>
                      </div>
                    </li>

                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id={`National${index}`}
                          type="checkbox"
                          onChange={(e) => handleHonorChange(e, index)}
                          // disabled={disableInputs}
                          checked={Honor.isRecognisedNational}
                          name="isRecognisedNational"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for={`National${index}`}
                          className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md text-sm font-bold text-gray-900 dark:text-gray-300"
                        >
                          National
                        </label>
                      </div>
                    </li>

                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id={`International${index}`}
                          type="checkbox"
                          onChange={(e) => handleHonorChange(e, index)}
                          // disabled={disableInputs}
                          checked={Honor.isRecognisedInternational}
                          name="isRecognisedInternational"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for={`International${index}`}
                          className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md text-sm font-bold text-gray-900 dark:text-gray-300"
                        >
                          International
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={saveChanges}
          className="self-end mr-20 bg-MdBlue text-white px-3 py-2 font-bold rounded-md flex gap-2 flex-row items-center justify-centerrounded-md mt-4 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {`${loading ? "Saving..." : "Save changes"}`}
        </button>

        <div
          className="cursor-pointer flex flex-row items-center mt-3 font-semibold text-MdBlue text-18 md:text-20"
          onClick={addHonor}
        >
          <HiOutlinePlus /> <span>Add new Honor</span>
        </div>

        {/* Submit when Honor is 5 or more and Activity is 10 or more */}
        {Honors.honors.length >= 5 && !Honors.submittedBefore && (
          <button
            className="capitalize px-5 flex flex-row justify-center items-center disabled:bg-gray-400 py-2 bg-MdBlue rounded-md text-white font-bold mt-20"
            type="submit"
            onClick={submitToReview}
          >
            {loading ? <>Submitting...</> : <>Submit for review </>}
          </button>
        )}

        {Honors.honors.length >= 5 && Honors.submittedBefore && (
          <button
            className="capitalize px-5 flex flex-row justify-center items-center disabled:bg-red-400 py-2 bg-MdBlue rounded-md text-white font-bold mt-20"
            type="submit"
            onClick={submitToReviewAnother}
          >
            {loading ? <>Submitting...</> : <>Submit for review </>}
          </button>
        )}
      </form>
      <ToastContainer />
      {loading && (
        <CoverLoaderMedium
          styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        />
      )}
    </>
  );
}

export default CreateHonor;
