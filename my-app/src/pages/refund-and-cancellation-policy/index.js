import React, { useState, useEffect } from "react";
import Styles from "./RRCpolicy.module.css";
import Fullcontainer from "../../components/UI/Fullcontainer";
import Container from "../../components/UI/Container";
import SideTable from "../../components/UI/SideTable";
import { getrrcpolicy } from "../../apis/api";
import Layout from "../../Layouts/Layout";

function RRCpolicy () {
  const [RrcPolicy, setRrcPolicy] = useState(null);

  useEffect(() => {
    const fetchRrcpolicy = async () => {
      let RrcPolicy = await getrrcpolicy();
      setRrcPolicy(RrcPolicy[0].rrcpolicy);
    };
    fetchRrcpolicy();
  }, []);

  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <SideTable />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1>Refund & Cancellation Policy</h1>
            <div
              className={`mt-1 text-sm break-words`}
              dangerouslySetInnerHTML={{ __html: RrcPolicy }}
            />
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default RRCpolicy;
