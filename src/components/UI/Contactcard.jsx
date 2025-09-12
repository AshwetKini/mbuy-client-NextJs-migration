import React from "react";
import Styles from "./Contactcard.module.css";

const Contactcard = (props) => {
  return (
    <React.Fragment>
      <div className={`${Styles.contactcart} ${props.className}`}>
        <div className={`${Styles.Contactcard_title}`}>
          <h2
            className={`m-3 text-base sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold`}
          >
            Contact Details
          </h2>
        </div>
        <div className={`grid grid-cols-3 gap-4 ${Styles.contactcard_subcont}`}>
          <div className={`col-span-3 md:col-span-1`}>
            <p
              className={`${Styles.contactcard_p} flex items-center text-l font-semibold`}
            >
              <i className={`bx bx-map text-2xl mr-1`}></i>Address
            </p>
            <p className="p-2">
              B-205/206 Happy Palace, Vasai (W),Thane, Maharashtra, 401202
            </p>
          </div>
          <div className={`col-span-3 md:col-span-1`}>
            <p
              className={`${Styles.contactcard_p} flex items-center text-l font-semibold`}
            >
              <i className="bx bx-phone text-2xl mr-1"></i>Phone
            </p>
            <p className="p-2">
              <a href="tel:+919226535176">+91 9226535176</a>
            </p>
          </div>
          <div className={`col-span-3 md:col-span-1`}>
            <p
              className={`${Styles.contactcard_p} flex items-center text-l font-semibold`}
            >
              <i className="bx bx-envelope text-2xl mr-1"></i>Email
            </p>
            <p className="p-2">
              <a href="mailto:support@materialbuy.com">
                support@materialbuy.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contactcard;
