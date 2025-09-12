import React, { useState, useEffect } from "react";
import "./navbar.css";
import {
  HiMiniWrenchScrewdriver,
  HiBriefcase,
  HiUsers,
  HiUserCircle,
  HiReceiptPercent,
  HiSquare3Stack3D,
} from "react-icons/hi2";
import { BiCategory, BiBuildingHouse } from "react-icons/bi";
import { BsBoxFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import Fullcontainer from "../UI/Fullcontainer";
import Container from "../UI/Container";
import SearchBarSection from "../Header/Search";
import Link from "next/link";
import { HiEllipsisVertical } from "react-icons/hi2";
import { getUser } from "../../apis/api";

const Navbar = ({ categories }) => {
  const [showMediaIcons, setShowMediaIcons] = useState(false); // Set initial state to false (menu hidden)
  const [user, setUser] = useState(null);

  const categoriesClicKhandler = () => {
    categories(); // Assuming categories is a function passed as a prop
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const getLastestUser = async (id) => {
      const response = await getUser(id);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data); // Update user data with the latest response
      }
    };

    if (storedUser) {
      getLastestUser(storedUser?._id); // Ensure _id is available before calling API
    }
  }, []);

  return (
    <Fullcontainer className="bg-gray-800 navbarmob">
      <Container>
        <nav className="main-nav">
          <HiEllipsisVertical className="categoriesMenu" onClick={categoriesClicKhandler} />
          <div className="searchbarseciton">
            <SearchBarSection />
          </div>
          <div className={showMediaIcons ? "menu-link mobile-menu-link bg-gray-900" : "menu-link"}>
            <ul>
              <li className="firstLi">
                <BiCategory className="icons" />
                <Link href="/allproducts/categories/all">All Categories</Link>
              </li>
              <li className="icons">
                <HiMiniWrenchScrewdriver className="icons" />
                <Link href="/services">Services</Link>
              </li>
              {user && user.role === "Vendor" ? (
                <li>
                  <HiBriefcase className="icons" />
                  <Link href="/vendor">Vendor panel</Link>
                </li>
              ) : (
                <li>
                  <HiBriefcase className="icons" />
                  <Link href="/vendor">Become a Vendor</Link>
                </li>
              )}
              <li>
                <HiUsers className="icons" />
                <Link href="/professional">Professionals</Link>
              </li>
              <li>
                <HiUserCircle className="icons" />
                <Link href="/join-as-professional">Professional Space</Link>
              </li>
              <li>
                <HiReceiptPercent className="icons" />
                <Link href="/getaquote">Get a Quote</Link>
              </li>
              <li>
                <BiBuildingHouse className="icons" />
                <Link href="/pre-fab-house">Pre-Fab house</Link>
              </li>
            </ul>
          </div>

          {/* Hamburger menu */}
          <div className="mobilenavbar">
            <div className="hamburger-menu">
              <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <GiHamburgerMenu />
              </a>
            </div>
          </div>
        </nav>
      </Container>
    </Fullcontainer>
  );
};

export default Navbar;
