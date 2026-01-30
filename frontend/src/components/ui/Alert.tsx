import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type AlertPopupProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
};

export function AlertPopup({
  open,
  onClose,
  title,
  message,
  type = "success",
}: AlertPopupProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
              <Dialog.Title
                className={`text-lg font-semibold ${
                  type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {title}
              </Dialog.Title>

              <p className="mt-2 text-sm text-gray-600">
                {message}
              </p>

              <button
                onClick={onClose}
                className={`mt-4 w-full rounded-lg px-4 py-2 text-white ${
                  type === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                OK
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
