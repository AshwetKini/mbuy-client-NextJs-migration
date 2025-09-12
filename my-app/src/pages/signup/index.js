"use client"
import React, { useState, useEffect } from "react";
import Logo from "../../../public/logo2.png";
import Styles from "./Signup.module.css";
import { postUserRegister } from "../../apis/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginphoto from "../../../public/loginphoto.jpg"
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCorporateQuery = searchParams.get("corporate") === "true";

  const [signupState, setSignupState] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    phoneno: "",
    otp: "",
    gst: "",
    orgname: "",
    beCorporate: isCorporateQuery,
    terms: false,
  });

  // A single state for all validation errors
  const [errors, setErrors] = useState({});
  // State to manage the submission process
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to toggle the OTP input field
  const [showOtp, setShowOtp] = useState(false);
  // State to manage the corporate checkbox
  const [signupAsCop, setSignupAsCop] = useState(isCorporateQuery);


  // Sync checkbox state with URL parameter on load
  useEffect(() => {
    setSignupAsCop(isCorporateQuery);
    setSignupState(prev => ({ ...prev, beCorporate: isCorporateQuery }));
  }, [isCorporateQuery]);

  // Handler for all input changes
  const inputChangeHandler = (key, value) => {
    setSignupState(prev => ({ ...prev, [key]: value }));
    // Clear the error for a field when the user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };

  // Handler for the corporate checkbox
  const handleCorporateToggle = (isChecked) => {
    setSignupAsCop(isChecked);
    setSignupState(prev => ({ ...prev, beCorporate: isChecked }));
    // Clear corporate-related errors when toggled
    if (errors.gst || errors.orgname) {
      setErrors(prev => ({ ...prev, gst: null, orgname: null }));
    }
  };

  // --- FORM VALIDATION LOGIC ---
  const validateForm = () => {
    const newErrors = {};
    const { username, fullname, email, password, phoneno, otp, gst, orgname, terms } = signupState;

    if (!showOtp) { // Initial validation before OTP is sent
      if (!username.trim()) newErrors.username = "Username is required.";
      if (!fullname.trim()) newErrors.fullname = "Full name is required.";
      if (!email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (!password) {
        newErrors.password = "Password is required.";
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long.";
      }
      if (!terms) {
        newErrors.terms = "Please accept the terms and conditions.";
      }
      if (!phoneno.trim()) {
        newErrors.phoneno = "Phone number is required.";
      } else if (!/^\d{10}$/.test(phoneno)) {
        newErrors.phoneno = "Phone number must be 10 digits.";
      }
      if (signupAsCop) {
        if (!orgname.trim()) newErrors.orgname = "Organization name is required.";
        if (!gst.trim()) {
          newErrors.gst = "GST number is required.";
        } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst)) {
          newErrors.gst = "Please enter a valid 15-digit GST number.";
        }
      }
    } else { // Validation when OTP field is visible
      if (!otp.trim()) {
        newErrors.otp = "OTP is required.";
      } else if (!/^\d{6}$/.test(otp)) { // Assuming 6-digit OTP
        newErrors.otp = "OTP must be 6 digits.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear previous server-side errors

    try {
      const response = await postUserRegister(signupState);

      if (response.status === 200 && response.message === "OTP sent for Phone number verification") {
        toast.success("OTP sent successfully! Please check your phone.");
        setShowOtp(true);
      } else if (response.status === 200 && response.data?.authtoken) {
        toast.success("Signup successful!");
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("authToken", response.data.authtoken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/login");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.errors || error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      // Set specific field errors based on server response
      if (errorMessage.toLowerCase().includes("username")) setErrors({ username: "This username is already taken." });
      if (errorMessage.toLowerCase().includes("email")) setErrors({ email: "This email is already registered." });
      if (errorMessage.toLowerCase().includes("phone")) setErrors({ phoneno: "This phone number is already in use." });
      if (errorMessage.toLowerCase().includes("otp")) setErrors({ otp: "Invalid OTP. Please try again." });

    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return "Processing...";
    if (showOtp) return "Verify OTP & Sign Up";
    return "Sign Up";
  };

  return (
    <>
      <ToastContainer className="toastContainer" />
      <div className={`min-h-screen grid grid-cols-10`}>
        <div className={`min-h-screen flex flex-col items-center justify-center col-span-10 lg:col-span-3`}>
          <div className={`m-3 p-6 md:m-10 text-white rounded-lg`} style={{backgroundColor: '#1d2c44e0'}}>
            <Image src={Logo} alt="logo" className={`w-2/3 sm:w-1/2`} />
            <h1 className={`text-2xl font-semibold mt-4`}>Register for an account</h1>
            <form className={`flex flex-col mt-4`} onSubmit={handleSignup} noValidate>
              <label htmlFor="username" className={`text-sm`}>Username</label>
              <input type="text" id="username" value={signupState.username} placeholder="e.g. Kevin1997" className={`${Styles.signupInput} ${errors.username ? 'border-red-500' : ''}`} onChange={(e) => inputChangeHandler("username", e.target.value)} />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}

              <label htmlFor="fullname" className={`mt-2 text-sm`}>Full Name / Contact Person</label>
              <input type="text" id="fullname" value={signupState.fullname} placeholder="e.g. Kevin Peterson" className={`${Styles.signupInput} ${errors.fullname ? 'border-red-500' : ''}`} onChange={(e) => inputChangeHandler("fullname", e.target.value)} />
              {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}

              <label htmlFor="email" className={`text-sm mt-2`}>Email</label>
              <input type="email" id="email" value={signupState.email} className={`${Styles.signupInput} ${errors.email ? 'border-red-500' : ''}`} onChange={(e) => inputChangeHandler("email", e.target.value)} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

              <label htmlFor="password" className={`mt-2 text-sm`}>Password</label>
              <input type="password" id="password" value={signupState.password} className={`${Styles.signupInput} ${errors.password ? 'border-red-500' : ''} tracking-widest`} onChange={(e) => inputChangeHandler("password", e.target.value)} />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

              {signupAsCop && (
                <>
                  <label htmlFor="orgname" className={`mt-2 text-sm`}>Organization Name</label>
                  <input type="text" id="orgname" value={signupState.orgname} className={`${Styles.signupInput} ${errors.orgname ? 'border-red-500' : ''}`} onChange={(e) => inputChangeHandler("orgname", e.target.value)} />
                  {errors.orgname && <p className="text-red-500 text-sm mt-1">{errors.orgname}</p>}

                  <label htmlFor="gst" className={`mt-2 text-sm`}>GST No.</label>
                  <input type="text" id="gst" value={signupState.gst} className={`${Styles.signupInput} ${errors.gst ? 'border-red-500' : ''}`} onChange={(e) => inputChangeHandler("gst", e.target.value.toUpperCase())} />
                  {errors.gst && <p className="text-red-500 text-sm mt-1">{errors.gst}</p>}
                </>
              )}

              <label htmlFor="phoneno" className={`mt-2 text-sm`}>Phone Number</label>
              <input type="tel" id="phoneno" value={signupState.phoneno} className={`${Styles.signupInput} ${errors.phoneno ? 'border-red-500' : ''}`} onChange={(e) => inputChangeHandler("phoneno", e.target.value)} />
              {errors.phoneno && <p className="text-red-500 text-sm mt-1">{errors.phoneno}</p>}

              {showOtp && (
                <>
                  <label htmlFor="otp" className={`mt-2 text-sm`}>OTP</label>
                  <input type="text" id="otp" value={signupState.otp} className={`${Styles.signupInput} ${errors.otp ? 'border-red-500' : ''}`} onChange={(e) => inputChangeHandler("otp", e.target.value)} />
                  {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
                </>
              )}

              <div className="flex items-center w-full justify-end mt-3">
                <input type="checkbox" id="corporate-check" checked={signupAsCop} onChange={(e) => handleCorporateToggle(e.target.checked)} />
                <label htmlFor="corporate-check" className="ml-2 text-sm cursor-pointer">Signup as corporate</label>
              </div>
              <div className="flex items-center w-full justify-end mt-3">
                <input type="checkbox" id="terms" checked={signupState.terms} onChange={(e) => inputChangeHandler("terms", e.target.checked)} />
                <label htmlFor="terms" className="ml-2 text-sm cursor-pointer">I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-500">Terms and Conditions</a></label>
                {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
              </div>

              <button className={`bg-slate-500 mt-4 rounded ${Styles.signupButton}`} type="submit" disabled={isSubmitting}>
                {getButtonText()}
              </button>
            </form>
            <span className="text-sm cursor-pointer underline mt-4 inline-block hover:text-gray-300" onClick={() => router.push("/login")}>
              Already have an account? Sign in here.
            </span>
          </div>
        </div>
        <div className={`hidden lg:block col-span-7 bg-slate-300 ${Styles.mainimg}`}>
          <Image src={loginphoto} alt="Construction site background" className={`w-full h-full object-cover`} priority />
        </div>
      </div>
    </>
  );
};

export default Signup;