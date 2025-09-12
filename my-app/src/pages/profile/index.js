"use client"
import React from "react"; 
import { useState, useEffect } from "react";
import Styles from "./Profile.module.css";
import Fullcontainer from "../../components/UI/Fullcontainer";
import Container from "../../components/UI/Container";
import Layout from "../../Layouts/Layout";
import Button from "../../components/UI/Button";
import { updateUser } from "../../apis/api";
import { useDispatch } from "react-redux";
import { editUser } from "../../store/Slices/userSlice";
import UserDetailsSideTable from "../../components/UI/UserDetailsSideTable";
// import { type } from "@testing-library/user-event/dist/type";
import { toast } from "react-toastify";


const userProfile = {
  role: "",
  username: "",
  fullname: "",
  email: "",
  phoneno: "",
  orgname: "",
  // shippingpincode: "",
  // shippingaddress: "",
  // billingaddress: "",
  gst: '',
  pan: '',
};

const Profile = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(userProfile);
  const [buttonvalue, setButtonValue] = useState("Save");
  // const user = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState(null);
  const [phonevalid, setPhoneValid] = useState(null)
  const [gstvalid, setGstValid] = useState(null);
  const [panvalid, setPanValid] = useState(null);
  const [validform, setValidForm] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {

    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      setUserLoggedIn({
        ...userLoggedIn,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phoneno: user.phoneno,
        gst: user.gst,
        pan: user.pan,
        role: user.role,
        orgname: user.orgname,
        _id: user._id,
      });
      setUserRole(user.role);
      if (user.phoneno?.length === 10) {
        setPhoneValid(true)
      }
      if (user.gst?.length === 15) {
        setGstValid(true)
      }
      if (user.pan?.length === 10) {
        setPanValid(true)
      }
    }
  }, []);

  const inputChangeHandler = (key, value) => {
    setUserLoggedIn({
      ...userLoggedIn,
      [key]: value,
    });
    setButtonValue("Save");
  };



  // const billingaddresshandler = () => {};

  const formhandler = (e) => {
    e.preventDefault();
    // console.log(userLoggedIn)
    let user = JSON.parse(localStorage.getItem("user"));
    const updateUserProfile = async (id) => {
      const response = await updateUser(id, userLoggedIn);
      if (response.status === 200) {
        dispatch(editUser(userLoggedIn));
        console.log(response);
        setButtonValue("Saved");
      } else if ((response.message = "Network Error")) {
        setButtonValue("Not Saved");
      }
    };
    console.log(validform)
    if (validform === false) {
      toast.error("Please fill the details correctly")
    } else {
      updateUserProfile(user._id);
    }
  };

  useEffect(() => {
    if (phonevalid === true && gstvalid === true && panvalid === true) {
      console.log("validform true")
      setValidForm(true)
    } else {
      setValidForm(false)
    }
    if (userRole !== "Coporate" && phonevalid === true) {
      setValidForm(true)
      console.log("setform valid")
    }

  }, [phonevalid, gstvalid, panvalid])

  const validatethephone = (data) => {
    if (data.length > 0 && data.length < 10) {
      setPhoneValid(false)
      console.log("invalid phone")
    }
    else if (data.length === 10) {
      setPhoneValid(true)
      console.log("valid phone")
    } else {
      setPhoneValid(false)
    }
  }

  const validatethegst = (data) => {
    let regex = new RegExp(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    );

    console.log(data)
    if (data == null) {
      setGstValid(false)
      console.log("invalid gst")
    }

    if (regex.test(data) == true && data.length === 15) {
      console.log(regex.test(data))
      setGstValid(true)
      console.log("valid gst")
    }
    else if (data.length > 0 && data.length < 15) {
      setGstValid(false)
      console.log("invalid gst test")
    } else {
      setGstValid(false)
    }
  }

  const validatethepan = (data) => {
    let regex = new RegExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/);

    if (data == null) {
      setPanValid(false)
      console.log("invalid pan number")
    }

    if (regex.test(data) == true) {
      setPanValid(true)
      console.log("valid pan number")
    }
    else if (data.length > 0 && data.length < 10) {
      setPanValid(false)
      console.log("invalid pan number")
    } else {
      setPanValid(false)
    }

  }

  return (
    <React.Fragment>
      <Layout>
        <Fullcontainer className={Styles.fullcontainer}>
          <Container className={`${Styles.container}`}>
            <div className="md:grid md:grid-cols-8 gap-4">
              <div className="md:col-span-2 hidden md:block">
                <UserDetailsSideTable />
              </div>
              <div className="md:col-span-6">
                <h1
                  className="text-3xl font-semibold"
                  style={{ color: "#102c44" }}
                >
                  Profile Details
                </h1>
                <p className="text-slate-500">
                  Update your profile information.
                </p>
                <form
                  action=""
                  className={`${Styles.formContainer} mt-3 grid grid-cols-2 gap-4 shadow-lg`}
                  onSubmit={formhandler}
                >
                  <div
                    className={`flex flex-col w-full col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">
                      {userRole === "Customer"
                        ? "User Name*"
                        : "Contact Person Name"}
                    </label>
                    <input
                      type="text"
                      value={userLoggedIn.username}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      required
                      disabled
                    />
                  </div>
                  <div
                    className={`flex flex-col w-full col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Full Name*</label>
                    <input
                      type="text"
                      value={userLoggedIn.fullname}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      onChange={(e) =>
                        inputChangeHandler("fullname", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div
                    className={`flex flex-col w-full  col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Email address*</label>
                    <input
                      type="email"
                      value={userLoggedIn.email}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      required
                      disabled
                    />
                  </div>
                  <div
                    className={`flex flex-col w-full  col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Phone Number*</label>
                    <input
                      type="number"
                      value={userLoggedIn.phoneno}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                      onChange={(e) =>
                        inputChangeHandler("phoneno", e.target.value)
                      }
                      onBlur={() => validatethephone(userLoggedIn.phoneno)}
                    />
                    {phonevalid === false ? (
                      <h1 className="text-sm text-red-500">
                        Invalid Phone Number
                      </h1>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`flex flex-col w-full col-span-2 md:col-span-1 mt-3`}
                  >
                    {userRole !== "Customer" ? (
                      <>
                        <label htmlFor="">GST Number*</label>
                        <input
                          type="text"
                          value={userLoggedIn.gst}
                          className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary uppercase`}
                          onChange={(e) =>
                            inputChangeHandler("gst", e.target.value)
                          }
                          onBlur={() => validatethegst(userLoggedIn.gst)}
                          required
                        />
                      </>
                    ) : (
                      <>
                        <label htmlFor="">GST Number</label>
                        <input
                          type="text"
                          value={userLoggedIn.gst}
                          className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary uppercase`}
                          onChange={(e) =>
                            inputChangeHandler("gst", e.target.value)
                          }
                          onBlur={() => validatethegst(userLoggedIn.gst)}
                        />
                      </>
                    )}
                    {gstvalid === false ? (
                      <h1 className="text-sm text-red-500">
                        Invalid Gst Number
                      </h1>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`flex flex-col w-full  col-span-2 md:col-span-1 mt-3`}
                  >
                    <label htmlFor="">Pan Number</label>
                    <input
                      type="text"
                      value={userLoggedIn.pan}
                      className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary uppercase`}
                      onChange={(e) =>
                        inputChangeHandler("pan", e.target.value)
                      }
                      onBlur={() => validatethepan(userLoggedIn.pan)}
                    />
                    {panvalid === false ? (
                      <h1 className="text-sm text-red-500">
                        Invalid Pan Number
                      </h1>
                    ) : (
                      ""
                    )}
                  </div>
                  {userLoggedIn.role === "Corporate" ? (
                    <div
                      className={`flex flex-col w-full  col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Organization Name</label>
                      <input
                        type="text"
                        value={userLoggedIn.orgname}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary uppercase`}
                        onChange={(e) =>
                          inputChangeHandler("orgname", e.target.value)
                        }
                      // onBlur={() => validatethepan(userLoggedIn.pan)}
                      />
                    </div>
                  ) : (
                    <br />
                  )}
                  <div className="align-middle justify-end flex  ">
                  <Button
                    value={buttonvalue}
                    className={` w-max ${Styles.button}`}
                    type="Submit"
                  />
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </Fullcontainer>
      </Layout>
    </React.Fragment>
  );
};

export default Profile;
