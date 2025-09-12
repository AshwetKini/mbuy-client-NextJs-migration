// import React, { useContext } from "react";
// import "./CategoriesNavbar.module.css";
// import Fullcontainer from "../UI/Fullcontainer";
// import Container from "../UI/Container";
// import Link from "next/link";
// import { HiChevronDown } from "react-icons/hi"; // Import down arrow
// import { AllProductsContext } from "../../features/AllProductsContext";

// const CategoriesNavbar = (props) => {
//   const categories = useContext(AllProductsContext);

//   return (
//     <div className="bg-gray-800 text-white w-full h-14 -mt-1 hidden lg:flex justify-around items-center lg:bg-gray-900">
//   <Container>
//       <nav className="main-nav1">
//         <div
//           className={`menu-link1 ${
//             props.categories ? "mobile-menu-link1 bg-gray-900" : ""
//           } hidden md:flex`}
//         >
//           {categories?.categoriesData ? (
//             <ul className="flex w-full justify-evenly">
//               {categories.categoriesData.slice().reverse().map((item) => (
//                 <li key={item._id} className="icons1">
//                   <Link
//                     href={`/allproducts/${(item.title ?? "").replace(
//                       /\s+/g,
//                       "-"
//                     )}`}
//                   >
//                     <p className="flex items-center md:whitespace-nowrap  space-x-1">
//                     <span className="text-sm">
//   {item.title
//     .replace(/-/g, " ") // Replace hyphens with spaces
//     .replace(/\b\w/g, (char) => char.toUpperCase())} {/* Capitalize first letter of each word */}
// </span>

//                        {/* <HiChevronDown className="w-4 h-4" /> */}
//                     </p>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           ) : null}
//         </div>
//       </nav>
//     </Container>
//   </div>
  
//   );
// };

// export default CategoriesNavbar;

//updated navbar
import React, { useContext } from "react";
import "./CategoriesNavbar.module.css";
import Fullcontainer from "../UI/Fullcontainer";
import Container from "../UI/Container";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi"; // Import down arrow
import { AllProductsContext } from "../../features/AllProductsContext";

// UPDATED: Create clean URL slug
const createCleanSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')        // Replace " & " with "-"
    .replace(/\s+/g, '-')            // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')        // Remove all special chars except hyphens
    .replace(/\-\-+/g, '-')          // Replace multiple hyphens with single
    .replace(/^-+/, '')              // Trim hyphens from start
    .replace(/-+$/, '');             // Trim hyphens from end
};

// ADDED: Proper title capitalization for display
const formatDisplayTitle = (title) => {
  if (!title) return '';
  return title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
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

const CategoriesNavbar = (props) => {
  const categories = useContext(AllProductsContext);
  
  return (
    <div className="bg-gray-800 text-white w-full h-14 -mt-1 hidden lg:flex justify-around items-center lg:bg-gray-900">
      <Container>
        <nav className="main-nav1">
          <div
            className={`menu-link1 ${
              props.categories ? "mobile-menu-link1 bg-gray-900" : ""
            } hidden md:flex`}
          >
            {categories?.categoriesData ? (
              <ul className="flex w-full justify-evenly">
                {categories.categoriesData.slice().reverse().map((item) => {
                  const slug = createCleanSlug(item.title);
                  // Use mapping first, then formatted title as fallback
                  const displayTitle = SLUG_TO_CATEGORY[slug] || formatDisplayTitle(item.title);
                  
                  return (
                    <li key={item._id} className="icons1">
                      <Link href={`/allproducts/${slug}`}>
                        <p className="flex items-center md:whitespace-nowrap space-x-1">
                          <span className="text-sm">
                            {/* DISPLAY: Show properly formatted title */}
                            {displayTitle}
                          </span>
                          {/* <HiChevronDown className="w-4 h-4" /> */}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default CategoriesNavbar;
