// import React from "react";
// import ProductList from "@/components/productlist/ProductList";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import { getSubCategories, getoccational, getCategories } from "@/apis/api";
// import { AiFillHome } from "react-icons/ai";
// import { MdKeyboardArrowRight } from "react-icons/md";

// const categoryPage = ({ categories, occasionalProducts, category, categoryObject }) => {
//   const router = useRouter();
//   const formattedCategory = category.replace(/-/g, " ");
  
//   const capitalizeWords = (str) => {
//     if (!str) return '';
//     return str
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(' ');
//   };

//   const changethepage = (data) => {
//     if (data.subcategory) {
//       const formattedCategory = category ? category.replace(/-/g, " ") : "";
//       router.push(
//         `/allproducts/${formattedCategory.replace(/\s+/g, "-")}/${data.subcategory.replace(/\s+/g, "-")}`
//       );
//     }
//   };

//   const capitalizedCategory = capitalizeWords(formattedCategory);

//   return (
//     <>
//       <Head>
//         <title>{`${capitalizedCategory} - Browse Products | MaterialBuy`}</title>
//         <meta name="description" content={`Explore our wide range of ${capitalizedCategory} products. High-quality items curated just for you at MaterialBuy.`} />
//         <meta property="og:title" content={`${capitalizedCategory} - Browse Products | MaterialBuy`} />
//         <meta property="og:description" content={`Find the best ${capitalizedCategory} products in our store with great quality and competitive prices.`} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={`https://materialbuy.com/allproducts/${category}`} />
//       </Head>

//       <ProductList
//         categoriesArray={categories}
//         pagelocation={[
//           { 
//             title: <div className="flex items-center text-gray-600 hover:text-blue-600 transition-all">
//                     <AiFillHome className="text-xl" />
//                    </div>, 
//             path: "/" 
//           },
//           { 
//             title: <div className="flex items-center text-gray-900 font-medium">
//                     <MdKeyboardArrowRight className="mx-1 text-gray-500" />
//                     <span className="hover:text-blue-600 transition-all">{capitalizedCategory}</span>
//                    </div>, 
//             path: "" 
//           },
//         ]}
//         routechangehandler={changethepage}
//         nodatafound={!categories || categories.length === 0}
//         sidetabletitle={capitalizedCategory}
//         productarray={[]}
//         Occasion={occasionalProducts}
//         categoryObject={categoryObject}
//         currentpageq="categories"
//       />
//     </>
//   );
// };

// // 🔹 Fetch Data Server-Side
// export async function getServerSideProps(context) {
//   const { category = "" } = context.params || {}; 
//   const formattedCategory = category ? category.replace(/-/g, " ") : "";

//   try {
//     // Fetch categories
//     const allCategoriesData = (await getCategories()) || { data: [] };
//     const categoryObject = allCategoriesData?.find(
//       (item) => item.title.toLowerCase() === formattedCategory.toLowerCase()
//     ) || null;

//     // Fetch subcategories
//     const subcategoriesData = (await getSubCategories()) || { data: [] };
//     const filteredSubcategories = subcategoriesData?.data?.filter(
//       (item) => item.categoryname?.toLowerCase() === formattedCategory.toLowerCase()
//     ) || [];

//     // Fetch occasional products
//     const occasionData = (await getoccational()) || [];
//     const filteredOccasions = occasionData?.filter(
//       (occasion) => occasion?.categoryname?.toLowerCase() === formattedCategory.toLowerCase()
//     ) || [];

//     return {
//       props: {
//         categories: filteredSubcategories,
//         occasionalProducts: filteredOccasions,
//         category,
//         categoryObject, // Pass the matched category object
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         categories: [],
//         occasionalProducts: [],
//         category: "",
//         categoryObject: null,
//       },
//     };
//   }
// }

// export default categoryPage;

// updated code 
// import React from "react";
// import ProductList from "@/components/productlist/ProductList";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import { getSubCategories, getoccational, getCategories } from "@/apis/api";
// import { AiFillHome } from "react-icons/ai";
// import { MdKeyboardArrowRight } from "react-icons/md";

