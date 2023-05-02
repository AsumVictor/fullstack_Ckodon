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
  useDeleteEssayMutation
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
  //   const { data: userReview } = useGetReviewByDocumentQuery(activities?._id);
  const [deleteSchoolEssay, {isLoading: deleteSchLoad}] = useDeleteEssayMutation()
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
    deleteReviewLoad || deleteSchLoad
  const [EssayList, setEssayList] = useState(null);
  useEffect(() => {
    if (essayLists) {
      setEssayList(essayLists);
    }
  }, [essayLists]);
  console.log(EssayList);

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

  const addEssay = (schoolIndex) => {
    const newEssay = {
      id: schools[schoolIndex].essays.length + 1,
      essayQuestion: "",
      essayAnswer: "",
    };

    setSchools((prevState) => {
      const newState = [...prevState];
      newState[schoolIndex].essays = [
        ...newState[schoolIndex].essays,
        newEssay,
      ];
      return newState;
    });
  };

  const handleSchoolChange = (event, index) => {
    const { name, value } = event.target;
    setSchools((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], [name]: value };
      return newState;
    });
  };

  const handleEssayChange = (event, schoolIndex, essayIndex) => {
    const { name, value } = event.target;
    setSchools((prevState) => {
      const newState = [...prevState];
      newState[schoolIndex].essays[essayIndex] = {
        ...newState[schoolIndex].essays[essayIndex],
        [name]: value,
      };
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
  function deleteEssay(essayId, schoolIndex) {
    setSchools((prevData) => {
      let newState = [...prevData];
      newState[schoolIndex].essays = newState[schoolIndex].essays.filter(
        (essay) => essay.id !== essayId
      );
      return newState;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(schools);
    // Code to submit the form data goes here
  };

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
        <div className="w-full flex flex-col">
          {/* Each school and its essay */}
          {EssayList.map((school, schoolIndex) => (
            <div
              key={school._id}
              className="w-full md:w-10/12 self-center flex rounded-md flex-col items-start border-2 border-MdBlue pb-5 mt-10 px-2 md:px-10"
            >
              {/* School and essay header */}

              {/* Essays Title, status bar and collasp button */}
              <aside className="flex flex-row relative justify-between w-full py-3 bg-MdBlue items-center pl-3 pr-10 md:px-10">
                <h3
                  className="text-white placeholder-white placeholder-opacity-50 w-8/12 font-bold px-1 md:text-20 outline-none bg-transparent"
                >
                  {school.schoolName}
                </h3>
                <h3 className="text-white font-bold text-15">Status</h3>
                <button
                  type="button"
                  onClick={() => deleteSchool(school._id, school.schoolName)}
                  className="text-red-600 font-bold bg-red-100 rounded-lg px-2 py-2 mx-2"
                >
                  Delete
                </button>
              </aside>

              {/* Essays here  */}

              {school.essays.map((essay, essayIndex) => (
                <div
                  key={essay._id}
                  className="w-full mt-10 border-2 border-MdBlue"
                >
                  <div className=" w-full flex justify-between  py-2 px-5 items-center bg-MdBlue ">
                    <h3 className="text-white font-bold text-18">
                      Essay {essayIndex + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => deleteEssay(essay.id, schoolIndex)}
                      className="px-3 py-2 bg-red-100 text-red-600 font-bold rounded-md"
                    >
                      Delete Essay
                    </button>
                  </div>

                  <div className="w-full px-3 md:px-8  shadow-md">
                    <label className="w-full">
                      <span className="font-bold">Essay Question</span> <br />
                      <textarea
                        name="essayQuestion"
                        value={essay.question}
                        placeholder="Enter Essay Question here"
                        onChange={(e) =>
                          handleEssayChange(e, schoolIndex, essayIndex)
                        }
                        className="text-black w-full rounded-md px-2 outline-none"
                      />
                    </label>

                    <label className="w-full">
                      <span className="font-bold">Your written essay</span>
                      <br />

                      <TextareaAutosize
                        minRows={10}
                        className="w-full mt-5 text-18 resize-none border-2 p-3 rounded-md"
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
                <HiOutlinePlus /> <span>Add New essay</span>
              </button>

              <div className="w-full flex flex-row px-3 mt-10 md:px-10  flex-wrap justify-between">
                {school.essays.length > 0 && (
                  <button
                    type="button"
                    className="px-2 font-bold text-MdBlue border-2 rounded-md py-2 border-MdBlue"
                  >
                    Submit Princeton essays
                  </button>
                )}
              </div>
            </div>
          ))}
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
