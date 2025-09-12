import React from 'react';
import './WhatsAppFloatButton.css'; // Import the CSS for styling

const WhatsAppFloatButton = () => {
  const whatsappLink = 'https://wa.me/9226535176'; // Replace with your WhatsApp link
  const whatsappIconUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'; // Online URL for WhatsApp icon

  return (
    <div className="whatsapp-float-button" onClick={() => window.open(whatsappLink, '_blank')}>
      <img src={whatsappIconUrl} alt="WhatsApp" />
    </div>
  );
};

export default WhatsAppFloatButton;
