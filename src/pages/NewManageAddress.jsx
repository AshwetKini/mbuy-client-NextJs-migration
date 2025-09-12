import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Fullcontainer from '../components/UI/Fullcontainer';
import Container from '../components/UI/Container';
import UserDetailsSideTable from '../components/UI/UserDetailsSideTable';
import Button from '../components/UI/Button';
import Styles from './Profile.module.css';
import { getUser } from '../apis/api';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import DialogModal from '../components/DialogModal';
import ManageAddressForm from '../components/ManageAddressForm';
import Preloader from '../components/Preloader';

const lengthOfAddress = [1, 2, 3, 4, 5];
const NewManageAddress = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModalIndex, setOpenModalIndex] = useState();
  const [alreadyAddress, setAlreadyAddress] = useState(0);
  const [isAddressLoaded, setIsAddressLoaded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteOpenModalIndex, setDeleteOpenModalIndex] = useState();

  const fetchUser = async () => {
    setIsAddressLoaded(false);
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    const response = await getUser(userFromLocalStorage._id);
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      setIsAddressLoaded(true);
    }
  };

  const checkExisitingAddresses = () => {
    if (user) {
      lengthOfAddress.map((item) => {
        if (user[`shippingaddress${item}`].length > 0) {
          setAlreadyAddress(item);
        }
      });
    }
  };

  const modalHandler = (item) => {
    setIsModalOpen(!isModalOpen);
    setOpenModalIndex(item);
  };

  const deleteModalHandler = (item = 0) => {
    // console.log('deleteModalHandler');
    setIsDeleteModalOpen((prev) => !prev);
    setDeleteOpenModalIndex(item);
  };

  //   const deleteAddressHandler = async (item) => {
  //     const userAddressDeleted = {
  //       ...user,
  //       [`shippingaddress${item}`]: '',
  //       [`shippingpincode${item}`]: '',
  //       [`billingname${item}`]: '',
  //       [`billingaddress${item}`]: '',
  //       [`billingpincode${item}`]: ''
  //     };
  //   };

  useLayoutEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    checkExisitingAddresses();
  }, [user]);

  return (
    <Fragment>
      <DialogModal
        title={`Address ${openModalIndex}`}
        isOpen={isModalOpen}
        modalHandler={modalHandler}
      >
        <ManageAddressForm
          addressIndex={openModalIndex}
          parentUser={user}
          modalHandler={modalHandler}
          fetchUser={fetchUser}
        />
      </DialogModal>
      {/* <DialogModal
        isOpen={isDeleteModalOpen}
        modalHandler={deleteModalHandler}
      >
        <div className="w-full flex justify-center items-center flex-col mb-[40px]">
          <h1>Are you sure you want to delete?</h1>
          {user ? (
            <div className="border mt-2 p-2 shadow rounded">
              <h1 className="text-lg text-center font-semibold">
                {' '}
                Address {deleteOpenModalIndex}
              </h1>
              <h1>
                <span className="font-semibold">Shipping Address: </span>
                {user[`shippingaddress${deleteOpenModalIndex}`]}
              </h1>
              <h1>
                <span className="font-semibold">Shipping Pincode: </span>
                {user[`shippingpincode${deleteOpenModalIndex}`]}
              </h1>
              <h1>
                <span className="font-semibold">Billing Name: </span>
                {user[`billingname${deleteOpenModalIndex}`]}
              </h1>
              <h1>
                <span className="font-semibold">Billing Address: </span>
                {user[`billingaddress${deleteOpenModalIndex}`]}
              </h1>
              <h1>
                <span className="font-semibold">Billing Pincode: </span>
                {user[`billingpincode${deleteOpenModalIndex}`]}
              </h1>
            </div>
          ) : (
            ''
          )}
          <Button value={'delete'} />
        </div>
      </DialogModal> */}
      <Layout>
        <Fullcontainer className="bg-[#f3f3f3] min-h-[70vh] py-[10px]">
          <Container className="border bg-white px-[20px] py-[10px]">
            <div className="grid grid-cols-8 gap-4">
              <div className="col-span-8 md:col-span-2 hidden md:block">
                <UserDetailsSideTable />
              </div>
              <div className="col-span-8 md:col-span-6">
                <div className="w-full flex items-start justify-between">
                  <div>
                    <h1
                      className="text-lg font-semibold sm:text-3xl"
                      style={{ color: '#102c44' }}
                    >
                      Address Details
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-md">
                      Manage your Addresses.
                    </p>
                  </div>
                  <div>{isAddressLoaded && alreadyAddress < 5 ? (
                    <Button
                      value="Add Address"
                      className={`${Styles.button} scale-90 sm:scale-100`}
                      onClick={() => modalHandler(alreadyAddress + 1)}
                    />
                  ) : (
                    ''
                  )}
                  </div>

                </div>
                {isAddressLoaded ? (
                  <div className="mt-3 flex flex-col gap-y-3">
                    {lengthOfAddress.map((item, index) => {
                      if (user && user[`shippingaddress${item}`].length > 0) {
                        return (
                          <div
                            className="rounded-lg shadow border p-4"
                            key={index}
                          >
                            <div className="flex item-center w-full justify-between">
                              <h1 className="text-bold text-xl">
                                Address {item}
                              </h1>
                              <div className="flex gap-x-3 items-center">
                                <div
                                  className="flex item-center cursor-pointer"
                                  onClick={() => modalHandler(item)}
                                >
                                  <CiEdit className="text-xl" />
                                  <p className="text-slate-500 text-sm sm:text-md">
                                    Edit
                                  </p>
                                </div>
                                {/* <h1>|</h1>
                                <div
                                  className="flex item-center cursor-pointer"
                                  onClick={() => deleteModalHandler(item)}
                                >
                                  <MdDeleteOutline className="text-xl" />
                                </div> */}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                              <div>
                                <h1>
                                  <span className="font-semibold">
                                    Shipping Address:{' '}
                                  </span>
                                  {user[`shippingaddress${item}`]}
                                </h1>
                                <h1>
                                  <span className="font-semibold">
                                    Shipping Pincode:{' '}
                                  </span>
                                  {user[`shippingpincode${item}`]}
                                </h1>
                                <h1>
                                  <span className="font-semibold">
                                    Billing Name:{' '}
                                  </span>
                                  {user[`billingname${item}`]}
                                </h1>
                                <h1>
                                  <span className="font-semibold">
                                    Billing Address:{' '}
                                  </span>
                                  {user[`billingaddress${item}`]}
                                </h1>
                                <h1>
                                  <span className="font-semibold">
                                    Billing Pincode:{' '}
                                  </span>
                                  {user[`billingpincode${item}`]}
                                </h1>
                              </div>
                            </div>
                          </div>
                        );
                      } else if (
                        item === 5 &&
                        user &&
                        user[`shippingaddress1`].length < 1
                      ) {
                        return (
                          <div
                            className="w-full h-[60vh] flex justify-center items-center"
                            key={index}
                          >
                            <h1>No Address Found</h1>
                          </div>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <Preloader />
                )}
              </div>
            </div>
          </Container>
        </Fullcontainer>
      </Layout>
    </Fragment>
  );
};

export default NewManageAddress;
