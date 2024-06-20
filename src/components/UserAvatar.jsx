import { Menu, Switch, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaDesktop, FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { getInitials } from "../utils";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [nextTheme, setTheme] = useTheme();
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("logout");
  };

  return (
    <>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="w-9 h-9 2xl:w-9 2xl:h-9 items-center justify-center rounded-full bg-blue-600">
              <span className="text-white font-semibold text-center">
                {getInitials(user?.name)}
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white dark:bg-[#3f3f3f] shadow-2xl ring-1 ring-black/5 focus:outline-none">
              <div className="p-4">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base dark:text-white"
                    >
                      <FaUser className="mr-2" aria-hidden="true" />
                      Profile
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)}
                      className={`tetx-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base dark:text-white`}
                    >
                      <FaUserLock className="mr-2" aria-hidden="true" />
                      Change Password
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className="mr-2" aria-hidden="true" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item className="flex items-center justify-end">
                  <div>
                    <Switch
                      checked={nextTheme === "dark"}
                      onChange={() => setTheme(nextTheme)}
                      className="flex sm:hidden lg:hidden 2xl:hidden group relative h-7 w-14 cursor-pointer rounded-full  bg-[#282828] p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[checked]:bg-gray-200"
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
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default UserAvatar;
