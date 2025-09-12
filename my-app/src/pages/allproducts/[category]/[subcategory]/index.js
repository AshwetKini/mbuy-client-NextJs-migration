// File: my-app/src/pages/allproducts/[category]/[subcategory].js

import React, { useState, useEffect } from "react";
import ProductList from "@/components/productlist/ProductList";
import { useRouter } from "next/router";
import Head from "next/head";
import { getSubcategoryMetadata } from "../../../../config/metadata";

import {
  getSubCategories,
  getSubCategoryProduct
} from "@/apis/api";
import { AiFillHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Skeleton } from "@mui/material";

export async function getServerSideProps({ params }) {
  const metadata = getSubcategoryMetadata(params.subcategory, params.category);
  return { props: { metadata } };
}

const SubcategoryPage = ({ metadata }) => {
  const [subcategoryProducts, setSubcategoryProducts] = useState([]);
  const [nodatafound, setNodatafound] = useState(false);
  const [pagelocation, setPagelocation] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { category, subcategory } = router.query;

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formattedCategory = category?.replace(/-/g, " ") || "";
  const formattedSubcategory = subcategory?.replace(/-/g, " ") || "";
  const capitalizedCategory = capitalizeWords(formattedCategory);
  const capitalizedSubcategory = capitalizeWords(formattedSubcategory);

  useEffect(() => {
    if (!formattedCategory || !formattedSubcategory) return;
    setIsLoading(true);

    const fetchSubCategories = async () => {
      try {
        const response = await getSubCategories();
        const all = response?.data || [];
        setFilteredSubcategories(
          all.filter(
            (sub) => sub.subcategory.toLowerCase() === subcategory.toLowerCase()
          )
        );
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getSubCategoryProduct(formattedSubcategory);
        const { products = [], allVariations = [] } = response?.data?.data || {};
        const combined = [...products, ...allVariations];
        setSubcategoryProducts(combined);
        setNodatafound(combined.length === 0);
      } catch (error) {
        console.error("Error fetching products:", error);
        setNodatafound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubCategories();
    fetchProducts();

    setPagelocation([
      {
        title: (
          <div className="flex items-center text-gray-600 hover:text-blue-600 transition-all">
            <AiFillHome className="text-xl" />
          </div>
        ),
        path: "/",
      },
      {
        title: (
          <div className="flex items-center text-gray-600 hover:text-blue-600 transition-all">
            <MdKeyboardArrowRight className="mx-1 text-gray-500" />
            <span>{capitalizedCategory}</span>
          </div>
        ),
        path: `/allproducts/${category}`,
      },
      {
        title: (
          <div className="flex items-center text-gray-900 font-medium">
            <MdKeyboardArrowRight className="mx-1 text-gray-500" />
            <span>{capitalizedSubcategory}</span>
          </div>
        ),
        path: "#",
      },
    ]);
  }, [formattedCategory, formattedSubcategory, category, subcategory]);

  return (
    <>
      <Head>
        <title>
          {capitalizedSubcategory} - {capitalizedCategory} Products | MaterialBuy
        </title>
        <meta
          name="description"
          content={`Shop our collection of ${capitalizedSubcategory} from our ${capitalizedCategory} range. Find the best quality at competitive prices.`}
        />
        <link rel="canonical" href={metadata.canonicalUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${capitalizedSubcategory} - ${capitalizedCategory} Products | MaterialBuy`}
        />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:url" content={metadata.canonicalUrl} />
        <meta property="og:image" content={metadata.ogImage.url} />
        <meta
          property="og:image:width"
          content={metadata.ogImage.width.toString()}
        />
        <meta
          property="og:image:height"
          content={metadata.ogImage.height.toString()}
        />
        <meta property="og:image:type" content={metadata.ogImage.type} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.twitterTitle} />
        <meta
          name="twitter:description"
          content={metadata.twitterDescription}
        />
        <meta name="twitter:image" content={metadata.twitterImage.url} />
      </Head>

      {isLoading ? (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col space-y-4">
            <Skeleton variant="rectangular" height={50} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <Skeleton variant="rectangular" height={160} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <ProductList
          categoriesArray={null}
          pagelocation={pagelocation}
          nodatafound={nodatafound}
          sidetabletitle={capitalizedSubcategory}
          productarray={subcategoryProducts}
          filteredSubcategories={filteredSubcategories}
        />
      )}
    </>
  );
};

export default SubcategoryPage;
