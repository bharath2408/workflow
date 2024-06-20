import clsx from "clsx";
import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import UserInfo from "./UserInfo";
import TaskDialog from "./task/TaskDialog";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-fit bg-white dark:bg-[#3f3f3f] shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[task?.priority]
            )}
          >
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority}</span>
          </div>
          {user?.isAdmin && <TaskDialog task={task} />}
        </div>
        <>
          <div className="flex item-center gap-2">
            <div
              className={clsx(
                "mt-1 w-4 h-4 rounded-full",
                TASK_TYPE[task?.stage]
              )}
            />
            <h4 className="text-black dark:text-white line-clamp-1">
              {task?.title}
            </h4>
          </div>
          <span className="text-sm text-gray-600 dark:text-white/70">
            {formatDate(new Date(task?.date))}
          </span>
        </>
        <div className="w-full border-t border-gray-200 dark:border-gray-500 my-2" />
        <div className="flex items-center justify-between mb-2 ">
          <div className="flex items-center gap-3 ">
            <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-white">
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-white">
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-white">
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-5 h-5 md:w-7 md:h-7 lg:w-7 lg:h-7 2xl:w-7 2xl:h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>
        {/* {subTasks} */}
        {task?.subTasks?.length > 0 ? (
          <div className="py-4 border-t border-gray-200 dark:border-gray-500">
            <h5 className="text-base line-clamp-1 text-black dark:text-white">
              {task?.subTasks[0].title}
            </h5>

            <div className="p-4 space-x-8">
              <span className="text-sm text-gray-600 dark:text-white/70">
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className="bg-blue-600/10 px-3 py-1 rounded0full text-blue-700 font-medium dark:text-white/70 dark:bg-blue-600/30">
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="py-4 border-t border-gray-200">
              <span className="text-gray-500">No Sub Task</span>
            </div>
          </>
        )}

        <div className="w-full pb-2">
          <button className="w-full flex items-center gap-4 text-gray-500 dark:text-white/40 font-semibold disabled:cursor-not-allowed disabled:text-gray-300">
            <IoMdAdd className="text-lg dark:text-white" />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      {/* <AddSubTask open={open} setOpen={setOpen} id={task._id} /> */}
    </>
  );
};

export default TaskCard;
