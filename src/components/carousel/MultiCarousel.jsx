import React from "react";
// import MultiCarousel from 'react-multi-carousel';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Styles from "./MultiCarousel.module.css";
import { useNavigate } from "react-router-dom";
import { getmainproductname, getSlugName } from "../../apis/api";

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
  const getname = async (id) => {
    try {
      const response = await getmainproductname(id);
      return response.data.data.productname1;
    } catch (error) {
      console.log("error");
    }
  };
  const showProductHandler = async (data) => {
    console.log("Product Details: ", data);

    // Check if data.title is available before proceeding
    if (!data.title) {
      // Check if data.productname1 exists and if not handle it gracefully
      const name = await getname(data._id);

      // Handle navigation based on available data
      if (data.mainProductId) {
        const slugName = await getSlugName(data.productname1);
        if (slugName.data[0].url_structure) {
          navigation(`/variance/${slugName.data[0].url_structure}/${data._id}`);
        } else {
          navigation(`/variance/${slugName.data[0].old_url}/${data._id}`);
        }
      } else {
        const slugName = await getSlugName(data.productname1);
        if (slugName.data[0].url_structure) {
          navigation(`/products/${slugName.data[0].url_structure}/${data._id}`);
        } else {
          navigation(`/products/${slugName.data[0].old_url}/${data._id}`);
        }
      }
    } else {
      // Safely handle the title
      const formattedTitle = (data.title ?? "").replace(/\s+/g, "-");
      navigation(`/allproducts/subcategory/${formattedTitle}`);
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
            {props.datatype != "Frequently" && (
              <Link
                to={
                  props.datatype != "categories"
                    ? `/products/${props.datatype}`
                    : `/allproducts/categories/all`
                }
                className=""
              >
                <h2
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    background: "linear-gradient(to right, #007BFF, #002966)",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "inline-block",
                  }}
                >
                  See everything
                  <span aria-hidden="true"> &rarr;</span>
                </h2>
              </Link>
            )}
          </div>
          <Carousel
            // containerClass={`w-full`}
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            // showDots={false}
            // swipeable={false}
            // draggable={false}
            // focusOnSelect={false}
            arrows
            // customRightArrow={<CustomRightArrow />}
            // customLeftArrow={<CustomLeftArrow />}
          >
            {props.multiCarouselData?.map((product, index) => (
              <div>
                <li
                  key={product._id || index}
                  className="inline-flex items-center justify-center flex-col text-center lg:w-auto m-3"
                  onClick={() => {
                    showProductHandler(product);
                  }}
                >
                  <div className="group relative">
                    <div className="aspect-w-1 shadow-md aspect-h-1 w-full overflow-hidden rounded-t-md bg-gray-200">
                      {product.imgs1 ? (
                        <img
                          src={product.imgs1}
                          alt={product.imgs1}
                          className="h-full w-full object-cover aspect-square object-center group-hover:opacity-75"
                        />
                      ) : (
                        <img
                          src={product.img}
                          className="h-full w-full object-cover aspect-square object-center group-hover:opacity-75"
                        />
                      )}
                    </div>
                    <div
                      className={`${Styles.dod_card_bottoM} rounded-b-md ${
                        props.datatype !== "categories" ? "min-h-[60px]" : ""
                      } flex flex-col items-center justify-center`}
                    >
                      {product.productname1 ? (
                        <h3
                          className={`font-semibold text-white p-2 ${Styles.overflowname}`}
                        >
                          {product.productname1}
                        </h3>
                      ) : (
                        <h3 className=" font-semibold text-white p-2">
                          <span
                            className={`absolute inset-0 ${Styles.overflowname}`}
                          />
                          {product.title}
                        </h3>
                      )}
                    </div>
                    {props.datatype === "dealsoftheday" && (
                      <>
                        <h2 className="absolute top-5 text-sm font-semibold text-white bg-red-600 px-1 rounded-r-full ">
                          - {product.discount}%
                        </h2>
                      </>
                    )}
                  </div>
                </li>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </React.Fragment>
  );
};

export default MultiCarousels;

const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return <button onClick={() => onClick()} />;
};
