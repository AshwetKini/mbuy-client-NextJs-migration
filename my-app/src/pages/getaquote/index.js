import React, { useState, useEffect } from "react";
import Styles from "./Getquote.module.css";
import Fullcontainer from "../../components/UI/Fullcontainer";
import Container from "../../components/UI/Container";
import Layout from "../../Layouts/Layout";
import MainSide from "../../components/UI/MainSide";
import Button from "../../components/UI/Button";
import { postQuote } from "../../apis/api";
import { toast } from "react-toastify";
import { UploadFile } from "../../apis/api";
// import { useNavigate } from "react-router-dom";
import getside from "../../../public/getaquoteside.jpg";
import Head from "next/head";
import { useRouter } from "next/navigation";

const Getquote = () => {
  const [image, setImage] = React.useState(null);
  const navigate = useRouter();
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    phoneno: "",
    description: "",
    img: "",
  });


  useEffect(() => {
    const getUser=()=>{
      const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      setUserData({
        ...userData,
        name: user.username,
        email: user.email,
        phoneno: user.phoneno,
      });
    }
    }
    getUser();
  }, []);

  const formhandler = (e) => {
    e.preventDefault();
    const postQuoteData = async () => {
      const response = await postQuote(userData);
      if (response.status === 200) {
        toast.success("Quotation sent successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (response.status === 500) {
        toast.error("Something went wrong");
      }
      else {
        console.log(response);
      }
    };
    postQuoteData();
  };

  const inputChangeHandler = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };


  return (
    <Layout>
      <Head>
        <title>Get the best quotation from Material Buy</title>
        <meta
          name="description"
          content="Request a quote at Materialbuy.com for your construction or home improvement needs. Get competitive pricing and expert support for your next project."
        />
      </Head>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <MainSide image={getside} />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <h1 className="text-3xl font-semibold" style={{ color: "#102c44" }}>
              Get a quotation
            </h1>
            <p className="text-slate-500">Get a quotation for your materials</p>
            {userData ? (
              <form
                action=""
                className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
                onSubmit={formhandler}
              >
                <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                    onChange={(e) => inputChangeHandler("name", e.target.value)}
                  />
                </div>
                <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                  <label htmlFor="">Email Address</label>
                  <input
                    type="email"
                    value={userData.email}
                    className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                    onChange={(e) => inputChangeHandler("email", e.target.value)}
                  />
                </div>
                <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                  <label htmlFor="">Phone no.</label>
                  <input
                    type="number"
                    value={userData.phoneno}
                    className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                    required
                    onChange={(e) =>
                      inputChangeHandler("phoneno", e.target.value)
                    }
                  />
                </div>
                <div className={`flex flex-col col-span-2 mt-3`}>
                  <label htmlFor="">Description</label>
                  <textarea
                    rows="2"
                    type="text"
                    value={userData.description}
                    required
                    className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                    onChange={(e) =>
                      inputChangeHandler("description", e.target.value)
                    }
                  />
                </div>
                <div className={`flex flex-col col-span-2 mt-3`}>
                  <label htmlFor="">
                    Upload Image of the product required
                  </label>
                  <label
                    htmlFor="file-upload"
                    className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                  >
                    <div className="space-y-1 text-center">
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
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10 mb

                      </p>
                    </div>
                  </label>
                </div>
                <Button
                  value="Submit"
                  className={`w-max ${Styles.button}`}
                  type="submit"
                />
              </form>) : (
              <h1 className={`m-3 text-center text-2xl mt-10`}>To apply for Quotation, please <a href="/login" style={{ color: 'blue' }}>login</a> and fill the form!</h1>

            )}

            {/* <form
              action=""
              className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
              onSubmit={formhandler}
            >
              <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                  disabled
                />
              </div>
              <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                <label htmlFor="">Email Address</label>
                <input
                  type="email"
                  value={userData.email}
                  className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                  disabled
                />
              </div>
              <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                <label htmlFor="">Phone no.</label>
                <input
                  type="number"
                  value={userData.phoneno}
                  className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                  required
                  onChange={(e) =>
                    inputChangeHandler("phoneno", e.target.value)
                  }
                  disabled
                />
              </div>
              <div className={`flex flex-col col-span-2 mt-3`}>
                <label htmlFor="">Description</label>
                <textarea
                  rows="2"
                  type="text"
                  value={userData.description}
                  required
                  className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                  onChange={(e) =>
                    inputChangeHandler("description", e.target.value)
                  }
                />
              </div>
              <div className={`flex flex-col col-span-2 mt-3`}>
                <label htmlFor="">Upload Image of the product required</label>
                <label
                  htmlFor="file-upload"
                  className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                >
                  <div className="space-y-1 text-center">
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
                            data.append("file", e.target.files[0])
                            const postfile = async (data) =>{
                              const response = await UploadFile(data)
                              if(response.status === 200){
                                setUserData({...userData, img: response.data})
                              }
                            }
                            postfile(data)
                            setImage(e.target.files[0]);
                          }}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </label>
              </div>
              <Button
                value="Submit"
                className={`w-max ${Styles.button}`}
                type="submit"
              />
            </form> */}
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
};

export default Getquote;
