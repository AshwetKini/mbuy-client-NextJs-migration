// import React, { useEffect, useState } from "react";
// import Fullcontainer from "../components/UI/Fullcontainer";
// // import Container from "../components/UI/Container";
// import Styles from "./Home.module.css"; // Adjust the path if needed
// // import MultiCarousel from "../components/carousel/MultiCarousel";
// // import SingleCarousel from "../components/carousel/SingleCarousel";
// // import SubcategoriesCarousel from "../components/carousel/SubcategoriesCarousel";

// // import bann1 from "../../public/MaterialBuy Now Pay Later.webp";
// // import bann2 from "../../public/Our Partners.webp";
// // import bann3 from "../../public/What clients say.webp";
// import {
//   getCarousel,
//   getBanners,
//   getDod,
//   getRecommendedProduct,
//   getCategories,
//   getSubCategories,
// } from "../apis/api";
// import Layout from "../Layouts/Layout";
// import Head from "next/head";
// import Image from "next/image";
// // import AnimatedTestimonials from "@/components/AnimatedTestimonals";
// // import Partners from "@/components/Partners";
// import dynamic from "next/dynamic";
// // import MultiCarousel from "@/components/carousel/MultiCarousel";

// const Partners = dynamic(() => import("@/components/Partners"), { ssr: false });

// const SingleCarousel = dynamic(
//   () => import("@/components/carousel/SingleCarousel"),
//   { ssr: false }
// );
// const AnimatedTestimonials = dynamic(
//   () => import("@/components/AnimatedTestimonals"),
//   { ssr: false }
// );

// const Home = () => {
//   const [loading, setLoading] = useState(true);
//   const [subCategories, setSubCategories] = useState(null);
//   const [carouselImages, setCarouselImages] = useState(null);
//   const [dodData, setDodData] = useState(null);
//   const [recommendedData, setRecommendedData] = useState(null);
//   const [categories, setCategories] = useState(null);
//   const [featuredCategories, setFeaturedCategories] = useState([]);
//   const [topCategories, setTopCategories] = useState([]);
//   const [bannerImages, setBannerImages] = useState(null);
//   const [Sbanner, setSbanner] = useState(null);
//   const [MultiCarouselComponent, setMultiCarouselComponent] = useState(null);
//   const [showModal, setShowModal] = useState(false);
  
//     useEffect(() => {
//       const storedPincode = localStorage.getItem('pincode');
//       if (!storedPincode) {
//         setShowModal(true); // Show modal only if no pincode is stored
//       }
//     }, []);

//   useEffect(() => {
//     const fetchPrimaryData = async () => {
//       try {
//         const [carouselResponse, bannerResponse] = await Promise.all([
//           getCarousel(),
//           getBanners(),
//         ]);
  
//         setCarouselImages(carouselResponse?.[0] ? Object.values(carouselResponse[0]).slice(0, 5) : []);
//         setBannerImages(bannerResponse?.[0] ? Object.values(bannerResponse[0]).slice(0, 8) : []);
//         setSbanner(carouselResponse?.[0]?.banner || "");
//       } catch (error) {
//         console.error("Error fetching primary data:", error);
//       }
//     };
  
//     fetchPrimaryData();
//     setTimeout(async () => {
//       try {
//         const [categoriesResponse, dodResponse, recommendedResponse, subcategoriesResponse] = await Promise.all([
//           getCategories(),
//           getDod(),
//           getRecommendedProduct(),
//           getSubCategories(),
//         ]);

//       const featuredCats = categoriesResponse?.filter(cat => cat.isFeatured === true) || [];
//         const topCats = categoriesResponse?.filter(cat => cat.isTopProduct === true) || [];
//         const topSubCats = subcategoriesResponse?.data?.filter(subcat => subcat.isTopProduct === true) || [];
        
//         const featuredSubCats = subcategoriesResponse?.data?.filter(subcat => subcat.isFeatured === true) || [];
    

//         setFeaturedCategories([...featuredCats, ...featuredSubCats]);
//         setTopCategories([...topCats, ...topSubCats]);
        
