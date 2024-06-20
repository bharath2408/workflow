import clsx from "clsx";
import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { tasks } from "../../assets/data";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import Button from "../Button";
import UserInfo from "../UserInfo";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <MdKeyboardArrowDown />,
};

const Table = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {};

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300 dark:border-gray-200/30">
      <tr className="w-full text-black  text-left dark:text-white/90">
        <th className="p-2 text-xs md:text-xs lg:text-sm 2xl:text-base ">
          Task Title
        </th>
        <th className="p-2 text-xs md:text-xs lg:text-sm 2xl:text-base">
          Priority
        </th>
        <th className="p-2 line-clamp-1 text-nowrap text-xs md:text-xs lg:text-sm 2xl:text-base ">
          Created At
        </th>
        <th className="p-2 text-xs md:text-xs lg:text-sm 2xl:text-base">
          Assets
        </th>
        <th className="p-2 text-xs md:text-xs lg:text-sm 2xl:text-base">
          Team
        </th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-200 dark:border-gray-200/30 text-gray-600 hover:bg-gray-300/10">
      <td className="p-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className="w-[150px] line-clamp-1 text-xs md:text-xs lg:text-sm 2xl:text-base text-black dark:text-white">
            {task?.title}
          </p>
        </div>
      </td>

      <td className="p-2">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="capitalize line-clamp-1 text-xs md:text-xs lg:text-sm 2xl:text-base dark:text-white/70">
            {task?.priority} Priority
          </span>
        </div>
      </td>

      <td className="p-2">
        <span className="line-clamp-1 text-gray-600 text-xs md:text-xs lg:text-sm 2xl:text-base dark:text-white/70">
          {formatDate(new Date(task?.date))}
        </span>
      </td>

      <td className="p-2 ">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-xs md:text-xs lg:text-sm 2xl:text-base text-gray-600 dark:text-white/80">
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-xs md:text-xs lg:text-sm 2xl:text-base text-gray-600 dark:text-white/80">
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-xs md:text-xs lg:text-sm 2xl:text-base text-gray-600 dark:text-white/80">
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className="p-2">
        <div className="flex">
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-xs md:text-xs lg:text-sm 2xl:text-base -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="p-2 flex gap-2 md:gap-4 justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 sm:px-0 text-xs md:text-xs lg:text-sm 2xl:text-base"
          label="Edit"
          type="button"
        />

        <Button
          className="text-red-700 hover:text-red-500 sm:px-0 text-xs md:text-xs lg:text-sm 2xl:text-base"
          label="Delete"
          type="button"
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="bg-white dark:bg-[#3f3f3f] px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full ">
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TODO */}
      {/* <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      /> */}
    </>
  );
};

export default Table;
