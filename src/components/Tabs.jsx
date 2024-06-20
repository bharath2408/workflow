import { Tab } from "@headlessui/react";
import { useParams } from "react-router-dom";
import UserFilter from "./UserFilter";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  const { id } = useParams();

  return (
    <div className="w-full px-1 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 md:space-x-3 lg:space-x-3 2xl:space-x-6 rounded-xl items-center p-1">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 px-3 py-2 text-nowrap text-xs 2xl:text-base font-medium leading-5 dark:bg-[#3f3f3f] dark:text-white bg-white",

                  selected
                    ? "text-blue-700  border-b-2 border-blue-600 dark:border-white"
                    : "text-gray-800  hover:text-blue-800"
                )
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
          {!id && <UserFilter />}
        </Tab.List>
        <Tab.Panels className="w-full mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
