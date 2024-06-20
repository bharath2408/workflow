import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ApiDoc from "./pages/ApiDoc";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PasswordManager from "./pages/PasswordManager";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import { setOpenSidebar } from "./redux/slices/authSlice";

function Layout() {
  const { user, isSidebarOpen } = useSelector((state) => state.auth);
  const location = useLocation();

  return !user ? (
    <div className="w-full h-full  flex flex-col md:flex-row">
      <div className="w-30 md:w-30 lg:w-60 2xl:w-1/6 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      {isSidebarOpen ? (
        <MobileSidebar />
      ) : (
        <div className="flex-1">
          <Navbar />

          <div className="h-screen p-2 2xl:px-10 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 dark:bg-white/40 transition-all duration-700 transform",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-3/4 h-screen dark:bg-[#3f3f3f]">
              <div className="w-full flex justify-end pt-5 pr-5">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoClose size={25} className="dark:text-white" />
                </button>
              </div>

              <div>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className="w-full h-full bg-[#f3f4f6] dark:bg-[#282828]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/pass-manager" element={<PasswordManager />} />
          <Route path="/tasks/:status" element={<Tasks />} />
          <Route path="/tasks/:status" element={<Tasks />} />
          <Route path="/tasks/:status" element={<Tasks />} />
          <Route path="/docs" element={<ApiDoc />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
