import React, { useState, useEffect } from "react";
import Page from "../../../../components/shared/page";
import { nanoid } from "@reduxjs/toolkit";
import { Link, useParams } from "react-router-dom";
import { HiChevronDoubleLeft } from "react-icons/hi";
import Logo from "../../../../assets/images/studentLogo.png";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  selectUndergraduateApplicantById,
  useGetUndergraduateApplicantsQuery,
  useUpdateUndergraduateApplicantMutation,
} from "../../../../apiSlice/undergrauteApplicantsApiSlice";
import { useAddNewUserMutation } from "../../../../apiSlice/usersApiSlice";
import "./style.css";
import { NormalInputs } from "../../../../components/customHTML/textInputs";
import { ButtonDefault } from "../../../../components/buttons";
import { HiOutlineSearch } from "react-icons/hi";
import { HiBarsArrowUp, HiBarsArrowDown } from "react-icons/hi2";
import {
  RefreshToolkit,
  CustomToolkit,
} from "../../../../components/toolkits/tollkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SmallLoader } from "../../../../components/loaders/loader";


function ApplicantDetails() {
  const [loading, setLoading] = useState(false);

  const {
    data: applicants,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUndergraduateApplicantsQuery();

  const [addNewUser] = useAddNewUserMutation();
  

  const [updateApplicant] = useUpdateUndergraduateApplicantMutation();

  let content = null;
  const params = useParams();
  const applicantId = params.id;
  const applicant = useSelector((state) =>
    selectUndergraduateApplicantById(state, applicantId)
  );

  let applicantBasicInfo = null;

  if (isLoading) {
    content = <SmallLoader />;
  }

  if (isSuccess) {
    applicantBasicInfo = {
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      email: applicant.email,
      residence: applicant.residence,
      role: "undergraduate",
      school: applicant.recentSchool,
      password: nanoid(8),
      phone: applicant.phone,
      gender: applicant.gender,
      isActive: true,
    };

    content = (
      <div className="flex flex-col items-center">
        <div className="flex felx-row bg-white shadow-md px-3 rounded-md py-2      md:justify-between justify-end items-center w-full flex-wrap gap-y-2 mt-5   sticky top-0">
          {applicant.applicationStatus == "pending" ? (
            <>
              <div className="hidden md:flex flex-row justify-between text-2xl font-bold items-center w-full gap-2 md:w-5/12">
                {`${applicant?.firstName} ${applicant?.lastName}`}
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
                  {`reject ${applicant?.firstName}`}
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
                  {`admit ${applicant?.firstName}`}
                </button>
                <RefreshToolkit />
              </div>
            </>
          ) : applicant.applicationStatus == "admitted" ? (
            <div className="md:flex flex-row justify-center text-emerald-600 text-2xl font-bold items-center w-full">
              {`${applicant?.firstName} has enrolled already`}
            </div>
          ) : (
            <div className="md:flex flex-row justify-center text-pink-600 text-2xl font-bold items-center w-full">
              {`${applicant?.firstName} has been denied already`}
            </div>
          )}
        </div>

        <div className="pb-10 mt-10 md:w-10/12 seld-center">
          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold text-20 capitalize">
              Name:
            </span>
            <span className="text-18 capitalize">
              {`${applicant?.firstName} ${applicant?.lastName}`}
            </span>
          </h2>

          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              Email:
            </span>
            <span className="text-18 capitalize">{applicant?.email}</span>
          </h2>

          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              Date of birth:
            </span>
            <span className="text-18 capitalize">{applicant?.dateOfBirth}</span>
          </h2>

          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              gender:
            </span>
            <span className="text-18 capitalize">{applicant?.gender}</span>
          </h2>

          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              phone:
            </span>
            <span className="text-18 capitalize">{applicant?.phone}</span>
          </h2>

          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              residence:
            </span>
            <span className="text-18 capitalize">{applicant?.residence}</span>
          </h2>

          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              recent school:
            </span>
            <span className="text-18 capitalize">
              {applicant?.recentSchool}
            </span>
          </h2>

          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              date of completing High school:
            </span>
            <span className="text-18 capitalize">
              {applicant?.dateOfCompletion}
            </span>
          </h2>

          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              university:
            </span>
            <span className="text-18 capitalize">{`${
              applicant?.currentUniversity
                ? applicant?.currentUniversity
                : "Not in university"
            }`}</span>
          </h2>

          <h2 className="flex flex-row gap-x-5 py-1 flex-wrap items-end">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              WASSCE results:
            </span>
            <span className="text-18 capitalize">{applicant?.wassceText}</span>
          </h2>

          <h2 className="text-center mt-10 text-2xl font-bold">ESSAYS</h2>

          <h2 className="flex flex-col py-1 flex-wrap">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              essay question:
            </span>
            <span className="text-18 capitalize">
              {applicant?.essayQuestion}
            </span>
          </h2>

          <h2 className="flex flex-col py-1 flex-wrap">
            <span className="text-gray-900 font-bold capitalize text-20 ">
              answer:
            </span>
            <span className="text-18 capitalize">{applicant?.essayAnswer}</span>
          </h2>
        </div>
      </div>
    );
  }

  //Modal and reject accept logics
  const [showModal, setShowModal] = useState({
    show: false,
    text: null,
  });

  //Adding new user and updating user Status

  async function rejectStudent() {
    try {
      setLoading(true);
      let updatingResponse = await updateApplicant({
        ...applicant,
        applicationStatus: "rejected",
      });
      if (updatingResponse.data) {
        toast.info(`${applicant.firstName} has been denied`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        //send mail to student
        setLoading(false);
        setShowModal({
          show: false,
          text: null,
        })
      } else {
        toast.error(`${updatingResponse.error.data.message}`, {
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
    } catch (error) {
      setLoading(false);
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
    }
  }

  async function acceptStudent() {
    try {
      setLoading(true);
      let addingResponse = await addNewUser(applicantBasicInfo);
      
      if (addingResponse.data) {
        let updatingResponse = await updateApplicant({
          ...applicant,
          applicationStatus: "admitted",
        });
        if (updatingResponse.data) {
          toast.success(`${applicant.firstName} has been enrolled`, {
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
        //send mail to student
        setLoading(false);
        setShowModal({
          show: false,
          text: null,
        })
      } else {
        toast.error(`${addingResponse.error.data.message}`, {
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
    } catch (error) {
      setLoading(false);
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
          <HiChevronDoubleLeft /> Back to all applicants
        </Link>
        {content}
        {/*  */}

        {showModal?.show ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto mt-48 md:my-10 mx-4 md:mx-auto max-w-xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between px-5 py-2 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl text-MdBlue font-semibold">
                      Confirm Enrollment Decision
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        x
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative px-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      {`
                           Are you sure you want to ${showModal?.text} this student? This action cannot be undone.
                      `}
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:text-slate-300"
                      type="button"
                      onClick={() => setShowModal(false)}
                      disabled={loading}
                    >
                      Close
                    </button>
                    <button
                      className={` ${
                        showModal?.text == "reject"
                          ? "bg-pink-600 active:bg-pink-900"
                          : "bg-emerald-500 active:bg-emerald-600"
                      } text-white flex flex-row justify-center gap-4 font-bold uppercase items-center text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:bg-slate-300`}
                      type="button"
                      onClick={
                        showModal?.text == "reject"
                          ? rejectStudent
                          : showModal?.text == "admit"
                          ? acceptStudent
                          : null
                      }
                      disabled={loading}
                    >
                      {`yes ${showModal?.text}`}
                      {loading && <SmallLoader />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </Page>
      <ToastContainer />
    </>
  );
}

export default ApplicantDetails;
