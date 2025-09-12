import React from "react";
import Styles from "./SideTable.module.css";
import Router from "next/router";

const SideTable = () => {
  const policies = [
    { label: "Terms of Service", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Shipping Policy", path: "/shipping-policy" },
    { label: "Refund & Cancellation Policy", path: "/refund-and-cancellation-policy" },
    { label: "Return Policy", path: "/return-policy" },
  ];

  const handleNavigation = (path) => {
    Router.push(path);
  };

  return (
    <React.Fragment>
      <div className={Styles.side_div}>
        <div className={Styles.side_title}>
          <h1>Our Policies</h1>
        </div>
        <div className={Styles.side_content}>
          {policies.map((policy) => (
            <p key={policy.path} onClick={() => handleNavigation(policy.path)} className="cursor-pointer">
              {policy.label}
            </p>
          ))}
        </div>
      </div>
      <div className={Styles.side_div}>
        <div className={Styles.side_title}>
          <h1>Contact Us</h1>
        </div>
        <div className={Styles.side_content}>
          <p>
            <a href="tel:+919226535176">+91 9226535176</a>
          </p>
          <p>
            <a href="mailto:support@materialbuy.com">support@materialbuy.com</a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideTable;
