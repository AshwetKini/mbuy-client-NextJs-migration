import React, { useState, useContext } from "react";
import Search from "../Header/Search";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
// import { AllCategoriesContext } from "../../features/AllCategoriesContext";
import { AllProductsContext } from "../../features/AllProductsContext";

// import { getCategories } from "../../apis/api";
import {
  HiMiniWrenchScrewdriver,
  HiBriefcase,
  HiUsers,
  HiUserCircle,
  HiReceiptPercent,
} from "react-icons/hi2";
import { BiCategory, BiBuildingHouse } from "react-icons/bi";

const Trailnavbar = () => {
  const categories = useContext(AllProductsContext);

  return (
    <div className="bg-gray-900 flex justify-between items-center h-[55px] trailnavmob">
      <Menu
        as="div"
        className="relative w-[15%] flex justify-center items-center"
      >
        <Menu.Button className="w-[10%] flex justify-center items-center flex-col space-y-[3px]">
          <span className="bg-white h-[5px] w-[5px] rounded-full"></span>
          <span className="bg-white h-[5px] w-[5px] rounded-full"></span>
          <span className="bg-white h-[5px] w-[5px] rounded-full"></span>
        </Menu.Button>
        <Menu.Items className="absolute top-[100%] p-3 left-0 mt-2 z-10 w-[150px] origin-top-left rounded-md bg-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none">
          {categories.categoriesData?.map((item, index) => (
            <Menu.Item key={index}>
              <Link
                to={`/allproducts/subcategory/${(item.title ?? '').replace(/\s+/g, '-')}`}
                className={
                  "text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
                }
              >
                {item.title}
              </Link>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
      <div className="w-[100%]">
        <Search />
      </div>
      <Menu
        as="div"
        className="relative w-[15%] flex justify-center items-center"
      >
        <Menu.Button className="w-[15%] flex justify-center items-center flex-col space-y-[5px]">
          <span className="bg-white h-[3px] w-[30px]"></span>
          <span className="bg-white h-[3px] w-[30px]"></span>
          <span className="bg-white h-[3px] w-[30px]"></span>
        </Menu.Button>
        <Menu.Items className="absolute top-[100%] p-3 right-0 mt-2 z-10 w-56 origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-black/5 focus:outline-none">
          <Menu.Item>
            <Link
              to="/allproducts/categories/all"
              className={
                "text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
              }
            >
              <BiCategory className="icons" />
              All Categories
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/services"
              className={
                "text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
              }
            >
              <HiMiniWrenchScrewdriver className="icons" />
              Services
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/vendor"
              className={
                "text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
              }
            >
              <HiBriefcase className="icons" />
              Become a Vendor
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/professional"
              className={
                "text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
              }
            >
              <HiUsers className="icons" />
              Professionals
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/join-as-professional"
              className={
                "text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
              }
            >
              <HiUserCircle className="icons" />
              Professional Space
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/getaquote"
              className={
                "text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
              }
            >
              <HiReceiptPercent className="icons" />
              Get a Quote
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/pre-fab-house"
              className={
                "text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
              }
            >
              <BiBuildingHouse className="icons" />
              Pre-Fab house
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Trailnavbar;