//         setDodData([...(dodResponse?.product || []), ...(dodResponse?.allVariations || [])]);
//         setRecommendedData([...(recommendedResponse?.products || []), ...(recommendedResponse?.allVariations || [])]);
//         setSubCategories(subcategoriesResponse?.data || []);
//         setCategories(categoriesResponse || []);
//       } catch (error) {
//         console.error("Error fetching secondary data:", error);
//       } finally {
//         setLoading(false);
//         const MultiCarousel = dynamic(
//           () => import("@/components/carousel/MultiCarousel"),
//           { ssr: true }
//         );
//         setMultiCarouselComponent(<MultiCarousel />);
//       }
//     }, 1000); 
//   }, []);
  


//   console.log(featuredCategories , topCategories, "categories");

//   // if (loading) {
//   //   return (
//   //     <div className="fixed inset-0 bg-blue-950 flex flex-col items-center justify-center z-50">
//   //       <div className="flex flex-col items-center justify-center gap-4">
//   //         <svg
//   //           aria-hidden="true"
//   //           className="w-12 h-12 text-white animate-spin"
//   //           viewBox="0 0 100 101"
//   //           fill="none"
//   //           xmlns="http://www.w3.org/2000/svg"
//   //         >
//   //           <path
//   //             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//   //             fill="currentColor"
//   //             opacity="0.3"
//   //             className="animate-pulse"
//   //           />
//   //           <path
//   //             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//   //             fill="currentColor"
//   //             className="animate-spin"
//   //             style={{
//   //               transformOrigin: 'center',
//   //               animation: 'spin 1s linear infinite',
//   //             }}
//   //           />
//   //         </svg>
//   //         <h1 className="text-white text-xl font-medium animate-pulse">Loading...</h1>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // 🎨 ENHANCED: Professional loading screen (REPLACE YOUR EXISTING if (loading) BLOCK)
// if (loading) {
//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-950 to-blue-900 flex flex-col items-center justify-center z-50">
//       <div className="flex flex-col items-center justify-center gap-6">
//         {/* Premium loading animation */}
//         <div className="relative">
//           <svg
//             aria-hidden="true"
//             className="w-16 h-16 text-white animate-spin"
//             viewBox="0 0 100 101"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//               fill="currentColor"
//               opacity="0.2"
//               className="animate-pulse"
//             />
//             <path
//               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7766 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//               fill="currentColor"
//               className="animate-spin"
//               style={{
//                 transformOrigin: 'center',
//                 animation: 'spin 1.5s linear infinite',
//               }}
//             />
//           </svg>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
//           </div>
//         </div>
        
//         {/* Loading text with animation */}
//         <div className="text-center">
//           <h1 className="text-white text-2xl font-bold animate-pulse mb-2">
//             MaterialBuy
//           </h1>
//           <p className="text-blue-200 text-lg animate-bounce">
//             Loading premium materials...
//           </p>
//         </div>
        
//         {/* Loading progress indicator */}
//         <div className="w-64 h-1 bg-blue-800 rounded-full overflow-hidden">
//           <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse"></div>
//         </div>
//       </div>
//     </div>
//   );
// }


//   return (
//     <>
//       <Head>
//         <meta
//           name="description"
//           content="Material Buy: Explore premium finishes, accessories, and building supplies that combine quality with sophistication. Perfect for every design need"
//         />
//       </Head>
//       <Layout>
//         <Fullcontainer className={Styles.fullcontainer}>
//           <div className={`${Styles.Container} w-full bg-white p-0`}>
//             {carouselImages && bannerImages ? (
//               <>
//                 <div className="w-full flex flex-col md:flex-row verflow-x-hidden">
//                   <div className=" max-w-full md:max-w-full md:w-full ">
//                     <SingleCarousel mainCarouselData={carouselImages} />
//                   </div>
//                   <Image src={Sbanner} alt="banner Image" width={600} height={500} />
//                 </div>
//                 {dodData && dodData.length > 0 && MultiCarouselComponent && (
//                   React.cloneElement(MultiCarouselComponent, {
//                     multiCarouselData: dodData,
//                     titleof: "Deals of the Day",
//                     datatype: "deals-of-the-day",
//                   })
//                 )}
//                 <Image
//                   src={bannerImages[0]}
//                   alt="banner Image 1"
//                   width={2000}
//                   height={600}
//                   className="rounded-md min-h-52 my-4"
//                   loading="lazy"
//                   // placeholder="blur"
//                   // blurDataURL={bannerImages[0]}
//                 />
//   {topCategories && topCategories.length > 0 && MultiCarouselComponent && (
//                 React.cloneElement(MultiCarouselComponent, {
//                   multiCarouselData: topCategories,
//                   titleof: "Top Categories",
//                   datatype: "categories",
//                 })
//               )}

