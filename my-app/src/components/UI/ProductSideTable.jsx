import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import Styles from "./ProductSideTable.module.css";
import Link from "next/link";

const ProductSideTable = (props) => {
  const [categories, setCategories] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    setCategories(props.categoriesList);
  }, [props.categoriesList]);

  const routechangehandler = (title) => {
    setActiveCategory(title._id || title.id);
    props.routechangehandler(title);
  };

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str
      .split(/[-\s]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="md:hidden w-full border border-gray-200 rounded-lg overflow-hidden bg-white mb-4">
        <button
          className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-base font-semibold text-gray-900 block truncate">
            {capitalizeWords(props.sidetabletitle || "Categories")}
          </span>

          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isOpen && categories && (
          <div className="border-t border-gray-200 max-h-[60vh] overflow-y-auto">
            {categories.map((data, index) => (
              <div
                key={index}
                className={`border-b border-gray-100 last:border-b-0 ${
                  (data._id || data.id) === activeCategory 
                    ? "bg-blue-50 border-l-4 border-l-blue-500" 
                    : "border-l-4 border-l-transparent"
                }`}
              >
                <button
                  className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    (data._id || data.id) === activeCategory ? "font-medium text-blue-700" : "text-gray-700"
                  }`}
                  onClick={() => routechangehandler(data)}
                >
                  <ChevronRight size={16} className="mr-2 text-gray-400" />
                  <span className="text-sm block truncate">
                    {capitalizeWords(data.productname1 || data.subsubcategory || data.subcategory || data.title || "")}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className={`hidden md:block rounded-lg overflow-hidden ${Styles.sideDiv}`}>
        <h1 className="text-base font-semibold text-gray-900 bg-gray-50 px-5 py-4 border-b border-gray-200">
          {capitalizeWords(props.sidetabletitle || "Categories")}
        </h1>
        
        <div className="max-h-[70vh] overflow-y-auto">
          {categories &&
            categories.map((data, index) => (
              <div 
                key={index}
                className={`group border-b border-gray-100 last:border-b-0 ${
                  (data._id || data.id) === activeCategory 
                    ? "bg-blue-50 border-l-4 border-l-blue-500" 
                    : "border-l-4 border-l-transparent"
                }`}
              >
                <button
                  className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                    (data._id || data.id) === activeCategory ? "font-medium text-blue-700" : "text-gray-700"
                  }`}
                  onClick={() => routechangehandler(data)}
                >
                  <ChevronRight size={16} className={`mr-2 text-gray-400 transition-transform group-hover:translate-x-1`} />
                  <span className="text-sm block truncate">
                    {capitalizeWords(data.productname1 || data.subsubcategory || data.subcategory || data.title || "")}
                  </span>
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductSideTable;
