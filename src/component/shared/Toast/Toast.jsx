import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const customStyle = {
  // backgroundColor: "#dc3545",
  // color: "#fff",
  fontSize:'13px'
};

export const showToast = (message, type = "dark",) => {
    return toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress:true,
      theme: type,
      className: "toast-message",
      style: customStyle,
    });
  };

export const showErrorToast = (message, type = "light",) => {
    return toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
      // autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress:true,
      theme: type,
      className: "toast-message",
      style:customStyle,
    });
  };


export function ToastWrapper() {
  return <ToastContainer />;
}