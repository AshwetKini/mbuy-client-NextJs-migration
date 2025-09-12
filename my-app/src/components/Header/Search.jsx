"use client";
import React, { useState, useRef, useEffect } from "react";
import Styles from "./Search.module.css";
import { useRouter } from "next/navigation";
import {
  getAllProducts,
  getProduct,
  getSlugName,
  getVariant,
} from "../../apis/api";
import { FaSearch } from "react-icons/fa";

const Search = (props) => {
  const inputRef = useRef(null);
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultRefs = useRef([]);
  const navigate = useRouter();

  const toggleInputActive = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (userSearch.length > 2) {
        setShowResults(true);
        try {
          const response = await getAllProducts(userSearch);
          
          if (response && response.data && response.data.data) {
            const allProducts = response.data.data;
            
            const mergedProducts = [
              ...(allProducts.products || []),
              ...(allProducts.variant || []),
            ];
            
            setSearchResults(mergedProducts);
            // Reset focused index when results change
            setFocusedIndex(-1);
          } else {
            console.error("Invalid response structure:", response);
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      } else {
        setShowResults(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [userSearch]);

  // Update refs array when search results change
  useEffect(() => {
    if (searchResults) {
      // Add one extra for the "Search for" option
      resultRefs.current = Array(searchResults.length + 1)
        .fill(0)
        .map((_, i) => resultRefs.current[i] || React.createRef());
    }
  }, [searchResults]);

  const inputChangeHandler = (value) => {
    setUserSearch(value);
  };

  const changeroute = async (item) => {
    setShowResults(false);
    try {
      const token = localStorage.getItem("authToken");
      let response = null;
      let slugName = null;

      if (item.mainProductId) {
        response = await getVariant(item._id);
        slugName = await getSlugName(item.productname1, token);
      } else {
        response = await getProduct(item._id);
        slugName = await getSlugName(item.productname1, token);
      }

      if (response && response.data && 
          slugName && slugName.data && slugName.data[0]) {
        const urlStructure =
          slugName.data[0].url_structure || slugName.data[0].old_url;
        navigate.push(
          `/${item.mainProductId ? "variance" : "products"}/${urlStructure}/${
            item._id
          }`
        );
      } else {
        console.error("Invalid response structure", { response, slugName });
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleSearchRedirect = () => {
    navigate.push(`/allproducts?searchfor=${encodeURIComponent(userSearch)}`);
    setShowResults(false); // Close the dropdown
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    // If no results are shown, don't handle keyboard navigation
    if (!showResults || !searchResults) return;
    
    const lastIndex = searchResults?.length || 0; // Add null check
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prevIndex) => 
          prevIndex < lastIndex ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prevIndex) => 
          prevIndex > 0 ? prevIndex - 1 : lastIndex
        );
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex === -1 || focusedIndex === lastIndex) {
          // If no selection or "Search for" option is selected
          handleSearchRedirect();
        } else if (focusedIndex >= 0 && focusedIndex < lastIndex) {
          changeroute(searchResults[focusedIndex]);
        }
        break;
      case "Escape":
        setShowResults(false);
        break;
      case "Tab":
        // Allow natural tab navigation
        if (focusedIndex === lastIndex) {
          setShowResults(false);
        } else {
          e.preventDefault();
          setFocusedIndex((prevIndex) => 
            prevIndex < lastIndex ? prevIndex + 1 : 0
          );
        }
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <div className={`${Styles.input_group} ${props.className}  relative`}>
        <FaSearch className="absolute top-[21px] left-5 text-[#102c44]" />
        <input
          ref={inputRef}
          type="text"
          className={`${Styles.form_control}`}
          placeholder="What are you shopping for?"
          onChange={(e) => inputChangeHandler(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {showResults && searchResults && (
          <div
            className={`absolute top-9 shadow-md rounded z-40 bg-white w-full ${Styles.dropdownresults}`}
            role="listbox"
          >
            <ul className={Styles.search_suggestion}>
              {searchResults.map((item, index) => (
                <li
                  ref={el => resultRefs.current[index] = el}
                  className={`${Styles.search_li} cursor-pointer ${focusedIndex === index ? 'bg-blue-100' : ''}`}
                  onClick={() => changeroute(item)}
                  key={item._id}
                  tabIndex={0}
                  role="option"
                  aria-selected={focusedIndex === index}
                >
                  <a href="#">{item.productname1}</a>
                </li>
              ))}
              <li
                ref={el => resultRefs.current[searchResults.length] = el}
                className={`${Styles.search_li} cursor-pointer ${focusedIndex === searchResults.length ? 'bg-blue-100' : ''}`}
                onClick={handleSearchRedirect}
                tabIndex={0}
                role="option"
                aria-selected={focusedIndex === searchResults.length}
              >
                <a>Search for '{userSearch}'</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Search;
