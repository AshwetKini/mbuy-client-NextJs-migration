import React from "react";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import Styles from "./Contact.module.css";
import SideTable from "../components/UI/SideTable";
import Button from "../components/UI/Button";
import Contactcard from "../components/UI/Contactcard";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4"`}>
          <div className={`col-span-1 ${Styles.contact_side}`}>
            <SideTable />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.contact_main}`}>
            <h1>Contact Us</h1>
            <div className={`${Styles.hero}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30110.289236564713!2d72.826862!3d19.37841!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ae9544b72959%3A0xfa76b19cea84b74d!2sHappy%20Palace%2C%20Dindayal%20Nagar%2C%20Vasai%20West%2C%20Vasai-Virar%2C%20Maharashtra%20401202%2C%20India!5e0!3m2!1sen!2sus!4v1691770615790!5m2!1sen!2sus"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <Contactcard className={`mt-3`}/>
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default Contact;
