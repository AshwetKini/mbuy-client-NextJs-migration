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
  getPORS,
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
  const [pors, setPORS] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [vendorProfile, setVendorProfile] = useState(null);
  const [vendorFilter, setVendorFilter] = useState('');
  const [availableVendors, setAvailableVendors] = useState([]);

  const data = State.getStatesOfCountry(countryCode).map((state) => ({
    value: state.name,
    displayValue: `${state.name}`,
  }));

  useEffect(() => {
    const userfromlocal = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(userfromlocal);
    if (userfromlocal?.role === "Vendor") {
      // Set default vendor filter if username is ankitkmr
      if (userfromlocal.username === 'ankitkmr') {
        setVendorFilter('ankitkmr');
      }
      
      const getVendorProfile = async (id) => {
        const response = await getVendorProfileByUser(id);
        console.log("Vendor profile response:", response);
        localStorage.setItem("vendorprofile", JSON.stringify(response.data));
        if (response.status === 200) {
          setVendorProfile(response.data[0]);
          setUserForm({
            ...userform,
            vendorid: response.data[0]?._id,
            vendorname: userfromlocal.name,
            vendoremail: userfromlocal.email,
          });

          setProductRequest({
            ...productrequest,
            vendorid: response.data[0]._id,
          });

          const getWarehouse = async (vendorid) => {
            const filteredWarehouses = await getWarehousebyvendor(vendorid);
            // console.log(filteredWarehouses)
            setWareHousesList(filteredWarehouses);
          };
          getWarehouse(response.data[0]._id);
        }
      };
      getVendorProfile(userfromlocal._id);      

      const getproductrequest = async () => {
        const vendorprofile = await JSON.parse(
          localStorage.getItem("vendorprofile")
        );
        const response = await getProductRequest(vendorprofile[0]?._id);
        console.log(response,"productrequest");
        if (response.status === 200) {
          try {
            const productreq = response.data.map((item) => ({
              id: item._id,
              warehousename: item.warehouse_docs?.[0]?.name || "N/A", // ✅ Prevents undefined error
              price:item.price, 
              productname: item.productname , // ✅ Prevents undefined error
              warehousepincode: item.warehouse_docs?.[0]?.pincode || "N/A", // ✅ Prevents undefined error
              status: item.status || "Pending",
            }));
            setProductRequestsList(productreq);
          } catch (err) {
            console.log(err);
          }
        }
      };
      getproductrequest();

      // Fetch Purchase Orders
      const fetchPORS = async () => {
        try {
          const response = await getPORS();
          console.log("PORS response:", response);
          // Check if response data exists and is an array
          if (response && Array.isArray(response)) {
            console.log("Setting PORS state with:", response);
            setPORS(response);
          } else if (response && response.data && Array.isArray(response.data)) {
            console.log("Setting PORS state with response.data:", response.data);
            setPORS(response.data);
          } else {
            console.error("Invalid PORS response format:", response);
          }
        } catch (error) {
          console.error("Error fetching PORS:", error);
        }
      };
      fetchPORS();
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

        const getWarehouse = async (vendorid) => {
          const response = await getWarehousebyvendor(vendorid);
          if (response.status === 200) {
            setWareHousesList(response.data);
          }
        };
        const vendor = JSON.parse(localStorage.getItem("vendorprofile"));
        getWarehouse(vendor[0]._id);
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
            const productreq = response.data.map((item) => ({
              id: item._id,
              warehousename: item.warehouse_docs?.[0]?.name || "N/A",
              price:item.price, // ✅ Prevents undefined error
              productname: item.productname , // ✅ Prevents undefined error
              warehousepincode: item.warehouse_docs?.[0]?.pincode || "N/A", // ✅ Prevents undefined error
              status: item.status || "Pending",
            }));
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
    if (response.data === "Created Successfully") {
      const warehouse = wareHousesList.find(
        (item) => item._id === productrequest.warehouseid
      );
      const product = products.find(
        (item) => item.productid === productrequest.productid
      );
    
      const getproductrequest = async () => {
        try {
          const vendorprofile = JSON.parse(localStorage.getItem("vendorprofile"));
          const response = await getProductRequest(vendorprofile?.[0]?._id);
          console.log(response,"productrequest");
    
          if (response?.status === 200) {
            const productreq = response.data.map((item) => ({
              id: item._id,
              warehousename: item.warehouse_docs?.[0]?.name || "N/A", // ✅ Prevents undefined error
              price:item.price, 
              productname: item.productname , // ✅ Prevents undefined error
              warehousepincode: item.warehouse_docs?.[0]?.pincode || "N/A", // ✅ Prevents undefined error
              status: item.status || "Pending",
            }));
            setProductRequestsList(productreq);
          }
        } catch (err) {
          console.error("Error fetching product requests:", err);
        }
      };
    
      getproductrequest();
    
      toast.success("Product Request Sent Successfully!");
      closeProductModal();
    } else {
      toast.error("Something went wrong!");
    }
    
  };

  // Add debug logging to understand the vendor data structure
  useEffect(() => {
    if (pors && pors.length > 0) {
      console.log("DEBUGGING VENDOR DATA:");
      console.log("Current user:", currentUser);
      console.log("Current username:", currentUser?.username);
      console.log("Current email:", currentUser?.email);
      console.log("Vendor profile:", vendorProfile);
      
      // Log all vendors from all orders to understand structure
      const allVendors = [];
      const uniqueVendors = new Set();
      
      pors.forEach(order => {
        if (order.products && Array.isArray(order.products)) {
          order.products.forEach(product => {
            if (product.vendors && Array.isArray(product.vendors)) {
              product.vendors.forEach(vendor => {
                allVendors.push({
                  orderId: order.OrdID,
                  vendorId: vendor.vendorId,
                  vendorName: vendor.vendorName,
                  vendorEmail: vendor.vendorEmail
                });
                
                // Add to unique vendors list for dropdown
                if (vendor.vendorName) {
                  uniqueVendors.add(vendor.vendorName);
                }
              });
            }
          });
        }
      });
      
      // Set available vendors for dropdown
      setAvailableVendors(Array.from(uniqueVendors));
      
      console.log("All vendors in orders:", allVendors);
      console.log("Unique vendor names:", Array.from(uniqueVendors));
    }
  }, [pors, currentUser, vendorProfile]);

  // Filter PORS based on vendor ID matching current vendor's ID
  const filteredPORS = pors.filter(order => {
    // Skip orders with no products
    if (!order.products || !Array.isArray(order.products) || order.products.length === 0) {
      return false;
    }
    
    return order.products.some(product => {
      // Skip products with no vendors
      if (!product.vendors || !Array.isArray(product.vendors) || product.vendors.length === 0) {
        return false;
      }
      
      return product.vendors.some(vendor => {
        // If a vendor filter is applied, use that
        if (vendorFilter) {
          return vendor.vendorName === vendorFilter;
        }
        
        if (currentUser && currentUser.username === vendorProfile.username) {

          if (vendor.vendorId && vendorProfile && vendor.vendorId === vendorProfile._id) {
            return true;
          }
          
          // Then try matching by email (also reliable)
          if (vendor.vendorEmail && currentUser && vendor.vendorEmail === currentUser.email) {
            return true;
          }
          
          
          // Finally try matching by name (less reliable)
          if (vendor.vendorName && currentUser) {
            // Try different name formats
            const vendorNameLower = vendor.vendorName.toLowerCase();
            const currentUserNameLower = currentUser.name ? currentUser.name.toLowerCase() : '';
            const currentUserFullNameLower = currentUser.fullname ? currentUser.fullname.toLowerCase() : '';
            const currentUserUsernameLower = currentUser.username ? currentUser.username.toLowerCase() : '';
            
            return vendorNameLower === currentUserNameLower || 
                   vendorNameLower === currentUserFullNameLower ||
                   vendorNameLower === currentUserUsernameLower;
          }
        }
        
        return false;
      });
    });
  });

  console.log("Current user:", currentUser);
  console.log("Current username:", currentUser?.username);
  console.log("Vendor profile:", vendorProfile);
  console.log("All PORS:", pors);
  console.log("Filtered PORS:", filteredPORS);

  // Process orders to display in a more readable format
  const processedOrders = filteredPORS.flatMap(order => 
    order.products
      .filter(product => {
        // Skip products with no vendors
        if (!product.vendors || !Array.isArray(product.vendors) || product.vendors.length === 0) {
          return false;
        }
        
        return product.vendors.some(vendor => {
          // If a vendor filter is applied, use that
          if (vendorFilter) {
            return vendor.vendorName === vendorFilter;
          }
          
          // Otherwise check specifically for ankitkmr username
          if (currentUser && currentUser.username === 'ankitkmr') {
            // First try matching by vendor ID (most reliable)
            if (vendor.vendorId && vendorProfile && vendor.vendorId === vendorProfile._id) {
              return true;
            }
            
            // Then try matching by email (also reliable)
            if (vendor.vendorEmail && currentUser && vendor.vendorEmail === currentUser.email) {
              return true;
            }
            
            // Try matching by username directly
            if (vendor.vendorName === 'ankitkmr' || 
                vendor.vendorUsername === 'ankitkmr' ||
                (vendor.vendorName && vendor.vendorName.toLowerCase().includes('ankitkmr'))) {
              return true;
            }
            
            // Finally try matching by name (less reliable)
            if (vendor.vendorName && currentUser) {
              // Try different name formats
              const vendorNameLower = vendor.vendorName.toLowerCase();
              const currentUserNameLower = currentUser.name ? currentUser.name.toLowerCase() : '';
              const currentUserFullNameLower = currentUser.fullname ? currentUser.fullname.toLowerCase() : '';
              const currentUserUsernameLower = currentUser.username ? currentUser.username.toLowerCase() : '';
              
              return vendorNameLower === currentUserNameLower || 
                     vendorNameLower === currentUserFullNameLower ||
                     vendorNameLower === currentUserUsernameLower;
            }
          }
          
          return false;
        });
      })
      .map(product => {
        // Find the matching vendor for this product
        const matchingVendor = product.vendors.find(vendor => {
          // If a vendor filter is applied, use that
          if (vendorFilter) {
            return vendor.vendorName === vendorFilter;
          }
          
          if (currentUser && currentUser.username === 'ankitkmr') {
            // First try matching by vendor ID (most reliable)
            if (vendor.vendorId && vendorProfile && vendor.vendorId === vendorProfile._id) {
              return true;
            }
            
            // Then try matching by email (also reliable)
            if (vendor.vendorEmail && currentUser && vendor.vendorEmail === currentUser.email) {
              return true;
            }
            
            // Try matching by username directly
            if (vendor.vendorName === 'ankitkmr' || 
                vendor.vendorUsername === 'ankitkmr' ||
                (vendor.vendorName && vendor.vendorName.toLowerCase().includes('ankitkmr'))) {
              return true;
            }
            
            // Finally try matching by name (less reliable)
            if (vendor.vendorName && currentUser) {
              // Try different name formats
              const vendorNameLower = vendor.vendorName.toLowerCase();
              const currentUserNameLower = currentUser.name ? currentUser.name.toLowerCase() : '';
              const currentUserFullNameLower = currentUser.fullname ? currentUser.fullname.toLowerCase() : '';
              const currentUserUsernameLower = currentUser.username ? currentUser.username.toLowerCase() : '';
              
              return vendorNameLower === currentUserNameLower || 
                     vendorNameLower === currentUserFullNameLower ||
                     vendorNameLower === currentUserUsernameLower;
            }
          }
          return false;
        });
        
        return {
          orderId: order.OrdID,
          customerName: order.username,
          productName: product.productName || product.variationName || "N/A",
          warehouseName: product.warehouse && product.warehouse.length > 0 
            ? product.warehouse[0].name 
            : "N/A",
          warehouseAddress: product.warehouse && product.warehouse.length > 0 
            ? `${product.warehouse[0].address}, ${product.warehouse[0].district}, ${product.warehouse[0].state}` 
            : "N/A",
          quantity: product.quantity,
          price: product.totalPrice,
          // Use the matching vendor's status if available
          status: matchingVendor && matchingVendor.vendorStatus ? "Confirmed" : "Pending",
          deliveryPincode: product.pincode || "N/A",
          vendorName: matchingVendor ? matchingVendor.vendorName : "N/A"
        };
      })
  );
  
  console.log("Processed orders:", processedOrders);

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

      {/* Purchase Orders Table */}
      <div className="flex flex-col mt-10 border rounded-lg shadow">
        <div className="flex justify-between items-center m-2">
          <h1 className={`${Styles.warehouses_title} text-xl font-semibold`}>
            Purchase Orders
          </h1>
         
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-4 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 rounded">
                    <tr>
                      <th scope="col" className="px-2 py-3 text-left text-sm font-semibold text-gray-900">
                        Order ID
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-sm font-semibold text-gray-900">
                        Customer
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-sm font-semibold text-gray-900">
                        Product Name
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-sm font-semibold text-gray-900">
                        Warehouse
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-sm font-semibold text-gray-900">
                        Delivery Pincode
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-sm font-semibold text-gray-900">
                        Quantity
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {processedOrders.length > 0 ? (
                      processedOrders.map((order, index) => (
                        <tr key={`${order.orderId}-${index}`} className="hover:bg-gray-50">
                          <td className="text-sm p-2">{order.orderId}</td>
                          <td className="text-sm p-2">{order.customerName}</td>
                          <td className="text-sm p-2">{order.productName}</td>
                          <td className="text-sm p-2">{order.warehouseName}</td>
                          <td className="text-sm p-2">{order.deliveryPincode}</td>
                          <td className="text-sm p-2">{order.quantity}</td>
                          <td className="text-sm p-2">₹{Number(order.price).toFixed(2)}</td>
                          <td className="text-sm p-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "Confirmed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-gray-500">
                          No purchase orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
                            {item.status == true ? (
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
