import React, { useState, useEffect, useRef } from "react";
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
import { Link } from "react-router-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { getUser } from "../../apis/api";


const Navbar = (props) => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const categoriesClicKhandler = () => {
    props.categories();
  };
  const [user, setUser] = useState(null);


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
    <>
      <Fullcontainer className={`bg-gray-800 navbarmob`}>
        <Container>
          <nav className="main-nav">
            <HiEllipsisVertical
              className="categoriesMenu"
              onClick={categoriesClicKhandler}
            />
            <div className={`searchbarseciton`}>
              <SearchBarSection />
            </div>
            <div
              // ref={mobileMenuRef}
              className={
                showMediaIcons
                  ? "menu-link mobile-menu-link bg-gray-900"
                  : "menu-link"
              }
            >
              <ul>
                <li className="firstLi">
                  <BiCategory className="icons" />
                  <Link to="/allproducts/categories/all">All Categories</Link>
                </li>
                <li className="icons">
                  <HiMiniWrenchScrewdriver className="icons" />
                  <Link to="/services">Services</Link>
                </li>
                {user && user.role == "Vendor" ? (
                  <li className="">
                    <HiBriefcase className="icons" />
                    <Link to="/vendor">Vendor panel</Link>
                  </li>) : <li className="">
                  <HiBriefcase className="icons" />
                  <Link to="/vendor">Become a Vendor</Link>
                </li>}
                <li>
                  <HiUsers className="icons" />
                  <Link to="/professional">Professionals</Link>
                </li>
                <li>
                  <HiUserCircle className="icons" />
                  <Link to="/join-as-professional">Professional Space</Link>
                </li>
                <li>
                  <HiReceiptPercent className="icons" />
                  <Link to="/getaquote">Get a Quote</Link>
                </li>
                <li>
                  <BiBuildingHouse className="icons" />
                  <Link to="/pre-fab-house">Pre-Fab house</Link>
                </li>
              </ul>
            </div>

            {/* hamburget menu start  */}
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
    </>
  );
};

export default Navbar;
