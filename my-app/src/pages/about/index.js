import React from "react";
import Fullcontainer from "@/components/UI/Fullcontainer";
import Container from "@/components/UI/Container";
import Styles from "./About.module.css";
import SideTable from "@/components/UI/SideTable";
import Layout from "@/Layouts/Layout";
import Image from "next/image";


const About = () => {
  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4"`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <SideTable />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1>Get to Know Us</h1>
            <div className={`${Styles.hero}`}>
            <Image
      src="/about_us_1.jpg" 
      alt="About Us"
      width={1000}
      height={1000}
    />
            </div>
            <div>
              <p
                className={`text-center text-2xl pt-3`}
                style={{ color: "#102c44" }}
              >

              </p>
              <p className={`text-md font-semibold text-xl`}>
                <b>About MaterialBuy: Crafting Excellence in Every Space</b>
              </p>
              <p className={`text-md text-justify`}>
                Welcome to MaterialBuy, where innovation meets functionality, and your vision for exceptional spaces becomes a reality.
                As a leading platform in the industry, MaterialBuy is committed to redefining the way you approach building, renovating,
                and decorating your homes, offices, and shops.<br /><br />
              </p>
              <p className={`text-md font-semibold text-xl`}>
                <b> Who we are</b>
              </p>
              <p className={`text-md text-justify`}>
                At MaterialBuy, we are more than an online marketplace;
                we are a dynamic hub that brings together a curated selection of high-quality building materials,
                hardware, bathroom essentials, and interior decor items. Our commitment to excellence is reflected in every product we offer,
                ensuring that you have access to the finest elements for your spaces.<br /><br />
              </p>
              <p className={`text-md font-semibold text-xl`}>
                <b>Comprehensive Solutions</b>
              </p>
              <p className={`text-md text-justify`}>
                Beyond providing top-tier products, MaterialBuy is your partner in transforming spaces. We offer comprehensive solutions like:-<br />
                <b>Prefab Houses:</b>Explore innovative and sustainable prefab housing solutions tailored to your needs.<br />
                <b>Interior Design:</b> Collaborate with skilled professionals to bring creativity and functionality into your spaces.<br />
                <b>Modular Kitchen:</b> Experience the convenience and style of modular kitchens designed for modern living.<br /><br />

              </p>
              <p className={`text-md font-semibold text-xl`}>
                <b> Connecting You to Professionals</b>
              </p>
              <p className={`text-md text-justify`}>
                MaterialBuy serves as a unique bridge, connecting clients with experienced professionals.
                If you're seeking expert guidance for your projects, our platform is a space where your vision meets the skills of dedicated professionals.
                We take pride in fostering collaborations that result in exceptional outcomes.<br /><br />
              </p>
              <p className={`text-md font-semibold text-xl`}>
                <b>Our vision</b>
              </p>
              <p className={`text-md text-justify`}>
                At the core of MaterialBuy is a vision to streamline and elevate the experience of creating spaces.
                We believe in providing a one-stop destination where you can find inspiration, source premium products,
                and connect with professionals who share your passion for excellence.<br /><br />


              </p>
              <p className={`text-md font-semibold text-xl`}>
                <b>Why Choose MaterialBuy:</b>
              </p>
              <p className={`text-md text-justify`}>
                <b>Quality Assurance:</b> Every product on MaterialBuy undergoes stringent quality checks to ensure durability and performance.<br />
                <b>Innovation:</b> Stay ahead of trends with our innovative solutions for modern living and design.<br />
                <b>Professional Network:</b> Access a network of skilled professionals who can turn your vision into reality.<br />

                <b>Join Us in Crafting Excellence:</b>
                Whether you're embarking on a new project or enhancing an existing space, MaterialBuy is here to support your journey. Explore our platform, discover the best in the industry, and join us in crafting spaces that exude excellence.

                Welcome to MaterialBuy - where every space is a masterpiece in the making.<br /><br />




              </p>
            </div>
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default About;
