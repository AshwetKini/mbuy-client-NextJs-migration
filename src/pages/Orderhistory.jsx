import React, { useEffect, useState } from "react";
import Style from "./Orderhistory.module.css";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import Layout from "../components/Layout/Layout";
import UserDetailsSideTable from "../components/UI/UserDetailsSideTable";
import { getOrdersStatus, cancelOrder } from "../apis/api";
import { toast } from "react-toastify";

const Orderhistory = () => {
  const [ordersList, setOrderList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getOrdersList = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await getOrdersStatus(token);
        setOrderList(response.data.userOrderData);
        console.log(response.data.userOrderData);
      } catch (error) {
        console.log(error);
      }
      finally {
        // Set loading to false once data fetching is completed
        setIsLoading(false);
      }
    };

    getOrdersList();
  }, []);

 
  return (  
    <React.Fragment>
      <Layout>
        <Fullcontainer className={Style.fullcontainer}>
          <Container className={`${Style.container}`}>
          <div className="md:grid md:grid-cols-8 gap-4">
              <div className="md:col-span-2 hidden md:block">
                <UserDetailsSideTable />
              </div>
              <div className="md:col-span-6">
                <h1 className="text-3xl">Orders</h1>
                {isLoading ? ( // Render loading spinner if isLoading is true
                  <div>Loading...</div>):
                ordersList && ordersList.length > 0
                  ? ordersList
                      .sort((orderA, orderB) => {
                        // Sort orders by the createdAt of their latest product
                        const latestProductA = orderA.products.reduce(
                          (latest, product) =>
                            product.createdAt > latest
                              ? product.createdAt
                              : latest,
                          new Date(0)
                        );

                        const latestProductB = orderB.products.reduce(
                          (latest, product) =>
                            product.createdAt > latest
                              ? product.createdAt
                              : latest,
                          new Date(0)
                        );

                        return latestProductB - latestProductA;
                      })
                      .map((order, orderIndex) =>
                        order.products
                          .sort((productA, productB) => {
                            // Sort products within each order by their createdAt
                            return (
                              new Date(productB.createdAt) -
                              new Date(productA.createdAt)
                            );
                          })
                          .map((product, productIndex) => {
                            const status = 
                                order.userOrder.products.map(
                                  (ordersproducts) =>
                                    ordersproducts.vairanceid
                                      ? product._id ===
                                        ordersproducts.vairanceid
                                        ? ordersproducts.status
                                        : ""
                                      : product._id ===
                                        ordersproducts.productid
                                      ? ordersproducts.status
                                      : ""
                                );
                                let newStatus = status[0];                           

                            console.log(newStatus)
                            if(newStatus === "DELIVERED"|| newStatus === "RETURN" || newStatus === "REFUND" || newStatus === "CANCELLED" ){

                            
                            return(
                            
                            <div
                              className={`${Style.orderDiv} w-full grid grid-cols-11 gap-4 bg-gray-100 mt-3 rounded shadow-md`}
                            >
                              <div className={`col-span-2 ${Style.imgdiv}`}>
                                <img
                                  src={product.imgs1}
                                  alt=""
                                  className="rounded"
                                />
                              </div>
                              <div
                                className={`col-span-4 ${Style.descriptionDiv}`}
                              >
                                <h2
                                  className="text-xl font-semibold"
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                  }}
                                >
                                  {product.productname1}
                                </h2>
                                <h3 className="text-md mt-3 font-medium">
                                  Quantity :{" "}
                                  {
                                    order.userOrder.products.map(
                                      (ordersproducts) =>
                                        ordersproducts.vairanceid
                                          ? product._id ===
                                            ordersproducts.vairanceid
                                            ? ordersproducts.quantity
                                            : ""
                                          : product._id ===
                                            ordersproducts.productid
                                          ? ordersproducts.quantity
                                          : ""
                                    )
                                  }
                                </h3>
                              </div>
                              <div className="col-span-2 mt-3 mb-3 md:mt-5">
                                <h1 className="font-semibold text-xl">
                                  ₹{product.finalPrice}
                                  {/* {(() => {
                                    const quantity = 
                                        order.userOrder.products.map(
                                          (ordersproducts) =>
                                            ordersproducts.vairanceid
                                              ? product._id ===
                                                ordersproducts.vairanceid
                                                ? ordersproducts.quantity
                                                : ""
                                              : product._id ===
                                                ordersproducts.productid
                                              ? ordersproducts.quantity
                                              : ""
                                        )
                                    ;

                                    let totalQuantity = quantity[0];
                                    
                                    if (
                                      +totalQuantity >= +product.minimum1 &&
                                      +totalQuantity <= +product.maximum1
                                    ) {
                                      return +totalQuantity * +product.price1;
                                    } else if (
                                      +totalQuantity >= +product.minimum2 &&
                                      +totalQuantity <= +product.maximum2
                                    ) {
                                      return +totalQuantity * +product.price2;
                                    } else if (
                                      +totalQuantity >= +product.minimum3 &&
                                      +totalQuantity <= +product.maximum3
                                    ) {
                                      
                                      return +totalQuantity * +product.price3;
                                    } else if (
                                      +totalQuantity >= +product.minimum4 &&
                                      +totalQuantity <= +product.maximum4
                                    ) {
                                      return +totalQuantity * +product.price4;
                                    } else if (
                                      +totalQuantity >= +product.minimum5 &&
                                      +totalQuantity <= +product.maximum5
                                    ) {
                                      return +totalQuantity * +product.price5;
                                    } else if (
                                      +totalQuantity >= +product.minimum6 &&
                                      +totalQuantity <= +product.maximum6
                                    ) {
                                      return +totalQuantity * +product.price6;
                                    } else {
                                      return "0";
                                    }
                                  })()} */}
                                </h1>
                              </div>
                              <div
                                className="col-span-3 mt-3 mb-3 md:mt-5"
                                style={{
                                  display: "grid",
                                  gridTemplateRows: "1fr auto",
                                  gap: "1rem",
                                }}
                              >
                                <div>
                                  <h3 className="text-sm mt-1 font-medium">
                                    Status:{" "}
                                    {(() => {
                                      const status = 
                                          order.userOrder.products.map(
                                            (ordersproducts) =>
                                              ordersproducts.vairanceid
                                                ? product._id ===
                                                  ordersproducts.vairanceid
                                                  ? ordersproducts.status
                                                  : ""
                                                : product._id ===
                                                  ordersproducts.productid
                                                ? ordersproducts.status
                                                : ""
                                          )
                                      ;

                                      let newStatus = status[0];
                                      
                                      if (newStatus === "PENDING") {
                                        return "Order has been Placed";
                                      } else if (newStatus === "IN TRANSIT") {
                                        return "Order Has been Shipped";
                                      } else {
                                        return newStatus;
                                      }
                                    })()}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          ) }else{
                            return ''
                          }
                        })
                      )
                  : "not found "}
              </div>
            </div>        
          </Container>
        </Fullcontainer>
      </Layout> 
    </React.Fragment>
  );
};

export default Orderhistory;
