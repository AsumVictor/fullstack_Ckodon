import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import NoContent from "../../../components/indications/noContent";
import { HiOutlinePlus, HiArrowUpTray } from "react-icons/hi2";
import { nanoid } from "@reduxjs/toolkit";
import Page from "../../../components/shared/page";
import useAuth from "../../../hooks/useAuth";
import {
  useGetEssayByUserQuery,
  useAddNewEssayMutation,
  useUpdateEssayMutation,
  useDeleteEssayMutation,
} from "../../../apiSlice/essaySlice";
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

export default function CreateEssays() {
  const student = useAuth();

  const {
    data: essayLists,
    isLoading: fetchLoading,
    isSuccess,
    isError,
    error,
  } = useGetEssayByUserQuery(student.id);
  const [addNewSchoolEssay, { isLoading: addLoading }] =
    useAddNewEssayMutation();
  const [updateEssay, { isLoading: updateLoading }] = useUpdateEssayMutation();
  const [deleteSchoolEssay, { isLoading: deleteSchLoad }] =
    useDeleteEssayMutation();
  const [updateReview] = useUpdateReviewMutation();

  const [addReview, { isLoading: addReviewLoad }] = useAddNewReviewMutation();
  const [deleteReview, { isLoading: deleteReviewLoad }] =
    useDeleteReviewMutation();
  const [readyToAddSchool, setReadyToAddSchool] = useState(false);
  const [schoolName, setSchoolName] = useState("");

  const loading =
    fetchLoading ||
    addLoading ||
    updateLoading ||
    addReviewLoad ||
    deleteReviewLoad ||
    deleteSchLoad;
  const [EssayList, setEssayList] = useState(null);
  useEffect(() => {
    if (essayLists) {
      setEssayList(essayLists);
    }
  }, [essayLists]);

  const addSchool = async () => {
    try {
      const res = await addNewSchoolEssay({
        schoolName: schoolName,
        essays: [],
        user: student.id,
        status: "unresolved",
        submitted: false,
        submittedBefore: false,
      });
      if (res.data) {
        setSchoolName("");
        setReadyToAddSchool(false);
        toast.success("New school Created successfully", {
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

  const addEssay = async (schoolIndex) => {
    const newEssay = {
      question: "",
      answer: "",
      comments: [{ comment: "" }],
      voiceNOtes: [],
      additionalDocs: [],
      rate: "notRated",
    };

    let currentSchool = EssayList[schoolIndex];
    let updatedEssay = [...currentSchool.essays];
    updatedEssay.push(newEssay);

    try {
      const res = await updateEssay({
        ...currentSchool,
        id: currentSchool._id,
        essays: updatedEssay,
      });
      if (res.data) {
        toast.success(
          `You have added an essay to ${currentSchool.schoolName}`,
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
  };

  const handleSchoolChange = (event, index) => {
    const { name, value } = event.target;
    setSchools((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], [name]: value };
      return newState;
    });
  };

  const handleEssayChange = (e, schoolIndex, essayIndex) => {
    const { name, value } = e.target;
    setEssayList((prev) => {
      let newState = [...prev];
      let currentSchool = { ...newState[schoolIndex] };
      let SchoolEssays = [...currentSchool.essays];
      let currentEssay = SchoolEssays[essayIndex];
      currentEssay = {
        ...currentEssay,
        [name]: value,
      };

      SchoolEssays[essayIndex] = currentEssay;

      currentSchool = {
        ...currentSchool,
        essays: SchoolEssays,
      };

      newState[schoolIndex] = currentSchool;

      return newState;
    });
  };

  async function deleteSchool(id, schoolName) {
    try {
      const res = await deleteSchoolEssay(id);

      if (res.data) {
        toast.warn(`You have removed ${schoolName} from the list`, {
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

  //Delete Essay
  async function deleteEssay(essayIndex, schoolIndex) {
    let newEssayList = [...EssayList];
    let currentSchool = newEssayList[schoolIndex];
    let essays = [...currentSchool.essays];
    const newEssays = essays.filter(
      (child) => essays.indexOf(child) !== essayIndex
    );

    try {
      const res = await updateEssay({
        ...currentSchool,
        id: currentSchool._id,
        essays: newEssays,
      });
      if (res.data) {
        toast.warn(
          `${currentSchool.schoolName} essay ${essayIndex + 1} deleted`,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(schools);
    // Code to submit the form data goes here
  };

async function submitToReview(schoolIndex){
  const currentSchool = EssayList[schoolIndex]
  
  try {
    let response =  await addReview({
      deadline: null,
      status: "unresolved",
      documentId: currentSchool._id,
      onModel: "Essay",
      user: currentSchool.user,
    });

    if (response.data) {
      let res = await updateEssay({
        ...currentSchool,
        id: currentSchool._id,
        submitted: true,
        submittedBefore: true,
      });

      if (res.data) {
        toast.success(`You have Submitted ${currentSchool.schoolName} essay(s) for review.`, {
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

async function saveChanges(schoolIndex) {
  const currentSchool = EssayList[schoolIndex]
  try {
    const res = await updateEssay({
      ...currentSchool,
      id: currentSchool._id,
    });

    if (res.data) {
      toast.success(`${currentSchool.schoolName} Changes saved successfully`, {
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


async function withdraw(schoolIndex) {
 const currentSchool = EssayList[schoolIndex]
  try {
    let response = await deleteReview(currentSchool._id)
    if (response.data) {
      let res = await updateEssay({
        ...currentSchool,
        id: currentSchool._id,
        submitted: false,
        submittedBefore: false,
      });

      if (res.data) {
        toast.warn(`You have withdraw ${currentSchool.schoolName} essay(s).`, {
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

  if (!EssayList?.length) {
    return (
      <>
        <div className="flex flex-col">
          <NoContent message={`You Don't have any essay yet`} />
          <div
            className="cursor-pointer border-2 py-2 px-4 rounded-md border-MdBlue hover:bg-MdBlue hover:text-white active:scale-95 flex flex-row items-center mt-10 font-bold text-MdBlue text-18 md:text-20 self-center"
            onClick={() => setReadyToAddSchool(true)}
          >
            <HiOutlinePlus /> <span> Create new school essay</span>
          </div>
        </div>
        <ToastContainer />
        {loading && (
          <CoverLoaderMedium
            styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
        )}
        {readyToAddSchool && (
          <ModalBox modalHeader="Enter school Name">
            <ModalBody>
              <input
                type="text"
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter the name of the school"
                className="rounded-md w-80"
                required
              />
            </ModalBody>
            <ModalFooter class="py-2 justify-end px-4">
              <button
                className="py-2 px-3 mx-3 font-bold text-pink-700 rounded-md disabled:text-gray-300 disabled:cursor-not-allowed"
                onClick={() => setReadyToAddSchool(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="py-2 px-3 bg-emerald-700 font-bold text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={addSchool}
                disabled={!schoolName || loading}
              >
                {!loading ? "Create school" : "Add school..."}
              </button>
            </ModalFooter>
          </ModalBox>
        )}
      </>
    );
  }

  return (
    <>
      <Page>
        <div className="w-full px-0 flex flex-col">
          {/* Each school and its essay */}
          {EssayList.map((school, schoolIndex) => {
            const colors = [
              "red-900",
              "emerald-700",
              "green-600",
              "fuchsia-700",
              "purple-800",
              "rose-600",
            ];
            let randomNumber = Math.floor(Math.random() * colors.length);
            let randonBackgroundColor = colors[randomNumber];

          if(school.submitted){
         return(
          <div
                key={school._id}
                className={`w-full md:w-11/12 self-center flex rounded-md flex-col items-start pb-5 mt-20 px-0 md:px-10 border-b-4 
              border-${randonBackgroundColor}`}
              >

                <aside
                  className={`flex flex-row relative justify-between w-full py-3 bg-${randonBackgroundColor}  items-center pl-3 pr-10 md:px-10`}
                >
                  <h3 className="text-white placeholder-white placeholder-opacity-50 w-8/12 font-bold px-1 text-16 md:text-20 outline-none bg-transparent">
                    {school.schoolName}
                  </h3>
                 
                </aside>


                <h1 className="mt-10 text-center px-3 font-bold text-xl md:px-10">
           {` You have submitted ${school.schoolName} essays for review`}
          </h1>
          <button
            className="mt-10 py-2 px-4 bg-red-900 active:scale-105 hover:bg-red-700 text-white rounded-md self-center font-bold"
             onClick={()=>withdraw(schoolIndex)}
          >
            Withdraw
          </button>
                </div>
         )
          }


            return (
              <div
                key={school._id}
                className={`w-full md:w-11/12 self-center flex rounded-md flex-col items-start pb-5 mt-20 px-0 md:px-10 border-b-4 
              border-${randonBackgroundColor}`}
              >
                {/* School and essay header */}

                {/* Essays Title, status bar and collasp button */}
                <aside
                  className={`flex flex-row relative justify-between w-full py-3 bg-${randonBackgroundColor}  items-center pl-3 pr-10 md:px-10`}
                >
                  <h3 className="text-white placeholder-white placeholder-opacity-50 w-8/12 font-bold px-1 text-16 md:text-20 outline-none bg-transparent">
                    {school.schoolName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => deleteSchool(school._id, school.schoolName)}
                    className="text-red-600 font-bold bg-red-100 rounded-lg px-2 py-2 mx-2"
                  >
                    Delete
                  </button>
                </aside>


                {school.essays.map((essay, essayIndex) => (
                  <div key={essay._id} className={`w-11/12 self-center mt-10`}>
                    <div
                      className={`w-full flex justify-between py-2 px-5 items-center bg-${randonBackgroundColor}`}
                    >
                      <h3 className="text-white font-bold text-15">
                        {` ${school.schoolName} Essay ${essayIndex + 1}`}
                      </h3>
                      <button
                        type="button"
                        onClick={() => deleteEssay(essayIndex, schoolIndex)}
                        className="px-1 py-1 bg-red-100 text-red-600 font-bold rounded-md"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="w-full px-3 md:px-8  shadow-md">
                      <label className="w-full">
                        <span className="font-bold">Essay Question</span> <br />
                        <TextareaAutosize
                          minRows={1}
                          className="w-full mt-5 resize-none border-2 p-3 rounded-md"
                          placeholder="Enter Essay Question here"
                          value={essay.question}
                          name="question"
                          onChange={(e) =>
                            handleEssayChange(e, schoolIndex, essayIndex)
                          }
                        />
                      </label>

                      <label className="w-full">
                        <span className="font-bold">Your written essay</span>
                        <br />

                        <TextareaAutosize
                          minRows={10}
                          className="w-full mt-5 resize-none border-2 p-3 rounded-md"
                          placeholder="Past your essay here"
                          value={essay.answer}
                          name="answer"
                          onChange={(e) =>
                            handleEssayChange(e, schoolIndex, essayIndex)
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addEssay(schoolIndex)}
                  className="cursor-pointer justify-center w-full flex flex-row items-center mt-3 font-semibold text-MdBlue text-18 md:text-20"
                >
                  <HiOutlinePlus />
                  <span>{`New ${school.schoolName} essay`}</span>
                </button>

                <button
                  type="button"
                  onClick={() => saveChanges(schoolIndex)}
                  className="cursor-pointer self-end justify-center px-3 rounded-md flex flex-row items-center mt-3 font-semibold text-emerald-700 text-18 md:text-20 bg-white border-2 border-emerald-700"
                >
                  <span>Save Changes</span>
                </button>

                {(school.essays.length > 0 && !school.submittedBefore) && (
          <button
            className="capitalize px-5 flex flex-row justify-center items-center disabled:bg-gray-400  border-2 py-2 border-MdBlue bg-white rounded-md text-MdBlue font-bold mt-10"
            type="submit"
             onClick={()=>submitToReview(schoolIndex)}
          >
            {loading ? <>Submitting...</> : <>{` Submit ${school.schoolName} essays`} </>}
          </button>
        )}

        {(school.essays.length > 0 && school.submittedBefore) && (
          <button
          className="capitalize px-5 flex flex-row justify-center items-center disabled:bg-gray-400  border-2 py-2 border-MdBlue bg-white rounded-md text-MdBlue font-bold mt-10"
            type="submit"
            // onClick={submitToReviewAnother}
          >
            {loading ? <>Submitting...</> : <>{` Submit ${school.schoolName} essays`}</>}
          </button>
        )}

              </div>
            );
          })}
        </div>

        <div className="flex flex-row justify-center flex-wrap items-center py-2 mt-10">
          <button
            className="px-5 py-2 bg-MdBlue hover:bg-MdBlue500 flex flex-row  justify-center items-center text-white font-bold rounded-md mx-5 -mt-3"
            onClick={() => setReadyToAddSchool(true)}
          >
            <HiOutlinePlus />
            Add New School Essay
          </button>
        </div>
      </Page>
      <ToastContainer />
      {loading && (
        <CoverLoaderMedium
          styles={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        />
      )}
      {readyToAddSchool && (
        <ModalBox modalHeader="Enter school Name">
          <ModalBody>
            <input
              type="text"
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Enter the name of the school"
              className="rounded-md w-80"
              required
            />
          </ModalBody>
          <ModalFooter class="py-2 justify-end px-4">
            <button
              className="py-2 px-3 mx-3 font-bold text-pink-700 rounded-md disabled:text-gray-300 disabled:cursor-not-allowed"
              onClick={() => setReadyToAddSchool(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="py-2 px-3 bg-emerald-700 font-bold text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={addSchool}
              disabled={!schoolName || loading}
            >
              {!loading ? "Create school" : "Add school..."}
            </button>
          </ModalFooter>
        </ModalBox>
      )}
    </>
  );
}
