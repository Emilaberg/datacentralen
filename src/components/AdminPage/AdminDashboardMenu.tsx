import React from "react";
import { useLocation } from "react-router-dom";

export default function AdminDashboardMenu() {
  const location = useLocation();

  const menuItems = [
    { name: "Översyn", path: "/admin-dashboard/overlook" },
    { name: "Hantera artiklar", path: "/admin-dashboard/manage" },
    { name: "Skapa artikel", path: "/admin-dashboard/create" },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-between h-40 mt-20">
        <h1 className="text-6xl text-[#777777] capitalize">dashboard</h1>
      </div>
      <div className="flex flex-col items-center justify-center ml-15">
        <ul className="flex gap-50 items-center border-b-1 border-[#777777] pb-4 w-2/4 justify-center select-none">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`text-xl text-[#777777] mt-4 hover:underline ${
                location.pathname === item.path ||
                (location.pathname === "/admin-dashboard" &&
                  item.path === "/admin-dashboard/overlook")
                  ? "underline font-bold"
                  : ""
              }`}
            >
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
