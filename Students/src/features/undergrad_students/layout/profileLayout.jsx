import React from "react";
import {
  Outlet,
  NavLink,
  Link,
  useNavigate
} from "react-router-dom/dist/umd/react-router-dom.development";
import { HiChartPie, HiUserCircle, HiCog, HiLogout } from "react-icons/hi";
import { useSendLogoutMutation } from "../../auth/authApiSlice";
import { CoverLoaderMedium } from "../../../components/loaders/loader";


function ProfileLayout() {
  const navigate = useNavigate()
  const [logout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  
const activeStyle = {
    color: "#2455FE",
    backgroundColor: "white",
  };
  React.useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) {
    return (
    <CoverLoaderMedium />
    )
  }
  return (
    <div className="w-full py-2 px-2 md:px-10 pb-2 overflow-x-hidden md:pb-10 overflow-y-auto" style={{height:'100vh'}}>
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
            <NavLink
              to="."
              end
              className="px-2 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-1 flex-nowrap items-center"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
             <span>My profile</span>
            </NavLink>

            <NavLink to='setting' className=" px-3 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-1 flex-nowrap items-center"
            style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              <span> Setting</span>
            </NavLink>
            <button className=" px-2 font-semibold rounded-md py-1 whitespace-nowrap hover:bg-MdBlue hover:text-white flex flex-row gap-x-1 flex-nowrap items-center"
            onClick={logout}
            >
              Logout <HiLogout /> 
            </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
