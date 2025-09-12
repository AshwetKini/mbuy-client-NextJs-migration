import React, { useEffect, useMemo, useState } from "react";
import Styles from "./Cart_card.module.css";
import { useDispatch } from "react-redux";
import {
  decrementcart,
  incrementcart,
  updateprice,
  userinputquantity,
} from "../../features/cartSlice";
import {
  getCssDeals,
  getmainproductname,
  getVariant,
  getProduct,
  getSlugName,
} from "../../apis/api";
import { useNavigate } from "react-router-dom";

let product = null;

const Cart_card = (props) => {
  const variance = useVariance(props.product);
  const [userinput, setUserInput] = useState(parseInt(props.product.quantity));
  // const cart = useSelector((state) => state.cartlist);
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const minusitemhandler = () => {
    if (userinput > parseInt(props.product.minord11A)) {
      dispatch(decrementcart(props.product._id));
      dispatch(updateprice(props.product._id));
      setUserInput((prev) => parseInt(prev) - 1);
      props.onBtnValueChange("Calculate Cart");
    }
  };

  const getname = async (id) => {
    try {
      const response = await getmainproductname(id);
      return response.data.data.productname1;
    } catch (error) {
      console.log("error");
    }
  };

  const plusitemhandler = () => {
    if (userinput < parseInt(props.product.maxord11B)) {
      dispatch(incrementcart(props.product._id));
      dispatch(updateprice(props.product._id));
      setUserInput((prev) => parseInt(prev) + 1);
      props.onBtnValueChange("Calculate Cart");
    }
  };

  const removecartitemhandler = () => {
    props.removeitem(props.product._id);
  };

  const setthequantity = async () => {
    if (
      userinput !== "" &&
      userinput >= parseInt(props.product.minord11A) &&
      userinput <= parseInt(props.product.maxord11B)
    ) {
      // console.log("valid user input", userinput);
      dispatch(
        userinputquantity({ id: props.product._id, quantity: userinput })
      );
    } else if (
      userinput === "" ||
      userinput < parseInt(props.product.minord11A)
    ) {
      // console.log("Invalid user input", userinput);
      dispatch(
        userinputquantity({
          id: props.product._id,
          quantity: props.product.minord11A,
        })
      );
      setUserInput(props.product.minord11A);
    } else if (userinput > parseInt(props.product.maxord11B)) {
      // console.log("Invalid user input", userinput);
      dispatch(
        userinputquantity({
          id: props.product._id,
          quantity: props.product.maxord11B,
        })
      );
      setUserInput(props.product.maxord11B);
    }
  };

  const routetoproduct = async (product) => {
    if (product._id) {
      const getProductDetails = async (id) => {
        // let productDetails = null;

        // if (product.mainProductId) {
        //   productDetails = await getVariant(id);
        // } else {
        //   productDetails = await getProduct(id);
        // }
        // console.log({ productDetails });

        // const productsvariation = productDetails.data.variations.findIndex(
        //   (item) => item._id === product._id
        // );
        // const variation = productDetails.data.variations[productsvariation]._id;
        // // const name = await getname(product.mainProductId);
        // const variationname =
        //   productDetails.data.variations[productsvariation].productname1;
        // console.log(variation);
        // const productname = name.replace(/\s+/g, '-');
        const slugName = await getSlugName(product.productname1);
        if (slugName.data[0].url_structure) {
          navigation(`/products/${slugName.data[0].url_structure}/${id}`);
        } else {
          navigation(
            `/products/${slugName.data[0].old_url}/${product.mainProductId}`
          );
        }
      };
      getProductDetails(product._id);
    } else {
      navigation(`/productdetails/${product._id}`);
    }
  };
  return (
    <React.Fragment>
      <div
        className={`${Styles.cart_card_img} ${props.className} col-span-7 flex flex-col md:flex-row break-words py-2 md:mr-2`}
        key={props.product._id}
      >
        <div className={`flex w-full`}>
          <div className={`h-32 ${Styles.productimgdiv}`}>
            <img
              src={props.product.imgs1}
              alt=""
              className={`object-cover h-full ${Styles.productimg}`}
            />
          </div>
          <div className={`px-2 ${Styles.producttitle}`}>
            <p
              className={` lg:text-lg  font-semibold capitalize cursor-pointer`}
              onClick={() => routetoproduct(props.product)}
            >
              {props.product.productname1}
            </p>
            <p className={`text-xs`}>
              (₹{props.product.cartvalue / props.product.quantity}/unit)
            </p>
            <AppliedDiscount
              product={props.product}
              variance={variance}
              updateTotalDiscount={props.updateTotalDiscount}
            />
          </div>
        </div>
        <div
          className={`${Styles.cart_card_content} ml-1 flex flex-col mt-2 md:mt-0 items-center md:items-end`}
        >
          <div className={`flex ${Styles.edit_cart_quantity} rounded`}>
            <button
              className={`px-2 text-2xl hover:bg-slate-100`}
              onClick={minusitemhandler}
            >
              -
            </button>
            <input
              type="number"
              className={`w-12 text-center`}
              value={userinput}
              min={props.product.minord11A}
              onChange={(e) => setUserInput(e.target.value)}
              onBlur={() => setthequantity()}
            />
            <button
              className={`px-2 text-2xl hover:bg-slate-100`}
              onClick={plusitemhandler}
            >
              +
            </button>
          </div>
          <p
            className={`cursor-pointer md:mr-5`}
            onClick={removecartitemhandler}
          >
            Remove
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart_card;

const useVariance = (props) => {
  const [variance, setVariance] = useState(null); // Initialize as null

  const getProductDetails = async (id) => {
    try {
      console.log("Fetching product details for ID:", id);
      let productdetails = null;

      if (props.mainProductId) {
        productdetails = await getVariant(id);
      } else {
        productdetails = await getProduct(id);
      }

      console.log("API Response:", productdetails);
      if (productdetails?.data?.data) {
        setVariance(productdetails.data.data); // Update state
      } else {
        console.error("Unexpected API response structure:", productdetails);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    if (props._id) {
      getProductDetails(props._id);
    }
  }, [props._id]); // Trigger on ID change

  useEffect(() => {
    console.log("Updated variance state:", variance);
  }, [variance]); // Observe state changes

  return variance; // Return the variance state
};

const AppliedDiscount = ({ product, updateTotalDiscount, variance }) => {
  const [discount, setDiscount] = useState(0);
  const [appliedDiscount, setAppliedDiscount] = useState("");

  const checkCssDeals = async (product) => {
    try {
      const response = await getCssDeals(`category=${product.categoryid}`);
      const data = response.data;
      const isSubsubCategory = data.find(
        (item) => item.subsubcategory === product.subsubcategory
      );
      if (isSubsubCategory) return setDiscount(+isSubsubCategory.percentage);
      const isSubCategory = data.find(
        (item) => item.subcategory === product.subcategory
      );
      if (isSubCategory) return setDiscount(+isSubCategory.percentage);
      const category = data.find(
        (item) => item.category === product.categoryid
      );
      if (category) return setDiscount(+category.percentage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (variance?.dod) {
      setDiscount(+variance.discount);
      setAppliedDiscount("Deal of the day");
    } else {
      checkCssDeals(product);
      setAppliedDiscount("CSS Deal");
    }
  }, [variance]);

  useEffect(() => {
    if (discount) {
      const discount_price = (+product.cartvalue * discount) / 100;
      updateTotalDiscount({ [product._id]: discount_price });
    }
  }, [discount, product.quantity]);

  // Render logic with null checks for variance and taxpercent3
  if (!variance) {
    return (
      <div>
        <p className={`font-bold text-xl`}>₹{product.cartvalue} /-</p>
        <p className="text-base text-red-500 font-semibold">GST - N/A</p>
      </div>
    );
  }

  const taxpercent3 = variance?.taxpercent3 || 0;

  if (discount) {
    const discounted_price = (+product.cartvalue * (100 - discount)) / 100;
    return (
      <div>
        <p className={`font-bold text-xl`}>
          <span className="line-through text-gray-600 text-lg mr-2">
            ₹{product.cartvalue}
          </span>
          <span>₹{discounted_price}</span> /-
        </p>
        <p className="text-base text-green-500 font-semibold">
          <span>{appliedDiscount} Applied </span>
          <span className="ml-2">{discount}%</span>
        </p>
        <p className="text-base text-red-500 font-semibold">
          <span>GST -</span>
          <span className="ml-2">{taxpercent3}%</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className={`font-bold text-xl`}>₹{product.cartvalue} /-</p>
      <p className="text-base text-red-500 font-semibold">
        <span>GST -</span>
        <span className="ml-2">{taxpercent3}%</span>
      </p>
    </div>
  );
};
