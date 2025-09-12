import React from 'react'
import Styles from "./Purchasesfail.module.css";
import { useNavigate } from "react-router-dom";
import failsvg from "../assests/failedorder.svg";

const Purchasesfail = () => {
  const navigate = useNavigate();
  const routehandler = () => {
    navigate("/allproducts/categories/all");
  };
  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center flex-col">
      <img src={failsvg} alt="" />
      <button className={`${Styles.orderbtn} text-white text-semibold text-xl shadow-lg rounded-lg mt-2 px-5 py-2`} onClick={routehandler}>Continue Shopping</button>
    </div>
  );
}

export default Purchasesfail