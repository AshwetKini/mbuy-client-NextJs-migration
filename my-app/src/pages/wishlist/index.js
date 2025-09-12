  "use client";
  import React, { useState, useEffect } from "react";
  import Styles from "./Wishlist.module.css";
  import Fullcontainer from "../../components/UI/Fullcontainer";
  import Container from "../../components/UI/Container";
  import Layout from "../../Layouts/Layout";
  import { HiX } from "react-icons/hi";
  import {
    getWishlist,
    deleteWishList,
    varianceDetailsWithID,
    getVariant,
    getProduct,
  } from "../../apis/api";
  import { editItemToCart } from "../../store/Slices/cartSlice";
  import { useSelector, useDispatch } from "react-redux";
  // import { useNavigate } from "react-router-dom";
  import { useRouter } from "next/navigation";
  import Button from "../../components/UI/Button";
  import { toast } from "react-toastify";
  import Preloader from "../../components/Preloader";

  const Wishlist = () => {
    const cart = useSelector((state) => state.cartlist);
    const dispatch = useDispatch();
    const [wishList, setWishList] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loginMessage, setLoginMessage] = useState("");
    const [variance, setVariance] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));

      const getWishListData = async (id) => {
        const response = await getWishlist(id);
        console.log(response.data.whishList, "helo");
        if (response.data) {
          const products = response.data.whishList.map(async (product) => {
            let productresponse = [];
            if (product.productId == null) {
              console.log(product, "product.varianceId");
              const temproryproduct = await getVariant(product.varianceId);
              productresponse = temproryproduct;
              console.log(productresponse, "productresponse variance");
            } else {
              console.log(product, "product.productId");
              const temproryproduct = await getProduct(product.productId);
              productresponse = temproryproduct.data;
              console.log(productresponse, "productresponse product");
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

    const handleDelete = async (productData) => {
      try {
        if (!userId || !productData) {
          console.error("User ID or product data is missing");
          return;
        }

        let createData;
        if (productData.mainProductId) {
          createData = {
            userId: userId,
            productId: null,
            varianceId: productData._id,
          };
        } else {
          createData = {
            userId: userId,
            productId: productData._id,
          };
        }

        console.log("Deleting item with data:", createData);

        const response = await deleteWishList(createData);
        if (response.status === 200) {
          setWishList((prevWishlist) =>
            prevWishlist.filter((item) => item?._id !== productData._id)
          );
          
          toast.success("Item removed from the wishlist");
        } else {
          console.error("Failed to delete item from wishlist");
          toast.error("Error removing item from wishlist");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Something went wrong");
      }
    };

    const handleAddToCart = async (ProductId) => {
      try {
        const productDetails = wishList.find(
          (product) => product && product?._id === ProductId
        );
        console.log(productDetails, "this si product list");
        const productquantity = productDetails.minord11A;
        const cartitem = productDetails;

        dispatch(
          editItemToCart({
            productDetails: cartitem,
            productquantity: Number(productquantity),
            fromWishlist: true,
            pincode: "000000",
          })
        );

        // Navigate to the cart
        router.push("/cart");

        handleDelete(productDetails);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
    console.log(wishList, "wishlist");
    const routechangehandler = () => {
      router.push("/allproducts/categories/all");
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
                  <Button value="Login" onClick={() => router.push("/login")} />
                </h1>
              ) : wishList.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 md:gap-8">
                    {wishList.length > 0
                      ? wishList.map((data) => {
                          console.log(data, "product variance");

                          return (
                            <div
                              key={data?._id}
                              className="rounded-xl shadow-md hover:shadow-lg transition-shadow"
                            >
                              <div
                                className={`h-[200px] w-full relative rounded-t-xl ${Styles.img_container} cursor-pointer`}
                                onClick={() => {
                                  console.log("Item clicked:", data);

                                  if (!data || !data?.productname1) {
                                    console.log(
                                      "Missing product data, cannot navigate"
                                    );
                                    return; // Exit if data is missing
                                  }

                                  const variancename = data?.productname1.replace(
                                    /\s+/g,
                                    "-"
                                  );

                                  if (data?.mainProductId) {
                                    console.log(
                                      "Navigating to:",
                                      `/variance/${variancename}/${data._id}`
                                    );
                                    router.push(
                                      `/variance/${variancename}/${data._id}`
                                    );
                                  } else {
                                    console.log(
                                      "Navigating to:",
                                      `/product/${variancename}/${data._id}`
                                    );
                                    router.push(
                                      `/products/${variancename}/${data._id}`
                                    );
                                  }
                                }}
                              >
                                <div
                                  className="absolute bg-white p-2 rounded-full right-4 top-4"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(data);
                                  }}
                                >
                                  <HiX className={`${Styles.icons} text-xl`} />
                                </div>
                                <img
                                  src={data?.imgs1}
                                  alt=""
                                  className={`h-full w-full object-contain rounded-t-xl`}
                                />
                              </div>
                              <div
                                className={`${Styles.text_container} rounded-b-xl p-4`}
                              >
                                <h1
                                  className={`${Styles.productname} cursor-pointer`}
                                  onClick={() => {
                                    if (!data || !data?.productname) {
                                      return;
                                    }

                                    const variancename =
                                      data?.productname1.replace(/\s+/g, "-");

                                    if (data?.data?.mainProductId) {
                                      router.push(
                                        `/variance/${variancename}/${data.data._id}`
                                      );
                                    } else {
                                      router.push(
                                        `/products/${variancename}/${data.data._id}`
                                      );
                                    }
                                  }}
                                >
                                  {data?.productname1.length > 40
                                    ? data?.productname1.slice(0, 40) + "..."
                                    : data?.productname1}
                                </h1>
                                <h1 className="font-bold mt-2 text-lg">
                                  ₹ {data?.discountprice2B}{" "}
                                  <span className="line-through font-normal text-base text-gray-500">
                                    ₹ {data?.price2A}
                                  </span>
                                </h1>
                                <Button
                                  value={
                                    cart.cart.findIndex(
                                      (item) => item._id === data?._id
                                    ) >= 0
                                      ? "Go To Cart"
                                      : "Add To Cart"
                                  }
                                  className="w-full mt-2"
                                  onClick={() => {
                                    if (
                                      cart.cart.findIndex(
                                        (item) => item._id === data?._id
                                      ) >= 0
                                    ) {
                                      // Navigate to the cart
                                      router.push("/cart"); // Replace with your navigation logic
                                    } else {
                                      // Execute the add-to-cart function
                                      handleAddToCart(data?._id);
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
