import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

interface AlertPopupProps {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: "success" | "error";
}

// NOTE: This component is not used. Should we keep it?
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
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </TransitionChild>

                {/* Modal */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
                            <DialogTitle
                                className={`text-lg font-semibold ${
                                    type === "success"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {title}
                            </DialogTitle>

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
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
}
