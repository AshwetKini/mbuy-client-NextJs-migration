import React, { useState, useEffect } from "react";
import Styles from "./RRCpolicy.module.css";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import SideTable from "../components/UI/SideTable";
import { getReturnPolicy } from "../apis/api";
import Layout from "../components/Layout/Layout";

const RRCpolicy = () => {
  const [returnPolicy, setReturnPolicy] = useState(null);

  useEffect(() => {
    const fetchReturnPolicy = async () => {
      let returnPolicy = await getReturnPolicy();
      setReturnPolicy(returnPolicy[0].rrcpolicy);
    };
    fetchReturnPolicy();
  }, []);

  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <SideTable />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1>Return, Refund & Cancellation Policy</h1>
            <div
              className={`mt-1 text-sm break-words`}
              dangerouslySetInnerHTML={{ __html: returnPolicy }}
            />
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default RRCpolicy;
