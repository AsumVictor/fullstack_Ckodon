import React from "react";
import {
  Link,
  Outlet,
  NavLink,
  useParams,
  useOutletContext
} from "react-router-dom/dist/umd/react-router-dom.development";
import Page from "../../../components/shared/page";
import { HiChevronDoubleLeft } from "react-icons/hi";
import {
  RefreshToolkit,
  CustomToolkit,
} from "../../../components/toolkits/tollkit";
import { HiBarsArrowUp, HiBarsArrowDown } from "react-icons/hi2";
import { Tooltip as ReactTooltip } from "react-tooltip";

function UndergraduteStudentDetailLayout() {
  const activeStyle = {
    backgroundColor: "white",
    color: "#2455FE",
  };

const params = useParams()
const student_id = params.id

  return (
    <Page>
      <Link
        to=".."
        className="text-MdBlue font-semibold flex items-center gap-1"
      >
        <HiChevronDoubleLeft /> Back to all students
      </Link>

      <div className="flex felx-row z-50 justify-between items-center w-full flex-wrap gap-y-2 mt-5 sticky top-0 mb-10 bg-MdBlue py-2 px-1 md:px-3 rounded-md">
        <div className="flex  flex-row justify-center items-center w-full gap-2 md:w-5/12">
          <NavLink
            to="."
            end
            className="px-2 text-white rounded-md py-1 px-2 font-bold"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Profile
          </NavLink>

          <NavLink
            to={{pathname: 'sat', studentId:{student_id}}}
            className="px-2 text-white rounded-md py-1 px-2 font-bold"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            SAT Scores
          </NavLink>

          <NavLink
            to={{pathname: 'reviews', studentId:{student_id}}}
            className="px-2 text-white rounded-md py-1 px-2 font-bold"
            style={({ isActive }) => (isActive ? activeStyle : null)}
          >
            Reviews
          </NavLink>
        </div>
        <div className="flex flex-row justify-between items-center gap-5 md:gap-3">
          <RefreshToolkit class="text-white shadow-gray-200" />
        </div>
      </div>

      <Outlet context={{studentId: student_id}}/>
    </Page>
  );
}

export default UndergraduteStudentDetailLayout;
