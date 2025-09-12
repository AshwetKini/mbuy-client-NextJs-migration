"use client";

import React, { useEffect, useState } from "react";
import { getpartners } from "@/apis/api"; // Ensure this function correctly fetches data

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await getpartners();
        const data = await response;
        if (Array.isArray(data) && data.length > 0) {
          const images = data.flatMap((partner) =>
            Array.from({ length: 12 }, (_, i) => partner[`img${i + 1}`]).filter((img) => img)
          );
          // Repeat images multiple times to ensure continuous flow
          setPartners([...images, ...images, ...images]);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full overflow-hidden mt-5">
      <div className="scroller">
        <ul className="scroller__inner">
          {partners.map((img, index) => (
            <li key={index} className="w-32 h-32 flex-shrink-0">
              <img src={img} alt={`Partner ${index}`} className="w-full h-full object-contain rounded-lg shadow-md" />
            </li>
          ))}
          {/* Duplicate items for seamless loop */}
          {partners.map((img, index) => (
            <li key={`duplicate-${index}`} className="w-32 h-32 flex-shrink-0">
              <img src={img} alt={`Partner ${index}`} className="w-full h-full object-contain rounded-lg shadow-md" />
            </li>
          ))}
          {/* Add one more set for extra smoothness */}
          {partners.map((img, index) => (
            <li key={`extra-${index}`} className="w-32 h-32 flex-shrink-0">
              <img src={img} alt={`Partner ${index}`} className="w-full h-full object-contain rounded-lg shadow-md" />
            </li>
          ))}
        </ul>
      </div>

      {/* CSS for Infinite Scrolling */}
      <style jsx>{`
        .scroller {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }

        .scroller__inner {
          display: flex;
          gap: 4rem;
          animation: scroll 15s linear infinite;
          will-change: transform;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-33.33% - 4rem));
          }
        }

        .scroller:hover .scroller__inner {
          animation-play-state: paused;
        }

        /* Add smooth transition for better performance */
        .scroller__inner {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          transform: translateZ(0);
        }

        /* Ensure smooth rendering */
        .scroller__inner li {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default Partners;
