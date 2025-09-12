"use client";
import React, {  useEffect, useState, useRef } from "react";
import Styles from "./Header.module.css";
import Fullcontainer from "../UI/Fullcontainer";
import Container from "../UI/Container";
// import logo from "@/../public/logo2.png";
import SearchBarSection from "./Search";
import Link from "next/link";
// import Button from "../UI/Button";
import { HiOutlineUserCircle } from "react-icons/hi";
// import { Menu, Transition } from "@headlessui/react";
import {
  HiOutlineInboxStack,
} from "react-icons/hi2";
import { MdOutlinePlace } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
// import { BsSuitHeart } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserState } from "../../store/Slices/userSlice";
import { removeCart } from "../../store/Slices/cartSlice";
import { getUser } from "../../apis/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaBriefcase } from "react-icons/fa";

const Header = (props) => {
  const [userSession, setUserSession] = useState(false);
  const [userName, setUserName] = useState(" ");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cart = useSelector((state) => state.cartlist);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useRouter();

  const loginpagehandler = () => {
    if (!userSession) {
      navigate.push("/login");
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const logoutpagehandler = () => {
    localStorage.setItem("isAuth", false);
    localStorage.removeItem("authToken");
    dispatch(logoutUserState());
    dispatch(removeCart());
    setUserSession(false);
    setUserName("");
    navigate.push("/login");
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    const token = localStorage.getItem("authToken");
    let user = JSON.parse(localStorage.getItem("user"));
    if (isAuth && token) {
      setUserSession(true);
      setUserName(user?.username);
    }
  }, []);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const getLastestUser = async (id) => {
      const response = await getUser(id);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(user);
      }
    };
    if (user) {
      getLastestUser(user?._id);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <React.Fragment>
        <Fullcontainer className="bg-white w-full relative">
        <Container className="w-full p-0 min-w-[90%]  flex flex-row items-center justify-between relative">
        <div className={`absolute top-0 right-0 md:right-10 bg-gray-100 hidden md:block ${Styles.headerContact}`}>
              <p className={`px-4 flex items-center space-x-2 flex-row ${Styles.headerContactText}`}>
                <a href="/signup?corporate=true">
                  <span className="font-bold">Are You Pro? Get</span>
                  <span className="px-1 ml-1 py-0 rounded-md font-black text-xs bg-yellow-500">PRO</span>
                </a>
                <span className="font-bold">Pricing</span>
                <a href="/vendor">
                  <FaBriefcase className="m-0 -mt-[2px] mr-1 ml-6 text-yellow-600 inline" />
                  {user && user.role == "Vendor" ? (
                    <span className="font-bold">Vendor Panel</span>
                  ) : (
                    <span className="font-bold">Become a vendor</span>
                  )}
                </a>
                <a href="tel:+919226535176" className="flex flex-row items-center">
                  <BsFillTelephoneFill className="m-0 mr-1 ml-6 text-yellow-600 p-0 inline" />
                  <span className="font-bold">+91 9226535176</span>
                </a>
              </p>
        </div>
            <div className={`hidden md:flex flex-row md:items-center w-full`}>
              <Link href="/">
                <Image src="/mbuy.png" alt="logo" width={300} height={400} className="h-12 hidden md:flex" />
              </Link>
              <SearchBarSection className={`${Styles.searchbarsectionheader} mt-3 md:mt-0 md:ml-5`} />
            </div>
            <div className=" w-full h-full justify-center min-w-[50%] items-center flex md:hidden">
            <Link href="/">
            <Image src="/mbuy.png" alt="logo" width={100} height={100} className="w-72" />
            </Link>
            {/* <SearchBarSection className={` h-5 mt-3 md:mt-0 md:ml-5`} /> */}
         
            </div>
            <div className={`${Styles.container_2} md:max-w-[40%] ml-3 md:ml-0 flex items-center w-full justify-end`}>
              <div className="flex items-center md:mt-5 space-x-2 md:space-x-5 md:ml-4">
                <Link href="/wishlist">
                  <div className=" md:mr-2 flex flex-col justify-center cursor-pointer">
                    <Image src="/Wishlist.png" alt="Wishlist" className="md:ml-3 mb-2" height={25} width={30} />
                    <span className="text-[#102c44] hidden md:flex font-bold text-xs">Wishlist</span>
                  </div>
                </Link>
                <Link href="/getaquote" className="hidden md:flex">
                  <div className="cursor-pointer flex flex-col justify-center">
                    <Image src="/Bulk-order.png" alt="Bulk Order" className="ml-0 md:ml-3" height={45} width={40} />
                    <span className="text-[#102c44]  font-bold text-xs">Bulk Order</span>
                  </div>
                </Link>
                <Link href="/services"  className="hidden md:flex">
                  <div className="mr-2 flex flex-col justify-center cursor-pointer">
                    <Image src="/Services.png" alt="Services" className="ml-0 md:ml-1" height={45} width={40} />
                    <span className="text-[#102c44] font-bold text-xs">Services</span>
                  </div>
                </Link>
                <Link href="/cart">
                  <div className="flex mr-2 md:mr-0 flex-col justify-center cursor-pointer">
                    <Image src="/cart.png" alt="Cart" className=" ml-1 md:mr-2 mb-1" height={45} width={40} />
                    <span className="text-[#102c44] hidden md:flex font-bold ml-3 text-xs">Cart</span>
                  </div>
                </Link>
                <div className="relative inline-block text-left" ref={dropdownRef}>
                  <div onClick={loginpagehandler} className="cursor-pointer flex flex-col items-center">
                    <Image src="/ProfileLo.png" alt="Profile" className="mb-1" height={35} width={30} />
                    <span className="text-[#102c44] hidden md:flex  font-bold text-xs">Profile</span>
                  </div>
                  {dropdownOpen && (
                    <div className="absolute right-0  mt-2  z-[40] w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                      <div className="px-1 py-1">
                        <Link href="/profile">
                          <div className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md">
                            <HiOutlineUserCircle className="w-5 h-5 mr-2" /> Profile
                          </div>
                        </Link>
                        <Link href="/manageaddress">
                          <div className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md">
                            <MdOutlinePlace className="mr-2 w-5 h-5" /> Manage Addresses
                          </div>
                        </Link>
                        <Link href="/orders">
                          <div className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md">
                            <HiOutlineInboxStack className="mr-2 w-5 h-5" /> Orders Status
                          </div>
                        </Link>
                        {user?.role === "Vendor" && (
                          <Link href="/vendor">
                            <div className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer rounded-md">
                              <HiOutlineUserCircle className="mr-2 w-5 h-5" /> Vendor
                            </div>
                          </Link>
                        )}
                      </div>
                      <div className="px-2 pb-2">
                        <button className="w-full bg-blue-950 text-sm text-white py-2" onClick={logoutpagehandler}>Logout</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Fullcontainer>
      </React.Fragment>
    );
};

export default Header;
