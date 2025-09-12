import React, {useEffect, useState} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navbar from "../navbar/navbar";
import CategoriesNavbar from '../categoriesNavbar/CategoriesNavbar';
import Mobnavbar from "../navbar/Mobnavbar";

const Layout = (props) => {
  const [showCategories, setShowCategories] = useState(false)

  const categoriesIcons = ()=>{
    setShowCategories(!showCategories)
  }
  return (
    <React.Fragment>
      <Header/>
      <CategoriesNavbar categories ={showCategories} />
      <Navbar categories={categoriesIcons}/>
      <Mobnavbar/>
      <main>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