//                 <Image
//                   src={bannerImages[1]}
//                   alt="banner Image 2"
//                   width={2000}
//                   height={400}
//                   className="rounded-md min-h-52 my-4"
//                   loading="lazy"
//                   // placeholder="blur"
//                   // blurDataURL={bannerImages[1]}
//                 />

//                 {recommendedData && recommendedData.length > 0 && MultiCarouselComponent && (
//                   React.cloneElement(MultiCarouselComponent, {
//                     multiCarouselData: recommendedData,
//                     titleof: "Popular Picks",
//                     datatype: "popular-picks",
//                   })
//                 )}

//                 <Image
//                   src={bannerImages[2]}
//                   alt="banner Image 3"
//                   width={2000}
//                   height={400}
//                   className="rounded-md min-h-52 my-4"
//                   loading="lazy"
//                   // placeholder="blur"
//                   // blurDataURL={bannerImages[2]}
//                 />

// {featuredCategories && featuredCategories.length > 0 && MultiCarouselComponent && (
  
//                 React.cloneElement(MultiCarouselComponent, {
//                   multiCarouselData: featuredCategories,
//                   titleof: "Featured Categories",
//                   datatype: "categories",
//                 })
// )}

//                 <Image
//                   src={bannerImages[3]}
//                   alt="banner Image 4"
//                   width={2000}
//                   height={400}
//                   className="rounded-md min-h-52 my-4"
//                   loading="lazy"
//                   // placeholder="blur"
//                   // blurDataURL={bannerImages[3]}
//                 />

