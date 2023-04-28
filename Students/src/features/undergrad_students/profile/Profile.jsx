import React from "react";
import "./tailwind2.css";
import "./tailwind.css";
import Banner from "../../../assets/images/Banner.png";
import { HiPencil } from "react-icons/hi2";
import { HiLocationMarker, HiMail, HiPhone, HiLibrary } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom/dist/umd/react-router-dom.development";

function Profile() {
  const student = useAuth();
console.log(student)
  return (
    <main className="profile-page overflow-y-auto">
      <div className="relative block h-500-px">
        <div className=" absolute top-0 w-full flex justify-center items-start h-full bg-center bg-cover bg-MdBlue">
          <img
            src={Banner}
            alt="banner"
            className="md:w-6/12 w-10/12 md:mt-0 mt-20"
          />
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <div className="relative py-10 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6 flex flex-col">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={`${student?.avatar}`}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center ">
                  <div className="py-6 px-3 mt-32 sm:mt-0 flex justify-center md:justify-end">
                    <Link
                      to="setting"
                      className="bg-MdBlue active:bg-blue-900 uppercase text-white font-bold hover:shadow-md hover:bg-blue-700 shadow text-15 px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 flex flex-row justify-center items-center gap-x-2"
                    >
                      <HiPencil /> <span>update</span>
                    </Link>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-1 lg:order-1 ">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8 ">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">Schools</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Essays</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Activites
                      </span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
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
                      {interest.interest}
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
                      {major.major}
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
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
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
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Created by{" "}
                  <a
                    href="https://www.linkedin.com/in/victorasumdev/"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                  >
                    {" "}
                    Asum
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Profile;
