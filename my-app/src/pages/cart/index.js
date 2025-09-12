import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import Layout from "@/Layouts/Layout";
import Fullcontainer from "@/components/UI/Fullcontainer";
import Container from "@/components/UI/Container";
import Styles from "./Cart.module.css";
import Button from "@/components/UI/Button";
// import { Link, json } from "react-router-dom";
import Link from "next/link";
import Cartcard from "@/components/UI/Cart_card";
import { useSelector, useDispatch } from "react-redux";
import { editItemToCart, recalculateAllCartValues } from "@/store/Slices/cartSlice";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { v4 as uuidv4 } from "uuid";
import { nanoid } from 'nanoid';
// import axios from "axios";
import dynamic from "next/dynamic";
import {updateVendorPrice} from "@/store/Slices/cartSlice";
import ChangeAddress from "@/components/UI/ChangeAddress";
import {
  postCart,
  getUser,
  postOrderPayment,
  getPromoCodes,
  getCssDeals,
  getBuyerdata,
  paymentStatus
} from "@/apis/api";
let shippingresult = [];
let notdel = [];
let disdod = 0;
let discss = 0;
let Value = 0;


const Cart = () => {
  const cart = useSelector((state) => state.cartlist);
  console.log(cart," cart");
  const [btnvalue, setBtnValue] = useState("Calculate Cart");
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useRouter();
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
  const [pincodeMismatchModal, setPincodeMismatchModal] = useState(false);
const [mismatchedProducts, setMismatchedProducts] = useState([]);
const [pincodeChecked, setPincodeChecked] = useState(false);
const [resultMessage, setResultMessage] = useState("");
const [ expcheckpincode, setExpcheckpincode] = useState(false);
const [pinCodeState, setPinCodeState] = useState(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [originalPriceArr, setOriginalPriceArr] = useState([]);
  const [vendorPriceAtPincode , setVendorPriceAtPincode] = useState(0);
  const [selectedShippingAddressIndex, setSelectedShippingAddressIndex] = useState(1); // Default to first address
  const [selectedBillingAddressIndex, setSelectedBillingAddressIndex] = useState(1); // Default to first address

  const [promoCodeState, setPromoCodeSate] = useState();
  const [totalDiscount, setTotalDiscount] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {}
  );
  const [totalShippingCost, setTotalShippingCost] = useState("to be calculated");
  const [pincheck, setpincheck] = useState(true);
  const [promocheck, setPromoCodecheck] = useState(true);
  const [formData, setFormData] = useState({
    pincode: '403501',
    productid: '65a61f463245d300343aa79d',
    variantid: '65ac137d301cd30034a25301',
    quantity: 120,
  });

  useEffect(()=>{
    console.log(vendorPriceAtPincode,"vendorpricechanged");
  },[vendorPriceAtPincode])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBtnValueChange = (newValue) => {
    setBtnValue("Calculate Cart");
    setTotalShippingCost("To be calculated");
    shippingresult = [];
    // Store promo code state for reapplication
    const currentPromoState = {
      promoCodeApplied: promoCodeApplied,
      promoCode: promoCode,
      promoCodeState: promoCodeState
    };
    // We'll reapply this after cart calculation if needed
    return currentPromoState;
  };

  const checkCssDeals = async (product) => {
    try {
      const response = await getCssDeals(`category=${product.categoryid}`);
      const data = response.data;
      // console.log(data);
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
      // For imported products, we don't need to check pincode validity
      // Just use the shipping address pincode directly
      
      let formData={};
      
      // Always use the current shipping address pincode for imported products
      // For non-imported products, use their specific pincode or fall back to shipping address
      const usePincode = (item.isImported || item.item?.isImported) ? 
                         shippingaddresspin : 
                         (item.pincode || shippingaddresspin);
      
      if (item.mainProductId) {
        formData = {
          pincode: usePincode || '',
          productid:'',
          variantid: item._id || '',
          quantity: parseInt(item.quantity, 10) || 0,
        };
      } else {
        formData = {
          pincode: usePincode || '',
          productid: item._id || item.item?._id || '',
          variantid: '',
          quantity: parseInt(item.quantity || item.item?.quantity, 10) || 0,
        };
      }

      console.log(formData,"Form data Prodict shopping");
      
      // Set a timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const apiResponse = await fetch('https://logistic.mbuybackend.in/api/shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Check if request was successful
      if (!apiResponse.ok) {
        console.error(`API returned status ${apiResponse.status}`);
        // Return a default object to allow the flow to continue
        return { 
          shipCostValue: 0, 
          shippingDetails: {
            productid: item?.mainProductId ? '' : item?._id,
            variantid: item?.mainProductId ? item?._id: '' ,
            productname: item?.productname1 || '',
            shippingCost: 0,
            shippingType: 'Standard',
            boxes: {},
            DOD: 0,
            CSS: 0,
            quantity: item.quantity,
            Promo: promoCodeState,
            Price: item.cartvalue || 0,
            vendor0: "NA",
            vendor1: "NA",
            vendor2: "NA",
            vendor3: "NA",
            vendor4: "NA",
            vendor5: "NA",
            vendor6: "NA",
            pincode: shippingaddresspin,
            selectedvendor: "NA",
            selectedware: "NA",
            vendorPriceAtPincode: Number(item?.vendorPriceAtPincode), 
            gst: item.taxpercent3,
          } 
        };
      }

      const data = await apiResponse.json();
      console.log(data)
      
      // Validate API response data
      if (!data || !data.vendorWareHouse || !data.pricesresult) {
        console.error("Invalid API response structure");
        throw new Error("Invalid API response");
      }
      
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
      // Get the vendor price from the API response
      const vendorPrice = data.pricesresult[minIndex] ? parseFloat(data.pricesresult[minIndex]) : 0;
      
      // console.log(`Shipping cost for item ${item._id}: ${shipCostValue}`);
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
        productid: item?.mainProductId ? '' : item?._id,
        variantid: item?.mainProductId ? item?._id: '' ,
        productname: item?.productname1 || '',
        shippingCost: shipCostValue,
        shippingType: data.shipType,
        boxes: data.boxDetails,
        DOD: disdod,
        CSS: discss,
        quantity: item.quantity,
        Promo: promo.code , 
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
        vendorPriceAtPincode: vendorPrice,
        gst: item.taxpercent3,
    
      };
      
      // shippingresult.push(shippingDetails);

      return { shipCostValue, shippingDetails };
    } catch (error) {
      console.error('Error in makeApiCall:', error);
      
      // Return default values to allow the flow to continue
      return { 
        shipCostValue: 0, 
        shippingDetails: {
          productid: item?.mainProductId ? '' : item?._id,
          variantid: item?.mainProductId ? item?._id: '' ,
          productname: item?.productname1 || '',
          shippingCost: 0,
          shippingType: 'Standard',
          boxes: {},
          DOD: disdod,
          CSS: discss,
          quantity: item.quantity,
          Promo: item.promoCode,
          Price: Value || (item.cartvalue - (totalDiscount[item._id] ?? 0)),
          vendor0: "NA",
          vendor1: "NA",
          vendor2: "NA",
          vendor3: "NA",
          vendor4: "NA",
          vendor5: "NA",
          vendor6: "NA",
          pincode: shippingaddresspin,
          selectedvendor: "NA",
          selectedware: "NA",
          vendorPriceAtPincode: Number(item?.vendorPriceAtPincode || 0), // Use the item's vendorPriceAtPincode or 0
          gst: item.taxpercent3,
        } 
      };
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
    // Properly find the item by checking both regular and nested product structures
    const productDetails = cart.cart.find((item) => 
      (item._id === id) || (item.item && item.item._id === id)
    );
    
    // Save promo code state before removing item
    const savedPromoState = {
      promoCodeApplied: promoCodeApplied,
      promoCode: promoCode,
      promoCodeState: promoCodeState
    };
    
    if (productDetails) {
      dispatch(editItemToCart({ productDetails, quantity: 0 }));
      
      // Reapply promo code after a delay to ensure cart updates first
      if (savedPromoState.promoCodeApplied) {
        setTimeout(() => {
          calculatePriceArr(); // Recalculate price array with updated cart
          if (savedPromoState.promoCodeState) {
            setPromoCodeSate(savedPromoState.promoCodeState);
            promoCodeBtnHandler();
          }
        }, 300);
      }
    } else {
      console.error("Product not found with ID:", id);
    }
  };

  useEffect(() => {
    // Load user from localStorage initially
    const localUser = JSON.parse(localStorage.getItem("user"));
    
    const getuser = async (id) => {
      try {
        // Fetch fresh user data from API
      const response = await getUser(id);
        
      if (response.status === 200) {
          const apiUserData = response?.data;
          
          // Only update localStorage if the API returned valid data
          if (apiUserData) {
            // Update state with fresh API data
            setUser(apiUserData);
            
            // Update localStorage with this data
            localStorage.setItem("user", JSON.stringify(apiUserData));
            
            // Set address state variables from API data using selected indexes
            updateAddressDisplayFromUser(apiUserData);
          }
        } else {
          console.error("Failed to get user data from API");
          
          // If API call fails, use localStorage data as fallback
          if (localUser) {
            setUser(localUser);
            
            // Set address state variables from local storage data using selected indexes
            updateAddressDisplayFromUser(localUser);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        
        // Use localStorage as fallback if API call throws an error
        if (localUser) {
          setUser(localUser);
          
          // Set address state variables from local storage data using selected indexes
          updateAddressDisplayFromUser(localUser);
        }
      }
    };
    
    // Helper function to update address display based on selected indexes
    const updateAddressDisplayFromUser = (userData) => {
      // Use the selected shipping address index
      const shipIndex = selectedShippingAddressIndex;
      if (userData[`shippingaddress${shipIndex}`] && userData[`shippingpincode${shipIndex}`]) {
          setShippingAddress(
          `${userData[`shippingaddress${shipIndex}`]}, ${userData[`shippingpincode${shipIndex}`]}`
          );
          setShippingAddresspin(
          `${userData[`shippingpincode${shipIndex}`]}`
        );
      }
      
      // Use the selected billing address index
      const billIndex = selectedBillingAddressIndex;
      if (userData[`billingaddress${billIndex}`] && userData[`billingpincode${billIndex}`]) {
        setBillingAddress(
          `${userData[`billingaddress${billIndex}`]}, ${userData[`billingpincode${billIndex}`]}`
        );
          setBillingAddresspin(
          `${userData[`billingpincode${billIndex}`]}`
        );
          setBillingName(
          userData[`billingname${billIndex}`] || ''
        );
      }
    };
    
    // If we have a user in localStorage, use their ID to fetch up-to-date data
    if (localUser && localUser._id) {
      // Set the user from localStorage initially so the UI has something to display
      setUser(localUser);
      
      // Set address state variables from local storage data using selected indexes
      updateAddressDisplayFromUser(localUser);
      
      // Then fetch the latest data from the API
      getuser(localUser._id);
    } else {
      // No user in localStorage, redirect to login
      navigate.push("/login");
    }

    // Only check mismatches if shipping address pin is set
    if (shippingaddresspin) {
      const mismatched = [];
      cart.cart.forEach(item => {
        // Skip pincode mismatch check for imported products
        if ((item.isImported || item.item?.isImported)) {
          // For imported products, always update their pincode to match shipping address
          if (item.pincode !== shippingaddresspin) {
            dispatch(updateVendorPrice({
              productId: item._id,
              vendorPrice: item.vendorPriceAtPincode || 0,
              Npincode: shippingaddresspin, // Use shipping address pincode
            }));
          }
          return; // Skip this item - it's imported
        }
        
        if (item.pincode && item.pincode !== shippingaddresspin) {
          mismatched.push({
            name: item.productname1 || item.item?.productname1 || "Product",
            pincode: item.pincode,
            quantity:item.quantity,
            productId:item._id,
            excpins:item.excpins,
            mainProduct:item.mainProductId? `false` : `true`
          });
        }
      });
      
      if (mismatched.length > 0) {
        setMismatchedProducts(mismatched);
        setPromoCodecheck(false); // Disable promo code only when mismatches exist
      } else {
        setPromoCodecheck(true); // Explicitly enable promo code when no mismatches
      }
    }
  }, [shippingaddresspin, cart.cart, selectedShippingAddressIndex, selectedBillingAddressIndex]); // Add the selected indexes as dependencies

  const routechangehandler = () => {
    navigate.push("/allproducts/categories");
  };
  const [isLoading, setIsLoading] = useState(false);


  const checkPincodeConsistency = () => {
    const mismatched = [];
    cart.cart.forEach(item => {
      // Skip pincode mismatch check for imported products
      if ((item.isImported || item.item?.isImported)) {
        // For imported products, always update their pincode to match shipping address
        if (item.pincode !== shippingaddresspin) {
          dispatch(updateVendorPrice({
            productId: item._id,
            vendorPrice: item.vendorPriceAtPincode || 0,
            Npincode: shippingaddresspin, // Use shipping address pincode
          }));
        }
        return; // Skip this item - it's imported
      }
      
      if (item.pincode && item.pincode !== shippingaddresspin) {
        mismatched.push({
          name: item.productname1 || item.item?.productname1 || "Product",
          pincode: item.pincode
        });
      }
    });
    
    if (mismatched.length > 0) {
      setMismatchedProducts(mismatched);
      setPincodeMismatchModal(true);
      return false;
    }
    return true;
  };


  const changebtnvalue = async () => {
    setIsLoading(true);
    
    // Handle order confirmation logic (no changes needed)
    if (btnvalue === "Confirm Order" && user && shippingaddress) {
      const cartProds = cart.cart.map((item) => {

        const productObj = {};
        if (item.mainProductId) {
          productObj.productid = item.item?.mainProductId || item.mainProductId;
          productObj.vairanceid = item?.item?._id || item._id;
          productObj.productname = item.item?.productname1 || item.productname1;
        } else {
          productObj.productid = item._id;
          productObj.productname = item.productname1;
        }
        productObj.ShipPincode = item.pincode; // Use the confirmed shipping pincode
        productObj.quantity = item.quantity;
        productObj.vendorid = "";
        productObj.warehouseid = "";
        productObj.price = item.price || "";
        return productObj;
      });


      const shipdet = shippingresult.map((shippingDetails) => {
        let boxesString = '';
        if (typeof shippingDetails.boxes === 'object') {
          // Convert object to string representation
          boxesString = Object.keys(shippingDetails.boxes)
            .map(key => `${key}[${shippingDetails.boxes[key]}`)
            .join(',');
        } else {
          boxesString = shippingDetails.boxes.toString();
        }
        const data = `productid+${shippingDetails.productid}|variantid+${shippingDetails.variantid}|shippingCost+${shippingDetails.shippingCost}|shippingType+${shippingDetails.shippingType}|DOD+${shippingDetails.DOD}|CSS+${shippingDetails.CSS}|Promo+${shippingDetails.Promo}|Price+${shippingDetails.Price}|gst+${shippingDetails.gst}|quantity+${shippingDetails.quantity}|pincode+${shippingDetails.pincode}|vendor1+${shippingDetails.vendor0}|vendor2+${shippingDetails.vendor1}|vendor3+${shippingDetails.vendor2}|vendor4+${shippingDetails.vendor3}|vendor5+${shippingDetails.vendor4}|vendor6+${shippingDetails.vendor5}|vendor7+${shippingDetails.vendor6}|selectedvendor+${shippingDetails.selectedvendor}|selectedware+${shippingDetails.selectedware}|boxes+${boxesString}`;
        console.log(data,"data shipping");
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
        FullName: `${user.fullname}`,
        promocode: promo.code || promoCodeState || "", // Add the promo code string here
      };

      // console.log("paymentdetai", paymentdetail);

      const order = async () => {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };


        try {
          if (paymentdetail) {
            // console.log(paymentdetail);
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
                setIsLoading(false); // Make sure to clear loading state on error
              }
            } else {
              alert(res.error);
              setIsLoading(false); // Make sure to clear loading state on error
            }
          }
          else {
            alert("Payment Detail not found");
            setIsLoading(false); // Make sure to clear loading state on error
          }
        } catch (err) {
          console.log(err);
          setIsLoading(false); // Make sure to clear loading state on error
        }
      };
      order();

      toast.success("redirect to payment gateway");
      // cart.cart.forEach((item) => {
      //   removeitemhandler(item._id);
      // });
    }

    // Handle login checks (no changes needed)
    else if (btnvalue === "Confirm Order" && !user) {
      toast.error("Please login to continue");
      navigate.push("/login");
      setIsLoading(false);
    }
    // Handle address checks (no changes needed)
    else if ((btnvalue === "Confirm Order" && !user.shippingaddress1) || 
             (btnvalue !== "Confirm Order" && !user.shippingaddress1)) {
      toast("Please update your address");
      navigate.push("/manageaddress");
      setIsLoading(false);
    }
    // Main cart calculation flow
    else {
      // Save promo code state before recalculation
      const savedPromoState = {
        promoCodeApplied: promoCodeApplied,
        promoCode: promoCode,
        promoCodeState: promoCodeState
      };

      dispatch(recalculateAllCartValues());

      // Check for pincode mismatches
      const mismatched = [];
      cart.cart.forEach(item => {
        // Skip pincode mismatch check for imported products
        if ((item.isImported || item.item?.isImported)) {
          // For imported products, always update their pincode to match shipping address
          if (item.pincode !== shippingaddresspin) {
            dispatch(updateVendorPrice({
              productId: item._id,
              vendorPrice: item.vendorPriceAtPincode || 0,
              Npincode: shippingaddresspin, // Use shipping address pincode
            }));
          }
          return; // Skip this item - it's imported
        }
        
        if (item.pincode && item.pincode !== shippingaddresspin) {
          mismatched.push({
            name: item.productname1 || item.item?.productname1 || "Product",
            pincode: item.pincode,
            quantity: item.quantity,
            productId: item._id,
            excpins: item.excpins,
            mainProduct: item.mainProductId ? `false` : `true`
          });
        }
      });
      
      if (mismatched.length > 0) {
        setMismatchedProducts(mismatched);
        setPincodeMismatchModal(true);
        setPromoCodecheck(false);
        setIsLoading(false);
        return;
      } else {
        // Explicitly enable promo code when no mismatches found
        setPromoCodecheck(true);
      }
  
      try {
        const response = await getUser(user._id);
        const checkdel = await checkpincode(cart.cart);
        
        if (checkdel.allProductsDeliverable) {
          // Calculate shipping cost calculations continue as normal
          toast.info("Calculating shipping costs...");
        
          const totalShippingCost = await calculateTotalShippingCost(response, cart.cart);
          
          if (!isNaN(totalShippingCost) && (shippingresult.length === cart.cart.length)) {
            setIsLoading(false);
            const postcart2 = async () => {
              try {
                const response = await postCart(cart);
                if (response.status === 200) {
                  toast.success("Cart calculated successfully");
                  setBtnValue("Confirm Order");
                  
                  // Ensure promo code button is enabled after successful calculation
                  setPromoCodecheck(true);
                  
                  // If promo code was applied before recalculation, reapply it
                  if (savedPromoState.promoCodeApplied) {
                    // Reset the price array first based on the new shipping costs
                    calculatePriceArr();
                    
                    // Then reapply the promo code with a delay
                    setTimeout(() => {
                      setPromoCodeSate(savedPromoState.promoCodeState);
                      // Force a fresh application of the promo code
                      setPromoCodeApplied(false);
                      setTimeout(() => {
                        promoCodeBtnHandler();
                      }, 200);
                    }, 300);
                  }
                } else {
                  toast.error("Unable to process cart");
                  shippingresult = [];
                  setIsLoading(false);
                }
              } catch (error) {
                console.error("Error posting cart:", error);
                toast.error("Error processing cart");
                shippingresult = [];
                setIsLoading(false);
              }
            };
            postcart2();
          } else {
            toast.error("Error calculating shipping costs");
            setIsLoading(false);
            shippingresult = [];
          }
        } else {
          // Show undeliverable products popup
          notdel = checkdel.undeliverableProducts;
          setIsLoading(false);
          setIsOpen(true);
          
          // Show a clear message about undeliverable products
          const productNames = notdel.map(p => p.productName || "Product").join(", ");
          toast.error(`Some products cannot be delivered to ${shippingaddresspin}: ${productNames}`);
        }
      } catch (error) {
        console.error("Error in cart calculation:", error);
        toast.error("An error occurred while processing your cart");
        setIsLoading(false);
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
    let successCount = 0;
    const totalItems = cartItems.length;

    // Clear shipping results array before recalculating
    shippingresult = [];

    for (const item of cartItems) {
      try {
        let { shipCostValue, shippingDetails } = await makeApiCall(userResponse, item);
        console.log(shipCostValue , shippingDetails, "shippingDetails");
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

        console.log(`Item: ${item.productname1}, Shipping Cost Before Adding: ${shippingCost}, Free Ship: ${shippingDetails.freeShip}`);

        if (item[propertyName]) {
          shippingCost = 0;
          shippingDetails.freeShip = true;
        } else {
          shippingDetails.freeShip = false;
        }

        // Preserve promo code information in shipping details
        if (promoCodeApplied && promoCodeState) {
          shippingDetails.Promo = promoCodeState;
        }

        shippingresult.push(shippingDetails);
        successCount++;

        // console.log("shipping cost after calculating quantity :", shippingCost)
        totalShippingCost += shippingCost;
        // console.log(totalShippingCost ,'kuch ho' )
      } catch (error) {
        console.error(`Error processing item ${item._id || item.productname1}:`, error);
        // Continue with other items even if one fails
      }
    }

    // If we couldn't process any items successfully, return an error
    if (successCount === 0) {
      throw new Error("Failed to calculate shipping for any cart items");
    }

    // Even if some items failed, we can still show the partial result
    if (successCount < totalItems) {
      toast.warning(`Calculated shipping for ${successCount} out of ${totalItems} items. Some prices may be incomplete.`);
    }

    setTotalShippingCost(parseFloat(totalShippingCost));
    return totalShippingCost;
  };


  const showshipchangeaddresshandler = () => {
    if (user) {
      setAddress({
        // Shipping addresses
        address1: user?.shippingaddress1 || '',
        pincode1: user?.shippingpincode1 || '',
        address2: user?.shippingaddress2 || '',
        pincode2: user?.shippingpincode2 || '',
        address3: user?.shippingaddress3 || '',
        pincode3: user?.shippingpincode3 || '',
        address4: user?.shippingaddress4 || '',
        pincode4: user?.shippingpincode4 || '',
        address5: user?.shippingaddress5 || '',
        pincode5: user?.shippingpincode5 || '',
        // Also include name fields which might be used by the ChangeAddress component
        name1: user?.shippingname1 || user?.name || user?.fullname || '',
        name2: user?.shippingname2 || '',
        name3: user?.shippingname3 || '',
        name4: user?.shippingname4 || '',
        name5: user?.shippingname5 || '',
        // Flag to indicate this is for shipping
        isShipping: true,
        // Pass the currently selected address index
        currentlySelected: selectedShippingAddressIndex
      });
      setShowChangeAddress(!showchangeaddress);
    }
  };

  const showbillchangeaddresshandler = () => {
    if (user) {
      setAddress({
        // Billing addresses
        address1: user?.billingaddress1 || '',
        pincode1: user?.billingpincode1 || '',
        address2: user?.billingaddress2 || '',
        pincode2: user?.billingpincode2 || '',
        address3: user?.billingaddress3 || '',
        pincode3: user?.billingpincode3 || '',
        address4: user?.billingaddress4 || '',
        pincode4: user?.billingpincode4 || '',
        address5: user?.billingaddress5 || '',
        pincode5: user?.billingpincode5 || '',
        // Billing names
        name1: user?.billingname1 || user?.name || user?.fullname || '',
        name2: user?.billingname2 || '',
        name3: user?.billingname3 || '',
        name4: user?.billingname4 || '',
        name5: user?.billingname5 || '',
        // Flag to indicate this is for billing
        isBilling: true,
        // Pass the currently selected address index
        currentlySelected: selectedBillingAddressIndex
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

      // If the product is imported, skip pincode validation
      if (item.isImported || item.item?.isImported) {
        // Skip validation for imported products
        continue;
      }

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
        const isPincodeInExcpins = item.excpins?.includes(pincode);

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
      console.log("Updating shipping address:", data.shippingaddress);
      console.log("Updating shipping pincode:", data.shippin);

      // Get the address index (default to 1 if not provided)
      const addressIndex = data.addressIndex || 1;
      
      // Update selected address index in state
      setSelectedShippingAddressIndex(addressIndex);

      // Update state with new address
      setShippingAddress(data.shippingaddress);
      setShippingAddresspin(data.shippin);
      
      if (user) {
        // Create a deep copy of the user object to avoid state mutation issues
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        // Update the shipping address fields in the user object
        // Remove pincode from address if it's included
        const cleanAddress = data.shippingaddress.replace(new RegExp(`, ${data.shippin}$`), '');
        updatedUser[`shippingaddress${addressIndex}`] = cleanAddress;
        updatedUser[`shippingpincode${addressIndex}`] = data.shippin;
        
        // Update the name if provided
        if (data.addressName) {
          updatedUser[`shippingname${addressIndex}`] = data.addressName;
        }
        
        // Update the user state
        setUser(updatedUser);
        
        // Update localStorage with the new user data
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      // For all imported products in the cart, update their pincode to match the new shipping address
      // Also check for pincode mismatches for non-imported products
      const mismatched = [];
      cart.cart.forEach(item => {
        if (item.isImported || item.item?.isImported) {
          // Update the pincode for imported products
          dispatch(updateVendorPrice({
            productId: item._id,
            vendorPrice: item.vendorPriceAtPincode || 0,
            Npincode: data.shippin, // Use the new shipping address pincode
          }));
        } else {
          // Check for pincode mismatches for non-imported products
          if (item.pincode && item.pincode !== data.shippin) {
            mismatched.push({
              name: item.productname1 || item.item?.productname1 || "Product",
              pincode: item.pincode,
              quantity: item.quantity,
              productId: item._id,
              excpins: item.excpins,
              mainProduct: item.mainProductId ? `false` : `true`
            });
          }
        }
      });
      
      // Clear any existing shipping results to force recalculation
      shippingresult = [];
      
      // Reset button to Calculate Cart
      setBtnValue("Calculate Cart");
      setTotalShippingCost("To be calculated");
      
      // Update mismatch list if there are pincode-dependent products
      if (mismatched.length > 0) {
        setMismatchedProducts(mismatched);
        setTimeout(() => {
          setPincodeMismatchModal(true);
          setPromoCodecheck(false);
        }, 100);
      } else {
        // All products can be delivered to this address, enable promo
        setPromoCodecheck(true);
      }
    } else if (data.billingaddress) {
      // Get the address index (default to 1 if not provided)
      const addressIndex = data.addressIndex || 1;
      
      // Update selected address index in state
      setSelectedBillingAddressIndex(addressIndex);
      
      // Update state with new billing address
      setBillingAddress(data.billingaddress);
      setBillingAddresspin(data.billingpin);
      
      if (user) {
        // Create a deep copy of the user object
        const updatedUser = JSON.parse(JSON.stringify(user));
        
        // Update the billing address fields in the user object
        // Remove pincode from address if it's included
        const cleanAddress = data.billingaddress.replace(new RegExp(`, ${data.billingpin}$`), '');
        updatedUser[`billingaddress${addressIndex}`] = cleanAddress;
        updatedUser[`billingpincode${addressIndex}`] = data.billingpin;
        
        // Update name if provided
        if (data.billingname) {
          updatedUser[`billingname${addressIndex}`] = data.billingname;
        }
        
        // Update the user state
        setUser(updatedUser);
        
        // Update localStorage with the new user data
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        // Optional: Send API update request here if needed
        // updateUserAPI(updatedUser); // Implement this function if needed
      }
    }
  };
  // console.log(totalDiscount);
  const totalDiscount_price = Object.values(totalDiscount).reduce(
    (a, b) => a + b,
    0
  );

const sub_total_display =
  cart.cart.reduce((acc, curr) => {
    // Get the correct item object and ID
    const item = curr.item || curr;
    const itemId = item._id;
    
    // Calculate values
    const cartValue = Number(item.cartvalue || 0);
    const vendorPrice = Number(item.vendorPriceAtPincode || 0);
    const quantity = Number(item.quantity || 0);
    const discount = Number(totalDiscount[itemId] || 0); // Discount per item
    
    console.log("Item calculation:", {
      id: itemId,
      cartValue,
      vendorPrice,
      quantity,
      discount,
      total: cartValue + (vendorPrice * quantity) - discount
    });

    return acc + cartValue + (vendorPrice * quantity) - discount
  }, 0);


  const [price_arr, set_price_arr] = useState([]);

const calculatePriceArr = () => {
  // Make sure we're getting fresh data from the cart redux store
  const updatedPriceArr = cart.cart.map((item) => {
    // Extract the base values - cartvalue from Redux already includes quantity * base price
    const cartValue = Number(item.cartvalue || item.item?.cartvalue || 0);
    
    // Vendor price needs to be multiplied by quantity 
    const vendorPrice = Number(item?.vendorPriceAtPincode || item?.item?.vendorPriceAtPincode || 0);
    const quantity = Number(item.quantity || item.item?.quantity || 0);
    const totalVendorPrice = vendorPrice * quantity;
    
    // Get applicable discounts
    const discount = Number(totalDiscount[item._id || item.item?._id] || 0);
    
    // Calculate the total price for this item
    return cartValue + totalVendorPrice - discount;
  });

  // Update both price arrays
  set_price_arr(updatedPriceArr);
  setOriginalPriceArr([...updatedPriceArr]);
  
  // If a promo code is applied, we need to reapply it after price calculation changes
  // This will handle quantity changes properly
  if (promoCodeApplied && promoCodeState) {
    const savedCode = promoCodeState;
    setPromoCodeApplied(false);
    
    // Give a slightly longer delay to ensure all state updates have propagated
    setTimeout(() => {
      setPromoCodeSate(savedCode);
      promoCodeBtnHandler();
    }, 200);
  }
};


  // Call the function during the initial render
  useEffect(() => {
    calculatePriceArr();
  }, []);

  // Update price_arr when cart.cart changes
  useEffect(() => {
    calculatePriceArr();
  }, [cart.cart, totalDiscount]);


  // Add this useEffect at the top of your Cart component
useEffect(() => {
  // This effect runs once when the component mounts.
  // We reset the calculation-related state to its initial values.
  // This ensures that returning to the page (e.g., via back button)
  // doesn't show stale calculation data.
  
  console.log("Cart component mounted. Resetting calculation state.");

  setBtnValue("Calculate Cart");
  setTotalShippingCost("to be calculated");
  setPromo({
    code: "",
    applied: false,
    discountValue: 0,
    error: "",
    success: "",
    showMessage: false,
  });

}, []);

  const sub_total = price_arr.reduce((acc, curr) => acc + curr, 0);

  const estimated_tax = cart.cart.reduce((acc, curr, index) => {
    const baseForTax = price_arr[index];
    return acc + (baseForTax * (curr.taxpercent3 || curr.item?.taxpercent3)) / 100;
  }, 0);

  const sub_total_with_tax =
    price_arr.reduce((a, b) => a + b, 0) + estimated_tax + totalShippingCost;
  const grand_total = parseFloat(sub_total_with_tax).toFixed(2);

  // --- PROMO CODE STATE ---
  const [promo, setPromo] = useState({
    code: "",
    applied: false,
    discount: 0,
    error: "",
    success: ""
  });
  // --- PROMO CODE HANDLER ---
  const handlePromoCode = async () => {
    if (promo.applied) {
      // Remove promo
      set_price_arr([...originalPriceArr]);
      setPromo({ ...promo, applied: false, discount: 0, error: "", success: "" });
      return;
    }

    if (!promo.code.trim()) return;

    try {
      const response = await getPromoCodes();
      if (response.status !== 200) throw new Error("Failed to fetch promo codes");

      const promoData = response.data.find(item => item.codename === promo.code);
      if (!promoData) {
        setPromo({ ...promo, error: "Invalid Promocode", success: "" });
        return;
      }

      // Check expiry, status, usage, min cart value
      if (
        new Date(promoData.ended) < new Date() ||
        !promoData.currentstatus ||
        !+promoData.noofusers ||
        sub_total < +promoData.mini
      ) {
        setPromo({ ...promo, error: "Promocode Expired or Not Applicable", success: "" });
        return;
      }

      // Calculate discount
      let discount = 0;
      let newPrices = [...price_arr];
      if (promoData.type === "Amount") {
        const idx = price_arr.indexOf(Math.max(...price_arr));
        discount = Math.min(+promoData.discount, price_arr[idx]);
        newPrices[idx] = Math.max(0, price_arr[idx] - discount);
      } else {
        // Percentage
        discount = price_arr.reduce((acc, item) => acc + (item * +promoData.discount) / 100, 0);
        newPrices = price_arr.map(item => Math.max(0, item - (item * +promoData.discount) / 100));
      }

      set_price_arr(newPrices);
      setPromo({
        ...promo,
        applied: true,
        discount,
        error: "",
        success: "Promocode Applied Successfully"
      });
    } catch (err) {
      setPromo({ ...promo, error: "Error applying promo code", success: "" });
    }
  };
  // --- REVALIDATE PROMO ON CART CHANGE ---
  useEffect(() => {
    if (promo.applied) {
      // Re-validate promo code
      handlePromoCode();
    }
    // eslint-disable-next-line
  }, [cart.cart, totalDiscount]);

  const promoCodeBtnHandler = async () => {
    const promoCode = promoCodeState;
    
    if (promoCodeApplied) {
      // Logic to remove the applied promo code
      setPromoCode(null);
      set_price_arr([...originalPriceArr]); // Reset price_arr to initial values
      setPromoCodeApplied(false);
      setPromoCodeSate("");
      return;
    }

    if (!promoCode || promoCode.trim() === "") return;
    try {
      const response = await getPromoCodes();
      if (response.status === 200) {
        const isPromoCodeAvailable = response.data.find(
          (item) => item.codename === promoCode
        );

        if (!isPromoCodeAvailable) {
          setPromoCodeError("Invalid Promocode");
        }
        else if (
          new Date(isPromoCodeAvailable.ended) - new Date(isPromoCodeAvailable.started) <= 0 ||
          !isPromoCodeAvailable.currentstatus ||
          !+isPromoCodeAvailable.noofusers ||
          sub_total < +isPromoCodeAvailable.mini
        ) {
          setPromoCodeError("Promocode Expired");
        }
        else {
          setPromoCodeError(null);
          
          // Store original values for GST calculation
          const originalValues = [...originalPriceArr];
          
          if (isPromoCodeAvailable.type === "Amount") {
            // Find the item with the highest price to apply fixed discount
            const index = price_arr.indexOf(Math.max(...price_arr));
            const discountAmount = +isPromoCodeAvailable.discount;
            
            // Ensure the discount doesn't make the price negative
            const maxDiscount = price_arr[index];
            const safeDiscount = Math.min(discountAmount, maxDiscount);
            
            setPromoCode(safeDiscount);
            set_price_arr((prev) => {
              const clone = [...prev];
              // Ensure we don't go below zero
              clone[index] = Math.max(0, clone[index] - safeDiscount);
              return clone;
            });
          } else {
            // For percentage discount, calculate total discount amount
            const discountPercent = +isPromoCodeAvailable.discount;
            let totalDiscountAmount = 0;
            
            // Calculate new prices ensuring none go below zero
            const newPrices = price_arr.map(item => {
              const itemDiscount = (item * discountPercent) / 100;
              totalDiscountAmount += itemDiscount;
              return Math.max(0, item - itemDiscount); // Ensure price doesn't go below 0
            });
            
            setPromoCode(totalDiscountAmount);
            set_price_arr(newPrices);
          }
          
          setPromoCodeApplied(true);
          setPromoCodeSucess("Promocode Applied Successfully");
          
          // Store the promo code info for shipping details
          for (let i = 0; i < shippingresult.length; i++) {
            if (shippingresult[i]) {
              shippingresult[i].Promo = promoCode;
            }
          }
        }
      }
    } catch (error) {
      console.log("error applying promo code:", error);
    }
  };

   const checkpincode2 = async (productDetails, newpincode) => {
      const pincode = newpincode;
      
      // Check if the product is imported - if so, skip validation and go directly to API call
      if (productDetails.isImported) {
        toast.info(`Processing imported product: ${productDetails.name}`);
        
        // For imported products, directly send to shipping API without validation
        // Always use the current shipping address pincode for imported products
        const result = await sendPincodeDetails(
          shippingaddresspin, // Always use current shipping address pincode for imported products
          productDetails.mainProduct === "true" ? productDetails.productId : "",
        productDetails.mainProduct === "false" ? productDetails.productId : "",
          productDetails?.quantity,
          productDetails,
          shippingaddresspin // Use current shipping address pincode as the new pincode
        );
        
        // Update the product's pincode to match current shipping address
        if (result) {
          dispatch(updateVendorPrice({
            productId: productDetails.productId,
            vendorPrice: 0, // This will be updated by processLogisticResponse
            Npincode: shippingaddresspin, // Use current shipping address pincode
          }));
        }
        
        return result;
      }
      
      const response = await getBuyerdata();
      const dataArray = response;
      
      // Fix the variable names: mainProductId is a boolean string, not the product ID
      const variantId = productDetails.mainProduct === "false" ? productDetails.productId : "";
      const productid = productDetails.mainProduct === "true" ? productDetails.productId : "";
      
      console.log(variantId, productDetails, "Checking pincode validation");
      const isPincodeFound = dataArray.some((dict) => dict.pin === pincode);
  
      if (!pincode) {
        alert("Enter pincode first");
        return false;
      } else if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
        alert("Invalid pincode");
        return false;
      } else {
        const isPincodeInExcpins = productDetails?.excpins?.includes(pincode);
        
        if (isPincodeInExcpins) {
          // Product explicitly doesn't deliver to this pincode
          toast.error(`Sorry, ${productDetails.name} cannot be delivered to this address (${pincode})`);
          
          // Don't try to calculate shipping when we know it's not deliverable
          return false;
        } else {
          if (isPincodeFound) {
            toast.success(`Shipping is available to ${pincode} for ${productDetails.name}`);

            const result = await sendPincodeDetails(
              pincode,
              productid,
              variantId,
              productDetails?.quantity,
              productDetails,
              newpincode
            );
            
            return result;
          } 
          else {
            // Service not available in this area
            toast.error(`Sorry, delivery services are not available in pincode ${pincode} for ${productDetails.name}`);
            setPincodeChecked(false);
            return false;
          }
        }
      }
    };
  
    // New function to send pincode and product ID to the API
    const sendPincodeDetails = async (
      pincode,
      productid,
      variantid,
      quantity,
      productDetails,
      newpincode
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
        
        // Check if the API response indicates successful shipping calculation
        if (!data.pricesresult || data.pricesresult.length === 0) {
          toast.error(`Unable to calculate shipping for ${productDetails.name}`);
          return false;
        }
        
        // Process the response and update the state with the new shipping data
        const result = processLogisticResponse(data, productDetails, newpincode);
        return result;
      } catch (error) {
        console.error("Error sending pincode details:", error);
        toast.error("Error checking delivery availability. Please try again.");
        return false;
      }
    };
  
    const getLowestPriceIndex = (logisticData) => {
      if (!logisticData?.pricesresult || !logisticData?.shipCost) return -1;
    
      let minTotal = Infinity;
      let minIndex = -1;
    
      logisticData.pricesresult.forEach((price, index) => {
        const shippingCost = logisticData.shipCost[index] || 0; // Default to 0 if not present
        const totalCost = Number(price) + Number(shippingCost);
    
        if (totalCost < minTotal) {
          minTotal = totalCost;
          minIndex = index;
        }
      });
    
      return minIndex;
    };
  
    const processLogisticResponse = (logisticData, productDetails, newpincode) => {
      console.log('Processing logistic response:', logisticData);
      
      if (!logisticData?.pricesresult || logisticData.pricesresult.length === 0) {
        console.error("No prices found in logistic response.");
        return false;
      }
    
      const lowestPriceIndex = getLowestPriceIndex(logisticData);
      if (lowestPriceIndex === -1) {
        console.error("Could not determine lowest price index");
        return false;
      }
    
      const lowestPrice = +logisticData.pricesresult[lowestPriceIndex];
      console.log('Updating vendor price for product:', productDetails.productId, 'with price:', lowestPrice);
    
      dispatch(updateVendorPrice({
        productId: productDetails.productId,
        vendorPrice: lowestPrice,
        Npincode: newpincode,
      }));
      
      return true;
    };
  // console.log("Cart Items in Index.js:", cart.cart);

  const [showNeftModal, setShowNeftModal] = useState(false);

  // Add an event handler for cart item quantity changes
  // This function will be passed to the Cartcard component
  const handleCartItemChange = (updateInfo) => {
    // Reset cart calculation state
    setBtnValue("Calculate Cart");
    setTotalShippingCost("To be calculated");
    
    // Clear shipping results to force recalculation
    shippingresult = [];
    
    // If we received direct quantity update info, use it for immediate update
    if (updateInfo && updateInfo.id && updateInfo.quantity) {
      // Find the item in cart
      const itemIndex = cart.cart.findIndex(item => 
        (item._id === updateInfo.id) || (item.item && item.item._id === updateInfo.id)
      );
      
      if (itemIndex >= 0) {
        // Create a deep copy of the cart for calculation (not modifying Redux state directly)
        const updatedCart = cart.cart.map(item => ({ ...item, item: item.item ? { ...item.item } : undefined }));
        
        // Create a new updated entry with the proper quantity
        if (updatedCart[itemIndex].item) {
          // If it's a nested item
          updatedCart[itemIndex] = { 
            ...updatedCart[itemIndex], 
            item: { 
              ...updatedCart[itemIndex].item, 
              quantity: updateInfo.quantity 
            } 
          };
        } else {
          // If it's a direct item
          updatedCart[itemIndex] = { 
            ...updatedCart[itemIndex], 
            quantity: updateInfo.quantity 
          };
        }
        
        // Calculate price based on this updated cart
        const updatedPriceArr = updatedCart.map((item) => {
          const cartValue = Number(item.cartvalue || item.item?.cartvalue || 0);
          
          // Use the updated quantity for calculations
          const quantity = item._id === updateInfo.id ? 
            updateInfo.quantity : 
            (item.item && item.item._id === updateInfo.id ? 
              updateInfo.quantity : 
              Number(item.quantity || item.item?.quantity || 0));
          
          const vendorPrice = Number(item?.vendorPriceAtPincode || item?.item?.vendorPriceAtPincode || 0);
          const totalVendorPrice = vendorPrice * quantity;
          
          const discount = Number(totalDiscount[item._id || item.item?._id] || 0);
          
          return cartValue + totalVendorPrice - discount;
        });
        
        // Update price arrays with new values
        set_price_arr(updatedPriceArr);
        setOriginalPriceArr([...updatedPriceArr]);
      }
    } else {
      // Otherwise calculate based on current Redux state
      calculatePriceArr();
    }
    
    // Recalculate prices
    handleBtnValueChange();
  };

  // Add a new useEffect to detect return from payment gateway and preserve calculation state
  useEffect(() => {
    // Check if we're returning from a payment gateway (URL might contain payment related params)
    const isReturningFromPayment = () => {
      if (typeof window !== 'undefined') {
        const url = window.location.href;
        return url.includes('payment') || url.includes('response') || 
               url.includes('cancel') || url.includes('return');
      }
      return false;
    };

    // Always clear loading spinner if returning from payment
    if (isReturningFromPayment()) {
      setIsLoading(false);
      if (btnvalue === "Confirm Order" && typeof totalShippingCost === 'number') {
        // If promo code was applied, make sure it's still correctly applied
        if (promoCodeApplied && promoCodeState) {
          calculatePriceArr();
        }
        toast.info("Welcome back! Your cart is ready for checkout.");
      } else {
        toast.info("Welcome back! Please recalculate your cart to continue.");
      }
    }
  }, []);

  // Fallback: always clear loading spinner if not actively calculating
  useEffect(() => {
    if (isLoading && btnvalue !== "Calculate Cart") {
      setIsLoading(false);
    }
  }, []);

  // Add a window beforeunload listener to handle page refresh scenarios
  useEffect(() => {
    const handleBeforeUnload = () => {
      // If we have calculated shipping costs, store them in sessionStorage
      if (typeof totalShippingCost === 'number' && shippingresult.length > 0) {
        sessionStorage.setItem('mbuy_shipping_cost', totalShippingCost);
        sessionStorage.setItem('mbuy_cart_state', 'calculated');
      }
    };

    // Add listener
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Check if we have stored shipping cost from a page refresh
    const storedShippingCost = sessionStorage.getItem('mbuy_shipping_cost');
    const storedCartState = sessionStorage.getItem('mbuy_cart_state');
    
    if (storedShippingCost && storedCartState === 'calculated') {
      // Restore the stored values
      setTotalShippingCost(parseFloat(storedShippingCost));
      setBtnValue("Confirm Order");
      setIsLoading(false);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>

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
                onLoad={console.log("cart loaded props", cart.cart)}
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
                      vendorPriceAtPincode={vendorPriceAtPincode}
                      handleCartItemChange={handleCartItemChange}
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
                        {shippingaddress}
                        <span className="text-xs text-gray-500 ml-1">
                          (Address {selectedShippingAddressIndex})
                        </span>
                      </p>
                      <Link
                        className={`text-right underline ${Styles.changeaddbtn}`}
                        href="#"
                        onClick={showshipchangeaddresshandler}
                      >
                        Change Shipping Address
                      </Link>
                      <p>
                        <span className={`font-semibold`}>Bill to: </span>{" "}
                        {billingaddress}
                        <span className="text-xs text-gray-500 ml-1">
                          (Address {selectedBillingAddressIndex})
                        </span>
                      </p>
                      <Link
                        className={`text-right underline ${Styles.changeaddbtn}`}
                      href="#"
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
                    {/* <p>₹{(!promoCode ? sub_total : sub_total_display).toFixed(2)} </p> */}
                    <p>₹{Math.ceil(sub_total_display)}</p>
                  </div>
                  {/* <div className={`flex justify-between`}>
                  <p className={`font-semibold`}>Shipping:</p>
                  <p>FREE</p>
                </div> */}

{promo.discount > 0 && (
                    <div className={`flex justify-between`}>
                      <p className={`font-semibold`}>Promo Code Discount:</p>
                      <p className="text-green-500">- ₹{promo.discount}</p>
                    </div>
                  )}

                 
                  <div className={`flex justify-between`}>
                    <p className={`font-semibold`}>Estimated Tax:</p>
                    <p> ₹{estimated_tax.toFixed(2)}</p>
                  </div>
                  <div className={`flex justify-between`}>
                    <p className={`font-semibold`}>Shipping Cost:</p>
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div>
                        {typeof totalShippingCost === 'number' ? `₹${totalShippingCost.toFixed(2)}` : totalShippingCost}
                      </div>
                    )}
                  </div>
                    {/* {promoCode > 0 && (
                    <div className={`flex justify-between`}>
                      <p className={`font-semibold`}>Promo Code Discount:</p>
                      <p className="text-green-500">- ₹{promoCode}</p>
                    </div>
                  )} */}

                  <div
                    className={`flex justify-between text-xl font-semibold mt-1 py-2 ${Styles.grand_total}`}
                  >
                    <h1>Grand Total:</h1>
                    <h1>₹{grand_total} /-</h1>
                    
                  </div>
                 
                 <div className="flex flex-col mt-4">
  <p className="text-sm font-medium mb-1">Do you have a Promo Code?</p>
  
  {/* This container handles the layout of the input and button */}
  <div className="flex flex-col sm:flex-row items-stretch">
    
    {/* Input field grows to take available space */}
    <input
      type="text"
      value={promo.code}
      onChange={({ target }) => setPromo(p => ({ ...p, code: target.value, error: "", success: "" }))}
      className={`${Styles.promo_code_input} flex-grow`}
      placeholder="ADD PROMOCODE"
      disabled={promo.applied || cart.cart.length === 0 || btnvalue !== "Confirm Order"}
    />

    {/* This container is the positioning anchor for the tooltip */}
    <div
      className="relative" // Makes this the parent for the absolute tooltip
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
    >
      <button
        onClick={handlePromoCode}
        className={`${Styles.apply_button} disabled:bg-gray-400 bg-blue-950 disabled:cursor-not-allowed`}
        disabled={promo.applied ? false : (cart.cart.length === 0 || btnvalue !== "Confirm Order")}
      >
        {promo.applied ? "Remove" : "Apply"}
      </button>

      {/* The Tooltip - Now with responsive positioning */}
      {((cart.cart.length === 0 || btnvalue !== "Confirm Order") && !promo.applied && showMessage) && (
        <div 
          className="absolute md:left-1/2 md:-translate-x-1/2 z-10 w-[80px] max-w-xs rounded bg-gray-800 px-3 py-1.5 text-center text-xs text-white shadow-lg 
                     top-full mt-2 md:bottom-full md:top-auto md:mb-2 md:mt-0"
                     //  ^-- Mobile:  Below button   ^-- Desktop: Above button
        >
          {cart.cart.length === 0 
            ? 'Add items to cart to use a promo code.' 
            : 'Please calculate the cart before applying a promo code.'
          }
        </div>
      )}
    </div>
  </div>

  {/* Error and Success Messages */}
  {promo.error && <p className="text-red-500 text-xs mt-1">{promo.error}</p>}
  {promo.success && <p className="text-green-500 text-xs mt-1">{promo.success}</p>}

  {/* Main Action Button */}
  <div className="mt-4">
      <Button value={isLoading ? "Processing..." : btnvalue} onClick={changebtnvalue} disabled={isLoading}/>
  </div>

  {/* NEFT Details Button */}
  {/* <div className="mt-3">
    <button 
        onClick={() => setShowNeftModal(true)} 
        className="w-full text-center text-sm text-blue-600 hover:underline"
    >
        View NEFT/Bank Transfer Details
    </button>
  </div> */}
</div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Container>
        </Fullcontainer>
      </Layout>

      {/* NEFT Details Modal */}
      <div className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-in-out transform ${showNeftModal ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white rounded-t-lg shadow-lg p-6 max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">NEFT Payment Details</h3>
            <button 
              onClick={() => setShowNeftModal(false)} 
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold">Company name:</span>
              <span>Material Buy Build Care Pvt Ltd</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Account number:</span>
              <span>10149191092</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">IFSC:</span>
              <span>IDFB0043391</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">SWIFT code:</span>
              <span>IDFBINBBMUM</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Bank name:</span>
              <span>IDFC FIRST</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Branch:</span>
              <span>VASAI WEST BRANCH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating button when modal is closed */}
      {!showNeftModal && (
        <button 
          onClick={() => setShowNeftModal(true)}
          className="fixed bottom-100px right-20 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-lg z-40 transition-all duration-300"
        >
          NEFT Details
        </button>
      )}

      {/* Add this with your other modals */}
      {pincodeMismatchModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-md w-full shadow-xl transform transition-all">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Shipping Address Mismatch</h3>
      </div>
      
      <div className="px-6 py-4">
        <p className="text-gray-600 mb-4">
          Some products have different shipping pincodes than your selected address:
        </p>
        
        <div className="mb-4 max-h-60 overflow-y-auto bg-gray-50 rounded-md">
          {mismatchedProducts.map((product, index) => (
            <div key={index} className={`p-3 ${index !== mismatchedProducts.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-sm sm:text-base">
                  <span className="font-medium">{product.name}</span>
                  <div className={`text-gray-500 text-xs ${product.pincode == "00000" ? "text-red-500" : ""}`}>Current pincode: {product.pincode == "00000" ? "Not checked" : product.pincode}</div>
                </div>
                <button 
                  onClick={async () => {
                    // Save promo code state before recalculation
                    const savedPromoState = {
                      promoCodeApplied: promoCodeApplied,
                      promoCode: promoCode,
                      promoCodeState: promoCodeState
                    };
                    
                    // For imported products, skip pincode validation
                    if (product.isImported) {
                      toast.info(`Processing imported product: ${product.name}`);
                      
                      // Update the product's pincode to shipping address pincode
                      dispatch(updateVendorPrice({
                        productId: product.productId,
                        vendorPrice: 0, // This will be updated later during shipping calculation
                        Npincode: shippingaddresspin, // Use shipping address pincode
                      }));
                      
                      // Remove from mismatched products
                      const updatedMismatches = mismatchedProducts.filter(p => p.productId !== product.productId);
                      setMismatchedProducts(updatedMismatches);
                      
                      // If no more mismatches, close the modal
                      if (updatedMismatches.length === 0) {
                        setPincodeMismatchModal(false);
                        // Trigger recalculation of the cart
                        handleBtnValueChange();
                      }
                      
                      return;
                    }
                    
                    // Show loading state
                    toast.info(`Recalculating delivery for ${product.name}...`);
                    
                    // Recalculate pincode
                    const success = await checkpincode2(product, shippingaddresspin);
                    
                    // Handle the result
                    if (success) {
                      toast.success(`Successfully recalculated delivery for ${product.name} to pincode ${shippingaddresspin}`);
                      // Reset pincode mismatch only for this product
                      const updatedMismatches = mismatchedProducts.filter(p => p.productId !== product.productId);
                      setMismatchedProducts(updatedMismatches);
                      
                      // If no more mismatches, close the modal
                      if (updatedMismatches.length === 0) {
                        setPincodeMismatchModal(false);
                        // Trigger recalculation of the cart
                        handleBtnValueChange();
                      }
                    } else {
                      toast.error(`Unable to deliver ${product.name} to pincode ${shippingaddresspin}`);
                    }
                    
                    // Always enable promo code button after recalculation
                    setPromoCodecheck(true);
                    
                    // Reapply promo code if it was previously applied
                    if (savedPromoState.promoCodeApplied) {
                      setTimeout(() => {
                        if (savedPromoState.promoCodeState) {
                          setPromoCodeSate(savedPromoState.promoCodeState);
                          promoCodeBtnHandler();
                        }
                      }, 500);
                    }
                  }}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto"
                >
                  Recalculate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    
      <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex flex-col sm:flex-row justify-between gap-3">
      {mismatchedProducts.length > 1 && (
        <button 
          onClick={() => {
            // Allow calculation for all products at once
            toast.info("Recalculating all products...");
            
            const recalculateAll = async () => {
              let successCount = 0;
              const initialCount = mismatchedProducts.length;
              
              for (const product of [...mismatchedProducts]) {
                // For imported products, we'll always consider them successful and update their pincode
                if (product.isImported) {
                  // Update the product's pincode to current shipping address pincode
                  dispatch(updateVendorPrice({
                    productId: product.productId,
                    vendorPrice: 0, // This will be updated later during shipping calculation
                    Npincode: shippingaddresspin, // Use current shipping address pincode
                  }));
                  
                  successCount++;
                  setMismatchedProducts(prev => prev.filter(p => p.productId !== product.productId));
                  continue;
                }
                
                const success = await checkpincode2(product, shippingaddresspin);
                if (success) {
                  successCount++;
                  // Remove this product from mismatches
                  setMismatchedProducts(prev => prev.filter(p => p.productId !== product.productId));
                }
              }
              
              if (successCount === initialCount) {
                toast.success("All products successfully recalculated");
                setPincodeMismatchModal(false);
                handleBtnValueChange();
              } else if (successCount > 0) {
                toast.info(`Recalculated ${successCount} out of ${initialCount} products`);
                // Modal will stay open with remaining products
              } else {
                toast.error("Unable to recalculate any products");
              }
            };
            
            recalculateAll();
          }}
          className="px-4 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-medium text-sm w-full sm:w-auto"
        >
          Recalculate All
        </button>
      )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => {
              setPincodeMismatchModal(false);
              // Re-enable promo code button when closing the modal
              setPromoCodecheck(true);
            }}
            className="px-4 py-2.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 font-medium text-sm"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              setPincodeMismatchModal(false);
              // Re-enable promo code button when changing address
              setPromoCodecheck(true);
              showshipchangeaddresshandler();
            }}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-medium text-sm"
          >
            Change Address
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
