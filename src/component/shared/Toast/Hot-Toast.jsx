// import { BorderBottom } from "@mui/icons-material";
import toast from "react-hot-toast";

const customStyle = {
  backgroundColor: "#000",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "normal",
  paddingInline: "15px",
  paddingBlock: "25px",
  borderRadius: "5px",
  //   borderBottom: "2px solid #7950f2",
};

export const showToast = (message, type = "light") => {
  return toast.success(message, {
    duration: 4000,
    position: "bottom-right",
    // autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: true,
    theme: type,
    className: "toast-message",
    style: customStyle,
  });
};

export const showErrorToast = (message, type = "light") => {
  return toast.error(message, {
    duration: 4000,
    position: "bottom-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: true,
    theme: type,
    className: "toast-message",
    style: customStyle,
  });
};
