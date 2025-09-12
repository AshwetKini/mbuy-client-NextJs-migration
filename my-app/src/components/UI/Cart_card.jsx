import React, { useEffect, useState } from "react";
import Styles from "./Cart_card.module.css";
import { useDispatch } from "react-redux";
import {
  decrementcart,
  incrementcart,
  updateprice,
  userinputquantity,
} from "@/store/Slices/cartSlice";
import {
  getCssDeals,
  getVariant,
  getProduct,
  getSlugName,
  getVariantcart,
} from "@/apis/api";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
let product = null;

const Cart_card = (props) => {
  console.log("Cart_card props:", props.product);

  const variance = useVariance(props.product.item || props.product);

  // console.log("Cart Card Props:", props.product);
  const [userinput, setUserInput] = useState(
    parseInt(props.product.quantity || props.product.item?.quantity)
  );

  // Update local state when props change to stay in sync
  useEffect(() => {
    setUserInput(
      parseInt(props.product.quantity || props.product.item?.quantity)
    );
  }, [props.product.quantity, props.product.item?.quantity]);

  const navigation = useRouter();

  const dispatch = useDispatch();
  const minusitemhandler = () => {
    if (
      userinput >
      parseInt(props?.product.item?.minord11A || props.product.minord11A)
    ) {
      // First update the Redux store
      dispatch(decrementcart(props?.product.item?._id || props.product._id));
      dispatch(updateprice(props?.product.item?._id || props.product._id));

      // Then update local state
      const newQuantity = parseInt(userinput) - 1;
      setUserInput(newQuantity);

      // Force immediate cart recalculation (don't wait for Redux)
      if (props.handleCartItemChange) {
        // Pass the updated quantity to ensure immediate update
        props.handleCartItemChange({
          id: props?.product.item?._id || props.product._id,
          quantity: newQuantity,
        });
      } else {
        props.onBtnValueChange("Calculate Cart");
      }
    }
  };

  const plusitemhandler = () => {
    if (
      userinput <
      parseInt(props?.product.item?.maxord11B || props.product.maxord11B)
    ) {
      // First update the Redux store
      dispatch(incrementcart(props?.product.item?._id || props.product._id));
      dispatch(updateprice(props?.product.item?._id || props.product._id));

      // Then update local state
      const newQuantity = parseInt(userinput) + 1;
      setUserInput(newQuantity);

      // Force immediate cart recalculation (don't wait for Redux)
      if (props.handleCartItemChange) {
        // Pass the updated quantity to ensure immediate update
        props.handleCartItemChange({
          id: props?.product.item?._id || props.product._id,
          quantity: newQuantity,
        });
      } else {
        props.onBtnValueChange("Calculate Cart");
      }
    }
  };

  const removecartitemhandler = () => {
    props.removeitem(props.product._id);
  };

  const setthequantity = async () => {
    const minQuantity = parseInt(
      props.product.minord11A || props.product.item?.minord11A
    );
    const maxQuantity = parseInt(
      props.product.maxord11B || props.product.item?.maxord11B
    );
    const id = props.product._id || props.product.item?._id;

    let finalQuantity = parseInt(userinput) || 0;

    // Validate quantity
    if (userinput === "" || finalQuantity < minQuantity) {
      finalQuantity = minQuantity;
    } else if (finalQuantity > maxQuantity) {
      finalQuantity = maxQuantity;
    }

    // Synchronize with local state first
    setUserInput(finalQuantity);

    // Update in Redux
    dispatch(userinputquantity({ id: id, quantity: finalQuantity }));
    dispatch(updateprice(id));

    // Force immediate cart recalculation (don't wait for Redux)
    if (props.handleCartItemChange) {
      // Pass the updated quantity to ensure immediate update
      props.handleCartItemChange({
        id: id,
        quantity: finalQuantity,
      });
    } else {
      props.onBtnValueChange("Calculate Cart");
    }
  };

  const routetoproduct = async (product) => {
    if (product._id) {
      const getProductDetails = async (id) => {
        let productDetails = null;

        if (product.mainProductId) {
          productDetails = await getVariant(id);
        } else {
          productDetails = await getProduct(id);
        }
        // console.log({ productDetails });

        const productsvariation = productDetails.data.variations.findIndex(
          (item) => item._id === product._id
        );
        const variation = productDetails.data.variations[productsvariation]._id;
        // const name = await getname(product.mainProductId);
        const variationname =
          productDetails.data.variations[productsvariation].productname1;
        // console.log(variation);
        // const productname = name.replace(/\s+/g, '-');
        const slugName = await getSlugName(product.productname1);
        if (slugName.data[0].url_structure) {
          navigation(
            `/products/${slugName.data[0].url_structure}/${variation}`
          );
        } else {
          navigation(
            `/products/${slugName.data[0].old_url}/${product.mainProductId}`
          );
        }
      };
      // getProductDetails(product._id);
    } else {
      navigation(`/productdetails/${product._id}`);
    }
  };

  const getTotalVendorPrice = (product) => {
    const vendorPrice =
      Number(
        product?.vendorPriceAtPincode || product?.item?.vendorPriceAtPincode
      ) || 0;
    const quantity = Number(product?.quantity || product?.item?.quantity) || 1;
    console.log("getTotalVendorPrice:", {
      vendorPrice,
      quantity,
      total: vendorPrice * quantity,
    });
    return vendorPrice * quantity;
  };
  const changeroute = async (item) => {
    console.log(item);
    try {
      const token = localStorage.getItem("authToken");
      let response = null;
      let slugName = null;

      if (item.mainProductId) {
        response = await getVariant(item._id);
        slugName = await getSlugName(item.productname1, token);
        console.log(slugName, "slugName");
      } else {
        response = await getProduct(item._id);
        slugName = await getSlugName(item.productname1, token);
        console.log(slugName, "slugName");
      }
      if (response.data) {
        const urlStructure =
          slugName.data[0]?.url_structure || slugName.data[0]?.old_url;
        navigation.push(
          `/${item.mainProductId ? "variance" : "products"}/${urlStructure}/${
            item._id
          }`
        );
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  return (
    <React.Fragment>
      <div
        className={`${Styles.cart_card_img} ${props.className} col-span-7 flex flex-col md:flex-row break-words py-2 md:mr-2`}
        key={props?.product.item?._id || props?.product._id}
      >
        <div className={`flex w-full`}>
          <div className={`h-32 ${Styles.productimgdiv}`}>
            <img
              src={props.product.imgs1 || props?.product.item.imgs1}
              alt=""
              className={`object-cover h-full ${Styles.productimg} cursor-pointer `}
              onClick={() => changeroute(props.product)}
            />
          </div>
          <div className={`px-2 ${Styles.producttitle}`}>
            <p
              className={` lg:text-lg hover:underline hover:text-blue-500   font-semibold capitalize cursor-pointer`}
              onClick={() => changeroute(props.product)}
            >
              {props?.product?.item?.productname1 ||
                props?.product?.productname1}
            </p>
            <p className={`text-xs`}>
              (₹
              {(() => {
                const item = props?.product?.item || props?.product;
                const cartValue = Number(item.cartvalue || 0);
                const vendorPrice = Number(item.vendorPriceAtPincode || 0);
                const quantity = Number(item.quantity || 0);
                console.log("Per-unit price calculation:", {
                  cartValue,
                  vendorPrice,
                  quantity,
                });

                // Calculate per-unit price
                if (quantity === 0) return 0;
                return Math.ceil(cartValue / quantity + vendorPrice);
              })()}
              /unit)
            </p>
            <AppliedDiscount
              product={props?.product?.item || props?.product}
              variance={variance}
              updateTotalDiscount={props.updateTotalDiscount || (() => {})}
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
              min={props?.product.minord11A || props?.product.item?.minord11A}
              onChange={(e) => {
                // Ensure numeric value (empty or valid number)
                const value =
                  e.target.value === "" ? "" : parseInt(e.target.value) || 0;
                setUserInput(value);
              }}
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

const useVariance = (product) => {
  const [variance, setVariance] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!product || !product._id) {
          console.log("No valid product ID available");
          return;
        }

        console.log("useVariance - Product:", {
          id: product._id,
          mainProductId: product.mainProductId,
          vendorPrice: product.vendorPriceAtPincode,
        });

        // Check if it's a variant or main product
        if (product.mainProductId) {
          // It's a variant
          const response = await getVariantcart(product._id);
          if (response && response.data) {
            console.log("Variant data fetched:", {
              id: response.data._id,
              vendorPrice: response.data.vendorPriceAtPincode,
              taxpercent3: response.data.taxpercent3,
            });
            setVariance(response.data);
          } else {
            console.error("Failed to fetch variant data:", response);
          }
        } else {
          // It's a main product
          const response = await getProduct(product._id);
          if (response && response.data) {
            console.log("Product data fetched:", {
              id: response.data._id,
              vendorPrice: response.data.vendorPriceAtPincode,
              taxpercent3: response.data.taxpercent3,
            });
            setVariance(response.data);
          } else {
            console.error("Failed to fetch product data:", response);
          }
        }
      } catch (error) {
        console.error("Error in useVariance hook:", error);
      }
    };

    fetchProductDetails();
  }, [product?._id]);

  return variance;
};

