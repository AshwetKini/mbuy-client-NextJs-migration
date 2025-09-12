import React, { Fragment, useEffect, useState } from "react";
import Styles from "./Header.module.css";
import Fullcontainer from "../UI/Fullcontainer";
import Container from "../UI/Container";
import logo from "../../assests/logo2.png";
import SearchBarSection from "./Search";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import {
  HiOutlineInboxStack,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiUserCircle,
} from "react-icons/hi2";
import { MdOutlinePlace } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserState } from "../../features/userSlice";
import { removeCart } from "../../features/cartSlice";
import { getUser } from "../../apis/api";

const Header = (props) => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cart = useSelector((state) => state.cartlist);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const loginpagehandler = () => {
    if (!userSession) {
      navigate("/login");
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
    navigate("/login");
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    const token = localStorage.getItem("authToken");
    let user = JSON.parse(localStorage.getItem("user"));
    if (isAuth && token) {
      setUserSession(true);
      setUserName(user.username);
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

  return (
    <React.Fragment>
      <Fullcontainer className={Styles.Header_fullcontainer}>
        <Container className={`${Styles.header_container} relative`}>
          <div
            className={`absolute top-0 right-0 md:right-10 bg-gray-100 ${Styles.headerContact}`}
          >
            <p className={`px-4 flex items-center ${Styles.headerContactText}`}>
              <a href="tel:+919226535176">
                <strong>Order Now</strong>{" "}
                <BsFillTelephoneFill className="m-0 mx-1 p-0 inline" />
                <strong>+91 9226535176</strong>
              </a>
            </p>
          </div>
          <div className={`${Styles.container_1}`}>
            <Link to="/">
              <img src={logo} className={Styles.logo} alt="logo" />
            </Link>
            <SearchBarSection className={`${Styles.searchbarsectionheader}`} />
          </div>
          <div className={`${Styles.container_2} flex items-center`}>
            <Menu as="div" className="relative inline-block text-left z-10">
              <div onClick={loginpagehandler}>
                <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  <HiOutlineUser className={`${Styles.icon} `} />
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
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/profile">
                          <button
                            className={`${active
                              ? "bg-gray-100 text-white"
                              : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <li
                              className={`text-slate-900 text-[15px] font-semibold flex items-center`}
                            >
                              <HiOutlineUserCircle
                                className={`${Styles.icon}`}
                              />
                              Profile
                            </li>
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/manageaddress">
                          <button
                            className={`${active
                              ? "bg-gray-100 text-white"
                              : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <li
                              className={`text-slate-900 text-[15px] font-semibold flex items-center`}
                            >
                              <MdOutlinePlace className={`${Styles.icon}`} />
                              <p className="w-full">Manage Addresses</p>
                            </li>
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/orders">
                          <button
                            className={`${active
                              ? "bg-gray-100 text-white"
                              : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <li
                              className={`text-slate-900 text-[15px] font-semibold flex items-center`}
                            >
                              <HiOutlineInboxStack
                                className={`${Styles.icon}`}
                              />
                              Orders status
                            </li>
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                    {/* <Menu.Item>
                      {({ active }) => (
                        <Link to="/orderhistory">
                          <button
                            className={`${active
                                ? "bg-gray-100 text-white"
                                : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <li
                              className={`text-slate-900 text-[15px] font-semibold flex items-center`}
                            >
                              <HiShoppingCart className={`${Styles.icon}`} />
                              Orders history
                            </li>
                          </button>
                        </Link>
                      )}
                    </Menu.Item> */}
                    {user && user.role == "Vendor" ? (
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/vendor" className="flex items-center">
                            <button
                              className={`${active ? "bg-gray-100 text-white" : "text-gray-900"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <li
                                className={`text-slate-900 text-[15px] font-semibold flex items-center`}
                              >
                                <HiUserCircle className={`${Styles.icon}`} />
                                Vendor
                              </li>
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                    ) : null}

                  </div>
                  <div className="px-2 pb-2">
                    <Menu.Item>
                      <Button
                        value="logout"
                        className={`${Styles.logoutbutton} w-full`}
                        onClick={logoutpagehandler}
                      />
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Link to="/wishlist">
              <div className={`${Styles.wishlist} cursor-pointer mr-3`}>
                <BsSuitHeart className={`${Styles.iconheart}`} />
              </div>
            </Link>
            <Link to="/cart">
              <div className={`${Styles.cart} cursor-pointer `}>
                <p className={Styles.carttext}>{cart.cart.length}</p>
                <HiOutlineShoppingCart className={`${Styles.icon}`} />
              </div>
            </Link>
          </div>
        </Container>
      </Fullcontainer>
    </React.Fragment>
  );
};

export default Header;
