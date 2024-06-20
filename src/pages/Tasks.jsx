import React, { useState } from "react";
import { FaArrowLeft, FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { tasks } from "../assets/data";
import BoardView from "../components/BoardView";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import Title from "../components/Title";
import UserFilter from "../components/UserFilter";
import Table from "../components/task/Table";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const TASK_PATH = {
  todo: "/tasks/todo",
  "in progress": "/tasks/in-progress",
  completed: "/tasks/completed",
};

const Tasks = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const status = params.status || "";

  const handleNavigate = () => {
    navigate("/tasks");
  };

  return loading ? (
    <div className="py-10">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {status && (
            <button
              className="text-white bg-blue-600 p-2 2xl:p-3 rounded-full hover:bg-blue-700"
              onClick={() => handleNavigate()}
            >
              <FaArrowLeft size={16} />
            </button>
          )}
          <Title title={status ? `${status} Tasks` : "Tasks"} />
        </div>

        {!status && (
          <Button
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="text-xs 2xl:text-base flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2 hover:bg-blue-700"
          />
        )}
      </div>
      <div>
        <Tabs tabs={TABS} setSelected={setSelectedTab}>
          <div className="w-full flex justify-between gap-1 md:gap-x-12 py-4">
            <TaskTitle
              label="To Do"
              className={TASK_TYPE.todo}
              path={TASK_PATH.todo}
            />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
              path={TASK_PATH["in progress"]}
            />
            <TaskTitle
              label="Completed"
              className={TASK_TYPE.completed}
              path={TASK_PATH.completed}
            />
          </div>

          {selectedTab === 0 ? <BoardView tasks={tasks} /> : <Table />}
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks;