//                 <div className="px-2 mt-4">
//                   <div className="flex  items-center relative w-full justify-center">
//                     <h2 className="text-4xl font-bold tracking-wide ">
//                       {"More to"}{" "}
//                       <span className="text-yellow-500">{"Explore"}</span>
//                     </h2>
//                   </div>
//                   <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5 py-4">
//                     <div className="flex flex-col justify-center items-center space-y-2">
//                       <span className="w-full aspect-square max-w-[280px]">
//                         <Image
//                           src={bannerImages[4]}
//                           alt="banner Image 5"
//                           width={2000}
//                           height={400}
//                           className="rounded-md h-full w-full object-cover"
//                           loading="lazy"
//                           // placeholder="blur"
//                           // blurDataURL={bannerImages[4]}
//                         />
//                       </span>
//                       <span className="font-black text-lg md:text-xl lg:text-2xl text-blue-950 tracking-wide">
//                         Roof Shingles
//                       </span>
//                       <span className="font-light text-gray-700 text-sm md:text-base text-center md:tracking-wide">
//                       Timeless Protection, Unmatched Style
//                       </span>
//                     </div>
//                     <div className="flex flex-col justify-center items-center space-y-2">
//                     <span className="w-full aspect-square max-w-[280px]">
//                     <Image
//                           src={bannerImages[5]}
//                           alt="banner Image 6"
//                           width={2000}
//                           height={400}
//                           className="rounded-md h-full w-full object-cover"
//                           loading="lazy"
//                           placeholder="blur"
//                           blurDataURL={"/Kitchenproduct-mock.jpg"}
//                         />
//                       </span>
//                       <span className="font-black text-lg md:text-xl lg:text-2xl text-blue-950 tracking-wide">
//                         Modular Kitchen
//                       </span>
//                       <span className="font-light text-gray-700 text-sm md:text-base text-center md:tracking-wide">
//                       Your Culinary Haven
//                       </span>
//                     </div>
//                     <div className="flex flex-col justify-center items-center space-y-2">
//                     <span className="w-full aspect-square max-w-[280px]">
//                        <Image
//                           src={bannerImages[6]}
//                           alt="banner Image 7"
//                           width={2000}
//                           height={400}
//                           className="rounded-md h-full w-full object-cover"
//                           loading="lazy"
//                           // placeholder="blur"
//                           // blurDataURL={bannerImages[6]}
//                         />
//                       </span>
//                       <span className="font-black text-blue-950 text-lg md:text-xl lg:text-2xl tracking-wide">
//                       False Ceiling
//                       </span>
//                       <span className="font-light text-gray-700 text-sm md:text-base text-center md:tracking-wide">
//                       Elevate Your Space
//                       </span>
//                     </div>
//                     <div className="flex flex-col justify-center items-center space-y-2">
//                     <span className="w-full aspect-square max-w-[280px]">
//                     <Image
//                           src={bannerImages[7]}
//                           alt="banner Image 8 "
//                           width={2000}
//                           height={400}
//                           className="rounded-md h-full w-full object-cover"
//                           loading="lazy"
//                           // placeholder="blur"
//                           // blurDataURL={bannerImages[6]}
//                         />
//                       </span>
//                       <span className="font-black text-blue-950 text-lg md:text-xl lg:text-2xl tracking-wide">
//                       Wooden Houses
//                       </span>
//                       <span className="font-light text-gray-700 text-sm md:text-base text-center md:tracking-wide">
//                       Cozy, Classic, Contemporary
//                       </span>
//                     </div>
//                   </div>
//                 </div>

               
//                 <div className="grid md:grid-cols-1 py-4 md:py-8 gap-4 px-2 grid-cols-1">
//                   <Image
//                     src="/MaterialBuy Now Pay Later.webp"
//                     alt="MaterialBuy Now Pay Later"
//                     className="h-full w-full object-contain"
//                     width={1000}
//                     height={500}
//                     // loading="lazy"
//                     // placeholder="blur"
//                   />
//                   <div className="px-2 mt-4">
//                     <div className="flex items-center relative w-full justify-center">
//                       <h2 className="text-xl md:text-3xl lg::text-5xl font-bold tracking-wide mb-3">
//                         {"Our"}{" "}
//                         <span className="text-yellow-500">{"Partners"}</span>
//                       </h2>
//                     </div>
//                     <Partners />
//                   </div>
//                   {/* <Image
//                     src={bann2.src}
//                     alt="Our Partners"
//                     className="h-full w-full object-contain"
//                     width={1000}
//                     height={500}
//                   /> */}
//                   {/* <Image
//                     src={bann3.src}
//                     alt="What Clients Say"
//                     className="h-full w-full object-contain"
//                     width={1000}
//                     height={500}
//                   /> */}
//                   <div className="px-2 py-4">
//                     <div className="flex items-center relative w-full justify-center mb-4">
//                       <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wide">
//                         {"What Our"}{" "}
//                         <span className="text-yellow-500">
//                           {"Customers Say"}
//                         </span>
//                       </h2>
//                     </div>
//                     <div className="max-w-7xl mx-auto">
//                     <AnimatedTestimonials />
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div>Content is not available yet.</div>
//             )}
//           </div>
//         </Fullcontainer>
//       </Layout>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import Fullcontainer from "../components/UI/Fullcontainer";
import Styles from "./Home.module.css";
import {
  getCarousel,
  getBanners,
  getDod,
  getRecommendedProduct,
  getCategories,
  getSubCategories,
} from "../apis/api";
import Layout from "../Layouts/Layout";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
// 🎯 NEW: Import enhanced metadata system (ADD THIS LINE)
import { METADATA_CONFIG, generateStructuredData, generateSEOTags } from '../config/metadata';

const Partners = dynamic(() => import("@/components/Partners"), { ssr: false });

const SingleCarousel = dynamic(
  () => import("@/components/carousel/SingleCarousel"),
  { ssr: false }
);
const AnimatedTestimonials = dynamic(
  () => import("@/components/AnimatedTestimonals"),
  { ssr: false }
);

