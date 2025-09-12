import React, { useState, useEffect } from "react";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import SideTable from "../components/UI/SideTable";
import Styles from "./Vendor.module.css";
import Layout from "../components/Layout/Layout";
import VendorForm from "../components/UI/VendorForm";
import WareHouse from "../components/warehouse/WareHouse";
import { getUser, getPORS } from "../apis/api";
import img1 from "../assests/vendor1.png";
import img2 from "../assests/vendor2.png";
import img3 from "../assests/vendor3.png";
import img4 from "../assests/vendor4.png";
import img5 from "../assests/vendor5.png";
import { Helmet } from "react-helmet";

const Vendor = () => {
  const [vendorStatus, setVendorStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [pors, setPORS] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const getLastestUser = async (id) => {
      const response = await getUser(id);
      console.log({ response });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(user);
      }
    };
    getLastestUser(user?._id);

    if (user && user.beVendorRequest && user.role !== "Vendor") {
      setVendorStatus(<h1 className={`m-3`}>Request have been sent!</h1>);
    } else if (user && user.beVendorRequest && user.role === "Vendor") {
      setVendorStatus(null);
      // setVendorStatus(<h1 className={`m-3`}>You are already a vendor!</h1>);
    } else if (user && !user.beVendorRequest && user.role !== "Vendor") {
      setVendorStatus(<VendorForm status={formStatus} />);
    } else {
      setVendorStatus(<h1 className={`m-3`}>Please login to continue!</h1>);
    }
  }, []);

  const formStatus = (status) => {
    if (status) {
      setVendorStatus(<h1 className={`m-3`}>Request have been sent!</h1>);
    }
  };

  useEffect(() => {
    const fetchPORS = async () => {
      try {
        const response = await getPORS();
        if (response.status === 200) {
          setPORS(response.data);
        }
      } catch (error) {
        console.error("Error fetching PORS:", error);
      }
    };
    fetchPORS();
  }, []);

  // Filter PORS based on vendor status
  const filteredPORS = pors.filter(order => {
    return order.products.some(product => {
      // Check if vendorStatus is true AND if the vendor username matches current user's username
      return product.vendorStatus === true && 
        product.vendors && 
        product.vendors.some(vendor => 
          vendor.vendorName === user?.username
        );
    });
  });

  return (
    <Layout>
      <Helmet>
        <title>Be a vendor at Material Buy</title>
        <meta
          name="description"
          content="Join Materialbuy.com as a vendor and expand your reach. Partner with us to grow your business by selling quality building materials and services online."
        />
      </Helmet>
      <Fullcontainer className={Styles.fullcontainer}>
        {vendorStatus ? (
          <Container className={`${Styles.container} grid grid-cols-5 gap-4"`}>
            <div className={`col-span-1 ${Styles.vendor_side}`}>
              <SideTable />
            </div>
            <div className={`col-span-5 md:col-span-4 ${Styles.vendor_main}`}>
              <h1>Join Us And Grow As A Vendor</h1>
              <div className={`${Styles.hero}`}>
                <img src={img1} alt="" />
              </div>
              <br />
              <br />
              <div className={`${Styles.hero}`}>
                <img src={img2} alt="" />
              </div>
              <br />
              <br />
              <div className={`${Styles.hero}`}>
                <img src={img3} alt="" />
              </div>
              <br />
              <br />
              <div className={`${Styles.hero}`}>
                <img src={img4} alt="" />
              </div>
              <div className={`${Styles.vendor_from} shadow-lg ${!user ? 'animate-pulse' : ''} `}>
                <div className={`${Styles.vendor_from_title}`}>
                  {/* Become a vendor and earn by selling */}

                  {user && user.role === "Vendor" ? (
                    <h1 className="px-2 ">Vendor Panel</h1>
                  ) : (
                    <h2
                      className={`m-3 text-base sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold `}
                    >
                      Become a vendor and earn by selling
                    </h2>
                  )}
                </div>
                {vendorStatus}
              </div>
              <br />
              <br />

              {/* Purchase Orders Table */}
              {user && user.role === "Vendor" && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Your Purchase Orders</h2>
                  {filteredPORS.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-blue-950 text-white">
                          <tr>
                            <th className="py-3 px-4 text-left">Order ID</th>
                            <th className="py-3 px-4 text-left">Product Name</th>
                            <th className="py-3 px-4 text-left">Warehouse</th>
                            <th className="py-3 px-4 text-left">Quantity</th>
                            <th className="py-3 px-4 text-left">Price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredPORS.map((order) => (
                            order.products.map((product, index) => (
                              product.vendorStatus && 
                              product.vendors && 
                              product.vendors.some(vendor => vendor.vendorName === user?.username) && (
                                <tr key={`${order._id}-${index}`} className="hover:bg-gray-50">
                                  <td className="py-3 px-4">{order.OrdID}</td>
                                  <td className="py-3 px-4">
                                    {product.productName || product.variationName || "N/A"}
                                  </td>
                                  <td className="py-3 px-4">
                                    {product.warehouse && product.warehouse.length > 0
                                      ? product.warehouse[0].name
                                      : "N/A"}
                                  </td>
                                  <td className="py-3 px-4">{product.quantity}</td>
                                  <td className="py-3 px-4">₹{product.totalPrice}</td>
                                </tr>
                              )
                            ))
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                      <p className="text-gray-600">No purchase orders found</p>
                    </div>
                  )}
                </div>
              )}

              <p className="text-md font-semibold text-xl">
                Let's Join Hands And Fly To The Sky<br />
                Materialbuy: Navigating Today's Market Landscape
                <br />
              </p>
              <p className={`text-md text-justify`}>
                In a rapidly evolving market, where digital transformation is
                the norm, Materialbuy stands as a beacon of innovation and
                collaboration. Our commitment to excellence goes beyond
                providing a platform for transactions; we strive to create an
                ecosystem where vendors and customers thrive together.
                <br />
                <br />
              </p>
              <p className="text-md font-semibold text-xl" >
                Current Market Scenario
                <br />
              </p>
              <p className={`text-md text-justify`}>
                The current market scenario is marked by unprecedented shifts
                and challenges. Consumers are increasingly turning to online
                platforms for their purchasing needs, demanding not just
                products but seamless experiences. Materialbuy recognizes this
                paradigm shift and is dedicated to staying ahead of the curve.
                <br />
                <br />
              </p>
              <p className="text-md font-semibold text-xl">
                Changes Materialbuy Offers
                <br />
              </p>
              <p className={`text-md text-justify`}>
                <b>1. Technological Advancements:</b>
                <br />
                - We invest in cutting-edge technology to enhance the user
                experience for both vendors and customers.
                <br />
                - Our platform undergoes regular updates to incorporate the
                latest features and security measures.
                <br />
                <br />
                <b> 2. Customer-Centric Approach:</b>
                <br />
                - Understanding the importance of customer satisfaction, we
                focus on creating an intuitive and enjoyable shopping
                environment.
                <br />
                - Materialbuy continually refines its user interface to ensure
                easy navigation and a streamlined purchasing process.
                <br />
                <br />
                <b>3. Sustainable Practices:</b>
                <br />
                - Acknowledging the growing emphasis on sustainability, we
                actively promote and support vendors offering eco-friendly
                products.
                <br />
                - Our commitment to sustainable practices extends to our
                operations, where we strive to minimize our ecological
                footprint.
                <br />
                <br />
              </p>
              <p className="text-md font-semibold text-xl">
                How We Take Care of Our Vendors
                <br />
              </p>
              <p className={`text-md text-justify`}>
                At Materialbuy, our vendors are not just partners; they are the
                backbone of our thriving community. We go the extra mile to
                ensure their success and well-being.
                <br />
                <br />
              </p>
              <p className={`text-md text-justify`}>
                <b>1. Vendor Support Services:</b>
                <br />
                - Our dedicated support team is available to assist vendors at
                every step, addressing queries and providing timely assistance.
                <br />
                - We offer resources and training to help vendors optimize their
                online presence and sales strategies.
                <br />
                <br />
                <b>2. Transparent Communication:</b>
                <br />
                - Clear and open communication is the foundation of our
                relationship with vendors. We keep them informed about platform
                updates, market trends, and any changes that may impact their
                business.
                <br />
                <br />
                <b>3. No Fees, Maximum Profit:</b>
                <br />
                - Unlike many other platforms, Materialbuy does not charge any
                fees from vendors.
                <br />
                - Our commitment to supporting vendors extends to ensuring they
                receive the maximum profit from their sales.
                <br />
                <br />
              </p>
              <p className="text-md font-semibold text-xl">
                How Vendors Grow With Us
                <br />
              </p>
              <p className={`text-md text-justify`}>
                Materialbuy is not just a platform; it's a growth catalyst for
                vendors aiming to expand their reach and increase their market
                share.
                <br />
                <br />
              </p>
              <p className={`text-md text-justify`}>
                <b>1. Global Exposure:</b>
                <br />
                - Joining Materialbuy means tapping into a global customer base.
                We provide the exposure needed to reach new markets and
                demographics.
                <br />
                <br />
                <b>2. Marketing Collaboration:</b>
                <br />
                - Our marketing initiatives extend to promoting our vendors.
                From social media campaigns to targeted advertisements, we
                actively showcase our vendors' products.
                <br />
                <br />
                <b>3. Data-Driven Insights:</b>
                <br />
                - Vendors gain access to valuable analytics and data insights,
                helping them make informed decisions to enhance their product
                offerings and strategies.
                <br />
                <br />
                In conclusion, Materialbuy is not just a marketplace; it's a
                dynamic ecosystem where vendors flourish, customers find quality
                products, and the market evolves with the times. Join us in
                shaping the future of online commerce – a future where success
                is mutual, and growth knows no bounds.
                <br />
                <br />
              </p>
              <div className={`${Styles.hero}`}>
                <img src={img5} alt="" />
              </div>
              <br />
              <br />
            </div>
          </Container>
        ) : (
          <Container className={`${Styles.container}`}>
            <WareHouse />
          </Container>
        )}
      </Fullcontainer>
    </Layout>
  );
};

export default Vendor;
