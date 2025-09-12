"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Rakesh Sharma",
    designation: "Contractor",
    quote:
      "MaterialBuy makes it easy. One platform, endless options – from plywood to laminates.",
    src: "/PREFAB1.png",
  },
  {
    name: "Priya Malhotra",
    designation: "Homeowner",
    quote: "I was looking for affordable yet stylish fittings for my new modular kitchen, and Materialbuy delivered beyond expectations. The imported products are unique, and the team helped me design it just the way I wanted.",
    src: "/PROFESSIONAL1.jpg",
  },
  {
    name: "Amit Patel",
    designation: "Builder",
    quote:
    "As a builder, I need reliable suppliers who don't mess around with delays. Materialbuy's building materials and sheets are priced right, and their logistics are spot on—every order arrived when promised.",
    src: "/vendor2.png",
  },
  {
    name: "Neha Kapoor",
    designation: "Interior Designer",
    quote:
    "Materialbuy has become my secret weapon for client projects. Their range of interior design products is fantastic, and the quality stands out—especially the imported panels. My last project got rave reviews!",
    src: "/vendor2.png",
  },
];

const AnimatedTestimonials = ({ autoplay = true }) => {
  const [active, setActive] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState([0]);
  const [cardHeight, setCardHeight] = useState(0);

  // Determine how many testimonials to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleTestimonials([0, 1, 2]); // Show 3 on large screens
      } else if (window.innerWidth >= 768) {
        setVisibleTestimonials([0, 1]); // Show 2 on medium screens
      } else {
        setVisibleTestimonials([0]); // Show 1 on small screens
      }
    };

    // Initialize
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate the maximum height needed for cards
  useEffect(() => {
    // Find the tallest testimonial text to set a fixed height
    const calculateMaxHeight = () => {
      const testElement = document.createElement('div');
      testElement.style.position = 'absolute';
      testElement.style.visibility = 'hidden';
      testElement.style.width = window.innerWidth >= 1024 ? '33%' : window.innerWidth >= 768 ? '50%' : '100%';
      testElement.style.width = `calc(${testElement.style.width} - 2rem)`; // Account for padding
      document.body.appendChild(testElement);
      
      let maxHeight = 0;
      
      testimonials.forEach(testimonial => {
        testElement.innerHTML = testimonial.quote;
        const height = testElement.clientHeight + 140; // Add extra for header and padding
        maxHeight = Math.max(maxHeight, height);
      });
      
      document.body.removeChild(testElement);
      return maxHeight;
    };
    
    // Set initial height and update on resize
    setCardHeight(calculateMaxHeight());
    
    const handleResize = () => {
      setCardHeight(calculateMaxHeight());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  // Update visible testimonials when active changes
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      // On large screens, show active and next 2
      setVisibleTestimonials([
        active,
        (active + 1) % testimonials.length,
        (active + 2) % testimonials.length
      ]);
    } else if (window.innerWidth >= 768) {
      // On medium screens, show active and next 1
      setVisibleTestimonials([
        active,
        (active + 1) % testimonials.length
      ]);
    } else {
      // On small screens, show only active
      setVisibleTestimonials([active]);
    }
  }, [active]);

  return (
    <div className="w-full mx-auto px-4 py-6 relative">
      {/* Navigation Controls */}
      <div className="absolute top-1/2 -left-2 z-10 transform -translate-y-1/2">
        <button
          onClick={handlePrev}
          className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-all"
          aria-label="Previous testimonial"
        >
          <FaArrowAltCircleLeft className="h-6 w-6 text-blue-950" />
        </button>
      </div>
      
      <div className="absolute top-1/2 -right-2 z-10 transform -translate-y-1/2">
        <button
          onClick={handleNext}
          className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-all"
          aria-label="Next testimonial"
        >
          <FaArrowAltCircleRight className="h-6 w-6 text-blue-950" />
        </button>
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ minHeight: cardHeight ? `${cardHeight}px` : 'auto' }}>
        <AnimatePresence mode="wait">
          {visibleTestimonials.map((index, i) => (
            <motion.div
              key={`testimonial-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
              style={{ height: cardHeight ? `${cardHeight}px` : 'auto' }}
            >
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 mr-4 rounded-full overflow-hidden border-2 border-blue-950 flex-shrink-0">
                  <Image
                    src={testimonials[index].src}
                    alt={testimonials[index].name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{testimonials[index].name}</h3>
                  <p className="text-sm text-gray-500">{testimonials[index].designation}</p>
                </div>
              </div>
              
              <div className="flex-grow relative">
                <p className="text-gray-700 text-sm md:text-sm px-4 py-2">
                  {testimonials[index].quote}
                </p> </div>
              
              
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
