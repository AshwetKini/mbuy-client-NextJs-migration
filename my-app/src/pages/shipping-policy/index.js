import React, { useState, useEffect } from "react";
import Styles from "./ShippingPolicy.module.css";
import Fullcontainer from "../../components/UI/Fullcontainer";
import Container from "../../components/UI/Container";
import SideTable from "../../components/UI/SideTable";
import { getShippingPolicy } from "../../apis/api";
import Layout from "../../Layouts/Layout";

function ShippingPolicy () {
  const [shippingPolicy, setShippingPolicy] = useState(null);

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      let shippingPolicy = await getShippingPolicy();
      setShippingPolicy(shippingPolicy[0].shippingpolicy);
    };
    fetchShippingPolicy();
  }, []);

  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4"`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <SideTable />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1>Shipping Policy</h1>
            <div
              className={`mt-1 text-sm break-words`}
              dangerouslySetInnerHTML={{ __html: shippingPolicy }}
            />
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default ShippingPolicy;
