'use client'
import React, { useEffect, useState } from 'react';
import Styles from './PreFab.module.css';
import Fullcontainer from '../../components/UI/Fullcontainer';
import Container from '../../components/UI/Container';
import Layout from '../../Layouts/Layout';
import MainSide from '../../components/UI/MainSide';
import Button from '../../components/UI/Button';
import { CreatePrebFab } from '../../apis/api';
import { toast } from "react-toastify";
import img1 from "../../../public/PREFAB1.png";
import img2 from "../../../public/PREFAB2.png";
import img3 from "../../../public/PREFAB3.png";
import img4 from "../../../public/PREFAB4.png";
import side from "../../../public/PREFABSIDE.jpg";
import Head from 'next/head';
import Image from 'next/image';
import TabNavigation from '@/components/TabNavigation';

function PreFab() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});
  // State to manage submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // A single handler to update form state and clear errors
  const inputChangeHandler = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    // When user starts typing, clear the error for that field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // --- FORM VALIDATION LOGIC ---
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!userData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Email validation
    if (!userData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone number validation
    if (!userData.number.trim()) {
      newErrors.number = "Phone number is required.";
    } else if (!/^\d{10}$/.test(userData.number)) {
      newErrors.number = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    // Return true if the newErrors object is empty
    return Object.keys(newErrors).length === 0;
  };


  const formhandler = async (e) => {
    e.preventDefault();

    // First, run validation. If it fails, stop the submission.
    if (!validateForm()) {
      toast.error("Please fill out the form correctly.");
      return;
    }

    setIsSubmitting(true);
    toast.info("Sending your enquiry...");

    try {
      const response = await CreatePrebFab(userData);
      // Check for a successful status code (e.g., 200, 201)
      if (response.status === 200) {
        toast.success("Enquiry Received Successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        // Handle cases where the server responds with an error status
        toast.error(response.data?.message || 'Failed to send enquiry. Please try again.');
      }
    } catch (error) {
      // Handle network errors or exceptions during the API call
      console.error("Enquiry submission error:", error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again later.');
    } finally {
      // This block will run whether the submission succeeded or failed
      setIsSubmitting(false);
    }
  };

  // Reset form on initial load
  useEffect(() => {
    setUserData({
      name: "",
      email: "",
      number: "",
    });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Looking for Pre Fab House</title>
        <meta
          name="description"
          content="Enquire about affordable and customizable prefab houses at Materialbuy.com. Get expert guidance and tailored solutions for your dream home project."
        />
      </Head>
      <Fullcontainer className={Styles.fullcontainer}>
        <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
          <div className={`col-span-1 ${Styles.about_side}`}>
            <MainSide image={side} />
          </div>
          <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
            <TabNavigation />
            <h1 className="text-3xl font-semibold" style={{ color: "#102c44" }}>
              Let's Design Dream Prefab House For You
            </h1>
            <div className={`${Styles.hero}`}>
              <Image src={img1} alt="Modern Prefab House Design 1" width={1000} height={500} priority />
            </div>
            <div className={`${Styles.hero} mt-4`}>
              <Image src={img2} alt="Modern Prefab House Design 2" width={1000} height={500} />
              <br />
            </div>
            <h1 className="text-3xl font-semibold animate-pulse" style={{ color: "#102c44" }}>
              CONTACT US
            </h1>
            <form
              action=""
              className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
              onSubmit={formhandler}
              noValidate // Prevent default browser validation to use our custom logic
            >
              <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                <label htmlFor="name">Name <span className="text-red-500">*</span></label>
                <input
                  id="name"
                  type="text"
                  value={userData.name}
                  onChange={(e) => inputChangeHandler("name", e.target.value)}
                  className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                <label htmlFor="number">Phone Number <span className="text-red-500">*</span></label>
                <input
                  id="number"
                  type="tel" // Use type="tel" for phone numbers
                  value={userData.number}
                  onChange={(e) => inputChangeHandler("number", e.target.value)}
                  className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary ${errors.number ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.number && <p className="mt-1 text-sm text-red-500">{errors.number}</p>}
              </div>
              <div className={`flex flex-col col-span-2 mt-3`}>
                <label htmlFor="email">Email Address <span className="text-red-500">*</span></label>
                <input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => inputChangeHandler("email", e.target.value)}
                  className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className={`flex flex-col col-span-2`}>
                <Button
                  value={isSubmitting ? "Submitting..." : "Submit"}
                  className={`w-max ${Styles.button}`}
                  type="submit"
                  disabled={isSubmitting} // Disable button while submitting
                />
              </div>
            </form>
            <br /><br />
            <p className="text-md font-semibold text-xl">
              Welcome to Materialbuy - Pioneering the Future of Prefab Homes<br />
            </p>
            <p className={`text-md text-justify`}>
              Explore a paradigm shift in modern living with Materialbuy's Prefab Homes.
              Our commitment to redefining spaces combines innovation, sustainability,
              and timeless design. Immerse yourself in a new era of home construction
              where every element is crafted with precision and passion.<br /><br />
            </p>

            <p className="text-md font-semibold text-xl">

              Elevate Your Living Experience with Materialbuy Prefab Homes<br />
            </p>
            <p className={`text-md text-justify`}>
              Materialbuy Prefab Homes redefine the way you perceive home construction.
              Here's why our homes stand out:<br /><br />


              <b>Craftsmanship Beyond Compare:</b><br />


              Witness unparalleled craftsmanship, where each detail is meticulously considered.
              Our homes embody the same care and attention found in traditional on-site construction,
              ensuring a dwelling that stands the test of time.<br /><br />

              <b>Unleash Your Imagination:</b><br />
              Your dream home, tailor-made. Materialbuy offers a spectrum of customization options.
              From layout configurations to finishes, unleash your creativity and personalize your living space.<br /><br />

              <b>Sustainability Redefined:</b><br />
              Join us in our commitment to sustainability. Constructed in a controlled factory setting,
              our prefab homes minimize waste and environmental impact, providing an eco-conscious living solution.<br /><br />


            </p>
            <p className="text-md font-semibold text-xl">
              Experience Homes Designed for Life<br /><br />
            </p>
            <p className={`text-md text-justify`}>
              <b>Weather-Resistant Designs:</b><br />
              Our homes are engineered to endure. From scorching sun to powerful winds,
              heavy rainfall to snow loads, Materialbuy prefab homes offer protection against the elements.<br /><br />

              <b>Longevity with Zero Maintenance:</b><br />
              Embrace a zero-maintenance construction that guarantees a 50+ year economic lifespan.
              Materialbuy prefab homes are designed to stand the test of time with minimal upkeep.<br /><br />

              <b>Contemporary, Innovative, and Stylish:</b><br />
              Immerse yourself in contemporary and innovative designs that define modern living.
              Our homes prioritize year-round thermal comfort with outstanding insulation.<br /><br />

              <b>Environmentally Friendly Construction:</b><br />
              Choose a sustainable and environmentally friendly construction solution.
              Materialbuy prefab homes integrate eco-conscious practices throughout the construction process.<br /><br />

              <b>Peace of Mind with a 20-Year Warranty</b><br />
              Rest easy with our 20-year warranty covering structure and leakage due to rains.
              Materialbuy goes the extra mile to ensure your satisfaction and peace of mind.<br /><br />

              <b>Virtual Tour for a Sneak Peek:</b><br />
              Embark on a virtual tour to explore the intricate design details of our prefab homes.
              Get a feel for the space, aesthetics, and functionality before making your choice.<br /><br />

            </p>
            <p className="text-md font-semibold text-xl">
              Redefining Construction Excellence<br /><br />
            </p>
            <p className={`text-md text-justify`}>
              <b>Efficient, Cost-Effective, and Flexible:</b><br />
              Experience efficiency with 80% - 90% of construction completed inside our cutting-edge factory.
              Enjoy cost-effectiveness and flexibility with modular buildings that adapt to your evolving needs.<br /><br />

              <b>Quality Assurance Beyond Standards:</b><br />
              Materialbuy upholds the highest quality standards. Our state-of-the-art facilities ensure
              modular buildings meet the same rigorous codes as traditional construction.<br /><br />

              <b>Sustainability Woven into Every Facet:</b><br />
              Our fully controlled fabrication process generates minimal waste, ensuring a smaller
              environmental impact and a tighter construction process.<br /><br />

              <b> Reduced Risk in an Indoor Environment:</b><br />
              Experience a reduced risk of accidents and related liabilities for workers in
              our controlled indoor construction environment.<br /><br />

            </p>
            <p className="text-md font-semibold text-xl">
              Building Systems by Materialbuy<br /><br />
            </p>
            <p className={`text-md text-justify`}>
              <b>Best Dry Technologies for Precision:</b><br />
              Materialbuy employs the best dry technologies available on the market to design
              modular buildings with standard components, ensuring precision and reliability.<br /><br />

              <b>Infinite Configurations for Your Vision:</b><br />
              Promoting modularity, Materialbuy offers endless configurations. Shape, function,
              and every surface, both internal and external, are customizable to match your imagination.<br /><br />

              <b>Direct Delivery to Your Construction Site:</b><br />
              Prefab components are delivered directly to your construction site, guaranteeing quick mounting,
              environmentally friendly products, and high-quality buildings.

              <br /><br />
            </p>
            <p className="text-md font-semibold text-xl">
              Embrace the Future of Home Construction<br /><br />
            </p>
            <p className={`text-md text-justify`}>
              <b>Off-Site Prefabrication for Efficiency:</b><br />
              Materialbuy's off-site prefabrication minimizes on-site processes,
              reducing costs and ensuring efficient mass production.<br /><br />

              <b> Secure Packaging for Global Delivery:</b><br />
              Modular panels and elements are securely packed and loaded on trucks,
              guaranteeing maximum performance during global deliveries.<br /><br />

              <b>Simple On-Site Mounting for Ease:</b><br />
              Assembly is simple, quick, and intuitive. Each panel is lifted,
              positioned correctly, and fastened securely, sealing the building against water and moisture.<br />

              Ready to embrace the future of home construction? Contact us today, and let Materialbuy transform your dream home into a reality.
              <br /><br />
            </p>
            <div className={`${Styles.hero}`}>
              <Image
                src={img3}
                alt="Interior of a prefab house"
                width={1000}
                height={500}
              />
            </div><br /><br />
            <div className={`${Styles.hero}`}>
              <Image
                src={img4}
                alt="Prefab house in a natural setting"
                width={1000}
                height={500}
              />
              <br />
            </div>
          </div>
        </Container>
      </Fullcontainer>
    </Layout>
  );
}

export default PreFab;