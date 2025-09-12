import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import Styles from "./Cart.module.css";
import Button from "../components/UI/Button";
import { Link, json } from "react-router-dom";
import Cartcard from "../components/UI/Cart_card";
import { useSelector, useDispatch } from "react-redux";
import { editItemToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from 'nanoid';
import axios from "axios";

import ChangeAddress from "../components/UI/ChangeAddress";
import {
  postCart,
  getUser,
  postOrderPayment,
  getPromoCodes,
  getCssDeals,
  shippingPrice,
  getBuyerdata,
  paymentStatus
} from "../apis/api";

let shippingresult = [];
let notdel = [];
let disdod = 0;
let discss = 0;
let Value = 0;


const Cart = () => {
  const cart = useSelector((state) => state.cartlist);
  const [btnvalue, setBtnValue] = useState("Calculate Cart");
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showchangeaddress, setShowChangeAddress] = useState(false);
  const [address, setAddress] = useState({});
  const [shippingaddress, setShippingAddress] = useState();
  const [shippingaddresspin, setShippingAddresspin] = useState();
  const [billingaddresspin, setBillingAddresspin] = useState();
  const [billingname, setBillingName] = useState();
  const [discount, setDiscount] = useState();
  const [discountDOD, setDiscountDOD] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [billingaddress, setBillingAddress] = useState();
  const [promoCode, setPromoCode] = useState(0);
  const [promoCodeError, setPromoCodeError] = useState(0);
  const [promoCodeSuccess, setPromoCodeSucess] = useState(0);

  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [originalPriceArr, setOriginalPriceArr] = useState([]);

  const [promoCodeState, setPromoCodeSate] = useState();
  const [totalDiscount, setTotalDiscount] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {}
  );
  const [totalShippingCost, setTotalShippingCost] = useState("to be calculated");
  const [pincheck, setpincheck] = useState(true);


  const [formData, setFormData] = useState({
    pincode: '403501',
    productid: '65a61f463245d300343aa79d',
    variantid: '65ac137d301cd30034a25301',
    quantity: 120,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBtnValueChange = (newValue) => {
    setBtnValue("Calculate Cart");
    setTotalShippingCost("To be calculated")
    shippingresult = [];
  };

  const checkCssDeals = async (product) => {
    try {
      const response = await getCssDeals(`category=${product.categoryid}`);
      const data = response.data;
      console.log(data);
      // console.log({ data });
      const isSubsubCategory = data.find(
        (item) => item.subsubcategory === product.subsubcategory
      );
      if (isSubsubCategory) {
        setDiscount(+isSubsubCategory.percentage);
        setDiscountDOD(0)
        discss = (+isSubsubCategory.percentage);
        disdod = 0;
      }
      const isSubCategory = data.find(
        (item) => item.subcategory === product.subcategory
      );
      // console.log({ isSubCategory, product: product });
      if (isSubCategory) {
        setDiscount(+isSubCategory.percentage);
        setDiscountDOD(0)
        discss = (+isSubCategory.percentage);
        disdod = 0;

      }
      const category = data.find(
        (item) => item.category === product.categoryid
      );
      if (category) {
        setDiscount(+category.percentage);
        setDiscountDOD(0)
        discss = (+category.percentage);
        disdod = 0;

      }
    } catch (error) {
      console.log(error);
    }
  };




  const makeApiCall = async (response, item) => {
    try {
      let formData={};
      if (item.mainProductId) {
        formData = {
          pincode:shippingaddresspin || '',
          productid: item.mainProductId || '',
          variantid: item._id || '',
          quantity: parseInt(item.quantity, 10) || 0,
        };
      } else {
        formData = {
          pincode: shippingaddresspin || '',
          productid: item._id || '',
          variantid: item._id || '',
          quantity: parseInt(item.quantity, 10) || 0,
        };
      }

      console.log(formData);
      
      

      
      const apiResponse = await fetch('https://logistic.mbuybackend.in/api/shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      const data = await apiResponse.json();
      // console.log(data)
      let vendordetail = data.vendorWareHouse;
      let VEND0 = vendordetail[0] ? vendordetail[0].vendorid : "NA";
      let VEND1 = vendordetail[1] ? vendordetail[1].vendorid : "NA";
      let VEND2 = vendordetail[2] ? vendordetail[2].vendorid : "NA";
      let VEND3 = vendordetail[3] ? vendordetail[3].vendorid : "NA";
      let VEND4 = vendordetail[4] ? vendordetail[4].vendorid : "NA";
      let VEND5 = vendordetail[5] ? vendordetail[5].vendorid : "NA";
      let VEND6 = vendordetail[6] ? vendordetail[6].vendorid : "NA";

      function addArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) {
          throw new Error("Arrays must have the same length");
        }
        let result = [];
        for (let i = 0; i < arr1.length; i++) {
          const num1 = typeof arr1[i] === 'string' ? parseFloat(arr1[i]) : arr1[i];
          const num2 = typeof arr2[i] === 'string' ? parseFloat(arr2[i]) : arr2[i];
          result.push(num1 + num2);
        }
        return result;
      }
      const sumArray = addArrays(data.shipCost, data.pricesresult);
      // console.log(sumArray);

      function findIndexOfMinValue(array) {
        let minValue = array[0];
        let minIndex = 0;
        for (let i = 1; i < array.length; i++) {
          if (array[i] < minValue) {
            minValue = array[i];
            minIndex = i;
          }
        }
        return minIndex;
      }

      const minIndex = findIndexOfMinValue(sumArray);
      // console.log("Index of minimum value:", minIndex);

      let selected = vendordetail[minIndex] ? vendordetail[minIndex].vendorid : "NA";
      let selectedware = vendordetail[minIndex] ? vendordetail[minIndex].warehouseid : "NA";

      const shipCostValue = data.shipCost[minIndex];
      console.log(`Shipping cost for item ${item._id}: ${shipCostValue}`);
      // console.log(item.dod);
      if (item?.dod) {
        // console.log(item.discount)
        disdod = (item.discount);
        discss = 0;
        // console.log(discountDOD);
      } else {
        await checkCssDeals(item);
      }
      Value = item.cartvalue - (totalDiscount[item._id] ?? 0);
      // console.log(discss, disdod);
      // console.log(Value);

      const shippingDetails = {
        productid: item?.mainProductId || '',
        variantid: item?._id || '',
        productname: item?.productname1 || '',
        shippingCost: shipCostValue,
        shippingType: data.shipType,
        boxes: data.boxDetails,
        DOD: disdod,
        CSS: discss,
        quantity: item.quantity,
        Promo: promoCodeState,
        Price: Value,
        vendor0: VEND0,
        vendor1: VEND1,
        vendor2: VEND2,
        vendor3: VEND3,
        vendor4: VEND4,
        vendor5: VEND5,
        vendor6: VEND6,
        pincode: shippingaddresspin,
        selectedvendor: selected,
        selectedware: selectedware,
        gst: item.taxpercent3,

      };
      // shippingresult.push(shippingDetails);

      return { shipCostValue, shippingDetails };
    } catch (error) {
      shippingresult = [];
      alert("something went wrong")
      console.error('Error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const nodelproduct = () => {
    for (const i of notdel) {
      removeitemhandler(i._id);
    }
    setIsOpen(false);
    notdel = [];
  }



  const removeitemhandler = (id) => {
    const productDetails = cart.cart.find((item) => item._id === id);
    dispatch(editItemToCart({ productDetails, quantity: 0 }));

  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const getuser = async (id) => {
      const response = await getUser(id);
      // console.log(response);
      if (response.status === 200) {
        setUser(response?.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        if (response.data.shippingaddress1 && response.data.shippingpincode1) {
          setShippingAddress(
            `${response.data.shippingaddress1}, ${response.data.shippingpincode1}`
          );
          setBillingAddress(`${response.data.billingaddress1}, ${response.data.billingpincode1}`);
          setShippingAddresspin(
            `${response.data.shippingpincode1}`
          )
          setBillingAddresspin(
            `${response.data.billingpincode1}`
          )
          setBillingName(
            `${response.data.billingname1}`
          )
        }
      }
    };
    if (user) {
      getuser(user._id);
    }else{
      navigate("/login");
    }
  }, []);

  const routechangehandler = () => {
    navigate("/allproducts/categories");
  };
  const [isLoading, setIsLoading] = useState(false);

  const changebtnvalue = async () => {
    
    setIsLoading(true);
    if (btnvalue === "Confirm Order" && user && shippingaddress) {
     

      const cartProds = cart.cart.map((item) => {
        // console.log(item);
        const productObj = {};
        if (item.mainProductId) {
          productObj.productid = item.mainProductId;
          productObj.vairanceid = item._id;
          productObj.productname = item.productname1;
          console.log(productObj)
        } else {
          productObj.productid = item._id;
          productObj.productname = item.productname1;
        }
        productObj.quantity = item.quantity;
        productObj.vendorid = "";
        productObj.warehouseid = "";
        if (item.price) {
          productObj.price = item.price;
        } else {
          productObj.price = ""; // Default price if not provided
        }
        return productObj;
      });


      const shipdet = shippingresult.map((shippingDetail) => {
        let boxesString = '';
        if (typeof shippingDetail.boxes === 'object') {
          // Convert object to string representation
          boxesString = Object.keys(shippingDetail.boxes)
            .map(key => `${key}[${shippingDetail.boxes[key]}`)
            .join(',');
        } else {
          boxesString = shippingDetail.boxes.toString();
        }
        const data = `productid+${shippingDetail.productid}|variantid+${shippingDetail.variantid}|shippingCost+${shippingDetail.shippingCost}|shippingType+${shippingDetail.shippingType}|DOD+${shippingDetail.DOD}|CSS+${shippingDetail.CSS}|Promo+${shippingDetail.Promo}|Price+${shippingDetail.Price}|gst+${shippingDetail.gst}|quantity+${shippingDetail.quantity}|pincode+${shippingDetail.pincode}|vendor1+${shippingDetail.vendor0}|vendor2+${shippingDetail.vendor1}|vendor3+${shippingDetail.vendor2}|vendor4+${shippingDetail.vendor3}|vendor5+${shippingDetail.vendor4}|vendor6+${shippingDetail.vendor5}|vendor7+${shippingDetail.vendor6}|selectedvendor+${shippingDetail.selectedvendor}|selectedware+${shippingDetail.selectedware}|boxes+${boxesString}`;
        // console.log(data);
        return data;
      });



      const datadere = shipdet.join("-");
      // console.log(datadere);


      const paymentdetail = {

        amount: parseFloat(
          grand_total
        )
          .toFixed(2),
        user: user,
        products: cartProds,
        Shippingaddress: shippingaddress,
        Shippingpin: shippingaddresspin,
        GSTno: `${user.gst}`,
        PANno: `${user.pan}`,
        UserName: `${user.username}`,
        Mobileno: `${user.phoneno}`,
        BillingName: `${billingname}`,
        BillingEmail: `${user.email}`,
        shippingdetail: shippingresult,
        BillingAddress: `${billingaddress}`,
        Billingpin: `${billingaddresspin}`,

      };

      console.log("paymentdetai", paymentdetail);

      const order = async () => {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        

        try {
          if (paymentdetail) {
            console.log(paymentdetail);
            const res = await paymentStatus(paymentdetail);
            if (res.status == 200) {
              const datatoencode = {
                merchant_id: "3182319",
                language: "EN",
                currency: "INR",
                dataid: res.data,
                order_id: nanoid(10),
                billing_name: `${paymentdetail.BillingName}`,
                billing_email: `${paymentdetail.BillingEmail}`,
                billing_tel: `${paymentdetail.Mobileno}`,
                delivery_address: `${paymentdetail.Shippingaddress}`,
                dilivery_zip: `${paymentdetail.Shippingpin}`,
                billing_zip: `${paymentdetail.Billingpin}`,
                billing_address: `${paymentdetail.BillingAddress}`,
                // order_id: uuidv4(),
                amount: parseFloat(

                  grand_total
                )
                  .toFixed(2),
                // redirect_url: `http:/localhost:8000/api/orders/response/check`,
                // cancel_url: `http:/localhost:8000/api/orders/response/check`,
                redirect_url: `https://walrus-app-6xm2k.ondigitalocean.app/admin-backend2/api/orders/response/check`,
                cancel_url: `https://walrus-app-6xm2k.ondigitalocean.app/admin-backend2/api/orders/response/check`,

              }
              const response = await postOrderPayment(datatoencode);
              // console.log(response);
              if (response.data) {
                const encRequest = response.data
                var accessCode = 'AVCN54LB03AB47NCBA'; //AVMM05LB50AB41MMBA
                // console.log("redirecting now:");
                const form = document.createElement('form');
                form.id = 'nonseamless';
                form.method = 'post';
                form.name = 'redirect';
                form.action = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction`;

                const encRequestInput = document.createElement('input');
                encRequestInput.type = 'hidden';
                encRequestInput.id = 'encRequest';
                encRequestInput.name = 'encRequest';
                encRequestInput.value = encRequest;
                form.appendChild(encRequestInput);

                const accessCodeInput = document.createElement('input');
                accessCodeInput.type = 'hidden';
                accessCodeInput.name = 'access_code';
                accessCodeInput.id = 'access_code';
                accessCodeInput.value = accessCode;
                form.appendChild(accessCodeInput);

                const authHeaderInput = document.createElement('input');
                authHeaderInput.type = 'hidden';
                authHeaderInput.name = 'Authorization';
                authHeaderInput.value = headers.Authorization;
                form.appendChild(authHeaderInput);

                const script = document.createElement('script');
                script.language = 'javascript';
                script.textContent = 'document.redirect.submit();';
                form.appendChild(script);

                document.body.appendChild(form);
              } else {
                // Handle error response
                console.error('Encrypted data not found');
              }
            } else {
              alert(res.error)
            }



          }
          else {
            alert("Payment Detail not found");
          }
        } catch (err) {
          console.log(err);
        }
      };
      order();

      toast.success("redirect to payment gateway");
      // cart.cart.forEach((item) => {
      //   removeitemhandler(item._id);
      // });
    }

    if (btnvalue === "Confirm Order" && !user) {
      toast.error("Please login to continue");
      navigate("/login");
    }
    if (btnvalue === "Confirm Order" && !user.shippingaddress1) {
      toast("Please update your address");
      navigate("/manageaddress");

    } if (btnvalue !== "Confirm Order" && !user.shippingaddress1) {
      toast("Please update your address");
      navigate("/manageaddress");
    }
    else if (btnvalue !== "Confirm Order") {
      
      const response = await getUser(user._id);
      const checkdel = await checkpincode(cart.cart)
      if (checkdel.allProductsDeliverable) {
        console.log("All products deliverable");
        const totalShippingCost = await calculateTotalShippingCost(response, cart.cart);
        // console.log(pincheck);
        if (!isNaN(totalShippingCost) && (shippingresult.length == cart.cart.length)) {
          setIsLoading(false);


          const postcart = async () => {
            const response = await postCart(cart);
            if (response.status === 200) {
              // console.log("cart posted successfully");
              setBtnValue("Confirm Order");
            } else {
              alert.error("unable to post cart");
              shippingresult = [];
            }
          };
          postcart();
        }
        else {
          alert.error("Something went wrong, Contact MaterialBuy Team")
          window.location.reload();
        }

      } else {
        notdel = checkdel.undeliverableProducts
        setIsLoading(false);
        setIsOpen(true);

      }
    }
  };


  const togglePopup = () => {
    setIsOpen(false);
    notdel = [];
  };


  const calculateTotalShippingCost = async (userResponse, cartItems) => {
    // console.log('Calculating total shipping cost...');
    let totalShippingCost = 0;

    for (const item of cartItems) {
      let { shipCostValue, shippingDetails } = await makeApiCall(userResponse, item);
      console.log(shippingDetails, "shippingDetails");
      // console.log(item)
      let shippingCost = shipCostValue;

      const checkQuantityRange = (item) => {
        let result;
        // console.log(item.quantity)
        if (parseInt(item.quantity) >= parseInt(item.minimum1) && parseInt(item.quantity) <= parseInt(item.maximum1)) {
          // console.log(item.quantity, item.minimum1, item.maximum1);
          result = 1;
        } else if (parseInt(item.quantity) >= parseInt(item.minimum2) && parseInt(item.quantity) <= parseInt(item.maximum2)) {
          result = 2;
        } else if (parseInt(item.quantity) >= parseInt(item.minimum3) && parseInt(item.quantity) <= parseInt(item.maximum3)) {
          result = 3;
        } else if (parseInt(item.quantity) >= parseInt(item.minimum4) && parseInt(item.quantity) <= parseInt(item.maximum4)) {
          // console.log(item.quantity, item.minimum4, item.maximum4);
          result = 4;
        } else if (parseInt(item.quantity) >= parseInt(item.minimum5) && parseInt(item.quantity) <= parseInt(item.maximum5)) {
          result = 5;
        } else if (parseInt(item.quantity) >= parseInt(item.minimum6) && parseInt(item.quantity) <= parseInt(item.maximum6)) {
          result = 6;
        } else {
          // Quantity is not in any of the specified ranges
          result = null; // or any other value or action you want
        }

        return result;
      };
      const rangeResult = await checkQuantityRange(item);

      // console.log(rangeResult);
      const propertyName = `free${rangeResult}`;
      // console.log(propertyName)
      // console.log(item.free5)
      // console.log(item[propertyName])

      if (item[propertyName]) {
        shippingCost = 0;
        shippingDetails.freeShip = true;
      } else {
        shippingDetails.freeShip = false;
      }

      shippingresult.push(shippingDetails);

      // console.log("shipping cost after calculating quantity :", shippingCost)
      totalShippingCost += shippingCost;
      // console.log(totalShippingCost)
    }

    setTotalShippingCost(parseFloat(totalShippingCost));
    return totalShippingCost;
  };


  const showshipchangeaddresshandler = () => {
    if (user) {
      setAddress({
        address1: user?.shippingaddress1,
        pincode1: user?.shippingpincode1,
        address2: user?.shippingaddress2,
        pincode2: user?.shippingpincode2,
        address3: user?.shippingaddress3,
        pincode3: user?.shippingpincode3,
        address4: user?.shippingaddress4,
        pincode4: user?.shippingpincode4,
        address5: user?.shippingaddress5,
        pincode5: user?.shippingpincode5,
      });
      setShowChangeAddress(!showchangeaddress);
    }
  };

  const showbillchangeaddresshandler = () => {
    if (user) {
      setAddress({
        address1: user?.billingaddress1,
        pincode1: user?.billingpincode1,
        address2: user?.billingaddress2,
        pincode2: user?.billingpincode2,
        address3: user?.billingaddress3,
        pincode3: user?.billingpincode3,
        address4: user?.billingaddress4,
        pincode4: user?.billingpincode4,
        address5: user?.billingaddress5,
        pincode5: user?.billingpincode5,
        name1: user?.billingname1,
        name2: user?.billingname2,
        name3: user?.billingname3,
        name4: user?.billingname4,
        name5: user?.billingname5,
      });
      setShowChangeAddress(!showchangeaddress);
    }
  };

  const checkpincode = async (cart) => {
    let undeliverableProducts = []; // Array to store undeliverable products
    let allProductsDeliverable = true; // Assume all products are deliverable by default

    for (const item of cart) {
      const pincode = shippingaddresspin;
      // console.log(pincode);

      const response = await getBuyerdata();
      // console.log(response);
      const dataArray = response;

      const isPincodeFound = dataArray.some((dict) => dict.pin === pincode);
      // console.log(isPincodeFound);

      if (!pincode) {
        alert.error('No pincode found');
        return { allProductsDeliverable: false, undeliverableProducts: [] }; // No pincode, all products undeliverable
      } else if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
        alert.error('Invalid pincode');
        return { allProductsDeliverable: false, undeliverableProducts: [] }; // Invalid pincode, all products undeliverable
      } else {
        const isPincodeInExcpins = item.excpins.includes(pincode);

        if (isPincodeInExcpins) {
          toast.error("Sorry we don't deliver to this address")
          undeliverableProducts.push({ _id: item._id, productName: item.productname1 }); // Add undeliverable product to list
          allProductsDeliverable = false; // At least one product is undeliverable
        } else {
          if (!isPincodeFound) {
            toast.error("Sorry we don't deliver to this address")
            undeliverableProducts.push({ _id: item._id, productName: item.productname1 }); // Add undeliverable product to list
            allProductsDeliverable = false; // At least one product is undeliverable
          }
        }
      }
    }

    return { allProductsDeliverable, undeliverableProducts }; // Return result
  };


  const changeaddui = (data) => {
    setShowChangeAddress(data);
  };

  const saveAddress = (data) => {
    if (data.shippingaddress) {
      // console.log(data.shippingaddress);
      // console.log(data.shippin);

      setShippingAddress(data.shippingaddress);
      setShippingAddresspin(data.shippin);
      handleBtnValueChange();


    } else if (data.billingaddress) {
      setBillingAddress(data.billingaddress);
      setBillingAddresspin(data.billingpin);
      handleBtnValueChange();
    }
  };
  // console.log(totalDiscount);
  const totalDiscount_price = Object.values(totalDiscount).reduce(
    (a, b) => a + b,
    0
  );
  const sub_total_display =
    cart.cart.reduce((acc, curr) => acc + JSON.parse(curr.cartvalue), 0) -
    totalDiscount_price;

  const [price_arr, set_price_arr] = useState([]);

  const calculatePriceArr = () => {
    const updatedPriceArr = cart.cart.map((item) => +item.cartvalue - (totalDiscount[item._id] ?? 0));
    set_price_arr(updatedPriceArr);
    handleBtnValueChange();
    // console.log(price_arr)
    setOriginalPriceArr([...updatedPriceArr]);
  };

  // Call the function during the initial render
  useEffect(() => {
    calculatePriceArr();
  }, []);

  // Update price_arr when cart.cart changes
  useEffect(() => {
    calculatePriceArr();
  }, [cart.cart, totalDiscount]);


  //   const [userData, setUserData] = React.useState({
  //     pincode: "",
  //     productid: "",
  //     variantid: "",
  //     quantity: "",
  //   });

  //   useEffect(() => {
  //     const user = JSON.parse(localStorage.getItem("user"));

  //     const getDetailsForItem = async (item) => {
  //       const response = await getUser(user._id);
  //       const { mainProductId, _id, quantity } = item;
  //       setUserData((prevUserData) => ({
  //         ...prevUserData,
  //         pincode: response.data.shippingpincode1,
  //         productid: mainProductId,
  //         variantid: _id,
  //         quantity: quantity,
  //       }));
  //     };
  //     console.log(userData)

  //     const fetchDetailsForAllItems = async () => {
  //   if (user) {
  //     // Create an array of promises for fetching details
  //     const promises = cart.cart.map((item) => getDetailsForItem(item));

  //     // Wait for all promises to resolve
  //     await Promise.all(promises);

  //     // After populating userData for all items, send it to the API
  //     try {
  //       const response = await shippingPrice(userData);

  //       if (response.status === 200) {
  //         console.log(response);
  //       } else if (response.status === 500) {
  //         console.log("Failed to fetch");
  //       }
  //     } catch (error) {
  //       console.error('Error while making API request:', error);
  //       // Handle the error as needed
  //     }
  //   }
  // };
  //     fetchDetailsForAllItems();
  //   }, [cart.cart, getUser, localStorage.getItem("user"), userData]);





  // console.log(cart.cart)

  const sub_total = price_arr.reduce((acc, curr) => acc + curr, 0);

  const estimated_tax = cart.cart.reduce((acc, curr, index) => {
    // console.log(price_arr)
    // console.log(index)
    // console.log(price_arr[index])
    return acc + (price_arr[index] * curr.taxpercent3) / 100;
  }, 0);

  // const promoCode_discount = (sub_total * promoCode) / 100;
  // const estimated_tax = (sub_total * estimated_tax_percent) / 100;
  const sub_total_with_tax =
    price_arr.reduce((a, b) => a + b, 0) + estimated_tax + totalShippingCost;
  const grand_total = parseFloat(sub_total_with_tax).toFixed(2);

  const promoCodeBtnHandler = async () => {
    const promoCode = promoCodeState;
    // console.log(promoCodeState);
    if (promoCodeApplied) {
      // Logic to remove the applied promo code
      setPromoCode(null);
      set_price_arr([...originalPriceArr]);// Reset price_arr to initial values
      setPromoCodeApplied(false);
      setPromoCodeSate("");
      handleBtnValueChange()// Clear the input field
      return;
    }


    if (!promoCode || promoCode.trim() === "") return;
    try {
      const response = await getPromoCodes();
      if (response.status === 200) {
        // console.log(promoCodeError);
        // console.log(response);


        // console.log(response, "api hitted");
        const isPromoCodeAvailable = response.data.find(
          (item) => item.codename === promoCode
        );
        // console.log(isPromoCodeAvailable);


        // console.log({ DateRange });
        if (!isPromoCodeAvailable) setPromoCodeError("Invalid Promocode");
        // const DateRange =
        //   new Date(isPromoCodeAvailable.ended) -
        //   new Date(isPromoCodeAvailable.started);
        else if (

          new Date(isPromoCodeAvailable.ended) - new Date(isPromoCodeAvailable.started) <= 0 ||
          !isPromoCodeAvailable.currentstatus ||
          !+isPromoCodeAvailable.noofusers ||
          sub_total < +isPromoCodeAvailable.mini
        )
          setPromoCodeError("Promocode Expired");
        else {
          setPromoCodeError(null);
          if (isPromoCodeAvailable.type === "Amount") {
            const index = price_arr.indexOf(Math.max(...price_arr));
            // console.log({ index });
            setPromoCode(+isPromoCodeAvailable.discount);
            set_price_arr((prev) => {
              const clone = [...prev];
              clone[index] -= +isPromoCodeAvailable.discount;
              handleBtnValueChange()
              return clone;
            });
          } else {
            setPromoCode(
              price_arr.reduce(
                (a, b) => a + (b * +isPromoCodeAvailable.discount) / 100,
                0
              )
            );
            set_price_arr((prev) => {
              const clone = [...prev];
              handleBtnValueChange()
              return clone.map(
                (item) => item - (item * +isPromoCodeAvailable.discount) / 100
              );
            });
          }
          // const price_arr = cart.cart.map((item) => {
          //   const after_discount =
          //     +item.cartvalue - (totalDiscount[item._id] ?? 0);
          //   return { item, price: after_discount };
          // });

          // const after_promo = price_arr.map(({ item, price }) => {
          //   if (isPromoCodeAvailable.type === "Amount") {
          //     if (price === Math.max(...price_arr.map(({ price }) => price))) {
          //       price -= +isPromoCodeAvailable.discount;
          //     }
          //   } else {
          //     price -= price * +isPromoCodeAvailable.discount;
          //   }
          //   return { price, item };
          // });

          // const after_gst = after_promo.map(({ item, price }) => {
          //   const tax = price * +item.taxpercent3;
          //   price += tax;
          //   return { price, tax };
          // });

          // setTax(after_gst.reduce((a, b) => a + b.tax, 0));
          // setDiscount(after_gst.reduce((a, b) => a + b.price, 0));
          // setPromoCode(
          //   isPromoCodeAvailable.type === "Amount"
          //     ? +isPromoCodeAvailable.discount
          //     : price_arr.reduce(
          //         (a, b) => a + b * +isPromoCodeAvailable.discount,
          //         0
          //       )
          // );
          // console.log({ price_arr });
        }
        handleBtnValueChange()
        setPromoCodeApplied(true);
        setPromoCodeSucess("Promocode Applied Succesfully");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>

      <div>
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-4">No delivery for these products</h2>
              <ul className="mb-4">
                {notdel.map((product, index) => (
                  <li key={index}>{product.productName}</li>
                ))}
              </ul>
              <div className="flex gap-4">
                <button onClick={togglePopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Close
                </button>
                <button onClick={nodelproduct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Remove from cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>


      <ChangeAddress
        active={showchangeaddress}
        hide={changeaddui}
        address={address}
        getuserchoice={saveAddress}
      />
      <Layout>
        <Fullcontainer className={Styles.fullcontainer}>
          <Container className={`${Styles.container}`}>
            <div
              className={`col-span-10 ${Styles.cart_header} flex items-center flex-col justify-between md:flex-row`}
            >
              <div className="flex items-center">
                <h1 className={`${Styles.headtitle} mr-2 mt-0`}>
                  Shopping Cart
                </h1>
                <p>
                  ({cart.cart.length} {cart.cart.length > 1 ? "items" : "item"})
                </p>
              </div>
            </div>
            <div
              className={`${Styles.cart_section} flex flex-col md:flex-row w-full mt-2`}
            >
              {cart.cart.length ? (
                <div
                  className={`col-span-7 ${Styles.cart_side} flex flex-col break-words rounded px-3 py-2 mr-2`}
                >
                  {cart.cart.map((item, index) => (
                    <Cartcard
                      imgValue={item.imgs1}
                      key={item._id}
                      product={item}
                      updateTotalDiscount={setTotalDiscount}
                      removeitem={removeitemhandler}
                      className={
                        index === cart.cart.length - 1 ? Styles.lastcard : ""
                      }
                      onBtnValueChange={handleBtnValueChange}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <h1
                    className={`text-xl border rounded flex flex-col w-full py-40 items-center justify-center`}
                  >
                    Your shopping cart is currently empty.
                    <Button
                      value="Shop Now"
                      onClick={routechangehandler}
                    ></Button>
                  </h1>
                </>
              )}
              {cart.cart.length ? (
                <div
                  className={`col-span-3 ${Styles.cart_main} flex flex-1 flex-col break-words rounded px-3 py-2 `}
                >
                  {user ? (
                    <>
                      <p>
                        <span className={`font-semibold`}>Ship to: </span>{" "}
                        {/* {user?.shippingaddress}, Pincode:{" "}
                        {user?.shippingpincode} */}
                        {shippingaddress}
                      </p>
                      <Link
                        className={`text-right underline ${Styles.changeaddbtn}`}
                        to="#"
                        onClick={showshipchangeaddresshandler}
                      >
                        Change Shipping Address
                      </Link>
                      <p>
                        <span className={`font-semibold`}>Bill to: </span>{" "}
                        {/* {user?.billingaddress} */}
                        {billingaddress}
                      </p>
                      <Link
                        className={`text-right underline ${Styles.changeaddbtn}`}
                        to="#"
                        onClick={showbillchangeaddresshandler}
                      >
                        Change Billing Address
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  {/* <p>
                  <span className={`font-semibold`}>Ship to: </span>{" "}
                  {user?.shippingaddress}, Pincode: {user?.shippingpincode}
                </p>
                <Link className={`text-right underline`} to="#">
                  Change Shipping Address
                </Link>
                <p>
                  <span className={`font-semibold`}>Bill to: </span>{" "}
                  {user?.billingaddress}
                </p>
                <Link className={`text-right underline`} to="#">
                  Change Billing Address
                </Link> */}
                  <div className={`flex justify-between mt-3`}>
                    <p className={`font-semibold`}>Subtotal:</p>
                    <p>₹{(!promoCode ? sub_total : sub_total_display).toFixed(2)} </p>
                  </div>
                  {/* <div className={`flex justify-between`}>
                  <p className={`font-semibold`}>Shipping:</p>
                  <p>FREE</p>
                </div> */}

                  {promoCode > 0 && (
                    <div className={`flex justify-between`}>
                      <p className={`font-semibold`}>Promo Code Discount:</p>
                      <p className="text-green-500">- ₹{promoCode}</p>
                    </div>
                  )}
                  <div className={`flex justify-between`}>
                    <p className={`font-semibold`}>Estimated Tax:</p>
                    <p>+ ₹{estimated_tax.toFixed(2)}</p>
                  </div>
                  <div className={`flex justify-between`}>
                    <p className={`font-semibold`}>Shipping Cost:</p>
                    {isLoading && (
                      <div>
                        {/* You can use a spinner or any other loading UI */}
                        Loading...
                      </div>
                    )}
                    {!isLoading && (
                      <div>
                        {/* You can use a spinner or any other loading UI */}
                        {totalShippingCost}
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex justify-between text-xl font-semibold mt-1 py-2 ${Styles.grand_total}`}
                  >
                    <h1>Grand Total:</h1>
                    <h1>₹{grand_total} /-</h1>
                  </div>
                  <div className={`flex flex-col`}>
                    <p>Do you have a Promo Code?</p>
                    <div className={``}>
                      <input
                        type="text"
                        value={promoCodeState}
                        onChange={({ target }) =>
                          setPromoCodeSate(target.value)
                        }
                        className={`${Styles.promo_code_input}`}
                        placeholder="ADD PROMOCODE"
                        disabled={promoCodeApplied}
                      />
                      <button
                        onClick={promoCodeBtnHandler}
                        className={`${Styles.apply_button}`}
                      >
                        {promoCodeApplied ? "Remove" : "Apply"}
                      </button>
                      {promoCodeError ? (
                        <p className="text-red-500">{promoCodeError}</p>
                      ) : promoCodeSuccess ? (
                        <p className="text-green-500">{promoCodeSuccess}</p>
                      ) : ""}

                    </div>

                    <Button value={`${btnvalue} Hello`} onClick={changebtnvalue}> </Button>

                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Container>
        </Fullcontainer>
      </Layout>
    </>
  );
};

export default Cart;
