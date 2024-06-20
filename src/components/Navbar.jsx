import { Switch } from "@headlessui/react";
import React, { useEffect } from "react";
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineLightMode,
  MdOutlineSearch,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "../hooks/useTheme";
import { setOpenSidebar } from "../redux/slices/authSlice";
import NotificationPanel from "./NotificationPanel";
import UserAvatar from "./UserAvatar";
// import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const [nextTheme, setTheme] = useTheme();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-white px-1 py-3 2xl:py-3 2xl:px-4 sticky z-10 top-0 bottom-0 dark:bg-[#3f3f3f]">
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="px-1 text-2xl text-gray-500 block md:hidden dark:text-white"
        >
          ☰
        </button>

        <div className="w-60 2xl:w-[400px] flex items-center justify-center py-1 2xl:py-2 px-3 gap-2 rounded-full bg-[#f3f4f6] dark:bg-[#282828]">
          <MdOutlineSearch className="text-gray-500 text-xl dark:text-white/70" />

          <input
            type="text"
            placeholder="Search.."
            className="flex-1 outline-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-white/70 text-gray-800 dark:text-white/70"
          />
        </div>
      </div>

      <div className="flex gap-1 items-center justify-center">
        <Switch
          checked={nextTheme === "dark"}
          onChange={() => setTheme(nextTheme)}
          className="hidden group relative lg:flex md:flex h-7 w-14 cursor-pointer rounded-full  bg-[#282828] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[checked]:bg-gray-200"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full p-[1px] bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
          >
            {nextTheme === "dark" ? (
              <MdDarkMode size={18} className="text-gray-600" />
            ) : (
              <MdLightMode size={18} className="text-yellow-600" />
            )}
          </span>
        </Switch>
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
