import React, { useState, useEffect, useRef } from "react";
import Styles from "./Products.module.css";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getSubSubProduct,
  getDod,
  getRecommendedProduct,
  getSlugName,
} from "../apis/api";
import { AiFillHome } from "react-icons/ai";
import Filter from "../components/Filter/Filter";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";
import Header from "../components/Header/Header";
import CategoriesNavbar from "../components/categoriesNavbar/CategoriesNavbar";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/Footer/Footer";
import Sort from "../components/Sort/Sort";

const Products = () => {
  const [pagetitle, setPageTitle] = useState("Products");
  const [products, setProducts] = useState([]);
  const [filterproducts, setFilterProducts] = useState(null);
  const [pageLocation, setPageLocation] = useState(null);
  const { title } = useParams();

  const navigation = useNavigate();
  
  const productRef = useRef(null);
  const [showfilter, setShowFilter] = useState(false);
  const [showsort, setShowSort] = useState(false);
  const [sortType, setSortType] = useState();
  const [selectedTags, setSelectedTags] = useState({}); // Moved state here

  const title1 = (title ?? "").replace(/-/g, " ");

  

  // debugger;
  useEffect(() => {
    if (title1 === "dealsoftheday") {
      setPageTitle("Deals of the day");
      const fetchDod = async () => {
        const dod = await getDod();
        if (dod.length > 0) {
          setProducts(dod);
        }
      };
      fetchDod();
    } else if (title1 === "recommended") {
      setPageTitle("Recommended Products");
      const fetchRecommended = async () => {
        const recommended = await getRecommendedProduct();
        if (recommended.length > 0) {
          setProducts(recommended);
        }
      };
      fetchRecommended();
    } else {
      setPageTitle("Shop All Products");
      const getProducts = async () => {
        const productsData = await getSubSubProduct(title1);
        console.log({ productsData });
        if (productsData.data.data.length > 0) {
          console.log(productsData.data.data, "productsData");
          setProducts(productsData.data.data);
          setPageLocation(
            `> ${productsData.data.data[0].categoryid} > ${productsData.data.data[0].subcategory} > ${productsData.data.data[0].subsubcategory}`
          );
        }
      };
      getProducts();
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
  }, [title1]);

  const applyfilter = (data) => {
    let newProducts = products.map((product) => {
      const tagsValues = product.tags.map((tag) => tag.value);
      const tagsstring = tagsValues.join(", ");
      return {
        ...product,
        tagsstring,
      };
    });

    if (data.length > 0) {
      const userFilter = data.join(", ");
      const filteredProducts = newProducts.filter((product) =>
        product.tagsstring.includes(userFilter)
      );
      setFilterProducts(filteredProducts);
    } else {
      setFilterProducts(null);
    }
    setShowFilter(false);
  };

  const showfilterhandler = () => {
    setShowSort(false);
    setShowFilter(!showfilter);
  };

  const showsorthandler = () => {
    setShowFilter(false);
    setShowSort(!showsort);
  };

  const sort = (data) => {
    setSortType(data);
    if (data === "low") {
      const sortedarray = [...products].sort(
        (a, b) => a.discountprice2B - b.discountprice2B
      );
      setProducts(sortedarray);
    }
    if (data === "high") {
      const sortedarray2 = [...products].sort(
        (a, b) => b.discountprice2B - a.discountprice2B
      );
      setProducts(sortedarray2);
    }
    setShowSort(false);
  };

  return (
    <>
      {/* <Layout> */}
      <Header />
      <CategoriesNavbar />
      <Navbar />
      <Fullcontainer className={`bg-white ${Styles.fullcontainer}`}>
        <Container className={`${Styles.container}`}>
          <div
          // ref={mobileFilterRef}
          // className={mobileTop ? `${Styles.fixdiv}` : ``}
          // className={`${Styles.fixdiv}`}
          >
            <h1
              className={`${Styles.headtitle} font-semibold mt-2 md:mt-0 px-4`}
            >
              {pagetitle}
            </h1>
            {title1 !== "dealsoftheday" &&
            title1 !== "recommended" &&
            products.length > 0 ? (
              <div className="px-2 md:px-0">
                <div
                  className={`text-sm md:text-md mb-2 overflow-x-auto ${Styles.breakcrumb_overflow}`}
                >
                  <p className="flex flex-row items-center min-w-max">
                    <Link to="/" className="w-fit">
                      <AiFillHome className="mr-1 text-xl" />
                    </Link>{" "}
                    <Link
                      to={`/allproducts/subcategory/${(
                        products[0]?.categoryid ?? ""
                      ).replace(/\s+/g, "-")}`}
                      className="w-fit"
                    >{`> ${products[0]?.categoryid}`}</Link>
                    <Link
                      to={`/allproducts/subsubcategory/${(
                        products[0]?.subcategory ?? ""
                      ).replace(/\s+/g, "-")}`}
                      className="w-fit"
                    >{`> ${products[0]?.subcategory}`}</Link>
                    <Link
                      to={`/products/${(
                        products[0]?.subsubcategory ?? ""
                      ).replace(/\s+/g, "-")}`}
                      className="w-fit"
                    >{`> ${products[0]?.subsubcategory}`}</Link>
                    {/* {pageLocation} */}
                  </p>
                </div>
              </div>
            ) : null}
            <div
              className={`flex justify-between flex-col w-full ${Styles.mobilefilter} ${Styles.fixdiv}`}
            >
              {showfilter ? (
                <>
                  <div className="p-3 max-h-[90vh] overflow-auto border-t">
                    <Filter
                      products={products}
                      filter={applyfilter}
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              {showsort ? (
                <>
                  <div className="p-3 border-t">
                    <Sort sort={sort} sortType={sortType} />
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="flex w-full justify-between">
                <div
                  className="w-1/2 flex items-center py-2 justify-center border-r-2 border-t-2 border-b-2 border-black-500"
                  onClick={showfilterhandler}
                >
                  <FaFilter className={`inline-block mr-2`} />
                  <h1 className="text-lg">Filter</h1>
                </div>
                <div
                  className="w-1/2 flex items-center py-2 justify-center border-r-2 border-t-2 border-b-2 border-black-500"
                  onClick={showsorthandler}
                >
                  <BiSortAlt2 className={`inline-block mr-2 text-2xl`} />
                  <h1 className="text-lg">Sort</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 mt-2">
            {products?.length > 0 ? (
              <>
                <div className={`${Styles.sideTable} col-span-1`}>
                  <Filter
                    products={products}
                    filter={applyfilter}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                  />
                  <Sort sort={sort} sortType={sortType} />
                </div>
                <div className={`col-span-5 md:col-span-4 `} ref={productRef}>
                  <div className={`grid grid-cols-8 gap-0 md:gap-2 `}>
                    {(filterproducts && filterproducts.length > 0 ? (
                      filterproducts.map((data) => (
                        <div
                          className={`${Styles.productCard} relative col-span-4 sm:col-span-4  lg:col-span-2 cursor-pointer`}
                          onClick={async () => {
                            const slugName = await getSlugName(
                              data.productname1
                            );
                            if (slugName.data[0].url_structure) {
                              navigation(
                                `/products/${slugName.data[0].url_structure}/${data.mainProductId}`
                              );
                            } else {
                              navigation(
                                `/products/${slugName.data[0].url_structure}/${data.mainProductId}`
                              );
                            }
                          }}
                        >
                          {title1 === "dealsoftheday" ? (
                            <h1 className="absolute top-5 text-sm font-semibold text-white bg-red-600 px-1 rounded-r-full ">
                              - {data.discount}%
                            </h1>
                          ) : (
                            <h1 className="absolute top-5 text-sm font-semibold text-white bg-red-600 px-1 rounded-r-full ">
                              -{" "}
                              {(
                                100 -
                                (parseInt(data.discountprice2B) /
                                  parseInt(data.price2A)) *
                                  100
                              ).toFixed(2)}
                              %
                            </h1>
                          )}

                          <div className={Styles.imageDiv}>
                            <img src={data.imgs1} alt="" />
                          </div>
                          <h3 className={`${Styles.productname}`}>
                            {data.productname1}
                          </h3>
                          <h1
                            className={`text-left flex items-center text-lg font-semibold ${Styles.productPrice}`}
                          >
                            ₹ {data.discountprice2B}/-
                            {/* <p className="text-sm ml-2 line-through">
                              ₹ {data.price2A}/-
                            </p> */}
                          </h1>
                          {data.partprice4A ? (
                            <h1>
                              ₹ {data.partprice4A} {data.sell4B}
                            </h1>
                          ) : (
                            ""
                          )}
                        </div>
                      ))
                    ) : filterproducts ? (
                      <>
                        <div className="col-span-8 text-center">
                          <h1 className="text-2xl font-semibold">
                            No product found!
                          </h1>
                        </div>
                      </>
                    ) : (
                      ""
                    )) ||
                      products?.map((data) => (
                        <div
                          className={`${Styles.productCard} relative col-span-4 sm:col-span-4  lg:col-span-2 cursor-pointer`}
                          onClick={async () => {
                            const slugName = await getSlugName(
                              data.productname1
                            );
                            if (slugName.data[0].url_structure) {
                              navigation(
                                `/products/${slugName.data[0].url_structure}/${data.mainProductId}`
                              );
                            } else {
                              navigation(
                                `/products/${slugName.data[0].old_url}/${data.mainProductId}`
                              );
                            }
                          }}
                        >
                          {title1 === "dealsoftheday" ? (
                            <h1 className="absolute top-5 text-sm font-semibold text-white bg-red-600 px-1 rounded-r-full ">
                              - {data.discount}%
                            </h1>
                          ) : (
                            <h1 className="absolute top-5 text-sm font-semibold text-white bg-red-600 px-1 rounded-r-full ">
                              -{" "}
                              {(
                                100 -
                                (parseInt(data.discountprice2B) /
                                  parseInt(data.price2A)) *
                                  100
                              ).toFixed(2)}
                              %
                            </h1>
                          )}
                          <div className={Styles.imageDiv}>
                            <img src={data.imgs1} alt="" />
                          </div>
                          <h3 className={`${Styles.productname}`}>
                            {data.productname1}
                          </h3>
                          <div className="flex items-center">
                            <span
                              className={`text-left flex items-center text-lg font-semibold ${Styles.productPrice}`}
                            >
                              ₹ {data.discountprice2B}/-
                              {/* <p className="text-sm ml-2 line-through">
      ₹ {data.price2A}/-
    </p> */}
                            </span>
                            {data.freq ? (
                              <span className="ml-4">
                                {" "}
                                {/* Add margin-left to create some spacing */}
                                {data.freq}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>

                          {data.partprice4A ? (
                            <h1>
                              ₹ {data.partprice4A} {data.sell4B}
                            </h1>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </Container>
      </Fullcontainer>
      {/* </Layout> */}
      <Footer className="product_footer" />
    </>
  );
};
export default Products;
