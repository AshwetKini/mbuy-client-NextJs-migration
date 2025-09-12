import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const host = "http://localhost:8000";
// const host = "https://mbuy-server.onrender.com";
// const host1 = "https://logistics-deepcoomer.vercel.app"; An
// const host = "https://myclient-backend.onrender.com"; An
const host1 = "https://logistic.mbuybackend.in";
const host = "https://walrus-app-6xm2k.ondigitalocean.app/admin-backend2";


export const getCareers = async () => {
  try {
    const response = await axios.get(`${host}/api/careers`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//host1
export const getBuyerdata = async () => {
  try {
    const response = await axios.get(`${host1}/api/buyerdata`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postVendor = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/vendors`, data, { headers });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getVendor = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/vendors/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const CreatePrebFab = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/prefabbenquiry`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTerms = async () => {
  try {
    const response = await axios.get(`${host}/api/ts`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getest = async () => {
  try {
    const response = await axios.get(`${host}/api/est`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};



export const getCarousel = async (data) => {
  try {
    const response = await axios.get(`${host}/api/caurausals`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBanners = async (data) => {
  try {
    const response = await axios.get(`${host}/api/banners`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPrivacyPolicy = async () => {
  try {
    const response = await axios.get(`${host}/api/privacypolicy`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersStatus = async (token) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/orders/user`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const cancelOrder = async (status, userId, productId, orderId) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.patch(
      `${host}/api/orders/${userId}/${productId}/${orderId}`,
      status,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDod = async (data) => {
  try {
    const response = await axios.get(`${host}/api/products/dod/get`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShippingPolicy = async () => {
  try {
    const response = await axios.get(`${host}/api/shippingpolicies`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecommendedProduct = async () => {
  try {
    const response = await axios.get(`${host}/api/products/recommended/get`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getReturnPolicy = async () => {
  try {
    const response = await axios.get(`${host}/api/rrcpolicy`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async (data) => {
  try {
    const response = await axios.get(`${host}/api/categories`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postUserLogin = async (data) => {
  try {
    const response = await axios.post(`${host}/api/users/login`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postUserRegister = async (data) => {
  try {
    const response = await axios.post(`${host}/api/users/register`, data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.errors);
    // console.log(error)
    return error;
  }
};

export const getUser = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/users/${id}`, { headers });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const productDetailsWithID = async (id) => {
  try {
    const response = await axios.get(`${host}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const freqdataswithID = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${host}/api/products/varient/${id}`, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const varianceDetailsWithID = async (id, varId) => {
  try {
    const response = await axios.get(
      `${host}/api/products/variance/${id}/${varId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(`${host}/api/users/edituser/${id}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateManageAddress = async (id, data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${host}/api/address/editaddress/${id}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getaddresses = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/addresses`, { headers });
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllProfessionalsCategories = async () => {
  try {
    const response = await axios.get(`${host}/api/professionalcategories`);
    return response;
  } catch (error) {
    return error;
  }
};

export const postProfessional = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/professionals`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const UploadFile = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let response = await axios.post(
      `${host}/api/categories/file/upload`,
      data,
      { headers }
    );
    return response;
  } catch (error) {
    console.log("error in upload", error);
  }
};

export const postQuote = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/quotations`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get(`${host}/api/services`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getSingleServices = async (id) => {
  try {
    const response = await axios.get(`${host}/api/services/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getSubCategories = async () => {
  try {
    // console.log("got here")
    const response = await axios.get(`${host}/api/subcategories`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getSubSubCategories = async () => {
  try {
    const response = await axios.get(`${host}/api/subsubcategories`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getSubSubProduct = async (subsubcategoryname) => {
  try {
    const response = await axios.get(
      `${host}/api/products/subsubcategory/${subsubcategoryname}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getCategoryProduct = async (subProduct) => {
  try {
    const response = await axios.get(
      `${host}/api/products/category/${subProduct}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getSubCategoryProduct = async (subSubProduct) => {
  try {
    const response = await axios.get(
      `${host}/api/products/subcategory/${subSubProduct}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

//changes
export const getAllProducts = async (query) => {
  try {
    console.log(query, "query");
    if (query) {
      const response = await axios.get(
        `${host}/api/products/all?productName=${query}`
      );
      return response;
    } else {
      const response = await axios.get(`${host}/api/products/all`);
      return response;
    }
  } catch (error) {
    return error;
  }
};

//newadded
export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${host}/api/products/${id}`);
    return response;
    
  } catch (error) {
    return error;
  }
};

//newadded
export const getVariant = async (varianceId) => {
  try {
    const response = await axios.get(`${host}/api/products/variant/${varianceId}`);
    return response;
  } catch (error) {
    return error;
  }
};


export const addWishlist = async (data) => {
  try {
    const token = localStorage.getItem("authToken");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/wishlists`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const getWishlist = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    console.log(token, "token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/wishlists/${id}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteWishList = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(`${host}/api/wishlists`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getProfessionals = async () => {
  try {
    const response = await axios.get(`${host}/api/professionals`);
    return response;
  } catch (error) {
    return error;
  }
};

export const postCart = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/carts`, data, { headers });
    return response;
  } catch (error) {
    return error;
  }
};

export const getCart = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/carts/${id}`, { headers });
    return response;
  } catch (error) {
    return error;
  }
};

export const getPromoCodes = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/promocodes`, { headers });
    return response;
  } catch (error) {
    return error;
  }
};
export const getCssDeals = async (category) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/css?${category}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postOrderPayment = async (data) => {


  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/orders/pay`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const paymentStatus = async (data) => {


  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/orders/save`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getOrders = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/orders/${id}`, { headers });
    return response;
  } catch (error) {
    return error;
  }
};

export const getVendorProfileByUser = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/vendors/getbyuser/${id}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postWarehouse = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/warehouses`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getWarehousebyvendor = async (email) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${host}/api/warehouses/?email=${email}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteWareHouse = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(`${host}/api/warehouses/${id}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postProductRequest = async (data) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${host}/api/productrequests`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getProductRequest = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${host}/api/productrequests/vendor/${id}`,
      { headers }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteProductRequest = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(`${host}/api/productrequests/${id}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

// export const getProdVariant = async (productid, variancid) => {
//   try {
//     const response = await axios.get(
//       `${host}/api/products/productVariance/${productid}/${variancid}`
//     );
//     return response;
//   } catch (error) {
//     return error;
//   }
// };
//newadded
// export const getProduct = async (mainproductid, variantname) => {
//   try {
//     const token = localStorage.getItem("authToken");
//     const headers = {
//       Authorization: `Bearer ${token}`,
//     };

//     const response = await axios.get(
//       `${host}/api/products/productVariant/${mainproductid}/${variantname}`, { headers }
//     );
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

export const getProductVariant = async (id) => {
  try {
    // const token = localStorage.getItem("authToken");
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };

    const response = await axios.get(
      `${host}/api/products/productVariant/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getmainproductname = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${host}/api/products/mainproduct/${id}`, { headers }
    );
    return response;

  } catch (error) {
    return error;
  }
}

export const forgotPassword = async ({ phoneno, otp, newpassword }) => {
  try {
    const response = await axios.post(`${host}/api/forgotpassword`, { phoneno, otp, newpassword });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const resetPassword = async ({ userId, token, password }) => {
  try {
    const response = await axios.post(
      `${host}/api/forgotpassword/${userId}/${token}`,
      { password }
    );
    return response;
  } catch (error) {
    return error;
  }
};
//host1
export const shippingPrice = async (values) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`${host1}/api/shipping`, values, { headers });
    return response;
  } catch (error) {
    console.error('Error in shippingPrice API:', error);
    throw error; // Re-throw the error to allow the calling code to handle it
  }
};

export const getSlugName = async (productName) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${host}/api/seo/product/${productName}`,{headers});

    return response;
  } catch (error) {
    return error;
  }
}



