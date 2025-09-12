'use client'
import React, { useEffect, useState, useReducer, useRef , useMemo} from "react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaWhatsapp,
  FaCopy,
} from "react-icons/fa6";
import Styles from "./ProductDetails.module.css";
// import Fullcontainer from "../../components/UI/Fullcontainer";
// import Container from "../../components/UI/Container";
import Button from "@/components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { editItemToCart, updateprice } from "@/store/Slices/cartSlice";
import {
  BsSuitHeart,
  BsShieldLockFill,
  BsChevronDown,
  BsSuitHeartFill,
} from "react-icons/bs";
import { HiDocumentText, HiMiniPhone } from "react-icons/hi2";
import { GiAlliedStar } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import Link from "next/link";
import OffersPopup from "@/components/UI/OffersPopup";
import {
  getPromoCodes,
  addWishlist,
  getWishlist,
  deleteWishList,
  getBuyerdata,
  freqdataswithID,
  getSlugName,
  getSeo,
  getProduct,
  getVariant,
  productDetailsWithID,
  postOrderPayment,
  getCssDeals,
  paymentStatus,
} from "@/apis/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GrDocumentPdf } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import MultiCarousels from "@/components/carousel/MultiCarousel";

import { nanoid } from 'nanoid';

import Head from "next/head";
import {
  FaFileInvoiceDollar,
  FaShare,
  FaShippingFast,
  FaTruck,
} from "react-icons/fa";
import Image from "next/image";

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
    
    // Allow empty string during input
    if (action.value === '') {
      return { ...state, quantity: '' };
    }
    
    // Convert to number and validate
    const inputValue = Number(action.value);
    const minimum = Number(state.minimum) || 0;
    const maximum = Number(state.maximum) || 0;
    
    if (isNaN(inputValue)) {
      result = minimum; // Default to minimum for invalid input
    } else if (inputValue < minimum) {
      result = minimum;
    } else if (inputValue > maximum) {
      result = maximum;
    } else {
      result = inputValue;
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
  const [offers, setOffers] = useState([]);
  const [wishlist, setWishlist] = useState(false);
  const [wishlistData, setWishListData] = useState(null);
  // const [pinCodeState, setPinCodeState] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  // const [variantactive, setVariantActive] = useState(0);
  const [userQuantValue, setUserQuantValue] = useState(null);
  const [isMobileBulkOrderOpen, setIsMobileBulkOrderOpen] = useState(false);
  const [freqB, setFreqB] = useState(null);
  const [result, setResult] = useState(null);
  // const productId = useParams();
  const navigation = useRouter();
  const [showBulkOrderModal, setShowBulkOrderModal] = useState(false);
  const [productSeo, setProductSeo] = useState(null);
  const [finalquantity , setFInalQuantity] = useState(null);

  const [quantityState, dispatchQuantity] = useReducer(quantityReducer, {
    quantity: 0,
    price: 0,
    minimum: 0,
    maximum: 0,
  });

  //NEW

  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const[vendorPriceAtPincode ,setVendorPriceAtPincode]= useState(0);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [sampleFormData, setSampleFormData] = useState({
    quantity: 1,
    notes: '',
    address: '',
    phone: '',
    fullname: '',
    sampleBasePrice: 99,
    gstPercentage: 18,
    gstAmount: 0,
    totalPrice: 0,
  });

  const showDialog = () => setOpenDialog(true);
  const closeDialog = () => setOpenDialog(false);

  // const [pinCodeState, setPinCodeState] = useState("");

  //   try {
  //     const response = await getBuyerdata(pinCodeState); // Send pincode to backend

  //     if (response?.valid) {
  //       setPincodeChecked(true);
  //       setDeliveryDate(response.estimatedDelivery || "Unavailable");
  //       toast.success("Shipping is available");

  //       // Fetch updated prices based on the pincode
  //       const updatedPrices = await fetchUpdatedPrices(pinCodeState);
  //       dispatchQuantity({ type: "PRICE", price: updatedPrices });
  //     } else {
  //       setResultMessage("We don't deliver to this pincode, contact Materialbuy Team");
  //       setPincodeChecked(false);
  //       toast.error("Sorry, we don't deliver to this address");
  //     }
  //   } catch (error) {
  //     console.error("Error checking pincode:", error);
  //   }
  // };

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
    } else if (key === 5) {
      // Extract video ID from YouTube URL (handles both formats)
      let videoId;
      const url = productDetails.youtube_url || "";
      
      if (url.includes("youtu.be/")) {
        // Short format: https://youtu.be/VIDEO_ID
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com")) {
        // Standard format: https://youtube.com/watch?v=VIDEO_ID
        videoId = url.split("v=")[1]?.split("&")[0];
      }
      
      if (videoId) {
        const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      setImages(videoEmbedUrl);
      setActiveImage(5);
      }
    }
  };



