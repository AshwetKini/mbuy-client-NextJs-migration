import React, { useEffect, useState } from 'react';
import Style from './Orders.module.css';
import Fullcontainer from '../../components/UI/Fullcontainer';
import Container from '../../components/UI/Container';
import Layout from '../../Layouts/Layout';
import UserDetailsSideTable from '../../components/UI/UserDetailsSideTable';
import { getOrdersStatus, cancelOrder ,getProduct } from '../../apis/api';
import { toast } from 'react-toastify';
import { BiTrash } from 'react-icons/bi';
import moment from 'moment';

const Orders = () => {
  const [ordersList, setOrderList] = useState([

  ]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState({ show: false, productId: null, userOrderId: null });
  const [orderProduct , setOrderProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  // Calculate pagination values
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = ordersList.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(ordersList.length / ordersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await getOrdersStatus(token);
        
        if (response.error) {
          toast.error(response.error);
          setOrderList([]);
        } else {
          // console.log(response.data.userOrderData.userOrder , " order list");
          // setOrderList(response.data.userOrderData);
          // console.log(ordersList)
          let orders = response.data.userOrderData;
          setOrderList(orders);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch orders. Please try again later.");
        setOrderList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [status]);

console.log(ordersList ,"orders list")

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
      
      // Find the correct order and product to get the status
      let orderToCancel = ordersList.find(order => order.userOrder._id === userOrderId);
      if (!orderToCancel) {
        toast.error('Order not found');
        return;
      }
      
      // Find the correct product in the order
      let productToCancel = orderToCancel.userOrder.products.find(product => 
        (product._id === productId) || 
        (product.vairanceid === productId) || 
        (product.productid === productId)
      );
      
      if (!productToCancel) {
        toast.error('Product not found in order');
        return;
      }
      
      newStatus = productToCancel.status;
      
      // Get the order time
      const orderTime = new Date(orderToCancel.userOrder.createdAt);
      const currentTime = new Date();
      
      // Calculate the time difference in hours
      const timeDifferenceInHours = Math.abs(currentTime - orderTime) / 36e5; // 36e5 is the number of milliseconds in an hour
      
      if (timeDifferenceInHours < 24 && newStatus !== 'IN TRANSIT') {
        // Include both status and reason in the payload
        const ChangedStatus = { 
          status: 'CANCELLED',
          reason: 'Found Better Price Somewhere Else' // Adding a reason for cancellation
        };
        
        // Determine the correct product ID to use (either product._id, vairanceid, or productid)
        const actualProductId = productToCancel.vairanceid || productToCancel.productid || productId;
        
        console.log("Cancelling order with:", {
          status: ChangedStatus,
          userId: user._id,
          productId: actualProductId,
          orderId: userOrderId
        });
        
        const response = await cancelOrder(
          ChangedStatus,
          user._id,
          actualProductId,
          userOrderId
        );
        
        if (response && response.message === 'Status updated successfully') {
          setStatus('changed');
          toast.success('Order cancelled successfully');
        } else {
          toast.error(response?.error || 'Error cancelling order');
        }
      } else {
        toast.error('Order is shipped. Contact MaterialBuy for further details.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to cancel order. Please try again.');
    }
  };

  return (
    <Layout>
      <Fullcontainer className={Style.fullcontainer}>
        <Container className={Style.container}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="hidden md:block w-1/4">
              <UserDetailsSideTable />
            </div>
    
            <div className="flex-1 p-4 max-w-7xl">
              <h1 className="text-3xl font-bold text-blue-950 mb-6">My Orders</h1>
              
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-950"></div>
                </div>
              ) : ordersList?.length ? (
                <>
                  <div className="flex flex-col gap-6">
                    {currentOrders.reverse().map(order => (
                      <div key={order.userOrder._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Order Header */}
                        <div className="bg-blue-950 p-4 text-white">
                          <div className="flex flex-wrap gap-4 justify-between items-center">
                            <div className="flex flex-col">
                              <span className="text-sm opacity-80">Order ID</span>
                              <span className="font-medium">{order.userOrder.OrderId}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm opacity-80">Tracking ID</span>
                              <span className="font-medium">{order.userOrder.trackingId}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm opacity-80">Payment Status</span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                {
                                  PENDING: "bg-yellow-500 text-white",
                                  SUCCESS: "bg-green-500 text-white",
                                  FAILED: "bg-red-500 text-white",
                                  Aborted: "bg-red-500 text-white",
                                }[order.userOrder.paymentStatus]
                              }`}>
                                {order.userOrder.paymentStatus}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm opacity-80">Total Amount</span>
                              <span className="font-bold">₹{order.userOrder.amount}</span>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="divide-y divide-gray-100">
                          {order.userOrder.products.map(product => (
                            <div key={product._id} className="p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex flex-col md:flex-row gap-6">
                                {/* Left Column - Product Details */}
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-blue-950 mb-2">
                                    {product.productname}
                                  </h3>
                                  <div className="flex gap-6">
                                    <div className="flex flex-col gap-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-600">Ordered On:</span>
                                        <span className="text-sm text-gray-900">
                                          {moment(order.userOrder.createdAt).format('DD MMM YYYY')}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-600">Quantity:</span>
                                        <span className="text-sm text-gray-900">{product.quantity}</span>
                                      </div>
                                      {order.userOrder.statusMes && (
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium text-gray-600">Message:</span>
                                          <span className="text-sm text-gray-900">{order.userOrder.statusMes}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Middle Column - Address */}
                                <div className="w-[300px]">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-600">Delivery Address:</span>
                                    <span className="text-sm text-gray-900 mt-1">
                                      {order.userOrder.Shippingaddress.length > 100
                                        ? `${order.userOrder.Shippingaddress.slice(0, 100)}...`
                                        : order.userOrder.Shippingaddress}
                                    </span>
                                  </div>
                                </div>

                                {/* Right Column - Status and Actions */}
                                <div className="flex flex-col items-end gap-3 min-w-[150px]">
                                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                                    {
                                      PENDING: "bg-yellow-100 text-yellow-800",
                                      DELIVERED: "bg-green-500 text-white",
                                      RETURN: "bg-red-500 text-white",
                                      "IN TRANSIT": "bg-blue-950 text-white",
                                      REFUND: "bg-red-500 text-white",
                                      CANCELLED: "bg-red-500 text-white",
                                    }[product.status]
                                  }`}>
                                    {product.status}
                                  </span>

                                  {product.status === "CANCELLED" && (
                                    <div className="text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
                                      Found Better Price Somewhere Else
                                    </div>
                                  )}

                                  {(() => {
                                    // Calculate the time difference
                                    const currentTime = new Date();
                                    const orderTime = new Date(order.userOrder.createdAt);
                                    const timeDifferenceInHours = Math.abs(currentTime - orderTime) / 36e5;

                                    // Show the cancel button only if within 24 hours and not in transit
                                    if (timeDifferenceInHours < 24 && product.status === 'PENDING' && order.userOrder.paymentStatus === "SUCCESS") {
                                      return (
                                      <button
                                        className="flex items-center gap-2 text-white px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full text-sm font-medium transition-colors"
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
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6 pb-8">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-full ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-950 text-white hover:bg-blue-800'
                        }`}
                      >
                        Previous
                      </button>

                      {/* Page Numbers */}
                      <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1;
                          // Show first page, last page, current page, and one page before and after current page
                          if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                  currentPage === pageNumber
                                    ? 'bg-blue-950 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          } else if (
                            pageNumber === currentPage - 2 ||
                            pageNumber === currentPage + 2
                          ) {
                            return <span key={pageNumber} className="px-1">...</span>;
                          }
                          return null;
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-full ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-950 text-white hover:bg-blue-800'
                        }`}
                      >
                        Next
                      </button>

                      {/* Orders count */}
                      <div className="text-sm text-gray-500 ml-4">
                        Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, ordersList.length)} of {ordersList.length} orders
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
                  <div className="text-blue-950 mb-4">
                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-950 mb-2">No Orders Found</h3>
                  <p className="text-gray-600">Start shopping to see your orders here</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Fullcontainer>
  
      {/* Cancel Confirmation Modal */}
      {modalData.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-blue-950 mb-2">Confirm Cancellation</h3>
            <p className="mb-4 text-gray-700">Are you sure you want to cancel this product?</p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> Orders can only be cancelled within 24 hours of placing them and before they are shipped. Cancellation reason will be recorded as "Found Better Price Somewhere Else".
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors" 
                onClick={closeModal}
              >
                No, Keep Order
              </button>
              <button 
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors" 
                onClick={confirmCancelOrder}
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Orders;
