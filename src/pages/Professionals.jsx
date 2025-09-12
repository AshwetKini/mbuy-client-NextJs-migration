import React from "react";
import Styles from "./Professional.module.css";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import Layout from "../components/Layout/Layout";
import MainSide from "../components/UI/MainSide";
import { Link } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";
import Profside from "../assests/professionalside.jpg"
import { Helmet } from "react-helmet";

const Professionals = (props) => {
  return (
    <Layout>
      <Helmet>
        <title>Find professionals at Material Buy</title>
        <meta
          name="description"
          content="Find experienced professionals at Materialbuy.com, delivering expert services to support your construction, design, and project needs with quality and reliability."
        />
      </Helmet>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <MainSide image={Profside} />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1 className="text-3xl font-semibold" style={{ color: "#102c44" }}>
              Professionals
            </h1>
            <div className={`grid grid-cols-2 gap-2 mt-3`}>
              {props.allProfessionals ? (
                props.allProfessionals.map((item) => (
                  <Link
                    to={`/allprofessionals/${item.catprof}`}
                    className={`col-span-2 drop-shadow md:col-span-1 p-4 bg-slate-100 cursor-pointer ${Styles.career_card}`}
                    key={item._id}
                  >
                    <div className={`flex items-center`}>
                      <HiAcademicCap className={`${Styles.icon}`} />
                      <h2
                        className={`text-xl font-semibold ${Styles.professionalTitle}`}
                      >
                        {item.catprof} 
                      </h2>
                    </div>
                    {/* <div
                      className={`mt-1 text-sm break-words  py-1`}
                      dangerouslySetInnerHTML={{ __html: item.descr }}
                    /> */}
                  </Link>
                ))
              ) : (
                <>
                  <div
                    role="status"
                    className="flex h-full items-center justify-center col-span-2"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                    <h1>Loading...</h1>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default Professionals;
