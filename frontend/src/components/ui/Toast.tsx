import { Transition } from "@headlessui/react";
import { Fragment } from "react";

type ToastProps = {
  open: boolean;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export function Toast({ open, message, type = "success", onClose }: ToastProps) {
  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transform transition duration-300"
      enterFrom="translate-y-4 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transform transition duration-300"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="translate-y-4 opacity-0"
    >
      <div
        className={`fixed top-5 right-5 z-50 max-w-xs w-full rounded-lg shadow-lg p-4 text-white ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {message}
        <button
          onClick={onClose}
          className="ml-2 font-bold text-white hover:opacity-80 float-right"
        >
          ×
        </button>
      </div>
    </Transition>
  );
}
