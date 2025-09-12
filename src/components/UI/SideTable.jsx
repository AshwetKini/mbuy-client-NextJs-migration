import React from "react";
import Styles from "./SideTable.module.css";
import { Link } from "react-router-dom";

const SideTable = () => {
  return (
    <React.Fragment>
      {/* <div className={`${Styles.side_div}`}>
        <div className={`${Styles.side_title}`}>
          <h1>Support Team</h1>
        </div>
        <div className={`${Styles.side_content}`}>
          <p>FAQ</p>
          <p>Special Pricing</p>
        </div>
      </div> */}
      <div className={`${Styles.side_div}`}>
        <div className={`${Styles.side_title}`}>
          <h1>Our Policies</h1>
        </div>
        <div className={`${Styles.side_content}`}>
          <Link to="/terms">
            <p>Terms of Service</p>
          </Link>
          <Link to="/privacy-policy">
            <p>Privacy Policy</p>
          </Link>
          <Link to="/shipping-policy">
            <p>Shipping Policy</p>
          </Link>
          <Link to="/return-policy">
            <p>Returns Policy</p>
          </Link>
          <Link to="/return-policy">
            <p>Refund Policy</p>
          </Link>
          <Link to="/return-policy">
            <p>Cancellation Policy</p>
          </Link>
        </div>
      </div>
      <div className={`${Styles.side_div}`}>
        <div className={`${Styles.side_title}`}>
          <h1>Contact Us</h1>
        </div>
        <div className={`${Styles.side_content}`}>
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
