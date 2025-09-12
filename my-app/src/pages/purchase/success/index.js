"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { editItemToCart } from "@/store/Slices/cartSlice";
import Styles from "./Purchasesuccess.module.css";

// Ensure the SVG is inside the `public` folder (public/confirmedorder.svg)
const Purchasesuccess = () => {
  const cart = useSelector((state) => state.cartlist);
  const dispatch = useDispatch();
  const router = useRouter(); // Next.js routing

  useEffect(() => {
    console.log(cart);
    cart.cart.forEach((item) => {
      removeitemhandler(item._id);
    });
  }, [cart]);

  const removeitemhandler = (id) => {
    const productDetails = cart.cart.find((item) => item._id === id);
    dispatch(editItemToCart({ productDetails, quantity: 0 }));
  };

  const routehandler = () => {
    router.push("/orders"); // Next.js navigation
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center flex-col">
      <Image src="/confirmedorder.svg" alt="Order Confirmed" width={550} height={150} />
      <button
        className={`${Styles.orderbtn} text-white text-semibold text-xl shadow-lg rounded-lg mt-2 px-5 py-2`}
        onClick={routehandler}
      >
        View Orders
      </button>
    </div>
  );
};

export default Purchasesuccess;
