import React, { useEffect, useState } from "react";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import Styles from "./Home.module.css";
import MultiCarousel from "../components/carousel/MultiCarousel";
import SingleCarousel from "../components/carousel/SingleCarousel";
import SubcategoriesCarousel from "../components/carousel/SubcategoriesCarousel";

import bann1 from "../assests/MaterialBuy Now Pay Later.webp";
import bann2 from "../assests/Our Partners.webp";
import bann3 from "../assests/What clients say.webp";
import {
  getCarousel,
  getBanners,
  getDod,
  getRecommendedProduct,
  getCategories,
  getSubCategories,
} from "../apis/api";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [subCategories, setSubCategories] = useState(null);
  const [carouselImages, setCarouselImages] = useState(null);
  const [dodData, setDodData] = useState(null);
  const [recommendedData, setRecommendedData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [bannerImages, setBannerImages] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [
          carouselResponse,
          subcategoriesResponse,
          bannerResponse,
          dodResponse,
          recommendedResponse,
          categoriesResponse,
        ] = await Promise.all([
          getCarousel(),
          getSubCategories(),
          getBanners(),
          getDod(),
          getRecommendedProduct(),
          getCategories(),
        ]);


        // Extract image URLs from the carouselResponse object
        const images = [];
        for (let i = 1; i <= 5; i++) {
          if (carouselResponse[0][`img${i}`]) {
            images.push(carouselResponse[0][`img${i}`]);
          }
        }

        setCarouselImages(images); // Set the extracted image URLs in state

        const combinedDOD = [
          ...(dodResponse.product || []),
          ...(dodResponse.allVariations || []),
        ];

        setDodData(combinedDOD);

        setSubCategories(subcategoriesResponse.data);

        // Ensure bannerImages is an array
        const bannerImages = [];
        for (let i = 1; i <= 8; i++) {
          if (bannerResponse[0][`img${i}`]) {
            bannerImages.push(bannerResponse[0][`img${i}`]);
          }
        }


        setBannerImages(bannerImages);

        const combinedRec = [
          ...(recommendedResponse.products || []),
          ...(recommendedResponse.allVariations || []),
        ];

        setRecommendedData(combinedRec);
        setCategories(categoriesResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="description"
          content="Material Buy: Explore premium finishes, accessories, and building supplies that combine quality with sophistication. Perfect for every design need"
        />
      </Helmet>
      <Layout>
        <Fullcontainer className={Styles.fullcontainer}>
          <Container className={Styles.container}>
            {carouselImages && bannerImages ? (
              <>
                <SingleCarousel mainCarouselData={carouselImages} />

                {/* Conditionally render Deals of the Day if dodData exists */}
                {dodData && dodData.length > 0 && (
                  <MultiCarousel
                    multiCarouselData={dodData}
                    titleof="Deals of the Day"
                    datatype="dealsoftheday"
                  />
                )}

                <div className="grid md:grid-cols-2 py-4 md:py-8 gap-4 px-2 grid-cols-1">
                  {bannerImages.slice(0, 2).map((image, index) => (
                    <a
                      key={index}
                      href="https://materialbuy.com/allproducts/subcategory/Roofing"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover object-center aspect-video"
                      />
                    </a>
                  ))}
                </div>

                {/* Conditionally render Recommended section if recommendedData exists */}
                {recommendedData && recommendedData.length > 0 && (
                  <MultiCarousel
                    multiCarouselData={recommendedData}
                    titleof="Recommended"
                    datatype="recommended"
                  />
                )}

                <div className="grid md:grid-cols-2 py-4 md:py-8 gap-4 px-2 grid-cols-1">
                  {bannerImages.slice(2, 4).map((image, index) => {
                    console.log(image);
                    return (
                      <a
                        key={index}
                        href="https://materialbuy.com/allproducts/subcategory/Decor"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover object-center aspect-video"
                        />
                      </a>
                    );
                  })}
                </div>

                <MultiCarousel
                  multiCarouselData={categories}
                  titleof="Categories"
                  datatype="categories"
                />

                <div className="grid md:grid-cols-2 py-4 md:py-8 gap-4 px-2 grid-cols-1">
                  {bannerImages.slice(4, 6).map((image, index) => (
                    <a
                      key={index}
                      href="https://materialbuy.com/allproducts/subcategory/Bed-n-Bath"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover object-center aspect-video"
                      />
                    </a>
                  ))}
                </div>

                <SubcategoriesCarousel
                  multiCarouselData={subCategories}
                  titleof="Trending Categories"
                  datatype="categories"
                />

                <div className="grid md:grid-cols-2 py-4 md:py-8 gap-4 px-2 grid-cols-1">
                  {bannerImages.slice(6, 8).map((image, index) => (
                    <a
                      key={index}
                      href="https://materialbuy.com/allproducts/subcategory/Equipments"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover object-center aspect-video"
                      />
                    </a>
                  ))}
                </div>

                <div className="grid md:grid-cols-1 py-4 md:py-8 gap-4 px-2 grid-cols-1">
                  <img
                    src={bann1}
                    alt="MaterialBuy Now Pay Later"
                    className="h-full w-full object-contain"
                  />
                  <img
                    src={bann2}
                    alt="Our Partners"
                    className="h-full w-full object-contain"
                  />
                  <img
                    src={bann3}
                    alt="What Clients Say"
                    className="h-full w-full object-contain"
                  />
                </div>
              </>
            ) : (
              <div>Content is not available yet.</div>
            )}
          </Container>
        </Fullcontainer>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
