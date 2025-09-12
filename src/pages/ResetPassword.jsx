import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../apis/api";
import Logo from "../assests/logo.png";
import Styles from "./Login.module.css";

const ResetPassword = () => {
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginFormHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (password.trim() === "") return;
    if (password.trim() !== confirmPassword.trim()) {
      setError("Password and Confirm password do not match");
      return;
    }
    setLoading(true);

    try {
      const response = await resetPassword({ userId, token, password });
      console.log({ response });
      if (response?.status === 200) {
        toast.success(response.data);
        navigate("/login");
      } else {
        const error = response?.response?.data ?? response.message;
        toast.error(error);
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
            <h1 className={`text-2xl font-semibold mt-4`}>Reset Password?</h1>
            <form className={`flex flex-col mt-4`} onSubmit={loginFormHandler}>
              <label htmlFor="" className={`text-sm`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                className={`${Styles.loginInput} rounded text-sm`}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="" className={`text-sm mt-4`}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                className={`${Styles.loginInput} rounded text-sm`}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error && <p className="text-red-500 mt-1">{error}</p>}

              <button
                disabled={loading}
                className={`bg-slate-500 mt-4 rounded ${Styles.loginButton}`}
                type="submit"
              >
                {loading ? "Resetting..." : "Reset Password"}
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
export default ResetPassword;
