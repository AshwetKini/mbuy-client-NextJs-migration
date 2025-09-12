import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { useEffect } from "react";
import { postCart } from "../apis/api";


const cartfromlocal = JSON.parse(localStorage.getItem("cart"));

const initialState = cartfromlocal
  ? cartfromlocal
  : {
    cart: [],
    userId: "",
  };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    editItemToCart: (state, action) => {
      const prevState = { ...state };
      const newItem = action.payload.productDetails;
      // console.log("productDetails", action.payload.productDetails);
      // console.log("newitem", newItem);
      let cartkimat
      const itemIndex = state.cart.findIndex(
        (item) => item._id === newItem._id
      );
      if (action.payload.productquantity >= 1 && action.payload.productquantity < 101) {
        cartkimat = Number(newItem.discountprice2B) *
          action.payload.productquantity;
      } else if (action.payload.productquantity >= 101 && action.payload.productquantity < 201) {
        cartkimat = Number(newItem.price2) *
          action.payload.productquantity;
      } else if (action.payload.productquantity >= 201 && action.payload.productquantity < 301) {
        cartkimat = Number(newItem.price3) *
          action.payload.productquantity;
      } else if (action.payload.productquantity >= 301 && action.payload.productquantity < 401) {
        cartkimat = Number(newItem.price4) *
          action.payload.productquantity;
      }
      else if (action.payload.productquantity >= 401 && action.payload.productquantity < 501) {
        cartkimat = Number(newItem.price5) *
          action.payload.productquantity;
      } else (cartkimat = Number(newItem.price6) *
        action.payload.productquantity)

      if (itemIndex >= 0) {
        // console.log("removed item");
        // ankit toast.success("Item is removed from the cart");
        state.cart.splice(itemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(state));
        if (state.userId) {
          const postcart = async () => {
            const response = await postCart(state);
            // console.log("updated cart", response);
            if (response.status !== 200) {
              Object.assign(state, prevState);
              localStorage.setItem("cart", JSON.stringify(state));
              toast.error("Something went wrong");
              // return prevState
            }
          };
          postcart();
        }
      } else {
        // console.log("added new item");
        // console.log(newItem);
        state.cart.push({
          ...newItem,
          quantity: action.payload.productquantity,
          cartvalue: cartkimat,
        });
        console.log(newItem)
        localStorage.setItem("cart", JSON.stringify(state));
        toast.success("Item added to cart");
        if (state.userId) {
          const postcart = async () => {
            const response = await postCart(state);
            console.log("updated cart", response);
            if (response.status !== 200) {
              Object.assign(state, prevState);
              localStorage.setItem("cart", JSON.stringify(state));
              toast.error("Something went wrong");
            }
          };
          postcart();
        }
      }
    },
    incrementcart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload
      );
      console.log(state.cart[itemIndex].price2)
      if (
        state.cart[itemIndex].quantity >=
        parseInt(state.cart[itemIndex].maxord11B)
      ) {
        toast.error("You can't add more than available quantity");
        return state;
      } else {
        state.cart[itemIndex].quantity++;

        if (state.cart[itemIndex].quantity >= 1 && state.cart[itemIndex].quantity < 101) {
          console.log("1")
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].discountprice2B) * state.cart[itemIndex].quantity;
        } else if (state.cart[itemIndex].quantity >= 101 && state.cart[itemIndex].quantity < 201) {
          console.log("2")
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].price2) * state.cart[itemIndex].quantity;
        } else if (state.cart[itemIndex].quantity >= 201 && state.cart[itemIndex].quantity < 301) {
          console.log("3")
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].price3) * state.cart[itemIndex].quantity;
        } else if (state.cart[itemIndex].quantity >= 301 && state.cart[itemIndex].quantity < 401) {
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].price4) * state.cart[itemIndex].quantity;
        } else if (state.cart[itemIndex].quantity >= 401 && state.cart[itemIndex].quantity < 501) {
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].price5) * state.cart[itemIndex].quantity;
        } else (state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price6) * state.cart[itemIndex].quantity)


        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    decrementcart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload
      );
      if (
        state.cart[itemIndex].quantity <=
        parseInt(state.cart[itemIndex].minord11A)
      ) {
        toast.error("can't deliver less than minimum quantity");
        return state;
      } else {
        state.cart[itemIndex].quantity--;

        if (state.cart[itemIndex].quantity >= 1 && state.cart[itemIndex].quantity < 101) {
          console.log("1")
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].discountprice2B) * state.cart[itemIndex].quantity;
        } else if (state.cart[itemIndex].quantity >= 101 && state.cart[itemIndex].quantity < 201) {
          console.log("2")
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].price2) * state.cart[itemIndex].quantity;
        } else if (state.cart[itemIndex].quantity >= 201 && state.cart[itemIndex].quantity < 301) {
          console.log("3")
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].price3) * state.cart[itemIndex].quantity;
        } else if (state.cart[itemIndex].quantity >= 301 && state.cart[itemIndex].quantity < 401) {
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].price4) * state.cart[itemIndex].quantity;
        } else if (state.cart[itemIndex].quantity >= 401 && state.cart[itemIndex].quantity < 501) {
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].price5) * state.cart[itemIndex].quantity;
        } else if (state.cart[itemIndex].quantity >= 501 && state.cart[itemIndex].quantity < 601) {
          state.cart[itemIndex].cartvalue =
            parseInt(state.cart[itemIndex].price6) * state.cart[itemIndex].quantity;
        } else (state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price6) * state.cart[itemIndex].quantity)
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    userinputquantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload.id
      );
      if (
        action.payload.quantity >= parseInt(state.cart[itemIndex].minord11A) &&
        action.payload.quantity < parseInt(state.cart[itemIndex].minimum1)
      ) {
        // console.log(
        //   "State changed",
        //   action.payload.quantity,
        //   "quantity",
        //   state.cart[itemIndex].minord11A,
        //   "minord11A",
        //   state.cart[itemIndex].minimum1,
        //   "minimum1",
        //   state.cart[itemIndex].discountprice2B,
        //   "discountprice2B"
        // );
        state.cart[itemIndex].quantity = action.payload.quantity;
        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].discountprice2B) *
          action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state));
      }
      if (
        action.payload.quantity >= parseInt(state.cart[itemIndex].minimum1) &&
        action.payload.quantity <= parseInt(state.cart[itemIndex].maximum1)
      ) {
        state.cart[itemIndex].quantity = action.payload.quantity;
        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price1) * action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state));
      }
      if (
        action.payload.quantity >= parseInt(state.cart[itemIndex].minimum2) &&
        action.payload.quantity <= parseInt(state.cart[itemIndex].maximum2)
      ) {
        state.cart[itemIndex].quantity = action.payload.quantity;
        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price2) * action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state));
      }
      if (
        action.payload.quantity >= parseInt(state.cart[itemIndex].minimum3) &&
        action.payload.quantity <= parseInt(state.cart[itemIndex].maximum3)
      ) {
        state.cart[itemIndex].quantity = action.payload.quantity;
        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price3) * action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state));
      }
      if (
        action.payload.quantity >= parseInt(state.cart[itemIndex].minimum4) &&
        action.payload.quantity <= parseInt(state.cart[itemIndex].maximum4)
      ) {
        state.cart[itemIndex].quantity = action.payload.quantity;
        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price4) * action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state));
      }
      if (
        action.payload.quantity >= parseInt(state.cart[itemIndex].minimum5) &&
        action.payload.quantity <= parseInt(state.cart[itemIndex].maximum5)
      ) {
        state.cart[itemIndex].quantity = action.payload.quantity;
        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price5) * action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state));
      }
      if (
        action.payload.quantity >= parseInt(state.cart[itemIndex].minimum6) &&
        action.payload.quantity <= parseInt(state.cart[itemIndex].maximum6)
      ) {
        state.cart[itemIndex].quantity = action.payload.quantity;
        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price6) * action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state));
      }
      if (action.payload.quantity > parseInt(state.cart[itemIndex].maximum6)) {
        state.cart[itemIndex].quantity = action.payload.quantity;
        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price6) * action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    updateprice: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload
      );
      console.log(
        state.cart[itemIndex].quantity,
        "quantity",
        parseInt(state.cart[itemIndex].minimum1),
        "minorder"
      );
      if (
        parseInt(state.cart[itemIndex].quantity) >=
        parseInt(state.cart[itemIndex].minimum1) &&
        parseInt(state.cart[itemIndex].quantity) <=
        parseInt(state.cart[itemIndex].maximum1)
      ) {
        console.log("1")
        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].discountprice2B) *
          parseInt(state.cart[itemIndex].quantity);
        return state
      }
      if (
        parseInt(state.cart[itemIndex].quantity) >=
        parseInt(state.cart[itemIndex].minimum2) &&
        parseInt(state.cart[itemIndex].quantity) <=
        parseInt(state.cart[itemIndex].maximum2)
      ) {
        console.log("2");

        state.cart[itemIndex].cartvalue =
          parseInt(state.cart[itemIndex].price2) * parseInt(state.cart[itemIndex].quantity);
        return state
      }
      if (
        state.cart[itemIndex].quantity >= state.cart[itemIndex].minimum3 &&
        state.cart[itemIndex].quantity <= state.cart[itemIndex].maximum3
      ) {
        console.log("3");

        state.cart[itemIndex].cartvalue =
          state.cart[itemIndex].price3 * state.cart[itemIndex].quantity;
        return state
      }
      if (
        state.cart[itemIndex].quantity >= state.cart[itemIndex].minimum4 &&
        state.cart[itemIndex].quantity <= state.cart[itemIndex].maximum4
      ) {
        console.log("4");
        state.cart[itemIndex].cartvalue =
          state.cart[itemIndex].price4 * state.cart[itemIndex].quantity;
        return state
      }
      if (
        state.cart[itemIndex].quantity >= state.cart[itemIndex].minimum5 &&
        state.cart[itemIndex].quantity <= state.cart[itemIndex].maximum5
      ) {
        console.log("5");
        state.cart[itemIndex].cartvalue =
          state.cart[itemIndex].price5 * state.cart[itemIndex].quantity;
        return state
      }
      if (
        state.cart[itemIndex].quantity >= state.cart[itemIndex].minimum6 &&
        state.cart[itemIndex].quantity <= state.cart[itemIndex].maximum6
      ) {
        console.log("6");
        state.cart[itemIndex].cartvalue =
          state.cart[itemIndex].price6 * state.cart[itemIndex].quantity;
        return state
      }
      // if (
      //   state.cart[itemIndex].quantity >= state.cart[itemIndex].minimum6 &&
      //   state.cart[itemIndex].quantity <= state.cart[itemIndex].maximum6
      // ) {
      //   state.cart[itemIndex].cartvalue =
      //     state.cart[itemIndex].price6 * state.cart[itemIndex].quantity;
      // }
      // if (state.cart[itemIndex].quantity > state.cart[itemIndex].maximum6) {
      //   state.cart[itemIndex].cartvalue =
      //     state.cart[itemIndex].price6 * state.cart[itemIndex].quantity;
      // }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    editcartbyuserid: (state, action) => {
      const userId = action.payload;
      state.userId = userId;
      localStorage.setItem("cart", JSON.stringify(state));
      const postcart = async () => {
        const cart = await postCart(state);
        console.log(cart);
      };
      postcart();
    },
    getcartbydb: (state, action) => {
      const newState = action.payload;
      console.log(newState, "newstate from db");
      return newState;
    },
    postcart: (state, action) => {
      const postcart = async () => {
        const cart = await postCart(state);
        console.log(cart, "updated quantity");
      };
      postcart();
    },
    removeCart: (state, action) => {
      localStorage.removeItem("cart");
      return {
        cart: [],
        userId: "",
      };
    },
  },
});

export const {
  editItemToCart,
  incrementcart,
  decrementcart,
  updateprice,
  editcartbyuserid,
  removeCart,
  userinputquantity,
  getcartbydb,
  postcart,
} = cartSlice.actions;

export default cartSlice.reducer;
