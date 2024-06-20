import clsx from "clsx";
import React from "react";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { GoPasskeyFill } from "react-icons/go";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { SiTask } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "PWD Manager",
    link: "pass-manager",
    icon: <GoPasskeyFill />,
  },
  // {
  //   label: "Completed",
  //   link: "completed/completed",
  //   icon: <MdTaskAlt />,
  // },
  // {
  //   label: "In Progress",
  //   link: "in-progress/in progress",
  //   icon: <MdOutlinePendingActions />,
  // },
  // {
  //   label: "To Do",
  //   link: "todo/todo",
  //   icon: <MdOutlinePendingActions />,
  // },
  {
    label: "API Docs",
    link: "docs",
    icon: <TbApi size={20} />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full md:h-11 lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-700 dark:text-white text-base md:text-lg 2xl:text-base hover:bg-[#2564ed2d] hover:text-[#2564ed] dark:hover:bg-white/10 dark:hover:text-white",
          {
            "bg-blue-700 dark:bg-white/40 text-neutral-100":
              path === el.link.split("/")[0],
          }
        )}
      >
        {el.icon}
        <span className="block md:hidden lg:block 2xl:block text-sm lg:text-sm 2xl:text-base">
          {el.label}
        </span>
      </Link>
    );
  };
  return (
    <div className="w-full h-full flex flex-col gap-6 px-5 md:px-3 py-3 2xl:py-4 dark:bg-[#3f3f3f]">
      <h1 className="flex gap-3 items-center">
        <p className="transition-all duration-300 ease-in-out bg-blue-600 p-2 rounded-full">
          <SiTask className="text-white text-2xl font-black" />
        </p>
        <span className="block transition-all duration-300 ease-in-out md:hidden lg:block 2xl:block text-2xl mt-1 font-extrabold text-black dark:text-white">
          Project Hub
        </span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-4">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className="">
        <button className="w-full transition-all duration-300 ease-in-out flex gap-2 p-2 items-center text-lg text-gray-800 dark:text-white">
          <MdSettings />
          <span className="block md:hidden lg:block 2xl:block">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
