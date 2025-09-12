import { useState } from 'react';
import Header from '../components/Header/Header';  // Assuming the components are moved to 'components' folder
import Footer from '../components/Footer/Footer';
import CategoriesNavbar from '../components/categoriesNavbar/CategoriesNavbar';
import Mobnavbar from '../components/navbar/Mobnavbar';

const Layout = ({ children }) => {
  const [showCategories, setShowCategories] = useState(false);

  const categoriesIcons = () => {
    setShowCategories(!showCategories);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="relative ">
          <Header />
          <CategoriesNavbar categories={showCategories} />
          {/* <Navbar categories={categoriesIcons} /> */}
          <Mobnavbar />
        </div>
        <main className="flex-grow relative ">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
