import { toast } from "react-toastify";

const ToastHelper = {
  errorToast: (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: true,
    });
  },

  successToast: (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: true,
    });
  },
};

export default ToastHelper;
