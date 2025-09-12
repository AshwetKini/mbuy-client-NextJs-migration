'use client'
import React from 'react'
import Styles from "./Purchasesfail.module.css";
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/navigation';
import Image from "next/image";
// import failsvg from "@/public/failedorder.svg"; // Place your SVG inside the public folder

const Purchasesfail = () => {
  const navigate = useRouter();
  const routehandler = () => {
    navigate.push("/allproducts/categories/all");
  };
  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center flex-col">
      <Image src="/failedorder.svg" alt="Failed Order" width={500} height={100} />

      <button className={`${Styles.orderbtn} mt-14 text-white text-semibold text-xl shadow-lg rounded-lg  px-5 py-2`} onClick={routehandler}>Continue Shopping</button>
    </div>
  );
}

export default Purchasesfail