const notifyPincodeCheck = () => {
  toast.warning("⚠️ Please check Pincode to move forward!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
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
    // Set loading to true when check starts
    setIsPincodeLoading(true);
    
    // Simulate a minimum loading time of 2 seconds
    const startTime = Date.now();
    
    const pincode = pinCodeState || expcheckpincode || "421302";
    const response = await getBuyerdata();
    const dataArray = response;
    const variantId = productDetails?._id;
    const productId ="";

    const isPincodeFound = dataArray.some((dict) => dict.pin === pincode);

    if (!pincode) {
      setResultMessage("Enter pincode first");
    } else if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setResultMessage("Invalid pincode");
    } else {
      const isPincodeInExcpins = productDetails?.excpins.includes(pincode);
      
      if (isPincodeInExcpins) {
        if (pincode == expcheckpincode) {
          toast.error("Sorry The Services are still not Available in your Area ");
          setPincodeChecked(false)
        }
        setResultMessage(
          "We don't deliver to this pincode, Contact Materialbuy Team"
        );
        if (pincode == pinCodeState) {
          toast.error("Sorry we don't deliver to this address");
          setPincodeChecked(false)
        }
      } else {
        if (isPincodeFound) {
          setResultMessage("Shipping is available");
          toast.success("Shipping is available");

          sendPincodeDetails(
            pincode,
            productId,
            variantId,
            userinput
          );
        } else {
          setResultMessage(
            "We don't deliver to this pincode, Contact Materialbuy Team"
          );
          sendPincodeDetails(
            pincode,
            productId,
            variantId,
            userinput
          );
          setPincodeChecked(false)
          if (pincode == expcheckpincode) {
            toast.error("Sorry The Services are still not Available in your Area ");
          }
          if (pincode == pinCodeState) {
            toast.error("Sorry we don't deliver to this address");
          }
        }
      }
    }
    
    // Ensure loader shows for at least 3 seconds
    const elapsedTime = Date.now() - startTime;
    const minimumLoadingTime = 3000; // 3 seconds
    
    if (elapsedTime < minimumLoadingTime) {
      await new Promise(resolve => setTimeout(resolve, minimumLoadingTime - elapsedTime));
    }
    
    // Set loading to false after processing
    setIsPincodeLoading(false);
   };
 

  // New function to send pincode and product ID to the API
  const sendPincodeDetails = async (
    pincode,
    productid,
    variantid,
    quantity
  ) => {
    try {
      const payload = {
        pincode,
        productid,
        variantid,
        quantity,
      };
      const response = await fetch(
        "https://logistic.mbuybackend.in/api/shipping",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log(payload, "payload");
      const data = await response.json();
      console.log("API Response: logistic", data);
      processLogisticResponse(data);
    } catch (error) {
      console.error("Error sending pincode details:", error);
    }
  };

  const processLogisticResponse = (logisticData) => {
    if (!logisticData?.pricesresult || logisticData.pricesresult.length === 0 || !logisticData?.shipCost) {
      console.error("Missing price or shipping data in logistic response.");
      return;
    }

    // Calculate total cost (price + shipping) for each option
    let lowestTotalCost = Infinity;
    let lowestPriceIndex = -1;
    let selectedVendorWarehouse = null;

    // Process each price with its corresponding shipping cost
    logisticData.pricesresult.forEach((price, index) => {
      // Convert price and shipping cost to numbers
      const productPrice = Number(logisticData.pricesresult[index]) || 0;
      const shippingCost = Number(logisticData.shipCost[index]) || 0;
      const totalCost = productPrice + shippingCost;

      console.log(`Option ${index}: Product: ${productPrice}, Shipping: ${shippingCost}, Total: ${totalCost}`);
      
      // If this option has a lower total cost, select it
      if (totalCost < lowestTotalCost) {
        lowestTotalCost = totalCost;
        lowestPriceIndex = index;
        selectedVendorWarehouse = logisticData.vendorWareHouse && logisticData.vendorWareHouse[index];
      }
    });

    // Set the product price from the selected option
    const selectedPrice = Number(logisticData.pricesresult[lowestPriceIndex]) || 0;
    setVendorPriceAtPincode(selectedPrice);

    console.log(`Selected option ${lowestPriceIndex} with product price ${selectedPrice} and total cost ${lowestTotalCost}`);
    console.log(`Selected vendor/warehouse:`, selectedVendorWarehouse);
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
      if (props.productData?.vari?.length > 0)  {
        const freqdataPromises = props.productData?.vari?.map(async (id) => {
          if (!id) return; 
          
          try {
            let response = await productDetailsWithID(id);
            console.log("Response data:", response?.data);

            if (response?.status === 200 && response?.data) {
              const dataArray = Array.isArray(response?.data) ? response.data : [response.data];
              setFreqB(prevFreqB => {
                const existingIds = new Set(prevFreqB?.map(item => item?._id) || []);
                const uniqueNewData = dataArray.filter(item => 
                  item?._id && 
                  !existingIds.has(item._id) && 
                  item._id !== props.productData?._id
                );
                return prevFreqB ? [...prevFreqB, ...uniqueNewData] : uniqueNewData;
              });
            } else {
              response = await getVariant(id);
              if (response?.status === 200 && response?.data) {
                // Ensure we're dealing with an array
                const dataArray = Array.isArray(response?.data) ? response.data : [response.data];
                setFreqB(prevFreqB => {
                  // Create a Set of existing IDs for quick lookup
                  const existingIds = new Set(prevFreqB?.map(item => item?._id) || []);
                  // Filter out duplicates from new data and current product
                  const uniqueNewData = dataArray.filter(item => 
                    item?._id && 
                    !existingIds.has(item._id) && 
                    item._id !== props.productData?._id
                  );
                  
                  return prevFreqB ? [...prevFreqB, ...uniqueNewData] : uniqueNewData;
                });
              }
            }
          } catch (error) {
            console.error("Error fetching product details for ID:", item, error);
          }
        });

        // Wait for all promises to resolve
        Promise.all(freqdataPromises || []).catch(error => {
          console.error("Error in Promise.all:", error);
        });
     }
   };
   getProductDetails();

    const getPromoCodesData = async () => {
      try {
        const response = await getPromoCodes();
        console.log(response, "promocodes");

        if (response.status === 200 && Array.isArray(response.data)) {
          const validOffers = response.data.filter(
            (offer) =>
              new Date() < new Date(offer.ended) && Number(offer.noofusers) > 0
          );

          setOffers(validOffers);
        } else {
          setOffers([]);
        }
      } catch (error) {
        console.error("Error fetching promo codes:", error);
        setOffers([]);
      }
    };

    getPromoCodesData();

    // Return cleanup function to reset state when component unmounts
    return () => {
      // Reset critical state values
      setPincodeChecked(false);
      setVendorPriceAtPincode(0);
      setResultMessage("");
      dispatchQuantity({
        type: "INITIAL",
        quant: 0,
        price: 0,
        min: 0,
        max: 0,
      });
    };
  }, [props.productData]);

  
  const addtocardhandler = async () => {
    const { quantity: productquantity, price } = quantityState;
    const pincode = pinCodeState;  
    dispatch(
      editItemToCart({
        productDetails: {
          ...productDetails,  
          minimum1: productDetails.minimum1,
          maximum1: productDetails.maximum1,
          minimum2: productDetails.minimum2,
          maximum2: productDetails.maximum2,
          minimum3: productDetails.minimum3,
          maximum3: productDetails.maximum3,
          minimum4: productDetails.minimum4,
          maximum4: productDetails.maximum4,
          minimum5: productDetails.minimum5,
          maximum5: productDetails.maximum5,
          minimum6: productDetails.minimum6,
          maximum6: productDetails.maximum6,
          norate: productDetails.norate,
        },
        productquantity,
        price: (productDetails.norate) ? productDetails.discountprice2B : price, 
        vendorPriceAtPincode,
        pincode,
      })
    );

    setButtonValue(!buttonValue);
  };

  useEffect(() => {
    if (productDetails) {
      const getPrice = (index) => {
        console.log(props.user);
        return props.user?.corporate === true
          ? productDetails[`proprice${index}`]
          : productDetails[`price${index}`];
      };

      if(productDetails.norate === false){
        dispatchQuantity({
          type: "PRICE",
          price: productDetails.discountprice2B,
        });
      }
      else{

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
        dispatchQuantity({ type: "PRICE", price: getPrice(1)});
      }
      if (
        quantityState.quantity >= productDetails.minimum2 &&
        quantityState.quantity <= productDetails.maximum2
      ) {
        dispatchQuantity({ type: "PRICE", price: getPrice(2) });
      }
      if (
        quantityState.quantity >= productDetails.minimum3 &&
        quantityState.quantity <= productDetails.maximum3
      ) {
        dispatchQuantity({ type: "PRICE", price: getPrice(3) });
      }
      if (
        quantityState.quantity >= productDetails.minimum4 &&
        quantityState.quantity <= productDetails.maximum4
      ) {
        dispatchQuantity({ type: "PRICE", price: getPrice(4) });
      }
      if (
        quantityState.quantity >= productDetails.minimum5 &&
        quantityState.quantity <= productDetails.maximum5
      ) {
        dispatchQuantity({ type: "PRICE", price: getPrice(5) });
      }
      if (
        quantityState.quantity >= productDetails.minimum6 &&
        quantityState.quantity <= productDetails.maximum6
      ) {
        dispatchQuantity({ type: "PRICE", price: getPrice(6) });
      }
    }
    }
  }, [quantityState.quantity , props.productData]);


  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const data = await getSeo();
        const foundSeo = data.find(
          (item) => item.product === productDetails?.productname1
        );
        setProductSeo(foundSeo || null);
        console.log(foundSeo, "seo product ka");
      } catch (err) {
        console.error("Error fetching SEO:", err);
      }
    };

    if (productDetails?._id) {
      fetchSeo();
    }
  }, [productDetails?._id]);

  const radiochangehandler = (min, price) => {
    dispatchQuantity({
      type: "SELECT_RANGE",
      quant: parseInt(min),
    });
    
    // Handle pricing based on norate status
    if (productDetails.norate) {
      // If norate is true or product is imported, always use discountprice2B regardless of pincode check
      dispatchQuantity({
        type: "PRICE",
        price: Number(productDetails.discountprice2B),
      });
    } else {
      // Original logic: Add vendor price only if pincode is checked
      if (pincodeChecked) {
        const totalPrice = Number(price) + Number(vendorPriceAtPincode);
        dispatchQuantity({
          type: "PRICE",
          price: totalPrice,
        });
      } else {
        dispatchQuantity({
          type: "PRICE",
          price: Number(price),
        });
      }
    }
  };


  

  useEffect(() => {
    setUserInput(quantityState.quantity);
  }, [quantityState]);

  const incrementquantityhandler = () => {
    // Check if incrementing would exceed maxord11B
    if (quantityState.quantity + 1 > productDetails.maxord11B) {
      setShowBulkOrderModal(true);
      return;
    }
    dispatchQuantity({ type: "INCREMENT" });
  };

  const decrementquantityhandler = () => {
    dispatchQuantity({ type: "DECREMENT" });
  };

  const setthequantity = () => {
    // Check if input quantity would exceed maxord11B
    if (Number(userinput) > Number(productDetails.maxord11B)) {
      setShowBulkOrderModal(true);
      setUserInput(productDetails.maxord11B);
      return;
    }
    
    if (userinput != "") {
      // Only set to minord11A if the userinput is less than minord11A
      if (Number(userinput) < Number(productDetails.minord11A)) {
        setUserInput(productDetails.minord11A);
        dispatchQuantity({ type: "USER_INPUT", value: productDetails.minord11A });
      } else {
        // Keep the user's input if it's valid (between min and max)
        dispatchQuantity({ type: "USER_INPUT", value: userinput });
      }
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

  const user = useMemo(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }, []);

    const AddproducttoWishlist = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const getuserId = user?._id;

      if (!getuserId) {
        toast.info("Please login to add a product to the wishlist.");
        return;
      }

      const data =
        {
            userId: getuserId,
            productId:null,
            varianceId:productDetails._id,
          }
      
      // ✅ Check if the product is already in the wishlist
      const response = await getWishlist(getuserId);

      if (response.status === 200 && response.data?.whishList) {
        const isProductInWishlist = response.data.whishList.some(
          (item) => item.productId === data.varianceId
        );
        console.log(response.data.whishList,"wishlistt")

        if (isProductInWishlist) {
          toast.info("Product is already in the wishlist.");
          return;
        }
      }

      console.log(data ,"data check")
      // ✅ Add to wishlist if not present
      const addResponse = await addWishlist(data);

      if (addResponse.status === 200) {
        setWishlist(true);
        toast.success("Product added to the wishlist");
      } else {
        toast.error("Error adding to the wishlist");
      }
    };

    const deletefromWishlist = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const getuserId = user?._id;
    
      const data = {
        userId: getuserId,
        productId: null,// Ensure proper ID is used
        varianceId: productDetails._id, // Only include varianceId if it's a variant
      };
    
      const response = await deleteWishList(data);
    
      if (response.status === 200) {
        setWishlist(false);
        toast.success("Product removed from wishlist");
      } else {
        toast.error("Error removing from wishlist");
      }
    };
    

    const checkProductInWishlist = async (data) => {
      const response = await getWishlist(data.userId);

      if (response.status === 200 && response.data?.whishList) {
        return response.data.whishList.some(
          (item) => item.productId === data.varianceId
        );
      }

      return false;
    };

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));

      const getWishlistData = async (id) => {
        try {
          const response = await getWishlist(id);
          console.log(response.dpata, "wishlist yahi hai ");

          if (response.status === 200 && productDetails) {
            console.log(response, "andar aa rha hai");
            const isProductInWishlist = response.data?.whishList?.some(
              (item) =>
                item.varianceId === productDetails._id  // Ensure it matches the product
            //     (!data.varianceId || item.varianceId === data.varianceId) // Match variant only if it exists
            );
            
            console.log(isProductInWishlist, "ws");
            setWishlist(isProductInWishlist);
            console.log(wishlist);
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };

      if (user && productDetails?._id) {
        getWishlistData(user?._id);
      }
    }, [productDetails?._id, user?._id]);

  console.log("Wishlist state:", wishlist);

  const changetheproduct = async (item, index) => {
    try {
      // Reset critical state before navigation
      setPincodeChecked(false);
      setVendorPriceAtPincode(0);
      
      // First, if a pincode is available, fetch shipping price for this variant
      const pincode = pinCodeState || expcheckpincode || "421302";
      if (pincode && item._id) {
        try {
          // Check if shipping is available for this pincode
          const isPincodeValid = await checkPincodeForVariant(pincode, item);
          
          if (isPincodeValid) {
            // Fetch shipping price for this variant
            await sendPincodeDetails(
              pincode,
              "", // productId
              item._id, // variantId
              item.minord11A || 1 // Use minimum order quantity
            );
          }
        } catch (error) {
          console.error("Error checking pincode for variant:", error);
        }
      }
      
      // Check if this is a variant by checking for mainProductId
      // If it has a mainProductId, it's a variant; otherwise, it's a main product
      const isVariant = item.mainProductId !== undefined && item.mainProductId !== null && item.mainProductId !== "";
      
      // Then navigate to the product page
      const token = localStorage.getItem("authToken");
      
      // Format product name properly for API request
      const formattedProductName = item.productname1.trim().replace(/\s+/g, '-');
      const slugName = await getSlugName(formattedProductName, token);
      
      // Use path based on whether this is a variant or main product
      const path = isVariant ? "variance" : "products";
      const itemId = isVariant ? item._id : (item.mainProductId || item._id);
      
      // Navigate to the appropriate URL with better error handling
      if (slugName?.data && slugName.data.length > 0 && (slugName.data[0]?.old_url || slugName.data[0]?.url_structure)) {
        // Use old_url if available, otherwise url_structure
        const urlPath = slugName.data[0]?.old_url || slugName.data[0]?.url_structure;
        navigation.push(`/${path}/${urlPath}/${itemId}`);
      } else {
        // Fallback if slug data is not available
        const fallbackUrl = item.productname1
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        navigation.push(`/${path}/${fallbackUrl}/${itemId}`);
      }
      
      setSelectedProduct({ item, index });
    } catch (error) {
      console.error("Error in changetheproduct:", error);
      
      // Fallback navigation on error
      const isVariant = item.mainProductId !== undefined && item.mainProductId !== null && item.mainProductId !== "";
      const path = isVariant ? "variance" : "products";
      const itemId = isVariant ? item._id : (item.mainProductId || item._id);
      
      const fallbackUrl = (item.productname1 || "product")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')
        .replace(/-+/g, '-');
      
      navigation.push(`/${path}/${fallbackUrl}/${itemId}`);
    }
  };

  // Helper function to check if a pincode is valid for a variant
  const checkPincodeForVariant = async (pincode, variant) => {
    try {
      const response = await getBuyerdata();
      const dataArray = response;
      
      const isPincodeFound = dataArray.some((dict) => dict.pin === pincode);
      
      if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
        return false;
      }
      
      const isPincodeInExcpins = variant?.excpins?.includes(pincode);
      
      if (isPincodeInExcpins) {
        return false;
      }
      
      return isPincodeFound;
    } catch (error) {
      console.error("Error checking pincode:", error);
      return false;
    }
  };

  

  const [isOpen, setIsOpen] = useState(false);
  const url = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    instagram: "#", // No direct Instagram share link for web
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
  };



  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);



  const requestLocation = () => {
   

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Location access denied. Using approximate location.");
          fetchIPLocation(); // Fallback to IP-based location
        }
      );
    } else {
      setError("Geolocation not supported. Using approximate location.");
      fetchIPLocation(); // Fallback to IP-based location
    }
  };
  useEffect(() => {
    const storedPincode = localStorage.getItem('pincode');
    if (!storedPincode) {
      requestLocation(); // Show modal only if no pincode is stored
    }
  }, []);


  const fetchIPLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setLocation({ latitude: data.latitude, longitude: data.longitude });
    } catch (error) {
      setError("Unable to fetch location.");
    }
  };


  const [expcheckpincode , setexpcheckpincode] =useState(null);
  
  const [pinCodeState, setPinCodeState] = useState(expcheckpincode);

  useEffect(() => {
    const storedPincode = localStorage.getItem('pincode');
    if (storedPincode) {
      setPinCodeState(storedPincode); // Use stored pincode if available
    } else {
      // If no pincode is stored, fetch it and store it in localStorage
      if (expcheckpincode) {
        setPinCodeState(expcheckpincode);
        localStorage.setItem('pincode', expcheckpincode); // Store in localStorage
      }
      else{
        setPinCodeState("421302")
      }
    }
  }, [expcheckpincode]);



 const getPincodeFromLocation = async (location) => {
  if (!location || !location.latitude || !location.longitude) {
    console.error("Invalid location data");
    return "Location not available";
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
    );
    const data = await response.json();
// console.log(data,"getting pincode");

setexpcheckpincode(data?.address?.postcode);
    return data?.address?.postcode || "Pincode not found";
  } catch (error) {
    console.error("Error fetching pincode:", error);
    return "Error fetching pincode";
  }
};



