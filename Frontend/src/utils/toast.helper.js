import { toast } from "react-toastify";

const ToastHelper = {
  errorToast: (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  },

  successToast: (message) => {
    message,
      {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
      };
  },
};

export default ToastHelper;
