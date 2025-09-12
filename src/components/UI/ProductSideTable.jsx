import React, { useEffect, useState } from "react";
import Styles from "./ProductSideTable.module.css";
import { Link } from "react-router-dom";

const ProductSideTable = (props) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    setCategories(props.categoriesList);
  }, [props.categoriesList]);

  const routechangehandler = (title) => {
    props.routechangehandler(title);
  }

  return (
    <>
      {categories ? (
        <div className={Styles.sideDiv}>
          <h1>{props.sidetabletitle}</h1>
          {categories.slice().map((data, index) => (
            <h2 key={index} className="cursor-pointer" onClick={() => routechangehandler(data)}>
              {data.productname1 || data.subsubcategory || data.subcategory || data.title}
            </h2>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductSideTable;
