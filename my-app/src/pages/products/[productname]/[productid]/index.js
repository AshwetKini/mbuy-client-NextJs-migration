// import React, { useEffect, useState } from "react";
// import ProductDetails from "@/components/productDetails/ProductDetails";
// import Layout from "@/Layouts/Layout";
// import Head from "next/head";
// import { getProduct, getSeo } from "@/apis/api";

// function SingleProductDetails({ productsDetails, productSeo, productId }) {
//   const [user, setUser] = useState(null);
//   const [mainproduct, setMainProduct] = useState(null);
//   const [hydrated, setHydrated] = useState(false);


//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       try {
//         const userData = localStorage.getItem("user");
//         if (userData) {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//         }
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     }
//     setHydrated(true);
//   }, []);
//   console.log(productSeo,"SEOooooooooooooooooo");

//   return (
//     <>
//       <Head>
//         <title>{productSeo?.meta_title || "Material Buy"}</title>
//         <meta name="description" content={productSeo?.meta_description || "Default Description"} />
//         <meta name="og:keywords" content={productSeo?.meta_keywords || "de  words"} />
//         <meta property="og:title" content={productSeo?.meta_title || "Default Title"} />
//         <meta property="og:description" content={productSeo?.meta_description || "Default Description"} />
//         <meta property="og:image" content={productsDetails?.imgs1 || "/default-image.jpg"} />
//         <meta 
//           property="og:url" 
//           content={`https://materialbuy.com/${
//             productsDetails?.mainproductId ? "variance" : "products"
//           }/${productSeo?.url_structure}/${productsDetails?._id || "default-url"}`}
//         />
        
//         {/* JSON-LD Product Schema */}
//         <script 
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org/",
//               "@type": "Product",
//               "name": productsDetails?.productname1 || "",
//               "image": [
//                 productsDetails?.imgs1 || "",
//                 productsDetails?.imgs2 || "",
//                 productsDetails?.imgs3 || "",
//                 productsDetails?.imgs4 || "",
//               ].filter(Boolean),
//               "description": productSeo?.meta_description || productsDetails?.productname1 || "",
//               "sku": productsDetails?.skuid5 || "",
//               "brand": {
//                 "@type": "Brand",
//                 "name": productsDetails?.manufacturer9 || "Material Buy"
//               },
//               "offers": {
//                 "@type": "Offer",
//                 "url": `https://materialbuy.com/products/products/${productSeo?.url_structure || productSeo?.old_url || ""}/${productsDetails?._id || ""}`,
//                 "priceCurrency": "INR",
//                 "price": productsDetails?.discountprice2B || "",
//                 "itemCondition": "https://schema.org/NewCondition",
//                 "availability": productsDetails?.stock6 && parseInt(productsDetails.stock6) > 0 
//                   ? "https://schema.org/InStock" 
//                   : "https://schema.org/OutOfStock"
//               },
//               ...(productsDetails?.rating && {
//                 "aggregateRating": {
//                   "@type": "AggregateRating",
//                   "ratingValue": productsDetails.rating.toString(),
//                   "reviewCount": productsDetails.reviewCount || "0"
//                 }
//               })
//             })
//           }}
//         />
//       </Head>

//       <Layout>
//         {hydrated && productsDetails ? (
//           <ProductDetails
//             productData={productsDetails}
//             productId={productId}
//             mainproduct={productsDetails.mainproduct? productsDetails.mainproduct : productsDetails._id}
//             user={user}
//           />
//         ) : (
//           <div className="w-screen py-2 w-max-[1200px] h-[70vh] flex justify-center items-center bg-[#f3f3f3]">
//             <h1>Loading...</h1>
//           </div>
//         )}
//       </Layout>
//     </>
//   );
// }

// export async function getServerSideProps(context) {
//   const { productid } = context.params;
//   try {
//     const [productRes, seoRes] = await Promise.allSettled([
//       getProduct(productid),
//       // getVariant(productid),
//       getSeo(),
//     ]);

//     const productsDetails = productRes?.status === "fulfilled" ? productRes.value?.data?.data || {} : {};
    
//     // Debug logs to check the data
//     console.log("Product Details:", JSON.stringify(productsDetails, null, 2));
//     console.log("Product Name:", productsDetails?.productname1);
    
//     // Enhanced SEO matching logic
//     let productSeo = {};
//     if (seoRes?.status === "fulfilled" && Array.isArray(seoRes.value)) {
//       // First try exact match on product name
//       productSeo = seoRes.value.find((item) => item.product === productsDetails?.productname1) || {};
      
//       // If no match, try case-insensitive match
//       if (!productSeo._id && productsDetails?.productname1) {
//         const productName = productsDetails.productname1.toLowerCase();
//         productSeo = seoRes.value.find((item) => 
//           item.product && item.product.toLowerCase() === productName
//         ) || {};
//       }
      
