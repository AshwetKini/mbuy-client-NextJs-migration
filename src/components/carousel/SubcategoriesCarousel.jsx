import React from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Styles from "./SubcategoriesCarousel.module.css";
import ProductDetails from "../productDetails/ProductDetails";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SingleProductDetails from "../../pages/SingleProductDetails";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 250 },
    items: 2,
    slidesToSlide: 1,
  },
};

const MultiCarousels = (props) => {
  const navigation = useNavigate();
  const showProductHandler = async (data) => {
    if (!data.title) {
      navigation(`allproducts/subsubcategory/${(data.subcategory ?? '').replace(/\s+/g, '-')}`);
    } else {
      navigation(`/allproducts/subcategory/${(data.subcategory ?? '').replace(/\s+/g, '-')}`);
    }
  };
  return (
    <React.Fragment>
      {props.multiCarouselData && (
        <div className={`px-2 mt-3`}>
          <div className={`flex items-center justify-between`}>
            <h2 className={`text-2xl tracking-tight font-semibold`}>
              {props.titleof}
            </h2>

          </div>
          <MultiCarousel
            containerClass={`w-full`}
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            infinite={true}
            partialVisible={false}
            showDots={false}
          // showArrows={false}
          >
            {props.multiCarouselData?.map((product, index) => (
              <li
                key={product.id || index}
                className="inline-flex items-center justify-center flex-col text-center lg:w-auto m-3"
                onClick={() => {
                  showProductHandler(product);
                }}
              >
                <Link to="">
                  <div className="group relative">
                    <div className="aspect-w-1 shadow-md aspect-h-1 w-full overflow-hidden rounded-t-md bg-gray-200">
                      {product.imgs1 ? (
                        <img
                          src={product.subcategoryimg}
                          alt={product.subcategoryimg}
                          className="h-full w-full object-cover aspect-square object-center group-hover:opacity-75"
                        />
                      ) : (
                        <img
                          src={product.subcategoryimg}
                          className="h-full w-full object-cover aspect-square object-center group-hover:opacity-75"
                        />
                      )}
                    </div>
                    <div className={`${Styles.dod_card_bottoM} rounded-b-md`}>
                      {product.productname1 ? (
                        <h3
                          className={`font-semibold text-white p-2 ${Styles.overflowname}`}
                        >
                          {/* <span className="absolute inset-0" /> */}
                          {/* {product.productname1.split("-")[0]}   */}
                          {product.subcategory}
                        </h3>
                      ) : (
                        <h3 className=" font-semibold text-white p-2">
                          <span
                            className={`absolute inset-0 ${Styles.overflowname}`}
                          />
                          {product.subcategory}
                        </h3>
                      )}
                    </div>
                    {props.datatype === "dealsoftheday" && (
                      <>
                        <h2 className="absolute top-5 text-sm font-semibold text-white bg-red-600 px-1 rounded-r-full ">
                          -{" "}
                          {(
                            100 -
                            (parseInt(product.discountprice2B) /
                              parseInt(product.price2A)) *
                            100
                          ).toFixed(2)}
                          %
                        </h2>
                      </>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </MultiCarousel>
        </div>
      )}
    </React.Fragment>
  );
};

export default MultiCarousels;
