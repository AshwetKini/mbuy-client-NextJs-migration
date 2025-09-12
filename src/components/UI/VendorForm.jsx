import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Styles from "./VendorForm.module.css";
import { postVendor } from "../../apis/api";
import Button from "./Button";

const vendor = {
  name: "",
  email: "",
  mobileno: "",
  gst: "",
  address: "",
  pincode: "",
  userid: "",
};

const VendorForm = (props) => {
  const [vendorData, setVendorData] = useState(vendor);
  const [phonevalid, setPhoneValid] = useState(null);
  const [gstvalid, setGstValid] = useState(null);
  const [validform, setValidForm] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setVendorData({ ...vendorData, name: user.username, email: user.email, userid: user._id });
  }, []);

  const inputhandleChange = (key, value) => {
    setVendorData({ ...vendorData, [key]: value });
  };

  const vendorFormHandler = (e) => {
    e.preventDefault();
    const postvendor = async () => {
      const response = postVendor(vendorData);
      if (response) {
        toast.success("Request sent successfully");
        let user = JSON.parse(localStorage.getItem("user"));
        user.beVendorRequest = true;
        localStorage.setItem("user", JSON.stringify(user));
        props.status(true);
      }
    };
    if (validform === false) {
      toast.error("Please fill the details correctly");
    } else {
      postvendor();
    }
  };

  useEffect(() => {
    if (phonevalid === true && gstvalid === true) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [phonevalid, gstvalid]);

  const validatethephone = (data) => {
    if (data.length > 0 && data.length < 10) {
      setPhoneValid(false);
    } else if (data.length === 10) {
      setPhoneValid(true);
    } else {
      setPhoneValid(null);
    }
  };

  const validatethegst = (data) => {
    let regex = new RegExp(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    );

    console.log(data);
    if (data == null) {
      setGstValid(false);
      console.log("invalid gst");
    }

    if (regex.test(data) == true && data.length === 15) {
      setGstValid(true);
    } else if (data.length > 0 && data.length < 15) {
      setGstValid(false);
    } else {
      setGstValid(null);
    }
  };

  return (
    <form action="" className={`m-3`} onSubmit={vendorFormHandler}>
      <div className={`w-full grid grid-cols-2 gap-4`}>
        <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
          <label htmlFor="">Your Name</label>
          <input
            type="text"
            id="name"
            value={vendorData.name}
            className={`${Styles.vendor_input} shadow focus:border-primary focus:ring-primary`}
            onChange={(e) => inputhandleChange("name", e.target.value)}
            disabled
            required
          />
        </div>
        <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
          <label htmlFor="">Your Email Address</label>
          <input
            type="mail"
            id="email"
            value={vendorData.email}
            className={`${Styles.vendor_input} shadow`}
            onChange={(e) => inputhandleChange("email", e.target.value)}
            disabled
            required
          />
        </div>
      </div>
      <div className={`w-full`}>
        <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
          <label htmlFor="">Phone Number*</label>
          <input
            type="number"
            id="mobileno"
            value={vendorData.mobileno}
            className={`${Styles.vendor_input} shadow`}
            onChange={(e) => inputhandleChange("mobileno", e.target.value)}
            onBlur={() => validatethephone(vendorData.mobileno)}
            required
          />
          {phonevalid === false ? (
            <h2 className="text-sm text-red-500">Invalid Phone Number</h2>
          ) : (
            ""
          )}
        </div>
        <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
          <label htmlFor="">GST Number*</label>
          <input
            type="text"
            id="gst"
            value={vendorData.gst}
            className={`${Styles.vendor_input} shadow`}
            onChange={(e) => inputhandleChange("gst", e.target.value)}
            required
            onBlur={() => validatethegst(vendorData.gst)}
          />
          {gstvalid === false ? (
            <h2 className="text-sm text-red-500">Invalid Gst Number</h2>
          ) : (
            ""
          )}
        </div>
        <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
          <label htmlFor="">Pincode*</label>
          <input
            type="number"
            id="gst"
            value={vendorData.pincode}
            className={`${Styles.vendor_input} shadow`}
            onChange={(e) => inputhandleChange("pincode", e.target.value)}
            required
          />
        </div>
      </div>
      <div className={`w-full`}>
      <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
        <label htmlFor="">Street Address</label>
        <textarea
          rows="3"
          type="text"
          id="address"
          value={vendorData.address}
          className={`${Styles.vendor_textarea} shadow`}
          onChange={(e) => inputhandleChange("address", e.target.value)}
          required
        />
      </div>
      </div>
      <Button value="Send" type="submit" />
    </form>
  );
};

export default VendorForm;
