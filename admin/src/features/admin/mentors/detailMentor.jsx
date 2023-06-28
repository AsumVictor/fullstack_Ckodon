import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  HiLocationMarker,
  HiMail,
  HiPhone,
  HiLibrary,
  HiChat,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import Page from "../../../components/shared/page";
import {
  useGetMentorQuery,
  useAssignMentorMutation,
} from "../../../apiSlice/mentors";
import { useGetStudentsQuery } from "../../../apiSlice/usersApiSlice";
import TextareaAutosize from "react-textarea-autosize";
import { MediumLoader } from "../../../components/loaders/loader";
import { HiPencil } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import ModalBox, {
  ModalBody,
  ModalFooter,
} from "../../../components/modal.js/ModalBox";
import { CoverLoaderMedium } from "../../../components/loaders/loader";



function DetailMentor() {
  const params = useParams();
  const {
    data: mentor,
    isLoading: getMentor,

  } = useGetMentorQuery(params.id);
  const {
    data: students,
    isLoading: getStudents,
  } = useGetStudentsQuery();
  const [assignStudent, { isLoading: updating }] = useAssignMentorMutation();
  const [readToAssign, setReadToAssign] = useState(false);
  const [studentName, setStudentName] = useState("");
  let isLoading = getMentor || updating || getStudents



  async function assignMentor() {
    try {
      let res = await assignStudent({
        studentId: studentName,
        mentorId: params.id,
      });
      if (res?.data?.isSuccess) {
        setReadToAssign(false);
        setStudentName('');
        toast.success(`${res.data.message}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (res.error) {
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
      } else {
        toast.error("Error occured! Try again", {
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
      toast.error("Error occured! Try again", {
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

  return (
    <>
      <Page>
        <div className="relative py-10 mt-10 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
              <div className="px-6 flex flex-col">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        src={mentor?.avatar}
                        alt={mentor?.firstName}
                        style={{ height: "5cm", width: "5cm" }}
                        className="border-2 border-white shadow-xl rounded-full -mt-20"
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center ">
                    <div className="py-6 px-3 mt-10 sm:mt-0 flex justify-center md:justify-end flex-wrap gap-x-3">
                      <button className="bg-MdBlue active:bg-blue-900 uppercase text-white font-bold hover:shadow-md hover:bg-blue-700 shadow text-15 px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 flex flex-row justify-center items-center gap-x-2">
                        <HiChat /> <span>Message</span>
                      </button>
                      <button className="bg-emerald-700 active:bg-blue-900 uppercase text-white font-bold hover:shadow-md hover:bg-blue-700 shadow text-15 px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 flex flex-row justify-center items-center gap-x-2"
                      onClick={()=>setReadToAssign(true)}
                      >
                        <HiOutlineSwitchHorizontal />
                        <span>Assign Student</span>
                      </button>
                    </div>
                  </div>

                  <div className="w-full lg:w-4/12 px-1 lg:order-1 ">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8 ">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {mentor?.students?.length}
                        </span>
                        <span className="text-sm text-emerald-600 font-bold">
                          Mentees
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700">
                    {`${mentor?.firstName} ${mentor?.lastName}`}
                  </h3>
                  <div className="text-sm flex flex-row justify-center items-center gap-x-1 leading-normal mt-5  text-blueGray-400 font-bold uppercase">
                    <HiLocationMarker />
                    {`${mentor?.residence}`}
                  </div>

                  <div className="text-sm flex flex-row justify-center items-center gap-x-1 leading-normal mt-5  text-blueGray-400 capitalize">
                    <HiLibrary />
                    {`${mentor?.school}`}
                  </div>

                  <div className="text-sm flex flex-row justify-center items-center gap-x-1 leading-normal mt-5  text-blueGray-400 capitalize">
                    <HiMail />
                    {`${mentor?.email}`}
                  </div>

                  <div className="text-sm flex flex-row justify-center items-center gap-x-1 leading-normal mt-5  text-blueGray-400 capitalize">
                    <HiPhone />
                    {`${mentor?.phone}`}
                  </div>
                </div>

                <div className="flex w-full py-3 mt-10 pb-10 flex-col justify-center">
                  <h2 className="font-bold text-2xl text-center">{`Students under ${mentor?.firstName} ${mentor?.lastName} mentorship`}</h2>

                  <div className="flex flex-wrap gap-3 w-full p-2 mt-10">
                    {mentor?.mentees?.map((mente) => (
                      <Link
                        to={`../undergraduate-students/${mente._id}`}
                        className="w-48 border-2 rounded-2xl py-2 cursor-pointer hover:bg-blue-50 flex justify-center flex-col"
                      >
                        <img
                          src={mente?.avatar}
                          alt={mente?.firstName}
                          style={{ height: "4cm", width: "4cm" }}
                          className="border-2 border-white shadow-xl self-center rounded-full"
                        />
                        <p className="text-center w-full font-bold mt-1">
                          {`${mente?.firstName} ${mente?.lastName}`}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center"></div>
              </div>
            </div>
          </footer>
        </div>
      </Page>
      {readToAssign && (
        <ModalBox modalHeader="Asign Student to a mentor">
          <ModalBody>
            <div className="w-full gap-3 flex flex-row">
              <div className="flex flex-col w-full">
                <h3 className="text-center font-bold">Student Name</h3>
                <select
                  id="studentName"
                  className="bg-gray-50 mt-3 self-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setStudentName(e.target.value)}
                >
                  <option selected value="">
                    Select an option
                  </option>
                  {students?.map((student) => (
                    <option
                      value={student._id}
                      selected={studentName == `${student._id}`}
                    >
                      {student?.firstName} {student?.lastName}
                    </option>
                  ))}
                </select>
              </div>
           
            </div>
          </ModalBody>
          <ModalFooter class="py-2 gap-4 justify-end px-4">
            <button
              className="py-2 px-4 capitalize shadow-md text-pink-700 font-bold rounded-md "
              onClick={() => {
                setReadToAssign(false);
                setStudentName("");
              }}
            >
              cancel
            </button>
            <button
              className="py-2 px-4 disabled:bg-slate-400 disabled:cursor-not-allowed bg-emerald-600 shadow-md text-white font-bold rounded-md "
              onClick={() => assignMentor()}
              disabled={!studentName || isLoading}
            >
              Assign
            </button>
          </ModalFooter>
        </ModalBox>
      )}
      <ToastContainer />
      {isLoading && <CoverLoaderMedium />}
    </>
  );
}

export default DetailMentor;