// // FIXED: Convert clean slug back to searchable category name with proper capitalization
// const cleanSlugToTitle = (slug) => {
//   if (!slug) return '';
//   return slug
//     .replace(/-/g, ' ')                    // Replace hyphens with spaces
//     .split(' ')                           // Split into words
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
//     .join(' ');                           // Join back together
// };

// // IMPORTANT: Create a mapping object for exact matches
// const SLUG_TO_CATEGORY = {
//   'bed-bath': 'Bed & Bath',
//   'tools-machineries': 'Tools & Machineries', 
//   'sheet-panel': 'Sheet & Panel',
//   'hardware': 'Hardware',
//   'kitchen': 'Kitchen',
//   'flooring': 'Flooring',
//   'roofing': 'Roofing',
//   'decor': 'Decor',
//   'building-material': 'Building Material',
//   // Add more mappings as needed
// };

// const categoryPage = ({ categories, occasionalProducts, category, categoryObject }) => {
//   const router = useRouter();
  
//   // Get proper display title using the mapping with proper capitalization
//   const displayTitle = SLUG_TO_CATEGORY[category] || cleanSlugToTitle(category);
  
//   const changethepage = (data) => {
//     if (data.subcategory) {
//       // Use clean slug for URL
//       const cleanCategorySlug = category; // Already clean from URL
//       router.push(
//         `/allproducts/${cleanCategorySlug}/${data.subcategory.replace(/\s+/g, "-").toLowerCase()}`
//       );
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>{`${displayTitle} - Browse Products | MaterialBuy`}</title>
//         <meta name="description" content={`Explore our wide range of ${displayTitle} products. High-quality items curated just for you at MaterialBuy.`} />
//         <meta property="og:title" content={`${displayTitle} - Browse Products | MaterialBuy`} />
//         <meta property="og:description" content={`Find the best ${displayTitle} products in our store with great quality and competitive prices.`} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={`https://materialbuy.com/allproducts/${category}`} />
//       </Head>
//       <ProductList
//         categoriesArray={categories}
//         pagelocation={[
//           { 
//             title: <div className="flex items-center text-gray-600 hover:text-blue-600 transition-all">
//                     <AiFillHome className="text-xl" />
//                    </div>, 
//             path: "/" 
//           },
//           { 
//             title: <div className="flex items-center text-gray-900 font-medium">
//                     <MdKeyboardArrowRight className="mx-1 text-gray-500" />
//                     <span className="hover:text-blue-600 transition-all">{displayTitle}</span>
//                    </div>, 
//             path: "" 
//           },
//         ]}
//         routechangehandler={changethepage}
//         nodatafound={!categories || categories.length === 0}
//         sidetabletitle={displayTitle}
//         productarray={[]}
//         Occasion={occasionalProducts}
//         categoryObject={categoryObject}
//         currentpageq="categories"
//       />
//     </>
//   );
// };

// // 🔹 Fetch Data Server-Side
// export async function getServerSideProps(context) {
//   const { category = "" } = context.params || {}; 
  
//   // Convert clean slug to proper category name for API calls
//   const properCategoryName = SLUG_TO_CATEGORY[category] || cleanSlugToTitle(category);
  
//   console.log('Category slug from URL:', category);
//   console.log('Converted to proper name:', properCategoryName);
  
//   try {
//     // Fetch categories
//     const allCategoriesData = (await getCategories()) || { data: [] };
//     const categoryObject = allCategoriesData?.find(
//       (item) => item.title?.toLowerCase() === properCategoryName.toLowerCase()
//     ) || null;
    
//     // Fetch subcategories
//     const subcategoriesData = (await getSubCategories()) || { data: [] };
//     const filteredSubcategories = subcategoriesData?.data?.filter(
//       (item) => item.categoryname?.toLowerCase() === properCategoryName.toLowerCase()
//     ) || [];
    
//     // Fetch occasional products
//     const occasionData = (await getoccational()) || [];
//     const filteredOccasions = occasionData?.filter(
//       (occasion) => occasion?.categoryname?.toLowerCase() === properCategoryName.toLowerCase()
//     ) || [];

//     return {
//       props: {
//         categories: filteredSubcategories,
//         occasionalProducts: filteredOccasions,
//         category, // Keep original slug for URL generation
//         categoryObject, // Pass the matched category object
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         categories: [],
//         occasionalProducts: [],
//         category: "",
//         categoryObject: null,
//       },
//     };
//   }
// }

