import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { summary, tasks } from "../assets/data";
import useTheme from "../hooks/useTheme";
import { BGS, BOS, getInitials } from "../utils";

const UserFilter = () => {
  const users = ["Alice", "Bob", "Charlie"];
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const handleUserClick = (e) => {
    const user = e.target.name;
    const newSelectedUsers = selectedUsers.includes(user)
      ? selectedUsers.filter((u) => u !== user)
      : [...selectedUsers, user];
    setSelectedUsers(newSelectedUsers);
    // onFilterChange(newSelectedUsers);
  };

  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  const [showAllUsers, setShowAllUsers] = useState(false);

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateIsMobile);
    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []);

  const visibleUsers = showAllUsers
    ? summary.users
    : summary.users.slice(0, isMobile ? 2 : 3);
  return (
    <div className="hidden sm:flex lg:flex items-center -gap-6">
      {visibleUsers?.map((user, index) => (
        <label
          key={index}
          style={{
            left: `${index * -7}px`,
            zIndex: selectedUsers.includes(user?.name) ? 5 + index : index,
          }}
          title={user?.name}
          className="relative cursor-pointer  dark:hover:border-2 border-2 hover:border-white rounded-full"
        >
          <input
            type="checkbox"
            name={user?.name}
            className="sr-only"
            checked={selectedUsers.includes(user?.name) ? false : true}
            onChange={(e) => handleUserClick(e)}
          />
          <div
            className={clsx(
              "w-7 h-7 flex items-center justify-center rounded-full hover:transition-transform duration-500 ease-in-out",
              BGS[index % BGS?.length],
              selectedUsers.includes(user?.name) &&
                "transform scale-110 border-2 border-white "
            )}
          >
            <span
              className={clsx(
                "w-8 h-8 flex items-center justify-center p-4 text-center text-white text-[10px] 2xl:text-x rounded-full",
                selectedUsers?.includes(user?.name) &&
                  "border-2 border-blue-700"
              )}
            >
              {getInitials(user?.name)}
            </span>
          </div>
        </label>
      ))}
      {summary.users.length && !showAllUsers && (
        <button
          className="relative w-7 h-7 flex text-sm items-center justify-center rounded-full bg-gray-300 text-blue-600 font-semibold dark:text-black dark:hover:border-2 border-1 hover:border-white z-[8]"
          style={{ left: `${(isMobile ? 2 : 3) * -7}px` }}
          onClick={() => setShowAllUsers(true)}
        >
          +{summary.users.length - visibleUsers.length}
        </button>
      )}
      {showAllUsers && (
        <button
          className="relative w-7 h-7 flex items-center justify-center rounded-full bg-gray-400 text-blue-600 font-semibold dark:text-white dark:hover:border-2 border-1 hover:border-white z-[8]"
          style={{ left: `${(isMobile ? 3 : 3) * -12}px` }}
          onClick={() => setShowAllUsers(false)}
        >
          <FaArrowLeft />
        </button>
      )}
    </div>
  );
};

export default UserFilter;
