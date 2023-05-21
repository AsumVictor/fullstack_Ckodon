import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
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
import SideNav from "../../../components/shared/sideNav";
import Navbar from "../../../components/shared/navbar";
import "../../../components/shared/style.css";
import { BiAward } from "react-icons/bi";
import "./styles.css";
import ModalBox, {
  ModalBody,
  ModalFooter,
} from "../../../components/modal.js/ModalBox";
import useAuth from "../../../hooks/useStudent";
import "../../../components/shared/style.css";
import { useSendLogoutMutation } from "../../auth/authApiSlice";
import { CoverLoaderMedium } from "../../../components/loaders/loader";

function Student_SharedLayout() {
  const {
    data: student,
    isLoading: loadStudent,
    isError: errorStudent,
    error: message,
  } = useAuth();

  const [isSideNavShow, setIsSideNavShow] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const navigate = useNavigate();
  const [logout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  function toogleSideNav() {
    setIsSideNavShow((prevState) => !prevState);
  }

  const activeStyle = {
    color: "#2455FE",
    backgroundColor: "white",
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading || loadStudent) {
    return <CoverLoaderMedium />;
  }

  return (
    <>
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
              <HiOutlineNewspaper />
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
              <HiCurrencyDollar />
              {isSideNavShow && <span> financial aid</span>}
            </NavLink>

            <NavLink
              to="sat"
              id="sat"
              onClick={() => setIsSideNavShow(false)}
              className={`flex capitalize flex-row items-center gap-3 mt-2 ${
                !isSideNavShow ? "justify-center" : "justify-start"
              } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              <HiPencilSquare /> {isSideNavShow && <span> SAT Scores</span>}
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
              <HiComputerDesktop />
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
            <NavLink
              to="mentorship"
              id="mentorship"
              onClick={() => setIsSideNavShow(false)}
              className={`flex capitalize flex-row items-center gap-3 mt-2 ${
                !isSideNavShow ? "justify-center" : "justify-start"
              } text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              <HiCurrencyDollar />
              {isSideNavShow && <span> Mentorship</span>}
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
          anchorId="mentorship"
          place="right"
          variant="info"
          content="Mentorship"
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
          anchorId="sat"
          place="right"
          variant="info"
          content="Sat Scores"
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
            <h3 className="hidden md:flex flex-row gap-x-2 font-bold">
              <span className="text-emerald-600">Student: </span>
              <span className="capitalize">{`${student?.firstName} ${student?.lastName}`}</span>
            </h3>
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
                onClick={() =>
                  setShowProfileSettings((prevState) => !prevState)
                }
              >
                <img src={`${student?.avatar}`} alt="user avater" />
              </div>

              {/* user setting */}
              <div
                className={`userSetting absolute cursor-pointer rounded-md ${
                  showProfileSettings ? "flex" : "hidden"
                }  right-0 justify-end py-2 bg-white shadow-md mt-7`}
              >
                <ul className="w-full px-3">
                  <Link to="../profile">
                    <li className=" w-full px-4 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-2 flex-nowrap items-center">
                      <HiUserCircle /> <span>My profile</span>
                    </li>
                  </Link>
                  <Link to="../profile/setting">
                    <li className="mt-3 w-full px-4 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-2 flex-nowrap items-center">
                      <HiCog /> <span> Setting</span>
                    </li>
                  </Link>
                  <button onClick={logout}>
                    <li className="mt-3 w-full px-4 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-2 flex-nowrap items-center">
                      <HiLogout /> Logout
                    </li>
                  </button>
                </ul>
              </div>
            </div>
          </Navbar>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </section>

      {!student?.updatedStatus && (
        <ModalBox modalHeader="Please Update Your Profile">
          <ModalBody>
            Before you continue, we kindly ask you to take a moment to update
            your profile information by adding your program of interest,
            intended major, and career goals, which will enable us to provide
            you with a better experience and facilitate connections with other
            users. Don't forget to update your password for added security.
            Thank you for using our platform.
          </ModalBody>
          <ModalFooter class="py-2 justify-end px-4">
            <Link
              to="../profile/setting"
              className="py-2 px-3 bg-MdBlue font-bold text-white rounded-md"
            >
              Update
            </Link>
          </ModalFooter>
        </ModalBox>
      )}
    </>
  );
}

export default Student_SharedLayout;
