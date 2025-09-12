import React, { useState, useEffect, useRef } from 'react';
import Styles from './Profile.module.css';
import Style from './ManageAddress.module.css';
import Fullcontainer from '../components/UI/Fullcontainer';
import Container from '../components/UI/Container';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
// import { useSelector, useDispatch } from "react-redux";
// import { editUser } from "../features/userSlice";
import UserDetailsSideTable from '../components/UI/UserDetailsSideTable';
import { updateUser, getUser } from '../apis/api';
import { HiPlus } from 'react-icons/hi2';

// const useraddress = {
//     shippingaddress1 : '',
//     shippingpincode1: '',
//     billingaddress1: '',
//     shippingaddress2 : '',
//     shippingpincode2: '',
//     billingaddress2: '',
//     shippingaddress3 : '',
//     shippingpincode3: '',
//     billingaddress3: '',
//     shippingaddress4 : '',
//     shippingpincode4: '',
//     billingaddress4: '',
//     shippingaddress5 : '',
//     shippingpincode5: '',
//     billingaddress5: '',
// };

const ManageAddress = () => {
  const [userAddress, setUserAddress] = useState('');
  const [buttonvalue, setButtonValue] = useState('Save');
  const [buttonvalue2, setButtonValue2] = useState(null);
  const [buttonvalue3, setButtonValue3] = useState(null);
  const [buttonvalue4, setButtonValue4] = useState(null);
  const [buttonvalue5, setButtonValue5] = useState(null);
  const [newAddressField, setNewAddressField] = useState(1);

  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const formRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null)
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // console.log(user, 'hjgkjdgdkfg')
      setUserAddress(user);
      if (user.shippingaddress1 && buttonvalue === 'Save') {
        setButtonValue('Edit');
      }
    }

    const getmanageaddresses = async () => {
      const userInfo = await getUser(user._id);
      // console.log(userInfo, 'hfdsdfsf');
      // console.log(userAddress, 'localstoarge');
      setUserAddress(userInfo.data);
    };

    getmanageaddresses();

    if (userAddress.shippingaddress2 || user.shippingaddress2) {
      console.log('hit');
      setButtonValue2('Edit');
      setNewAddressField(2);
    } else {
      setButtonValue2('Save');
    }

    if (userAddress.shippingaddress3 || user.shippingaddress3) {
      setButtonValue3('Edit');
      setNewAddressField(3);
    } else {
      setButtonValue3('Save');
    }

    if (userAddress.shippingaddress4 || user.shippingaddress4) {
      setButtonValue4('Edit');
      setNewAddressField(4);
    } else {
      setButtonValue4('Save');
    }

    if (userAddress.shippingaddress5 || user.shippingaddress5) {
      setButtonValue5('Edit');
      setNewAddressField(5);
    } else {
      setButtonValue5('Save');
    }
  }, []);

  const inputChangeHandler = (key, value) => {
    setUserAddress({
      ...userAddress,
      [key]: value
    });
    //   setButtonValue("Save");
  };

  const formhandler = (e, buttonvalue) => {
    e.preventDefault();
    // console.log(userAddress)
    let user = JSON.parse(localStorage.getItem('user'));

    const updateUserProfile = async (id) => {
      console.log(userAddress);
      const response = await updateUser(id, userAddress);
      console.log(response);
      if (response.status === 200) {
        //   dispatch(editUser(userAddress));
        setButtonValue('Edit');
        console.log('form submitted');
      } else if ((response.message = 'Network Error')) {
        setButtonValue('Not Saved');
      }
    };

    if (buttonvalue === 'Edit') {
      setButtonValue('Save');
      return;
    }

    if (buttonvalue !== 'Edit') {
      updateUserProfile(user._id);
    }
  };

  const formhandler1 = (e, buttonvalue, setButtonValue1) => {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem('user'));
    const updateAddress = async (id) => {
      const response = await updateUser(id, userAddress);
      console.log(response);
      console.log(setButtonValue1, 'button value');
      if (response.status === 200) {
        setButtonValue1('Edit');
      } else if (response.message == 'Network Error') {
        setButtonValue1('Not saved');
      }
    };

    if (buttonvalue === 'Edit') {
      setButtonValue1('Save');
      return;
    }

    if (buttonvalue !== 'Edit') {
      updateAddress(user._id);
    }
  };

  const addNewAddress = () => {
    setNewAddressField((prev) => prev + 1);
    // const newAddressFieldElement = document.getElementById(`shippingAddress${newAddressField}`);
    // if (newAddressFieldElement) {
    //   newAddressFieldElement.scrollIntoView({ behavior: 'smooth' });
    // }
  };

  useEffect(() => {
    const scrollToNewAddress = () => {
      const newAddressFieldElement = formRefs[newAddressField]?.current;

      if (newAddressFieldElement) {
        newAddressFieldElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToNewAddress();
  }, [newAddressField]);

  return (
    <React.Fragment>
      <Layout>
        <Fullcontainer className={Styles.fullcontainer}>
          <Container className={`${Styles.container}`}>
            <div className="md:grid md:grid-cols-8 gap-4">
              {' '}
              {/* Divided into two columns on larger screens */}
              <div className="md:col-span-2 hidden md:block">
                {' '}
                {/* Displayed on larger screens */}
                <UserDetailsSideTable />
              </div>
              <div className="md:col-span-6">
                {' '}
                {/* Takes the remaining space */}
                <h1
                  className="text-3xl font-semibold"
                  style={{ color: '#102c44' }}
                >
                  Address Details
                </h1>
                <p className="text-slate-500">Manage your Addresses.</p>
                {newAddressField === 5 ? null : (
                  <div
                    className={`${Style.manageaddressDiv}`}
                    onClick={addNewAddress}
                  >
                    <HiPlus className={`${Style.manageAddressIcons}`} />
                    <h1 className={`${Style.manageAddressText}`}>
                      ADD A NEW ADDRESS
                    </h1>
                  </div>
                )}
                {newAddressField === 5 || 4 || 3 || 2 || 1 ? (
                  <>
                    <form
                      action=""
                      className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
                      onSubmit={(e) => formhandler(e, buttonvalue)}
                    >
                      <div className={`flex flex-col col-span-2 mt-3`}>
                        <label htmlFor="">Shipping Address 1*</label>
                        <textarea
                          rows="2"
                          type="text"
                          value={
                            userAddress.shippingaddress1
                              ? userAddress.shippingaddress1
                              : ''
                          }
                          placeholder="House no. | Street | Landmark | City | State"
                          className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler(
                              'shippingaddress1',
                              e.target.value
                            )
                          }
                          // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                          disabled={
                            userAddress.shippingaddress1 &&
                            buttonvalue === 'Edit'
                          }
                        />
                      </div>

                      <div
                        className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                      >
                        <label htmlFor="">Shipping Pin Code 1*</label>
                        <input
                          type="number"
                          value={userAddress.shippingpincode1}
                          className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler(
                              'shippingpincode1',
                              e.target.value
                            )
                          }
                          required
                          // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                          disabled={
                            userAddress.shippingaddress1 &&
                            buttonvalue === 'Edit'
                          }
                        />
                      </div>
                      <br />
                      <div
                        className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                      >
                        <label htmlFor="">Billing Name 1*</label>
                        <input
                          type="text"
                          value={userAddress.billingname1}
                          className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler('billingname1', e.target.value)
                          }
                          required
                          // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                          disabled={
                            userAddress.billingname1 && buttonvalue === 'Edit'
                          }
                        />
                      </div>

                      <div className={`flex flex-col col-span-2 mt-3`}>
                        <div className={`flex items-center justify-between`}>
                          <label htmlFor="">Billing Address 1*</label>

                          <p className={`text-xs text-slate-500 flex`}>
                            <input
                              type="checkbox"
                              className="mr-2"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setUserAddress({
                                    ...userAddress,
                                    billingaddress1:
                                      userAddress.shippingaddress1,
                                    billingpincode1:
                                      userAddress.shippingpincode1
                                  });
                                } else {
                                  setUserAddress({
                                    ...userAddress,
                                    billingaddress1: '',
                                    billingpincode1: ''
                                  });
                                }
                              }}
                              // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                              disabled={
                                userAddress.shippingaddress1 &&
                                buttonvalue === 'Edit'
                              }
                            />
                            Same as shipping address 1
                          </p>
                        </div>
                        <textarea
                          rows="2"
                          type="text"
                          value={userAddress.billingaddress1}
                          placeholder="House no | Street | Landmark | City | State"
                          className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler(
                              'billingaddress1',
                              e.target.value
                            )
                          }
                          // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                          disabled={
                            userAddress.shippingaddress1 &&
                            buttonvalue === 'Edit'
                          }
                        />
                      </div>
                      <div
                        className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                      >
                        <label htmlFor="">Billing Pin Code 1*</label>
                        <input
                          type="number"
                          value={userAddress.billingpincode1}
                          className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler(
                              'billingpincode1',
                              e.target.value
                            )
                          }
                          required
                          // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                          disabled={
                            userAddress.shippingaddress1 &&
                            buttonvalue === 'Edit'
                          }
                        />
                      </div>
                      <br />
                      <Button
                        value={buttonvalue}
                        className={`w-max ${Styles.button}`}
                        type="submit"
                      // onClick={handleButtonClick}
                      />
                    </form>
                  </>
                ) : null}
                {newAddressField === 5 ||
                  newAddressField === 4 ||
                  newAddressField === 3 ||
                  newAddressField === 2 ? (
                  <>
                    <form
                      ref={formRefs[2]}
                      action=""
                      className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
                      onSubmit={(e) =>
                        formhandler1(e, buttonvalue2, setButtonValue2)
                      }
                      id={`shippingAddress${newAddressField}`}
                    >
                      <div className={`flex flex-col col-span-2 mt-3`}>
                        <label htmlFor="">Shipping Address 2*</label>
                        <textarea
                          rows="2"
                          type="text"
                          value={userAddress.shippingaddress2}
                          placeholder="House no | Street | Landmark | City | State"
                          className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler(
                              'shippingaddress2',
                              e.target.value
                            )
                          }
                          // disabled ={userAddress.shippingaddress2 && !clickButton2 ? true : false}
                          disabled={
                            userAddress.shippingaddress2 &&
                            buttonvalue2 === 'Edit'
                          }
                        />
                      </div>

                      <div
                        className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                      >
                        <label htmlFor="">Shipping Pin Code 2*</label>
                        <input
                          type="number"
                          value={userAddress.shippingpincode2}
                          placeholder="House no | Street | Landmark | City | State"
                          className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler(
                              'shippingpincode2',
                              e.target.value
                            )
                          }
                          required
                          disabled={
                            userAddress.shippingaddress2 &&
                            buttonvalue2 === 'Edit'
                          }
                        />
                      </div>
                      <br />
                      <div
                        className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                      >
                        <label htmlFor="">Billing Name 2*</label>
                        <input
                          type="text"
                          value={userAddress.billingname2}
                          className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler('billingname2', e.target.value)
                          }
                          required
                          // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                          disabled={
                            userAddress.billingname2 && buttonvalue2 === 'Edit'
                          }
                        />
                      </div>

                      <div className={`flex flex-col col-span-2 mt-3`}>
                        <div className={`flex items-center justify-between`}>
                          <label htmlFor="">Billing Address 2*</label>

                          <p className={`text-xs text-slate-500 flex`}>
                            <input
                              type="checkbox"
                              className="mr-2"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setUserAddress({
                                    ...userAddress,
                                    billingaddress2:
                                      userAddress.shippingaddress2
                                  });
                                } else {
                                  setUserAddress({
                                    ...userAddress,
                                    billingaddress2: ''
                                  });
                                }
                              }}
                              disabled={
                                userAddress.shippingaddress2 &&
                                buttonvalue2 === 'Edit'
                              }
                            />
                            Same as shipping address 2
                          </p>
                        </div>
                        <textarea
                          rows="2"
                          type="text"
                          value={userAddress.billingaddress2}
                          placeholder="House no | Street | Landmark | City | State"
                          className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler(
                              'billingaddress2',
                              e.target.value
                            )
                          }
                          disabled={
                            userAddress.shippingaddress2 &&
                            buttonvalue2 === 'Edit'
                          }
                        />
                      </div>
                      <div
                        className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                      >
                        <label htmlFor="">Billing Pin Code 2*</label>
                        <input
                          type="number"
                          value={userAddress.billingpincode2}
                          className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                          onChange={(e) =>
                            inputChangeHandler(
                              'billingpincode2',
                              e.target.value
                            )
                          }
                          required
                          // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                          disabled={
                            userAddress.shippingaddress2 &&
                            buttonvalue2 === 'Edit'
                          }
                        />
                      </div>
                      <br />

                      <Button
                        value={buttonvalue2}
                        className={`w-max ${Styles.button}`}
                        type="submit"
                      />
                    </form>
                  </>
                ) : null}
                {newAddressField === 5 ||
                  newAddressField === 4 ||
                  newAddressField === 3 ? (
                  <form
                    ref={formRefs[3]}
                    action=""
                    className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
                    onSubmit={(e) =>
                      formhandler1(e, buttonvalue3, setButtonValue3)
                    }
                    id={`shippingAddress${newAddressField}`}
                  >
                    <div className={`flex flex-col col-span-2 mt-3`}>
                      <label htmlFor="">Shipping Address 3*</label>
                      <textarea
                        rows="2"
                        type="text"
                        placeholder="House no | Street | Landmark | City | State"
                        value={userAddress.shippingaddress3}
                        className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('shippingaddress3', e.target.value)
                        }
                        disabled={
                          userAddress.shippingaddress3 &&
                          buttonvalue3 === 'Edit'
                        }
                      />
                    </div>

                    <div
                      className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Shipping Pin Code 3*</label>
                      <input
                        type="number"
                        value={userAddress.shippingpincode3}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('shippingpincode3', e.target.value)
                        }
                        required
                        disabled={
                          userAddress.shippingaddress3 &&
                          buttonvalue3 === 'Edit'
                        }
                      />
                    </div>
                    <br />
                    <div
                      className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Billing Name 3*</label>
                      <input
                        type="text"
                        value={userAddress.billingname3}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('billingname3', e.target.value)
                        }
                        required
                        // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                        disabled={
                          userAddress.billingname3 && buttonvalue3 === 'Edit'
                        }
                      />
                    </div>

                    <div className={`flex flex-col col-span-2 mt-3`}>
                      <div className={`flex items-center justify-between`}>
                        <label htmlFor="">Billing Address 3*</label>

                        <p className={`text-xs text-slate-500 flex`}>
                          <input
                            type="checkbox"
                            className="mr-2"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUserAddress({
                                  ...userAddress,
                                  billingaddress3: userAddress.shippingaddress3
                                });
                              } else {
                                setUserAddress({
                                  ...userAddress,
                                  billingaddress3: ''
                                });
                              }
                            }}
                            disabled={
                              userAddress.shippingaddress3 &&
                              buttonvalue3 === 'Edit'
                            }
                          />
                          Same as shipping address 3
                        </p>
                      </div>
                      <textarea
                        rows="2"
                        type="text"
                        value={userAddress.billingaddress3}
                        placeholder="House no | Street | Landmark | City | State"
                        className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('billingaddress3', e.target.value)
                        }
                        disabled={
                          userAddress.shippingaddress3 &&
                          buttonvalue3 === 'Edit'
                        }
                      />
                    </div>

                    <div
                      className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Billing Pin Code 3*</label>
                      <input
                        type="number"
                        value={userAddress.billingpincode3}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('billingpincode3', e.target.value)
                        }
                        required
                        // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                        disabled={
                          userAddress.shippingaddress3 &&
                          buttonvalue3 === 'Edit'
                        }
                      />
                    </div>
                    <br />
                    <Button
                      value={buttonvalue3}
                      className={`w-max ${Styles.button}`}
                      type="submit"
                    />
                  </form>
                ) : null}
                {newAddressField === 5 || newAddressField === 4 ? (
                  <form
                    ref={formRefs[4]}
                    action=""
                    className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
                    onSubmit={(e) =>
                      formhandler1(e, buttonvalue4, setButtonValue4)
                    }
                    id={`shippingAddress${newAddressField}`}
                  >
                    <div className={`flex flex-col col-span-2 mt-3`}>
                      <label htmlFor="">Shipping Address 4*</label>
                      <textarea
                        rows="2"
                        type="text"
                        value={userAddress.shippingaddress4}
                        placeholder="House no | Street | Landmark | City | State"
                        className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('shippingaddress4', e.target.value)
                        }
                        disabled={
                          userAddress.shippingaddress4 &&
                          buttonvalue4 === 'Edit'
                        }
                      />
                    </div>

                    <div
                      className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Shipping Pin Code 4*</label>
                      <input
                        type="number"
                        value={userAddress.shippingpincode4}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('shippingpincode4', e.target.value)
                        }
                        required
                        disabled={
                          userAddress.shippingaddress4 &&
                          buttonvalue4 === 'Edit'
                        }
                      />
                    </div>
                    <br />
                    <div
                      className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Billing Name 4*</label>
                      <input
                        type="text"
                        value={userAddress.billingname4}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('billingname4', e.target.value)
                        }
                        required
                        // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                        disabled={
                          userAddress.billingname4 && buttonvalue4 === 'Edit'
                        }
                      />
                    </div>

                    <div className={`flex flex-col col-span-2 mt-3`}>
                      <div className={`flex items-center justify-between`}>
                        <label htmlFor="">Billing Address 4* </label>

                        <p className={`text-xs text-slate-500 flex`}>
                          <input
                            type="checkbox"
                            className="mr-2"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUserAddress({
                                  ...userAddress,
                                  billingaddress4: userAddress.shippingaddress4
                                });
                              } else {
                                setUserAddress({
                                  ...userAddress,
                                  billingaddress4: ''
                                });
                              }
                            }}
                            disabled={
                              userAddress.shippingaddress4 &&
                              buttonvalue4 === 'Edit'
                            }
                          />
                          Same as shipping address 4
                        </p>
                      </div>
                      <textarea
                        rows="2"
                        type="text"
                        value={userAddress.billingaddress4}
                        placeholder="House no | Street | Landmark | City | State"
                        className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('billingaddress4', e.target.value)
                        }
                        disabled={
                          userAddress.shippingaddress4 &&
                          buttonvalue4 === 'Edit'
                        }
                      />
                    </div>

                    <div
                      className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Billing Pin Code 4*</label>
                      <input
                        type="number"
                        value={userAddress.billingpincode4}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('billingpincode4', e.target.value)
                        }
                        required
                        // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                        disabled={
                          userAddress.shippingaddress4 &&
                          buttonvalue4 === 'Edit'
                        }
                      />
                    </div>
                    <br />

                    <Button
                      value={buttonvalue4}
                      className={`w-max ${Styles.button}`}
                      type="submit"
                    />
                  </form>
                ) : null}
                {newAddressField === 5 ? (
                  <form
                    ref={formRefs[5]}
                    action=""
                    className={`${Styles.form} mt-3 grid grid-cols-2 gap-4`}
                    onSubmit={(e) =>
                      formhandler1(e, buttonvalue5, setButtonValue5)
                    }
                    id={`shippingAddress${newAddressField}`}
                  >
                    <div className={`flex flex-col col-span-2 mt-3`}>
                      <label htmlFor="">Shipping Address 5*</label>
                      <textarea
                        rows="2"
                        type="text"
                        value={userAddress.shippingaddress5}
                        placeholder="House no | Street | Landmark | City | State"
                        className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('shippingaddress5', e.target.value)
                        }
                        disabled={
                          userAddress.shippingaddress5 &&
                          buttonvalue5 === 'Edit'
                        }
                      />
                    </div>

                    <div
                      className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Shipping Pin Code 5*</label>
                      <input
                        type="number"
                        value={userAddress.shippingpincode5}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('shippingpincode5', e.target.value)
                        }
                        required
                        disabled={
                          userAddress.shippingaddress5 &&
                          buttonvalue5 === 'Edit'
                        }
                      />
                    </div>
                    <br />

                    <div
                      className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Billing Name 5*</label>
                      <input
                        type="text"
                        value={userAddress.billingname5}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('billingname5', e.target.value)
                        }
                        required
                        // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                        disabled={
                          userAddress.billingname5 && buttonvalue5 === 'Edit'
                        }
                      />
                    </div>

                    <div className={`flex flex-col col-span-2 mt-3`}>
                      <div className={`flex items-center justify-between`}>
                        <label htmlFor="">Billing Address 5*</label>

                        <p className={`text-xs text-slate-500 flex`}>
                          <input
                            type="checkbox"
                            className="mr-2"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUserAddress({
                                  ...userAddress,
                                  billingaddress5: userAddress.shippingaddress5
                                });
                              } else {
                                setUserAddress({
                                  ...userAddress,
                                  billingaddress5: ''
                                });
                              }
                            }}
                            disabled={
                              userAddress.shippingaddress5 &&
                              buttonvalue5 === 'Edit'
                            }
                          />
                          Same as shipping address 5
                        </p>
                      </div>
                      <textarea
                        rows="2"
                        type="text"
                        value={userAddress.billingaddress5}
                        placeholder="House no | Street | Landmark | City | State"
                        className={`${Styles.inputfieldtextarea} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('billingaddress5', e.target.value)
                        }
                        disabled={
                          userAddress.shippingaddress5 &&
                          buttonvalue5 === 'Edit'
                        }
                      />
                    </div>

                    <div
                      className={`flex flex-col col-span-2 md:col-span-1 mt-3`}
                    >
                      <label htmlFor="">Billing Pin Code 5*</label>
                      <input
                        type="number"
                        value={userAddress.billingpincode5}
                        className={`${Styles.inputfield} mt-1 shadow-sm focus:border-primary focus:ring-primary`}
                        onChange={(e) =>
                          inputChangeHandler('billingpincode5', e.target.value)
                        }
                        required
                        // disabled ={userAddress.shippingaddress && !clickButton1 ? true : false}
                        disabled={
                          userAddress.shippingaddress5 &&
                          buttonvalue5 === 'Edit'
                        }
                      />
                    </div>
                    <br />
                    <Button
                      value={buttonvalue5}
                      className={`w-max ${Styles.button}`}
                      type="submit"
                    />
                  </form>
                ) : null}
              </div>
            </div>
          </Container>
        </Fullcontainer>
      </Layout>
    </React.Fragment>
  );
};

export default ManageAddress;
