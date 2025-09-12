'use client'
import React, { useEffect, useState } from "react";
import Styles from "./BecomeAProfessional.module.css";
import Fullcontainer from "../../components/UI/Fullcontainer";
import Container from "../../components/UI/Container";
import Layout from "../../Layouts/Layout";
import Button from "../../components/UI/Button";
import MainSide from "../../components/UI/MainSide";
import { useRouter } from "next/navigation";
import { UploadFile, postProfessional, getAllProfessionalsCategories } from "../../apis/api";
import { toast } from "react-toastify";
import profspace from "../../../public/PROFESSIONALspace.jpg";
import prof1 from "../../../public/PROFESSIONAL1.jpg";
import prof2 from "../../../public/PROFESSIONAL2.jpg";
import Head from "next/head";
import Image from "next/image";
import TabNavigation from "@/components/TabNavigation";

// --- Reusable File Upload Component (defined inside this file) ---
const FileUploadInput = ({ id, label, onFileChange, fileName, error, required = false }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <label htmlFor={id} className="mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <label
        htmlFor={id}
        className={`flex h-full flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-5 text-center transition-colors duration-200 ease-in-out ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <svg
          className="mx-auto h-10 w-10 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="mt-2 text-sm font-medium text-primary hover:underline cursor-pointer">
          {fileName || 'Upload a file'}
        </span>
        <input
          id={id}
          name={id}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          className="sr-only"
          onChange={(e) => onFileChange(e.target.files ? e.target.files[0] : null)}
        />
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};


// --- Main Page Component ---
const BecomeAProfessional = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // State for raw file objects selected by the user
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [projectImage1File, setProjectImage1File] = useState(null);
  const [projectImage2File, setProjectImage2File] = useState(null);
  const [projectImage3File, setProjectImage3File] = useState(null);

  // State for form data, including URLs which will be populated after upload
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    cat: "",
    city: "",
    expr: "",
    img: "",   // Profile image URL
    img2: "",  // Project image 1 URL
    img3: "",  // Project image 2 URL
    img4: "",  // Project image 3 URL
  });

  // A single state to hold all validation errors
  const [errors, setErrors] = useState({});
  const [allProfessionals, setAllProfessionals] = useState([]);

  // Fetch professional categories and user data on component mount
  useEffect(() => {
    const getAllProfessional = async () => {
      try {
        const response = await getAllProfessionalsCategories();
        if (response.status === 200) {
          setAllProfessionals(response.data);
        }
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    const loadUserData = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(prev => ({
          ...prev,
          name: user.username,
          email: user.email,
          phone: user.phoneno,
        }));
      } else {
        toast.info("Please log in to become a professional.");
        router.push("/login");
      }
    };

    getAllProfessional();
    loadUserData();
  }, [router]);

  // Generic handler for text/select input changes
  const inputChangeHandler = (key, value) => {
    setUserData(prev => ({ ...prev, [key]: value }));
    // Clear the error for the field when the user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };

  // Generic handler for file input changes
  const handleFileChange = (setter, fieldName) => (file) => {
    setter(file);
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  // --- VALIDATION LOGIC ---
  const validateForm = () => {
    const newErrors = {};
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif'];

    const validateFile = (file, fieldName, isRequired = false) => {
      if (!file) {
        if (isRequired) newErrors[fieldName] = 'This field is required.';
        return;
      }
      if (file.size > MAX_FILE_SIZE) newErrors[fieldName] = 'File is too large (max 10MB).';
      if (!ALLOWED_FILE_TYPES.includes(file.type)) newErrors[fieldName] = 'Invalid file type (PNG, JPG, GIF allowed).';
    };

    // Text & Select fields validation
    if (!userData.cat) newErrors.cat = 'Category is required.';
    if (!userData.city.trim()) newErrors.city = 'City is required.';
    if (!userData.expr) {
      newErrors.expr = 'Experience is required.';
    } else if (isNaN(userData.expr) || Number(userData.expr) < 0) {
      newErrors.expr = 'Experience must be a positive number.';
    }

    // File validation
    validateFile(profileImageFile, 'img', true); // Profile image is required
    validateFile(projectImage1File, 'img2', true);
    validateFile(projectImage2File, 'img3', true);
    validateFile(projectImage3File, 'img4', true);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // --- FORM SUBMISSION HANDLER ---
  const formhandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    toast.info("Submitting your application, please wait...");

    try {
      let finalUserData = { ...userData };

      // Helper to upload a single file and return its URL
      const uploadAndGetUrl = async (file) => {
        if (!file) return null;
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        const response = await UploadFile(data);
        if (response.status === 200) {
          return response.data;
        }
        throw new Error(`Failed to upload ${file.name}`);
      };

      // Upload all files in parallel and wait for all to complete
      const [imgUrl, img2Url, img3Url, img4Url] = await Promise.all([
        uploadAndGetUrl(profileImageFile),
        uploadAndGetUrl(projectImage1File),
        uploadAndGetUrl(projectImage2File),
        uploadAndGetUrl(projectImage3File),
      ]);
      
      finalUserData = {
        ...finalUserData,
        img: imgUrl,
        img2: img2Url,
        img3: img3Url,
        img4: img4Url
      };

      // Now submit the final form data with all the image URLs
      const response = await postProfessional(finalUserData);
      if (response && response.status === 200) {
        toast.success("Professional application submitted successfully!");
        setTimeout(() => window.location.reload(), 2000);
      }

    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(error.response?.data || error.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Layout>
        <Head>
          <title>Join Professional Space of Material Buy</title>
          <meta name="description" content="Join Materialbuy.com's professional network to offer your expertise in construction, design, and related services. Expand your business with us and reach new clients." />
        </Head>
        <Fullcontainer className={Styles.fullcontainer}>
          <Container className={`${Styles.container} grid grid-cols-5 gap-4`}>
            <div className={`col-span-1 ${Styles.about_side}`}>
              <MainSide image={profspace} />
            </div>
            <div className={`col-span-5 md:col-span-4 ${Styles.about_main}`}>
              <TabNavigation />
              <h1 className="text-3xl font-semibold" style={{ color: "#102c44" }}>Become a professional</h1>
              <p className="text-slate-500">Unlock New Heights in Your Profession: Join MaterialBuy.com for High-Value Clients and Lucrative Commercial Projects</p>
              <div className={`${Styles.hero}`}>
                <Image src={prof1} alt="" width={1100} height={500} priority />
              </div>

              {userData.name ? (
                <form
                  action=""
                  className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
                  onSubmit={formhandler}
                  noValidate // Prevent default browser validation
                >
                  {/* REFACTORED FILE UPLOADS */}
                  <div className={`flex flex-col col-span-2 mt-3`}>
                    <FileUploadInput
                      id="profile-image-upload"
                      label="Profile Image"
                      fileName={profileImageFile?.name}
                      onFileChange={handleFileChange(setProfileImageFile, 'img')}
                      error={errors.img}
                      required={true}
                    />
                  </div>
                  <div className={`flex flex-col col-span-2 mt-3`}>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
                      <FileUploadInput
                        id="project-image-1"
                        label="Project Image 1"
                        fileName={projectImage1File?.name}
                        onFileChange={handleFileChange(setProjectImage1File, 'img2')}
                        error={errors.img2}
                        required={true}
                      />
                      <FileUploadInput
                        id="project-image-2"
                        label="Project Image 2"
                        fileName={projectImage2File?.name}
                        onFileChange={handleFileChange(setProjectImage2File, 'img3')}
                        error={errors.img3}
                        required={true}
                      />
                      <FileUploadInput
                        id="project-image-3"
                        label="Project Image 3"
                        fileName={projectImage3File?.name}
                        onFileChange={handleFileChange(setProjectImage3File, 'img4')}
                        error={errors.img4}
                        required={true}
                      />
                    </div>
                  </div>

                  {/* FORM FIELDS WITH VALIDATION FEEDBACK */}
                  <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={userData.name} className={`${Styles.inputfield} mt-1`} disabled />
                  </div>
                  <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                    <label htmlFor="email">Email address</label>
                    <input id="email" type="email" value={userData.email} className={`${Styles.inputfield} mt-1`} disabled />
                  </div>
                  <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                    <label htmlFor="category">Category <span className="text-red-500">*</span></label>
                    <select
                      id="category"
                      name="category"
                      value={userData.cat}
                      onChange={(e) => inputChangeHandler("cat", e.target.value)}
                      className={`mt-1 block w-full rounded-md border bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${errors.cat ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select category</option>
                      {allProfessionals.map((item, index) => (
                        <option key={index} value={item.catprof}>{item.catprof}</option>
                      ))}
                    </select>
                    {errors.cat && <p className="mt-1 text-sm text-red-500">{errors.cat}</p>}
                  </div>
                  <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" type="text" value={userData.phone} className={`${Styles.inputfield} mt-1`} disabled />
                  </div>
                  <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                    <label htmlFor="experience">Experience in years <span className="text-red-500">*</span></label>
                    <input
                      id="experience"
                      type="number"
                      value={userData.expr}
                      min="0"
                      onChange={(e) => inputChangeHandler("expr", e.target.value)}
                      className={`${Styles.inputfield} mt-1 ${errors.expr ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.expr && <p className="mt-1 text-sm text-red-500">{errors.expr}</p>}
                  </div>
                  <div className={`flex flex-col col-span-2 md:col-span-1 mt-3`}>
                    <label htmlFor="city">City <span className="text-red-500">*</span></label>
                    <input
                      id="city"
                      type="text"
                      value={userData.city}
                      onChange={(e) => inputChangeHandler("city", e.target.value)}
                      className={`${Styles.inputfield} mt-1 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                  </div>

                  <div className={`flex flex-col col-span-2`}>
                    <Button
                      value={isSubmitting ? "Submitting..." : "Submit"}
                      className={`w-max ${Styles.button}`}
                      type="submit"
                      disabled={isSubmitting}
                    />
                  </div>
                </form>
              ) : (
                <div className="text-center p-10">
                  <p className="text-xl">Loading user data or redirecting...</p>
                </div>
              )}

              {/* Rest of your page content */}
              <p className={`text-md font-semibold text-xl mt-8`}>
                <b>Introduction</b>
              </p>
              <p className={`text-md text-justify`}>
                In the ever-evolving landscape of our industry,
                professionals seek opportunities that not only align with their expertise but also o
                pen doors to high-ticket clients and promising commercial projects.
                If you're aiming to elevate your career to new heights,
                MaterialBuy.com invites you to join our community of professionals dedicated to excellence and success.<br /><br />
              </p>
              <h1 className={`m-3 text-center font-bold text-2xl mt-10`}>Join MaterialBuy.com for Exclusive Access to High-Value Clients and Lucrative Commercial Projects.</h1>
              <h1><b></b></h1><br /><br />
              <p className={`text-md font-semibold text-xl`}>
                <b>Scope of Joining MaterialBuy.com</b>
              </p>
              <p className={`text-md text-justify`}>
                MaterialBuy.com stands as a dynamic platform that transcends traditional boundaries,
                connecting professionals with unparalleled opportunities. By becoming a part of our
                community, you gain access to a vast network of potential clients actively seeking
                expertise for their high-value projects. Whether you specialize in architecture, construction,
                design, or any related field, our platform is designed to match your skills with clients
                in need, creating a win-win scenario for both parties.<br /><br />
              </p>
              <div className={`${Styles.hero} mt-6 mb-6`}>
                <Image
                  src={prof2}
                  alt="Professionals collaborating on a project"
                  width={1100}
                  height={700}
                />
              </div>

            </div>
          </Container>
        </Fullcontainer>
      </Layout>
    </React.Fragment>
  );
};

export default BecomeAProfessional;