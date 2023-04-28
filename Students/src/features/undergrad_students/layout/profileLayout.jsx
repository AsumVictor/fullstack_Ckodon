import React from "react";
import {
  Outlet,
  NavLink,
  Link,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { HiChartPie, HiUserCircle, HiCog, HiLogout } from "react-icons/hi";
function ProfileLayout() {
const activeStyle = {
    color: "#2455FE",
    backgroundColor: "white",
  };

  return (
    <div className="w-full py-2 px-2 md:px-10">
      <div className="bg-MdBlue z-50 gap-y-1 sticky top-0 w-full py-1 px-2 md:py-5 rounded-t-r-2xl flex flex-row flex-wrap justify-between">
        <Link
          end
          to="../dashboard"
          className={`flex capitalize flex-row items-center gap-3 text-white font-semibold text-18 py-1 px-2 rounded-md hover:text-MdBlue hover:bg-white`}
          //   style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <HiChartPie /> <span> Dashboard</span>
        </Link>
        <div className="px-3 flex flex-row flex-wrap text-white">
          <button>
            <NavLink
              to="."
              end
              className="w-full px-2 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-1 flex-nowrap items-center"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
             <span>My profile</span>
            </NavLink>
          </button>

          <button>
            <NavLink to='setting' className=" w-full px-3 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-1 flex-nowrap items-center"
            style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              <span> Setting</span>
            </NavLink>
          </button>
          <button>
            <button className=" w-full px-2 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-1 flex-nowrap items-center"
            >
              Logout <HiLogout /> 
            </button>
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
