"use client"
import React, { useState, useEffect } from "react";
import Styles from "./Wishlist.module.css";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import Layout from "../components/Layout/Layout";
import { HiX } from "react-icons/hi";
import {
  getWishlist,
  deleteWishList,
  varianceDetailsWithID,
  getVariant,
  getProduct,
} from "../apis/api";
import { editItemToCart } from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import { toast } from "react-toastify";
import Preloader from "../components/Preloader";

const Wishlist = () => {
  const cart = useSelector((state) => state.cartlist);
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");
  const [variance, setVariance] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const getWishListData = async (id) => {
      const response = await getWishlist(id);
      if (response.data) {
        const products = response.data.whishList.map(async (product) => {
          let productresponse = [];
          if (product.varianceId) {
            productresponse = await getVariant(product.varianceId);
          } else {
            productresponse = await getProduct(product.productId);
          }
          if (productresponse.status === 200) {
            return productresponse.data;
          }
        });
        const productsdata = await Promise.all(products);
        console.log(productsdata, "productsdata");

        setWishList(productsdata);
        setLoading(false);
      } else {
        setLoading(false);
        setWishList(null);
      }
    };

    if (user) {
      const getuserId = user._id;
      getWishListData(getuserId);
      setUserId(getuserId);
    } else {
      setLoading(false);
      setLoginMessage("Please log in to continue");
    }
  }, []);

  const handleDelete = async (data1) => {
    try {
      let createData;
      console.log(data1);
      if (data1.mainProductId) {
        createData = {
          userId: userId,
          productId: data1.mainProductId,
          varianceId: data1._id,
        };
      } else {
        createData = {
          userId: userId,
          productId: data1._id,
        };
      }
      console.log(createData);
      const response = await deleteWishList(createData);
      if (response.status === 200) {
        const updatedWishlist = wishList.filter(
          (product) => product._id !== data1._id
        );
        setWishList(updatedWishlist);
        toast.success("item is removed from the wishlist");
      } else {
        console.log("Error Deleting Product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = async (ProductId) => {
    try {
      const productDetails = wishList.find(
        (product) => product._id === ProductId
      );
      const productquantity = productDetails.minord11A;
      dispatch(editItemToCart({ productDetails, productquantity }));

      // Navigate to the cart
      navigate("/cart");

      // Use setTimeout to ensure navigation completes before deleting from wishlist
      setTimeout(() => {
        // Remove from wishlist
        handleDelete(productDetails);
      }, 0);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const routechangehandler = () => {
    navigate("/allproducts/categories/all");
  };

  return (
    <React.Fragment>
      <Layout>
        <Fullcontainer className={Styles.fullcontainer}>
          <Container className={`${Styles.container}`}>
            <div className={`${Styles.title}`}>
              <h1>My Wishlist</h1>
            </div>
            {loading ? (
              <div>
                <Preloader />
              </div>
            ) : loginMessage ? (
              <h1 className="text-xl border rounded flex flex-col w-full py-40 items-center justify-center">
                {loginMessage}
                <Button value="Login" onClick={() => navigate("/login")} />
              </h1>
            ) : wishList ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {wishList.length > 0
                    ? wishList.map((data) => {
                        console.log(data);
                        return (
                          <div key={data.data._id}>
                            <div
                              className={`h-[200px] w-full relative rounded-t-xl ${Styles.img_container} cursor-pointer`}
                              onClick={async () => {
                                if (data) {
                                  const variancename =
                                    data.data.productname1.replace(/\s+/g, "-");
                                  if (data.data.mainProductId) {
                                    navigate(
                                      `/variance/${variancename}/${data.data._id}`
                                    );
                                  } else {
                                    navigate(
                                      `/products/${variancename}/${data.data._id}`
                                    );
                                  }
                                }
                              }}
                            >
                              <div
                                className="absolute bg-white p-2 rounded-full right-4 top-4"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(data.data);
                                }}
                              >
                                <HiX className={`${Styles.icons} text-xl`} />
                              </div>
                              <img
                                src={data.data.imgs1}
                                alt=""
                                className={`h-full w-full object-cover rounded-t-xl`}
                              />
                            </div>
                            <div
                              className={`${Styles.text_container} rounded-b-xl`}
                            >
                              <h1 className={`${Styles.productname}`}>
                                {data.data.productname1}
                              </h1>
                              <h1 className="font-bold">
                                ₹ {data.data.discountprice2B}{" "}
                                <span className="line-through font-normal text-sm">
                                  ₹ {data.data.price2A}
                                </span>
                              </h1>
                              <Button
                                value={
                                  cart.cart.findIndex(
                                    (item) => item._id === data._id
                                  ) >= 0
                                    ? "Go To Cart"
                                    : "Add To Cart"
                                }
                                className="w-full"
                                onClick={() => {
                                  if (
                                    cart.cart.findIndex(
                                      (item) => item._id === data.data._id
                                    ) >= 0
                                  ) {
                                    // Navigate to the cart
                                    navigate("/cart"); // Replace with your navigation logic
                                  } else {
                                    // Execute the add-to-cart function
                                    handleAddToCart(data.data._id);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl border rounded flex flex-col w-full py-40 items-center justify-center">
                  Your Wishlist cart is currently empty.
                  <Button
                    value="Shop Now"
                    onClick={routechangehandler}
                  ></Button>
                </h1>
              </>
            )}
          </Container>
        </Fullcontainer>
      </Layout>
    </React.Fragment>
  );
};

export default Wishlist;
