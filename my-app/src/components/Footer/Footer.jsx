import Fullcontainer from "../UI/Fullcontainer";
import Container from "../UI/Container";
import Styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo2.png";
import { CiTextAlignJustify } from "react-icons/ci";
import { getUser } from "../../apis/api";
import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = (props) => {
  const handleLinkClick = () => {
    const scrollToTop = () => {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - currentScroll / 10);
      }
    };
    scrollToTop();
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const getLastestUser = async (id) => {
      const response = await getUser(id);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data); // Updated here to reflect the latest user data
      }
    };
    if (user) {
      getLastestUser(user?._id);
    }
  }, []);

  return (
    <React.Fragment>
      <Fullcontainer className={`${props.className}`}>
        <Container className={Styles.footer_parent}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className={`${Styles.footer_div} mx-auto text-justify max-w-md`}>
              <Image src={logo} className={Styles.logo} alt="logo" />
              <p>
                Welcome to MaterialBuy.com, where quality meets convenience for your dream projects. Elevate your spaces effortlessly with our diverse range of building materials, sanitary ware, and hardware. Everything you need, all in one place.
              </p>
            </div>
            <div className={`${Styles.footer_div} ${Styles.second_div}`}>
              <h3>Information</h3>
              <ul>
                <li>
                  <Link href="/about" onClick={handleLinkClick}>
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/career" onClick={handleLinkClick}>
                    Careers
                  </Link>
                </li>
                {user && user.role == "Vendor" ? (
                  <li>
                    <Link href="/vendor" onClick={handleLinkClick}>
                      Vendor Panel
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href="/vendor" onClick={handleLinkClick}>
                      Become a Vendor
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/contact" onClick={handleLinkClick}>
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" onClick={handleLinkClick}>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className={Styles.footer_div}>
              <h3>Legal</h3>
              <ul>
                <li>
                  <Link href="/terms" onClick={handleLinkClick}>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" onClick={handleLinkClick}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" onClick={handleLinkClick}>
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" onClick={handleLinkClick}>
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund-and-cancellation-policy" onClick={handleLinkClick}>
                    Refund & Cancellation Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex space-x-4 justify-start items-center py-4">
      <a
        href="https://www.facebook.com/people/The-Material-Buy/100078841177484/?mibextid=ZbWKwL"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-500 transition duration-300"
      >
        <Facebook size={30} />
      </a>

      <a
        href="https://www.instagram.com/materialbuy/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-pink-500 transition duration-300"
      >
        <Instagram size={30} />
      </a>

      <a
        href="https://www.youtube.com/@Materialbuy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-red-500 transition duration-300"
      >
        <Youtube size={30} />
      </a>

      <a
        href="https://www.linkedin.com/company/material-buy/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-700 transition duration-300"
      >
        <Linkedin size={30} />
      </a>

      {/* X (Twitter) */}
      <a
        href="https://x.com/materialbuy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-400 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-[30px] h-[30px] fill-current"
        >
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </svg>
      </a>
    </div>
          <div className={Styles.footer_bottom}>
            <p className="text-center text-white">
              ©2025 Material Buy All Rights Reserved
            </p>
          </div>
        </Container>
      </Fullcontainer>
    </React.Fragment>
  );
};

export default Footer;
