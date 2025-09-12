import React, { useEffect, useState } from "react";
import Layout from "@/Layouts/Layout";
import { getProductVariant, getSeo } from "@/apis/api";
import VariantDetails from "@/components/variantDetails/VariantDetails";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { id } = context.params;
  let productDetails = null;
  let mainProduct = null;
  let productSeo = null;

  try {
    const response = await getProductVariant(id);
    productDetails = response?.data?.data?.variant || null;
    mainProduct = response?.data?.data?.product || null;
    
    const seoRes = await getSeo(); // Fetch SEO data
    productSeo = seoRes.find((item) => item.product === productDetails?.productname1) || null;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  return {
    props: {
      productDetails,
      mainProduct,
      productId: id,
      productSeo
    },
  };
}

const SingleVariantDetails = ({ productDetails, mainProduct, productId, productSeo }) => {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setHydrated(true);
  }, []);

  return (
    <>
     <Head>
        <title>{productSeo?.meta_title || "Material Buy"}</title>
        <meta name="description" content={productSeo?.meta_description || "Default Description"} />
        <meta name="og:keywords" content={productSeo?.meta_keywords || "de  words"} />
        <meta property="og:title" content={productSeo?.meta_title || "Default Title"} />
        <meta property="og:description" content={productSeo?.meta_description || "Default Description"} />
        <meta property="og:image" content={productDetails?.imgs1 || "/default-image.jpg"} />
        <meta 
          property="og:url" 
          content={`https://materialbuy.com/variance/${productSeo?.url_structure}/${productDetails?._id || "default-url"}`}
        />
        
        {/* JSON-LD Product Schema */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": productDetails?.productname1 || "",
              "image": [
                productDetails?.imgs1 || "",
                productDetails?.imgs2 || "",
                productDetails?.imgs3 || "",
                productDetails?.imgs4 || "",
              ].filter(Boolean),
              "description": productSeo?.meta_description || productDetails?.productname1 || "",
              "sku": productDetails?.skuid5 || "",
              "brand": {
                "@type": "Brand",
                "name": productDetails?.manufacturer9 || "Material Buy"
              },
              "offers": {
                "@type": "Offer",
                "url": `https://materialbuy.com/variance/${productSeo?.url_structure || productSeo?.old_url || ""}/${productDetails?._id || ""}`,
                "priceCurrency": "INR",
                "price": productDetails?.discountprice2B || "",
                "itemCondition": "https://schema.org/NewCondition",
                "availability": productDetails?.stock6 && parseInt(productDetails.stock6) > 0 
                  ? "https://schema.org/InStock" 
                  : "https://schema.org/OutOfStock"
              },
              ...(productDetails?.rating && {
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": productDetails.rating.toString(),
                  "reviewCount": productDetails.reviewCount || "0"
                }
              }),
              ...(mainProduct && {
                "isVariantOf": {
                  "@type": "ProductModel",
                  "name": mainProduct.productname1 || ""
                }
              })
            })
          }}
        />
     </Head>

      <Layout>
        {hydrated ? (
          <VariantDetails
            productData={productDetails}
            productId={productId}
            mainProduct={mainProduct}
            user={user}
          />
        ) : (
          <div className="w-screen py-2 w-max-[1200px] h-[70vh] flex justify-center items-center bg-[#f3f3f3]">
            <h1>Loading...</h1>
          </div>
        )}
      </Layout>
    </>
  );
};

export default SingleVariantDetails;
