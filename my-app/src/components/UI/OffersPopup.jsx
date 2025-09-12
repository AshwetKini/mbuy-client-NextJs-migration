import React, { useEffect, useRef, useState } from "react";
import Styles from "./OffersPopup.module.css";
import { AiOutlineClose } from "react-icons/ai";

const OffersPopup = (props) => {
  const showoffersRef = useRef(null);

  useEffect(() => {
    const scrollToTop = () => {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - currentScroll);
      }
    };
    scrollToTop();

    const body = document.body;
    const originalOverflow = body.style.overflow;

    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showoffersRef.current &&
        !showoffersRef.current.contains(event.target)
      ) {
        props.status(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closethepopup = () => {
    props.status(false);
  };

  return (
    <div className={`${Styles.offers__container}`}>
        <div className={` ${Styles.header} flex items-center justify-between bg-white py-1`}>
          <h1 className="hidden md:block"></h1>
          <h1 className="text-xl md:text-2xl ml-16 text-center font-semibold">
            Available Offers
          </h1>
          <div
            className="p-2 rounded-full cursor-pointer"
            onClick={closethepopup}
          >
            <AiOutlineClose />
          </div>
        </div>
      <div className={`${Styles.offers_card} relative`} ref={showoffersRef}>
        {props.offers
          ? props.offers.map((offer, index) => {
              return (
                <div
                  className={`${Styles.offers_card_item} ${
                    index === 0 ? "mt-12" : "my-2"
                  } flex flex-col text-center text-white rounded-xl`}
                >
                  <p className="text-slate-200">{offer.message}</p>
                  <p className={`text-2xl mt-2 text-yellow-400`}>
                    {offer.codename}
                  </p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default OffersPopup;
