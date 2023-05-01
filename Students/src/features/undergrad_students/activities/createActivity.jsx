import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import NoContent from "../../../components/indications/noContent";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi";
import { nanoid } from "@reduxjs/toolkit";
import Page from "../../../components/shared/page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "../../../hooks/useAuth";
import {
  useAddNewActivityMutation,
  useGetActivityByUserQuery,
  useUpdateActivityMutation,
} from "../../../apiSlice/activitySlice";
import {
  useGetReviewByDocumentQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useAddNewReviewMutation,
} from "../../../apiSlice/reviewsApiSlice";
import { CoverLoaderMedium } from "../../../components/loaders/loader";

function ActivityQuickReview() {
  const student = useAuth();
  const {
    data: activities,
    isLoading: fetchLoading,
    isSuccess,
    isError,
    error,
  } = useGetActivityByUserQuery(student.id);
  const [addnewActivity, {isLoading: addLoading}] = useAddNewActivityMutation()
  const loading = fetchLoading || addLoading
  // || updateLoading || addReviewLoad || deleteReviewLoad;
  const [Activity, setActivity] = useState(null);
  useEffect(() => {
    if (activities) {
        console.log(Activity);

      setActivity({ ...activities });
    }
  }, [activities]);

  //Add new activity
  function addActivity() {
    const newActivity = {
      id: nanoid(6),
      type: "",
      position: " ",
      organisationName: "",
      description: "",
      Grade9: false,
      Grade10: false,
      Grade11: false,
      Grade12: false,
      GradePost: false,
      SchoolYear: false,
      SchoolBreak: false,
      Allyear: false,
      hourUsed: null,
      weekPerYear: null,
    };
    setActivity((prevActivity) => [...prevActivity, newActivity]);
  }

  //Handle Activity form chandge
  function HanldeActivityChange(e, index) {
    const { name, value, type, checked } = e.target;
    setActivity((prevState) => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        [name]: type == "checkbox" ? checked : value,
      };
      return newState;
    });
  }

  // Delete Activity
  function deleteActivity(id) {
    setActivity((prevData) => {
      const newState = prevData.filter((child) => child.id !== id);
      return newState;
    });
  }

  // Save Changes when Activity changes
  useEffect(() => {
    localStorage.setItem("Activities", JSON.stringify(Activity));
  }, [Activity]);

