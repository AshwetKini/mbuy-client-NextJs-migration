import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaShippingFast } from "react-icons/fa";
import { getProduct, getSlugName, getVariant } from "@/apis/api";

const responsive = {
  desktop: { 
    breakpoint: { max: 3000, min: 1024 }, 
    items: 4, 
    slidesToSlide: 1,
  },
  tablet: { 
    breakpoint: { max: 1023, min: 768 }, 
    items: 3, 
    slidesToSlide: 1,
  },
  mobile: { 
    breakpoint: { max: 767, min: 0 }, 
    items: 2, 
    slidesToSlide: 1,
  },
};

const responsiveNonCategory = {
  desktop: { 
    breakpoint: { max: 3000, min: 1024 }, 
    items: 6.5, 
    slidesToSlide: 1,
  },
  tablet: { 
    breakpoint: { max: 1023, min: 768 }, 
    items: 6.5,
    slidesToSlide: 1,
  },
  mobile: { 
    breakpoint: { max: 767, min: 0 }, 
    items: 2, 
    slidesToSlide: 1,
  },
};

const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const MultiCarousels = (props) => {
  const navigation = useRouter();
  const showProductHandler = async (data) => {
    const formattedTitle = (data.title ?? "").replace(/\s+/g, "-");
    navigation.replace(`/products/${formattedTitle}`);
  };
  
  const handleShowAll = () => {
    navigation.push(
      props.datatype === "deals-of-the-day" || props.datatype === "popular-picks"
        ? `/products/${props?.datatype}`
        : `/allproducts/categories/all`
    );
  };

  const changeroute = async (item) => {
     
      try {
        // Handle case where item might not have the required properties
        if (!item || !item._id || !item.productname1) {
          console.error("Invalid product data:", item);
          return;
        }

        const token = localStorage.getItem("authToken");
        let response = null;
        let slugName = null;
  
        // Format product name properly for API request by replacing spaces with hyphens
        const formattedProductName = item.productname1.trim().replace(/\s+/g, '-');
  
        try {
          // First try to get product/variant details
          if (item.mainProductId) {
            response = await getVariant(item._id);
          } else {
            response = await getProduct(item._id);
          }
          
          // Then try to get the SEO-friendly URL slug
          slugName = await getSlugName(formattedProductName, token);
          
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


  return (
    <React.Fragment>
      {props.multiCarouselData && (
        <div className="px-2 mt-2">
          <div className="flex items-center relative w-full justify-center">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold tracking-wide mb-3">
              {props.titleof.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-yellow-500">
                {props.titleof.split(" ").slice(-1)}
              </span>
            </h2>
          </div>

          {props?.datatype == "categories" && (
            <div className="overflow-hidden">
              <Carousel
                containerClass="w-full"
                itemClass="px-2"
                responsive={responsive}
                autoPlay={false}
                infinite={false}
                arrows={true}
                partialVisible={false}
                removeArrowOnDeviceType={["mobile"]}
              >
                {props.multiCarouselData?.map((product, index) => (
                
                  <ul key={product._id || index} className="h-full flex justify-center">
                    <li
                      className="relative inline-flex flex-col items-center text-center cursor-pointer border-2 border-gray-300 shadow-sm hover:shadow-md rounded-lg w-full h-[180px] bg-white"
                      onClick={() => {
                        const formattedTitle = (product.title ?? "").replace(/\s+/g, "-");
                        const formattedSubcategory = (product.subcategory ?? "").replace(/\s+/g, "-");
                        const formattedCategory = (product.categoryname ?? "").replace(/\s+/g, "-");
                        navigation.push(product.title ? `/allproducts/${formattedTitle}` : `/allproducts/${formattedCategory}/${formattedSubcategory}`);
                      }}
                    >
                      <div className="w-full h-[140px] rounded-t-lg flex justify-center items-center bg-gray-100">
                        <img
                          src={product.imgs1 || product.subcategoryimg || product.img}
                          alt={product.productname1 || "product image"}
                          className="h-full w-full object-cover rounded-t-lg"
                          style={{ objectFit: "cover"   }}
                        />
                      </div>
                      
                      <div className="justify-center flex flex-col items-center w-full p-2">
                        <span className="text-base font-bold text-blue-950 line-clamp-2">
                          {product.productname1?.length > 60
                            ? `${capitalizeWords(product.productname1.slice(0, 60 ))}...`
                            : capitalizeWords(product.title || product.subcategory)}
                        </span>
                      </div>
                    </li>
                  </ul>
                ))}
              </Carousel>
            </div>
          )}
          
          {props?.datatype !== "categories" && (
            <div className="overflow-hidden">
              <Carousel
                containerClass="w-full"
                itemClass="px-1"
                responsive={responsiveNonCategory}
                autoPlay={false}
                infinite={false}
                arrows={true}
                partialVisible={true}
                removeArrowOnDeviceType={["mobile"]}
              >
                {props.multiCarouselData?.slice(0, 8).map((product, index) => (
                  <div key={product._id || index} className="h-full flex justify-center">
                    <div
                      className="relative flex flex-col h-[240px] md:h-[280px] w-[200px] mx-auto bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden z-[1]"
                      onClick={() => changeroute(product)}
                    >
                      {/* Discount Tag */}
                      {product.discount && (
                        <div className={`absolute top-2 left-2 z-[2] ${product.discount == 0 ? "hidden" : "bg-green-600"}  text-white text-xs font-bold px-2 py-1 rounded`}>
                          {product.discount}% OFF
                        </div>
                      )}
                      
                      {/* Product Image */}
                      <div className="relative w-full h-[110px] sm:h-[130px] bg-gray-100 flex items-center justify-center p-2">
                        <img
                            src={product.imgs1 || product.img}
                          alt={product.productname1 || "Product image"}
                          className="max-h-full max-w-full object-contain transition-transform "
                          loading="lazy"
                        />
                      </div>
                      <div className="w-full flex">
                        {product.shipping ? (
                          <div className="text-red-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                            Ships within 24 hrs
                            <FaShippingFast className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="h-[26px] px-2 py-1 text-xs">&nbsp;</div>
                        )}
                      </div>
                      <div className="p-2 sm:p-2 flex flex-col items-start w-full">
                        <span className="text-xs sm:text-sm xl:text-base font-semibold text-gray-900 line-clamp-2">
                          {product.productname1 || product.title}
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm sm:text-base font-bold text-black">
                            ₹{product.discountprice2B}
                          </span>
                          {product.price2A && (
                            <span className="text-xs line-through text-gray-500">
                              ₹{product.price2A}
                            </span>
                          )}
                        </div>
                        
                        {/* Unit Price & Discount */}
                        <div className="mt-1 flex justify-between items-center w-full">
                          {product.partprice4A && (
                            <span className="px-1 py-0.5 bg-gray-100 text-[10px] text-green-700 font-medium rounded">
                              ₹{(product.discountprice2B / product.partprice4A).toFixed(2)}
                              /{product.sell4B}
                            </span>
                          )}
                          
                          {product.price2A && product.discountprice2B && product.price2A > product.discountprice2B && (
                            <span className="text-xs bg-green-50 text-green-600 font-bold px-1.5 py-0.5 rounded border border-green-200">
                              Save {(((product.price2A - product.discountprice2B) / product.price2A) * 100).toFixed(0)}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {props.multiCarouselData.length > 6 && (
                  <div className="h-full flex justify-center px-1">
                    <div
                      className="relative flex flex-col items-center justify-center text-center cursor-pointer border-2 border-gray-300 shadow-sm hover:shadow-md rounded-lg w-[200px] mx-auto  bg-blue-950 text-white"
                      onClick={handleShowAll}
                    >
                      <h2 className="text-lg font-bold">Show All</h2>
                      <span className="mt-2 text-sm">Explore More Products</span>
                      <span className="text-xl mt-4">&rarr;</span>
                    </div>
                  </div>
                )}
              </Carousel>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default MultiCarousels;
