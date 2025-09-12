import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";


import Styles from "./ChangeAddress.module.css";

const ChangeAddress = (props) => {
  console.log(props.address);
  const [active, setActive] = useState(false);
  const navigation = useNavigate();

  const showAddressRef = useRef(null);
  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);
  const [select5, setSelect5] = useState(false);
  const [billing1, setBilling1] = useState(true);
  const [billing2, setBilling2] = useState(false);
  const [billing3, setBilling3] = useState(false);
  const [billing4, setBilling4] = useState(false);
  const [billing5, setBilling5] = useState(false);

  // console.log(props.address);

  useEffect(() => {
    setTimeout(() => {
      setActive(!active);
    }, 50);

    if (props.active) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [props.active]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showAddressRef.current &&
        !showAddressRef.current.contains(event.target)
      ) {
        props.hide(false);
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const address1handler = () => {
    setSelect1(true);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address1} ${props.address.pincode1}`,
      shippin: `${props.address.pincode1}`,
    });
    props.hide(false);
    setActive(false);
  };

  const address2handler = () => {
    setSelect1(false);
    setSelect2(true);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address2} ${props.address.pincode2}`,
      shippin: `${props.address.pincode2}`
    });
    props.hide(false);
    setActive(false);
  };

  const address3handler = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(true);
    setSelect4(false);
    setSelect5(false);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address3} ${props.address.pincode3}`,
      shippin: `${props.address.pincode3}`,
    });
    props.hide(false);
    setActive(false);
  };

  const address4handler = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(true);
    setSelect5(false);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address4} ${props.address.pincode4}`,
      shippin: `${props.address.pincode4}`,
    });
    props.hide(false);
    setActive(false);
  };

  const address5handler = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(true);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address5} ${props.address.pincode5}`,
      shippin: `${props.address.pincode5}`,
    });
    props.hide(false);
    setActive(false);
  };

  const billing1handler = () => {
    setBilling1(true);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ billingaddress: `${props.address.address1} ${props.address.pincode1}` });
    props.hide(false);
    setActive(false);
  };

  const billing2handler = () => {
    setBilling1(false);
    setBilling2(true);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ billingaddress: `${props.address.address2} ${props.address.pincode2}` });
    props.hide(false);
    setActive(false);
  };

  const billing3handler = () => {
    setBilling1(false);
    setBilling2(false);
    setBilling3(true);
    setBilling4(false);
    setBilling5(false);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ billingaddress: `${props.address.address3} ${props.address.pincode3}` });
    props.hide(false);
    setActive(false);
  };

  const billing4handler = () => {
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(true);
    setBilling5(false);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ billingaddress: `${props.address.address4} ${props.address.pincode4}` });
    props.hide(false);
    setActive(false);
  };

  const billing5handler = () => {
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(true);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ billingaddress: `${props.address.address5} ${props.address.pincode5}` });
    props.hide(false);
    setActive(false);
  };

  // const confirmhandler = () => {
  //   props.hide(false);
  //   setActive(false);
  // };

  const shippingadd = () => {
    window.location.href = "/manageaddress";
  }

  return (
    <div
      className={`${Styles.changeaddress_window} ${props.active ? Styles.active : ""
        }`}
      id="scrollable-div"
    >
      <div
        className={` ${Styles.changeaddress} ${active ? Styles.activee : ""}`}
        ref={showAddressRef}
      >
        <h1 className={`text-center text-2xl font-bold`}>
          {props.address.name1 ? `Billing Address` : `Shipping Address`}
        </h1>
        {(props.address.address1 && props.address.pincode1) ||
          props.address.address1 ? (
          <div
            className={
              select1 || billing1
                ? `border rounded p-3 shadow m-3 cursor-pointer bg-gray-100`
                : `border rounded p-3 shadow m-3 cursor-pointer`
            }
            onClick={props.address.name1 ? billing1handler : address1handler}
          >
            <h2>
              {props.address.address1}{" "}
              {props.address.pincode1 ? `, ${props.address.pincode1}` : ""}
            </h2>
          </div>
        ) : null}
        {(props.address.address2 && props.address.pincode2) ||
          props.address.address2 ? (
          <div
            className={
              select2 || billing2
                ? `border rounded p-3 shadow m-3 cursor-pointer bg-gray-100`
                : `border rounded p-3 shadow m-3 cursor-pointer`
            }
            onClick={props.address.name2 ? billing2handler : address2handler}
          >
            <h2>
              {props.address.address2}{" "}
              {props.address.pincode2 ? `, ${props.address.pincode2}` : ""}
            </h2>
          </div>
        ) : null}
        {(props.address.address3 && props.address.pincode3) ||
          props.address.address3 ? (
          <div
            className={
              select3 || billing3
                ? `border rounded p-3 shadow m-3 cursor-pointer bg-gray-100`
                : `border rounded p-3 shadow m-3 cursor-pointer`
            }
            onClick={props.address.name3 ? billing3handler : address3handler}
          >
            <h2>
              {props.address.address3}{" "}
              {props.address.pincode3 ? `, ${props.address.pincode3}` : ""}
            </h2>
          </div>
        ) : null}
        {(props.address.address4 && props.address.pincode4) ||
          props.address.address4 ? (
          <div
            className={
              select4 || billing4
                ? `border rounded p-3 shadow m-3 cursor-pointer bg-gray-100`
                : `border rounded p-3 shadow m-3 cursor-pointer`
            }
            onClick={props.address.name4 ? billing4handler : address4handler}
          >
            <h2>
              {props.address.address4}{" "}
              {props.address.pincode4 ? `, ${props.address.pincode4}` : ""}
            </h2>
          </div>
        ) : null}
        {(props.address.address5 && props.address.pincode5) ||
          props.address.address5 ? (
          <div
            className={
              select5 || billing5
                ? `border rounded p-3 shadow m-3 cursor-pointer bg-gray-100`
                : `border rounded p-3 shadow m-3 cursor-pointer`
            }
            onClick={props.address.name5 ? billing5handler : address5handler}
          >
            <h2>
              {props.address.address5}{" "}
              {props.address.pincode5 ? `, ${props.address.pincode5}` : ""}
            </h2>
          </div>
        ) : null}
        <Button value="Add more address" onClick={shippingadd}></Button>
      </div>
    </div>
  );
};

export default ChangeAddress;
