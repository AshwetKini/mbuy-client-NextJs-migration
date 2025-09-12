import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Button from "../UI/Button";
import Styles from "./SingleCarousel.module.css";
import { useNavigate } from "react-router-dom";

const SingleCarousel = (props) => {
  const navigation = useNavigate();

  // Ensure mainCarouselData is an array before rendering
  const mainCarouselData = Array.isArray(props.mainCarouselData) ? props.mainCarouselData : [];

  if (mainCarouselData.length === 0) {
    return (
      <div className="text-center py-8">
        <h2>No carousel images available.</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      {mainCarouselData.length > 0 && (
        <Carousel
          autoPlay
          showThumbs={false}
          infiniteLoop
          interval={2000}
          showStatus={false}
          className={`${Styles.carouselcontainer} ${props.className}`}
        >
          {mainCarouselData.map((data, index) => {
            // Make sure data is a valid string (URL) and has a length greater than 5
            if (typeof data === 'string' && data.length > 5) {
              return (
                <div className="h-full w-full" key={index}>
                  <img
                    src={data}
                    alt={`carousel img ${index}`}
                    className="h-full bg-center w-full object-contain object-center"
                  />
                </div>
              );
            }
            return null; // If the data doesn't meet the condition, render nothing
          })}
        </Carousel>
      )}
    </React.Fragment>
  );
};

export default SingleCarousel;
