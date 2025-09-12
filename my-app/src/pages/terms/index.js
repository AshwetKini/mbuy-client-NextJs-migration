import React, { useState, useEffect } from "react";
import Styles from "./TermOfService.module.css";
import Fullcontainer from "../../components/UI/Fullcontainer";
import Container from "../../components/UI/Container";
import SideTable from "../../components/UI/SideTable";
import { getTerms } from "../../apis/api";
import Layout from "../../Layouts/Layout";

function TermOfService () {
  const [terms, setTerms] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      let terms = await getTerms();
      setTerms(terms[0].ts);
    };
    fetchTerms();
  }, []);

  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4"`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <SideTable />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1>Terms of Service</h1>
            <div
              className={`mt-1 text-sm break-words`}
              dangerouslySetInnerHTML={{ __html: terms }}
            />
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default TermOfService;
