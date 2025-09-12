import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MdClose } from 'react-icons/md';
const DialogModal = ({
  isOpen,
  modalHandler,
  title,
  children,
  customClass
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={modalHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`relative mx-4 max-h-[700px] w-full max-w-[600px] transform rounded-lg bg-white text-left align-middle shadow-xl transition-all ${customClass}`}
              >
                {title ? (
                  <HeaderWithTitle title={title} modalHandler={modalHandler} />
                ) : (
                  <HeaderWithoutTitle modalHandler={modalHandler} />
                )}
                <div className="Dashboard_Ai_Modal max-h-[600px] overflow-y-auto px-5 py-5 z-20 text-[#2e2e2e]">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogModal;

const HeaderWithTitle = ({ title, modalHandler, customClass }) => {
  return (
    <div
      className={`sticky left-0 top-0 flex w-full items-center justify-between rounded-t-lg border-b border-b-[#bbb8b87d] bg-white p-4 ${customClass}`}
    >
      {/* <Heading title={t(title)} /> */}
      <h1 className="text-lg text-bold text-gray-500">{title}</h1>
      <button
        className="border-0 font-semibold leading-none outline-none focus:outline-none"
        onClick={modalHandler}
      >
        <MdClose className="text-lg" />
      </button>
    </div>
  );
};

const HeaderWithoutTitle = ({ modalHandler }) => {
  return (
    <div className="sticky left-0 top-0 flex w-full items-center justify-end rounded-t-lg bg-white p-4">
      <button
        className="border-0 font-semibold leading-none outline-none focus:outline-none"
        onClick={modalHandler}
      >
        <MdClose className="text-lg" />
      </button>
    </div>
  );
};
