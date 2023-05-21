import React, { useState } from "react";
import { HiSun } from "react-icons/hi";
import SideNav from "./sideNav";
import Navbar from "./navbar";
import "./style.css";

function SharedLayout() {
  const [isSideNavShow, setIsSideNavShow] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  function toogleSideNav() {
    setIsSideNavShow((prevState) => !prevState);
  }

  return (
    <section className={`${isSideNavShow ? "toggle-space" : null}`}>
      <SideNav isShow={isSideNavShow}></SideNav>
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
              <img src="images/studentLogo.png" alt="user avater" />
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
                <li className="mt-3 whitespace-nowrap">Logout</li>
              </ul>
            </div>
          </div>
        </Navbar>
      </div>
    </section>
  );
}

export default SharedLayout;
