import React, { useEffect } from "react";
import ordersvg from "../assests/confirmedorder.svg";
import Styles from "./Purchasesuccess.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editItemToCart } from "../features/cartSlice";


const Purchasesuccess = () => {
  const cart = useSelector((state) => state.cartlist);
  const dispatch = useDispatch();

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
  const navigate = useNavigate();
  const routehandler = () => {
    navigate("/orders");
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center flex-col">
      <img src={ordersvg} alt="" />
      <button className={`${Styles.orderbtn} text-white text-semibold text-xl shadow-lg rounded-lg mt-2 px-5 py-2`} onClick={routehandler}>View Orders</button>
    </div>
  );
};

export default Purchasesuccess;
