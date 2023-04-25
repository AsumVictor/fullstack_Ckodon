import React, { useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import {
  HiSun,
  HiChartPie,
  HiChevronDown,
  HiUsers,
  HiUserCircle,
  HiCog,
  HiLogout,
} from "react-icons/hi";
import {
  HiDocumentCheck,
  HiChatBubbleBottomCenterText,
  HiComputerDesktop,
  HiCurrencyDollar,
  HiTableCells,
  HiPencilSquare,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Logo from "../../../assets/images/logoWhite.jpg";
import StudentLogo from "../../../assets/images/studentLogo.png";
import SideNav from "../../../components/shared/sideNav";
import Navbar from "../../../components/shared/navbar";
import "../../../components/shared/style.css";
import { BiAward } from "react-icons/bi";
import "./styles.css";

function Student_SharedLayout() {
  const [isSideNavShow, setIsSideNavShow] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  function toogleSideNav() {
    setIsSideNavShow((prevState) => !prevState);
  }

  const activeStyle = {
    color: "#2455FE",
    backgroundColor: "white",
  };

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
            to="."
            id="dashboard"
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <HiChartPie /> {isSideNavShow && <span> Dashboard</span>}
          </NavLink>

          <NavLink
            to="honors"
            id="honors"
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <BiAward /> {isSideNavShow && <span> Honors </span>}
          </NavLink>

          <NavLink
            to="activities"
            id="activities"
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <HiTableCells /> {isSideNavShow && <span> Activities</span>}
          </NavLink>

          <NavLink
            to="essays"
            id="essays"
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <HiPencilSquare /> {isSideNavShow && <span> Essays</span>}
          </NavLink>

          <NavLink
            to="recommendation"
            id="recommendation"
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <HiOutlineNewspaper />{" "}
            {isSideNavShow && <span> Recommendations</span>}
          </NavLink>

          <NavLink
            to="financial-aid"
            id="financial-aid"
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <HiCurrencyDollar /> {isSideNavShow && <span> financial aid</span>}
          </NavLink>

          <NavLink
            to="reviews"
            id="reviews"
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <HiDocumentCheck /> {isSideNavShow && <span> Reviews</span>}
          </NavLink>

          <NavLink
            to="interview-prep"
            id="interview-prep"
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <HiComputerDesktop />{" "}
            {isSideNavShow && <span> interview prep</span>}
          </NavLink>

          <NavLink
            to="chat"
            id="chat"
            onClick={() => setIsSideNavShow(false)}
            className={`flex capitalize flex-row items-center gap-3 mt-2 ${
              !isSideNavShow ? "justify-center" : "justify-start"
            } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            <HiChatBubbleBottomCenterText />
            {isSideNavShow && <span> chat</span>}
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
        anchorId="honors"
        place="right"
        variant="info"
        content="Honors"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="activities"
        place="right"
        variant="info"
        content="Activities"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="essays"
        place="right"
        variant="info"
        content="Essays"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="financial-aid"
        place="right"
        variant="info"
        content="Financial Aid"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="recommendation"
        place="right"
        variant="info"
        content="Recommendations"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="reviews"
        place="right"
        variant="info"
        content="Reviews"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="interview-prep"
        place="right"
        variant="info"
        content="Interview Prep"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <ReactTooltip
        anchorId="chat"
        place="right"
        variant="info"
        content="Chats"
        className={`${
          isSideNavShow ? "hidden" : "flex"
        } opacity-100 text-MdBlue font-bold tooltip`}
      />
      <div className={`main ${isSideNavShow ? "toggle-space" : null}`}>
        <Navbar toggleSidenav={toogleSideNav} isShow={isSideNavShow}>
          {/* Ckodon or admin text */}
          <span className="hidden md:block font-bold">
            Undergradute student
          </span>
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
              className={`userSetting absolute cursor-pointer rounded-md ${
                showProfileSettings ? "flex" : "hidden"
              }  right-0 justify-end py-2 bg-white shadow-md mt-7`}
            >
              <ul className="w-full px-3">
                <li className=" w-full px-4 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-2 flex-nowrap items-center">
                  {" "}
                  <HiUserCircle /> <span>My profile</span>{" "}
                </li>
                <li className="mt-3 w-full px-4 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-2 flex-nowrap items-center">
                  {" "}
                  <HiCog /> <span> Setting</span>
                </li>
                <li className="mt-3 w-full px-4 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-2 flex-nowrap items-center">
                  {" "}
                  <HiLogout /> Logout
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

export default Student_SharedLayout;
