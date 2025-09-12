import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Image from "next/image";
import { FaMapMarkerAlt, FaPlus, FaShippingFast } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";

import Styles from "./ChangeAddress.module.css";
import { getRecommendedProduct } from "@/apis/api";

const ChangeAddress = (props) => {
  console.log(props.address);
  const [active, setActive] = useState(false);
  const navigation = useRouter();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [showRecommended, setShowRecommended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const showAddressRef = useRef(null);
  // Initialize selection state based on props.address.currentlySelected (default to 1)
  const currentlySelected = props.address.currentlySelected || 1;
  const [select1, setSelect1] = useState(currentlySelected === 1);
  const [select2, setSelect2] = useState(currentlySelected === 2);
  const [select3, setSelect3] = useState(currentlySelected === 3);
  const [select4, setSelect4] = useState(currentlySelected === 4);
  const [select5, setSelect5] = useState(currentlySelected === 5);
  const [billing1, setBilling1] = useState(currentlySelected === 1);
  const [billing2, setBilling2] = useState(currentlySelected === 2);
  const [billing3, setBilling3] = useState(currentlySelected === 3);
  const [billing4, setBilling4] = useState(currentlySelected === 4);
  const [billing5, setBilling5] = useState(currentlySelected === 5);

  // console.log(props.address);

  useEffect(() => {
    setTimeout(() => {
      setActive(!active);
    }, 50);

    if (props.active) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = "hidden";
      fetchRecommendedProducts();
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [props.active]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showAddressRef.current &&
        !showAddressRef.current.contains(event.target)
      ) {
        props.hide(false);
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const address1handler = () => {
    setSelect1(true);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address1} ${props.address.pincode1}`,
      shippin: `${props.address.pincode1}`,
      addressIndex: 1,
      addressName: props.address.name1 || ''
    });
    props.hide(false);
    setActive(false);
  };

  const address2handler = () => {
    setSelect1(false);
    setSelect2(true);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address2} ${props.address.pincode2}`,
      shippin: `${props.address.pincode2}`,
      addressIndex: 2,
      addressName: props.address.name2 || ''
    });
    props.hide(false);
    setActive(false);
  };

  const address3handler = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(true);
    setSelect4(false);
    setSelect5(false);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address3} ${props.address.pincode3}`,
      shippin: `${props.address.pincode3}`,
      addressIndex: 3,
      addressName: props.address.name3 || ''
    });
    props.hide(false);
    setActive(false);
  };

  const address4handler = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(true);
    setSelect5(false);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address4} ${props.address.pincode4}`,
      shippin: `${props.address.pincode4}`,
      addressIndex: 4,
      addressName: props.address.name4 || ''
    });
    props.hide(false);
    setActive(false);
  };

  const address5handler = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(true);
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    props.getuserchoice({
      shippingaddress: `${props.address.address5} ${props.address.pincode5}`,
      shippin: `${props.address.pincode5}`,
      addressIndex: 5,
      addressName: props.address.name5 || ''
    });
    props.hide(false);
    setActive(false);
  };

  const billing1handler = () => {
    setBilling1(true);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ 
      billingaddress: `${props.address.address1} ${props.address.pincode1}`,
      billingpin: `${props.address.pincode1}`,
      billingname: props.address.name1 || '',
      addressIndex: 1
    });
    props.hide(false);
    setActive(false);
  };

  const billing2handler = () => {
    setBilling1(false);
    setBilling2(true);
    setBilling3(false);
    setBilling4(false);
    setBilling5(false);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ 
      billingaddress: `${props.address.address2} ${props.address.pincode2}`,
      billingpin: `${props.address.pincode2}`,
      billingname: props.address.name2 || '',
      addressIndex: 2
    });
    props.hide(false);
    setActive(false);
  };

  const billing3handler = () => {
    setBilling1(false);
    setBilling2(false);
    setBilling3(true);
    setBilling4(false);
    setBilling5(false);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ 
      billingaddress: `${props.address.address3} ${props.address.pincode3}`,
      billingpin: `${props.address.pincode3}`,
      billingname: props.address.name3 || '',
      addressIndex: 3
    });
    props.hide(false);
    setActive(false);
  };

  const billing4handler = () => {
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(true);
    setBilling5(false);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ 
      billingaddress: `${props.address.address4} ${props.address.pincode4}`,
      billingpin: `${props.address.pincode4}`,
      billingname: props.address.name4 || '',
      addressIndex: 4
    });
    props.hide(false);
    setActive(false);
  };

  const billing5handler = () => {
    setBilling1(false);
    setBilling2(false);
    setBilling3(false);
    setBilling4(false);
    setBilling5(true);
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    props.getuserchoice({ 
      billingaddress: `${props.address.address5} ${props.address.pincode5}`,
      billingpin: `${props.address.pincode5}`,
      billingname: props.address.name5 || '',
      addressIndex: 5
    });
    props.hide(false);
    setActive(false);
  };

  // const confirmhandler = () => {
  //   props.hide(false);
  //   setActive(false);
  // };

  const shippingadd = () => {
    window.location.href = "/manageaddress";
  }

  // Function to fetch recommended products
  const fetchRecommendedProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getRecommendedProduct();
      console.log(response, "recommended products data");
      
      // Match the structure seen in index.js
      if (response) {
        // Combine products and allVariations arrays if they exist (matching index.js pattern)
        const products = [...(response?.products || []), ...(response?.allVariations || [])];
        
        if (products.length > 0) {
          setRecommendedProducts(products);
          setShowRecommended(true);
        } else {
          // If no products found, use mock data
          useMockData();
        }
      } else {
        // If response is invalid, use mock data
        useMockData();
      }
    } catch (error) {
      console.error("Error fetching recommended products:", error);
      // Fallback to mock data on error
      useMockData();
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to use mock data
  const useMockData = () => {
    setRecommendedProducts([
      {
        _id: "product1",
        productname1: "Steel TMT Bar",
        imgs1: "https://via.placeholder.com/150",
        productsellprice: "1250"
      },
      {
        _id: "product2",
        productname1: "Cement OPC 53",
        imgs1: "https://via.placeholder.com/150",
        productsellprice: "420"
      },
      {
        _id: "product3",
        productname1: "Birla White Cement",
        imgs1: "https://via.placeholder.com/150",
        productsellprice: "699"
      },
      {
        _id: "product4",
        productname1: "AAC Blocks",
        imgs1: "https://via.placeholder.com/150",
        productsellprice: "89"
      }
    ]);
    setShowRecommended(true);
  };

  return (
    <div className={`${Styles.changeaddress_window} ${props.active ? Styles.active : ""}`}>
      <div className={`${Styles.changeaddress} ${active ? Styles.activee : ""}`} ref={showAddressRef}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            {props.address.name1 ? "Billing Address" : "Shipping Address"}
          </h1>
          <button 
            onClick={() => props.hide(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Address List */}
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4, 5].map((num) =>
            props.address[`address${num}`] ? (
              <div
                key={num}
                className={`border rounded-lg p-3 transition-all duration-200 cursor-pointer ${
                  eval(`select${num}`) || eval(`billing${num}`)
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={
                  props.address[`name${num}`]
                    ? eval(`billing${num}handler`)
                    : eval(`address${num}handler`)
                }
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    eval(`select${num}`) || eval(`billing${num}`)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-gray-800 font-medium text-sm">
                      {props.address[`address${num}`]}
                      {props.address[`pincode${num}`]
                        ? `, ${props.address[`pincode${num}`]}`
                        : ""}
                    </h2>
                    {eval(`select${num}`) || eval(`billing${num}`) && (
                      <span className="text-xs text-blue-500 mt-1 block">Selected</span>
                    )}
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Add New Address Button */}
        <div className="p-4 border-t bg-gray-50">
          <Button
            value="Add New Address"
            onClick={shippingadd}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <FaPlus className="w-4 h-4" />
            <span>Add New Address</span>
          </Button>
        </div>

        {/* Recommended Products Section */}
        <div className="border-t mt-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Recommended Products</h2>
            </div>
            
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <BiLoaderAlt className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                <MdErrorOutline className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            {!isLoading && !error && recommendedProducts.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <p>No recommended products found</p>
              </div>
            )}
            
            {!isLoading && !error && recommendedProducts.length > 0 && (
              <>
                <div className={Styles.recommended_grid}>
                  {recommendedProducts.slice(0, 6).map((product, index) => (
                    <div key={product._id || index} className="px-2 py-1 flex justify-center">
                      <div
                        className="relative flex flex-col w-full max-w-[250px] bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                        onClick={() => navigation.push(`/products/${product.productname1?.toLowerCase().replace(/\s+/g, "-") || "product"}/${product._id}`)}
                      >
                        {/* Discount Tag */}
                        {product.discount && (
                          <div className={`absolute top-2 left-2 z-10 ${product.discount == 0 ? "hidden" : "bg-green-600"}  text-white text-xs font-bold px-2 py-1 rounded`}>
                            {product.discount}% OFF
                          </div>
                        )}

                        {/* Product Image */}
                        <div className="relative w-full h-[160px] bg-gray-100 flex items-center justify-center p-2">
                          <img
                            src={product.imgs1 || product.img || "/placeholder.jpg"}
                            alt={product.productname1 || "Product image"}
                            className="max-h-full max-w-full object-contain transition-transform hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="w-full flex">
                          {product.shipping ? (
                            <div className="text-red-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                              Ships within 24 hrs
                              <FaShippingFast />
                            </div>
                          ) : (
                            <div className="h-[26px] px-2 py-1 text-xs">&nbsp;</div> // Empty div with matching height to prevent layout shift
                          )}
                        </div>
                        <div className="p-3 flex flex-col items-start w-full">
                          <span className="text-sm md:text-base font-semibold text-gray-900">
                            {product.productname1?.length > 50
                              ? `${product.productname1.slice(0, 50)}...`
                              : product.productname1 || product.title}
                          </span>
                          <div className="flex s">
                            <span className="text-base font-bold text-black">
                              ₹{product.discountprice2B || product.productsellprice || "N/A"}
                            </span>
                            {product.price2A && (
                              <span className="text-xs line-through text-gray-500 ml-2">
                                ₹{product.price2A}
                              </span>
                            )}
                          </div>

                          {/* Unit Price & Discount */}
                          <div className="mt-1 w-full flex justify-between items-center">
                            {product.partprice4A && (
                              <span className="px-1.5 py-0.5 bg-gray-100 text-xs text-green-700 font-medium rounded">
                                ₹{(product.discountprice2B / product.partprice4A).toFixed(2)}
                                /{product.sell4B}
                              </span>
                            )}
                            
                            {product.price2A && product.discountprice2B && (
                              <span className="text-xs bg-green-50 text-green-600 font-bold px-1.5 py-0.5 rounded border border-green-200">
                                Save {(((product.price2A - product.discountprice2B) / product.price2A) * 100).toFixed(0)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View All Button */}
                {recommendedProducts.length > 6 && (
                  <div className="mt-4 px-2">
                    <button 
                      onClick={() => navigation.push('/products/popular-picks')}
                      className="w-full bg-blue-950 hover:bg-blue-800 text-white py-2.5 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center"
                    >
                      View All Products ({recommendedProducts.length})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAddress;
