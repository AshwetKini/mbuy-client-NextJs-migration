"use client";
import React from "react";
import Styles from "./Wishlist.module.css";
import Fullcontainer from "../my-app/src/components/UI/Fullcontainer";
import Container from "../my-app/src/components/UI/Container";
import Layout from "../my-app/src/Layouts/Layout";
import { HiX } from "react-icons/hi";
import { deleteWishList, getVariant, getProduct } from "../my-app/src/apis/api";
import { editItemToCart } from "../my-app/src/store/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "../my-app/src/components/UI/Button";
import { toast } from "react-toastify";
import Head from "next/head";

const Wishlist = ({ wishlist, userId }) => {
  const cart = useSelector((state) => state.cartlist);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleDelete = async (data1) => {
    try {
      let createData = data1.mainProductId
        ? { userId, productId: data1.mainProductId, varianceId: data1._id }
        : { userId, productId: data1._id };

      const response = await deleteWishList(createData);
      if (response.status === 200) {
        toast.success("Item removed from wishlist");
        navigate.refresh(); // Refresh the page to update wishlist
      } else {
        console.error("Error Deleting Product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = (ProductId) => {
    const productDetails = wishlist.find((product) => product._id === ProductId);
    const productquantity = productDetails.minord11A;
    dispatch(editItemToCart({ productDetails, productquantity }));

    navigate.push("/cart");
    setTimeout(() => handleDelete(productDetails), 0);
  };

  const routechangehandler = () => {
    navigate.push("/allproducts/categories/all");
  };

  return (
    <>
      <Head>
        <title>My Wishlist - Your Saved Products</title>
        <meta name="description" content="View your saved products and manage your wishlist easily." />
        <meta property="og:title" content="My Wishlist - Your Saved Products" />
        <meta property="og:description" content="View and manage your favorite products in your wishlist." />
        <meta property="og:image" content="/Wishlist.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://materialbuy.com/wishlist" />
      </Head>

      <Layout>
        <Fullcontainer className={Styles.fullcontainer}>
          <Container className={Styles.container}>
            <div className={Styles.title}>
              <h1>My Wishlist</h1>
            </div>

            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {wishlist.map((data) => (
                  <div key={data._id}>
                    <div
                      className={`h-[200px] w-full relative rounded-t-xl ${Styles.img_container} cursor-pointer`}
                      onClick={() => {
                        const variancename = data.productname1.replace(/\s+/g, "-");
                        navigate.push(data.mainProductId ? `/variance/${variancename}/${data._id}` : `/product/${variancename}/${data._id}`);
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
                      <img src={data.imgs1} alt="" className="h-full w-full object-cover rounded-t-xl" />
                    </div>
                    <div className={Styles.text_container}>
                      <h1 className={Styles.productname}>{data.productname1}</h1>
                      <h1 className="font-bold">
                        ₹ {data.discountprice2B} <span className="line-through font-normal text-sm">₹ {data.price2A}</span>
                      </h1>
                      <Button
                        value={cart.cart.some((item) => item._id === data._id) ? "Go To Cart" : "Add To Cart"}
                        className="w-full"
                        onClick={() =>
                          cart.cart.some((item) => item._id === data._id) ? navigate.push("/cart") : handleAddToCart(data._id)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="text-xl border rounded flex flex-col w-full py-40 items-center justify-center">
                Your Wishlist is currently empty.
                <Button value="Shop Now" onClick={routechangehandler} />
              </h1>
            )}
          </Container>
        </Fullcontainer>
      </Layout>
    </>
  );
};

// 🔹 Fetch Data Server-Side
export async function getServerSideProps(context) {
  const { req } = context;
  const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;

  if (!user) {
    return {
      props: {
        wishlist: [],
        userId: null,
      },
    };
  }

  try {
    const response = await getWishlist(user._id);
    if (!response.data) {
      return {
        props: {
          wishlist: [],
          userId: user._id,
        },
      };
    }

    const products = await Promise.all(
      response.data.whishList.map(async (product) => {
        let productresponse = product.varianceId ? await getVariant(product.varianceId) : await getProduct(product.productId);
        return productresponse.status === 200 ? productresponse.data : null;
      })
    );

    return {
      props: {
        wishlist: products.filter(Boolean), // Remove null values
        userId: user._id,
      },
    };
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return {
      props: {
        wishlist: [],
        userId: user._id,
      },
    };
  }
}

export default Wishlist;
