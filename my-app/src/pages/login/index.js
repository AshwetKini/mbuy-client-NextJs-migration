'use client'
import React, { useState } from "react";
import Logo2 from "../../../public/logo2.png";
import { postUserLogin } from "../../apis/api";
import { useRouter } from "next/router"; // Correct import for Next.js App Router
import { useDispatch } from "react-redux";
import { editUser } from "../../store/Slices/userSlice";
import { editcartbyuserid, getcartbydb } from "../../store/Slices/cartSlice";
import { getCart } from "../../apis/api";
import loginphoto from "../../../public/loginphoto.jpg"
import { toast } from "react-toastify";
import Image from "next/image";
import Styles from "./Login.module.css"

const Login = () => {
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
    phoneno: "",
    otp: "",
  });

  // A single state for all validation errors
  const [errors, setErrors] = useState({});
  // State for the submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to toggle between login methods
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  // State to track if OTP has been sent
  const [otpSent, setOtpSent] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // Unified input handler
  const inputChangeHandler = (key, value) => {
    setLoginState(prev => ({ ...prev, [key]: value }));
    // Clear error for the field when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };
  
  // --- FORM VALIDATION LOGIC ---
  const validateForm = () => {
    const newErrors = {};

    if (isPhoneLogin) {
      // Phone / OTP validation
      if (!loginState.phoneno.trim()) {
        newErrors.phoneno = "Phone number is required.";
      } else if (!/^\d{10}$/.test(loginState.phoneno)) {
        newErrors.phoneno = "Phone number must be 10 digits.";
      }

      if (otpSent) { // Only validate OTP if it's supposed to be entered
        if (!loginState.otp.trim()) {
          newErrors.otp = "OTP is required.";
        } else if (!/^\d{6}$/.test(loginState.otp)) { // Assuming 6-digit OTP
          newErrors.otp = "OTP must be 6 digits.";
        }
      }
    } else {
      // Username / Password validation
      if (!loginState.username.trim()) newErrors.username = "Username is required.";
      if (!loginState.password) {
        newErrors.password = "Password is required.";
      } else if (loginState.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear old server errors

    try {
      const response = await postUserLogin(loginState);

      if (response?.status === 200 && response?.message === "OTP sent for Phone number verification") {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      } else if (response?.status === 200 && response?.data?.authtoken) {
        toast.success("Login successful!");
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("authToken", response.data.authtoken);
        dispatch(editUser(response.data.user));

        // Fetch user's cart from DB
        const cartResponse = await getCart(response.data.user._id);
        if (cartResponse.status === 200) {
          delete cartResponse.data._id;
          delete cartResponse.data.__v;
          dispatch(getcartbydb(cartResponse.data));
        }
        dispatch(editcartbyuserid(response.data.user._id));
        
        router.replace("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      // Display specific errors next to fields if applicable
      if (errorMessage.toLowerCase().includes("username")) {
        setErrors({ username: "Invalid username." });
      } else if (errorMessage.toLowerCase().includes("password")) {
        setErrors({ password: "Invalid password." });
      } else if (errorMessage.toLowerCase().includes("otp")) {
        setErrors({ otp: "Invalid OTP." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Determine button text based on current state
  const getButtonText = () => {
    if(isSubmitting) return "Processing...";
    if(isPhoneLogin) return otpSent ? "Verify OTP & Login" : "Send OTP";
    return "Sign In";
  };

  const toggleLoginMethod = () => {
    setIsPhoneLogin(!isPhoneLogin);
    setErrors({});
    setOtpSent(false);
    // Reset fields to avoid carrying over state
    setLoginState({ username: "", password: "", phoneno: "", otp: "" });
  };

  return (
    <>
      <div className={`min-h-screen grid grid-cols-10`}>
        <div className={`min-h-screen flex flex-col items-center justify-center col-span-10 md:col-span-3`}>
          <div className={`m-3 p-6 md:m-10 text-white rounded-lg`} style={{backgroundColor: '#1d2c44e0'}}>
            <Image src={Logo2} alt="logo" width={200} height={100} className={`w-2/3 sm:w-1/2`} />
            <h1 className={`text-2xl font-semibold mt-4`}>
              Sign in to your account
            </h1>

            <form className={`flex flex-col mt-4`} onSubmit={handleFormSubmit}>
              {isPhoneLogin ? (
                <>
                  <label htmlFor="phoneno" className={`text-sm mt-2`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneno"
                    value={loginState.phoneno}
                    className={`${Styles.loginInput} ${errors.phoneno ? 'border-red-500' : ''}`}
                    onChange={(e) => inputChangeHandler("phoneno", e.target.value)}
                  />
                  {errors.phoneno && <p className="text-red-500 text-sm mt-1">{errors.phoneno}</p>}
                  
                  {otpSent && (
                    <>
                      <label htmlFor="otp" className={`text-sm mt-4`}>
                        OTP
                      </label>
                      <input
                        type="text"
                        id="otp"
                        value={loginState.otp}
                        className={`${Styles.loginInput} ${errors.otp ? 'border-red-500' : ''}`}
                        onChange={(e) => inputChangeHandler("otp", e.target.value)}
                      />
                      {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
                    </>
                  )}
                </>
              ) : (
                <>
                  <label htmlFor="username" className={`text-sm`}>
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={loginState.username}
                    className={`${Styles.loginInput} ${errors.username ? 'border-red-500' : ''}`}
                    onChange={(e) => inputChangeHandler("username", e.target.value)}
                  />
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}

                  <label htmlFor="password" className={`mt-2 text-sm`}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={loginState.password}
                    className={`${Styles.loginInput} ${errors.password ? 'border-red-500' : ''} tracking-widest`}
                    onChange={(e) => inputChangeHandler("password", e.target.value)}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  
                  <p onClick={() => router.push("/forgotpassword")} className={`mt-2 text-sm underline cursor-pointer hover:text-gray-300`}>Forgot Password?</p>
                </>
              )}

              <button
                className={`bg-slate-500 mt-4 rounded ${Styles.loginButton}`}
                type="submit"
                disabled={isSubmitting}
              >
                {getButtonText()}
              </button>
            </form>

            <button
              type="button"
              onClick={toggleLoginMethod}
              className={`text-sm mt-4 underline cursor-pointer hover:text-gray-300 w-full text-left`}
            >
              {isPhoneLogin ? "Login with Username & Password" : "Login with Phone & OTP"}
            </button>
            <br />
            <span className="text-sm underline cursor-pointer hover:text-gray-300" onClick={() => router.push("/signup")}>
              Don't have an account? Register here.
            </span>
          </div>
        </div>
        <div className={`hidden md:block col-span-7 bg-slate-300 ${Styles.mainimg}`}>
          <Image
            src={loginphoto}
            alt="Construction site background"
            className={`w-full h-full object-cover`}
            priority
          />
        </div>
      </div>
    </>
  );
};

export default Login;