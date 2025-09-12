import React, { useState, useEffect } from "react";
import ProductList from "@/components/productlist/ProductList";
import { useRouter } from "next/router";
import { getSubSubProduct, getSlugName, getCategoryProduct,  } from "@/apis/api";
import { AiFillHome } from "react-icons/ai";

const SubSubcategoryPage = () => {
  const [categoriesProduct, setCategoriesProduct] = useState(null);
  const [nodatafound, setNodatafound] = useState(false);
  const [sidetabletitle, setSidetabletitle] = useState("Browse Our Products");
  const [pagelocation, setPagelocation] = useState(null);
  const [categoriess, setCategoriess] = useState(null);

  const router = useRouter();
  const { category, subcategory, subsubcategory } = router.query;

  const formattedCategory = category ? category.replace(/-/g, " ") : "";
  const formattedSubcategory = subcategory ? subcategory.replace(/-/g, " ") : "";
  const formattedSubsubcategory = subsubcategory ? subsubcategory.replace(/-/g, " ") : "";

  console.log("Category:", category, "Subcategory:", subsubcategory, "Subsubcategory:", formattedSubsubcategory);

  useEffect(() => {
    if (!formattedCategory || !formattedSubcategory || !formattedSubsubcategory) return;

    const fetchData = async () => {
      try {
        // Fetch category, subcategories, and subsubcategory products concurrently
        const [ subSubCategoryResponse , subsubexp] = await Promise.all([
        //   getSlugName(formattedCategory),
          getSubSubProduct(formattedSubsubcategory),
          getSubSubProduct(subsubcategory)
        ]);

        console.log(subSubCategoryResponse,subsubexp, "subcategories");
       

        // Fetch category products
        const categoryProducts = await getCategoryProduct(formattedCategory);
        const { product, allVariation } = categoryProducts.data.data;
        const mergedProducts = [...product, ...allVariation];

        // Fetch subsubcategory products
        const { products = [], allVariations = [] } = subSubCategoryResponse?.data?.data || {};
        const subSubCategoryProducts = [...products, ...allVariations];

        // Combine both arrays
        const combinedProducts = [...mergedProducts, ...subSubCategoryProducts];

        if (combinedProducts.length === 0) {
          setNodatafound(true);
          setCategoriesProduct([]);
        } else {
          setCategoriesProduct(combinedProducts);
          setNodatafound(false);
        }

        // Update breadcrumb navigation
        setPagelocation([
          { title: <AiFillHome className="mr-1 text-xl" />, path: "/" },
          { title: `> ${formattedCategory}`, path: `/allproducts/${category}` },
          { title: `> ${formattedSubcategory}`, path: `/allproducts/${category}/${subcategory}` },
          { title: `> ${formattedSubsubcategory}`, path: "#" },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNodatafound(true);
        setCategoriesProduct([]);
      }
    };

    fetchData();
  }, [formattedCategory, formattedSubcategory, formattedSubsubcategory]);

  return (
    <ProductList
      categoriesArray={null}
      pagelocation={pagelocation}
      nodatafound={nodatafound}
      sidetabletitle={sidetabletitle}
      productarray={categoriesProduct}
    />
  );
};

export default SubSubcategoryPage;
