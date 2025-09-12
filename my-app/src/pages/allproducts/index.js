import React, { useState, useEffect } from "react";
import { getAllProducts, getSlugName, getCategories } from "@/apis/api";
import Layout from "@/Layouts/Layout";
import { FaShippingFast, FaFilter, FaTimes } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products separately
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchfor")?.toLowerCase() || "";
  const [priceSort, setPriceSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [alphabeticalSort, setAlphabeticalSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  // For tag filtering
  const [selectedTags, setSelectedTags] = useState({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);
  
        let mergedData = [
          ...productsResponse.data?.data.products,
          ...productsResponse.data?.data.variant,
        ].filter(product => product); // Filter out null/undefined products
  
        setAllProducts(mergedData);
        setProducts(mergedData);
      } catch (error) {
        console.error("Error fetching data", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // First filter products based on search term only
  const searchFilteredProducts = allProducts.filter((product) => {
    const matchesSearchTerm =
      product.productname1?.toLowerCase().includes(searchTerm) ||
      product.categoryid?.toLowerCase().includes(searchTerm) ||
      product.subcategory?.toLowerCase().includes(searchTerm) ||
      product.subsubcategory?.toLowerCase().includes(searchTerm) ||
      // Search in tags
      product.tags?.some(tag => 
        tag.variant?.toLowerCase().includes(searchTerm) || 
        tag.value?.toLowerCase().includes(searchTerm)
      );
    
    return matchesSearchTerm;
  });

  // Get unique categories and subcategories ONLY from search results
  const availableCategories = [...new Set(searchFilteredProducts.map(product => 
    product.categoryid).filter(Boolean))];
  
  const availableSubcategories = [...new Set(searchFilteredProducts.map(product => 
    product.subcategory).filter(Boolean))];

  // Extract unique tag variants and their values from search results
  const extractTagFilters = () => {
    const tagFilters = {};
    
    searchFilteredProducts.forEach(product => {
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
    
    // Convert Sets to Arrays
    const result = {};
    Object.keys(tagFilters).forEach(variant => {
      result[variant] = Array.from(tagFilters[variant]);
    });
    
    return result;
  };
  
  // Get available tag filters
  const availableTagFilters = searchTerm ? extractTagFilters() : {};

  // Then apply additional filters including tags
  const filteredProducts = searchFilteredProducts
    .filter((product) => {
    const matchesCategory = selectedCategories.length
      ? selectedCategories.includes(product.categoryid)
      : true;

    const matchesSubcategory = selectedSubcategories.length
      ? selectedSubcategories.includes(product.subcategory)
      : true;

    const matchesPriceRange =
        (minPrice ? product.discountprice2B >= parseInt(minPrice) : true) &&
        (maxPrice ? product.discountprice2B <= parseInt(maxPrice) : true);
      
      // Check if product matches selected tag filters
      const matchesTags = Object.keys(selectedTags).every(tagVariant => {
        // Skip if no tag value is selected for this variant
        if (!selectedTags[tagVariant]) return true;
        
        // Check if product has this tag variant with the selected value
        return product.tags?.some(tag => 
          tag.variant === tagVariant && tag.value === selectedTags[tagVariant]
        );
      });
  
      return matchesCategory && matchesSubcategory && matchesPriceRange && matchesTags;
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
    } else {
      return 0;
    }
  });

  // Handle tag filter change
  const handleTagChange = (tagVariant, tagValue) => {
    setSelectedTags(prev => ({
      ...prev,
      [tagVariant]: tagValue === "all" ? "" : tagValue
    }));
  };

  // Clear filters that no longer apply to search results
  useEffect(() => {
    if (selectedCategories.length > 0) {
      setSelectedCategories(prev => 
        prev.filter(cat => availableCategories.includes(cat))
      );
    }
    
    if (selectedSubcategories.length > 0) {
      setSelectedSubcategories(prev => 
        prev.filter(subcat => availableSubcategories.includes(subcat))
      );
    }

    // Reset tag filters when search term changes
    setSelectedTags({});
  }, [searchTerm]);

  // Clear all filters function
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setMinPrice("");
    setMaxPrice("");
    setPriceSort("");
    setAlphabeticalSort("");
    setSelectedTags({});
  };

  return (
    <Layout>
      <div className="w-full bg-white flex flex-col md:flex-row min-h-screen relative">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden md:block w-full md:w-1/5 p-4 bg-gray-100 overflow-auto max-h-screen">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>

          {/* Tag Filters - Only shown when there's a search term */}
          {searchTerm && Object.keys(availableTagFilters).length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-blue-950">Product Specifications</h4>
              {Object.entries(availableTagFilters).map(([tagVariant, tagValues]) => (
                <div key={tagVariant} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {tagVariant}
                  </label>
            <select
                    className="w-full p-2 border rounded text-sm"
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
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-blue-950">Categories ({availableCategories.length})</h4>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
              {availableCategories.length > 0 ? (
                availableCategories.map((category) => (
                  <div key={category} className="flex flex-row items-center py-1">
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
                      className="h-4 w-4"
                    />
                    <label htmlFor={`cat-${category}`} className="ml-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {category}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 py-1">No categories available</p>
              )}
            </div>
          </div>

          {/* Subcategory Filters */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-blue-950">Subcategories ({availableSubcategories.length})</h4>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
              {availableSubcategories.length > 0 ? (
                availableSubcategories.map((subcategory) => (
                  <div key={subcategory} className="flex items-center flex-row py-1">
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
                      className="h-4 w-4"
                    />
                    <label htmlFor={`subcat-${subcategory}`} className="ml-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                      {subcategory}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 py-1">No subcategories available</p>
              )}
            </div>
          </div>

          {/* Clear Filters Button */}
          {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || 
            minPrice || maxPrice || priceSort || alphabeticalSort || 
            Object.keys(selectedTags).some(key => selectedTags[key])) && (
            <button 
              className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute right-0 top-0 h-full w-[85%] bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Tag Filters */}
              {searchTerm && Object.keys(availableTagFilters).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-blue-950">Product Specifications</h4>
                  {Object.entries(availableTagFilters).map(([tagVariant, tagValues]) => (
                    <div key={tagVariant} className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {tagVariant}
                      </label>
                      <select
                        className="w-full p-2 border rounded text-sm"
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
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-blue-950">Categories ({availableCategories.length})</h4>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
                  {availableCategories.length > 0 ? (
                    availableCategories.map((category) => (
                      <div key={category} className="flex flex-row items-center py-2">
        <input
          type="checkbox"
                          id={`cat-mobile-${category}`}
          value={category}
          checked={selectedCategories.includes(category)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedCategories([...selectedCategories, category]);
            } else {
              setSelectedCategories(selectedCategories.filter((id) => id !== category));
            }
          }}
                          className="h-4 w-4"
        />
                        <label htmlFor={`cat-mobile-${category}`} className="ml-2 text-sm">
          {category}
        </label>
      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 py-1">No categories available</p>
                  )}
                </div>
  </div>

  {/* Subcategory Filters */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-blue-950">Subcategories ({availableSubcategories.length})</h4>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 bg-white">
                  {availableSubcategories.length > 0 ? (
                    availableSubcategories.map((subcategory) => (
                      <div key={subcategory} className="flex items-center flex-row py-2">
        <input
          type="checkbox"
                          id={`subcat-mobile-${subcategory}`}
          value={subcategory}
          checked={selectedSubcategories.includes(subcategory)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedSubcategories([...selectedSubcategories, subcategory]);
            } else {
              setSelectedSubcategories(selectedSubcategories.filter((id) => id !== subcategory));
            }
          }}
                          className="h-4 w-4"
        />
                        <label htmlFor={`subcat-mobile-${subcategory}`} className="ml-2 text-sm">
          {subcategory}
        </label>
      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 py-1">No subcategories available</p>
                  )}
                </div>
              </div>

              {/* Clear Filters Button */}
              {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || 
                Object.keys(selectedTags).some(key => selectedTags[key])) && (
                <button 
                  className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mt-4"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters
              </button>
            </div>
  </div>
        )}

        {/* Product Listing */}
        <div className="flex-1 p-2 md:p-4 bg-white">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-xl text-gray-500">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {searchTerm ? (
                    <>Results for: <span className="text-blue-500">"{searchTerm}"</span></>
                  ) : (
                    "All Products"
                  )}
              </h2>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="w-full sm:w-auto flex gap-2">
                    {/* Filter Button - Mobile */}
                    <button
                      className="md:hidden flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded text-sm bg-blue-950 text-white hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMobileFilterOpen(true)}
                    >
                      <FaFilter className="w-4 h-4" />
                      <span>Filters</span>
                    </button>
                    <select
                      className="flex-1 sm:flex-none px-3 py-2 border rounded text-sm bg-blue-950 text-white hover:bg-blue-700 transition-colors appearance-none cursor-pointer text-center"
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
              </div>

              {/* Active Filter Pills Display */}
              {(selectedCategories.length > 0 || selectedSubcategories.length > 0 || 
                Object.keys(selectedTags).some(key => selectedTags[key])) && (
                <div className="w-full mb-4 flex flex-wrap gap-2">
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
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
                {filteredProducts.map((product, index) => (
                 <div key={product._id || index} className="w-full">
                   <div
                     className="relative flex flex-col w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => router.push(`/${product.mainProductId? "variance" : "products"}/${product.productname1}/${product._id}`)}
                    >
                     {/* Discount Tag */}
                      {product.discount && (
                       <div className={`absolute top-2 left-2 z-10 ${product.discount == 0 ? "hidden" : "bg-green-600"} text-white text-xs font-bold px-2 py-1 rounded`}>
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
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
            <p className="text-xl text-gray-500 mt-10">No products found for "{searchTerm}"</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={clearAllFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

 export default AllProducts;