import React from 'react';

const WhatsAppFloatButton = () => {
  const whatsappLink = 'https://wa.me/9226535176'; // Replace with your WhatsApp link
  const whatsappIconUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'; // Online URL for WhatsApp icon
  const phoneNumber = 'tel:+919226535176'; // Replace with your phone number
  
  return (
    <>
      {/* WhatsApp Button */}
      <div 
        onClick={() => window.open(whatsappLink, '_blank')}
        className="fixed bottom-[50px] right-[20px] w-[50px] h-[50px] bg-[#25d366] rounded-full 
                   flex justify-center items-center cursor-pointer shadow-md hover:scale-110 
                   transition-transform duration-300 ease-in-out z-[1000]"
      >
        <img src={whatsappIconUrl} alt="WhatsApp" className="w-1/2 h-1/2" />
      </div>
      
      {/* Call Button - Only visible on desktop */}
      <div 
        onClick={() => window.open(phoneNumber, '_self')}
        className="fixed bottom-[120px] right-[20px] w-[50px] h-[50px] bg-blue-500 rounded-full 
                   flex justify-center items-center cursor-pointer shadow-md hover:scale-110 
                   transition-transform duration-300 ease-in-out z-[1000] md:hidden block "
      >
        {/* Phone SVG Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-8 h-8 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
          />
        </svg>
      </div>
    </>
  );
};

export default WhatsAppFloatButton;
