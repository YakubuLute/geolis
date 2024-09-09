import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const showToast = (message, type = "dark") => {
    return toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress:true,
      theme: type,
      className: "toast-message",
    });
  };


export function ToastWrapper() {
  return <ToastContainer />;
}