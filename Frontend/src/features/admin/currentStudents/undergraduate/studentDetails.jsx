import React, { useState, Suspense } from "react";
import Page from "../../../../components/shared/page";
import { Link, useParams,defer, useLoaderData, Await } from "react-router-dom";
import { HiChevronDoubleLeft } from "react-icons/hi";
import Logo from "../../../../assets/images/studentLogo.png";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../../apiSlice/usersApiSlice";
import { useGetUsersQuery } from "../../../../apiSlice/usersApiSlice";
import "./style.css";
import { getAUserReview } from "../../../../app/api/api";
import { HiBadgeCheck } from "react-icons/hi";

function StudentDetails() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  let profile = null;
  const params = useParams();
  const studentId = params.id;
  const user = useSelector((state) => selectUserById(state, studentId));
  const loadedData = useLoaderData()

  if (isLoading) {
    profile = <h1>Loading...</h1>;
  }


  if (isSuccess) {
    profile = (
      <StudentProfile
        avatar={user?.avatar}
        fullName={`${user?.firstName} ${user?.lastName}`}
        email={user?.email}
      />
    );
  }

  return (
    <Page>
      <Link
        to=".."
        relative="path"
        className="text-MdBlue font-semibold flex items-center gap-1"
      >
        <HiChevronDoubleLeft /> Back to all students
      </Link>

      {profile}


<Suspense fallback={<h1>Loading Review Documents</h1>}>
 <Await resolve={loadedData.reviews}>
{(reviews)=>{

 reviews.sort((a, b) => {
  if (a.status === "unresolved" && b.status !== "unresolved") {
    return -1; // a comes first
  }
  if (a.status !== "unresolved" && b.status === "unresolved") {
    return 1; // b comes first
  }
  return 0; // no change in order
},)


return(
  <>
  
      <h2 className="text-center mt-10 text-2xl font-bold">{`${user?.firstName}'s Documents`}</h2>

      <div className="relative mb-24 shadow-md rounded-md mt-5">
        <table className="w-full rounded-md text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3 tabel-hide">
                NO.
              </th>
              <th scope="col" className="px-6 py-3">
                Document type
              </th>
              <th scope="col" className="px-6 py-3 ">
                status
              </th>
              <th scope="col" className="px-6 py-3 tabel-hide">
                deadline
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
{reviews.map((review,index)=>{



  return(
<tr className="bg-white cursor-pointer border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 tabel-hide">{index + 1}</td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
             {review.onModel}
            </th>
            <td
          className={`px-6 py-4 capitalize flex flex-row gap-x-1 items-center ${
            review.status == "unresolved"
              ? "text-blue-600 font-bold"
              : review.status == "resolved"
              ? "text-emerald-500 font-bold"
                           : null
          }`}
        >{
          review.status == "unresolved"
            ? "pending"
            : review.status == "resolved"
            ?( <>
            <HiBadgeCheck />
            <span>resolved</span>
            </>  )
                         : null
        }</td>
            <td className="px-6 py-4 tabel-hide">{review.deadline}</td>
            <td className="px-6 py-4 text-right">
              <Link
                to={`${review._id}`}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Review Document
              </Link>
            </td>
          </tr>
  )
})}
          
        </table>
      </div>
  </>
)
}}
 </Await>
</Suspense>

    </Page>
  );
}

export default StudentDetails;

export function StudentProfile(props) {
  const [showStudentProfile, setShowStudentProfile] = useState(true);

  return (
    <>
      <button
        className="self-start mt-10 ml-5 py-1 px-3 rounded-lg bg-MdBlue text-white font-bold flex flex-row items-center justify-center md:ml-10"
        onClick={() => setShowStudentProfile((prev) => !prev)}
      >
        {`${showStudentProfile ? "Hide" : "Show"} Student name profile`}

        <span className="text-3xl">
          {showStudentProfile ? <HiChevronUp /> : <HiChevronDown />}
        </span>
      </button>
      {showStudentProfile && (
        <div className="w-full md:w-10/12 self-center mt-3 flex justify-center items-center md:flex-row flex-col rounded-2xl bg-gray-100 py-2 gap-x-10 ">
          <div className="md:h-80 h-64 w-64 rounded-full bg-white md:w-80 overflow-hidden">
            <img
              src={`${props.avatar}`}
              alt="student name"
              className="w-full h-full"
            />
          </div>
          <div className="mt-3">
            <h1 className="text-3xl font-bold">{props.fullName}</h1>
            <h2>
              <span>Email: </span> <span>{props.email}</span>
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export function ReviewFromUserLoader({params}){
  return defer({reviews: getAUserReview(params.id)})
}