//Create new Activity list
async function createNewActivity() {
    try {
      const res = await addnewActivity({
        user: student.id,
        status: "unresolved",
        submitted: false,
        activities: [
          {
            position: "",
            description: '',
            organisationName:'',
            didItInGrade9: false,
            didItInGrade10: false,
            didItInGrade11: false,
            didItInGrade12: false,
            didItAfterSchool: false,
            participstedInSchoolDay: false,
            participstedInSchoolBreak: false,
            participstedAllYear: false,
            isRecognisedInternational: false,
            hourSpentPerYear:'',
            weeksSpentPerYear:'',
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
        toast.success("Activity List has been Created successfully", {
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

  if (!Activity) {
    return (
      <>
        <div className="flex flex-col">
          <NoContent message={`You Don't have an Activity yet`} />
          <div
            className="cursor-pointer border-2 py-2 px-4 rounded-md border-MdBlue hover:bg-MdBlue hover:text-white active:scale-95 flex flex-row items-center mt-10 font-bold text-MdBlue text-18 md:text-20 self-center"
            onClick={createNewActivity}
          >
            <HiOutlinePlus /> <span> Create new Activity List</span>
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

  return (
    <>
      <Page>
        <h1 className="self-center mt-2 text-2xl text-MdBlue font-semibold">
          My Activity Lists
        </h1>
        {/* Form Data of Activity*/}
        <form className="self-center w-full md:w-10/12 flex items-center flex-col pb-20">
          {/* Activity Header */}
          <div
            className="Activity--wrapper w-full flex flex-col justify-start items-center
        md:w-full border-l-2 border-r-2 border-MdBlue rounded-lg mt-10 overflow-hidden"
          >
            {/* Activity Title, status bar and collasp button */}
            <aside className="flex flex-row relative justify-between w-full py-3 bg-MdBlue items-center pl-3 pr-10 md:px-10">
              <h3 className="text-white font-bold text-20">Activities</h3>
              <h3 className="text-white font-bold text-15">Status</h3>
            </aside>
          </div>
          {Activity.map((Activity, index) => (
            <div
              className="Activity w-full md:w-11/12 bg-white border-2 border-MdBlue py-4 rounded-md mt-10"
              key={Activity.id}
            >
              {/* Activity inputs index and delete buuton bar*/}
              <div className="Activity--header flex flex-row relative justify-between w-full items-center px-3 md:px-10">
                <h2 className="text-black font-bold">{`Activity ${
                  index + 1
                }`}</h2>
                <div
                  className="text-20 md:text-2xl cursor-pointer px-3 md:px-4 py-2 md:py-3 bg-slate-200 rounded-md text-red-600 flex flex-row items-center 
                           justify-center space-x-2"
                  onClick={() => deleteActivity(`${Activity.id}`)}
                >
                  <HiTrash />
                </div>
              </div>

              {/* Activity inputs*/}
              <div className="Activity--inputs w-full py-10 bg-tranparent mt-5 px-3 md:px-10 flex flex-col">
                {/* Activity title */}
                <label htmlFor="title">
                  <span className="font-bold">* Activity Type</span>
                  <br />
                  <textarea
                    maxlength="100"
                    name="type"
                    id="type"
                    value={Activity.type}
                    onChange={(e) => HanldeActivityChange(e, index)}
                    title="Activity type"
                    className="text-black w-full md:w-12/12 border-2 border-blue-300 rounded-md px-2 hover:border-MdBlue focus:border-MdBlue"
                  />
                </label>

                {/* Activity Position */}

                <label htmlFor="position">
                  <span className="font-bold">
                    Position/Leadership description <br />
                    {`(Max characters: 50)`}*
                  </span>
                  <br />
                  <textarea
                    maxlength="50"
                    name="position"
                    id="position"
                    value={Activity.position}
                    onChange={(e) => HanldeActivityChange(e, index)}
                    title="Activity position"
                    className="text-black w-full md:w-12/12 border-2 border-blue-300 rounded-md px-2 hover:border-MdBlue focus:border-MdBlue"
                  />
                </label>

                {/* Activity organisation Name */}
                <label htmlFor="organisationName">
                  <span className="font-bold">
                    * Organization Name <br /> {`(Max characters: 100)`}
                  </span>
                  <br />
                  <textarea
                    maxlength="100"
                    name="organisationName"
                    id="organisationName"
                    value={Activity.organisationName}
                    onChange={(e) => HanldeActivityChange(e, index)}
                    title="Activity organisation name"
                    className="text-black w-full md:w-12/12 border-2 border-blue-300 rounded-md px-2 hover:border-MdBlue focus:border-MdBlue"
                  />
                </label>

                {/* Activity description */}

                <label htmlFor="description">
                  <span className="font-bold">
                    *Please describe this activity, including what you
                    accomplished and any recognition you received, etc. <br />
                    {`(Max characters: 150)`}
                  </span>
                  <br />
                  <textarea
                    maxlength="150"
                    name="description"
                    id="description"
                    value={Activity.description}
                    onChange={(e) => HanldeActivityChange(e, index)}
                    title="Activity description"
                    className="text-black w-full md:w-12/12 border-2 border-blue-300 rounded-md px-2 hover:border-MdBlue focus:border-MdBlue"
                  />
                </label>

                <div className="flex flex-auto flex-wrap justify-around">
                  {/* Grade Level */}
                  <div className="flex flex-col">
                    <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                      Grade Level
                    </h3>

                    <ul className="w-48 mt-2 file:text-sm font-bold text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id={`Grade9${index}`}
                            type="checkbox"
                            name="Grade9"
                            onChange={(e) => HanldeActivityChange(e, index)}
                            checked={Activity.Grade9}
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
                            name="Grade10"
                            onChange={(e) => HanldeActivityChange(e, index)}
                            checked={Activity.Grade10}
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
                            onChange={(e) => HanldeActivityChange(e, index)}
                            checked={Activity.Grade11}
                            name="Grade11"
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
                            onChange={(e) => HanldeActivityChange(e, index)}
                            checked={Activity.Grade12}
                            name="Grade12"
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
                            onChange={(e) => HanldeActivityChange(e, index)}
                            checked={Activity.GradePost}
                            name="GradePost"
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

                  {/* Timing of participation* */}
                  <div className="flex flex-col">
                    <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                      Timing of participation*
                    </h3>
                    <ul className="w-48 text-sm mt-2 font-bold text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id={`SchoolYear${index}`}
                            type="checkbox"
                            name="SchoolYear"
                            onChange={(e) => HanldeActivityChange(e, index)}
                            checked={Activity.SchoolYear}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            for={`SchoolYear${index}`}
                            className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md font-bold text-sm text-gray-900 dark:text-gray-300"
                          >
                            During school year
                          </label>
                        </div>
                      </li>

                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id={`SchoolBreak${index}`}
                            type="checkbox"
                            onChange={(e) => HanldeActivityChange(e, index)}
                            checked={Activity.SchoolBreak}
                            name="SchoolBreak"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 "
                          />
                          <label
                            for={`SchoolBreak${index}`}
                            className="w-full font-bold py-3 ml-2 text-sm  text-gray-900 dark:text-gray-300"
                          >
                            During school break
                          </label>
                        </div>
                      </li>

                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id={`Allyear${index}`}
                            type="checkbox"
                            onChange={(e) => HanldeActivityChange(e, index)}
                            checked={Activity.Allyear}
                            name="Allyear"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            for={`Allyear${index}`}
                            className="w-full py-3 ml-2 cursor-pointer hover:bg-slate-50 rounded-t-md text-sm font-bold text-gray-900 dark:text-gray-300"
                          >
                            All year
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <label htmlFor="hourUsed" className="mt-7 w-full">
                  <span className="font-bold">* Hours spent per week </span>{" "}
                  <br />
                  <input
                    name="hourUsed"
                    type="number"
                    id="hourUsed"
                    title="hourUsed"
                    value={Activity.hourUsed}
                    onChange={(e) => HanldeActivityChange(e, index)}
                    min={0}
                    placeholder="Hour spent"
                    className="text-black w-full md:w-12/12 border-2 border-MdBlue500 rounded-md invalid:border-red-800 px-2 outline-MdBlue"
                  />
                </label>

                {/* weeks per year spent on activtity */}
                <label htmlFor="weekPerYear" className="mt-7 w-full">
                  <span className="font-bold">* Weeks spent per year </span>{" "}
                  <br />
                  <input
                    name="weekPerYear"
                    type="number"
                    id="weekPerYear"
                    title="weekPerYear"
                    value={Activity.weekPerYear}
                    onChange={(e) => HanldeActivityChange(e, index)}
                    min={0}
                    placeholder="Weeks spent"
                    className="text-black w-full md:w-12/12 border-2 border-MdBlue500 rounded-md invalid:border-red-800 px-2 outline-MdBlue"
                  />
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="self-end mr-20 bg-MdBlue text-white px-3 py-1 rounded-md mt-4"
          >
            Save Changes
          </button>

          {/* Button to new Activity */}
          <div
            className="cursor-pointer flex flex-row items-center mt-3 font-semibold text-MdBlue text-18 md:text-20"
            onClick={addActivity}
          >
            <HiOutlinePlus /> <span>Add new Activity</span>
          </div>

          {/* Submit when Activity is 5 or more and Activity is 10 or more */}

          {Activity.length >= 10 && (
            <button
              className="capitalize px-5 py-2 bg-MdBlue rounded-md text-white font-bold mt-20"
              type="submit"
              // onClick={handleSubmit}
            >
              Submit for review
            </button>
          )}
        </form>
      </Page>
    </>
  );
}

export default ActivityQuickReview;
