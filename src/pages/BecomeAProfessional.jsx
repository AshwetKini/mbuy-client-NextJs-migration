import React, { useEffect } from "react";
import Styles from "./BecomeAProfessional.module.css";
import Fullcontainer from "../components/UI/Fullcontainer";
import Container from "../components/UI/Container";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button";
import MainSide from "../components/UI/MainSide";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "../apis/api";
import { postProfessional } from "../apis/api";
import { toast } from "react-toastify";
import profspace from "../assests/PROFESSIONALspace.jpg";
import prof2 from "../assests/PROFESSIONAL1.jpg";
import prof1 from "../assests/PROFESSIONAL2.jpg";
import { Helmet } from "react-helmet";


const BecomeAProfessional = (props) => {
  const [image, setImage] = React.useState(null);
  const [image1, setImage1] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [image3, setImage3] = React.useState(null);
  const navigation = useNavigate();
  // const [userLoggedIn, setUserLoggedIn] = React.useState(null);
  const [userData, setUserData] = React.useState({
    name: "",
    cat: "",
    phone: "",
    city: "",
    expr: "",
    email: "",
    img: "",
    img2: "",
    img3: "",
    img4: "",
  });

  const formhandler = async (e) => {
    e.preventDefault();
    console.log(userData);

    try {
      const response = await postProfessional(userData);

      if (response && response.status === 200) {
        toast.success("request sent successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // Check if there's a response and log it for debugging
        console.error("API response:", response);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error in formhandler:", error);
      toast.error("An error occurred while processing your request");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData({
        ...userData,
        name: user.username,
        email: user.email,
        phone: user.phoneno,
      });
    } else {
      // navigation("/login");
      setUserData(null);
    }
  }, []);

  const inputChangeHandler = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };
  return (
    <React.Fragment>
      <Layout>
        <Helmet>
          <title>Join Professional space of Material Buy</title>
          <meta
            name="description"
            content="Join Materialbuy.com's professional network to offer your expertise in construction, design, and related services. Expand your business with us and reach new clients."
          />
        </Helmet>
        <Fullcontainer className={Styles.fullcontainer}>
          <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
            <div className={`col-span-1 ${Styles.about_side}`}>
              <MainSide image={profspace} />
            </div>
            <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
              <h1
                className="text-3xl font-semibold"
                style={{ color: "#102c44" }}
              >
                Become a professional
              </h1>
              <p className="text-slate-500">
                Unlock New Heights in Your Profession: Join MaterialBuy.com for High-Value Clients and Lucrative Commercial Projects
              </p>
              <div className={`${Styles.hero}`}>
                <img
                  src={prof1}
                  alt=""
                />
              </div>
              {userData ? (
                <form
                  action=""
                  className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
                  onSubmit={formhandler}
                >
                  <div className={`flex flex-col col-span-2 mt-3`}>
                    <label htmlFor="">Profile Image</label>
                    <label
                      htmlFor="file-upload"
                      className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-5 overflow-hidden"
                    >
                      <div className="flex items-center text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative text-center w-full cursor-pointer rounded-md bg-white font-medium text-primary hover:text-gray-500">
                            <span className="hover:underline">
                              {image?.name || "Upload file"}
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={(e) => {
                                if (!e.target.files) return;
                                const data = new FormData();
                                data.append("name", e.target.files[0].name);
                                data.append("file", e.target.files[0]);
                                const postfile = async (data) => {
                                  const response = await UploadFile(data);
                                  if (response.status === 200) {
                                    setUserData({
                                      ...userData,
                                      img: response.data,
                                    });
                                  }
                                };
                                postfile(data);
                                setImage(e.target.files[0]);
                              }}
                              required
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 ml-2">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className={`flex flex-col col-span-2 mt-3`}>
                    <div className={`grid grid-cols-3 gap-2`}>
                      <div className={`flex flex-col col-span-3 md:col-span-1`}>
                        <label htmlFor="">Project Image 1</label>
                        <label
                          htmlFor="file-upload1"
                          className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-2 pb-2"
                        >
                          <div className="flex items-center text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label className="relative text-center w-full cursor-pointer rounded-md bg-white font-medium text-primary hover:text-gray-500">
                                <span className="hover:underline">
                                  {image1?.name || "Upload file"}
                                </span>
                                <input
                                  id="file-upload1"
                                  name="file-upload1"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => {
                                    if (!e.target.files) return;
                                    const data = new FormData();
                                    data.append("name", e.target.files[0].name);
                                    data.append("file", e.target.files[0]);
                                    const postfile = async (data) => {
                                      const response = await UploadFile(data);
                                      if (response.status === 200) {
                                        setUserData({
                                          ...userData,
                                          img2: response.data,
                                        });
                                      }
                                    };
                                    postfile(data);
                                    setImage1(e.target.files[0]);
                                  }}

                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 ml-2">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </label>
                      </div>
                      <div className={`flex flex-col col-span-3 md:col-span-1`}>
                        <label htmlFor="">Project Image 2</label>
                        <label
                          htmlFor="file-upload2"
                          className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-2 pb-2"
                        >
                          <div className="flex items-center text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label className="relative text-center w-full cursor-pointer rounded-md bg-white font-medium text-primary hover:text-gray-500">
                                <span className="hover:underline">
                                  {image2?.name || "Upload file"}
                                </span>
                                <input
                                  id="file-upload2"
                                  name="file-upload2"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => {
                                    if (!e.target.files) return;
                                    const data = new FormData();
                                    data.append("name", e.target.files[0].name);
                                    data.append("file", e.target.files[0]);
                                    const postfile = async (data) => {
                                      const response = await UploadFile(data);
                                      if (response.status === 200) {
                                        setUserData({
                                          ...userData,
                                          img3: response.data,
                                        });
                                      }
                                    };
                                    postfile(data);
                                    setImage2(e.target.files[0]);
                                  }}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 ml-2">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </label>
                      </div>
                      <div
                        className={`flex flex-col col-span-3 md:col-span-1 `}
                      >
                        <label htmlFor="">Project Image 3</label>
                        <label
                          htmlFor="file-upload3"
                          className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-2 pb-2"
                        >
                          <div className="flex items-center text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label className="relative text-center w-full cursor-pointer rounded-md bg-white font-medium text-primary hover:text-gray-500">
                                <span className="hover:underline">
                                  {image3?.name || "Upload file"}
                                </span>
                                <input
                                  id="file-upload3"
                                  name="file-upload3"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) => {
                                    if (!e.target.files) return;
                                    const data = new FormData();
                                    data.append("name", e.target.files[0].name);
                                    data.append("file", e.target.files[0]);
                                    const postfile = async (data) => {
                                      const response = await UploadFile(data);
                                      if (response.status === 200) {
                                        setUserData({
                                          ...userData,
                                          img4: response.data,
                                        });
                                      }
                                    };
                                    postfile(data);
                                    setImage3(e.target.files[0]);
                                  }}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500 ml-2">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      value={userData.name}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      disabled
                    />
                  </div>
                  <div
                    className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Email address</label>
                    <input
                      type="email"
                      value={userData.email}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      disabled
                    />
                  </div>
                  <div
                    className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Category</label>
                    <select
                      id="category"
                      required
                      name="category"
                      autoComplete="category-name"
                      onChange={(e) =>
                        inputChangeHandler("cat", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={""}>Select category</option>
                      {props.allProfessionals &&
                        props.allProfessionals.map((item, index) => (
                          <option key={index} value={item.catprof}>
                            {item.catprof}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div
                    className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="number"
                      value={userData.phone}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      onChange={(e) =>
                        inputChangeHandler("phoneno", e.target.value)
                      }
                      disabled
                    // { userData.phone ? disabled : ""}
                    />
                  </div>
                  {/* <div
                    className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Age</label>
                    <input
                      type="number"
                      value={userData.age}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      onChange={(e) =>
                        inputChangeHandler("age", e.target.value)
                      }
                    />
                  </div> */}
                  <div
                    className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Experience in years</label>
                    <input
                      type="number"
                      value={userData.expr}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      onChange={(e) =>
                        inputChangeHandler("expr", e.target.value)
                      }
                    />
                  </div>
                  <div
                    className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      value={userData.city}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      onChange={(e) =>
                        inputChangeHandler("city", e.target.value)
                      }
                    />
                  </div>
                  <div className={`flex flex-col col-span-2`}>
                    <Button
                      value="Submit"
                      className={`w-max ${Styles.button}`}

                      type="submit"
                    />
                  </div>
                </form>
              ) : (
                <h1 className={`m-3 text-center text-2xl mt-10 animate-pulse pt-3 pb-3 rounded-lg`} style={{ backgroundColor: '#102c44', color: 'white' }}><a href="/login">To join as a Professional, please  login  and fill the form!</a></h1>

              )}
              <p className={`text-md font-semibold text-xl`}>
                <b>Indroduction</b>
              </p>
              <p className={`text-md text-justify`}>
                In the ever-evolving landscape of our industry,
                professionals seek opportunities that not only align with their expertise but also o
                pen doors to high-ticket clients and promising commercial projects.
                If you're aiming to elevate your career to new heights,
                MaterialBuy.com invites you to join our community of professionals dedicated to excellence and success.<br /><br />
              </p>
              <h1 className={`m-3 text-center font-bold text-2xl mt-10`}>Join MaterialBuy.com for Exclusive Access to High-Value Clients and Lucrative Commercial Projects.</h1>
              <h1><b></b></h1><br /><br />
              <p className={`text-md font-semibold text-xl`}>
                <b>Scope of Joining MaterialBuy.com</b>
              </p>
              <p className={`text-md text-justify`}>
                MaterialBuy.com stands as a dynamic platform that transcends traditional boundaries,
                connecting professionals with unparalleled opportunities. By becoming a part of our
                community, you gain access to a vast network of potential clients actively seeking
                expertise for their high-value projects. Whether you specialize in architecture, construction,
                design, or any related field, our platform is designed to match your skills with clients
                in need, creating a win-win scenario for both parties.<br /><br />
              </p>
              <p className={`text-md font-semibold text-xl`}>
                <b>Why MaterialBuy.com?</b>
              </p>
              <h3><b>Exclusive Access to High-Ticket Clients:</b></h3>
              <p className={`text-md text-justify`}>
                Joining MaterialBuy.com opens doors to a stream of high-ticket clients who are actively seeking
                professionals like you. Our platform serves as a bridge between skilled individuals and those in
                need of top-notch services for their premium projects.<br /><br />
              </p>
              <h3><b>Diverse Range of Commercial Projects:</b></h3>
              <p className={`text-md text-justify`}>
                MaterialBuy.com caters to a diverse spectrum of commercial projects, providing professionals with
                opportunities to showcase their expertise across various industries. Whether it's a cutting-edge
                architectural design, construction project, or interior renovation, our platform hosts a multitude
                of projects awaiting your skillset.<br /><br />
              </p>
              <p className={`text-md font-semibold text-xl`}>
                <b>The Future with MaterialBuy.com</b>
              </p>
              <p className={`text-md text-justify`}>
                As the industry continues to evolve, MaterialBuy.com remains at the forefront of innovation,
                adapting to emerging trends and technologies. By joining us, you position yourself at the epicenter
                of future opportunities, gaining exposure to groundbreaking projects that can shape the trajectory of your career.<br /><br />
              </p>
              <p className={`text-md font-semibold text-xl`}>
                <b>The Profit of Joining MaterialBuy.com</b>
              </p>
              <h4><b>Increased Revenue Streams:</b></h4>
              <p className={`text-md text-justify`}>
                Our platform connects you with clients willing to invest in quality services. By securing projects through MaterialBuy.com,
                you not only enhance your portfolio but also experience a notable increase in your revenue streams.<br /><br />
              </p>
              <h4><b>Professional Growth and Recognition:</b></h4>

              <p className={`text-md text-justify`}>
                MaterialBuy.com is more than just a platform; it's a community that fosters professional growth and recognition.
                Showcase your expertise, build a reputable profile, and position yourself as a sought-after professional in your industry. <br /><br />
              </p>
              <div className={`${Styles.hero}`}>
                <img
                  src={prof2}
                  alt=""
                />
              </div>


            </div>
          </Container>
        </Fullcontainer>
      </Layout>
    </React.Fragment>
  );
};

export default BecomeAProfessional;
