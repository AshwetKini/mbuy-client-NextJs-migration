import React, { createContext, useState, useEffect } from "react";
import { getAllProducts, getCategories } from "../apis/api";

const AllProductsContext = createContext();

const AllProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [allcategories, setAllCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        if (response.status === 200) {
          const data = response.data.data;
          setAllProducts(data);
        }

        const response2 = await getCategories();
        console.log(response2, "Response2"); // Debugging API response

        if (response2 && Array.isArray(response2)) {
          setAllCategories(response2);
        } else {
          setAllCategories([]); // Fallback to an empty array if response is unexpected
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <AllProductsContext.Provider
      value={{ allProducts: allProducts, categoriesData: allcategories }}
    >
      {children}
    </AllProductsContext.Provider>
  );
};

export { AllProductsProvider, AllProductsContext };
