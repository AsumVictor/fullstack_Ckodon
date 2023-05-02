import React from "react";
import {
  Outlet,
  NavLink,
} from "react-router-dom/dist/umd/react-router-dom.development";
import Page from "../../../components/shared/page";

function EssayLayout() {

    const activeStyle = {
        backgroundColor: "rgb(138, 138, 138)",
        color: "white",
      };

  return (
    <Page>
    <div className="w-full py-2 bg-white shadow-md px-2 flex flex-row justify-between md:justify-center md:gap-x-10">
      <NavLink
        to="."
        end
        className={`px-2 font-bold py-1 border-2 rounded-md`}
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Quick overview
      </NavLink>
      <NavLink
        to="create"
        end
        className="px-2 font-bold py-1 border-2 rounded-md"
        style={({ isActive }) => (isActive ? activeStyle : null)}
      >
        Write Essays
      </NavLink>
    </div>
    <Outlet />
  </Page>
  )
}

export default EssayLayout