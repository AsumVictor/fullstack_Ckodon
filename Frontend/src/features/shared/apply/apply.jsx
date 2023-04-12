import React, { useState } from "react";
import "../style.css";
import Banner from "../../../assets/images/banner.png";
import {
  TextInputs,
  NormalTextArea,
} from "../../../components/customHTML/textInputs";
import { RadioWithIcon } from "../../../components/customHTML/radio";
import { HiThumbUp } from "react-icons/hi";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { ButtonDefault } from "../../../components/buttons";
import { useAddNewUndergraduateApplicantMutation } from "../../../apiSlice/undergrauteApplicantsApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Lottie from "lottie-react";
import SubmitCheack from "../../../assets/animations/submitCheckmark.json";
import { Link, useLocation } from "react-router-dom";

export default function Apply() {
  const [addNewApplicant, { isLoading, isSuccess, isError, error }] =
    useAddNewUndergraduateApplicantMutation();

  const [roles, setRoles] = useState("undergraduate");
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    residence: "",
    recentSchool: "",
    applicationStatus: "pending",
    dateOfBirth: "",
    currentUniversity: "",
    yearOfCompletion: "",
    wassceText: "",
    essayQuestion: "",
    essayAnswer: "",
    gender: "",
    phone: "",
    whatsappNumber: "",
    level: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleRoleData(e) {
    setRoles(e.target.value);
  }

  function HandleFormData(e) {
    const { name, value } = e.target;
    setformData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  //submit form
  async function submitForm(e) {
    e.preventDefault();
    try {
      let sendingResponse = await addNewApplicant({ ...formData, role: roles });

      if (sendingResponse.data) {
        console.log(sendingResponse);
        setRoles("undergraduate");
        setformData({
          firstName: "",
          lastName: "",
          email: "",
          residence: "",
          recentSchool: "",
          applicationStatus: "pending",
          dateOfBirth: "",
          currentUniversity: "",
          yearOfCompletion: "",
          wassceText: "",
          essayQuestion: "",
          essayAnswer: "",
          gender: "",
          phone: "",
          whatsappNumber: "",
          level: "",
        });
        setSubmitted(true);

      } else {
        toast.error(`${error?.data?.message}`, {
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
    } catch (error) {
      console.log(error);
      toast.error(`There is an error`, {
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

  if (submitted) {
    return (
      <div
        className="submittedAlert px-3 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden"
        style={{ height: "100vh" }}
      >
        <Lottie
          animationData={SubmitCheack}
          loop={false}
          style={{ width: 200 }}
          autoplay={true}
        />
        <p className="text-2xl text-MdBlue500 font-bold text-center md:px-10 px-3">
          Congratulations Asum! Your application has been successfully
          submitted.
        </p>
        <p className="w-full md:w-6/12 mt-5 text-center">
          Thank you for your interest in Ckodon. We appreciate your time and
          effort in completing the application. We will review your application
          carefully and get back to you as soon as possible.
        </p>

        <div className="flex  mt-10 flex-wrap flex-row items-center gap-x-7 justify-center">
          <Link to="/welcome" className="underline font-bold ">
            Read Ckodon articles
          </Link>

          <button
            onClick={() => setSubmitted(false)}
            className="text-18 text-MdBlue flex justify-center items-center py-2 font-bold"
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <main className="bg-white flex flex-row justify-between">
        <aside className="w-full pb-20 px-3  flex flex-col items-center md:w-8/12 overflow-y-auto">
          <h2 className="text-MdBlue font-bold text-4xl mt-10">
            Welcome to Ckodon!
          </h2>
          <p className="text-gray-500 font-bold text-1xl">
            Unlock Your Potential with Ckodon
          </p>
          {/* Form elements */}

          <form className="w-full md:w-10/12 mt-10 py-3" onSubmit={submitForm}>
            <h2 className="text-20 font-bold">I'm applying as: </h2>
            <div className="flex flex-auto gap-7 mt-7">
              <RadioWithIcon
                id="undergraduate"
                className="role"
                name="role"
                text="undergrad"
                value="undergraduate"
                isCheck={roles == "undergraduate"}
                required={true}
                handlechange={(e) => handleRoleData(e)}
              />
              <RadioWithIcon
                isCheck={roles == "graduate"}
                id="graduate"
                className="role"
                name="role"
                text="graduate"
                handlechange={(e) => handleRoleData(e)}
                value="graduate"
                required={true}
              />
            </div>

            {roles === "undergraduate" && (
              <div className="">
                <TextInputs
                  required={true}
                  type="text"
                  label="first name"
                  classextend="mt-10"
                  name="firstName"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.firstName}
                />

                <TextInputs
                  required={true}
                  type="text"
                  label="last name"
                  classextend="mt-10"
                  name="lastName"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.lastName}
                />

                <TextInputs
                  required={true}
                  type="email"
                  label="email"
                  classextend="mt-10"
                  name="email"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.email}
                />

                <div className="mt-10">
                  <strong>Gender *</strong>
                </div>
                <div className="flex mt-3 flex-row justify-start">
                  <label
                    htmlFor="male"
                    className="flex px-3 flex-row  py-1 essayLabel"
                  >
                    <input
                      type="radio"
                      className="prompt opacity-0"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender == "male"}
                      required={true}
                      onChange={(e) => HandleFormData(e)}
                    />

                    <div className="bg-gray-100 border-2 flex flex-row items-center gap-4 py-2 px-3 rounded-md Promptlabel cursor-pointer invalid:border-pink-600 top-0">
                      <span className="text-2xl thumb">
                        <FcBusinessman />
                      </span>
                      <span>Male</span>
                    </div>
                  </label>

                  <label
                    htmlFor="female"
                    className="flex px-3 flex-row  py-1 essayLabel"
                  >
                    <input
                      type="radio"
                      className="prompt opacity-0"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender == "female"}
                      required={true}
                      onChange={(e) => HandleFormData(e)}
                    />

                    <div className="bg-gray-100 border-2 flex flex-row items-center gap-4 py-2 px-3 rounded-md Promptlabel cursor-pointer invalid:border-pink-600 top-0">
                      <span className="text-2xl thumb">
                        <FcBusinesswoman />
                      </span>
                      <span>Female</span>
                    </div>
                  </label>
                </div>

                <TextInputs
                  required={true}
                  type="text"
                  label="place of residence"
                  classextend="mt-10"
                  name="residence"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.residence}
                />

                <div className="mt-10">
                  <strong>Date of Birth *</strong>
                </div>
                <TextInputs
                  required={true}
                  type="date"
                  label=""
                  classextend=""
                  name="dateOfBirth"
                  autofocus={true}
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.dateOfBirth}
                />

                <TextInputs
                  required={false}
                  type="tel"
                  label="Phone number (Call)"
                  classextend="mt-10"
                  name="phone"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.phone}
                />

                <TextInputs
                  required={false}
                  type="tel"
                  label="Phone number (WhatsApp)"
                  classextend="mt-10"
                  name="whatsappNumber"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.whatsappNumber}
                />

                <TextInputs
                  required={true}
                  type="text"
                  label="recent school"
                  classextend="mt-10"
                  name="recentSchool"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.recentSchool}
                />
                <div>
                  <strong>NB: </strong> if you are not in school, state the last
                  school you attended
                </div>

                <TextInputs
                  required={false}
                  type="text"
                  label="current university"
                  classextend="mt-10"
                  name="currentUniversity"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.currentUniversity}
                />
                <div>
                  <strong>NB: </strong> if you are not in university, you can
                  leave it blank
                </div>

                <div className="mt-10">
                  <strong>{` Year of Completion (High school) `}</strong>
                </div>
                <TextInputs
                  required={true}
                  type="date"
                  name="yearOfCompletion"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.yearOfCompletion}
                />
                <div>
                  <strong>NB: </strong> We are only interested in the year you
                  completed. If you are still in high school, state the expected
                  gradution date.
                </div>

                <TextInputs
                  required={false}
                  type="tel"
                  label="year / level"
                  classextend="mt-10"
                  name="level"
                  handlechange={(e) => HandleFormData(e)}
                  disabled={false}
                  value={formData.level}
                />

                <div>
                  <strong>NB: </strong> Provide only if you are in university
                </div>

                <div className="mt-10">
                  <strong>NB: </strong>
                  If you dont have a copy of your WASSCE results, type the
                  subjects and the subjects and the grade obtaibed in each of
                  them in the sapce below
                </div>

                <textarea
                  className="w-full md:w-10/12 border-2 border-slate-300 rounded-md  focus:outline-MdBlue transition-all"
                  name="wassceText"
                  rows={7}
                  value={formData.wassceText}
                  onChange={(e) => HandleFormData(e)}
                />
                <div>
                  <strong>Example: </strong>
                  English A1, Social Studies A1, etc..
                </div>

                <h2 className="text-center font-bold mt-10 text-20">ESSAYS</h2>

                <div className="mt-10">
                  <strong className="text-red-600">NB: </strong> The purpose of
                  this essay is not to assess your ability to write. We hope to
                  learn more about you through this essay. This will assist us
                  in providing the assistance you require during the college
                  application process.
                </div>

                <div className="mt-10">
                  <strong>
                    Write an essay of 300-400 words or more on one of the topics
                    listed below.
                  </strong>
                </div>

                <label
                  htmlFor="prompt1"
                  className="w-full mt-5 flex flex-row  py-1 essayLabel"
                  style={{ width: "100%" }}
                >
                  <input
                    type="radio"
                    className="prompt opacity-0"
                    id="prompt1"
                    name="essayQuestion"
                    value={"1"}
                    checked={formData.essayQuestion == "1"}
                    onChange={(e) => HandleFormData(e)}
                  />

                  <div className="w-full bg-gray-100 border-2 flex flex-row items-center gap-4 py-2 px-3 rounded-md Promptlabel cursor-pointer invalid:border-pink-600 top-0">
                    <span className="text-2xl thumb">
                      <HiThumbUp />
                    </span>
                    <span>1. Tell us about yourself</span>
                  </div>
                </label>

                <label
                  htmlFor="prompt2"
                  className="w-full flex flex-row  py-1 essayLabel"
                  style={{ width: "100%" }}
                >
                  <input
                    type="radio"
                    className="prompt opacity-0"
                    id="prompt2"
                    name="essayQuestion"
                    value={"2"}
                    checked={formData.essayQuestion == "2"}
                    onChange={(e) => HandleFormData(e)}
                  />

                  <div className="w-full bg-gray-100 border-2 flex flex-row items-center gap-4 py-2 px-3 rounded-md Promptlabel cursor-pointer invalid:border-pink-600 top-0">
                    <span className="text-2xl thumb">
                      <HiThumbUp />
                    </span>
                    <span>
                      2. Share a personal achievement, incident, or insight that
                      prompted personal growth and a new knowledge of yourself
                      or others.
                    </span>
                  </div>
                </label>

                <label
                  htmlFor="prompt3"
                  className="w-full flex flex-row  py-1 essayLabel"
                  style={{ width: "100%" }}
                >
                  <input
                    type="radio"
                    className="prompt opacity-0"
                    id="prompt3"
                    name="essayQuestion"
                    checked={formData.essayQuestion == "3"}
                    value={"3"}
                    onChange={(e) => HandleFormData(e)}
                  />

                  <div className="w-full bg-gray-100 border-2 flex flex-row items-center gap-4 py-2 px-3 rounded-md Promptlabel cursor-pointer invalid:border-pink-600 top-0">
                    <span className="text-2xl thumb">
                      <HiThumbUp />
                    </span>
                    <span>
                      3. The lessons we learn from our setbacks might be crucial
                      to our long-term success. Recount a period when you were
                      confronted with a problem, a setback, or a failure. What
                      effect did it have on you, and what did you learn from it?
                      .
                    </span>
                  </div>
                </label>

                <label
                  htmlFor="prompt4"
                  className="w-full flex flex-row  py-1 essayLabel"
                  style={{ width: "100%" }}
                >
                  <input
                    type="radio"
                    className="prompt opacity-0"
                    id="prompt4"
                    name="essayQuestion"
                    checked={formData.essayQuestion == "4"}
                    value={"4"}
                    onChange={(e) => HandleFormData(e)}
                  />

                  <div className="w-full bg-gray-100 border-2 flex flex-row items-center gap-4 py-2 px-3 rounded-md Promptlabel cursor-pointer invalid:border-pink-600 top-0">
                    <span className="text-2xl thumb">
                      <HiThumbUp />
                    </span>
                    <span>
                      4. Share an essay on any subject you want. It can be one
                      that you've already written, one that responds to a new
                      scenario, or one that you've created yourself. .
                    </span>
                  </div>
                </label>

                <div className="mt-10">
                  <strong>
                    Click to select one of the options above and Paste your
                    essay here
                  </strong>
                </div>

                <textarea
                  className="w-full md:w-full border-2 border-slate-300 rounded-md  focus:outline-MdBlue transition-all p-2"
                  rows={10}
                  max={400}
                  name="essayAnswer"
                  value={formData.essayAnswer}
                  placeholder="Type/Paste your essay here"
                  onChange={(e) => HandleFormData(e)}
                />

                <ButtonDefault>Submit Application</ButtonDefault>
              </div>
            )}
          </form>
        </aside>

        <aside className="hidden bg-MdBlue md:w-4/12 md:flex flex-col justify-center items-center overflow-hidden">
          <h1 className="text-4xl px-5 text-center font-bold text-white">
            The Impossibility, Our Speciality
          </h1>
          <img src={Banner} alt="Logo" />
        </aside>
        <ToastContainer />
      </main>
    </>
  );
}
