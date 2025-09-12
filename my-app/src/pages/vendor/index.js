"use client"
import React, { useState, useEffect } from "react";
import Fullcontainer from "../../components/UI/Fullcontainer";
import Container from "../../components/UI/Container";
import SideTable from "../../components/UI/SideTable";
import Styles from "./Vendor.module.css";
import Layout from "../../Layouts/Layout";
import VendorForm from "../../components/UI/VendorForm";
import WareHouse from "../../components/warehouse/WareHouse";
import { getUser } from "../../apis/api";
// import img1 from "../../../public/vendor1.png";
// import img2 from "../../../public/vendor2.png";
// import img3 from "../../../public/vendor3.png";
// import img4 from "../../../public/vendor4.png";
// import img5 from "../../../public/vendor5.png";
// import { Helmet } from "react-helmet";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Vendor = () => {
  const [vendorStatus, setVendorStatus] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();
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
      setVendorStatus(<h1 onClick={() => router.push("/login")} className={`m-3 cursor-pointer`}>Please login to continue!</h1>);
    }
  }, []);

  const formStatus = (status) => {
    if (status) {
      setVendorStatus(<h1 className={`m-3`}>Request have been sent!</h1>);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Be a vendor at Material Buy</title>
        <meta
          name="description"
          content="Join Materialbuy.com as a vendor and expand your reach. Partner with us to grow your business by selling quality building materials and services online."
        />
      </Head>
      <Fullcontainer className={Styles.fullcontainer}>
        {vendorStatus ? (
          <Container className={`${Styles.container} grid grid-cols-5 gap-4"`}>
            <div className={`col-span-1 ${Styles.vendor_side}`}>
              <SideTable />
            </div>
            <div className={`col-span-5 md:col-span-4 ${Styles.vendor_main}`}>
              <h1>Join Us And Grow As A Vendor</h1>
              <div className={`${Styles.hero}`}>
               <Image src="/vendor1.png" width={1000} height={1000} />
              </div>
              <br />
              <br />
              <div className={`${Styles.hero}`}>
              <Image src="/vendor2.png" width={1000} height={1000} />
              </div>
              <br />
              <br />
              <div className={`${Styles.hero}`}>
              <Image src="/vendor3.png" width={1000} height={1000} />
              </div>
              <br />
              <br />
              <div className={`${Styles.hero}`}>
              <Image src="/vendor4.png" width={1000} height={1000} />
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

              <p className="text-md font-semibold text-xl">
                Let’s Join Hands And Fly To The Sky<br />
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
              <Image src="/vendor5.png" width={1000} height={1000} />
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
