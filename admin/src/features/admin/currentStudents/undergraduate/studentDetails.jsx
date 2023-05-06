import React, { useState, Suspense, useMemo } from "react";
import { Link, useParams, defer, useLoaderData, Await } from "react-router-dom";
import { HiChevronDoubleLeft, HiChevronDown, HiChevronUp, HiBadgeCheck, HiLocationMarker, HiMail, HiPhone, HiLibrary, HiChat } from "react-icons/hi";
import Logo from "../../../../assets/images/studentLogo.png";

import { useSelector } from "react-redux";
import { selectUserById } from "../../../../apiSlice/usersApiSlice";
import { useGetUsersQuery } from "../../../../apiSlice/usersApiSlice";
import "./style.css";

import { MediumLoader } from "../../../../components/loaders/loader";
import { HiPencil } from "react-icons/hi2";

function StudentDetails() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery()
  
  const params = useParams();
  const studentId = params.id;
  const student = useSelector((state) => selectUserById(state, studentId));

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <MediumLoader />
      </div>
      
      )
  }
  
 
  return (


      <div className="relative py-10 mt-20 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6 flex flex-col">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img src={student?.avatar} alt={student?.firstName} style={{height:"5cm", width: "5cm",}} className="border-2 border-white shadow-xl rounded-full -mt-20"/>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center ">
                  <div className="py-6 px-3 mt-32 sm:mt-0 flex justify-center md:justify-end">
                    <Link
                      to="setting"
                      className="bg-MdBlue active:bg-blue-900 uppercase text-white font-bold hover:shadow-md hover:bg-blue-700 shadow text-15 px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 flex flex-row justify-center items-center gap-x-2"
                    >
                      <HiChat /> <span>Message</span>
                    </Link>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-1 lg:order-1 ">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8 ">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                       0
                      </span>
                      <span className="text-sm text-blueGray-400">Schools</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        0
                      </span>
                      <span className="text-sm text-blueGray-400">Essays</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        0
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Activites
                      </span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                       0
                      </span>
                      <span className="text-sm text-blueGray-400">Honors</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700">
                  {`${student?.firstName} ${student?.lastName}`}
                </h3>
                <div className="text-sm flex flex-row justify-center items-center gap-x-1 leading-normal mt-5  text-blueGray-400 font-bold uppercase">
                  <HiLocationMarker />
                  {`${student?.residence}`}
                </div>

                <div className="text-sm flex flex-row justify-center items-center gap-x-1 leading-normal mt-5  text-blueGray-400 capitalize">
                  <HiLibrary />
                  {`${student?.school}`}
                </div>

                <div className="text-sm flex flex-row justify-center items-center gap-x-1 leading-normal mt-5  text-blueGray-400 capitalize">
                  <HiMail />
                  {`${student?.email}`}
                </div>

                <div className="text-sm flex flex-row justify-center items-center gap-x-1 leading-normal mt-5  text-blueGray-400 capitalize">
                  <HiPhone />
                  {`${student?.phone}`}
                </div>
              </div>

              <div className="mt-10 flex flex-col py-10 border-t border-blueGray-200 text-center">
                <h3 className="text-start md:text-center font-bold text-18">
                  Key Interest
                </h3>

                <div className="w-full self-center lg:w-9/12 px-4 mt-3">
                  <div className="flex w-full justify-center gap-4 flex-row flex-wrap">
                    {!student?.keyInterest.length? (
                      <h1>No listed interest</h1>
                    ): student?.keyInterest.map((interest,index)=>(
                      <div key={index} className="py-1 font-bold text-white px-3 bg-blue-900 rounded-md">
                      {interest.text}
                    </div>
                    ))
                
                  }
                  </div>
                </div>

                <h3 className="text-start md:text-center font-bold text-18 mt-10">
                  Intended Major
                </h3>

                <div className="w-full self-center lg:w-9/12 px-4 mt-3">
                  <div className="flex w-full justify-center gap-4 flex-row flex-wrap">
                    {!student?.intendedMajor.length? (
                      <h1>No listed interest</h1>
                    ): student?.intendedMajor.map((major,index)=>(
                      <div key={index} className="py-1 font-bold text-white px-3 bg-emerald-700 rounded-md">
                      {major.text}
                    </div>
                    ))
                
                  }
                  </div>
                </div>

                <h3 className="text-start md:text-center font-bold text-18 mt-10">
                  Bio
                </h3>

                <div className="flex flex-wrap  justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 mt-5 text-lg leading-relaxed text-blueGray-700">
                      {student?.bio ? `${student.bio}`: `No bio available`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
               
              </div>
            </div>
          </div>
        </footer>
      </div>

  );
}

export default StudentDetails;
