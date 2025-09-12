'use client'
import React, { useState, useEffect } from "react";
import Fullcontainer from "@/components/UI/Fullcontainer";
import Container from "@/components/UI/Container";
// import SideTable from "@/components/UI/SideTable";
import Styles from "./Career.module.css";
import { getCareers } from "@/apis/api";
import Layout from "@/Layouts/Layout";
import MainSide from "@/components/UI/MainSide";
// import Carimg from "../assests/Carimg.jpg"
import Careersideimg from "../../../public/Careersidebar.jpg"
import Image from "next/image";

const Career = () => {
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      let careers = await getCareers();
      const careerdata = careers.map((career) => ({
        title: career.title,
        description: career.description,
        key: career.id,
      }));
      setOpenings(careerdata);
    };
    fetchCareers();
  }, []);

  return (
    <Layout>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <MainSide image={Careersideimg} />
          </div>
          {/* <div className={`col-span-1 ${Styles.about_side}`}>
            <SideTable />
          </div> */}
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1>Be a part of our mission</h1>
            <p>
              We're looking for passionate people to join us on our mission. We
              value flat hierarchies, clear communication, and full
              ownership and responsibility.
            </p>
            <div className={`${Styles.hero}`}>
              <Image
                src="/Carimg.jpg"
                alt=""
                height={1000}
                width={1000}
              />
            </div>
            <div className={`grid grid-cols-2 gap-2 mt-3`}>
              {openings &&
                openings.map((opening) => (
                  <div
                    className={`col-span-2 drop-shadow md:col-span-1 p-4 bg-slate-100 cursor-pointer ${Styles.career_card}`}
                    key={opening.key}
                  >
                    <a
                      href={`mailto:support@materialbuy.com?subject=Application for ${opening.title}`}
                    >
                      <div className={`flex justify-between`}>
                        <div
                          className={`p-2 bg-slate-200 drop-shadow rounded text-sky-700`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                            ></path>
                          </svg>
                        </div>
                        <div className={`flex`}>
                          <p>Apply</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                          >
                            <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
                          </svg>
                        </div>
                      </div>

                      <h2 className={`mt-3 font-semibold text-xl`}>
                        {opening.title}
                      </h2>

                      <div
                        className={`mt-1 text-justify text-sm`}
                        dangerouslySetInnerHTML={{
                          __html: opening.description,
                        }}
                      />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default Career;
