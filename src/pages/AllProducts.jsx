import React, { useState, useEffect } from "react";
import ProductList from "../components/productlist/ProductList";
import {
  getCategories,
  getSubCategories,
  getSubSubCategories,
  getSubSubProduct,
  getCategoryProduct,
  getSubCategoryProduct,
  getSlugName,
} from "../apis/api";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const AllProducts = () => {
  const [categories, setCategories] = useState(null);
  const { category } = useParams();
  const { categoryname } = useParams();
  const navigation = useNavigate();
  const [pagelocation, setPagelocation] = useState(null);
  const [nodatafound, setNodatafound] = useState(false);
  const [sidetabletitle, setSidetabletitle] = useState("Browse Our Products");
  const [categoriesProduct, setCategoriesProduct] = useState(null);
  const [altProducttitle, setAltProductTitle] = useState(null);

  useEffect(() => {
    // getting all the categories
    if (category === "categories") {
      setCategories(null);
      setCategoriesProduct(null);
      const getCategoriesData = async () => {
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        setPagelocation([
          {
            title: <AiFillHome className="mr-1 text-xl" />,
            path: "/",
          },
          {
            title: "> All Categories",
            path: "/allproducts/categories/all",
          },
        ]);
      };
      getCategoriesData();
    } else if (category.includes("subsubcategory")) {
      // getting the products of subsubcategory
      setCategories(null);
      const getSubSubCategoriesData = async () => {
        const subsubcategoriesData = await getSubSubProduct(
          categoryname.replace(/-/g, " ")
        );
        if (subsubcategoriesData.data.errors.length > 0) {
          setCategories(subsubcategoriesData.data.errors);

          setPagelocation([
            {
              title: <AiFillHome className="mr-1 text-xl" />,
              path: "/",
            },
            {
              title: `> ${subsubcategoriesData.data.errors[0].categoryid} `,
              path: `/allproducts/subcategory/${(
                subsubcategoriesData.data.errors[0].categoryid ?? ""
              ).replace(/\s+/g, "-")}`,
            },
            {
              title: "> ${subsubcategoriesData.data.errors[0].subcategory} ",
              path: `allproducts/subsubcategory/${(
                subsubcategoriesData.data.errors[0].subcategory ?? ""
              ).replace(/\s+/g, "-")}`,
            },
            {
              title: `> ${subsubcategoriesData.data.errors[0].subsubcategory} `,
              path: `#`,
            },
          ]);
          setSidetabletitle(`${categoryname.replace(/-/g, " ")}`);
        } else {
          setCategories(null);
          setNodatafound(true);
          setPagelocation(
            (prev) => prev + ` > ${categoryname.replace(/-/g, " ")}`
          );
        }
      };
      getSubSubCategoriesData();
    } else if (category.includes("subsubcategory")) {
      // getting the subsubcategory of subcategory
      setCategories(null);
      setCategoriesProduct(null);
      const getSubSubCategoriesData = async () => {
        const subsubcategoriesData = await getSubSubCategories();
        const subsubcategories = subsubcategoriesData.data.filter(
          (item) => item.subcategoryname === categoryname.replace(/-/g, " ")
        );
        if (subsubcategories.length > 0) {
          setCategories(subsubcategories);
          setSidetabletitle(`${categoryname.replace(/-/g, " ")}`);
          // setPagelocation(
          //   `> ${subsubcategories[0].categoryname} > ${category.split('=')[1]}`
          // );
          setPagelocation([
            {
              title: <AiFillHome className="mr-1 text-xl" />,
              path: "/",
            },
            {
              title: `> ${subsubcategories[0].categoryname}`,
              path: `/allproducts/subcategory/${(
                subsubcategories[0].categoryname ?? ""
              ).replace(/\s+/g, "-")}`,
            },
            {
              title: `> ${subsubcategories[0].subcategoryname}`,
              path: `#`,
            },
          ]);
        } else {
          setCategories(null);
          setNodatafound(true);
          setSidetabletitle(`${categoryname.replace(/-/g, " ")}`);
          setPagelocation(
            (prev) => prev + ` > ${categoryname.replace(/-/g, " ")}`
          );
        }
      };
      getSubSubCategoriesData();

      // code for getting product with subcategory but without subsubcategory
      const getSubCatProduct = async () => {
        const response = await getSubCategoryProduct(
          categoryname.replace(/-/g, " ")
        );
        console.log(response.data.data, "subcatproduct");
        const productarray = response.data.data.filter(
          (data) => data.subsubcategory === "Select Category"
        );
        // console.log(productarray);
        if (productarray.length > 0) {
          console.log(productarray);
          setCategoriesProduct(productarray);
        } else {
          setCategoriesProduct(null);
        }
      };
      getSubCatProduct();
    } else if (category.includes("subcategory")) {
      // getting the subcategory of category
      setCategories(null);
      setCategoriesProduct(null);
      const getSubCategoriesData = async () => {
        const subcategoriesData = await getSubCategories();
        const subcategories = subcategoriesData.data.filter(
          (item) => item.categoryname === categoryname.replace(/-/g, " ")
        );
        setCategories(subcategories);
        // setPagelocation(`> ${category.split('=')[1]}`);
        setPagelocation([
          {
            title: <AiFillHome className="mr-1 text-xl" />,
            path: "/",
          },
          {
            title: `> ${categoryname.replace(/-/g, " ")}`,
            path: `#`,
          },
        ]);
        setSidetabletitle(`${categoryname.replace(/-/g, " ")}`);
      };
      getSubCategoriesData();

      // code for getting the products without sub and subsubcategory
      const getCatProduct = async () => {
        try {
          console.log(categoryname.replace(/-/g, " "), "catname");
          const response = await getCategoryProduct(
            categoryname.replace(/-/g, " ")
          );
          const { product, allVariation } = response.data.data; // Destructure response

          if (product.length > 0 || allVariation.length > 0) {
            const productarray = product.concat(allVariation);
            console.log(productarray, "Filtered Products");
            setCategoriesProduct(productarray);
          } else {
            console.log("No products found for this category");
            setNodatafound(true); // Set flag to show no data found message
            setCategoriesProduct(null); // Reset products array
          }
        } catch (error) {
          console.error("Error fetching category products", error);
          setNodatafound(true); // Handle API errors by setting no data found
        }
      };

      getCatProduct();
    }

    const scrollToTop = () => {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - currentScroll / 10);
      }
    };
    scrollToTop();
  }, [category, categoryname]);

  const changethepage = async (data) => {
    console.log(data, "data");
    // checking what user clicked on and navigating accordingly
    if (data._id && data.imgs1) {
      const slugName = await getSlugName(data.productname1);

      if (data.mainProductId) {
        if (slugName.data[0].url_structure) {
          navigation(`/variance/${slugName.data[0].url_structure}/${data._id}`);
        } else {
          navigation(`/variance/${slugName.data[0].old_url}/${data._id}`);
        }
      } else {
        if (slugName.data[0].url_structure) {
          navigation(`/products/${slugName.data[0].url_structure}/${data._id}`);
        } else {
          navigation(`/products/${slugName.data[0].old_url}/${data._id}`);
        }
      }
    } else if (data.subcategory) {
      navigation(
        `/allproducts/subsubcategory/${(data.subcategory ?? "").replace(
          /\s+/g,
          "-"
        )}`
      );
    } else if (data.subsubcategory) {
      // navigation(`/allproducts/subsubcategoryp=${data.subsubcategory}`);
      navigation(
        `/products/${(data.subsubcategory ?? "").replace(/\s+/g, "-")}`
      );
    } else if (!data.subcategory) {
      navigation(
        `/allproducts/subcategory/${(data.title ?? "").replace(/\s+/g, "-")}`
      );
    }
  };
  return (
    <>
      <ProductList
        categoriesArray={categories}
        pagelocation={pagelocation}
        routechangehandler={changethepage}
        nodatafound={nodatafound}
        sidetabletitle={sidetabletitle}
        productarray={categoriesProduct}
        producttitle={altProducttitle}
      />
    </>
  );
};

export default AllProducts;