const AppliedDiscount = ({ product, updateTotalDiscount, variance }) => {
  const [discount, setDiscount] = useState(0);
  const [appliedDiscount, setAppliedDiscount] = useState("");

  // Get the correct product ID, handling both direct products and nested item structure
  const getProductId = () => {
    if (!product) return null;
    return product._id;
  };

  console.log("AppliedDiscount props:", {
    product: product
      ? {
          id: getProductId(),
          vendorPrice: product.vendorPriceAtPincode,
          cartValue: product.cartvalue,
          quantity: product.quantity,
          taxpercent3: product.taxpercent3,
          dod: product.dod,
          discount: product.discount,
        }
      : null,
    variance: variance
      ? {
          id: variance._id,
          vendorPrice: variance.vendorPriceAtPincode,
          taxpercent3: variance.taxpercent3,
          dod: variance.dod,
          discount: variance.discount,
        }
      : null,
  });

  // Check for CSS deals (category-specific discounts)
  const checkCssDeals = async (product) => {
    try {
      if (!product || !product.categoryid) {
        return 0;
      }

      const response = await getCssDeals(`category=${product.categoryid}`);
      if (!response || !response.data) {
        return 0;
      }

      const data = response.data;

      const isSubsubCategory = data.find(
        (item) => item.subsubcategory === product.subsubcategory
      );
      if (isSubsubCategory) return +isSubsubCategory.percentage;

      const isSubCategory = data.find(
        (item) => item.subcategory === product.subcategory
      );
      if (isSubCategory) return +isSubCategory.percentage;

      const category = data.find(
        (item) => item.category === product.categoryid
      );
      if (category) return +category.percentage;

      return 0; // No discount found
    } catch (error) {
      return 0;
    }
  };

  // Get total vendor price for a product
  const getTotalVendorPrice = (product) => {
    if (!product) return 0;

    const vendorPrice = Math.ceil(Number(product.vendorPriceAtPincode)) || 0;
    const quantity = Math.ceil(Number(product.quantity)) || 1;
    return Math.ceil(vendorPrice * quantity);
  };

  // Apply initial discounts
  useEffect(() => {
    const applyDiscounts = async () => {
      if (!product) {
        return;
      }

      // Check if product has its own dod flag (for regular products)
      if (product.dod) {
        const discountValue = product.discount ? Number(product.discount) : 0;
        console.log("Product DOD Discount applied:", discountValue);
        setDiscount(discountValue);
        setAppliedDiscount("Deal of the Day");
        return;
      }

      // Check for CSS deals
      const cssDiscount = await checkCssDeals(product);
      if (cssDiscount > 0) {
        console.log("CSS Discount applied:", cssDiscount);
        setDiscount(cssDiscount);
        setAppliedDiscount("CSS Deal");
        return;
      }

      // Then check for Deal of the Day if variance data is available
      if (variance && variance.dod) {
        const discountValue = variance.discount ? Number(variance.discount) : 0;
        console.log("Variant DOD Discount applied:", discountValue);
        setDiscount(discountValue);
        setAppliedDiscount("Deal of the Day");
      }
    };

    applyDiscounts();
  }, [product, variance]);

  // Update total discount whenever relevant values change
  useEffect(() => {
    if (discount > 0 && product && typeof updateTotalDiscount === "function") {
      const basePrice = Number(product.cartvalue) || 0;
      const vendorPrice = Number(product.vendorPriceAtPincode) || 0;
      const quantity = Number(product.quantity) || 1;

      // Calculate discount price based on current cart values
      const discount_price =
        ((basePrice + vendorPrice * quantity) * discount) / 100;

      // Get the correct product ID
      const productId = getProductId();

      console.log("Discount calculation:", {
        basePrice,
        vendorPrice,
        quantity,
        discount,
        discount_price,
        totalBeforeDiscount: basePrice + vendorPrice * quantity,
        productId,
      });

      // Update the discount in the parent component
      if (productId) {
        updateTotalDiscount({ [productId]: discount_price });
      }
    }
  }, [
    discount,
    product?.quantity,
    product?.cartvalue,
    product?.vendorPriceAtPincode,
    product?._id,
    updateTotalDiscount,
  ]);

  // If product data isn't loaded yet, show basic loading state
  if (!product) {
    return <div>Loading...</div>;
  }

  // Calculate prices for display
  const taxpercent3 = product.taxpercent3 || variance?.taxpercent3 || 0;
  const cartValue = Number(product.cartvalue) || 0;
  const vendorValue = getTotalVendorPrice(product);
  const totalValue = cartValue + vendorValue;

  // Calculate discounted price if discount is available
  const discounted_price =
    discount > 0 ? (totalValue * (100 - discount)) / 100 : totalValue;

  return (
    <div>
      {discount > 0 ? (
        <p className="font-bold text-xl">
          <span className="line-through text-gray-600 text-lg mr-2">
            ₹{Math.ceil(totalValue)}
          </span>
          <span>₹{Math.ceil(discounted_price)}</span> /-
        </p>
      ) : (
        <p className="font-bold text-xl">₹{Math.ceil(totalValue)} /-</p>
      )}

      {discount > 0 && (
        <p className="text-base text-green-500 font-semibold">
          <span>{appliedDiscount} Applied</span>
          <span className="ml-2">{discount}%</span>
        </p>
      )}

      <p className="text-base text-red-500 font-semibold">
        <span>GST -</span>
        <span className="ml-2">{taxpercent3}%</span>
      </p>
    </div>
  );
};
