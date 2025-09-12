import React, { useState } from 'react';
import styles from './FormPopup.module.css';

const FormPopup = ({ show = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    serviceName: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, mobileNumber, email, serviceName, description } = formData;

    const subject = `MaterialBuy Service - ${name} [${mobileNumber}]`;
    const body = `
      Name: ${name}
      Mobile Number: ${mobileNumber}
      Email ID: ${email}
      Service Name: ${serviceName}
      Description: ${description}
    `;

    window.location.href = `mailto:contact@materialbuy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsOpen(false);
  };

  if (!show) return null;

  return (
    <div>
      <button className={styles['open-button']} onClick={() => setIsOpen(true)}>
        <span className={styles['open-button-icon']}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32px" height="32px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12.713L2.5 6.5V18h19V6.5l-9.5 6.213zM12 10L2.5 3.5h19L12 10z"/>
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <span className={styles.close} onClick={() => setIsOpen(false)}>&times;</span>
            <form onSubmit={handleSubmit} className={styles['form-container']}>
              <h2>Service Request Form</h2>
              <label>
                Name*:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Mobile Number*:
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email ID*:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Service Name*:
                <input
                  type="text"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>
              <div className={styles['form-actions']}>
                <button type="button" className={styles['cancel-button']} onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="submit" className={styles['submit-button']}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPopup;
