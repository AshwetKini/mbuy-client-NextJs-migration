import React, { useEffect, useState, useContext } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Vendor from "./pages/Vendor";
import Career from "./pages/Career";
import Terms from "./pages/TermOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnPolicy from "./pages/RRCpolicy";
import Login from "./pages/Login";
import SingleProductDetails from "./pages/SingleProductDetails";
import Signup from "./pages/Signup";
import AllProducts from "./pages/AllProducts";
// import { getUser } from "./apis/api";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import BecomeAProfessional from "./pages/BecomeAProfessional";
import Professional from "./pages/Professionals";
import Getquote from "./pages/Getquote";
import PreFab from "./pages/PreFab";
import Service from "./pages/Service";
import Wishlist from "./pages/Wishlist";
import AllProfessionals from "./pages/AllProfessionals";
import Products from "./pages/Products";
import Singleservices from "./pages/Singleservices";
import Orderhistory from "./pages/Orderhistory";
import Purchasesuccess from "./pages/Purchasesuccess.jsx";
import Purchasesfail from "./pages/Purchasesfail";
import { getAllProfessionalsCategories, getUser } from "./apis/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AllProductsProvider } from "./features/AllProductsContext";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import NewManageAddress from "./pages/NewManageAddress.jsx";
import SinglevariantDetails from "./pages/SingleVariantDetails.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [allProfessionals, setAllProfessionals] = useState(null);

  useEffect(() => {
    const getuser = async (id) => {
      const res = await getUser(id);
      // console.log({ res });
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
      } else {
        console.log(res);
      }
    };
    setUser(JSON.parse(localStorage.getItem("user")));
    if (user) {
      getuser(user._id);
    }
    const getAllProfessional = async () => {
      const response = await getAllProfessionalsCategories();
      if (response.status === 200) {
        setAllProfessionals(response.data);
      } else {
        console.log(response);
      }
    };
    getAllProfessional();

    // setLoading(false);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      // <div className="w-screen p-2 w-max-[1200px] h-[100vh] flex justify-center items-center bg-[#f3f3f3]">
      <div
        role="status"
        className="flex w-screen h-screen h-full items-center justify-center border bg-white"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-100 animate-spin dark:text-gray-600 fill-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
        <h1>Loading...</h1>
      </div>
      // </div>
    );
  }

  return (
    <AllProductsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/career" element={<Career />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassowrd" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:userId/:token"
            element={<ResetPassword />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/allproducts/:category/:categoryname"
            element={<AllProducts />}
          />
          <Route path="/products/:title" element={<Products />} />
          <Route path="/variance/:title" element={<Products />} />
          <Route
            path="/products/:productName1/:productid"
            element={<SingleProductDetails />}
          />
          {/* For products with a mainProductId */}
          <Route
            path="/variance/:productName1/:productid"
            element={<SinglevariantDetails />}
          />
          <Route
            path="/professional"
            element={<Professional allProfessionals={allProfessionals} />}
          />
          <Route
            path="/allprofessionals/:category"
            element={<AllProfessionals />}
          />
          <Route
            path="/join-as-professional"
            element={
              <BecomeAProfessional allProfessionals={allProfessionals} />
            }
          />
          <Route path="/getaquote" element={<Getquote />} />
          <Route path="/pre-fab-house" element={<PreFab />} />
          <Route path="/services" element={<Service />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/manageaddress" element={<NewManageAddress />} />
          <Route path="/servicedetails/:id" element={<Singleservices />} />
          <Route path="/orderhistory" element={<Orderhistory />} />
          <Route path="/purchase/success" element={<Purchasesuccess />} />
          <Route path="/purchase/fail" element={<Purchasesfail />} />
          {/* <Route path="/newmanageaddress" element={<NewManageAddress />} /> */}
        </Routes>
        <WhatsAppFloatButton />
      </Router>
    </AllProductsProvider>
  );
}

export default App;
