import React, { useState, useRef, useEffect, useContext } from "react";
import Styles from "./Search.module.css";
// import { getAllProducts } from "../../apis/api";
import { useNavigate } from "react-router-dom";
import { AllProductsContext } from "../../features/AllProductsContext";
import {
  getAllProducts,
  getmainproductname,
  getProduct,
  getSlugName,
  getVariant,
} from "../../apis/api";

const Search = (props) => {
  const inputRef = useRef(null);
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  // const [allProducts, setAllProducts] = useState(null);
  // const { allProducts } = useContext(AllProductsContext);
  const navigate = useNavigate();

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
          const allProducts = response.data.data;

          // Merge the products and variants into a single array
          const mergedProducts = [
            ...(allProducts.products || []),
            ...(allProducts.variant || []),
          ];

          setSearchResults(mergedProducts);
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

  const inputChangeHandler = (value) => {
    setUserSearch(value);
  };

  const changeroute = async (item) => {
    setShowResults(false);
    console.log({ item });

    try {
      let response = null;
      let slugName = null;
      if (item.mainProductId) {
        response = await getVariant(item._id);
        slugName = await getSlugName(item.productname1);
      } else {
        console.log("called");
        response = await getProduct(item._id);

        slugName = await getSlugName(item.productname1);
      }
      if (response.data) {
        if (item.mainProductId) {
          if (slugName.data[0].url_structure) {
            navigate(`/variance/${slugName.data[0].url_structure}/${item._id}`);
          } else {
            navigate(`/variance/${slugName.data[0].old_url}/${item._id}`);
          }
        } else {
          if (slugName.data[0].url_structure) {
            navigate(`/products/${slugName.data[0].url_structure}/${item._id}`);
          } else {
            navigate(`/products/${slugName.data[0].old_url}/${item._id}`);
          }
        }
      } else {
        console.error(
          "Invalid response format from getProductDetails:",
          response
        );
        // Handle the error or show a message to the user
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle the error or show a message to the user
    }
  };

  return (
    <React.Fragment>
      <div className={`${Styles.input_group} ${props.className} relative`}>
        <input
          ref={inputRef}
          type="text"
          className={`${Styles.form_control}`}
          placeholder="What are you shopping for?"
          onChange={(e) => inputChangeHandler(e.target.value)}
        />
        <div className={Styles.searchicon} onClick={toggleInputActive}>
          <i className="bx bx-search-alt"></i>
        </div>
        {showResults && (
          <div
            className={`absolute top-9 shadow-md rounded bg-white w-full ${Styles.dropdownresults}`}
          >
            <ul className={Styles.search_suggestion}>
              {searchResults?.length > 0 ? (
                searchResults.map((item) => (
                  <li
                    className={`${Styles.search_li} cursor-pointer`}
                    onClick={() => changeroute(item)}
                    key={item._id}
                  >
                    <a href="#">{item.productname1}</a>
                  </li>
                ))
              ) : (
                <li className={Styles.search_li}>
                  <a href="#">No results found</a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Search;
