import Layout from "@/Layouts/Layout";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import Button from "@/components/UI/Button";

import { GrDocumentPdf } from "react-icons/gr";
import { FaFileInvoiceDollar, FaTruck } from "react-icons/fa";


const newProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 25423;
  const discount = 52.63;
  const mrp = 63199;
  const bulkDiscounts = [
    { qty: "2-3", price: 28030.75 },
    { qty: "4-5", price: 28610.82 },
    { qty: "6-7", price: 28829.08 },
    { qty: "8+", price: 28706.15 },
  ];
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  
    const [userQuantValue, setUserQuantValue] = useState(null);
    
      const [result, setResult] = useState(null);
    const [toggle, setToggle] = useState("Description");

  const sizes = ["M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  const togglehandler = () => {
    setToggle("Description");
  };

  const togglehandler1 = () => {
    setToggle("Specification");
  };

  const togglehandler2 = () => {
    setToggle("Calculator");
  };

 


  return (
    <Layout>
      {/* //Main row  */}
      <div className="flex flex-col">
        {/* Main Product Row and PRice  */}
        <div className="flex flex-row px-6 bg-white w-full h-full">
          {/* //Share Button  */}
          <div className="flex w-[75%] flex-col">
            {/* //Product Row */}
            <div className="flex w-flex-row">
              <div className="flex w-[40%] justify-center flex-col space-y-5 ">
                <div className="h-96 w-96 space mt-4 items-center bg-white">
                  {/* <Image src="/cart.png" width={400} height={1000} className='object-cover' /> */}
                  <div className="h-full w-full bg-red-400 "></div>
                </div>
                <div className="flex flex-row  space-x-6 h-20 w-full">
                  <div className="h-14 w-14 rounded-md bg-yellow-300"></div>
                  <div className="h-14 w-14 rounded-md bg-yellow-300"></div>
                  <div className="h-14 w-14 rounded-md bg-yellow-300"></div>
                  <div className="h-14 w-14 rounded-md bg-yellow-300"></div>
                  <div className="h-14 w-14 rounded-md bg-yellow-300"></div>
                </div>
                <button className="max-w-96 w-full py-2 rounded-md border border-blue-950 flex justify-center">
                  Downlaod Brochure
                </button>
              </div>
              <div className="w-full bg-white h-full p-6 text-white">
                {/* Product Image & Details */}
                <div className=" rounded-lg">
                  <div className="flex flex-row justify-between w-full mb-3">
                    <p className="text-sm text-gray-500">SKU: ID2681</p>
                    <h2 className="text-yellow-600 tracking-widest font-bold">
                      ASIAN PAINTS
                    </h2>
                  </div>
                  <h1 className="text-3xl text-black font-bold">
                    Kitchen Faucet Balck Origami Imported
                  </h1>

                  {/* Finish Selection */}
                  <div className="mt-2">
                    <p className="text-sm text-black">
                      Finish:{" "}
                      <span className="text-gray-500">
                        Biscuit - 1 In Stock
                      </span>
                    </p>
                    <div className="flex gap-2 mt-2">
                      <div className="w-12 h-12 border-2 border-blue-500 rounded-md bg-gray-200"></div>
                      <div className="w-12 h-12 bg-black rounded-md border"></div>
                      <div className="w-12 h-12 bg-gray-300 rounded-md border"></div>
                      <div className="w-12 h-12 bg-green-400 rounded-md border"></div>
                      <div className="w-12 h-12 bg-white rounded-md border"></div>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mt-4">
                    <p className="text-sm text-black font-black">Size</p>
                    <div className="flex gap-2 mt-2">
                      {["M", "L", "XL", "2XL", "3XL", "4XL", "5XL"].map(
                        (size) => (
                          <button
                            key={size}
                            className={`px-4 py-2 rounded border transition-all duration-200 
              ${
                selectedSize === size
                  ? "bg-blue-950 text-white border-blue-950"
                  : "text-blue-950 border-gray-300"
              }`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Delivery Check */}
                  <div className="mt-5">
                    <p className="text-lg text-blue-950 font-black">
                      Check Delivery Details
                    </p>
                    <div className="flex mt-2">
                      <input
                        type="text"
                        placeholder="Enter PIN"
                        className="w-1/2 p-2 border border-blue-950 text-black rounded-l-md"
                      />
                      <button className="bg-blue-950 px-7 rounded-r-md">
                        Check
                      </button>
                    </div>
                    <p className="text-black text-sm mt-2">
                      Please Enter a Date to Check the Delivery Dates
                    </p>
                    <p className="text-green-400 text-sm mt-2">
                      Delivery by: Sun Dec 22 2024
                    </p>
                  </div>

                  {/* Offers Section */}
                  <div className="mt-4 text-black bg-gray-100 p-3 rounded-lg">
                    <div className="w-full flex flex-row justify-between">
                      <h3 className="text-sm font-semibold">
                        AVAILABLE OFFERS
                      </h3>
                      <button className="px-2 py-1 text-sm bg-gray-200 border border-gray-300 text-black rounded-lg ">
                        View offers
                      </button>
                    </div>
                    <ul className="text-xs mt-2">
                      <li>
                        ✅ Use YES1000 & get ₹1,000 off on orders above ₹1,999
                      </li>
                      <li>
                        ✅ Use YES3000 & get ₹3,000 off on orders above ₹2,999
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button className="bg-gray-700 px-4 py-2 rounded-md w-1/3">
                      Request Callback
                    </button>
                    <button className="bg-gray-700 px-4 py-2 rounded-md w-1/3">
                      Get Price
                    </button>
                    <button className="bg-gray-700 px-4 py-2 rounded-md w-1/3">
                      Expert Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-[25%] ml-3 mt-3 border-gray-300 border p-2 rounded-lg">
            <div>
              <p className="text-gray-500 mb-3">29,2222 ( Incl.all taxes) </p>

              {/* Price Details */}

              <span className="text-2xl bg-gray-200 font-bold  text-green-600">
                ₹32.69/Sq.ft
              </span>
              <div className="mt-2">
                <p className="text-2xl font-bold">₹{price} + 18% GST</p>
                <span className="text-gray-400 line-through ml-2">
                  MRP ₹{mrp}
                </span>
                <span className="text-red-500 ml-1">{discount}% OFF</span>
              </div>

              <div className="mt-5">
                <p className="text-lg text-blue-950 font-black">
                  Check Delivery Details
                </p>
                <div className="flex mt-2">
                  <input
                    type="text"
                    placeholder="Enter PIN"
                    className="w-1/2 p-2 border border-blue-950 text-black rounded-l-md"
                  />
                  <button className="bg-blue-950 px-7 text-white rounded-r-md">
                    Check
                  </button>
                </div>
                <p className="text-black text-sm mt-2">
                  Please Enter a Date to Check the Delivery Availbility
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              {/* <Button className="mt-4 w-full flex items-center gap-2">
                {/* <ShoppingCart size={18} /> Add to Cart */}
              {/* </Button>  */}
              <button className="mt-2 bg-blue-950 text-white w-full flex items-center justify-center gap-2 border p-2 rounded">
                {/* <Heart className="text-red-500" /> Wishlist */} Get Quotation

              </button>


              {/* Additional Options */}
              <div className="mt-6 flex flex-wrap gap-4">
                <button className="flex-1 mx-3 text-white bg-blue-950 px-3 py-2 ">Get Free Sample</button>
              </div>
            </div>
          </div>
        </div>
{/* Footer  */}
        <div className="p-6 bg-white shadow-xl w-full mx-auto">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300">
        {["Description", "Specification", "Calculator"].map((tab) => (
          <button
            key={tab}
            onClick={() => setToggle(tab)}
            className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
              toggle === tab
                ? "bg-white border-t border-x border-gray-300 text-blue-600"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 text-gray-700">
        {toggle === "Description" && (
          <div className="text-lg leading-relaxed">
            <p className="mb-2">
              This is a high-quality product designed for durability and
              performance.
            </p>
            <p>Ideal for professional and personal use.</p>
          </div>
        )}

        {toggle === "Specification" && (
          <div className="text-lg space-y-2">
            <p className="font-semibold">Specifications:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Material: High-grade aluminum</li>
              <li>Weight: 1.5 kg</li>
              <li>Color: Midnight Black</li>
              <li>Dimensions: 25cm x 15cm x 5cm</li>
            </ul>

            {/* PDF Manual Links */}
            <div className="flex flex-col gap-3 mt-4">
              {["Product Manual 1", "Product Manual 2"].map((manual, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center space-x-2 text-blue-950 hover:text-blue-700 transition"
                  target="_blank"
                >
                  <GrDocumentPdf className="text-2xl" />
                  <span>{manual}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {toggle === "Calculator" && (
          <div className="space-y-4">
            <p className="text-lg">
              1 unit of this product covers <strong>5 square meters</strong>.
            </p>

            <div>
              <label className="block mb-1 font-semibold">Enter Requirement:</label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  className="border rounded-lg px-3 py-2 w-40 focus:ring-2 focus:ring-blue-400 outline-none"
                  value={userQuantValue}
                  onChange={(e) => setUserQuantValue(e.target.value)}
                  placeholder="Enter value in m²"
                />
                <button
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => calculateHandler(userQuantValue)}
                >
                  Calculate
                </button>
              </div>
              {result && (
                <div className="mt-3">
                  <p className="font-bold text-lg">
                    Approx. {result} unit(s) required.
                  </p>
                  <p className="text-red-500 text-sm">
                    * Includes 10% wastage in the calculation.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
      </div>
    </Layout>
  );
};

export default newProduct;
