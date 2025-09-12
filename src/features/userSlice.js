import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../apis/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? user : null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUser: (state, action) => {
      const newUser = action.payload;
      console.log(newUser,"newUser");
      if (state === null) {
        localStorage.setItem("user", JSON.stringify(newUser));
        toast.success("Logged In Successfully")
        return newUser;
      } else {
        const userupdate = {
          ...state,
          phoneno: newUser.phoneno,
          shippingpincode1: newUser.shippingpincode1,
          shippingaddress1: newUser.shippingaddress1,
          billingaddress1: newUser.billingaddress1,
          gst: newUser.gst,
          pan: newUser.pan,
        };
        localStorage.setItem("user", JSON.stringify(userupdate));
        toast.success("Profile Updated Successfully");
      }
    },
    getUserState: (state, action) => {
      const userid = action.payload;
      console.log(userid);
      const getUserState = async () => {
        const user = await getUser(userid);
        console.log(user, "user from reducer");
        return user;
      };
      state = getUserState(userid);
    },
    logoutUserState: (state, action) => {
      localStorage.removeItem("user");
      toast.success("Logged Out Successfully");
      return null;
    }
  },
});

export const { editUser, getUserState, logoutUserState } = userSlice.actions;

export default userSlice.reducer;
