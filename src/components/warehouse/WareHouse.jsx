import React, { useState, useEffect, Fragment } from "react";
import Styles from "./WareHouse.module.css";
import Button from "../UI/Button";
import { State } from "country-state-city";
import Dropdown from "./DropDown";
import { Dialog, Transition } from "@headlessui/react";
import {
  postWarehouse,
  getVendorProfileByUser,
  getWarehousebyvendor,
  deleteWareHouse,
  postProductRequest,
  getAllProducts,
  getProductRequest,
  getCategories,
  getSubCategories,
  getSubSubCategories,
  deleteProductRequest,
} from "../../apis/api";
import { toast } from "react-toastify";

const defaultform = {
  vendorname: "",
  vendoremail: "",
  name: "",
  vendorphoneno: "",
  address: "",
  district: "",
  pincode: "",
  state: "",
  vendorid: "",
  approved: false,
};

const defaultproductrequest = {
  vendorid: "",
  productid: "",
  warehouseid: "",
  price: "",
  product_docs: "",
};

let categories;
let allproducts;
let compressedproducts;

const fetchData = async () => {
  try {
    
    categories = await getCategories();
    allproducts = await getAllProducts();
    
    
   allproducts = allproducts.data.data;
   compressedproducts = [
    ...allproducts.products.map((item) => {
      return {
        productid: item._id,
        productname: item.productname1,
        category: item.categoryid,
        subcategory: item.subcategory,
        subsubcategory: item.subsubcategory,
      };
    }),
    ...allproducts.variant.map((item) => {
      return {
        productid: item._id,
        productname: item.productname1,
        category: item.categoryid,
        subcategory: item.subcategory,
        subsubcategory: item.subsubcategory,
      };
    }),
  ]; 
    // Now you can use categories, allproducts, and compressedproducts
    console.log(categories, allproducts, compressedproducts);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const data1 = await fetchData();
console.log(compressedproducts)

const WareHouse = ({ countryCode = "IN", cityCode = "TG" }) => {
  const [userform, setUserForm] = useState(defaultform);
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenProduct, setIsOpenProduct] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteware, setDeleteWare] = useState(null);
  const [wareHousesList, setWareHousesList] = useState(null);
  const [products, setProducts] = useState(null);
  const [productrequest, setProductRequest] = useState(defaultproductrequest);
  const [productrequestslist, setProductRequestsList] = useState(null);
  const [category, setCategory] = useState("");
  const [subcategories, setSubCategories] = useState(null);
  const [subSubcategories, setSubSubCategories] = useState(null);
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");

  const data = State.getStatesOfCountry(countryCode).map((state) => ({
    value: state.name,
    displayValue: `${state.name}`,
  }));

  useEffect(() => {
    const userfromlocal = JSON.parse(localStorage.getItem("user"));
    if (userfromlocal?.role === "Vendor") {
      const getVendorProfile = async (id) => {
        const response = await getVendorProfileByUser(id);
        // console.log(response);
        localStorage.setItem("vendorprofile", JSON.stringify(response.data));
        if (response.status === 200) {
          setUserForm({
            ...userform,
            vendorid: response.data[0]?._id,
            vendorname: userfromlocal.username,
            vendoremail: userfromlocal.email,
          });

          setProductRequest({
            ...productrequest,
            vendorid: response.data[0]._id,
          });

          const getWarehouse = async (email) => {
            const response = await getWarehousebyvendor(email);
            if (response.status === 200) {
              setWareHousesList(response.data);
            }
          };
          getWarehouse(response.data[0].email);
        }
      };
      getVendorProfile(userfromlocal._id);      

      const getproductrequest = async () => {
        const vendorprofile = await JSON.parse(
          localStorage.getItem("vendorprofile")
        );
        const response = await getProductRequest(vendorprofile[0]?._id);
        console.log(response);
        if (response.status === 200) {
          try {
            const productreq = response.data.map((item) => {
              const request = {
                id: item._id,
                warehousename: item.warehouse_docs[0].name,
                productname: item.productname,
                price:item.price,
                warehousepincode: item.warehouse_docs[0].pincode,
                status: item.status,
              };
              return request;
            });
            setProductRequestsList(productreq);
          } catch (err) {
            console.log(err);
          }
        }
      };
      getproductrequest();
    }
  }, []);

  useEffect(() => {
    const fetchsubcategories = async () => {
      const response = await getSubCategories();
      if (response.status === 200) {
        const filtersubcategory = response.data.filter(
          (item) => item.categoryname === category
        );
        setSubCategories(filtersubcategory);
      }
      const filterproducts = compressedproducts.filter(
        (item) => item.category === category
      );
      setProducts(filterproducts);
    };
    fetchsubcategories();
  }, [category]);

  useEffect(() => {
    const fetchsubsubcategories = async () => {
      const response = await getSubSubCategories();
      if (response.status === 200) {
        const filtersubsubcategory = response.data.filter(
          (item) => item.subcategoryname === subCategory
        );
        setSubSubCategories(filtersubsubcategory);
      }
      const filterproducts = compressedproducts.filter(
        (item) => item.subcategory === subCategory
      );
      setProducts(filterproducts);
    };
    fetchsubsubcategories();
  }, [subCategory]);

  useEffect(() => {
    
    const filterproducts = compressedproducts.filter(
      (item) => item.subsubcategory === subSubCategory
    );
    console.log(filterproducts, "filterproducts");
  
    setProducts(filterproducts);
  }, [subSubCategory]);
  

  const inputhandleChange = (key, value) => {
    setUserForm({ ...userform, [key]: value });
  };

  const selectState = (data) => {
    setUserForm({ ...userform, state: data });
  };

  const formsubmithandler = (e) => {
    e.preventDefault();
    const postwarehouse = async () => {
      const response = await postWarehouse(userform);
      if (response.status === 200) {
      
        toast.success("Warehouse Added");
        setIsOpen(false);
        setUserForm({
          ...userform,
          name: "",
          vendorphoneno: "",
          address: "",
          district: "",
          pincode: "",
          state: "",
        });

        const getWarehouse = async (email) => {
          const response = await getWarehousebyvendor(email);
          if (response.status === 200) {
            setWareHousesList(response.data);
          }
        };
        const vendor = JSON.parse(localStorage.getItem("vendorprofile"));
        getWarehouse(vendor[0].email);
      } else {
        toast.error("Something went wrong!");
      }
    };

    postwarehouse();
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openProductModal() {
    setIsOpenProduct(true);
  }
  function closeProductModal() {
    setIsOpenProduct(false);
  }

  const deletewarehousehandler = () => {
    const deletewaref = async (deleteware) => {
      const response = await deleteWareHouse(deleteware._id);
      // console.log(response);
      if (response.status === 200) {
        const updatedwarehouse = wareHousesList.filter(
          (item) => item._id !== deleteware._id
        );
        setWareHousesList(updatedwarehouse);
        setDeleteWare(null);
        setShowDeleteWarning(false);
        toast.success("Warehouse deleted!");
      } else {
        toast.error("Something went wrong!");
      }
    };
    deletewaref(deleteware);
  };

  const deleteproductrequesthandler = async (id) => {
    const response = await deleteProductRequest(id);
    if (response.status === 200) {
      // const updateproduct = productrequestslist.filter(
      //   (item) => item._id !== id
      // );
      // setProductRequestsList(updateproduct);
      const getproductrequest = async () => {
        const vendorprofile = await JSON.parse(
          localStorage.getItem("vendorprofile")
        );
        const response = await getProductRequest(vendorprofile[0]?._id);
        if (response.status === 200) {
          try {
            // console.log(response.data)
            const productreq = response.data.map((item) => {
              const request = {
                id: item._id,
                warehousename: item.warehouse_docs[0].name,
                productname: item.product_docs[0].productname,
                warehousepincode: item.warehouse_docs[0].pincode,
                status: item.status,
              };
              return request;
            });
            setProductRequestsList(productreq);
          } catch (err) {
            console.log(err);
          }
        }
      };
      getproductrequest();
      toast.success("Removed Product!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const productrequesthandler = async () => {
    
    const response = await postProductRequest(productrequest);
    if (response.status === 200 && response.data === "Created Successfully") {
      const warehouse = wareHousesList.filter(
        (item) => item._id === productrequest.warehouseid
      );
      const product = products.filter(
        (item) => item.productid === productrequest.productid
      );
      

      const getproductrequest = async () => {
        const vendorprofile = await JSON.parse(
          localStorage.getItem("vendorprofile")
        );
        const response = await getProductRequest(vendorprofile[0]?._id);
        if (response.status === 200) {
          try {
            // console.log(response.data)
            const productreq = response.data.map((item) => {
              console.log(item);
              const request = {
                id: item._id,
                warehousename: item.warehouse_docs[0].name,
                productname: item.product_docs[0]?.productname1,
                warehousepincode: item.warehouse_docs[0].pincode,
                status: item.status,
              };
              return request;
            });
            setProductRequestsList(productreq);
          } catch (err) {
            console.log(err);
          }
        }
      };
      getproductrequest();

      toast.success("Product Request Sent Successfully!");
      closeProductModal();
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <h2 className={`${Styles.warehousestitle} text-3xl mb-2 font-semibold`}>
        Vendor Panel
      </h2>
      <div className="flex flex-col border rounded-lg shadow">
        <div className="flex justify-between items-center m-2">
          <h1 className={`${Styles.warehouses_title} text-xl font-semibold`}>
            Warehouses
          </h1>
          <Button
            type="button"
            onClick={openModal}
            value="Add Warehouse"
            className={`rounded-md bg-black bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${Styles.addwarehosuebtn}`}
          />
        </div>
        <div className=" flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-4 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 rounded">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Warehouse Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        District
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        State
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Pincode
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {wareHousesList
                      ? wareHousesList.map((location) => (
                        <tr>
                          <td className="text-sm p-2">{location.name}</td>
                          <td className="text-sm p-2">{location.address}</td>
                          <td className="text-sm p-2">{location.district}</td>
                          <td className="text-sm p-2">{location.state}</td>
                          <td className="text-sm p-2">{location.pincode}</td>

                          <td className="text-sm p-2">
                            {location.approved ? (
                              <span>approved</span>
                            ) : (
                              <span>pending</span>
                            )}
                          </td>
                          {/* <td className="text-sm p-2 underline">View</td> */}
                          <td className="text-sm p-2">
                            <Button
                              value="delete"
                              className={`${Styles.deletewarebtn}`}
                              onClick={() => {
                                setShowDeleteWarning(true);
                                setDeleteWare(location);
                              }}
                            />
                          </td>
                        </tr>
                      ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Transition appear show={showDeleteWarning} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setShowDeleteWarning(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel
                    className={`w-96vw max-w-[400px] p-4 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all`}
                  >
                    <h1 className="text-xl">
                      Are you sure you want to delete this warehouse?{" "}
                    </h1>
                    <div className="border rounded-lg p-2">
                      <p>Name: {deleteware?.name},</p>
                      <p>Address: {deleteware?.address},</p>
                      <p>District: {deleteware?.district}</p>
                      <p>State: {deleteware?.state},</p>
                      <p>Pincode: {deleteware?.pincode},</p>
                    </div>
                    <Button value="Delete" onClick={deletewarehousehandler} />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel
                    className={`${Styles.dialogpanel} relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all`}
                  >
                    <div
                      className={
                        isOpen
                          ? `flex justify-center items-center w-full p-2`
                          : `hidden`
                      }
                    >
                      <form
                        action=""
                        className={` ${Styles.form_addwarehouse} bg-white m-2 p-1 rounded-xl`}
                        onSubmit={formsubmithandler}
                      >
                        <div className="flex w-full flex-wrap">
                          <div className="flex w-full md:w-1/2 flex-col p-2">
                            <label htmlFor="">Warehouse Name</label>
                            <input
                              type="text"
                              className={`border shadow ${Styles.ware_input}`}
                              value={userform.name}
                              id="name"
                              onChange={(e) =>
                                inputhandleChange("name", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="flex w-full md:w-1/2 flex-col p-2">
                            <label htmlFor="">Phone no.</label>
                            <input
                              type="number"
                              className={`border shadow ${Styles.ware_input}`}
                              id="vendorphoneno"
                              value={userform.vendorphoneno}
                              onChange={(e) =>
                                inputhandleChange(
                                  "vendorphoneno",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-wrap">
                          <div className="flex w-full md:w-1/2 flex-col p-2">
                            <label htmlFor="">Warehouse Address</label>
                            <input
                              type="text"
                              className={`border shadow ${Styles.ware_input}`}
                              id="address"
                              value={userform.address}
                              onChange={(e) =>
                                inputhandleChange("address", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="flex w-full md:w-1/2 flex-col p-2">
                            <label htmlFor="">Warehouse District</label>
                            <input
                              type="text"
                              className={`border shadow ${Styles.ware_input}`}
                              id="district"
                              value={userform.district}
                              onChange={(e) =>
                                inputhandleChange("district", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-wrap">
                          <div className="flex w-full md:w-1/2 flex-col p-2">
                            <label htmlFor="">Warehouse Pincode</label>
                            <input
                              type="text"
                              className={`border shadow ${Styles.ware_input}`}
                              id="pincode"
                              value={userform.pincode}
                              onChange={(e) =>
                                inputhandleChange("pincode", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="flex w-full md:w-1/2 flex-col p-2">
                            <label htmlFor="">Warehouse State</label>
                            <Dropdown
                              options={data}
                              selected={selectState}
                            ></Dropdown>
                          </div>
                        </div>
                        <Button
                          type="Submit"
                          value="Submit"
                          className={`${Styles.submitbtn} m-2`}
                        />
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>

      {/* Product request------------------------------------- */}

      <div className="flex flex-col mt-10 border rounded-lg shadow">
        <div className="flex justify-between items-center m-2">
          <h1 className={`${Styles.warehouses_title} text-xl font-semibold`}>
            Product Requests
          </h1>
          <Button
            type="button"
            onClick={openProductModal}
            value="Request Product"
            className={`rounded-md bg-black bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${Styles.addwarehosuebtn}`}
          />
        </div>
        <div className=" flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-4 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 rounded">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Warehouse Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Warehouse Pincode
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {productrequestslist
                      ? productrequestslist.map((item) => (
                        <tr>
                          <td className="text-sm p-2">
                            {item.warehousename}
                          </td>
                          <td className="text-sm p-2">{item.productname}</td>
                          <td className="text-sm p-2">{item.price}</td>
                          <td className="text-sm p-2">
                            {item.warehousepincode}
                          </td>
                          <td className="text-sm p-2">
                            {" "}
                            {item.status ? (
                              <span>approved</span>
                            ) : (
                              <span>pending</span>
                            )}
                          </td>
                          <td className="text-sm p-2">
                            <Button
                              value="delete"
                              className={`${Styles.deletewarebtn}`}
                              onClick={() => {
                                deleteproductrequesthandler(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Transition appear show={isOpenProduct} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={closeProductModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                    <div>
                      <h2
                        id="payment-details-heading"
                        className="text-xl font-medium leading-6 text-gray-900"
                      >
                        Request product
                      </h2>
                      <div className="mt-6 grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select a category
                          </label>
                          <select
                            id="category"
                            required
                            name="category"
                            autoComplete="category-name"
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={""}>Select category</option>
                            {categories?.map((item) => (
                              <option key={item.title} value={item.title}>
                                {item.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 ">
                          <label
                            htmlFor="subcategory"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select a sub-category
                          </label>
                          <select
                            id="subcategory"
                            required
                            name="subcategory"
                            autoComplete="subcategory-name"
                            onChange={(e) => {
                              // if()
                              setSubCategory(e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={""}>Select sub-category</option>
                            {subcategories?.map((item) => (
                              <option
                                key={item.subcategory}
                                value={item.subcategory}
                              >
                                {item.subcategory}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 ">
                          <label
                            htmlFor="product"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select a subsub-category
                          </label>
                          <select
                            id="subsubcategory"
                            required
                            name="subsubcategory"
                            autoComplete="subsubcategory-name"
                            onChange={(e) => {
                              setSubSubCategory(e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={""}>Select subsub-category</option>
                            {subSubcategories?.map((item) => (
                              <option
                                key={item.subsubcategory}
                                value={item.subsubcategory}
                              >
                                {item.subsubcategory}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 ">
                          <label
                            htmlFor="product"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select a product
                          </label>
                          <select
                            id="product"
                            required
                            name="product"
                            autoComplete="product-name"
                            onChange={(e) => {
                              const selectedProductId = e.target.value;
                              const selectedProduct = products.find(
                                (item) => item.productid === selectedProductId
                              );  
                              
                              setProductRequest({
                                ...productrequest,
                                productid: selectedProductId,
                                productname: selectedProduct.productname
                              });
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={""}>Select product</option>
                            {products?.map((item) => (
                              <option
                                key={item.productid}
                                value={item.productid}
                              >
                                {item.productname} 
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-6 ">
                          <label
                            htmlFor="warehouse"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Select a warehouse
                          </label>
                          <select
                            id="warehouse"
                            required
                            name="warehouse"
                            autoComplete="warehouse-name"
                            onChange={(e) => {
                              setProductRequest({
                                ...productrequest,
                                warehouseid: e.target.value,
                              });
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={""}>Select warehouse</option>
                            {wareHousesList
                              ? wareHousesList
                                .filter((item) => item.approved === true)
                                .map((item) => (
                                  <option key={item._id} value={item._id}>
                                    {item.name}
                                  </option>
                                ))
                              : ""}
                          </select>
                        </div>
                        <div className="col-span-6 ">
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Your Price
                          </label>
                          <input
                            type="number"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            onChange={(e) => {
                              setProductRequest({
                                ...productrequest,
                                price: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 w-full">
                      <Button value="submit" onClick={productrequesthandler} />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default WareHouse;
