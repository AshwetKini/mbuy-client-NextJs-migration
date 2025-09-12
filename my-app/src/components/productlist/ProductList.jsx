import React, { useEffect, useState } from "react";
import Styles from "./ProdutList.module.css";
import Fullcontainer from "../../components/UI/Fullcontainer";
import Container from "../../components/UI/Container";
import Layout from "../../Layouts/Layout";
import ProductSideTable from "../UI/ProductSideTable";
import Link from "next/link";
import { FaShippingFast, FaFilter, FaTimes, FaChevronUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getProduct, getSlugName, getVariant } from "@/apis/api";
import FormPopup from "../FormPopup";
import { BiSortAlt2, BiHeart } from "react-icons/bi";
import { motion } from "framer-motion";

const ProductList = (props) => {
  const [categories, setCategories] = useState(null);
  const [occasions, setOccasions] = useState([]);
  const router = useRouter();

  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceSort, setPriceSort] = useState("");
  const [alphabeticalSort, setAlphabeticalSort] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setCategories(props.categoriesArray);
  }, [props.categoriesArray]);

  useEffect(() => {
    if (props.Occasion) {
      setOccasions([...props.Occasion]);
    } else {
      setOccasions([]);
    }
  }, [props.Occasion]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const routechangehandler = (title) => {
    props.routechangehandler(title);
  };


  const changetheproduct = async (item) => {
    try {
      const token = localStorage.getItem("authToken");
      // Format product name properly for API request by replacing spaces with hyphens
      const formattedProductName = item.productname1.trim().replace(/\s+/g, '-');
      const slugName = await getSlugName(formattedProductName, token);
      
      console.log(slugName, "slugName");
      
      if (slugName?.data && slugName.data.length > 0 && (slugName.data[0]?.old_url || slugName.data[0]?.url_structure)) {
        // Use old_url if available, otherwise url_structure
        const urlPath = slugName.data[0]?.old_url || slugName.data[0]?.url_structure;
        router.push(item.mainProductId ? 
          `/variance/${urlPath}/${item._id}` : 
          `/products/${urlPath}/${item._id}`);
      } else {
        // Fallback if slug data is not available - create a URL-friendly product name
        const fallbackUrl = item.productname1
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        router.push(item.mainProductId ? 
          `/variance/${fallbackUrl}/${item._id}` : 
          `/products/${fallbackUrl}/${item._id}`);
      }
      
    } catch (error) {
      console.error("Error in changetheproduct:", error);
      // Fallback navigation on error
      const fallbackUrl = (item.productname1 || "product").toLowerCase().replace(/\s+/g, '-');
      router.push(item.mainProductId ? 
        `/variance/${fallbackUrl}/${item._id}` : 
        `/products/${fallbackUrl}/${item._id}`);
    }
  };

  const changeroute = async (item) => {
    try {
      // Validate item properties
      if (!item || !item._id || !item.productname1) {
        console.error("Invalid product data:", item);
        return;
      }

      const token = localStorage.getItem("authToken");
      let response = null;
      let slugName = null;

      // Format product name properly for API request by replacing spaces with hyphens
      const formattedProductName = item.productname1.trim().replace(/\s+/g, '-');

      if (item.mainProductId) {
        response = await getVariant(item._id);
        slugName = await getSlugName(formattedProductName, token);
      } else {
        response = await getProduct(item._id);
        slugName = await getSlugName(formattedProductName, token);
      }

      if (response?.data && slugName?.data && slugName.data.length > 0) {
        // Safe access to properties with fallbacks
        const urlData = slugName.data[0] || {};
        const urlStructure = urlData.url_structure || urlData.old_url || formattedProductName;
        
        router.push(
          `/${item.mainProductId ? "variance" : "products"}/${urlStructure}/${item._id}`
        );
      } else {
        // Fallback navigation if slug data is missing
        // Ensure we have a properly formatted URL path
        const fallbackUrl = formattedProductName.replace(/[^\w-]/g, '');
        
        router.push(
          `/${item.mainProductId ? "variance" : "products"}/${fallbackUrl}/${item._id}`
        );
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      
      // Final fallback with basic sanitization
      if (item && item._id && item.productname1) {
        const safeUrl = item.productname1
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '');
          
        router.push(
          `/${item.mainProductId ? "variance" : "products"}/${safeUrl}/${item._id}`
        );
      }
    }
  };

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Get unique categories and subcategories from products
  const availableCategories = [...new Set(props.productarray?.map(product => 
    product.categoryid).filter(Boolean) || [])];
  
  const availableSubcategories = [...new Set(props.productarray?.map(product => 
    product.subcategory).filter(Boolean) || [])];

  // Extract unique tag variants and their values
  const extractTagFilters = () => {
    const tagFilters = {};
    
    props.productarray?.forEach(product => {
      if (product.tags && Array.isArray(product.tags)) {
        product.tags.forEach(tag => {
          if (tag.variant && tag.value) {
            if (!tagFilters[tag.variant]) {
              tagFilters[tag.variant] = new Set();
            }
            tagFilters[tag.variant].add(tag.value);
          }
        });
      }
    });
    
    const result = {};
    Object.keys(tagFilters).forEach(variant => {
      result[variant] = Array.from(tagFilters[variant]);
    });
    
    return result;
  };

  const availableTagFilters = extractTagFilters();

  // Handle tag filter change
  const handleTagChange = (tagVariant, tagValue) => {
    setSelectedTags(prev => ({
      ...prev,
      [tagVariant]: tagValue === "all" ? "" : tagValue
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedTags({});
    setPriceSort("");
    setAlphabeticalSort("");
  };

  // Filter products
  const filteredProducts = props.productarray
    ?.filter((product) => {
      const matchesCategory = selectedCategories.length
        ? selectedCategories.includes(product.categoryid)
        : true;

      const matchesSubcategory = selectedSubcategories.length
        ? selectedSubcategories.includes(product.subcategory)
        : true;

      const matchesTags = Object.keys(selectedTags).every(tagVariant => {
        if (!selectedTags[tagVariant]) return true;
        return product.tags?.some(tag => 
          tag.variant === tagVariant && tag.value === selectedTags[tagVariant]
        );
      });

      return matchesCategory && matchesSubcategory && matchesTags;
    })
    .sort((a, b) => {
      if (priceSort === "price-lowToHigh") {
        return a.discountprice2B - b.discountprice2B;
      } else if (priceSort === "price-highToLow") {
        return b.discountprice2B - a.discountprice2B;
      } else if (alphabeticalSort === "alpha-aToZ") {
        return a.productname1?.localeCompare(b.productname1 || "");
      } else if (alphabeticalSort === "alpha-zToA") {
        return b.productname1?.localeCompare(a.productname1 || "");
      }
      return 0;
    }) || [];

  const reversedCategories = categories ? [...categories].reverse() : [];
  const reversedOccasions = occasions ? [...occasions].reverse() : [];

  return (
    <>
      <Layout>
        <div className={`bg-white sm:px-6 py-6`}>
          {/* Breadcrumb Navigation */}
          <div className="container mx-auto px-4 mb-6">
            <nav className="flex flex-wrap items-center text-sm font-medium mb-4">
              {props.pagelocation?.map((item, idx) => (
                <Link href={item.path} key={idx} legacyBehavior>
                  <a className="hover:text-blue-500 transition-colors">
                    {item.title}
                  </a>
                </Link>
              ))}
            </nav>

            {/* Page Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {props.sidetabletitle || "Shop All Products"}
            </h1>

              {props.currentpageq !== "categories" && (
                <>
                 {/* Mobile Filter/Sort Controls */}
                <div className="md:hidden flex items-center gap-2 w-full mb-4">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded text-sm bg-blue-950 text-white hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMobileFilterOpen(true)}
                  >
                    <FaFilter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                  
                  <select
                    className="flex-1 px-3 py-2 border rounded text-sm bg-blue-950 text-white transition-colors appearance-none cursor-pointer text-center"
                    value={priceSort || alphabeticalSort}
                    onChange={(e) => {
                      setPriceSort(e.target.value.startsWith('price') ? e.target.value : '');
                      setAlphabeticalSort(e.target.value.startsWith('alpha') ? e.target.value : '');
                    }}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Sort by</option>
                    <option value="price-lowToHigh">Price: Low to High</option>
                    <option value="price-highToLow">Price: High to Low</option>
                    <option value="alpha-aToZ">Name: A to Z</option>
                    <option value="alpha-zToA">Name: Z to A</option>
                  </select>
                </div>
                </>
              )}  
           

            {/* Active Filters Display */}
            {!categories && (selectedCategories.length > 0 || selectedSubcategories.length > 0 || 
              Object.keys(selectedTags).some(key => selectedTags[key])) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map(cat => (
                  <span key={`pill-cat-${cat}`} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {cat}
                    <button 
                      onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))}
                      className="ml-1 text-blue-600 hover:text-blue-800 p-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}

                {selectedSubcategories.map(subcat => (
                  <span key={`pill-subcat-${subcat}`} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {subcat}
                    <button 
                      onClick={() => setSelectedSubcategories(prev => prev.filter(s => s !== subcat))}
                      className="ml-1 text-green-600 hover:text-green-800 p-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}

                {Object.entries(selectedTags).map(([tagVariant, tagValue]) => (
                  tagValue && (
                    <span key={`pill-tag-${tagVariant}`} className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {tagVariant}: {tagValue}
                      <button 
                        onClick={() => handleTagChange(tagVariant, "all")}
                        className="ml-1 text-purple-600 hover:text-purple-800 p-1"
                      >
                        &times;
                      </button>
                    </span>
                  )
                ))}
                
                <button 
                  className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full hover:bg-red-200"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Mobile Filter Drawer */}
            {isMobileFilterOpen && (
              <div className="md:hidden fixed inset-0 h-screen w-screen bg-black   bg-opacity-50 z-50">
                <div className="absolute right-0 top-0 h-full w-[85%] bg-white p-4 overflow-y-scroll">
                  <div className="flex justify-between  items-center mb-4">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Tag Filters */}
                  {Object.keys(availableTagFilters).length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3 text-gray-800">Product Specifications</h4>
                      {Object.entries(availableTagFilters).map(([tagVariant, tagValues]) => (
                        <div key={tagVariant} className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {tagVariant}
                          </label>
                          <select
                            className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                            value={selectedTags[tagVariant] || ""}
                            onChange={(e) => handleTagChange(tagVariant, e.target.value)}
                          >
                            <option value="all">All {tagVariant}</option>
                            {tagValues.map(value => (
                              <option key={value} value={value} className="capitalize">
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Category Filters */}
                  {availableCategories.length > 0 && (
                    <div className="mb-5">
                      <h4 className="font-medium mb-3 text-gray-800">Categories ({availableCategories.length})</h4>
                      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
                        {availableCategories.map((category) => (
                          <div key={category} className="flex items-center py-1.5">
                            <input
                              type="checkbox"
                              id={`mob-cat-${category}`}
                              value={category}
                              checked={selectedCategories.includes(category)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCategories([...selectedCategories, category]);
                                } else {
                                  setSelectedCategories(selectedCategories.filter((id) => id !== category));
                                }
                              }}
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={`mob-cat-${category}`} className="ml-2 text-sm text-gray-700 truncate">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subcategory Filters */}
                  {availableSubcategories.length > 0 && (
                    <div className="mb-5">
                      <h4 className="font-medium mb-3 text-gray-800">Subcategories ({availableSubcategories.length})</h4>
                      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
                        {availableSubcategories.map((subcategory) => (
                          <div key={subcategory} className="flex items-center py-1.5">
                            <input
                              type="checkbox"
                              id={`mob-subcat-${subcategory}`}
                              value={subcategory}
                              checked={selectedSubcategories.includes(subcategory)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedSubcategories([...selectedSubcategories, subcategory]);
                                } else {
                                  setSelectedSubcategories(selectedSubcategories.filter((id) => id !== subcategory));
                                }
                              }}
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor={`mob-subcat-${subcategory}`} className="ml-2 text-sm text-gray-700 truncate">
                              {subcategory}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clear Filters Button */}
                  {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || 
                    Object.keys(selectedTags).some(key => selectedTags[key])) && (
                    <button 
                      className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors mb-3"
                      onClick={() => {
                        clearAllFilters();
                        setIsMobileFilterOpen(false);
                      }}
                    >
                      Clear All Filters
                    </button>
                  )}

                  {/* Apply Filters Button */}
                  <button 
                    className="w-full p-2 bg-blue-950 text-white rounded hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Sidebar - Desktop Only */}
              <div className="hidden md:block md:w-1/4 lg:w-1/5">
                {categories ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                    <ProductSideTable
                      categoriesList={reversedCategories}
                      routechangehandler={routechangehandler}
                      sidetabletitle={props.sidetabletitle}
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-900 mb-4">Filters</h3>
                      
                      {/* Tag Filters */}
                      {Object.keys(availableTagFilters).length > 0 && (
                        <div className="mb-5">
                          <h4 className="font-medium mb-3 text-gray-800">Product Specifications</h4>
                          {Object.entries(availableTagFilters).map(([tagVariant, tagValues]) => (
                            <div key={tagVariant} className="mb-3">
                              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                {tagVariant}
                              </label>
                              <select
                                className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                                value={selectedTags[tagVariant] || ""}
                                onChange={(e) => handleTagChange(tagVariant, e.target.value)}
                              >
                                <option value="all">All {tagVariant}</option>
                                {tagValues.map(value => (
                                  <option key={value} value={value} className="capitalize">
                                    {value}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Category Filters */}
                      {availableCategories.length > 0 && (
                        <div className="mb-5">
                          <h4 className="font-medium mb-3 text-gray-800">Categories ({availableCategories.length})</h4>
                          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
                            {availableCategories.map((category) => (
                              <div key={category} className="flex items-center py-1.5">
                                <input
                                  type="checkbox"
                                  id={`cat-${category}`}
                                  value={category}
                                  checked={selectedCategories.includes(category)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedCategories([...selectedCategories, category]);
                                    } else {
                                      setSelectedCategories(selectedCategories.filter((id) => id !== category));
                                    }
                                  }}
                                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor={`cat-${category}`} className="ml-2 text-sm text-gray-700 truncate">
                                  {category}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Subcategory Filters */}
                      {availableSubcategories.length > 0 && (
                        <div className="mb-5">
                          <h4 className="font-medium mb-3 text-gray-800">Subcategories ({availableSubcategories.length})</h4>
                          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
                            {availableSubcategories.map((subcategory) => (
                              <div key={subcategory} className="flex items-center py-1.5">
                                <input
                                  type="checkbox"
                                  id={`subcat-${subcategory}`}
                                  value={subcategory}
                                  checked={selectedSubcategories.includes(subcategory)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedSubcategories([...selectedSubcategories, subcategory]);
                                    } else {
                                      setSelectedSubcategories(selectedSubcategories.filter((id) => id !== subcategory));
                                    }
                                  }}
                                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor={`subcat-${subcategory}`} className="ml-2 text-sm text-gray-700 truncate">
                                  {subcategory}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Clear Filters Button */}
                      {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || 
                        Object.keys(selectedTags).some(key => selectedTags[key])) && (
                        <button 
                          className="w-full p-2 bg-blue-950 text-white rounded hover:bg-blue-700 transition-colors"
                          onClick={clearAllFilters}
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Content Area - Make it full width on mobile */}
              <div className="w-full md:w-3/4 lg:w-4/5">
                {/* Product Count & Filter Status - Only show when products are displayed */}
                {!categories && !props.nodatafound && (
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing <span className="font-medium">{filteredProducts.length}</span> 
                      {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || 
                        Object.keys(selectedTags).some(key => selectedTags[key])) 
                        ? ' filtered ' : ' '}
                      products
                    </div>
                    
                    {/* Desktop Sort Control */}
                    <div className="hidden md:block">
                      <select
                        className="px-3 py-2 border rounded text-sm bg-blue-950 text-white transition-colors appearance-none cursor-pointer"
                        value={priceSort || alphabeticalSort}
                        onChange={(e) => {
                          setPriceSort(e.target.value.startsWith('price') ? e.target.value : '');
                          setAlphabeticalSort(e.target.value.startsWith('alpha') ? e.target.value : '');
                        }}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.5rem center',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem'
                        }}
                      >
                        <option value="">Sort by</option>
                        <option value="price-lowToHigh">Price: Low to High</option>
                        <option value="price-highToLow">Price: High to Low</option>
                        <option value="alpha-aToZ">Name: A to Z</option>
                        <option value="alpha-zToA">Name: Z to A</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {/* No Data Found Message */}
                {props.nodatafound && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <div className="mb-4">
                      <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Products Found</h3>
                    <p className="text-gray-500">We couldn't find any products matching your criteria.</p>
                  </div>
                )}

                {/* Categories Display */}
                {categories ? (
                  <div className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                      {reversedCategories.map((data, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => routechangehandler(data)}
                          className="cursor-pointer hover:shadow-md transition-all duration-300 bg-white border border-gray-200 rounded-lg overflow-hidden group flex flex-col h-full"
                        >
                          <div className="aspect-square bg-gray-100 relative overflow-hidden">
                            {(data.imgs1 || data.subsubcategoryimg || data.subcategoryimg || data.img) && (
                              <img
                                src={data.imgs1 || data.subsubcategoryimg || data.subcategoryimg || data.img}
                                alt={data.subcategory || data.title || "Category image"}
                                className="object-contain w-full h-full p-3 transition-transform duration-300 group-hover:scale-105"
                              />
                            )}
                          </div>
                          <div className="p-3 md:p-4 flex-grow">
                            <h3 className="text-sm md:text-base font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors line-clamp-2">
                              {capitalizeWords(data.subcategory || data.title || "")}
                            </h3>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Product Grid */
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product, index) => (
                        <motion.div 
                          key={product._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <div
                            className="relative flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                            onClick={() => changetheproduct(product)}
                          >
                            {/* Discount Tag */}
                            {product.discount && (
                              <div className={`absolute top-2 left-2 z-10 ${product.discount == 0 ? "hidden" : "bg-green-600"}  text-white text-xs font-bold px-2 py-1 rounded`}>
                                {product.discount}% OFF
                              </div>
                            )}
                            
                            {/* Product Image */}
                            <div className="relative w-full h-[120px] sm:h-[160px] bg-gray-100 flex items-center justify-center p-2">
                              <img
                                src={product.imgs1 || product.img}
                                alt={product.productname1 || "Product image"}
                                className="max-h-full max-w-full object-contain transition-transform hover:scale-105"
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
                            <div className="p-2 sm:p-3 flex flex-col items-start w-full">
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
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full py-12 text-center">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                          <div className="mb-4">
                            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Products Found</h3>
                          <p className="text-gray-500 mb-4">We couldn't find any products matching your selected filters.</p>
                          {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || 
                            Object.keys(selectedTags).some(key => selectedTags[key])) && (
                            <button 
                              className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-700 transition-colors"
                              onClick={clearAllFilters}
                            >
                              Clear All Filters
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Display Occasions if available */}
                {occasions && occasions.length > 0 && (
                  <div className="mt-12">
                    {reversedOccasions.map((occasion) => (
                      <div key={occasion._id} className="mb-10">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">
                          Shop by <span className="text-blue-600">{occasion.Occasion}</span>
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                          {occasion.subcategory.map((sub, subIndex) => (
                            <motion.div
                              key={subIndex}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: subIndex * 0.05 }}
                              onClick={() => routechangehandler(sub)}
                              className="cursor-pointer hover:shadow-md transition-all duration-300 bg-white border border-gray-200 rounded-lg overflow-hidden group flex flex-col h-full"
                            >
                              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                <img
                                  src={sub.subcategoryimg}
                                  alt={sub.subcategory || "occasion image"}
                                  className="object-contain w-full h-full p-3 transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <div className="p-3 md:p-4 flex-grow">
                                <h3 className="text-sm md:text-base font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors line-clamp-2">
                                  {capitalizeWords(sub.subcategory || "")}
                                </h3>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Category Description */}
          {props.categoryObject && (
            <div className="container mx-auto px-4 mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">More About {props.sidetabletitle}</h2>
                <div 
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: props.categoryObject.description || "<p>No description available.</p>" }}
                />
              </div>
            </div>
          )}

          {/* Subcategory Description */}
          {props.filteredSubcategories?.length > 0 && props.filteredSubcategories[0]?.description && (
            <div className="container mx-auto px-4 mt-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {props.sidetabletitle}</h2>
                <div 
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: props.filteredSubcategories[0]?.description || "<p>No description available.</p>" }}
                />
              </div>
            </div>
          )}
          
          {/* Scroll to top button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 p-3 bg-blue-950 text-white rounded-full shadow-lg  transition-colors z-30"
              aria-label="Scroll to top"
            >
              <FaChevronUp />
            </button>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ProductList;
