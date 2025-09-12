import React, { useContext } from "react";
import "./CategoriesNavbar.css";
import Fullcontainer from "../UI/Fullcontainer";
import Container from "../UI/Container";
import { Link } from "react-router-dom";
import { AllProductsContext } from "../../features/AllProductsContext";

const CategoriesNavbar = (props) => {
  const categories = useContext(AllProductsContext);

  return (
    <>
      <Fullcontainer
        className={"bg-gray-800 hidden md:bg-gray-900 fullcontainer categorynavmob"}
      >
        <Container>
          <nav className="main-nav1">
            <div
              className={
                props.categories
                  ? "menu-link1 mobile-menu-link1 bg-gray-900"
                  : "menu-link1"
              }
            >
              {categories.categoriesData ? (
                <ul>
                  {categories.categoriesData.slice().reverse().map((item, index) => (
                    <li key={item.title} className={`icons1 ${index !== 0 ? "with-separator" : ""}`}>
                      <Link to={`/allproducts/subcategory/${(item.title ?? '').replace(/\s+/g, '-')}`}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </nav>
        </Container>
      </Fullcontainer>
    </>
  );
};

export default CategoriesNavbar;
