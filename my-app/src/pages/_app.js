import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AllProductsProvider } from "../features/AllProductsContext";
import { store } from "../store/store";
import "react-toastify/dist/ReactToastify.css";
import '../styles/global.css'
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AllProductsProvider>
        <ToastContainer autoClose={1000} />
        <Component {...pageProps} />
      </AllProductsProvider>
      <WhatsAppFloatButton />
    </Provider>
  );
}
