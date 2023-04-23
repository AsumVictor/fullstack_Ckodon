import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { HiSun, HiChartPie, HiChevronDown, HiUsers } from "react-icons/hi";
import {
  HiAcademicCap,
  HiChatBubbleBottomCenterText,
  HiMegaphone,
  HiBookOpen,
} from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import { MdAssignment } from "react-icons/md";
import Logo from "../../../assets/images/logoWhite.jpg";
import StudentLogo from "../../../assets/images/studentLogo.png";
import SideNav from "../../../components/shared/sideNav";
import Navbar from "../../../components/shared/navbar";
import "../../../components/shared/style.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import './style.css'
import { useSendLogoutMutation } from '../../auth/authApiSlice'


function SharedLayout() {
  const navigate = useNavigate()
  const [isSideNavShow, setIsSideNavShow] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [isDropdown1Open, setIsDropdown1Open] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);
  const [isDropdown3Open, setIsDropdown3Open] = useState(false);

  function toogleSideNav() {
    setIsSideNavShow((prevState) => !prevState);
  }

  const activeStyle = {
    color: "#2455FE",
    backgroundColor: "white",
  };

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useSendLogoutMutation()

useEffect(() => {
    if (isSuccess) navigate('/')
}, [isSuccess, navigate])

if (isLoading) return <p>Logging Out...</p>

  return (
    <section className={`${isSideNavShow ? "toggle-space" : null}`}>
      <SideNav isShow={isSideNavShow}>
        <div className="text-white flex flex-row font-bold my-10 gap-4 items-center text-2xl">
          <img
            src={Logo}
            alt="ckodon"
            className="rounded-md"
            style={{ width: "52px", height: "52px" }}
          />
          {isSideNavShow && <span> Ckodon</span>}
        </div>
        <div className="">

          <NavLink
          end
            to="dashboard"
            id='dashboard'
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({isActive}) => ( isActive ? activeStyle : null)}
          >
            <HiChartPie /> {isSideNavShow && <span> Dashboard</span>}
          </NavLink>


          {/* Students dropdown to select between grauduates and undergraduates */}
          <div className="dropdown1 rounded-md bg-blue-400 pb-2">
            <div
              className={`flex cursor-pointer capitalize flex-row items-center gap-3 ${
                !isSideNavShow ? "justify-center" : "justify-start"
              } text-white font-semibold text-18 py-1 px-2 mt-5 rounded-md ${isDropdown1Open? 'text-white bg-blue-800': null}`}
              onClick={() => setIsDropdown1Open((prev) => !prev)}
            >
              <HiUsers />
              {isSideNavShow && <span> Students</span>} <HiChevronDown />
            </div>

            {isDropdown1Open && (
              <div className="px-1">
                <NavLink
                  to="undergraduate-students"
                  id='undergraduate-students'
                  onClick={() => setIsSideNavShow(false)}
                  className={`flex capitalize flex-row items-center gap-3 mt-2 ${
                    !isSideNavShow ? "justify-center" : "justify-start"
                  } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
                  style={({isActive}) => (isActive ? activeStyle : null)}
                >
                  <HiAcademicCap />
                  {isSideNavShow && <span> undergradute</span>}
                </NavLink>
                <NavLink
                  to="graduate-students"
                  id='graduate-students'
                  onClick={() => setIsSideNavShow(false)}
                  className={`flex capitalize flex-row items-center gap-3 mt-2 ${
                    !isSideNavShow ? "justify-center" : "justify-start"
                  } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
                  style={({isActive}) => (isActive ? activeStyle : null)}
                >
                  <ImUserTie /> {isSideNavShow && <span> Gradutes</span>}
                </NavLink>
              </div>
            )}
          </div>

          <div className="dropdown3 rounded-md bg-blue-400 pb-2">
            <div
              className={`flex cursor-pointer capitalize flex-row items-center gap-3 ${
                !isSideNavShow ? "justify-center" : "justify-start"
              } text-white font-semibold text-18 py-1 px-2 mt-5 rounded-md ${isDropdown3Open? 'text-white bg-blue-800': null}`}
              onClick={() => setIsDropdown3Open((prev) => !prev)}
            >
              <MdAssignment />
              {isSideNavShow && <span> Task reviews</span>} <HiChevronDown />
            </div>

            {isDropdown3Open && (
              <div className="px-1">
                <NavLink
                  to="reviews-undergraduates"
                  id='reviews-undergraduates'
                  onClick={() => setIsSideNavShow(false)}
                  className={`flex capitalize flex-row items-center gap-3 mt-2 ${
                    !isSideNavShow ? "justify-center" : "justify-start"
                  } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
                  style={({isActive}) => (isActive ? activeStyle : null)}
                >
                  <HiAcademicCap />{" "}
                  {isSideNavShow && <span> undergradute</span>}
                </NavLink>
                <NavLink
                  to="reviews-gradutes"
                  id='reviews-gradutes'
                  onClick={() => setIsSideNavShow(false)}
                  className={`flex capitalize flex-row items-center gap-3 mt-2 ${
                    !isSideNavShow ? "justify-center" : "justify-start"
                  } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
                  style={({isActive}) => (isActive ? activeStyle : null)}
                >
                  <ImUserTie /> {isSideNavShow && <span> Gradutes</span>}
                </NavLink>
              </div>
            )}
          </div>

          {/* Students dropdown to select between grauduates and undergraduates */}
          <div className="dropdown2 rounded-md bg-blue-400 pb-2">
            <div
              className={`flex cursor-pointer capitalize flex-row items-center gap-3 ${
                !isSideNavShow ? "justify-center" : "justify-start"
              } text-white font-semibold text-18 py-1 px-2 mt-5 rounded-md ${isDropdown2Open? 'text-white bg-blue-800': null} `}
              onClick={() => setIsDropdown2Open((prev) => !prev)}
            >
              <HiUsers />
              {isSideNavShow && <span clas> Applicants</span>} <HiChevronDown />
            </div>

            {isDropdown2Open && (
              <div className="px-1">
                <NavLink
                  to="undergraduate-applicants"
                  id='undergraduate-applicants'
                  onClick={() => setIsSideNavShow(false)}
                  className={`flex capitalize flex-row items-center gap-3 mt-2 ${
                    !isSideNavShow ? "justify-center" : "justify-start"
                  } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
                  style={({isActive}) => (isActive ? activeStyle : null)}
                >
                  <HiAcademicCap />{" "}
                  {isSideNavShow && <span> undergradute</span>}
                </NavLink>
                <NavLink
                  to="applicants-graduates"
                  id='applicants-graduates'
                  onClick={() => setIsSideNavShow(false)}
                  className={`flex capitalize flex-row items-center gap-3 mt-2 ${
                    !isSideNavShow ? "justify-center" : "justify-start"
                  } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
                  style={({isActive}) => (isActive ? activeStyle : null)}
                >
                  <ImUserTie /> {isSideNavShow && <span> Gradutes</span>}
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="sat-students"
            id='sat-students'
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({isActive}) => (isActive ? activeStyle : null)}
          >
            <HiBookOpen /> {isSideNavShow && <span> SAT students</span>}
          </NavLink>

          <NavLink
            to="broadcast"
            id='broadcast'
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({isActive}) => (isActive ? activeStyle : null)}
          >
            <HiMegaphone /> {isSideNavShow && <span> broadcast</span>}
          </NavLink>

          <NavLink
            to="chat"
            id='chat'
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({isActive}) => (isActive ? activeStyle : null)}
          >
            <HiChatBubbleBottomCenterText />{" "}
            {isSideNavShow && <span> chat</span>}
          </NavLink>

          <NavLink
            to="chat-room"
            id='chat-room'
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({isActive}) => (isActive ? activeStyle : null)}
          >
            <HiBookOpen /> {isSideNavShow && <span> Community</span>}
          </NavLink>

        </div>
      </SideNav>
      <ReactTooltip
        anchorId="dashboard"
        place="right"
        variant="info"
        content="Dashboard"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="undergraduate-students"
        place="right"
        variant="info"
        content="Undergraduate Students"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
       <ReactTooltip
        anchorId="graduate-students"
        place="right"
        variant="info"
        content="Graduate Students"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="chat"
        place="right"
        variant="info"
        content="Chat"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="sat-students"
        place="right"
        variant="info"
        content="Sat Student"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="chat-room"
        place="right"
        variant="info"
        content="Chat Room"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="broadcast"
        place="right"
        variant="info"
        content="Broadcast"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
     
      
      <div className={`main ${isSideNavShow ? "toggle-space" : null}`}>
        <Navbar toggleSidenav={toogleSideNav} isShow={isSideNavShow}>
          {/* Ckodon or admin text */}
          <span className="hidden md:block">Admin</span>
          {/* Theme and User profile */}
          <div className="flex flex-row relative justify-center items-center gap-4">
            {/* Theme toggler */}
            <div className="theme cursor-pointer p-2 shadow-md rounded-2xl">
              <HiSun />
            </div>
            {/* user profile */}
            <div
              className={`${
                showProfileSettings ? "active" : null
              } profileIcon cursor-pointer overflow-hidden`}
              onClick={() => setShowProfileSettings((prevState) => !prevState)}
            >
              <img src={StudentLogo} alt="user avater" />
            </div>

            {/* user setting */}
            <div
              className={`userSetting absolute cursor-pointer ${
                showProfileSettings ? "flex" : "hidden"
              }  right-0 justify-end px-10 bg-white shadow-md`}
            >
              <ul>
                <li className="mt-3 whitespace-nowrap">My profile</li>
                <li className="mt-3 whitespace-nowrap">Setting</li>
                <li className="mt-3 whitespace-nowrap"  onClick={sendLogout}>
                  Logout
                  </li>
              </ul>
            </div>
          </div>
        </Navbar>
        <div className="content">
        <Outlet />
        </div>
      </div>
    </section>
  );
}

export default SharedLayout;