const Home = () => {
  // 🎯 ALL YOUR EXISTING STATE - EXACTLY THE SAME
  const [loading, setLoading] = useState(true);
  const [subCategories, setSubCategories] = useState(null);
  const [carouselImages, setCarouselImages] = useState(null);
  const [dodData, setDodData] = useState(null);
  const [recommendedData, setRecommendedData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [bannerImages, setBannerImages] = useState(null);
  const [Sbanner, setSbanner] = useState(null);
  const [MultiCarouselComponent, setMultiCarouselComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // 🎯 NEW: Enhanced metadata (ADD THESE LINES)
  const metadata = METADATA_CONFIG?.homepage || {
    title: "MaterialBuy - Building Materials Online",
    description: "India's trusted building materials store with pan-India delivery",
    keywords: "building materials, home improvement, materialbuy",
    canonicalUrl: "https://materialbuy.com",
    image: { url: "https://materialbuy.com/logo.png", alt: "MaterialBuy Logo" },
    ogImage: { url: "https://materialbuy.com/logo.png", alt: "MaterialBuy", width: 1200, height: 630, type: "image/png" },
    twitterImage: { url: "https://materialbuy.com/logo.png", alt: "MaterialBuy" },
    ogTitle: "MaterialBuy - Building Materials Online",
    ogDescription: "India's trusted building materials store",
    twitterTitle: "MaterialBuy - Building Materials Online",
    twitterDescription: "India's trusted building materials store"
  };
  const seoTags = generateSEOTags ? generateSEOTags(metadata) : {
    robots: "index, follow",
    author: "MaterialBuy",
    publisher: "MaterialBuy",
    language: "en-IN",
    geoRegion: "IN",
    themeColor: "#1f2937"
  };
  const structuredData = generateStructuredData ? generateStructuredData('homepage', metadata) : {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MaterialBuy",
    "url": "https://materialbuy.com"
  };

  // 🎯 ALL YOUR EXISTING useEffect - EXACTLY THE SAME
  useEffect(() => {
    const storedPincode = localStorage.getItem('pincode');
    if (!storedPincode) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const fetchPrimaryData = async () => {
      try {
        const [carouselResponse, bannerResponse] = await Promise.all([
          getCarousel(),
          getBanners(),
        ]);
  
        setCarouselImages(carouselResponse?.[0] ? Object.values(carouselResponse[0]).slice(0, 5) : []);
        setBannerImages(bannerResponse?.[0] ? Object.values(bannerResponse[0]).slice(0, 8) : []);
        setSbanner(carouselResponse?.[0]?.banner || "");
      } catch (error) {
        console.error("Error fetching primary data:", error);
      }
    };
  
    fetchPrimaryData();
    setTimeout(async () => {
      try {
        const [categoriesResponse, dodResponse, recommendedResponse, subcategoriesResponse] = await Promise.all([
          getCategories(),
          getDod(),
          getRecommendedProduct(),
          getSubCategories(),
        ]);

        const featuredCats = categoriesResponse?.filter(cat => cat.isFeatured === true) || [];
        const topCats = categoriesResponse?.filter(cat => cat.isTopProduct === true) || [];
        const topSubCats = subcategoriesResponse?.data?.filter(subcat => subcat.isTopProduct === true) || [];
        const featuredSubCats = subcategoriesResponse?.data?.filter(subcat => subcat.isFeatured === true) || [];

        setFeaturedCategories([...featuredCats, ...featuredSubCats]);
        setTopCategories([...topCats, ...topSubCats]);
        
        setDodData([...(dodResponse?.product || []), ...(dodResponse?.allVariations || [])]);
        setRecommendedData([...(recommendedResponse?.products || []), ...(recommendedResponse?.allVariations || [])]);
        setSubCategories(subcategoriesResponse?.data || []);
        setCategories(categoriesResponse || []);
      } catch (error) {
        console.error("Error fetching secondary data:", error);
      } finally {
        setLoading(false);
        const MultiCarousel = dynamic(
          () => import("@/components/carousel/MultiCarousel"),
          { ssr: true }
        );
        setMultiCarouselComponent(<MultiCarousel />);
      }
    }, 1000); 
  }, []);

  console.log(featuredCategories , topCategories, "categories");

  // 🎯 YOUR EXISTING PROFESSIONAL LOADING ANIMATION - EXACTLY THE SAME
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-950 to-blue-900 flex flex-col items-center justify-center z-50">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Premium loading animation */}
          <div className="relative">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
                opacity="0.2"
                className="animate-pulse"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7766 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
                className="animate-spin"
                style={{
                  transformOrigin: 'center',
                  animation: 'spin 1.5s linear infinite',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Loading text with animation */}
          <div className="text-center">
            <h1 className="text-white text-2xl font-bold animate-pulse mb-2">
              MaterialBuy
            </h1>
            <p className="text-blue-200 text-lg animate-bounce">
              Loading premium materials...
            </p>
          </div>
          
          {/* Loading progress indicator */}
          <div className="w-64 h-1 bg-blue-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        {/* 🎯 ENHANCED METADATA SYSTEM (REPLACES YOUR BASIC META TAG) */}
        
        {/* Primary Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        
        {/* 🔗 Canonical URL */}
        <link rel="canonical" href={metadata.canonicalUrl} />
        
        {/* 🖼️ Primary Image with Alt Text */}
        <meta name="image" content={metadata.image.url} />
        <meta name="image:alt" content={metadata.image.alt} />
        
        {/* 📊 Open Graph Meta Tags with Images */}
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
        <meta property="og:updated_time" content={new Date().toISOString()} />
        
        {/* 🐦 Twitter Card Meta Tags with Images */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MaterialBuy" />
        <meta name="twitter:creator" content="@MaterialBuy" />
        <meta name="twitter:title" content={metadata.twitterTitle} />
        <meta name="twitter:description" content={metadata.twitterDescription} />
        <meta name="twitter:image" content={metadata.twitterImage.url} />
        <meta name="twitter:image:alt" content={metadata.twitterImage.alt} />
        
        {/* 🤖 SEO Tags */}
        <meta name="robots" content={seoTags.robots} />
        <meta name="author" content={seoTags.author} />
        <meta name="publisher" content={seoTags.publisher} />
        <meta name="language" content={seoTags.language} />
        <meta name="geo.region" content={seoTags.geoRegion} />
        <meta name="theme-color" content={seoTags.themeColor} />
        
        {/* 📱 Mobile & App Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-title" content="MaterialBuy" />
        <meta name="application-name" content="MaterialBuy" />
        
        {/* 🚀 Performance Hints */}
        <link rel="preconnect" href="https://materialbuy.com" />
        <link rel="dns-prefetch" href="//materialbuy.com" />
        
        {/* 📄 Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* 📍 Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        {/* 🔧 Additional SEO */}
        <meta name="sitemap" content="https://materialbuy.com/sitemap.xml" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
      </Head>
      
      {/* 🎯 ALL YOUR EXISTING LAYOUT & CONTENT - EXACTLY THE SAME */}
      <Layout>
        <Fullcontainer className={Styles.fullcontainer}>
          <div className={`${Styles.Container} w-full bg-white p-0`}>
            {carouselImages && bannerImages ? (
              <>
                <div className="w-full flex flex-col md:flex-row verflow-x-hidden">
                  <div className=" max-w-full md:max-w-full md:w-full ">
                    <SingleCarousel mainCarouselData={carouselImages} />
                  </div>
                  <Image src={Sbanner} alt="banner Image" width={600} height={500} />
                </div>
                
                {dodData && dodData.length > 0 && MultiCarouselComponent && (
                  React.cloneElement(MultiCarouselComponent, {
                    multiCarouselData: dodData,
                    titleof: "Deals of the Day",
                    datatype: "deals-of-the-day",
                  })
                )}
                
                <Image
                  src={bannerImages[0]}
                  alt="banner Image 1"
                  width={2000}
                  height={600}
                  className="rounded-md min-h-52 my-4"
                  loading="lazy"
                />

                {topCategories && topCategories.length > 0 && MultiCarouselComponent && (
                  React.cloneElement(MultiCarouselComponent, {
                    multiCarouselData: topCategories,
                    titleof: "Top Categories",
                    datatype: "categories",
                  })
                )}

                <Image
                  src={bannerImages[1]}
                  alt="banner Image 2"
                  width={2000}
                  height={400}
                  className="rounded-md min-h-52 my-4"
                  loading="lazy"
                />

                {recommendedData && recommendedData.length > 0 && MultiCarouselComponent && (
                  React.cloneElement(MultiCarouselComponent, {
                    multiCarouselData: recommendedData,
                    titleof: "Popular Picks",
                    datatype: "popular-picks",
                  })
                )}

                <Image
                  src={bannerImages[2]}
                  alt="banner Image 3"
                  width={2000}
                  height={400}
                  className="rounded-md min-h-52 my-4"
                  loading="lazy"
                />

                {featuredCategories && featuredCategories.length > 0 && MultiCarouselComponent && (
                  React.cloneElement(MultiCarouselComponent, {
                    multiCarouselData: featuredCategories,
                    titleof: "Featured Categories",
                    datatype: "categories",
                  })
                )}

                <Image
                  src={bannerImages[3]}
                  alt="banner Image 4"
                  width={2000}
                  height={400}
                  className="rounded-md min-h-52 my-4"
                  loading="lazy"
                />

                <div className="px-2 mt-4">
                  <div className="flex  items-center relative w-full justify-center">
                    <h2 className="text-4xl font-bold tracking-wide ">
                      {"More to"}{" "}
                      <span className="text-yellow-500">{"Explore"}</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5 py-4">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <span className="w-full aspect-square max-w-[280px]">
                        <Image
                          src={bannerImages[4]}
                          alt="banner Image 5"
                          width={2000}
                          height={400}
                          className="rounded-md h-full w-full object-cover"
                          loading="lazy"
                        />
                      </span>
                      <span className="font-black text-lg md:text-xl lg:text-2xl text-blue-950 tracking-wide">
                        Roof Shingles
                      </span>
                      <span className="font-light text-gray-700 text-sm md:text-base text-center md:tracking-wide">
                      Timeless Protection, Unmatched Style
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                    <span className="w-full aspect-square max-w-[280px]">
                    <Image
                          src={bannerImages[5]}
                          alt="banner Image 6"
                          width={2000}
                          height={400}
                          className="rounded-md h-full w-full object-cover"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={"/Kitchenproduct-mock.jpg"}
                        />
                      </span>
                      <span className="font-black text-lg md:text-xl lg:text-2xl text-blue-950 tracking-wide">
                        Modular Kitchen
                      </span>
                      <span className="font-light text-gray-700 text-sm md:text-base text-center md:tracking-wide">
                      Your Culinary Haven
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                    <span className="w-full aspect-square max-w-[280px]">
                       <Image
                          src={bannerImages[6]}
                          alt="banner Image 7"
                          width={2000}
                          height={400}
                          className="rounded-md h-full w-full object-cover"
                          loading="lazy"
                        />
                      </span>
                      <span className="font-black text-blue-950 text-lg md:text-xl lg:text-2xl tracking-wide">
                      False Ceiling
                      </span>
                      <span className="font-light text-gray-700 text-sm md:text-base text-center md:tracking-wide">
                      Elevate Your Space
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                    <span className="w-full aspect-square max-w-[280px]">
                    <Image
                          src={bannerImages[7]}
                          alt="banner Image 8 "
                          width={2000}
                          height={400}
                          className="rounded-md h-full w-full object-cover"
                          loading="lazy"
                        />
                      </span>
                      <span className="font-black text-blue-950 text-lg md:text-xl lg:text-2xl tracking-wide">
                      Wooden Houses
                      </span>
                      <span className="font-light text-gray-700 text-sm md:text-base text-center md:tracking-wide">
                      Cozy, Classic, Contemporary
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-1 py-4 md:py-8 gap-4 px-2 grid-cols-1">
                  <Image
                    src="/MaterialBuy Now Pay Later.webp"
                    alt="MaterialBuy Now Pay Later"
                    className="h-full w-full object-contain"
                    width={1000}
                    height={500}
                  />
                  <div className="px-2 mt-4">
                    <div className="flex items-center relative w-full justify-center">
                      <h2 className="text-xl md:text-3xl lg::text-5xl font-bold tracking-wide mb-3">
                        {"Our"}{" "}
                        <span className="text-yellow-500">{"Partners"}</span>
                      </h2>
                    </div>
                    <Partners />
                  </div>
                  <div className="px-2 py-4">
                    <div className="flex items-center relative w-full justify-center mb-4">
                      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wide">
                        {"What Our"}{" "}
                        <span className="text-yellow-500">
                          {"Customers Say"}
                        </span>
                      </h2>
                    </div>
                    <div className="max-w-7xl mx-auto">
                    <AnimatedTestimonials />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>Content is not available yet.</div>
            )}
          </div>
        </Fullcontainer>
      </Layout>
    </>
  );
};

export default Home;
