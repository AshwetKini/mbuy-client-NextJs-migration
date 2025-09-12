import React, { useEffect, useState } from "react";
import Styles from "./Singleservices.module.css";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import Layout from "../components/Layout/Layout";
import MainSide from "../components/UI/MainSide";
// import SingleCarousel from "../components/carousel/SingleCarousel";
import { getSingleServices } from "../apis/api";
import { Link, Navigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import serimg from "../assests/serviceside.jpg"
import { useNavigate } from "react-router-dom";
import FormPopup from "../components/FormPopup"; 



const Singleservices = () => {

  
  const [mainCarousel, setMainCarousel] = useState(null);
  const [data, setData] = useState(null);
  const { id } = useParams();
  // console.log(id, "id")

  useEffect(() => {
    const fetchCarousel = async () => {
      let Carousel = await getSingleServices(id);
      // console.log(Carousel)
      let Carousel1 = Carousel.data;
      setData(Carousel1);
      console.log(Carousel1);
      let imageArray = [];
      let y = 0;
      for (let x in Carousel1) {
        if (x === "img") {
          imageArray.push(Carousel1[x]);
          y += 1;
        }
        if (x === `img${y}` && `img${y}`) {
          imageArray.push(Carousel1[x]);
          y += 1;
        }
      }
      // console.log(imageArray)
      setMainCarousel(imageArray);
    };

    fetchCarousel();
  }, [id]);
  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <MainSide image={serimg} />
          </div>
          {data ? (
            <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
              <h1
                className={`text-3xl font-semibold ${Styles.mainTitle}`}
                style={{ color: "#102c44" }}
              >
                {data.service}
              </h1>

              {/* <h2 className={`text-2xl mt-3 mb-4 ${Styles.serviceTitle}`}>Service Name : <span>{data.service}</span></h2>            */}
              {/* <SingleCarousel mainCarouselData={mainCarousel} type="service" /> */}

              <Carousel
                autoPlay
                showThumbs={false}
                infiniteLoop
                interval={2000}
                showStatus={false}
                // className="h-s[70vh]"
                className={`${Styles.carouselcontainer}`}
              >
                {mainCarousel?.map((data, index) => {
                  if (data.length > 5) {
                    return (
                      <div className="h-full w-full" key={index}>
                        <img
                          src={data}
                          // src="	https://materialbuy-static.s3.ap-south-1.amazonaws.com/ad99a95afe0ec6e0d66384d1e47f80f2"
                          alt="carousel img"
                          className="h-[300px] md:h-[500px] bg-center w-full object-cover"
                        />
                      </div>
                    );
                  }
                })}
              </Carousel>
              {/* <br /><br /> */}
              {/* <a href="/services" class="text-white bg-[#102c44] hover:bg-[#102c44] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#102c44] dark:hover:bg-[#102c44] focus:outline-none dark:focus:ring-[#102c44]">Contact Us</a> */}
              {/* <br /><br /> */}
              <FormPopup />
              <div
                className={`mt-3 text-xl break-words`}
                dangerouslySetInnerHTML={{ __html: data.descr }}
              />
            </div>
          ) : (
            <>
              <div
                role="status"
                className="flex h-full items-center justify-center"
              >
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
            </>
          )}
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default Singleservices;
