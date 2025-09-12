import React, { useEffect, useState, useReducer } from "react";
import Styles from "./ProductDetails.module.css";
import Fullcontainer from "../UI/Fullcontainer";
import Container from "../UI/Container";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { editItemToCart, updateprice } from "../../features/cartSlice";
import {
  BsSuitHeart,
  BsShieldLockFill,
  BsChevronDown,
  BsSuitHeartFill,
} from "react-icons/bs";
import { HiDocumentText, HiMiniPhone } from "react-icons/hi2";
import { GiAlliedStar } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import OffersPopup from "../UI/OffersPopup";
import {
  getPromoCodes,
  addWishlist,
  getWishlist,
  deleteWishList,
  getBuyerdata,
  freqdataswithID,
  getSlugName,
} from "../../apis/api";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { GrDocumentPdf } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import MultiCarousels from "../carousel/MultiCarousel";
import { Helmet } from "react-helmet";

const quantityReducer = (state, action) => {
  if (action.type === "INCREMENT") {
    return {
      ...state,
      quantity:
        state.quantity === state.maximum ? state.quantity : state.quantity + 1,
    };
  }
  if (action.type === "DECREMENT") {
    return {
      ...state,
      quantity:
        state.quantity === state.minimum ? state.quantity : state.quantity - 1,
    };
  }
  if (action.type === "USER_INPUT") {
    let result = 0;
    if (parseInt(action.value) < state.minimum) {
      result = state.minimum;
    }
    if (parseInt(action.value) > state.maximum) {
      result = state.maximum;
    }
    if (
      parseInt(action.value) >= state.minimum &&
      parseInt(action.value) <= state.maximum
    ) {
      result = parseInt(action.value);
    }
    return {
      ...state,
      quantity: result,
    };
  }
  if (action.type === "INITIAL") {
    return {
      quantity: parseInt(action.quant),
      price: parseInt(action.price),
      minimum: parseInt(action.min),
      maximum: parseInt(action.max),
    };
  }
  if (action.type === "SELECT_RANGE") {
    return {
      ...state,
      quantity: parseInt(action.quant),
    };
  }
  if (action.type === "PRICE") {
    return {
      ...state,
      price: parseInt(action.price),
    };
  }
  return state;
};