// export default categoryPage;

import React from "react";
import ProductList from "@/components/productlist/ProductList";
import { useRouter } from "next/router";
import Head from "next/head";
import { getSubCategories, getoccational, getCategories } from "@/apis/api";
import { AiFillHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
//  NEW: Import enhanced metadata system 
import { getCategoryMetadata, generateStructuredData, generateSEOTags } from '../../../config/metadata';

// FIXED: Convert clean slug back to searchable category name with proper capitalization
const cleanSlugToTitle = (slug) => {
  if (!slug) return '';
  return slug
    .replace(/-/g, ' ')                    // Replace hyphens with spaces
    .split(' ')                           // Split into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' ');                           // Join back together
};

// IMPORTANT: Create a mapping object for exact matches
const SLUG_TO_CATEGORY = {
  'bed-bath': 'Bed & Bath',
  'tools-machineries': 'Tools & Machineries', 
  'sheet-panel': 'Sheet & Panel',
  'hardware': 'Hardware',
  'kitchen': 'Kitchen',
  'flooring': 'Flooring',
  'roofing': 'Roofing',
  'decor': 'Decor',
  'building-material': 'Building Material',
  // Add more mappings as needed
};

const categoryPage = ({ categories, occasionalProducts, category, categoryObject }) => {
  const router = useRouter();
  
  // Get proper display title using the mapping with proper capitalization
  const displayTitle = SLUG_TO_CATEGORY[category] || cleanSlugToTitle(category);
  
  //  NEW: Enhanced metadata with fallbacks 
  const metadata = getCategoryMetadata ? getCategoryMetadata(category) : {
    title: `${displayTitle} - Browse Products | MaterialBuy`,
    description: `Explore our wide range of ${displayTitle} products. High-quality items curated just for you at MaterialBuy.`,
    keywords: `${displayTitle.toLowerCase()}, materialbuy, building materials, online shopping india`,
    canonicalUrl: `https://materialbuy.com/allproducts/${category}`,
    image: { url: "https://materialbuy.com/logo.png", alt: `${displayTitle} - MaterialBuy` },
    ogImage: { url: "https://materialbuy.com/logo.png", alt: `${displayTitle} products`, width: 1200, height: 630, type: "image/png" },
    twitterImage: { url: "https://materialbuy.com/logo.png", alt: `${displayTitle} - MaterialBuy` },
    ogTitle: `${displayTitle} - Browse Products | MaterialBuy`,
    ogDescription: `Find the best ${displayTitle} products in our store with great quality and competitive prices.`,
    twitterTitle: `${displayTitle} - Browse Products | MaterialBuy`,
    twitterDescription: `Find the best ${displayTitle} products in our store with great quality and competitive prices.`,
    lastModified: new Date().toISOString()
  };
  
  const seoTags = generateSEOTags ? generateSEOTags(metadata) : {
    robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    author: "MaterialBuy",
    publisher: "MaterialBuy",
    language: "en-IN",
    geoRegion: "IN",
    themeColor: "#1f2937"
  };
  
  const structuredData = generateStructuredData ? generateStructuredData('category', metadata, {
    numberOfItems: categories?.length || 0
  }) : {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": displayTitle,
    "description": metadata.description,
    "url": `https://materialbuy.com/allproducts/${category}`
  };
  
  const changethepage = (data) => {
    if (data.subcategory) {
      // Use clean slug for URL
      const cleanCategorySlug = category; // Already clean from URL
      router.push(
        `/allproducts/${cleanCategorySlug}/${data.subcategory.replace(/\s+/g, "-").toLowerCase()}`
      );
    }
  };

  return (
    <>
      <Head>
        {/*  ENHANCED METADATA SYSTEM (REPLACES BASIC META TAGS) */}
        
        {/* Primary Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        
        {/*  Canonical URL */}
        <link rel="canonical" href={metadata.canonicalUrl} />
        
        {/*  Primary Image with Alt Text */}
        <meta name="image" content={metadata.image.url} />
        <meta name="image:alt" content={metadata.image.alt} />
        
        {/*  Open Graph Meta Tags with Images */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MaterialBuy" />
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:url" content={metadata.canonicalUrl} />
        <meta property="og:image" content={metadata.ogImage.url} />
        <meta property="og:image:alt" content={metadata.ogImage.alt} />
        <meta property="og:image:width" content={metadata.ogImage.width} />
        <meta property="og:image:height" content={metadata.ogImage.height} />
        <meta property="og:image:type" content={metadata.ogImage.type} />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:updated_time" content={metadata.lastModified} />
        
        {/*  Twitter Card Meta Tags with Images */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MaterialBuy" />
        <meta name="twitter:creator" content="@MaterialBuy" />
        <meta name="twitter:title" content={metadata.twitterTitle} />
        <meta name="twitter:description" content={metadata.twitterDescription} />
        <meta name="twitter:image" content={metadata.twitterImage.url} />
        <meta name="twitter:image:alt" content={metadata.twitterImage.alt} />
        
        {/*  SEO Tags */}
        <meta name="robots" content={seoTags.robots} />
        <meta name="author" content={seoTags.author} />
        <meta name="publisher" content={seoTags.publisher} />
        <meta name="language" content={seoTags.language} />
        <meta name="geo.region" content={seoTags.geoRegion} />
        <meta name="theme-color" content={seoTags.themeColor} />
        
        {/* 📱 Mobile & Performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* 🚀 Performance Hints */}
        <link rel="preconnect" href="https://materialbuy.com" />
        <link rel="dns-prefetch" href="//materialbuy.com" />
        
        {/* 📄 Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* 📍 Enhanced Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        {/* 🔧 Category-specific Meta */}
        <meta name="category" content={displayTitle} />
        <meta name="subcategory-count" content={categories?.length || 0} />
        <meta name="page-type" content="category" />
      </Head>
      
      {/* 🎯 ALL YOUR EXISTING PRODUCTLIST COMPONENT - EXACTLY THE SAME */}
      <ProductList
        categoriesArray={categories}
        pagelocation={[
          { 
            title: <div className="flex items-center text-gray-600 hover:text-blue-600 transition-all">
                    <AiFillHome className="text-xl" />
                   </div>, 
            path: "/" 
          },
          { 
            title: <div className="flex items-center text-gray-900 font-medium">
                    <MdKeyboardArrowRight className="mx-1 text-gray-500" />
                    <span className="hover:text-blue-600 transition-all">{displayTitle}</span>
                   </div>, 
            path: "" 
          },
        ]}
        routechangehandler={changethepage}
        nodatafound={!categories || categories.length === 0}
        sidetabletitle={displayTitle}
        productarray={[]}
        Occasion={occasionalProducts}
        categoryObject={categoryObject}
        currentpageq="categories"
      />
    </>
  );
};

// 🔹 Fetch Data Server-Side - EXACTLY THE SAME AS YOUR EXISTING CODE
export async function getServerSideProps(context) {
  const { category = "" } = context.params || {}; 
  
  // Convert clean slug to proper category name for API calls
  const properCategoryName = SLUG_TO_CATEGORY[category] || cleanSlugToTitle(category);
  
  console.log('Category slug from URL:', category);
  console.log('Converted to proper name:', properCategoryName);
  
  try {
    // Fetch categories
    const allCategoriesData = (await getCategories()) || { data: [] };
    const categoryObject = allCategoriesData?.find(
      (item) => item.title?.toLowerCase() === properCategoryName.toLowerCase()
    ) || null;
    
    // Fetch subcategories
    const subcategoriesData = (await getSubCategories()) || { data: [] };
    const filteredSubcategories = subcategoriesData?.data?.filter(
      (item) => item.categoryname?.toLowerCase() === properCategoryName.toLowerCase()
    ) || [];
    
    // Fetch occasional products
    const occasionData = (await getoccational()) || [];
    const filteredOccasions = occasionData?.filter(
      (occasion) => occasion?.categoryname?.toLowerCase() === properCategoryName.toLowerCase()
    ) || [];

    return {
      props: {
        categories: filteredSubcategories,
        occasionalProducts: filteredOccasions,
        category, // Keep original slug for URL generation
        categoryObject, // Pass the matched category object
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categories: [],
        occasionalProducts: [],
        category: "",
        categoryObject: null,
      },
    };
  }
}

export default categoryPage;
