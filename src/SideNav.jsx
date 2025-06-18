import React from "react";
import SideNavPortal from "./components/SideNavPortal";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function SideNav({ isSlided, isNotSlided }) {
  if (!isSlided) return null;
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    navigate("/");
    logout();
  };
  return (
    <SideNavPortal>
      <div className=" inset-0 z-10 flex">
        <div className="flex-1 " onClick={isNotSlided}></div>
        <div className=" fixed top-0 left-0 h-full w-40 bg-pink-300 shadow-lg z-50 transition-transform duration-300">
          <div className="p-4">
           
            <h3 className="font-bold mt-8">Tasks</h3>
            <ul className="space-y-2 text-black">
              <li>
                <NavLink
                  to="/upcoming"
                  className="block cursor-pointer no-underline hover:underline"
                >
                  Upcoming
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/today"
                  className="block cursor-pointer no-underline hover:underline"
                >
                  Today
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/calendar"
                  className="block cursor-pointer no-underline hover:underline"
                >
                  Calendar
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/stickywall"
                  className="block cursor-pointer no-underline hover:underline"
                >
                  Sticky Wall
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/settings"
                  className="block cursor-pointer no-underline hover:underline"
                >
                  Settings
                </NavLink>
              </li>
            </ul>
            <h3 className="font-bold mt-6">Lists</h3>
            <ul className="space-y-2 text-black">
              <li>
                <NavLink
                  to="/personal"
                  className="block cursor-pointer no-underline hover:underline"
                >
                  Personal
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/work"
                  className="block cursor-pointer no-underline hover:underline"
                >
                  Work
                </NavLink>
              </li>
              <li className="mt-70">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left cursor-pointer text-black hover:underline "
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SideNavPortal>
  );
}
export default SideNav;
