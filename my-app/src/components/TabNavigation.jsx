import React from "react";
import { useRouter } from "next/router";

const TabNavigation = () => {
  const router = useRouter();
  const currentPath = router.asPath; // Ensure exact path matching

  // Define routes and labels
  const tabs = [
    { id: "/services", label: "Services" },
    { id: "/pre-fab-house", label: "Pre-Fab House" },
    { id: "/professional", label: "Hire Professional" },
    { id: "/join-as-professional", label: "Join as Professional" },
  ];

  const handleTabClick = (tabId) => {
    router.push(tabId);
  };

  return (
    <div className="w-full">
      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 lg:flex md:justify-center gap-4 md:space-x-6 rounded-lg p-3">
        {tabs.map(({ id, label }) => {
          const isActive = currentPath === id;

          return (
            <button
              key={id}
              className={`px-8 md:px-12 text-xs md:text-base py-2 font-semibold rounded-md transition-all duration-300 shadow-md ${
                isActive
                  ? "bg-[#102c44] text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => handleTabClick(id)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
