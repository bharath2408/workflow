import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { RiFilter3Fill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const TaskTitle = ({ label, className, path }) => {
  const navigate = useNavigate();
  const status = useParams();

  const handlePath = () => {
    navigate(path);
  };

  return (
    <div
      className="w-full h-10 md:h-12 px-2 md:px-4 rounded shadow-md bg-white dark:bg-[#3f3f3f] flex items-center justify-between hover:cursor-pointer"
      onClick={() => handlePath()}
    >
      <div className="flex gap-[5px] 2xl:gap-2 items-center">
        <div className={clsx("w-4 h-4 rounded-full ", className)} />
        <p className="text-xs md:text-xs 2xl:text-base text-gray-600 dark:text-white">
          {label}
        </p>
      </div>

      <button className="hidden md:block">
        <RiFilter3Fill className="text-lg dark:text-white text-black" />
      </button>
    </div>
  );
};

export default TaskTitle;
