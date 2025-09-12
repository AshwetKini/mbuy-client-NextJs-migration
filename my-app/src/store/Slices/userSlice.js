"use client";
import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../apis/api";
import { toast } from "react-toastify";


const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

// Utility to safely access localStorage
const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

const user = getLocalStorage("user");

const initialState = user ? user : null;


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUser: (state, action) => {
      const newUser = action.payload;
      if (!state) {
        setLocalStorage("user", newUser);
        toast.success("Logged In Successfully");
        return newUser;
      } else {
        const userUpdate = {
          ...state,
          phoneno: newUser.phoneno,
          shippingpincode1: newUser.shippingpincode1,
          shippingaddress1: newUser.shippingaddress1,
          billingaddress1: newUser.billingaddress1,
          gst: newUser.gst,
          pan: newUser.pan,
        };
        setLocalStorage("user", userUpdate);
        toast.success("Profile Updated Successfully");
        return userUpdate; // Ensure the new state is returned
      }
    },
    getUserState: (state, action) => {
      const userid = action.payload;
      console.log(userid);

      const fetchUserState = async () => {
        try {
          const user = await getUser(userid);
          console.log(user, "user from reducer");
          setLocalStorage("user", user);
          return user;
        } catch (error) {
          console.error("Error fetching user:", error);
          toast.error("Failed to fetch user");
        }
      };

      fetchUserState(); // Call the async function
      return state; // Maintain the current state until user is fetched
    },
    logoutUserState: () => {
      removeLocalStorage("user");
      toast.success("Logged Out Successfully");
      return null; // Reset the state to null
    },
  },
});

export const { editUser, getUserState, logoutUserState } = userSlice.actions;

export default userSlice.reducer;
