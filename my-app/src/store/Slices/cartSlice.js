import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { postCart } from "../../apis/api";

// Utility functions for localStorage
const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

const safeSetLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const safeRemoveLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Function to get user from localStorage
const getUser = () => {
  return getLocalStorage("user");
};

// Function to get the correct price based on user type
const getPrice = (index, productDetails, user) => {
  return user?.corporate === true
    ? productDetails[`proprice${index}`]
    : productDetails[`price${index}`];
};

// Function to calculate cart value based on quantity
const calculateCartValue = (item, quantity, user, fromWishlist) => {
  if (fromWishlist && !item.isRecalculated) {
    const result = quantity * Number(item.discountprice2B);
    return result;
  }
  
  if(item.norate){
    const result = quantity * Number(item.discountprice2B);
    return result;
  }
  
  const ranges = [
    { min: Number(item.minimum1 || 1), max: Number(item.maximum1 =="-1" ? 100000 : item.maximum1 || 100), price: getPrice(1, item, user) },
    { min: Number(item.minimum2 || 101), max: Number(item.maximum2 =="-1" ? 100000 : item.maximum2 || 200), price: getPrice(2, item, user) },
    { min: Number(item.minimum3 || 201), max: Number(item.maximum3 =="-1" ? 100000 : item.maximum3 || 300), price: getPrice(3, item, user) },
    { min: Number(item.minimum4 || 301), max: Number(item.maximum4 =="-1" ? 100000 : item.maximum4 || 400), price: getPrice(4, item, user) },
    { min: Number(item.minimum5 || 401), max: Number(item.maximum5 =="-1" ? 100000 : item.maximum5 || 500), price: getPrice(5, item, user) },
    { min: Number(item.minimum6 || 501), max: Number(item.maximum6 =="-1" ? 100000 : item.maximum6 || 600), price: getPrice(6, item, user) },
  ];
  
  for (const range of ranges) {
    if (quantity >= range.min && quantity <= range.max) {
      const result = quantity * (Number(range.price));
      return result;
    }
  }
  return 0; // Default fallback
};

// Get cart from localStorage
const cartFromLocal = getLocalStorage("cart");

const initialState = cartFromLocal || { cart: [], userId: "" };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    editItemToCart: (state, action) => {
      const prevState = { ...state };
      const { productDetails, productquantity, price, vendorPriceAtPincode, pincode, fromWishlist } = action.payload;
      const user = getUser(); // Retrieve user only once
      console.log(user)
      const itemIndex = state.cart.findIndex((item) => item._id === productDetails._id);
      
      // Calculate price dynamically
      const cartValue = calculateCartValue(productDetails, productquantity, user, fromWishlist);

      if (itemIndex >= 0) {
        state.cart.splice(itemIndex, 1);
        toast.success("Item removed from the cart");
      } else {
        state.cart.push({
          ...productDetails,
          quantity: productquantity,
          cartvalue: cartValue,
          vendorPriceAtPincode,
          price,
          pincode,
          fromWishlist,
          minimum1: productDetails.minimum1, maximum1: productDetails.maximum1,
          minimum2: productDetails.minimum2, maximum2: productDetails.maximum2,
          minimum3: productDetails.minimum3, maximum3: productDetails.maximum3,
          minimum4: productDetails.minimum4, maximum4: productDetails.maximum4,
          minimum5: productDetails.minimum5, maximum5: productDetails.maximum5,
          minimum6: productDetails.minimum6, maximum6: productDetails.maximum6,
        });
        toast.success("Item added to the cart");
      }

      safeSetLocalStorage("cart", state);

      if (state.userId) {
        const updateCart = async () => {
          const response = await postCart(state);
          if (response.status !== 200) {
            Object.assign(state, prevState);
            safeSetLocalStorage("cart", state);
            toast.error("Something went wrong");
          }
        };
        updateCart();
      }
    },

    incrementcart: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item._id === action.payload);
      if (itemIndex >= 0) {
        const item = state.cart[itemIndex];
        const user = getUser();
        if (item.quantity >= parseInt(item.maxord11B)) {
          toast.error("You can't add more than available quantity");
        } else {
          item.quantity++;
          item.cartvalue = calculateCartValue(item, item.quantity, user, item.fromWishlist);
          safeSetLocalStorage("cart", state);
        }
      }
    },

    decrementcart: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item._id === action.payload);
      if (itemIndex >= 0) {
        const item = state.cart[itemIndex];
        const user = getUser();
        if (item.quantity <= parseInt(item.minord11A)) {
          toast.error("Can't deliver less than minimum quantity");
        } else {
          item.quantity--;
          item.cartvalue = calculateCartValue(item, item.quantity, user, item.fromWishlist);
          safeSetLocalStorage("cart", state);
        }
      }
    },

    userinputquantity: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item._id === action.payload.id);
      if (itemIndex >= 0) {
        const item = state.cart[itemIndex];
        const quantity = action.payload.quantity;
        const user = getUser();
        item.quantity = quantity;
        item.cartvalue = calculateCartValue(item, quantity, user, item.fromWishlist);
        safeSetLocalStorage("cart", state);
      }
    },

    updateprice: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item._id === action.payload);
      if (itemIndex >= 0) {
        const item = state.cart[itemIndex];
        const user = getUser();
        item.cartvalue = calculateCartValue(item, item.quantity, user, item.fromWishlist);
        safeSetLocalStorage("cart", state);
      }
    },

    editcartbyuserid: (state, action) => {
      state.userId = action.payload;
      safeSetLocalStorage("cart", state);

      const syncCart = async () => {
        await postCart(state);
      };
      syncCart();
    },

    getcartbydb: (state, action) => {
      return action.payload;
    },

    postcart: (state) => {
      const postCartData = async () => {
        const cart = await postCart(state);
        console.log(cart, "updated quantity");
      };
      postCartData();
    },

    removeCart: () => {
      safeRemoveLocalStorage("cart");
      return { cart: [], userId: "" };
    },

    updateVendorPrice: (state, action) => {
      const { productId, vendorPrice , Npincode } = action.payload;
      const user = getUser();
      // Safeguard against undefined cart
      if (!state.cart) {
        state.cart = [];
        return;
      }

      state.cart = state.cart.map(item => {
        // Handle main product
        if (item._id === productId) {
          return { 
            ...item,
            pincode:Npincode, 
            vendorPriceAtPincode: vendorPrice,
            cartvalue: calculateCartValue(item, item.quantity, user, item.fromWishlist) // Recalculate cartvalue if needed
          };
        }
        return item;
      });
    },

    recalculateAllCartValues: (state) => {
      const user = getUser();
      if (!state.cart) {
        state.cart = [];
        return;
      }

      state.cart = state.cart.map(item => {
        const oldValue = item.cartvalue;
        const newValue = calculateCartValue(item, item.quantity, user, item.fromWishlist);
        console.log(`Recalculated ${item.productname1 || item._id}: ${oldValue} → ${newValue} (fromWishlist: ${item.fromWishlist})`);
        return {
          ...item,
          isRecalculated: true, // Mark as recalculated so they use proper price ranges
          cartvalue: newValue
        };
      });
      
      safeSetLocalStorage("cart", state);
      console.log("✅ Manual recalculation completed");
    },
  },
});

export const {
  editItemToCart,
  incrementcart,
  decrementcart,
  userinputquantity,
  updateprice,
  editcartbyuserid,
  getcartbydb,
  postcart,
  removeCart,
  updateVendorPrice,
  recalculateAllCartValues,
} = cartSlice.actions;

export default cartSlice.reducer;
