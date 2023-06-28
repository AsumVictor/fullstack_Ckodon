import React, { useState } from "react";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import {
  useInviteMentorMutation,
  useDeleteMentorMutation,
  useGetMentorsQuery,
  useAssignMentorMutation,
} from "../../../apiSlice/mentors";
import { useGetStudentsQuery } from "../../../apiSlice/usersApiSlice";
import Page from "../../../components/shared/page";
import NoContent from "../../../components/indications/noContent";
import { CoverLoaderMedium } from "../../../components/loaders/loader";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  RefreshToolkit,
  CustomToolkit,
} from "../../../components/toolkits/tollkit";
import { NormalInputs } from "../../../components/customHTML/textInputs";
import { ButtonDefault } from "../../../components/buttons";
import {
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import { HiBarsArrowUp, HiBarsArrowDown } from "react-icons/hi2";
import ModalBox, {
  ModalBody,
  ModalFooter,
} from "../../../components/modal.js/ModalBox";
function AllMentors() {
  const { data: mentors, isLoading: getmentor } = useGetMentorsQuery();
  const { data: students, isLoading: getStudents } = useGetStudentsQuery();
  const [assignMentors, { isLoading: assigning }] = useAssignMentorMutation();
  const [inviteMentorQuery, {isLoading: inviting}] = useInviteMentorMutation()
  const [readToAssign, setReadToAssign] = useState(false);
  const [readToAddMentor, setReadToAddMentor] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  let content;
  const isLoading = getmentor || getStudents || assigning || inviting

  if (!mentors?.length) {
    content = <NoContent message="No mentor found" />;
  } else {
    content = (
      <table className="w-full text-sm text-left text-gray-500 mt-14 dark:text-gray-400 shadow-md rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
          <tr>
            <th scope="col" className="px-6 py-3 tabel-hide">
              NO.
            </th>
            <th scope="col" className="px-6 py-3">
              Mentor name
            </th>
            <th scope="col" className="px-6 py-3 tabel-hide">
              school
            </th>
            <th scope="col" className="px-6 py-3 tabel-hide">
              time added
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        {mentors?.map((mentor, index) => (
          <tr className="bg-white cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 tabel-hide">{index + 1}</td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {`${mentor.firstName} ${mentor.lastName}`}
            </th>
            <td className="px-6 py-4 tabel-hide">{mentor.school}</td>
            <td className="px-6 py-4 tabel-hide">...</td>
            <td className="px-6 py-4 text-right">
              <Link
                to={`${mentor._id}`}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Open Files
              </Link>
            </td>
          </tr>
        ))}
      </table>
    );
  }

  //Assign mentor to student

  async function assignMentor() {
    try {
      let res = await assignMentors({
        studentId: studentName,
        mentorId: mentorName,
      });
      if (res?.data?.isSuccess) {
        setReadToAssign(false);
        setMentorName('');
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
  async function inviteMentor() {
    try {
      let res = await inviteMentorQuery({
        email: mentorEmail,
      });
      if (res?.data?.isSuccess) {
        setReadToAddMentor(false);
        setMentorEmail('');
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
        <h1 className="text-center font-bold text-MdBlue text-18">
          All enrolled undergraduate students
        </h1>

        <div className="flex felx-row justify-between items-center w-full flex-wrap gap-y-2 mt-5 sticky top-0">
          <div className="flex flex-row justify-between items-center w-full gap-2 md:w-5/12">
            <NormalInputs
              type="text"
              name="search"
              placeholder="Search mentor by name..."
            />
            <ButtonDefault>
              <HiOutlineSearch /> Search
            </ButtonDefault>
          </div>
          <div className="flex flex-row justify-between items-center gap-5 md:gap-3">
            <CustomToolkit
              content="Asign Mentor"
              id="assignMentor"
              action={() => setReadToAssign(true)}
              icon={<HiOutlineSwitchHorizontal />}
            />
            <CustomToolkit
              content="Add New Mentor"
              id="addMentor"
              icon={<HiOutlinePlus />}
              action={() => setReadToAddMentor(true)}
            />
            <RefreshToolkit />
          </div>
          {content}
        </div>
      </Page>
      {readToAssign && (
        <ModalBox modalHeader="Asign Student to a mentor">
          <ModalBody>
            <div className="w-full gap-3 flex flex-row">
              <div className="flex flex-col w-1/2">
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
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-1/2">
                <h3 className="text-center font-bold">Mentor Name</h3>
                <select
                  id="mentorName"
                  className="bg-gray-50 mt-3 self-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setMentorName(e.target.value)}
                >
                  <option selected value="">
                    Select an option
                  </option>
                  {mentors?.map((mentor) => (
                    <option
                      value={mentor._id}
                      selected={mentorName == `${mentor._id}`}
                    >
                      {mentor.firstName} {mentor.lastName}
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
                setMentorName("");
                setStudentName("");
              }}
            >
              cancel
            </button>
            <button
              className="py-2 px-4 disabled:bg-slate-400 disabled:cursor-not-allowed bg-emerald-600 shadow-md text-white font-bold rounded-md "
              onClick={() => assignMentor()}
              disabled={!studentName || !mentorName || isLoading}
            >
              Assign
            </button>
          </ModalFooter>
        </ModalBox>
      )}
      {readToAddMentor && (
        <ModalBox modalHeader="Invite a mentor here">
          <ModalBody>
            <label htmlFor="mentorEmail" className="px-1 md:px-3">
              Invite mentor through email
            </label>
            <input
              type="email"
              name="mentorEmail"
              id="mentorEmail"
              placeholder="Add mentor's email"
              onChange={(e)=>{
                setMentorEmail(e.target.value)
                setIsValidEmail(emailRegex.test(mentorEmail));
              }}
              className="border-2 border-MdBlue focus:border-emerald-600 py-2 px-3 rounded-md"
            />
          </ModalBody>
          <ModalFooter class="py-2 gap-4 justify-end px-4">
            <button
              className="py-2 px-4 capitalize shadow-md text-pink-700 font-bold rounded-md "
              onClick={() => {
                setReadToAddMentor(false);
                setMentorEmail("");
              }}
            >
              cancel
            </button>
            <button
              className="py-2 px-4 disabled:bg-slate-400 disabled:cursor-not-allowed bg-emerald-600 shadow-md text-white font-bold rounded-md "
              onClick={() => inviteMentor()}
              disabled={!mentorEmail || isLoading || !isValidEmail}
            >
              Invite
            </button>
          </ModalFooter>
        </ModalBox>
      )}
      <ToastContainer />
      {isLoading && <CoverLoaderMedium />}
    </>
  );
}
export default AllMentors;
