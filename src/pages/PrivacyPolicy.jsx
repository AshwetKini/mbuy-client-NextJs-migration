import React, { useState, useEffect } from "react";
import Styles from "./PrivacyPolicy.module.css";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import SideTable from "../components/UI/SideTable";
import { getPrivacyPolicy } from "../apis/api";
import Layout from "../components/Layout/Layout";

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      let privacyPolicy = await getPrivacyPolicy();
      setPrivacyPolicy(privacyPolicy[0].privacypolicy);
    };
    fetchPrivacyPolicy();
  }, []);

  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4"`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <SideTable />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1>Privacy Policy</h1>
            <div
              className={`mt-1 text-sm break-words`}
              dangerouslySetInnerHTML={{ __html: privacyPolicy }}
            />
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default PrivacyPolicy;
