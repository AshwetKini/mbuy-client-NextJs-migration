import React, { useEffect, useState } from 'react';
import Style from './Orders.module.css';
import Fullcontainer from '../components/UI/Fullcontainer';
import Container from '../components/UI/Container';
import Layout from '../components/Layout/Layout';
import UserDetailsSideTable from '../components/UI/UserDetailsSideTable';
import { getOrdersStatus, cancelOrder } from '../apis/api';
import { toast } from 'react-toastify';
import { BiTrash } from 'react-icons/bi';
import Button from '../components/UI/Button';
import moment from "moment";

const Orders = () => {
  const [ordersList, setOrderList] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState({ show: false, productId: null, userOrderId: null });


  useEffect(() => {
    const getOrdersList = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await getOrdersStatus(token);
        console.log(response.data.userOrderData);
        setOrderList(response.data.userOrderData);
      } catch (error) {
        console.log(error);
      } finally {
        // Set loading to false once data fetching is completed
        setIsLoading(false);
      }
    };
    setStatus(null);
    getOrdersList();
  }, [status]);

  const openCancelModal = (productId, userOrderId) => {
    setModalData({ show: true, productId, userOrderId });
  };

  const closeModal = () => {
    setModalData({ show: false, productId: null, userOrderId: null });
  };

  const confirmCancelOrder = async () => {
    const { productId, userOrderId } = modalData;
    closeModal();
    try {
      let newStatus;
      let user = JSON.parse(localStorage.getItem('user'));
      const status = ordersList.map((orderssss) => {
        if (orderssss.userOrder._id === userOrderId) {
          return orderssss.userOrder.products.map((ordersproducts) => {
            const statusss = ordersproducts.vairanceid
              ? productId === ordersproducts.vairanceid
                ? ordersproducts.status
                : ''
              : productId === ordersproducts.productid
                ? ordersproducts.status
                : '';
            newStatus = statusss;
          });
        }
      });
      let newtime;
      const timeInterval = ordersList.forEach((orderss) => {
        const time =
          orderss.userOrder._id === userOrderId
            ? orderss.userOrder.createdAt
            : '';
        if (time) {
          newtime = time;
          return;
        }
        return;
      });
      const currentTime = new Date(); // Current time
      const orderTime = new Date(newtime); // Time when the order was created

      // Calculate the time difference in hours
      const timeDifferenceInHours = Math.abs(currentTime - orderTime) / 36e5; // 36e5 is the number of milliseconds in an hour
      if (timeDifferenceInHours < 24 && newStatus !== 'IN TRANSIT') {
        const ChangedStatus = { status: 'CANCELLED' };
        const response = await cancelOrder(
          ChangedStatus,
          user._id,
          productId,
          userOrderId
        );
        if (response.message === 'Status updated successfully') {
          setStatus('changed');
          toast.success('Order cancelled Sucessfully');
        } else {
          toast.error('Error cancelling Order');
        }
      } else {
        toast.error('Order is shipped contact MaterialBuy for futher details');
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                  <div>Loading...</div>
                ) : ordersList && ordersList.length > 0 ? (
                  <>
                    <ul className="flex flex-col gap-4 mt-3">
                      {ordersList
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
                              const status = order.userOrder.products.map(
                                (ordersproducts) =>
                                  ordersproducts.vairanceid
                                    ? product._id === ordersproducts.vairanceid
                                      ? ordersproducts.status
                                      : ''
                                    : product._id === ordersproducts.productid
                                      ? ordersproducts.status
                                      : ''
                              );
                              let newStatus = status[productIndex];
                              if (
                                newStatus === 'IN TRANSIT' ||
                                newStatus === 'PENDING' ||
                                newStatus === 'DELIVERED' ||
                                newStatus === 'CANCELLED' ||
                                newStatus === 'RETURN' ||
                                newStatus === 'REFUND'
                              ) {
                                return (
                                  <>
                                    <li
                                      key={productIndex}
                                      className="flex flex-col p-3 sm:flex-row sm:justify-between border bg-gray-100 rounded"
                                    >
                                      <div className="flex w-full space-x-2 sm:space-x-4">
                                        <img
                                          className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                                          src={product.imgs1}
                                          alt={product.productname1}
                                        />
                                        <div className="flex w-full flex-col justify-between pb-4">
                                          <div className="flex w-full justify-between space-x-2 pb-2">
                                            <div className="space-y-1">
                                              <h3 className="text-lg font-semibold leading-snug sm:pr-8 line-clamp-1 text-ellipsis">
                                                {product.productname1}
                                              </h3>
                                              <h3 className="text-lg font-semibold leading-snug flex items-center gap-3 sm:pr-8 line-clamp-1 text-ellipsis">
                                                Amount: ₹{' '}
                                                {order.userOrder.shippingdetail.map(
                                                  (ordersproduct) =>
                                                    ordersproduct.variantid
                                                      ? product._id ===
                                                        ordersproduct.variantid
                                                        ? parseFloat(ordersproduct.Price) + parseFloat(ordersproduct.Price * ordersproduct.gst / 100)
                                                        : ''
                                                      : product._id ===
                                                        ordersproduct.productid
                                                        ? parseFloat(ordersproduct.Price) + parseFloat(ordersproduct.Price * ordersproduct.gst / 100)
                                                        : ''
                                                )}{' '}


                                              </h3>

                                              <h3 className="text-lg font-semibold leading-snug flex items-center gap-3 sm:pr-8 line-clamp-1 text-ellipsi">
                                                <span className="font-semibold">
                                                  Quantity:{' '}
                                                </span>{' '}
                                                {order.userOrder.products.map(
                                                  (ordersproducts) =>
                                                    ordersproducts.vairanceid
                                                      ? product._id ===
                                                        ordersproducts.vairanceid
                                                        ? ordersproducts.quantity
                                                        : ''
                                                      : product._id ===
                                                        ordersproducts.productid
                                                        ? ordersproducts.quantity
                                                        : ''
                                                )}
                                              </h3>

                                              <p className="">
                                                <span className="font-semibold">
                                                  Order ID:{' '}
                                                </span>
                                                {order.userOrder.OrderId}
                                              </p>

                                              <p className="">
                                                <span className="font-semibold">
                                                  Tracking ID:{' '}
                                                </span>
                                                {order.userOrder.trackingId}
                                              </p>

                                              <p className="">
                                                <span className="font-semibold">
                                                  Payment Status:{' '}
                                                </span>
                                                {order.userOrder.paymentStatus}
                                              </p>

                                              {/* <p className="">
                                                <span className="font-semibold">
                                                  Message:{' '}
                                                </span>
                                                {order.userOrder.statusMes}
                                              </p> */}

                                              <p className="">
                                                <span className="font-semibold">
                                                  Order Placed On:{' '}
                                                </span>
                                                {order.userOrder.products.map(
                                                  (ordersproducts) =>
                                                    ordersproducts.vairanceid
                                                      ? product._id ===
                                                        ordersproducts.vairanceid
                                                        ? moment(`${order.userOrder
                                                          .createdAt}`).format(" Do MMMM YYYY") + ' ' + moment(`${order.userOrder
                                                            .createdAt}`).format("LTS")
                                                        : ''
                                                      : product._id ===
                                                        ordersproducts.productid
                                                        ? moment(`${order.userOrder
                                                          .createdAt}`).format(" Do MMMM YYYY") + ' ' + moment(`${order.userOrder
                                                            .createdAt}`).format("LTS")
                                                        : ''
                                                )}
                                              </p>
                                              <p className="">
                                                <span className="font-semibold">
                                                  Delivery Address:{' '}
                                                </span>
                                                {order.userOrder.products.map(
                                                  (ordersproducts) =>
                                                    ordersproducts.vairanceid
                                                      ? product._id ===
                                                        ordersproducts.vairanceid
                                                        ? order.userOrder
                                                          .Shippingaddress
                                                        : ''
                                                      : product._id ===
                                                        ordersproducts.productid
                                                        ? order.userOrder
                                                          .Shippingaddress
                                                        : ''
                                                )}
                                              </p>
                                              <p>
                                                <span className="font-semibold">Status: </span>
                                                {(() => {
                                                  const status = order.userOrder.products.map((ordersproducts) =>
                                                    ordersproducts.vairanceid
                                                      ? product._id === ordersproducts.vairanceid
                                                        ? ordersproducts.status
                                                        : ""
                                                      : product._id === ordersproducts.productid
                                                        ? ordersproducts.status
                                                        : ""
                                                  );

                                                  let newStatus = status[productIndex];

                                                  // Define a map for status-to-color mapping
                                                  const statusColorMap = {
                                                    PENDING: "text-black", // Yellow for pending
                                                    DELIVERED: "text-green-500", // Green for delivered
                                                    RETURN: "text-red-500", // Purple for return
                                                    "IN TRANSIT": "text-black", // Blue for in transit
                                                    REFUND: "text-red-500", // Orange for refund
                                                    CANCELLED: "text-red-500", // Red for cancelled
                                                  };

                                                  const statusMessage =
                                                    newStatus === "PENDING"
                                                      ? "Order has been placed. Delivery will be done within 5-7 days."
                                                      : newStatus === "IN TRANSIT"
                                                        ? "Order has been shipped and will be delivered within 5-7 days."
                                                        : newStatus;

                                                  return (
                                                    <span className={`font-medium ${statusColorMap[newStatus] || ""}`}>
                                                      {statusMessage}
                                                    </span>
                                                  );
                                                })()}
                                              </p>

                                            </div>
                                          </div>
                                          <div className="flex divide-x text-sm">
                                            {(() => {
                                              // Calculate the time difference
                                              const currentTime = new Date();
                                              const orderTime = new Date(order.userOrder.createdAt);
                                              const timeDifferenceInHours = Math.abs(currentTime - orderTime) / 36e5;

                                              // Show the cancel button only if within 24 hours and not in transit
                                              if (timeDifferenceInHours < 24 && newStatus === 'PENDING' && order.userOrder.paymentStatus === "SUCCESS") {
                                                return (
                                                  <button
                                                    type="button"
                                                    className="flex items-center text-white px-3 bg-[#102c44] rounded space-x-2 py-2"
                                                    onClick={() => {


                                                      openCancelModal(product._id, order.userOrder._id);

                                                    }}
                                                  >
                                                    <BiTrash size={16} />
                                                    <span>Cancel (Only within 24 hours)</span>
                                                  </button>
                                                );
                                              }
                                              return null;
                                            })()}
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </>
                                );
                              } else {
                                return '';
                              }
                            })
                        )}{' '}
                    </ul>
                  </>
                ) : (
                  'not found '
                )}
              </div>
            </div>
          </Container>
        </Fullcontainer>
        {modalData.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-lg font-semibold">Confirm Cancellation</h3>
              <p>Are you sure you want to cancel this product?</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                  onClick={closeModal}
                >
                  No
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={confirmCancelOrder}
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </React.Fragment>
  );
};

export default Orders;