useEffect(() => {
  if (location?.latitude && location?.longitude) {
    console.log("Updated location:", location);
    getPincodeFromLocation(location);
  }
}, [location]);


useEffect(() => {
  // Only run checkpincode when triggered by a user action (manual pincode entry)
  // or when expcheckpincode changes (after user location permission)
  if (productDetails?._id && expcheckpincode && expcheckpincode !== "421302") {
    // Silent pincode check without showing success toast
    const silentPincodeCheck = async () => {
      const pincode = pinCodeState || expcheckpincode || "421302";
      const response = await getBuyerdata();
      const dataArray = response;
      const variantId = productDetails?._id;
      const productId = "";
  
      const isPincodeFound = dataArray.some((dict) => dict.pin === pincode);
  
      if (!pincode) {
        setResultMessage("Enter pincode first");
      } else if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
        setResultMessage("Invalid pincode");
      } else {
        const isPincodeInExcpins = productDetails?.excpins.includes(pincode);
  
        if (isPincodeInExcpins) {
          if (pincode == expcheckpincode) {
            // Don't show toast on initial load
            setPincodeChecked(false);
          }
          setResultMessage(
            "We don't deliver to this pincode, Contact Materialbuy Team"
          );
          if (pincode == pinCodeState) {
            // Don't show toast on initial load
            setPincodeChecked(false);
          }
        } else {
          if (isPincodeFound) {
            setResultMessage("Shipping is available");
            // Don't show success toast on initial load
  
            sendPincodeDetails(
              pincode,
              productId,
              variantId,
              userinput
            );
          } else {
            setResultMessage(
              "We don't deliver to this pincode, Contact Materialbuy Team"
            );
            sendPincodeDetails(
              pincode,
              productId,
              variantId,
              userinput
            );
            setPincodeChecked(false);
            // Don't show error toasts on initial load
          }
        }
      }
    };
    
    silentPincodeCheck();
  }
}, [props, productDetails, expcheckpincode]);





  const [selectedValues, setSelectedValues] = useState({});
  const [filteredVariants, setFilteredVariants] = useState(
    props.mainProduct?.variations || []
  );

  const variantOptions = {
    vari1: [...new Set(props.mainProduct?.variations.map((v) => v.vari11).filter(Boolean))],
    vari2: [...new Set(props.mainProduct?.variations.map((v) => v.vari12).filter(Boolean))],
    vari3: [...new Set(props.mainProduct?.variations.map((v) => v.vari13).filter(Boolean))],
    vari4: [...new Set(props.mainProduct?.variations.map((v) => v.vari14).filter(Boolean))],
  };
  useEffect(() => {
    // Start with all variations
    let filtered = props.mainProduct?.variations || [];
    // Whether the main product matches the filters
    let mainProductMatches = true;

    // Apply filters based on selected values
    Object.entries(selectedValues).forEach(([key, value]) => {
      if (value) {
        const mappedKey =
          key === "vari1" ? "vari11" :
          key === "vari2" ? "vari12" :
          key === "vari3" ? "vari13" :
          key === "vari4" ? "vari14" : null;

        if (mappedKey) {
          filtered = filtered.filter((v) => v[mappedKey] === value);
          
          // Check if main product matches this filter criteria
          if (props.mainProduct && props.mainProduct[mappedKey] !== value) {
            mainProductMatches = false;
          }
        }
      }
    });

    // Add main product only if it matches all filters or if no filters are applied
    if (props.mainProduct && (mainProductMatches || Object.keys(selectedValues).length === 0)) {
      filtered = [props.mainProduct, ...filtered];
    }

    setFilteredVariants(filtered);
  }, [selectedValues, props.productData?.variations, props.mainProduct]);


console.log(props)

