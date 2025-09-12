import React, { useEffect, useState } from 'react';
import Styles from '../pages/manageaddress/Profile.module.css';
import Button from './UI/Button';
import { updateUser } from '../apis/api';
import { toast } from 'react-toastify';

const ManageAddressForm = ({
  addressIndex,
  parentUser,
  modalHandler,
  fetchUser
}) => {
  const [user, setUser] = useState(parentUser);

  const inputChangeHandler = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const updateUserProfile = async () => {
    const response = await updateUser(user._id, user);
    if (response.status === 200) {
      toast.success('Address Saved Successfully');
      modalHandler();
      fetchUser();
    } else {
      toast.error('Something went wrong');
    }
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    updateUserProfile();
  };

  return (
    <form
      action=""
      className="flex  flex-col gap-2"
      onSubmit={(e) => submitFormHandler(e)}
    >
      <div className="w-full">
        <label htmlFor="">Shipping Address* </label>
        <textarea
          rows="2"
          type="text"
          value={
            user[`shippingaddress${addressIndex}`]
              ? user[`shippingaddress${addressIndex}`]
              : ''
          }
          placeholder="House no. | Street | Landmark | City | State"
          className="w-full p-3 border rounded-md shadow-sm focus:border-primary focus:ring-primary resize-none"
          onChange={(e) =>
            inputChangeHandler(`shippingaddress${addressIndex}`, e.target.value)
          }
          required
        />
      </div>
      <div className="w-full">
        <label htmlFor="">Shipping Pincode* </label>
        <input
          type="number"
          value={
            user[`shippingpincode${addressIndex}`]
              ? user[`shippingpincode${addressIndex}`]
              : ''
          }
          placeholder="Pincode"
          className="w-full p-3 border rounded-md shadow-sm focus:border-primary focus:ring-primary resize-none"
          onChange={(e) =>
            inputChangeHandler(`shippingpincode${addressIndex}`, e.target.value)
          }
          required
        />
      </div>
      <div className="w-full">
        <label htmlFor="">Billing Name* </label><br></br>
        <input
          type="text"
          value={
            user[`billingname${addressIndex}`]
              ? user[`billingname${addressIndex}`]
              : ''
          }
          placeholder="Billing Name"
          className="w-full p-3 border rounded-md shadow-sm focus:border-primary focus:ring-primary resize-none"
          onChange={(e) =>
            inputChangeHandler(`billingname${addressIndex}`, e.target.value)
          }
          required
        />
      </div>
      <div className="w-full">
        <div className="">
          <label htmlFor="">Billing Address* </label>
          <p className={`text-s text-slate-500 flex`}>
            <input
              type="checkbox"
              className="mr-2"
              onChange={(e) => {
                if (e.target.checked) {
                  setUser({
                    ...user,
                    [`billingaddress${addressIndex}`]:
                      user[`shippingaddress${addressIndex}`],
                    [`billingpincode${addressIndex}`]:
                      user[`shippingpincode${addressIndex}`]
                  });
                } else {
                  setUser({
                    ...user,
                    [`billingaddress${addressIndex}`]: '',
                    [`billingpincode${addressIndex}`]: ''
                  });
                }
              }}
            //   disabled={user[`shippingaddress${addressIndex}`]}
            />
            Same as shipping address
          </p>
        </div>
        <textarea
          rows="2"
          type="text"
          value={
            user[`billingaddress${addressIndex}`]
              ? user[`billingaddress${addressIndex}`]
              : ''
          }
          placeholder="House no. | Street | Landmark | City | State"
          className="w-full p-3 border rounded-md shadow-sm focus:border-primary focus:ring-primary resize-none"
          onChange={(e) =>
            inputChangeHandler(`billingaddress${addressIndex}`, e.target.value)
          }
          required
        />
      </div>
      <div className="w-full">
        <label htmlFor="">Billing Pincode* </label>
        <input
          type="number"
          value={
            user[`billingpincode${addressIndex}`]
              ? user[`billingpincode${addressIndex}`]
              : ''
          }
          placeholder="Pincode"
          className="w-full p-3 border rounded-md shadow-sm focus:border-primary focus:ring-primary resize-none"
          onChange={(e) =>
            inputChangeHandler(`billingpincode${addressIndex}`, e.target.value)
          }
          required
        />
      </div>
      <Button
        value="Submit"
        className={`w-max ${Styles.button}`}
        type="submit"
      />
    </form>
  );
};

export default ManageAddressForm;
