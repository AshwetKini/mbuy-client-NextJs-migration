import React, { useEffect, useState } from 'react';
import Styles from './ProdutList.module.css';
import Fullcontainer from '../UI/Fullcontainer';
import Container from '../UI/Container';
import Layout from '../Layout/Layout';
import ProductSideTable from '../UI/ProductSideTable';
import { Link } from 'react-router-dom';

const ProductList = (props) => {
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    setCategories(props.categoriesArray);
  }, [props.categoriesArray]);

  const routechangehandler = (title) => {
    props.routechangehandler(title);
    console.log(categories, 'title');
  };

  // Reverse categories and product array outside JSX to avoid mutation
  const reversedCategories = categories ? [...categories].reverse() : [];
  const reversedProductArray = props.productarray ? [...props.productarray].reverse() : [];

  return (
    <>
      <Layout>
        <Fullcontainer className={`bg-white ${Styles.Fullcontainer}`}>
          <Container className={`${Styles.Container}`}>
            <h1 className={`${Styles.headtitle} font-semibold`}>
              Shop All Products
            </h1>
            <p className="flex items-center">
              {props.pagelocation?.map((item, idx) => (
                <Link to={item.path} key={idx}>
                  {item.title}
                </Link>
              ))}
            </p>
            <div className="grid grid-cols-5 gap-4 mt-2">
              {categories ? (
                <>
                  <div className={`${Styles.sideTable} col-span-1`}>
                    <ProductSideTable
                      categoriesList={reversedCategories}
                      routechangehandler={routechangehandler}
                      sidetabletitle={props.sidetabletitle}
                    />
                  </div>
                  <div className={`col-span-5 md:col-span-4 `}>
                    <div className={`grid grid-cols-8 gap-2 `}>
                      {reversedCategories.map((data) => (
                        <div
                          className={`${Styles.productCard} col-span-4 sm:col-span-4  lg:col-span-2 cursor-pointer`}
                          onClick={() => routechangehandler(data)}
                        >
                          <div className={Styles.imageDiv}>
                            <img
                              src={
                                data.imgs1 ||
                                data.subsubcategoryimg ||
                                data.subcategoryimg ||
                                data.img
                              }
                              alt=""
                            />
                          </div>
                          <h3 className="font-semibold">
                            {data.productname1 ||
                              data.subsubcategory ||
                              data.subcategory ||
                              data.title}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : !props.nodatafound ? (
                <div
                  role="status"
                  className="flex h-[70vh] col-span-6 items-center justify-center"
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
              ) : (
                <h1 className="text-xl flex mt-16 col-span-6 items-center justify-center">
                  No products found!
                </h1>
              )}
              {props.productarray ? (
                <>
                  <div className={`${Styles.sideTable} col-span-1`}></div>
                  <div className={`col-span-5 md:col-span-4 `}>
                    <h1 className="text-xl font-semibold">
                      {props.productarray[0].categoryid} Products:
                    </h1>
                    <div className={`grid grid-cols-8 gap-2 `}>
                      {reversedProductArray.map((data) => (
                        <div
                          className={`${Styles.productCard1} col-span-4 sm:col-span-4 mt-2  lg:col-span-2 cursor-pointer`}
                          onClick={() => routechangehandler(data)}
                        >
                          <div className={Styles.imageDiv1}>
                            <img src={data.imgs1} alt="" />
                          </div>
                          <h1 className={`text-left font-semibold ${Styles.productname1}`}>
                            {data.productname1}
                          </h1>
                          <h1 className={`text-left text-lg font-semibold ${Styles.productPrice}`}>
                            ₹ {data.price2A}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </Container>
        </Fullcontainer>
      </Layout>
    </>
  );
};

export default ProductList;