//       // If still no match, try to match by old_url or url_structure
//       if (!productSeo._id && productsDetails?.productname1) {
//         const slug = productsDetails.productname1
//           .toLowerCase()
//           .replace(/[^a-z0-9]+/g, '-')
//           .replace(/^-+|-+$/g, '');
          
//         productSeo = seoRes.value.find((item) => 
//           (item.old_url && item.old_url.includes(slug)) || 
//           (item.url_structure && item.url_structure.includes(slug))
//         ) || {};
//       }
//     }

//     console.log("Selected SEO:", productSeo);

//     return {
//       props: {
//         productsDetails,
//         productSeo,
//         productId: productid,
//       },
//     };
//   } catch (err) {
//     console.error("Error fetching product:", err);
//     return { props: { productsDetails: {}, productSeo: {}, productId: productid } };
//   }
// }


// export default SingleProductDetails;

import React, { useEffect, useState } from "react";
import ProductDetails from "@/components/productDetails/ProductDetails";
import Layout from "@/Layouts/Layout";
import Head from "next/head";
import { getProduct, getSeo } from "@/apis/api";

function SingleProductDetails({ productsDetails, productSeo, productId }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setHydrated(true);
  }, []);

  const title = productSeo?.meta_title || productsDetails?.productname1 || "Material Buy";
  const description = productSeo?.meta_description || productsDetails?.productdescription || "Buy quality materials online";
  const slug = productSeo?.url_structure || productSeo?.old_url || productsDetails?.productname1 || productId;
  const pageUrl = `https://materialbuy.com/${productsDetails?.mainproductId ? "variance" : "products"}/${encodeURIComponent(slug)}/${productId}`;
  const imageUrl = productsDetails?.image1A
    ? productsDetails.image1A.startsWith("http")
      ? productsDetails.image1A
      : `https://materialbuy.com${productsDetails.image1A}`
    : "https://materialbuy.com/default-image.jpg";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph tags for social previews */}
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Material Buy" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* JSON-LD Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: productsDetails?.productname1 || title,
              image: [
                imageUrl,
                productsDetails?.image2A && `https://materialbuy.com${productsDetails.image2A}`,
                productsDetails?.image3A && `https://materialbuy.com${productsDetails.image3A}`,
                productsDetails?.image4A && `https://materialbuy.com${productsDetails.image4A}`
              ].filter(Boolean),
              description,
              sku: productsDetails?.skuid5 || "",
              brand: {
                "@type": "Brand",
                name: productsDetails?.manufacturer9 || "Material Buy"
              },
              offers: {
                "@type": "Offer",
                url: pageUrl,
                priceCurrency: "INR",
                price: productsDetails?.discountprice2B || productsDetails?.price2A || "",
                itemCondition: "https://schema.org/NewCondition",
                availability:
                  productsDetails?.stock6 && parseInt(productsDetails.stock6) > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock"
              },
              ...(productsDetails?.rating && {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: productsDetails.rating.toString(),
                  reviewCount: productsDetails.reviewCount?.toString() || "0"
                }
              })
            })
          }}
        />
      </Head>

      <Layout>
        {hydrated && productsDetails ? (
          <ProductDetails
            productData={productsDetails}
            productId={productId}
            mainproduct={productsDetails.mainproduct || productsDetails._id}
            user={user}
          />
        ) : (
          <div className="w-screen max-w-[1200px] h-[70vh] flex justify-center items-center bg-[#f3f3f3]">
            <h1>Loading...</h1>
          </div>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { productname, productid } = context.params;

  try {
    const [productRes, seoRes] = await Promise.allSettled([
      getProduct(productid),
      getSeo()
    ]);

    const productsDetails =
      productRes.status === "fulfilled"
        ? productRes.value?.data?.data || {}
        : {};

    let productSeo = {};
    if (seoRes.status === "fulfilled" && Array.isArray(seoRes.value)) {
      const seoList = seoRes.value;
      productSeo =
        seoList.find((item) => item.product === productsDetails.productname1) ||
        seoList.find(
          (item) =>
            item.product?.toLowerCase() ===
            productsDetails.productname1?.toLowerCase()
        ) ||
        seoList.find(
          (item) =>
            item.old_url?.includes(productsDetails.productname1)
        ) ||
        {};
    }

    return {
      props: {
        productsDetails,
        productSeo,
        productId: productid
      }
    };
  } catch (err) {
    console.error("Error fetching product:", err);
    return {
      props: {
        productsDetails: {},
        productSeo: {},
        productId: productid
      }
    };
  }
}

export default SingleProductDetails;
