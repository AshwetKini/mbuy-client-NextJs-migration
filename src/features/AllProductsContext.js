import React, { createContext, useState, useEffect } from "react";
import { getAllProducts, getCategories } from "../apis/api";

const AllProductsContext = createContext(); 

const AllProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [allcategories, setAllCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProducts();
      if (response.status === 200) {
        const data = response.data.data;
        setAllProducts(data);
      }
      const response2 = await getCategories();
      setAllCategories(response2);
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
