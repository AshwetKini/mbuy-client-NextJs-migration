import React, { useState, useEffect } from "react";
import Styles from "./refund-policy.module.css";
import Fullcontainer from "@/components/UI/Fullcontainer";
import Container from "@/components/UI/Container";
import SideTable from "@/components/UI/SideTable";
import {getReturnPolicy } from "@/apis/api";
import Layout from "@/Layouts/Layout";

function ReturnPolicy() {
  const [refundPolicies, setRefundPolicies] = useState([]);

  useEffect(() => {
    const fetchReturnpolicy = async () => {
      let policies = await getReturnPolicy();
      console.log(policies);
      setRefundPolicies(policies);
    };
    fetchReturnpolicy();
  }, []);

  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <SideTable />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1>Return Policy</h1>
            {refundPolicies.length > 0 ? (
              refundPolicies.map((policy) => (
                <div
                  key={policy._id}
                  className="mt-1 text-sm break-words"
                  dangerouslySetInnerHTML={{ __html: policy.returnpolicy }}
                />
              ))
            ) : (
              <p>Loading Return policies...</p>
            )}
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
}

export default ReturnPolicy;
