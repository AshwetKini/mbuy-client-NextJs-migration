import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Styles from "./Login.module.css";
import Logo from "../assests/logo.png";
import { toast } from "react-toastify";
import { forgotPassword } from "../apis/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [phoneno, setPhoneno] = useState("");
  const [newpassword, setNewpassword] = useState("")
  const [verifypasssword, setVerifyPassword] = useState("")
  const [otp, setOtp] = useState("");
  const [passwordmatchtext, setPasswordmatchtext] = useState("")
  const [otpsent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (newpassword === verifypasssword) {
      setPasswordmatchtext("password matched")
      console.log("password matched")
    }
    else {
      console.log("password not matched")
      setPasswordmatchtext("password not matched")
    }
  }, [newpassword, verifypasssword])

  const loginFormHandler = async (e) => {
    e.preventDefault();
    if (phoneno.length < 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    if (newpassword) {
      if (newpassword !== verifypasssword) {
        toast.error("Passwords do not match");
        return;
      } else if (
        newpassword.length < 6
      ) {
        toast.error("Password must be atleast 6 characters")
        return;
      }
    }
    setLoading(true);
    try {
      const response = await forgotPassword({ phoneno, otp, newpassword });
      console.log({ response });
      console.log(response.status);
      console.log(response.message);
      if (response.status === 200 && response.message === "OTP sent for phone number verification") {
        toast.success("OTP sent for Phone number verification");
        setOtpSent(true);
      }
      else if (response.status === 200 && response.message === "Password reset successfully") {
        toast.success("Password reset successfully");
        setOtpSent(false);
        setPhoneno("");
        setOtp("");
        setNewpassword("");
        setVerifyPassword("");
        navigate("/login");
      }

      else if (response.response.status === 400) {
        toast.error(response.response.data.message);
      } else {
        // const error = response?.response?.data ?? response.message;
        // toast.error(error);
        console.log(response.message);
      }
    } catch (error) {
      console.log({ error });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={`min-h-screen grid grid-cols-10`}>
        <div
          className={`min-h-screen flex flex-col items-center justify-center col-span-10 md:col-span-3`}
        >
          <div className={`m-3 md:m-10 text-white`}>
            <img src={Logo} alt="logo" className={`w-2/3 sm:w-1/2`} />
            <h1 className={`text-2xl font-semibold mt-4`}>Forgot Password?</h1>
            <p>We will send an OTP on your Phone Number to verify its you.</p>
            <form className={`flex flex-col mt-4`} onSubmit={loginFormHandler}>
              <label htmlFor="" className={`text-sm`}>
                Phone Number
              </label>
              <input
                type="phoneno"
                value={phoneno}
                className={`${Styles.loginInput} rounded text-sm`}
                onChange={(e) => setPhoneno(e.target.value)}
                required
              />
              {otpsent && (
                <>
                  <label htmlFor="" className={`text-sm mt-2`}>
                    OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    className={`${Styles.loginInput} rounded text-sm`}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <label htmlFor="" className={`text-sm mt-2`}>
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newpassword}
                    className={`${Styles.loginInput} rounded text-sm`}
                    onChange={(e) => setNewpassword(e.target.value)}
                    required
                  />
                  <label htmlFor="" className={`text-sm mt-2`}>
                    Verify Password
                  </label>
                  <input
                    type="password"
                    value={verifypasssword}
                    className={`${Styles.loginInput} rounded text-sm`}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    required
                  />
                  <p className={passwordmatchtext === 'password matched' ? 'text-green-500' : 'text-red-500'}>
                    {passwordmatchtext}
                  </p>
                </>
              )}

              <button
                disabled={loading}
                className={`bg-slate-500 mt-4 rounded ${Styles.loginButton}`}
                type="submit"
              >
                {otpsent ? "Change Password" : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
        <div
          className={`col-span-0 md:col-span-7 bg-slate-300 ${Styles.mainimg}`}
        >
          <img
            src="https://images.pexels.com/photos/4170184/pexels-photo-4170184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className={`w-full h-full object-cover`}
          />
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
