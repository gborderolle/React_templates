//s: https://code.tutsplus.com/creating-pretty-popup-messages-using-sweetalert2--cms-30662t

import Swal, { SweetAlertIcon } from "sweetalert2";

export default function showToastMessage({
  title,
  icon = "success",
  timer = 2000,
  callback,
}: ToastOptions) {
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  toast
    .fire({
      icon: icon,
      title: title,
      position: "center",
    })
    .then(() => {
      // Aquí llamas al callback después de que el toast se haya mostrado
      if (callback) {
        callback();
      }
    });
}

interface ToastOptions {
  title: string;
  icon?: SweetAlertIcon;
  timer?: number;
  callback?: () => void;
}