const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 160;
      scrollContainer.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };


  
  console.log(productDetails, productSeo, "hhhj");

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const openSampleModal = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigation.push("/login");
      return;
    }
    
    // Calculate sample price with GST
    const sampleBasePrice = 99;
    const gstPercentage = productDetails.taxpercent3 || 18; // Use product's GST or default to 18%
    const gstAmount = (sampleBasePrice * gstPercentage) / 100;
    const totalPrice = sampleBasePrice + gstAmount;
    
    // Initialize the form data with user information from localStorage
    setSampleFormData({
      quantity: 1,
      notes: '',
      address: user?.shippingaddress1 || '',
      phone: user?.phoneno || '',
      fullname: user?.fullname || user?.username || '',
      sampleBasePrice,
      gstPercentage,
      gstAmount: gstAmount.toFixed(2),
      totalPrice: totalPrice.toFixed(2)
    });
    
    setShowSampleModal(true);
  };

  // ==> MBUY-AI: Handler for changes in the sample form inputs.
  const handleSampleInputChange = (e) => {
    const { name, value } = e.target;
    setSampleFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ==> MBUY-AI: This is the core logic that processes the sample order.
  // It is designed to perfectly mimic the checkout flow from Cart.js.
  const processSampleOrder = async () => {
    if (!user) {
      toast.error("Please login to continue");
      navigation.push("/login");
      return;
    }
    
    if (!sampleFormData.address || !sampleFormData.phone || !sampleFormData.fullname) {
      toast.error("Please fill in all required fields: Name, Address, and Phone.");
      return;
    }
    
    setIsLoadingSample(true);
    
    try {
      // Step 1: Create the 'products' array for the payload, just like in the cart.
      const sampleProductPayload = {
        productid: productDetails._id,
        vairanceid: productDetails.mainProductId ? productDetails._id : "",
        productname: productDetails.productname1,
        ShipPincode: user.shippingpincode1 || "000000", // Use user's pincode or a default
        quantity: 1,
        vendorid: productDetails.vendorid || "",
        warehouseid: productDetails.warehouseid || "",
        price: 99,
        sample: true // IMPORTANT: Flag to identify this as a sample
      };
      
      // Step 2: Create the 'shippingdetail' object, mimicking the cart's structure.
      // This ensures your backend parser can handle it.
      const sampleShippingDetail = {
        productid: productDetails._id,
        variantid: productDetails.mainProductId ? productDetails._id : '',
        productname: productDetails.productname1,
        shippingCost: 0, // Assuming free shipping for samples
        shippingType: 'Standard',
        boxes: {}, // Can be empty for samples
        DOD: 0,
        CSS: 0,
        quantity: 1,
        Promo: "SAMPLE_ORDER",
        Price: 99,
        vendor0: productDetails.vendorid || "NA",
        vendor1: "NA", vendor2: "NA", vendor3: "NA", vendor4: "NA", vendor5: "NA", vendor6: "NA",
        pincode: user.shippingpincode1 || "000000",
        selectedvendor: productDetails.vendorid || "NA",
        selectedware: productDetails.warehouseid || "NA",
        vendorPriceAtPincode: 0,
        gst: productDetails.taxpercent3 || 18
      };

      // Step 3: Construct the main `paymentdetail` object.
      // This structure MUST MATCH the one in Cart.js.
      const paymentdetail = {
        amount: parseFloat(sampleFormData.totalPrice).toFixed(2),
        user: user,
        products: [sampleProductPayload], // Must be an array
        Shippingaddress: sampleFormData.address,
        Shippingpin: user.shippingpincode1 || "",
        GSTno: user.gst || "",
        PANno: user.pan || "",
        UserName: user.username || "",
        Mobileno: sampleFormData.phone, // Use the (potentially edited) phone number
        BillingName: sampleFormData.fullname, // Use the (potentially edited) name
        BillingEmail: user.email || "",
        shippingdetail: [sampleShippingDetail], // Must be an array
        BillingAddress: user.billingaddress1 || sampleFormData.address, // Fallback to shipping address
        Billingpin: user.billingpincode1 || user.shippingpincode1 || "",
        FullName: sampleFormData.fullname,
        promocode: "SAMPLE_ORDER", // Use a special code for tracking
        sample: true // Top-level flag for easier backend identification
      };

      console.log("Submitting Sample Order Payload:", paymentdetail);

      // Step 4: Call the `paymentStatus` API to save the order internally.
      const res = await paymentStatus(paymentdetail);
      
      if (res.status == 200) {
        // Step 5: If the order is saved, prepare the data for the payment gateway.
        const datatoencode = {
          merchant_id: "3182319",
          language: "EN",
          currency: "INR",
          dataid: res.data, // This is the unique ID from your backend
          order_id: nanoid(10),
          billing_name: `${paymentdetail.BillingName}`,
          billing_email: `${paymentdetail.BillingEmail}`,
          billing_tel: `${paymentdetail.Mobileno}`,
          delivery_address: `${paymentdetail.Shippingaddress}`,
          dilivery_zip: `${paymentdetail.Shippingpin}`,
          billing_zip: `${paymentdetail.Billingpin}`,
          billing_address: `${paymentdetail.BillingAddress}`,
          amount: parseFloat(sampleFormData.totalPrice).toFixed(2),
          redirect_url: `https://walrus-app-6xm2k.ondigitalocean.app/admin-backend2/api/orders/response/check`,
          cancel_url: `https://walrus-app-6xm2k.ondigitalocean.app/admin-backend2/api/orders/response/check`,
        };
        
        // Step 6: Get the encrypted request string from your backend.
        const response = await postOrderPayment(datatoencode);
        
        if (response.data) {
          // Step 7: Dynamically create and submit the form to redirect to CCAvenue.
          const encRequest = response.data;
          var accessCode = 'AVCN54LB03AB47NCBA';
          
          const form = document.createElement('form');
          form.id = 'nonseamless';
          form.method = 'post';
          form.name = 'redirect';
          form.action = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction`;

          const encRequestInput = document.createElement('input');
          encRequestInput.type = 'hidden';
          encRequestInput.name = 'encRequest';
          encRequestInput.value = encRequest;
          form.appendChild(encRequestInput);

          const accessCodeInput = document.createElement('input');
          accessCodeInput.type = 'hidden';
          accessCodeInput.name = 'access_code';
          accessCodeInput.value = accessCode;
          form.appendChild(accessCodeInput);

          document.body.appendChild(form);
          form.submit();
          
          toast.success("Redirecting to payment gateway...");
          setShowSampleModal(false);
        } else {
          throw new Error("Failed to get encrypted data from payment gateway.");
        }
      } else {
        throw new Error(res.error || "Failed to create order on the server.");
      }
    } catch (err) {
      console.error("Error processing sample order:", err);
      toast.error("Error processing sample order: " + (err.message || "An unknown error occurred."));
      setIsLoadingSample(false);
    }
  };






  // Function to calculate unit price and total price based on quantity
  const calculatePrices = (quantity, productDetails, isUserCorporate) => {
    if (!productDetails) return { unitPrice: 0, totalPrice: 0, gstAmount: 0, finalPrice: 0 };
    
    let unitPrice = 0;
    
    // If norate is true, always use discountprice2B regardless of quantity tier
    if (productDetails.norate) {
      unitPrice = productDetails.discountprice2B;
    } else {
      // Otherwise use the regular tier-based pricing  
      if (quantity >= productDetails.minord11A && quantity < productDetails.minimum1) {
        unitPrice = productDetails.discountprice2B;
      } else if (quantity >= productDetails.minimum1 && quantity <= productDetails.maximum1) {
        unitPrice = isUserCorporate ? productDetails.proprice1 : productDetails.price1;
      } else if (quantity >= productDetails.minimum2 && quantity <= productDetails.maximum2) {
        unitPrice = isUserCorporate ? productDetails.proprice2 : productDetails.price2;
      } else if (quantity >= productDetails.minimum3 && quantity <= productDetails.maximum3) {
        unitPrice = isUserCorporate ? productDetails.proprice3 : productDetails.price3;
      } else if (quantity >= productDetails.minimum4 && quantity <= productDetails.maximum4) {
        unitPrice = isUserCorporate ? productDetails.proprice4 : productDetails.price4;
      } else if (quantity >= productDetails.minimum5 && quantity <= productDetails.maximum5) {
        unitPrice = isUserCorporate ? productDetails.proprice5 : productDetails.price5;
      } else if (quantity >= productDetails.minimum6 && quantity <= productDetails.maximum6) {
        unitPrice = isUserCorporate ? productDetails.proprice6 : productDetails.price6;
      }
    }
    
    // Calculate total price based on norate status
    let totalPrice;
    
    if (productDetails.norate) {
      // If norate is true, always use discountprice2B * quantity with no vendor price
      totalPrice = Math.ceil(productDetails.discountprice2B * quantity);
    } else {
      // Otherwise follow original logic
      totalPrice = pincodeChecked ? (Math.ceil(unitPrice * quantity)) : (Math.ceil(productDetails.discountprice2B * quantity));
    }
    
    // Calculate GST amount (with vendor price only if not norate)
    const gstPercentage = productDetails.taxpercent3 || 18; // Default to 18% if not specified
    let gstAmount;
    
    if (productDetails.norate) {
      // No vendor price included for norate products
      gstAmount = Math.ceil((totalPrice * gstPercentage) / 100);
    } else {
      // Include vendor price in GST calculation for regular products
      gstAmount = Math.ceil(((totalPrice + (pincodeChecked ? (vendorPriceAtPincode * quantity) : 0)) * gstPercentage) / 100);
    }
    
    // Calculate final price
    let finalPrice;
    
    if (productDetails.norate) {
      // No vendor price for norate products
      finalPrice = Math.ceil(totalPrice + gstAmount);
    } else {
      // Include vendor price for regular products
      finalPrice = Math.ceil(totalPrice + gstAmount + (pincodeChecked ? (vendorPriceAtPincode * quantity) : 0));
    }
    
    return {
      unitPrice,
      totalPrice,
      gstAmount,
      finalPrice,
      gstPercentage
    };
  };
  
  // Use a memo to calculate the prices whenever quantity or product details change
  const priceCalculation = useMemo(() => {
    return calculatePrices(
      quantityState.quantity, 
      productDetails, 
      props.user?.corporate === true
    );
  }, [
    quantityState.quantity, 
    productDetails, 
    props.user?.corporate, 
    pincodeChecked, 
    vendorPriceAtPincode,
    // Add product ID as a dependency to ensure recalculation when product changes
    productDetails?._id
  ]);


  // Add a minimal useEffect to check cart after login/logout
  useEffect(() => {
    // Check if the product is in cart after authentication changes
    const checkIfInCart = () => {
      if (productDetails && cart.cart.length > 0) {
        // Helper function to check deeply nested item structure
        const findProductId = (obj, targetId) => {
          if (!obj) return false;
          
          // Check if current object has the ID
          if (obj._id === targetId) return true;
          
          // Check if productDetails has the ID
          if (obj.productDetails && obj.productDetails._id === targetId) return true;
          
          // Check in nested item
          if (obj.item) return findProductId(obj.item, targetId);
          
          return false;
        };
        
        // Find item in cart
        const isInCart = cart.cart.find(cartItem => 
          findProductId(cartItem, productDetails._id)
        );
        
        setButtonValue(!!isInCart);
      } else {
        setButtonValue(false);
      }
    };

    // Add event listener for storage changes (login/logout)
    const handleAuthChange = () => {
      setTimeout(checkIfInCart, 300);
    };
    
    window.addEventListener('storage', handleAuthChange);
    
    // Run initial check immediately
    checkIfInCart();
    
    // Set up an interval to periodically check cart status (helps with page reloads)
    const intervalId = setInterval(checkIfInCart, 2000);
    
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      clearInterval(intervalId);
    };
  }, [cart.cart, productDetails, cart]);

  // Function to handle navigation when clicking on frequently bought together products
  const changeroute = async (item) => {
    try {
      // Reset critical state before navigation
      setPincodeChecked(false);
      setVendorPriceAtPincode(0);
      
      // Handle case where item might not have the required properties
      if (!item || !item._id || !item.productname1) {
        console.error("Invalid product data:", item);
        return;
      }

      const token = localStorage.getItem("authToken");
      
      // Format product name properly for API request by replacing spaces with hyphens
      const formattedProductName = item.productname1.trim().replace(/\s+/g, '-');
      
      try {
        // Get the SEO-friendly URL slug
        const slugName = await getSlugName(formattedProductName, token);
        
        if (slugName?.data && slugName.data.length > 0 && (slugName.data[0]?.old_url || slugName.data[0]?.url_structure)) {
          // Use old_url if available, otherwise url_structure
          const urlPath = slugName.data[0]?.old_url || slugName.data[0]?.url_structure;
          
          navigation.push(
            `/${item.mainProductId ? "variance" : "products"}/${urlPath}/${item._id}`
          );
        } else {
          // Fallback if slug data is missing
          // Create a clean, URL-friendly version of the product name
          const fallbackUrl = item.productname1
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')      // Replace spaces with hyphens
            .replace(/[^\w-]/g, '')    // Remove non-word chars
            .replace(/-+/g, '-')       // Replace multiple hyphens with single
            .replace(/^-|-$/g, '');    // Remove leading/trailing hyphens
          
          navigation.push(
            `/${item.mainProductId ? "variance" : "products"}/${fallbackUrl}/${item._id}`
          );
        }
      } catch (apiError) {
        console.error("API error in changeroute:", apiError);
        throw apiError; // Pass to outer catch block for fallback handling
      }
    } catch (error) {
      console.error("Error in changeroute:", error);
      // Ultimate fallback navigation on error
      if (item && item._id) {
        const fallbackUrl = (item.productname1 || "product")
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
          .replace(/-+/g, '-');
          
        navigation.push(
          `/${item.mainProductId ? "variance" : "products"}/${fallbackUrl}/${item._id}`
        );
      }
    }
  };

  // Add a key-based effect to reset critical state values when product changes
  useEffect(() => {
    // Reset critical state values when product ID changes
    setPincodeChecked(false);
    setVendorPriceAtPincode(0);
    setResultMessage("");
    
    // Reset quantity state with new product's values
    if (props.productData?.discountprice2B) {
      dispatchQuantity({
        type: "INITIAL",
        quant: props.productData.minord11A,
        price: props.productData.discountprice2B,
        min: props.productData.minord11A,
        max: props.productData.maxord11B,
      });
    }
70
    // Reset active image
    setActiveImage(1);
    if (props.productData) {
      setImages(props.productData.imgs1);
    }
  }, [props.productData?._id]); // Only run when product ID changes

  return (
    <>
    {/* <Head>
      <title>{"Material Buy"}</title>
      <meta
        property="og:title"
        content={productSeo?.meta_title || "Default Title"}
      />
      <meta
        property="og:description"
        content={productSeo?.meta_description || "Default Description"}
      />
      <meta
        property="og:image"
        content={productDetails?.imgs1 || "/default-image.jpg"}
      />
      <meta
        property="og:url"
        content={`https://www.yourwebsite.com/${
          productSeo?.url_structure || "default-url"
        }`}
      />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="MaterialBuy" />
      <meta property="og:locale" content="en_IN" />
    </Head> */}
    <div
      className={`bg-white w-full flex flex-col`}
      key={`product-${productDetails?._id || 'loading'}`} // Add a unique key based on product ID
    >
       {/* {showModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-20">
        <div className="bg-white z-20 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Allow Location Access?</h2>
          <p className="text-gray-600">We need your location to Provide Best Experience.</p>
          <div className="mt-4 flex justify-between">
            <button
              className="px-4 py-2  text-gray-600 border-blue-950 border  rounded"
              onClick={()=>{setShowModal(false);}}
            >
              Reject
            </button>
            <button
              className="px-4 py-2 bg-blue-950 text-white rounded"
              onClick={requestLocation}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    )} */}
      
      <div className={"w-full px-6 py-2"}>    
        {productDetails ? (
          <>
          
            <div
              className={`flex flex-row items-center justify-between font-bold text-sm md:text-md mb-2 w-full md:w-[70%] overflow-x-auto ${Styles.product_breakcrumb}`}
            >
              <div className="flex flex-nowrap items-center min-w-max pr-2">
                <Link href="/" className="w-fit flex-shrink-0">
                  <AiFillHome className="" />
                </Link>
                <Link
                  href={`/allproducts/${productDetails?.categoryid}`}
                  className="w-fit flex-shrink-0 truncate max-w-[120px] md:max-w-none"
                >{`> ${capitalizeWords(productDetails?.categoryid)}`}</Link>
                <Link
                  href={`/allproducts/${productDetails?.categoryid}/${productDetails?.subcategory?.replace(/\s+/g, "-")}`}
                  className="w-fit flex-shrink-0 truncate max-w-[120px] md:max-w-none"
                >{`> ${capitalizeWords(productDetails?.subcategory)}`}</Link>
                <Link
                  href={`/allproducts/${productDetails?.categoryid}/${productDetails?.subsubcategory}`}
                  className="w-fit flex-shrink-0 truncate max-w-[120px] md:max-w-none"
                >{`> ${capitalizeWords(productDetails?.subsubcategory)}`}</Link>
              </div>
              <div
                onClick={() => setIsOpen(true)}
                className="flex cursor-pointer flex-row items-center flex-shrink-0"
              >
                Share
                <FaShare className="ml-2" />
              </div>
              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-2xl w-[320px] shadow-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">
                        Share this page
                      </h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✖
                      </button>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-6 mb-4 text-2xl">
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-gray-700"
                      >
                        <FaXTwitter />
                      </a>
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaFacebook />
                      </a>
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-700"
                      >
                        <FaInstagram />
                      </a>
                      <a
                        href={socialLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>

                    {/* Link and Copy Button */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <input
                        type="text"
                        value={url}
                        readOnly
                        className="w-full p-2 text-gray-700 bg-gray-100"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="p-2 bg-blue-500 text-white hover:bg-blue-600"
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-full flex-col justify-between md:flex-row">
              <div className="flex flex-col md:w-[70%] space-x-3">
                <div className="w-full flex-col justify-center xl:flex-row flex">
                  <div className="flex md:hidden w-full flex-row justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 truncate">
                      SKU ID:{productDetails.skuid5}
                    </span>
                    {productDetails.shipping && (
                      <div className="w-fit bg-red-200 text-red-700 text-xs font-medium px-2 rounded-full flex items-center gap-1 whitespace-nowrap">
                        Ships within 24 hrs
                        <FaShippingFast />
                      </div>
                    )}
                  </div>

                  <div className="flex md:hidden w-full flex-row justify-start items-center mb-3">
                    <span className="font-semibold tracking-widest mr-2 flex-shrink-0">
                      Brand:
                    </span>
                    <span className="text-left text-yellow-600 tracking-widest font-bold truncate">
                      {productDetails.imported
                        ? productDetails.impBrand
                        : productDetails.manufacturer9}
                    </span>
                  </div>
                  <div className="flex w-full items-center  justify-center flex-col space-y-5 rounded-lg p-3">
                    {/* Main Image Section */}
                    <div className="xl:h-96 h-full xl:w-96 w-full mt-2 md:mt-4 flex items-center justify-center bg-white overflow-hidden">
                    {/* <img
                    src={image || productDetails.imgs1}
                    alt="Product Image"
                    className="h-full w-full object-cover"
                  /> */}

                      {activeImage === 5 ? (
                        <iframe
                          className="w-full h-full rounded-md"
                          src={image}
                          title="YouTube Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <img
                          src={image || productDetails.imgs1}
                          alt="Product"
                          className="w-full h-full object-cover rounded-md"
                        />
                      )}
                    </div>

                    {/* Small Images Section */}
                    <div className="flex flex-row space-x-6 justify-center h-20 w-full">
                      {productDetails.imgs1 && (
                        <div
                          className={`h-14 w-14 rounded-md hover:bg-gray-400 cursor-pointer ${
                            activeImage === 1
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                          onClick={() => handleImages(1)}
                        >
                          <img
                            src={productDetails.imgs1}
                            alt="Product"
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>
                      )}
                      {productDetails.imgs2 && (
                        <div
                          className={`h-14 w-14 rounded-md hover:bg-gray-400 cursor-pointer ${
                            activeImage === 2
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                          onClick={() => handleImages(2)}
                        >
                          <img
                            src={productDetails.imgs2}
                            alt="Product"
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>
                      )}
                      {productDetails.imgs3 && (
                        <div
                          className={`h-14 w-14 rounded-md hover:bg-gray-400 cursor-pointer ${
                            activeImage === 3
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                          onClick={() => handleImages(3)}
                        >
                          <img
                            src={productDetails.imgs3}
                            alt="Product"
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>
                      )}
                      {productDetails.imgs4 && (
                        <div
                          className={`h-14 w-14 rounded-md hover:bg-gray-400 cursor-pointer ${
                            activeImage === 4
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                          onClick={() => handleImages(4)}
                        >
                          <img
                            src={productDetails.imgs4}
                            alt="Product"
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>
                      )}
                      {/* {productDetails.youtube_url && (
                    <div
                      className={`h-14 w-14 rounded-md hover:bg-gray-400 cursor-pointer ${
                        activeImage === 4 ? "border-2 border-blue-500" : ""
                      }`}
                      onClick={() => handleImages(4)}
                    >
                      <img
                        src={productDetails.imgs4}
                        alt="Product"
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                  )} */}

                      {productDetails.youtube_url && (
                     <div
                     className={`relative h-14 w-14 rounded-md hover:bg-gray-400 cursor-pointer ${
                       activeImage === 5 ? "border-2 border-blue-500" : ""
                     }`}
                     onClick={() => handleImages(5)}
                   >
                     {/* YouTube Thumbnail */}
                     <img
                       src={(() => {
                         const url = productDetails.youtube_url || "";
                         let videoId;
                         
                         if (url.includes("youtu.be/")) {
                           videoId = url.split("youtu.be/")[1]?.split("?")[0];
                         } else if (url.includes("youtube.com")) {
                           videoId = url.split("v=")[1]?.split("&")[0];
                         }
                         
                         return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
                       })()}
                       alt="YouTube Thumbnail"
                       className="h-full w-full object-cover rounded-md"
                     />
                   
                     {/* Overlay */}
                     <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md"></div>
                   
                     {/* Play Button */}
                     <div className="absolute inset-0 flex items-center justify-center">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         className="w-8 h-8 text-red-600"
                         viewBox="0 0 24 24"
                         fill="currentColor"
                       >
                         <path d="M8 5v14l11-7z" />
                       </svg>
                     </div>
                   </div>
                   
                      )}
                    </div>

                    {/* Offers Section */}
                    {/* {offers?.length > 0 && (
                  <div className="mt-2 bg-blue-950 text-white p-3 rounded-md">
                    <p className="font-semibold text-lg">Available offers:</p>
                    <div className="flex items-center p-2 rounded bg-blue-800">
                      <p className="mr-4 text-center">{offers[0].message}</p>
                      <span className="border-l border-white h-full mx-2"></span>
                      <div className="flex flex-col items-center">
                        <p className="text-center">Use code</p>
                        <p className="text-yellow-400 font-bold">
                          {offers[0].codename}
                        </p>
                      </div>
                    </div>
                    <p
                      className="underline cursor-pointer mt-2"
                      onClick={showOffersPopups}
                    >
                      View all offers
                    </p>
                  </div>
                )} */}

                    {/* Assurance Section */}
                    {/* <div className="flex items-center justify-between w-full mt-3 md:mt-4">
                  <div className="flex items-center flex-col md:flex-row">
                    <GiAlliedStar className="text-3xl text-blue-500" />
                    <div className="ml-2 text-center md:text-left">
                      <h3 className="text-sm md:text-md font-semibold">
                        100% ORIGINAL
                      </h3>
                      <p className="text-sm">products</p>
                    </div>
                  </div>
                  <div className="flex items-center flex-col md:flex-row">
                    <RiSecurePaymentLine className="text-3xl text-blue-500" />
                    <div className="ml-2 text-center md:text-left">
                      <h3 className="text-sm md:text-md font-semibold">
                        SECURE
                      </h3>
                      <p className="text-sm">payment</p>
                    </div>
                  </div>
                  <div className="flex items-center flex-col md:flex-row">
                    <BsShieldLockFill className="text-2xl text-blue-500" />
                    <div className="ml-2 text-center md:text-left">
                      <h3 className="text-sm md:text-md font-semibold">
                        100% BUYER
                      </h3>
                      <p className="text-sm">protections</p>
                    </div>
                  </div>
                </div> */}

                    {/* Download Brochure Button */}
                    <button
                      className="max-w-96 w-full py-2 rounded-md border bg-blue-950 text-white border-blue-950 flex justify-center"
                      onClick={() => {
                        if (productDetails.brochure) {
                          const link = document.createElement("a");
                          link.href = productDetails.brochure;
                          link.setAttribute("download", "brochure.pdf"); // Set file name (optional)
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } else {
                          alert("Brochure not available!");
                        }
                      }}
                    >
                      Download Brochure
                    </button>
              </div>
                  <div className="w-full  px-3 rounded-lg">
                    <div className="flex flex-row justify-between w-full mb-3">
                      <div className="w-full hidden md:flex flex-row items-center justify-start space-x-3">
                        <span className="text-sm text-gray-500">
                          SKU ID:{productDetails.skuid5}
                        </span>
                       
                      </div>
                      <div className="md:flex hidden flex-row justify-start">
                        <span className="font-semibold tracking-widest">
                          Brand:
                        </span>
                        <span className="text-left whitespace-nowrap text-yellow-600 tracking-widest font-bold">
                          {productDetails.imported
                            ? productDetails.impBrand
                            : productDetails.manufacturer9}
                        </span>
                      </div>
                    </div>
                    {productDetails.shipping && (
                      <div className="w-full flex flex-row items-center justify-end gap-1">
                          <div className="w-fit bg-red-200 text-red-700 text-xs font-medium px-2  rounded-full flex items-center gap-1">
                            Ships within 24 hrs
                            <FaShippingFast />
                          </div>
                          </div>
                        )}
                    <h1 className="text-3xl text-black font-bold">
                      {productDetails.productname1}
                    </h1>

                    {/* Finish Selection */}
                    {/* <div className="mt-2">
                  <p className="text-sm text-black">Finish: </p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-12 h-12 border-2 border-blue-500 rounded-md bg-gray-200"></div>
                    <div className="w-12 h-12 bg-black rounded-md border"></div>
                    <div className="w-12 h-12 bg-gray-300 rounded-md border"></div>
                    <div className="w-12 h-12 bg-green-400 rounded-md border"></div>
                    <div className="w-12 h-12 bg-white rounded-md border"></div>
                  </div>
                </div> */}

                    {props.mainProduct?.variations?.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-black font-semibold mb-3">
                          Select Variants:
                        </h3>

                        {/* Variant Selection Dropdowns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          {Object.entries(variantOptions).map(
                            ([key, values]) =>
                              values.length > 0 ? (
                                <select
                                  key={key}
                                  className="border border-gray-300 p-2 rounded-md w-full"
                                  value={selectedValues[key] || ""}
                                  onChange={(e) =>
                                    setSelectedValues({
                                      ...selectedValues,
                                      [key]: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">
                                    Select {props.productData[key]}
                                  </option>
                                  {values.map((value) => (
                                    <option key={value} value={value}>
                                      {value}
                                    </option>
                                  ))}
                                </select>
                              ) : null
                          )}
                        </div>

                  {/* Display Filtered Variants */}
                  <div className="grid justify-start gap-y-4 gap-x-4 md:grid-cols-3 grid-cols-2">
  {filteredVariants.map((item, index) => (
    <div
      key={item._id}
      className={`border-2 rounded-lg cursor-pointer transition-all duration-200 shadow-sm flex flex-col overflow-hidden
        ${item._id === props.productData._id
          ? "border-slate-950 bg-gray-100"
          : "border-gray-300 hover:border-slate-950 hover:bg-gray-50"
        }`}
      onClick={() => changetheproduct(item, index)}
    >
      {/* Image Container */}
      <div className="flex items-center justify-center h-[100px] w-full overflow-hidden bg-white">
        <img
          src={item.imgs1}
          className="object-contain w-full h-full"
          alt="Variant"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-2 flex flex-col flex-grow">
        {/* Product Name */}
        <p className="text-xs text-center line-clamp-2 flex-grow">
          {item.productname1.length > 50 
            ? item.productname1.substring(0, 40) + '...' 
            : item.productname1}
        </p>
        
        {/* Price Container */}
        <div className="flex flex-row items-end justify-center mt-2">
          <span className="text-base font-black text-red-600">
            {item.norate ? (
              <>₹{Math.ceil(Number(item.discountprice2B || 0))}</>
            ) : (
              <>₹{Math.ceil(Number(item.discountprice2B || item.price2A || 0))}</>
            )}
          </span>
          <span className="text-xs line-through mb-[3px] text-gray-600">
            ₹{Math.ceil(Number(item.price2A || 0))}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>
                      </div>
                    )}

                    {/* Size Selection */}
                    {/* <div className="mt-4">
                  <p className="text-sm text-black font-black">Size</p>
                  <div className="flex gap-2 mt-2">
                    {["M", "L", "XL", "2XL", "3XL", "4XL", "5XL"].map(
                      (size) => (
                        <button
                          key={size}
                          className={`px-4 py-2 rounded border transition-all duration-200 
            ${
              selectedSize === size
                ? "bg-blue-950 text-white border-blue-950"
                : "text-blue-950 border-gray-300"
            }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>
                </div> */}

                    {/* Delivery Check */}
                    {/* <div className="mt-5">
                  <p className="text-lg text-blue-950 font-black">
                    Check Delivery Details
                  </p>
                  <div className="flex mt-2">
                    <input
                      type="text"
                      placeholder="Enter PIN"
                      className="w-1/2 p-2 border border-blue-950 text-black rounded-l-md"
                    />
                    <button className="bg-blue-950 px-7 rounded-r-md">
                      Check
                    </button>
                  </div>
                  <p className="text-black text-sm mt-2">
                    Please Enter a Date to Check the Delivery Dates
                  </p>
                  <p className="text-green-400 text-sm mt-2">
                    Delivery by: Sun Dec 22 2024
                  </p>
                </div> */}

                    {/* Offers Section */}
                    <div className="mt-4 text-black bg-gray-100 md:p-3 p-2 md:rounded-lg">
                      <div className="w-full flex flex-row justify-between items-center">
                        <h3 className="text-sm font-semibold">
                          AVAILABLE OFFERS
                        </h3>
                        <span
                          className="hover:underline text-xs text-blue-500 hover:text-blue-800 cursor-pointer"
                          onClick={showDialog}
                        >
                          View all offers
                        </span>
                      </div>
                      <ul className="text-xs mt-2">
                        {offers && offers.length > 0 ? (
                          offers.filter(offer => offer.currentstatus && new Date(offer.ended) > new Date()).map((offer) => (
                            <li
                              key={offer._id}
                              className="py-1 border-b border-gray-300 last:border-0"
                            >
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <span className="mb-1 sm:mb-0">
                                  Use {offer.codename} & {offer.message} on
                                  orders above Rs.{offer.mini}.
                                </span>
                                <span className="text-gray-500 text-[10px]">
                                  Expires on {new Date(offer.ended).toLocaleDateString()}
                                </span>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">
                            No offers available
                          </li>
                        )}
                      </ul>
                    </div>

                    {openDialog && (
                      <div
                        onClick={closeDialog}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                      >
                        <div 
                          onClick={(e) => e.stopPropagation()} 
                          className="bg-white rounded-xl shadow-2xl w-11/12 max-w-md transform transition-all"
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-bold text-gray-800">Available Offers</h2>
                            <button
                              onClick={closeDialog}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* Offers List */}
                          <div className="p-4 max-h-[60vh] overflow-y-auto">
                            {offers && offers.length > 0 ? (
                              <div className="space-y-4">
                                {offers.filter(offer => offer.currentstatus && new Date(offer.ended) > new Date()).map((offer) => {
                                  const isExpired = new Date(offer.ended) < new Date();
                                  const status = !offer.currentstatus || isExpired ? "EXPIRED" : "ACTIVE";
                                  const statusColor = status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
                                  
                                  return (
                                    <div key={offer._id} className={`bg-gray-50 rounded-lg p-4 border border-gray-200 ${!offer.currentstatus || isExpired ? 'opacity-75' : ''}`}>
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <div className="flex flex-col justify-start  space-y-2">
                                            <span className="px-2 py-1 w-fit  text-xs font-semibold rounded">
                                              Code : {offer.codename}
                                            </span>
                                            <span className={`px-2 py-1 w-fit ${statusColor} text-xs font-semibold rounded`}>
                                              {status}
                                            </span>
                                          </div>
                                          <h3 className="font-medium text-gray-900 mt-2">{offer.message}</h3>
                                          <div className="mt-2 text-sm text-gray-600 space-y-1">
                                            <p>• Minimum order value: ₹{offer.mini}</p>
                                            <p>• Expires on: {new Date(offer.ended).toLocaleDateString('en-IN', {
                                              day: 'numeric',
                                              month: 'short',
                                              year: 'numeric'
                                            })}</p>
                                            <p>• {offer.noofusers} uses remaining</p>
                                          </div>
                                        </div>
                                        {offer.currentstatus && !isExpired && (
                                          <button
                                            onClick={() => {
                                              navigator.clipboard.writeText(offer.codename);
                                              toast.success('Promo code copied!');
                                            }}
                                            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                          >
                                            <FaCopy className="w-4 h-4" />
                                            <span>Copy</span>
                                          </button>
                                        )}
                                      </div>
                                      {offer.TandC && (
                                        <div className="mt-3 pt-3 border-t border-gray-200">
                                          <details className="text-sm text-gray-600">
                                            <summary className="cursor-pointer hover:text-blue-600">Terms & Conditions</summary>
                                            <div className="mt-2 pl-4" dangerouslySetInnerHTML={{ __html: offer.TandC }} />
                                          </details>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                No offers available at the moment
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="border-t p-4">
                            <button
                              onClick={closeDialog}
                              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex justify-around items-start w-full">
                      {/* Request Backup */}
                      <div className="flex flex-col items-center">
                        <span className="h-12 w-12 sm:h-16 sm:w-16 bg-red-400 rounded-full flex justify-center items-center">
                          <Image src="/callback.png" alt="Request a Callback" width={30} height={30} className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px]" />
                        </span>
                        <span className="font-bold text-center text-[10px] sm:text-xs mt-1 w-[60px] sm:w-[70px]">
                          Request a Callback
                        </span>
                      </div>

                      {/* Get Customised Price */}
                      <div className="flex flex-col items-center">
                        <span className="h-12 w-12 sm:h-16 sm:w-16 bg-gray-400 rounded-full flex justify-center items-center">
                          <Image
                            src="/Customisedprice.png"
                            alt="Get Customised Price"
                            width={30} 
                            height={30}
                            className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px]"
                          />
                        </span>
                        <span className="font-bold text-center text-[10px] sm:text-xs mt-1 w-[80px] sm:w-[100px]">
                          Get Customised Price
                        </span>
                      </div>

                      {/* Connect with Product */}
                      <div className="flex flex-col items-center">
                        <span className="h-12 w-12 sm:h-16 sm:w-16 bg-blue-300 rounded-full flex justify-center items-center">
                          <Image src="/Expert.png" alt="Connect with Product Expert" width={30} height={30} className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px]" />
                        </span>
                        <span className="font-bold text-center text-[10px] sm:text-xs mt-1 w-[80px] sm:w-[90px]">
                          Connect with Product Expert
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-6 grid md:hidden grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
{/* Warranty */}
<div className="flex flex-col items-center">
  <Image src="/Warranty.png" alt="Warranty as per brand" width={60} height={60} className="sm:w-[50px] sm:h-[50px]" />
  <span className="text-xs mt-1 font-bold text-center whitespace-nowrap sm:text-[10px] md:text-xs">
    Warranty as per brand
  </span>
</div>

{/* Original */}
<div className="flex flex-col items-center">
  <Image src="/Original.png" alt="100% Original Products" width={50} height={50} className="sm:w-[50px] sm:h-[50px]" />
  <span className="text-xs mt-1 font-bold text-center whitespace-nowrap sm:text-[10px] md:text-xs">
    100% Original Products
  </span>
</div>

{/* Secure Payments */}
<div className="flex flex-col items-center">
  <Image src="/Spayments.png" alt="Secure Payments" width={60} height={40} className="sm:w-[50px] sm:h-[35px]" />
  <span className="text-xs mt-1 font-bold text-blue-950 text-center whitespace-nowrap sm:text-[10px] md:text-xs">
    Secure Payments
  </span>
</div>

{/* Buyer Protection */}
<div className="flex flex-col items-center">
  <Image src="/BProtection.png" alt="100% Buyer Protection" width={60} height={50} className="sm:w-[50px] sm:h-[45px]" />
  <span className="text-xs mt-1 font-bold text-blue-950 text-center whitespace-nowrap sm:text-[10px] md:text-xs">
    100% Buyer Protection
  </span>
</div>

{/* Brand */}
<div className="flex flex-col items-center">
  <Image src="/Brand.png" alt="Top Brands" width={60} height={60} className="sm:w-[50px] sm:h-[50px]" />
  <span className="text-xs mt-1 font-bold text-blue-950 text-center whitespace-nowrap sm:text-[10px] md:text-xs">
    Top Brands
  </span>
</div>
</div>
                <div className="w-full mt-6 hidden xl:flex flex-row justify-around items-end space-x-2 ">
                  {/* Warranty */}
                  <div className="flex flex-col items-center w-[70px] sm:w-[50px] ">
                    <Image
                      src="/Warranty.png"
                      alt="Warranty as per brand"
                      width={60}
                      height={60}
                      className="sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px]"
                    />
                    <span className="text-xs mt-1 font-bold text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      Warranty as per brand
                    </span>
                  </div>

                  {/* Original */}
                  <div className="flex flex-col items-center w-[70px] sm:w-[50px]">
                    <Image
                      src="/Original.png"
                      alt="100% Original Products"
                      width={50}
                      height={50}
                      className="sm:w-[35px] sm:h-[35px] md:w-[45px] md:h-[45px]"
                    />
                    <span className="text-xs mt-1 font-bold text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      100% Original Products
                    </span>
                  </div>

                  {/* Secure Payments */}
                  <div className="flex flex-col items-center w-[70px] sm:w-[50px]">
                    <Image
                      src="/Spayments.png"
                      alt="Secure Payments"
                      width={60}
                      height={40}
                      className="sm:w-[40px] sm:h-[30px] md:w-[50px] md:h-[35px]"
                    />
                    <span className="text-xs mt-1 font-bold text-blue-950 text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      Secure Payments
                    </span>
                  </div>

                  {/* Buyer Protection */}
                  <div className="flex flex-col items-center w-[70px] sm:w-[50px]">
                    <Image
                      src="/BProtection.png"
                      alt="100% Buyer Protection"
                      width={60}
                      height={50}
                      className="sm:w-[40px] sm:h-[35px] md:w-[50px] md:h-[45px]"
                    />
                    <span className="text-xs mt-1 font-bold text-blue-950 text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      100% Buyer Protection
                    </span>
                  </div>

                  {/* Brand */}
                  <div className="flex flex-col items-center w-[70px] sm:w-[50px]">
                    <Image
                      src="/Brand.png"
                      alt="Top Brands"
                      width={60}
                      height={60}
                      className="sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px]"
                    />
                    <span className="text-xs mt-1 font-bold text-blue-950 text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      Top Brands
                    </span>
                  </div>
                </div>
                {/* <div className="w-full mt-6 grid xl:hidden grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">

                  <div className="flex flex-col  items-center">
                    <Image
                      src="/Warranty.png"
                      width={60}
                      height={60}
                      className="sm:w-[40px] sm:h-[40px]"
                    />
                    <span className="text-xs mt-1 font-bold text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      Warranty as per brand
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Image
                      src="/Original.png"
                      width={50}
                      height={50}
                      className="sm:w-[40px] sm:h-[40px]"
                    />
                    <span className="text-xs mt-1 font-bold text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      100% Original Products
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Image
                      src="/Spayments.png"
                      width={60}
                      height={40}
                      className="sm:w-[40px] sm:h-[35px]"
                    />
                    <span className="text-xs mt-1 font-bold text-blue-950 text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      Secure Payments
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Image
                      src="/BProtection.png"
                      width={60}
                      height={50}
                      className="sm:w-[40px] sm:h-[35px]"
                    />
                    <span className="text-xs mt-1 font-bold text-blue-950 text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      100% Buyer Protection
                    </span>
                  </div>

                  <div className="flex flex-col  items-center">
                    <Image
                      src="/Brand.png"
                      width={60}
                      height={60}
                      className="sm:w-[40px] sm:h-[40px]"
                    />
                    <span className="text-xs mt-1 font-bold text-blue-950 text-center whitespace-nowrap sm:text-[10px] md:text-xs">
                      Top Brands
                    </span>
                  </div>
                </div> */}
              </div>
              <div className="md:w-[30%] max-w-screen relative  ml-3 border-gray-300 border p-2 rounded-lg">
                {/* Loader overlay for the pricing section */}
                {isPincodeLoading && (
                  <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center rounded-lg overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white to-transparent"></div>
                    </div>
                    
                    <div className="w-24 h-24 mb-4 relative">
                     
                      
                      {/* Spinning circle around the price tag */}
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <div className="w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-blue-950 animate-pulse">Fetching best price for you...</p>
                    <p className="text-sm text-gray-600 mt-2">We're finding the best rates at your location</p>
                    
                    {/* Progress bar */}
                    <div className="w-3/4 h-1.5 bg-gray-200 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full w-full origin-left transform-gpu animate-pulse" style={{animationDuration: '1.5s'}}></div>
                    </div>
                    
                    {/* Add inline styles for shimmer animation */}
                    <style jsx>{`
                      @keyframes shimmer {
                        100% {
                          transform: translateX(100%);
                        }
                      }
                    `}</style>
                  </div>
                )}

                <h2 className="text-gray-600">
                  ₹{" "}
                  {priceCalculation.finalPrice.toFixed(2)}{" "}
                  (Incl. all taxes)
                </h2>

                {productDetails.imported && (
                  <Image
                    src="/Imported.png"
                    alt="Imported Products"
                    width={150}
                    height={100}
                    className="absolute -top-14 -right-3"
                  />
                )}
                {productDetails.discount > 0 && (
                  <p className="font-bold text-red-500">
                    Deals of the day - {productDetails.discount}%
                  </p>
                )}
                
                {/* Part price per area calculation */}
                <div onClick={() => console.log(priceCalculation.totalPrice , productDetails.partprice4A , priceCalculation.unitPrice , "total price")} className="w-full flex justify-start space-x-5 flex-row">
                  {productDetails.partprice4A && (
                    <span className="px-1 bg-gray-300 text-sm items-center flex text-green-600 font-bold">
                      ₹{" "}
                      {((pincodeChecked 
                          ? (Number(priceCalculation.unitPrice) + Number(vendorPriceAtPincode || 0))
                          : Number(priceCalculation.unitPrice)) /
                        productDetails.partprice4A).toFixed(2)}{" "}
                      per {productDetails.sell4B}
                    </span>
                  )}
                </div>

                {/* Unit price display */}
                <h5
                  className={`text-xl mt-2 sm:text-3xl font-bold ${Styles.productprice}`}
                >
                  ₹ 
                  {pincodeChecked
? `${priceCalculation.totalPrice + vendorPriceAtPincode * quantityState.quantity}/-`
: `${productDetails.discountprice2B * quantityState.quantity}/-`}
<span className="ml-2 text-xs md:text-lg">
                  <s>₹ {productDetails.price2A * quantityState.quantity} /-</s>
                  </span>
                  {quantityState.quantity <= 1 ? (
                  <span className="ml-2 text-xs md:text-lg">
                    {productDetails.freq}
                  </span>
                  ) : (
                   ""
                  )}
                  <span className="ml-2 text-xs md:text-lg">
                    (Excl. GST)
                  </span>
                </h5>
                
                {/* Total price calculation - always shown */}
                {/* <div className="mt-3 p-3 bg-gray-50 rounded-md border">
                  <div className="flex justify-between text-sm">
                    <span>Price ({quantityState.quantity} units)</span>
                    <span>₹{priceCalculation.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>GST ({productDetails.taxpercent3}%)</span>
                    <span>₹{priceCalculation.gstAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{priceCalculation.finalPrice.toFixed(2)}</span>
                  </div>
                </div> */}

                <h3 className="text-green-500 font-semibold mt-2">
                  GST: {productDetails.taxpercent3}%
                </h3>

                
                  <div className="mt-5">
                    <p className="text-lg text-blue-950 font-black">
                      Check Best Price & Serviceability at your Pincode
                    </p>
                    <div className="flex mt-2">
                      <input
                        type="text"
                        placeholder={expcheckpincode}
                        value={pinCodeState !== undefined ? pinCodeState : "421302"}
                        onChange={({ target }) =>
                          
                          setPinCodeState(target.value)
                        }
                        className="w-1/2 p-2 placeholder: border border-blue-950 text-black rounded-l-md"
                      />
                      <button
                        className="bg-blue-950 text-white px-7 rounded-r-md"
                        onClick={() => {
                          checkpincode();
                          setPincodeChecked(true);
                        }}
                        disabled={isPincodeLoading}
                      >
                        {isPincodeLoading ? "Checking..." : "Check"}
                      </button>
                    </div>

                    {/* Show warning if pincode is not checked */}
                    {!pincodeChecked && (
                      <p className="text-red-500 text-sm mt-2">
                        * Please check your pincode before adding to cart.
                      </p>
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
                            onBlur={setthequantity}
                            onChange={(e) => {
                              // Allow empty string during input, but store as a number otherwise
                              const inputValue = e.target.value;
                              setUserInput(inputValue === '' ? '' : inputValue);
                              
                              // Check if input exceeds maximum order limit
                              if (inputValue !== "" && Number(inputValue) > Number(productDetails.maxord11B)) {
                                setShowBulkOrderModal(true);
                              }
                            }}
                          />
                          <button
                            className={`px-2 text-2xl hover:bg-slate-100`}
                            onClick={incrementquantityhandler}
                          >
                            +
                          </button>
                        </div>
                        <p className="ml-3 text-sm font-semibold">
                          M.O.Q: {productDetails.minord11A}
                        </p>
                      </div>
                    )}
                  </div>
               

                  {productDetails.imported == true &&  (
                  <>
                  <div className="text-gray-900 mb-4 font-sans">
                    <p>
                      <span className="text-black font-black">
                        Import From: {productDetails.impCountry}
                      </span>
                    </p>
                    {/* <div className="flex items-start space-x-2 mt-2">
                      <FaTruck className="text-green-600 mt-1" />
                      <div>
                        <p className="text-green-600 font-semibold">
                     Shipping & Delivery Terms
                        </p>
                      
                      </div>
                    </div> */}
                    <div className="flex items-start space-x-2 mt-2">
                      {/* <FaFileInvoiceDollar className="text-green-600 mt-1" /> */}
                      <FaTruck className="text-green-600 mt-1" />

                      <div>
                        <p className="text-green-600 font-semibold cursor-pointer">
                          Shipping & Delivery Terms :
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: productDetails.declineshippingTerms,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 mt-2">
                      <FaFileInvoiceDollar className="text-green-600 mt-1" />
                      {/* <FaTruck className="text-green-600 mt-1" /> */}

                      <div>
                        <p className="text-green-600 font-semibold cursor-pointer">
                          Payment Terms :
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: productDetails.paymentTerms,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  </>
              
              )}

                  { productDetails.norate == true || productDetails.hiderate == true ? (

""
                  ) : (
                    <div
                    className={`${Styles.tablediv} mt-6 border  rounded-lg`}
                    >
                    
                      <h3 className="text-lg font-semibold">
                      Bulk Quantity Discounts
                    </h3>
                    
                    
                    <table className="w-full mt-2 border rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-blue-950 text-sm text-white">
                          <th className="text-left py-2 px-2 sm:px-4">Select</th>
                          <th className="text-left py-2 px-2 sm:px-4">Quantity</th>
                          <th className="text-left py-2 px-2 sm:px-4">
                            Unit Price
                          </th>
                          <th className="text-left py-2 px-2 sm:px-4">Shipping</th>
                        </tr>
                      </thead>
                      <tbody className="relative">
                        {!pincodeChecked && (
                          <tr className="absolute inset-0 z-10 pointer-events-none">
                            <td colSpan="4" className="h-full w-full">
                              <div className="flex items-center justify-center h-full bg-transparent backdrop-blur-[1px]">
                                <div className="text-center p-4 bg-white bg-opacity-90 shadow-lg rounded-lg border border-gray-200 pointer-events-auto">
                                  <p className="text-blue-950 font-bold text-base mb-2">
                                    Check your pincode for better prices
                                  </p>
                                  <p className="text-gray-600 text-xs mb-2">
                                    See exact shipping costs & best rates
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        {Array.from({ length: 6 }, (_, i) => i + 1).map(
                          (index) => {
                            const min = productDetails[`minimum${index}`];
                            const max = productDetails[`maximum${index}`];
                            const price =
                              props.user?.corporate == true  
                                ? productDetails[`proprice${index}`]
                                : productDetails[`price${index}`];
                            const isFree = productDetails[`free${index}`];
                            
                            if (!min || !max || !price) return null; // Skip empty rows
                    
                            const isActive =
                              quantityState.quantity >= JSON.parse(min) &&
                              quantityState.quantity <= JSON.parse(max);
                    
                            return (
                              <tr
                                key={index}
                                className={`border-b hover:bg-gray-100 transition ${isActive ? "bg-blue-50" : ""} ${!pincodeChecked ? 'opacity-70 filter blur-[0.3px]' : ''}`}
                              >
                                <td className="py-2 px-2 sm:px-4">
                                  <div className="flex items-center justify-center">
                                    <input
                                      type="radio"
                                      name="bulkSelect"
                                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-400"
                                      checked={isActive}
                                      onChange={() =>
                                        radiochangehandler(min, price)
                                      }
                                      disabled={!pincodeChecked}
                                    />
                                  </div>
                                </td>
                                <td
                                  className={`py-2 px-2 sm:px-4 text-xs sm:text-sm ${
                                    isActive ? "font-bold text-black" : ""
                                  }`}
                                >
                                  {max == "-1" ? `${min} +` : `${min} - ${max}`}
                                </td>
                                <td
                                  className={`py-2 px-2 sm:px-4 text-xs sm:text-sm ${
                                    isActive ? "font-bold text-black" : ""
                                  }`}
                                >
                                  <span className={!pincodeChecked ? 'blur-[3px]' : ''}>
                                    {productDetails.norate ? (
                                      <>₹{Number(productDetails.discountprice2B).toFixed(2)}</>
                                    ) : (
                                      <>₹{(Number(price) + Number(vendorPriceAtPincode || 0)).toFixed(2)}</>
                                    )}
                                  </span>
                                </td>
                                <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">
                                  {isFree ? (
                                    <span className={`text-green-600 font-semibold ${!pincodeChecked ? 'blur-[3px]' : ''}`}>Free</span>
                                  ) : (
                                    <span className={!pincodeChecked ? 'blur-[3px]' : ''}>Applied</span>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                    <br />
                    <p>
                      <span>
                        For bulk quantity orders, contact
                        <span
                          onClick={() => {
                            navigation.push("/contact");
                          }}
                          className="text-red-500 font-bold hover:cursor-pointer"
                        >
                          {" "}
                          Materialbuy Team
                        </span>
                      </span>
                    </p>
                    </div> 
                  )}
            
                <div className={`w-full ${Styles.mobile_quantity}`}>
                { productDetails.norate == true || productDetails.hiderate == true ? (
                null
                  ) :   <div
                    className={`w-full flex justify-between ${
                      isMobileBulkOrderOpen ? "rounded-t" : "rounded"
                    } items-center px-2 py-2 bg-gray-200`}
                    onClick={() =>
                      setIsMobileBulkOrderOpen(!isMobileBulkOrderOpen)
                    }
                  >
                    <h1 className="font-semibold text-sm sm:text-base">Order Bulk Quantity</h1>
                    <BsChevronDown
                      className={`${
                        isMobileBulkOrderOpen ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </div> }

                  <div
className={`overflow-hidden transition-all duration-300 ${
  isMobileBulkOrderOpen ? "max-h-[300px]" : "max-h-0"
} border-x border-b rounded-b-lg ${isMobileBulkOrderOpen ? "border-gray-300" : "border-transparent"}`}
>
<div className="p-3 relative">
  {!pincodeChecked && (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50 backdrop-filter backdrop-blur-[1px] pointer-events-none">
      <div className="text-center p-3 bg-white shadow-sm rounded-lg border border-gray-200 mx-2 pointer-events-auto">
        <p className="text-blue-950 font-bold text-sm mb-1">
          Check pincode for accurate prices
        </p>
        <button 
          className="mt-1 bg-blue-950 text-white px-4 py-1 rounded text-xs font-medium"
          onClick={() => {
            const pincodeInput = document.querySelector('input[placeholder="Enter pincode"]');
            if (pincodeInput) pincodeInput.focus();
          }}
        >
          Enter Pincode
        </button>
      </div>
    </div>
  )}
  <div className="grid grid-cols-3 gap-2 md:gap-4 w-full px-1 sm:px-2">
    {Array.from({ length: 6 }, (_, i) => i + 1).map((index) => {
      const min = productDetails[`minimum${index}`];
      const max = productDetails[`maximum${index}`];
      const price = props.user?.corporate == true  
        ? productDetails[`proprice${index}`]
        : productDetails[`price${index}`];
      const isFree = productDetails[`free${index}`];

      if (!min || !max || !price) return null;

      const isSelected =
        quantityState.quantity >= JSON.parse(min) &&
        quantityState.quantity <= JSON.parse(max);

      return (
        <div
          key={index}
          className={`flex flex-col items-center justify-center p-2 rounded-lg shadow-sm border cursor-pointer transition-all duration-200 ${
            isSelected ? "bg-gray-200 border-slate-900" : "border-gray-300"
          } ${!pincodeChecked ? 'opacity-70 filter blur-[0.3px]' : ''}`}
          onClick={() => pincodeChecked && radiochangehandler(min, price)}
        >
          <input
            type="radio"
            name="radio2"
            className="hidden"
            checked={isSelected}
            onChange={() => radiochangehandler(min, price)}
            disabled={!pincodeChecked}
          />
          <h1 className={`text-xs sm:text-sm md:text-base font-medium ${isSelected ? "font-bold text-slate-900" : "text-gray-700"} truncate w-full text-center`}>
            {max == "-1" ? `${min} +` : `${min} - ${max}`}
          </h1>
          <h1 className={`text-xs sm:text-sm md:text-base font-semibold ${isSelected ? "text-red-600" : "text-gray-800"} ${!pincodeChecked ? 'blur-[3px]' : ''}`}>
            {productDetails.norate ? (
              <>₹{Number(productDetails.discountprice2B).toFixed(2)}</>
            ) : (
              <>₹{(Number(price) + Number(vendorPriceAtPincode || 0)).toFixed(2)}</>
            )}
          </h1>
          {isFree && (
            <span className={`text-xs text-green-600 mt-1 ${!pincodeChecked ? 'blur-[3px]' : ''}`}>Free Shipping</span>
          )}
        </div>
      );
    })}
  </div>
</div>
</div>
                </div>

                {productDetails.loading && (
                  <div>
                    <p>
                      *Unloading Charges will be in customer's scope, refer
                      &nbsp;
                      <Link
                        href="/shipping-policy"
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
                    // Show 'Get A Quote' button
                    <Button
                      className="bg-gray-600"
                      value="Get A Quote"
                      onClick={() => {
                        window.location.href = "/getaquote";
                        window.scrollTo(0, 0);
                      }}
                    />
                  ) : buttonValue == false ? (
                    <Button
                      className={`bg-gray-600 ${Styles.addtocardbtn} ${
                        !pincodeChecked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      value={buttonValue ? "Remove from cart" : "Add to cart"}
                      onClick={(e) => {
                        if (!pincodeChecked) {
                          notifyPincodeCheck();
                        
                          return;
                        }
                      
                        addtocardhandler(e);
                      }}
                      disabled={!pincodeChecked}
                    />
                  ) : (
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
                {productDetails.cancellable && (
        <Button
          className={`bg-blue-950 hover:bg-blue-800 w-full text-white py-2 px-4 rounded mt-3 transition-all duration-300`}
          value="Get Sample for ₹99"
          // ==> MBUY-AI: This now calls the new function to open the modal
          onClick={openSampleModal}
        />
      )}
                <br />

                <div className="flex mt-4">
                  <Link
                    href="/getaquote"
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
                    href="tel:+919226535176"
                    className="flex items-center ml-3 underline"
                    aria-label="Call to Order"
                  >
                    <HiMiniPhone className={`${Styles.iconss}`} /> Call To
                    Order
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-2">
              <div className={Styles.description}>
                <div className={`${Styles.divDescription} flex text-sm sm:text-base`}>
                  <h2
                    onClick={togglehandler}
                    className={
                      toggle === "Description"
                        ? "bg-white font-semibold px-2 rounded-tl-md py-2 border-r border-l border-t border-t-gray-400 border-r-gray-400 border-l-gray-400 truncate"
                        : "bg-gray-200 px-2 py-2 border-r rounded-tl-md border-l border-t border-t-gray-400 border-r-gray-400 border-l-gray-400 truncate"
                    }
                  >
                    Description
                  </h2>
                  <h2
                    onClick={togglehandler1}
                    className={
                      toggle === "Specification"
                        ? "bg-white font-semibold px-2 py-2 border-r border-r-gray-400 border-t border-t-gray-400 truncate"
                        : "bg-gray-200 px-2 py-2 border-r border-r-gray-400 border-t border-t-gray-400 truncate"
                    }
                  >
                    Specification
                  </h2>
                  {productDetails.cal ? (
                    <h2
                      onClick={togglehandler2}
                      className={
                        toggle === "Calculator"
                          ? "bg-white font-semibold px-2 rounded-tr-md py-2 border-r border-r-gray-400 border-t border-t-gray-400 truncate"
                          : "bg-gray-200 px-2 py-2 border-r  rounded-tr-md border-r-gray-400 border-t border-t-gray-400 truncate"
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
                    className={`${Styles.specifaction} md:flex spaxe-x-2 overflow-x-auto`}
                  >
                    <div
                      className={`text-sm sm:text-base break-words ${Styles.descriptiondiv}`}
                      dangerouslySetInnerHTML={{
                        __html: productDetails.description12,
                      }}
                    />
                  </div>
                ) : toggle === "Specification" ? (
                  <>
                    <div className={`${Styles.specifaction} overflow-x-auto`}>
                      <div
                        className={`text-sm sm:text-base break-words ${Styles.descriptiondiv}`}
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
                          <div className="flex items-center flex-col md:flex-row rounded">
                            <input
                              type="number"
                              className="border h-[50px] rounded-lg px-2 w-full md:w-auto mb-1 mt-2 md:mb-0 md:mt-5 "
                              value={userQuantValue}
                              onChange={(e) =>
                                setUserQuantValue(e.target.value)
                              }
                              placeholder={`enter value in ${productDetails.calculatorunit}`}
                            />
                            {/* <p>{productDetails.calculatorunit}</p> */}
                            <Button
                              value="Calculate"
                              className={` w-full md:w-auto md:ml-3 `}
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
              <div className="faq-section">
                <div
                  dangerouslySetInnerHTML={{ __html: productDetails.faq }}
                />
              </div>
              <div className="py-6">
                { freqB && freqB.length > 0 ? (
                  <div className="px-2 mt-2">
                    <div className="flex items-center relative w-full justify-center">
                      <h2 className="text-xl md:text-2xl lg:text-4xl font-bold tracking-wide mb-3">
                        Frequently Bought <span className="text-yellow-500">Together</span>
                      </h2>
                    </div>
                    
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
                        {freqB.slice(0, 6).map((product, index) => (
                          <div key={product._id || index} className="py-1 flex justify-center">
                            <div
                              className="relative flex flex-col h-full w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                              onClick={() => changeroute(product)}
                            >
                              <div className="relative h-32 w-full overflow-hidden">
                                <img
                                  src={product.imgs1 || "/placeholder.jpg"}
                                  alt={product.productname1 || "Product"}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="p-2">
                                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">
                                  {product.productname1 || "Product"}
                                </h3>
                                <div className="mt-1 flex items-center">
                                  <span className="text-red-600 font-bold">
                                    ₹{product.discountprice2B || "0.00"}
                                  </span>
                                  {product.price2A && (
                                    <span className="ml-1 text-xs text-gray-500 line-through">
                                      ₹{product.price2A}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No related products found
                  </div>
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

        
      </div>
    </div>

    {/* Sample Order Modal - Updated to be editable */}
    {showSampleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh]">
            <div className="px-4 py-5 sm:px-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">Order Sample</h3>
              <p className="mt-1 text-sm text-gray-600">Confirm details for your sample of {productDetails.productname1}</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Sample Price:</span>
                  <span className="font-semibold">₹{sampleFormData.sampleBasePrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">GST ({sampleFormData.gstPercentage}%):</span>
                  <span className="font-semibold">₹{sampleFormData.gstAmount}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-gray-900 font-bold">Total Payable:</span>
                  <span className="text-lg font-bold text-blue-950">₹{sampleFormData.totalPrice}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-950 focus:border-blue-950 sm:text-sm"
                    placeholder="Your full name"
                    value={sampleFormData.fullname}
                    onChange={handleSampleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address <span className="text-red-500">*</span></label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-950 focus:border-blue-950 sm:text-sm"
                    placeholder="Enter your full shipping address"
                    value={sampleFormData.address}
                    onChange={handleSampleInputChange}
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-950 focus:border-blue-950 sm:text-sm"
                    placeholder="Contact number for delivery"
                    value={sampleFormData.phone}
                    onChange={handleSampleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-5 flex flex-col sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  onClick={processSampleOrder}
                  disabled={isLoadingSample || !sampleFormData.address || !sampleFormData.phone || !sampleFormData.fullname}
                  className={`w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:text-sm transition-colors ${
                    isLoadingSample || !sampleFormData.address || !sampleFormData.phone || !sampleFormData.fullname
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-950 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-950"
                  }`}
                >
                  {isLoadingSample ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ₹${sampleFormData.totalPrice}`
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSampleModal(false)}
                  className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    
    {/* Bulk Order Modal */}
    {showBulkOrderModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="px-4 py-5 sm:px-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Bulk Order Request</h3>
            <p className="mt-1 text-sm text-gray-600">For large quantity orders, please contact our team</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4 text-center">
              <div className="mx-auto  flex items-center justify-center">
                <Image src={"/Bulk-order.png"} alt="Bulk Order" width={100} height={100} />
              </div>
              <h4 className="text-xl font-bold">Need to order in bulk?</h4>
              <p className="text-gray-600">
                For orders exceeding {productDetails.maxord11B} units, please contact the MaterialBuy Team directly for customized pricing and delivery options.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a 
                  href="tel:+919226535176" 
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-950 hover:bg-blue-800 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </a>
                <a 
                  href="mailto:info@materialbuy.com" 
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => setShowBulkOrderModal(false)}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
  export default ProductDetails;