const ProductDetails = (props) => {
  const [productDetails, setProductsDetails] = useState(null);
  const [image, setImages] = useState(null);
  const [activeImage, setActiveImage] = useState(1);
  const [buttonValue, setButtonValue] = useState(false);
  const [toggle, setToggle] = useState("Description");
  const [showOffers, setShowOffers] = useState(false);
  const cart = useSelector((state) => state.cartlist);
  const [userinput, setUserInput] = useState(null);
  const dispatch = useDispatch();
  const [offers, setOffers] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [wishlistData, setWishListData] = useState(null);
  const [pinCodeState, setPinCodeState] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  // const [variantactive, setVariantActive] = useState(0);
  const [userQuantValue, setUserQuantValue] = useState(null);
  const [isMobileBulkOrderOpen, setIsMobileBulkOrderOpen] = useState(false);
  const [freqB, setFreqB] = useState(null);
  const [result, setResult] = useState(null);
  const productId = useParams();
  const navigation = useNavigate();

  const [quantityState, dispatchQuantity] = useReducer(quantityReducer, {
    quantity: 0,
    price: 0,
    minimum: 0,
    maximum: 0,
  });

  const handleImages = (key) => {
    if (key === 1) {
      setImages(productDetails.imgs1);
      setActiveImage(1);
    } else if (key === 2) {
      setImages(productDetails.imgs2);
      setActiveImage(2);
    } else if (key === 3) {
      setImages(productDetails.imgs3);
      setActiveImage(3);
    } else if (key === 4) {
      setImages(productDetails.imgs4);
      setActiveImage(4);
    }
  };

  const calculateHanlder = (userqunatvalue) => {
    // console.log(userqunatvalue)
    const result = Math.ceil(
      (userqunatvalue / productDetails.calculator) * 1.1
    );
    // console.log(result);
    setResult(result);
  };

  const togglehandler = () => {
    setToggle("Description");
  };

  const togglehandler1 = () => {
    setToggle("Specification");
  };

  const togglehandler2 = () => {
    setToggle("Calculator");
  };
  const checkpincode = async () => {
    console.log(productDetails);
    const pincode = pinCodeState;
    console.log(pincode);

    const response = await getBuyerdata();
    console.log(response);
    const dataArray = response;

    const isPincodeFound = dataArray.some((dict) => dict.pin === pincode);
    console.log(isPincodeFound);

    if (!pincode) {
      setResultMessage("Enter pincode first");
    } else if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setResultMessage("Invalid pincode");
    } else {
      const isPincodeInExcpins = productDetails.excpins.includes(pincode);

      if (isPincodeInExcpins) {
        console.log("Pincode is in excpins. Success!");
        setResultMessage(
          "We don't  deliver to this pincode, Contact Materialbuy Team"
        );
        toast.error("Sorry we don't deliver to this address");
      } else {
        if (isPincodeFound) {
          console.log("Pincode is not in excpins. Failure!");
          setResultMessage("Shipping is available");

          toast.success("shipping is available");
        } else {
          setResultMessage(
            "We don't  deliver to this pincode, Contact Materialbuy Team"
          );
          toast.error("Sorry we don't deliver to this address");
        }
      }
    }
  };
  // const successWords = ['Success', 'Valid', 'Available']; // Add your success words
  const failureWords = ["Sorry", "Enter", "Invalid", "don't"]; // Add your failure words

  // const isSuccess = successWords.some(word => resultMessage.includes(word));
  const isFailure = failureWords.some((word) => resultMessage.includes(word));

  const resultColor = isFailure ? "red" : "green";

  // const resultColor = resultMessage.includes('Sorry') ? 'red' : 'green';

  useEffect(() => {
    const getProductDetails = async () => {
      if (props.productData != null) {
        setProductsDetails(props.productData);
        if (props.productData.discountprice2B) {
          dispatchQuantity({
            type: "INITIAL",
            quant: props.productData.minord11A,
            price: props.productData.discountprice2B,
            min: props.productData.minord11A,
            max: props.productData.maxord11B,
          });
        }

        setActiveImage(1);
        if (props.productData) {
          setImages(props.productData.imgs1);
        }

        if (cart.cart.length > 0) {
          const check = cart.cart.find(
            (item) => item._id === props.productData._id
          );
          console.log(check, "check");
          if (check) {
            setButtonValue(true);
          } else {
            setButtonValue(false);
          }
        }
      }
      if (props.productData?.vari.length > 0) {
        const freqdata = props.productData?.vari.map(async (item) => {
          const response = await freqdataswithID(item);
          if (response.status === 200) {
            return response.data;
          }
        });
        Promise.all(freqdata)
          .then((res) => {
            setFreqB(res);
            return res;
          })
          .catch((err) => console.error(err));
      }
    };
    getProductDetails();

    const getPromoCodesData = async () => {
      try {
        const response = await getPromoCodes();
        if (response.status === 200) {
          const validOffers = response.data.filter(
            (data) => data.currentstatus
          );

          setOffers(validOffers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPromoCodesData();
  }, [props.productData, productId]);

  const addtocardhandler = async () => {
    const { quantity: productquantity } = quantityState;
    dispatch(editItemToCart({ productDetails, productquantity }));
    if (buttonValue === false) {
      dispatch(updateprice(props.productData._id));
    }
    setButtonValue(!buttonValue);
  };

  useEffect(() => {
    if (productDetails) {
      if (
        quantityState.quantity >= productDetails.minord11A &&
        quantityState.quantity < productDetails.minimum1
      ) {
        dispatchQuantity({
          type: "PRICE",
          price: productDetails.discountprice2B,
        });
      }
      if (
        quantityState.quantity >= productDetails.minimum1 &&
        quantityState.quantity <= productDetails.maximum1
      ) {
        dispatchQuantity({ type: "PRICE", price: productDetails.price1 });
      }
      if (
        quantityState.quantity >= productDetails.minimum2 &&
        quantityState.quantity <= productDetails.maximum2
      ) {
        dispatchQuantity({ type: "PRICE", price: productDetails.price2 });
      }
      if (
        quantityState.quantity >= productDetails.minimum3 &&
        quantityState.quantity <= productDetails.maximum3
      ) {
        dispatchQuantity({ type: "PRICE", price: productDetails.price3 });
      }
      if (
        quantityState.quantity >= productDetails.minimum4 &&
        quantityState.quantity <= productDetails.maximum4
      ) {
        dispatchQuantity({ type: "PRICE", price: productDetails.price4 });
      }
      if (
        quantityState.quantity >= productDetails.minimum5 &&
        quantityState.quantity <= productDetails.maximum5
      ) {
        dispatchQuantity({ type: "PRICE", price: productDetails.price5 });
      }
      if (
        quantityState.quantity >= productDetails.minimum6 &&
        quantityState.quantity <= productDetails.maximum6
      ) {
        dispatchQuantity({ type: "PRICE", price: productDetails.price6 });
      }
    }
  }, [quantityState.quantity]);

  const radiochangehandler = (min, price) => {
    dispatchQuantity({
      type: "SELECT_RANGE",
      quant: parseInt(min),
    });
  };

  useEffect(() => {
    setUserInput(quantityState.quantity);
  }, [quantityState]);

  const incrementquantityhandler = () => {
    dispatchQuantity({ type: "INCREMENT" });
  };

  const decrementquantityhandler = () => {
    dispatchQuantity({ type: "DECREMENT" });
  };

  const setthequantity = () => {
    if (userinput != "") {
      setUserInput(productDetails.minord11A);
      dispatchQuantity({ type: "USER_INPUT", value: userinput });
    } else {
      setUserInput(productDetails.minord11A);
      dispatchQuantity({ type: "USER_INPUT", value: productDetails.minord11A });
    }
  };

  const showOffersPopups = () => {
    setShowOffers(true);
  };

  const setStatus = (data) => {
    setShowOffers(data);
  };

  useEffect(() => {
    const scrollToTop = () => {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - currentScroll);
      }
    };
    scrollToTop();
  }, []);

  const deletefromWishlist = async () => {
    const user = localStorage.getItem("user");
    const getuserId = JSON.parse(user)._id;
    let data;
    if (productDetails.mainProductId) {
      data = {
        userId: getuserId,
        productId: productDetails.mainProductId,
        varianceId: productDetails._id,
      };
    } else {
      data = {
        userId: getuserId,
        productId: productDetails._id,
      };
    }
    const response = await deleteWishList(data);
    if (response.status === 200) {
      setWishlist(false);
      toast.success("Product removed from wishlist");
    } else {
      toast.error("Error removing from wishlist");
    }
  };

  const AddproducttoWishlist = async () => {
    const user = localStorage.getItem("user");
    const getuserId = JSON.parse(user)?._id;

    if (!getuserId) {
      toast.info("Please login to add a product to the wishlist.");
      return;
    }

    let data = {};

    if (productDetails.mainProductId) {
      data = {
        userId: getuserId,
        productId: productDetails.mainProductId,
        varianceId: productDetails._id,
      };
    } else {
      data = {
        userId: getuserId,
        productId: productDetails._id,
      };
    }
    // Check if the product is already in the wishlist
    const isProductInWishlist = await checkProductInWishlist(getuserId);

    if (isProductInWishlist) {
      toast.info("Product is already in the wishlist.");
      return;
    }

    const response = await addWishlist(data);
    if (response.status === 200) {
      setWishlist(true);
      toast.success("Product added to the wishlist");
    } else {
      toast.error("Error adding to the wishlist");
    }
  };

  const checkProductInWishlist = async (userID) => {
    const response = await getWishlist(userID);
    if ((response.status === 200) & (response.data != null)) {
      return response.data.whishList.some(
        (item) => item.varianceId === productDetails._id
      );
    }

    return false;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const getWishlistData = async (id) => {
      const response = await getWishlist(id);

      if (response.status === 200 && productDetails) {
        console.log("wishlistproductdetails", productDetails);
        try {
          if (response.data) {
            console.log(response.data);
            // Check if the product is in the wishlist
            const isProductInWishlist = response.data.whishList.some(
              (item) => item.varianceId === productDetails._id
            );

            setWishlist(isProductInWishlist);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (user) {
      const getuserId = user._id;
      getWishlistData(getuserId);
    }
  }, [productDetails, productId]);

  const changetheproduct = async (item, index) => {
    const slugName = await getSlugName(item.productname1);
    if (slugName.data[0].url_structure) {
      navigation(`/variance/${slugName.data[0].url_structure}/${item._id}`);
    } else {
      navigation(`/variance/${slugName.data[0].old_url}/${item._id}`);
    }

    setSelectedProduct({ item, index });
  };

  return (
    <div>
      {}
      {showOffers && <OffersPopup offers={offers} status={setStatus} />}
      <Fullcontainer
        className={`${Styles.Fullcontainer}`}
        key={productDetails && productDetails._id}
      >
        <Container className={Styles.container}>
          {productDetails ? (
            <>
              <Helmet>
                <title>{productDetails.seotitle}</title>
                <meta name="description" content={productDetails.seodesc} />
              </Helmet>
              <div
                className={`flex flex-row items-center font-bold text-sm md:text-md mb-2 w-full overflow-x-auto ${Styles.product_breakcrumb}`}
              >
                <div className="flex flex-row items-center min-w-max">
                  <Link to="/allproducts/categories/all" className="w-fit">
                    <AiFillHome className="" />
                  </Link>
                  <Link
                    to={`/allproducts/subcategory/${(
                      productDetails?.categoryid ?? ""
                    ).replace(/\s+/g, "-")}`}
                    className="w-fit"
                  >{`> ${productDetails?.categoryid}`}</Link>
                  <Link
                    to={`/allproducts/subsubcategory/${(productDetails?.subcategory).replace(
                      /\s+/g,
                      "-"
                    )}`}
                    className="w-fit"
                  >{`> ${productDetails?.subcategory}`}</Link>
                  <Link
                    to={`/products/${productDetails?.subsubcategory}`}
                    className="w-fit"
                  >{`> ${productDetails?.subsubcategory}`}</Link>
                </div>
              </div>
              <div className={Styles.mainPage}>
                <div className={Styles.imageSection}>
                  <div className={Styles.bigImages}>
                    <img
                      src={image || productDetails.imgs1}
                      alt="Product_image"
                      className=""
                    />
                  </div>
                  <div className={Styles.smallImagesDiv}>
                    <div
                      className={`${Styles.smallImages1} ${
                        activeImage === 1 ? Styles.active : ""
                      }`}
                      onClick={() => handleImages(1)}
                    >
                      <img src={productDetails.imgs1} alt="Product" />
                    </div>
                    {productDetails.imgs2 ? (
                      <>
                        <div
                          className={`${Styles.smallImages2} ${
                            activeImage === 2 ? Styles.active : ""
                          }`}
                          onClick={() => handleImages(2)}
                        >
                          <img src={productDetails.imgs2} alt="Product" />
                        </div>
                      </>
                    ) : null}

                    {productDetails.imgs3 ? (
                      <>
                        <div
                          className={`${Styles.smallImages3} ${
                            activeImage === 3 ? Styles.active : ""
                          }`}
                          onClick={() => handleImages(3)}
                        >
                          <img src={productDetails.imgs3} alt="Product" />
                        </div>
                      </>
                    ) : null}

                    {productDetails.imgs4 && (
                      <>
                        <div
                          className={`${Styles.smallImages4} ${
                            activeImage === 4 ? Styles.active : ""
                          }`}
                          onClick={() => handleImages(4)}
                        >
                          <img src={productDetails.imgs4} alt="Product" />
                        </div>
                      </>
                    )}
                  </div>

                  {offers?.length > 0 ? (
                    <>
                      <div className={`mt-2 ${Styles.desktop_offers_card}`}>
                        <p className={`font-semibold text-lg`}>
                          Available offers:
                        </p>
                        <div
                          className={`${Styles.offers_card}  flex items-center rounded px-3`}
                        >
                          <p className={`text-white mr-4 text-center`}>
                            {offers && offers[0].message}
                          </p>
                          <span
                            className={`${Styles.offers_card_centerline}`}
                          ></span>
                          <div className={`ml-4 flex flex-col items-center `}>
                            <p
                              className={`text-white text-center ${Styles.offers_usecode}`}
                            >
                              use code
                            </p>
                            <p
                              className={`text-yellow-400 text-center font-bold`}
                            >
                              {offers && offers[0].codename}
                            </p>
                          </div>
                        </div>
                        <p
                          className="underline cursor-pointer"
                          onClick={showOffersPopups}
                        >
                          View all offers
                        </p>
                      </div>
                      <div
                        className={`product_service_assurance ${Styles.desktop_assurance} flex items-center justify-between w-full mt-3 md:mt-4`}
                      >
                        <div className="product_service_assurance_card flex items-center flex-col md:flex-row">
                          <div>
                            <GiAlliedStar
                              className={`text-3xl ${Styles.iconss}`}
                            />
                          </div>
                          <div className="ml-0 md:ml-2">
                            <h3 className="text-sm md:text-md font-semibold text-center md:text-left">
                              100% ORIGINAL
                            </h3>
                            <p className="text-sm text-center md:text-left">
                              products
                            </p>
                          </div>
                        </div>
                        <div className="product_service_assurance_card flex items-center justify-center flex-col md:flex-row">
                          <div>
                            <RiSecurePaymentLine
                              className={`text-3xl ${Styles.iconss}`}
                            />
                          </div>
                          <div className="ml-0 md:ml-2">
                            <h3 className="text-sm md:text-md font-semibold text-center md:text-left">
                              SECURE
                            </h3>
                            <p className="text-sm text-center md:text-left">
                              payment
                            </p>
                          </div>
                        </div>
                        <div className="product_service_assurance_card flex items-center flex-col md:flex-row">
                          <div>
                            <BsShieldLockFill
                              className={`text-2xl ${Styles.iconss}`}
                            />
                          </div>
                          <div className="ml-0 md:ml-2">
                            <h3 className="text-sm md:text-md font-semibold text-center md:text-left">
                              100% BUYER
                            </h3>
                            <p className="text-sm text-center md:text-left">
                              protections
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className={Styles.descriptionSection}>
                  <h3>SKU ID : {productDetails.skuid5} </h3>
                  {productDetails.discount > 0 && (
                    <p className="font-bold text-red-500">
                      Deals of the day - {productDetails.discount}%
                    </p>
                  )}
                  <h1 className="leading-tight text-lg sm:text-2xl font-semibold">
                    {productDetails.productname1}
                  </h1>
                  <h4
                    className={`text-2xl mt-2 sm:text-3xl font-bold ${Styles.productprice}`}
                  >
                    ₹ {quantityState.price} /-
                    <span className="ml-2" style={{ fontSize: "20px" }}>
                      <s>₹ {productDetails.price2A} /-</s>
                    </span>
                    <span className="ml-2" style={{ fontSize: "20px" }}>
                      {productDetails.freq}
                    </span>
                    <span className="ml-2" style={{ fontSize: "15px" }}>
                      (Excl. GST)
                    </span>
                  </h4>
                  <h3 className="text-green-500 font-semibold mt-4">
                    GST: {productDetails.taxpercent3} %
                  </h3>
                  {productDetails?.partprice4A ? (
                    <h3 className="font-semibold  bg-[#F5F5F5] text-[#102C44] px-2 py-1 rounded inline-block mt-4">
                      ₹ {productDetails.partprice4A} {productDetails.sell4B}
                    </h3>
                  ) : (
                    ""
                  )}
                  {props.mainproduct.variations?.length > 0 && (
                    <>
                      <h3 className="text-black font-semibold mt-4">
                        Variants:(
                        {`${
                          props.mainproduct.vari1 ? props.mainproduct.vari1 : ""
                        }${
                          props.mainproduct.vari2
                            ? " | " + props.mainproduct.vari2
                            : ""
                        }${
                          props.mainproduct.vari3
                            ? " | " + props.mainproduct.vari3
                            : ""
                        }${
                          props.mainproduct.vari4
                            ? " | " + props.mainproduct.vari4
                            : ""
                        }`}
                        )
                      </h3>
                      <div className="flex space-x-3 space-y-3 flex-wrap">
                        {props.mainproduct.variations.map((item, index) => (
                          <>
                            <div
                              className={
                                item._id === productDetails._id
                                  ? "border-slate-950 border-2 rounded cursor-pointer p-2 flex items-center flex-wrap ml-3 mt-3"
                                  : "border rounded cursor-pointer p-2 flex items-center flex-wrap ml-3 mt-3"
                              }
                              onClick={() => changetheproduct(item, index)}
                              key={item._id}
                            >
                              <div className="h-[46px] w-[46px]">
                                <img
                                  src={item.imgs1}
                                  className="w-full h-full rounded"
                                  alt=""
                                />
                              </div>
                              <div>
                                <h3 className="pl-4">{`${
                                  item.vari11 ? item.vari11 : ""
                                }${item.vari12 ? " | " + item.vari12 : ""}${
                                  item.vari13 ? " | " + item.vari13 : ""
                                }${
                                  item.vari14 ? " | " + item.vari14 : ""
                                }`}</h3>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  )}

                  {productDetails.minimum1 && (
                    <div
                      className={`${Styles.cart_card_content} ml-1 flex items-center mt-2 w-full`}
                    >
                      <label htmlFor="">Quantity</label>
                      <div
                        className={`flex ${Styles.edit_cart_quantity} rounded ml-2`}
                      >
                        <button
                          className={`px-2 text-2xl hover:bg-slate-100`}
                          onClick={decrementquantityhandler}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className={`w-10 text-center`}
                          value={userinput}
                          onBlur={() => setthequantity()}
                          onChange={(e) => {
                            setUserInput(e.target.value);
                          }}
                        />
                        <button
                          className={`px-2 text-2xl hover:bg-slate-100`}
                          onClick={incrementquantityhandler}
                        >
                          +
                        </button>
                      </div>
                      <p className="ml-3 text-sm">
                        Minimum Order Qty: {productDetails.minord11A}
                      </p>
                    </div>
                  )}

                  {productDetails.minimum1 && (
                    <div className={`${Styles.tablediv}`}>
                      <table>
                        <tbody>
                          <tr>
                            <th>Select</th>
                            <th>Quantity</th>
                            <th>Discounted price</th>
                            <th>Shipping</th>
                          </tr>
                          {productDetails.minimum1 ? (
                            <tr
                              className={
                                quantityState.quantity >=
                                  JSON.parse(productDetails.minimum1) &&
                                quantityState.quantity <=
                                  JSON.parse(productDetails.maximum1)
                                  ? "border-b border-t"
                                  : ""
                              }
                            >
                              <td>
                                <input
                                  type="radio"
                                  name="radio1"
                                  className={`${Styles.radio_btn}`}
                                  checked={
                                    quantityState.quantity >=
                                      JSON.parse(productDetails.minimum1) &&
                                    quantityState.quantity <=
                                      JSON.parse(productDetails.maximum1)
                                  }
                                  onChange={(e) =>
                                    radiochangehandler(
                                      productDetails.minimum1,
                                      productDetails.price1
                                    )
                                  }
                                />
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum1) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum1)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.minimum1} -{" "}
                                {productDetails.maximum1}
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum1) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum1)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.price1}
                              </td>
                              <td>
                                {productDetails.free1 ? "free" : "applied"}
                              </td>
                            </tr>
                          ) : null}
                          {productDetails.minimum2 ? (
                            <tr
                              className={
                                quantityState.quantity >=
                                  JSON.parse(productDetails.minimum2) &&
                                quantityState.quantity <=
                                  JSON.parse(productDetails.maximum2)
                                  ? "border-b border-t"
                                  : ""
                              }
                            >
                              <td>
                                <input
                                  type="radio"
                                  name="radio1"
                                  className={`${Styles.radio_btn}`}
                                  checked={
                                    quantityState.quantity >=
                                      JSON.parse(productDetails.minimum2) &&
                                    quantityState.quantity <=
                                      JSON.parse(productDetails.maximum2)
                                  }
                                  onChange={(e) =>
                                    radiochangehandler(
                                      productDetails.minimum2,
                                      productDetails.price2
                                    )
                                  }
                                />
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum2) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum2)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.minimum2} -{" "}
                                {productDetails.maximum2}
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum2) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum2)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.price2}
                              </td>
                              <td>
                                {productDetails.free2 ? "free" : "applied"}
                              </td>
                            </tr>
                          ) : null}

                          {productDetails.minimum3 ? (
                            <tr
                              className={
                                quantityState.quantity >=
                                  JSON.parse(productDetails.minimum3) &&
                                quantityState.quantity <=
                                  JSON.parse(productDetails.maximum3)
                                  ? "border-b border-t"
                                  : ""
                              }
                            >
                              <td>
                                <input
                                  type="radio"
                                  name="radio1"
                                  className={`${Styles.radio_btn}`}
                                  checked={
                                    quantityState.quantity >=
                                      JSON.parse(productDetails.minimum3) &&
                                    quantityState.quantity <=
                                      JSON.parse(productDetails.maximum3)
                                  }
                                  onChange={(e) =>
                                    radiochangehandler(
                                      productDetails.minimum3,
                                      productDetails.price3
                                    )
                                  }
                                />
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum3) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum3)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.minimum3} -{" "}
                                {productDetails.maximum3}
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum3) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum3)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.price3}
                              </td>
                              <td>
                                {productDetails.free3 ? "free" : "applied"}
                              </td>
                            </tr>
                          ) : null}
                          {productDetails.minimum4 ? (
                            <tr
                              className={
                                quantityState.quantity >=
                                  JSON.parse(productDetails.minimum4) &&
                                quantityState.quantity <=
                                  JSON.parse(productDetails.maximum4)
                                  ? "border-b border-t"
                                  : ""
                              }
                            >
                              <td>
                                <input
                                  type="radio"
                                  name="radio1"
                                  className={`${Styles.radio_btn}`}
                                  checked={
                                    quantityState.quantity >=
                                      JSON.parse(productDetails.minimum4) &&
                                    quantityState.quantity <=
                                      JSON.parse(productDetails.maximum4)
                                  }
                                  onChange={(e) =>
                                    radiochangehandler(
                                      productDetails.minimum4,
                                      productDetails.price4
                                    )
                                  }
                                />
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum4) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum4)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.minimum4} -{" "}
                                {productDetails.maximum4}
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum4) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum4)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.price4}
                              </td>
                              <td>
                                {productDetails.free4 ? "free" : "applied"}
                              </td>
                            </tr>
                          ) : null}

                          {productDetails.minimum5 ? (
                            <tr
                              className={
                                quantityState.quantity >=
                                  JSON.parse(productDetails.minimum5) &&
                                quantityState.quantity <=
                                  JSON.parse(productDetails.maximum5)
                                  ? "border-b border-t"
                                  : ""
                              }
                            >
                              <td>
                                <input
                                  type="radio"
                                  name="radio1"
                                  className={`${Styles.radio_btn}`}
                                  checked={
                                    quantityState.quantity >=
                                      JSON.parse(productDetails.minimum5) &&
                                    quantityState.quantity <=
                                      JSON.parse(productDetails.maximum5)
                                  }
                                  onChange={(e) =>
                                    radiochangehandler(
                                      productDetails.minimum5,
                                      productDetails.price5
                                    )
                                  }
                                />
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum5) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum5)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.minimum5} -{" "}
                                {productDetails.maximum5}
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum5) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum5)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.price5}
                              </td>
                              <td>
                                {productDetails.free5 ? "free" : "applied"}
                              </td>
                            </tr>
                          ) : null}

                          {productDetails.minimum6 ? (
                            <tr
                              className={
                                quantityState.quantity >=
                                  JSON.parse(productDetails.minimum6) &&
                                quantityState.quantity <=
                                  JSON.parse(productDetails.maximum6)
                                  ? "border-b border-t"
                                  : ""
                              }
                            >
                              <td>
                                <input
                                  type="radio"
                                  name="radio1"
                                  className={`${Styles.radio_btn}`}
                                  checked={
                                    quantityState.quantity >=
                                      JSON.parse(productDetails.minimum6) &&
                                    quantityState.quantity <=
                                      JSON.parse(productDetails.maximum6)
                                  }
                                  onChange={(e) =>
                                    radiochangehandler(
                                      productDetails.minimum6,
                                      productDetails.price6
                                    )
                                  }
                                />
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum6) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum6)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.minimum6} -{" "}
                                {productDetails.maximum6}
                              </td>
                              <td
                                className={
                                  quantityState.quantity >=
                                    JSON.parse(productDetails.minimum6) &&
                                  quantityState.quantity <=
                                    JSON.parse(productDetails.maximum6)
                                    ? `font-bold ${Styles.radio_row_text}`
                                    : ""
                                }
                              >
                                {productDetails.price6}
                              </td>
                              <td>
                                {productDetails.free6 ? "free" : "applied"}
                              </td>
                            </tr>
                          ) : null}
                        </tbody>
                      </table>
                      <br />
                      <p>
                        <strong>
                          For bulk quantity order, contact Materialbuy Team
                        </strong>
                      </p>
                    </div>
                  )}

                  <div className={`w-full ${Styles.mobile_quantity}`}>
                    <div
                      className={`w-full flex justify-between ${
                        isMobileBulkOrderOpen ? "rounded-t" : "rounded"
                      } items-center px-2 py-2 bg-gray-200`}
                      onClick={() =>
                        setIsMobileBulkOrderOpen(!isMobileBulkOrderOpen)
                      }
                    >
                      <h1 className="font-semibold">Order Bulk Quantity</h1>
                      <BsChevronDown
                        className={`${
                          isMobileBulkOrderOpen ? "rotate-180 transform" : ""
                        } h-5 w-5 text-purple-500`}
                      />
                    </div>
                    <div
                      className={`${
                        Styles.mobile_quantity_cards
                      } overflow-x-auto ${
                        isMobileBulkOrderOpen ? "flex" : "hidden"
                      } p-2 border rounded-b`}
                    >
                      {productDetails.minimum1 ? (
                        <div
                          // className={`${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`}
                          className={
                            quantityState.quantity >=
                              JSON.parse(productDetails.minimum1) &&
                            quantityState.quantity <=
                              JSON.parse(productDetails.maximum1)
                              ? `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit bg-gray-100`
                              : `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`
                          }
                          onClick={() =>
                            radiochangehandler(
                              productDetails.minimum1,
                              productDetails.price1
                            )
                          }
                        >
                          <input
                            type="radio"
                            name="radio2"
                            className={`${Styles.radio_btn}`}
                            checked={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum1) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum1)
                            }
                            onChange={(e) =>
                              radiochangehandler(
                                productDetails.minimum1,
                                productDetails.price1
                              )
                            }
                          />
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum1) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum1)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            {productDetails.minimum1}-{productDetails.maximum1}
                          </h1>
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum1) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum1)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            ₹{productDetails.price1}/-
                          </h1>
                          {/* <h1
                              className={
                                quantityState.quantity >=
                                  JSON.parse(productDetails.minimum1) &&
                                quantityState.quantity <=
                                  JSON.parse(productDetails.maximum1)
                                  ? `font-bold w-20 text-center`
                                  : "w-20 text-center"
                              }
                            >
                              {productDetails.free1 ? "free" : "applied"}
                            </h1> */}
                        </div>
                      ) : null}
                      {productDetails.minimum2 ? (
                        <div
                          // className={`${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`}
                          className={
                            quantityState.quantity >=
                              JSON.parse(productDetails.minimum2) &&
                            quantityState.quantity <=
                              JSON.parse(productDetails.maximum2)
                              ? `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit bg-gray-100`
                              : `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`
                          }
                          onClick={() =>
                            radiochangehandler(
                              productDetails.minimum2,
                              productDetails.price2
                            )
                          }
                        >
                          <input
                            type="radio"
                            name="radio2"
                            className={`${Styles.radio_btn}`}
                            checked={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum2) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum2)
                            }
                            onChange={(e) =>
                              radiochangehandler(
                                productDetails.minimum2,
                                productDetails.price2
                              )
                            }
                          />
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum2) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum2)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            {productDetails.minimum2}-{productDetails.maximum2}
                          </h1>
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum2) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum2)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            ₹{productDetails.price2}/-
                          </h1>
                        </div>
                      ) : null}
                      {productDetails.minimum3 ? (
                        <div
                          // className={`${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`}
                          className={
                            quantityState.quantity >=
                              JSON.parse(productDetails.minimum3) &&
                            quantityState.quantity <=
                              JSON.parse(productDetails.maximum3)
                              ? `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit bg-gray-100`
                              : `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`
                          }
                          onClick={() =>
                            radiochangehandler(
                              productDetails.minimum3,
                              productDetails.price3
                            )
                          }
                        >
                          <input
                            type="radio"
                            name="radio2"
                            className={`${Styles.radio_btn}`}
                            checked={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum3) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum3)
                            }
                            onChange={(e) =>
                              radiochangehandler(
                                productDetails.minimum3,
                                productDetails.price3
                              )
                            }
                          />
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum3) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum3)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            {productDetails.minimum3}-{productDetails.maximum3}
                          </h1>
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum3) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum3)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            ₹{productDetails.price3}/-
                          </h1>
                        </div>
                      ) : null}
                      {productDetails.minimum4 ? (
                        <div
                          // className={`${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`}
                          className={
                            quantityState.quantity >=
                              JSON.parse(productDetails.minimum4) &&
                            quantityState.quantity <=
                              JSON.parse(productDetails.maximum4)
                              ? `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit bg-gray-100`
                              : `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`
                          }
                          onClick={() =>
                            radiochangehandler(
                              productDetails.minimum4,
                              productDetails.price4
                            )
                          }
                        >
                          <input
                            type="radio"
                            name="radio2"
                            className={`${Styles.radio_btn}`}
                            checked={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum4) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum4)
                            }
                            onChange={(e) =>
                              radiochangehandler(
                                productDetails.minimum4,
                                productDetails.price4
                              )
                            }
                          />
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum4) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum4)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            {productDetails.minimum4}-{productDetails.maximum4}
                          </h1>
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum4) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum4)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            ₹{productDetails.price4}/-
                          </h1>
                        </div>
                      ) : null}
                      {productDetails.minimum5 ? (
                        <div
                          // className={`${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`}
                          className={
                            quantityState.quantity >=
                              JSON.parse(productDetails.minimum5) &&
                            quantityState.quantity <=
                              JSON.parse(productDetails.maximum5)
                              ? `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit bg-gray-100`
                              : `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`
                          }
                          onClick={() =>
                            radiochangehandler(
                              productDetails.minimum5,
                              productDetails.price5
                            )
                          }
                        >
                          <input
                            type="radio"
                            name="radio2"
                            className={`${Styles.radio_btn}`}
                            checked={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum5) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum5)
                            }
                            onChange={(e) =>
                              radiochangehandler(
                                productDetails.minimum5,
                                productDetails.price5
                              )
                            }
                          />
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum5) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum5)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            {productDetails.minimum5}-{productDetails.maximum5}
                          </h1>
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum5) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum5)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            ₹{productDetails.price5}/-
                          </h1>
                        </div>
                      ) : null}
                      {productDetails.minimum6 ? (
                        <div
                          // className={`${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`}
                          className={
                            quantityState.quantity >=
                              JSON.parse(productDetails.minimum6) &&
                            quantityState.quantity <=
                              JSON.parse(productDetails.maximum6)
                              ? `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit bg-gray-100`
                              : `${Styles.mobile_quantity_card} flex m-2 flex-col items-center justify-center p-2 shadow rounded w-fit`
                          }
                          onClick={() =>
                            radiochangehandler(
                              productDetails.minimum6,
                              productDetails.price6
                            )
                          }
                        >
                          <input
                            type="radio"
                            name="radio2"
                            className={`${Styles.radio_btn}`}
                            checked={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum6) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum6)
                            }
                            onChange={(e) =>
                              radiochangehandler(
                                productDetails.minimum6,
                                productDetails.price6
                              )
                            }
                          />
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum6) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum6)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            {productDetails.minimum6}-{productDetails.maximum6}
                          </h1>
                          <h1
                            className={
                              quantityState.quantity >=
                                JSON.parse(productDetails.minimum6) &&
                              quantityState.quantity <=
                                JSON.parse(productDetails.maximum6)
                                ? `font-bold w-20 text-center`
                                : "w-20 text-center"
                            }
                          >
                            ₹{productDetails.price6}/-
                          </h1>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {productDetails.loading && (
                    <div>
                      <p>
                        *Unloading Charges will be in customer's scope, refer
                        &nbsp;
                        <Link
                          to="/shipping-policy"
                          className="font-bold text-red-500"
                        >
                          shipping policy{" "}
                        </Link>{" "}
                        for more details.
                      </p>
                    </div>
                  )}

                  <div className={`${Styles.contactDiv} flex items-center`}>
                    {/* {buttonValue} */}
                    {productDetails.quote ? (
                      // If quote is true, show the 'Get A Quote' button and hide 'Add to Cart' button
                      <Button
                        className="bg-gray-600"
                        value="Get A Quote"
                        onClick={() => {
                          window.location.href = "/getaquote"; // Navigate to the page
                          window.scrollTo(0, 0); // Scroll to the top of the page
                        }}
                      />
                    ) : (
                      // If quote is false, show the 'Add to Cart' button and hide 'Get A Quote' button
                      <Button
                        className={`bg-gray-600 ${Styles.addtocardbtn}`}
                        value={buttonValue ? "Remove from cart" : "Add to cart"}
                        onClick={addtocardhandler}
                      />
                    )}
                    {/* <HiMiniHeart className={Styles.heart} /> */}
                    {wishlist ? (
                      <BsSuitHeartFill
                        className={`${Styles.heart} mr-2`}
                        onClick={deletefromWishlist}
                      />
                    ) : (
                      <BsSuitHeart
                        className={`${Styles.heart} mr-2`}
                        onClick={AddproducttoWishlist}
                      />
                    )}
                  </div>
                  <br />

                  <div className={`flex flex-col`}>
                    <p>Check Serviceability at your Pincode:</p>
                    {/* <br /> */}
                    <div className={`w-full flex items-center`}>
                      <input
                        type="text"
                        value={pinCodeState}
                        onChange={({ target }) => setPinCodeState(target.value)}
                        className={`${Styles.promo_code_input} border border-gray-300 w-[70%] md:w-[40%] p-2 rounded`}
                        placeholder="ENTER PINCODE"
                      />
                      <button
                        onClick={checkpincode}
                        className={`${Styles.apply_button} border border-gray-300 w-[30%] md:w-[20%] rounded p-2`}
                        style={{ backgroundColor: "#102C44", color: "#ffffff" }}
                      >
                        Check
                      </button>
                    </div>

                    {/* Display result message near the check button with dynamic color */}
                    {resultMessage && (
                      <p style={{ color: resultColor }}>{resultMessage}</p>
                    )}
                  </div>
                  {offers?.length > 0 ? (
                    <div
                      className={`mt-4 ${Styles.mobile_offers_card} flex flex-col`}
                    >
                      <p className={`font-semibold text-lg`}>
                        Available offers:
                      </p>
                      <div
                        className={`${Styles.offers_card}  flex items-center rounded px-3`}
                      >
                        <p className={`text-white mr-4 text-center`}>
                          {offers && offers[0].message}
                        </p>
                        <span
                          className={`${Styles.offers_card_centerline}`}
                        ></span>
                        <div className={`ml-4 flex flex-col items-center `}>
                          <p
                            className={`text-white text-center ${Styles.offers_usecode}`}
                          >
                            {offers && offers[0].codename}
                          </p>
                          <p
                            className={` text-center font-bold text-yellow-500`}
                          >
                            NEW 150
                          </p>
                        </div>
                      </div>
                      <p
                        className="underline cursor-pointer"
                        onClick={showOffersPopups}
                      >
                        View all offers
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="flex mt-4">
                    <Link
                      to="/getaquote"
                      className="flex items-center underline"
                      aria-label="Generate a Quote"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <HiDocumentText className={`${Styles.iconss}`} /> Generate
                      Quote
                    </Link>
                    <a
                      href="tel:+918840203007"
                      className="flex items-center ml-3 underline"
                      aria-label="Call to Order"
                    >
                      <HiMiniPhone className={`${Styles.iconss}`} /> Call To
                      Order
                    </a>
                  </div>

                  <div
                    className={`product_service_assurance ${Styles.mobile_assurance} flex items-center justify-between w-full mt-3 md:mt-4`}
                  >
                    <div className="product_service_assurance_card flex items-center flex-col md:flex-row">
                      <div>
                        <GiAlliedStar className={`text-3xl ${Styles.iconss}`} />
                      </div>
                      <div className="ml-0 md:ml-2">
                        <h2 className="text-sm md:text-md font-semibold text-center md:text-left">
                          100% ORIGINAL
                        </h2>
                        <p className="text-sm text-center md:text-left">
                          products
                        </p>
                      </div>
                    </div>
                    <div className="product_service_assurance_card flex items-center flex-col md:flex-row">
                      <div>
                        <RiSecurePaymentLine
                          className={`text-3xl ${Styles.iconss}`}
                        />
                      </div>
                      <div className="ml-0 md:ml-2">
                        <h2 className="text-sm md:text-md font-semibold text-center md:text-left">
                          SECURE
                        </h2>
                        <p className="text-sm text-center md:text-left">
                          payment
                        </p>
                      </div>
                    </div>
                    <div className="product_service_assurance_card flex items-center flex-col md:flex-row">
                      <div>
                        <BsShieldLockFill
                          className={`text-2xl ${Styles.iconss}`}
                        />
                      </div>
                      <div className="ml-0 md:ml-2">
                        <h2 className="text-sm md:text-md font-semibold text-center md:text-left">
                          100% BUYER
                        </h2>
                        <p className="text-sm text-center md:text-left">
                          protections
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-2">
                <div className={Styles.description}>
                  <div className={`${Styles.divDescription}`}>
                    <h2
                      onClick={togglehandler}
                      className={
                        toggle === "Description"
                          ? "bg-white font-semibold px-2 py-2 border-r border-l border-t border-t-gray-400 border-r-gray-400 border-l-gray-400"
                          : "bg-gray-200 px-2 py-2 border-r border-l border-t border-t-gray-400 border-r-gray-400 border-l-gray-400"
                      }
                    >
                      Description
                    </h2>
                    <h2
                      onClick={togglehandler1}
                      className={
                        toggle === "Specification"
                          ? "bg-white font-semibold px-2 py-2 border-r border-r-gray-400 border-t border-t-gray-400"
                          : "bg-gray-200 px-2 py-2 border-r border-r-gray-400 border-t border-t-gray-400"
                      }
                    >
                      Specification
                    </h2>
                    {productDetails.cal ? (
                      <h2
                        onClick={togglehandler2}
                        className={
                          toggle === "Calculator"
                            ? "bg-white font-semibold px-2 py-2 border-r border-r-gray-400 border-t border-t-gray-400"
                            : "bg-gray-200 px-2 py-2 border-r border-r-gray-400 border-t border-t-gray-400"
                        }
                      >
                        Calculator
                      </h2>
                    ) : (
                      ""
                    )}
                  </div>

                  {toggle === "Description" ? (
                    <div
                      className={`${Styles.specifaction} md:flex spaxe-x-2 `}
                    >
                      <div
                        className={`text-xl break-words ${Styles.descriptiondiv}`}
                        dangerouslySetInnerHTML={{
                          __html: productDetails.description12,
                        }}
                      />
                    </div>
                  ) : toggle === "Specification" ? (
                    <>
                      <div className={`${Styles.specifaction}`}>
                        <div
                          className={`text-xl break-words overflow-x-auto ${Styles.descriptiondiv}`}
                          dangerouslySetInnerHTML={{
                            __html: productDetails.description123,
                          }}
                        />
                        {productDetails.file1 ? (
                          <div className="flex w-full items-start md:items-center flex-col md:flex-row gap-x-2 ">
                            {productDetails.file1 ? (
                              <a
                                href={`${productDetails.file1}`}
                                className="f-inherit fw-inherit link theme-primary  pb3 f7 db underline-hover flex items-center justify-center space-x-2 mt-3"
                                // rel="noreferrer"
                                target="_blank"
                              >
                                <GrDocumentPdf className="text-3xl" />
                                <span class="pl3 v-mid f5">
                                  ProductManual 1
                                </span>
                              </a>
                            ) : (
                              ""
                            )}
                            {productDetails.file2 ? (
                              <a
                                href={`${productDetails.file2}`}
                                className="f-inherit fw-inherit link theme-primary  pb3 f7 db underline-hover flex items-center justify-center space-x-2 mt-3"
                                // rel="noreferrer"
                                target="_blank"
                              >
                                <GrDocumentPdf className="text-3xl" />
                                <span class="pl3 v-mid f5">
                                  ProductManual 2
                                </span>
                              </a>
                            ) : (
                              ""
                            )}
                            {productDetails.file3 ? (
                              <a
                                href={`${productDetails.file3}`}
                                className="f-inherit fw-inherit link theme-primary  pb3 f7 db underline-hover flex items-center justify-center space-x-2 mt-3"
                                // rel="noreferrer"
                                target="_blank"
                              >
                                <GrDocumentPdf className="text-3xl" />
                                <span class="pl3 v-mid f5">
                                  ProductManual 3
                                </span>
                              </a>
                            ) : (
                              ""
                            )}
                            {productDetails.file4 ? (
                              <a
                                href={`${productDetails.file4}`}
                                className="f-inherit fw-inherit link theme-primary  pb3 f7 db underline-hover flex items-center justify-center space-x-2 mt-3"
                                // rel="noreferrer"
                                target="_blank"
                              >
                                <GrDocumentPdf className="text-3xl" />
                                <span class="pl3 v-mid f5">
                                  ProductManual 4
                                </span>
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  ) : toggle === "Calculator" ? (
                    <>
                      <div
                        className={`${Styles.specifaction} md:flex spaxe-x-2 `}
                      >
                        {" "}
                        <div
                          className={`${Styles.calculator} p-4 flex flex-col space-y-3`}
                        >
                          {/* Render calculator content here */}
                          <p>
                            1 unit of above product will cover{" "}
                            {productDetails.calculator}{" "}
                            {productDetails.calculatorunit}.{" "}
                          </p>
                          <div>
                            <label htmlFor="">Enter Your Requirement:</label>
                            <div className="flex items-center rounded">
                              <input
                                type="number"
                                className="border h-[50px] rounded-lg px-2"
                                value={userQuantValue}
                                onChange={(e) =>
                                  setUserQuantValue(e.target.value)
                                }
                                placeholder={`enter value in ${productDetails.calculatorunit}`}
                              />
                              {/* <p>{productDetails.calculatorunit}</p> */}
                              <Button
                                value="Calculate"
                                className={Styles.calsubmt}
                                onClick={() => calculateHanlder(userQuantValue)}
                              />
                            </div>
                            {result && (
                              <>
                                <p className="font-bold">
                                  You will require approx. {result} quantity(s)
                                  of above product
                                </p>
                                <p className=" text-red-500">
                                  * 10% wastage is included in above calculation
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>

                <div className={Styles.description}>
                  hellos
                  {freqB && (
                    <MultiCarousels
                      multiCarouselData={freqB}
                      titleof="Frequently Bought Together"
                      datatype="Frequently"
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                role="status"
                className="flex h-full items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
                <h1>Loading...</h1>
              </div>
            </>
          )}
        </Container>
      </Fullcontainer>
    </div>
  );
};

export default ProductDetails;
