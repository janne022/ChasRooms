import { toastStateAtom } from "@/lib/atoms";
import { Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { Fragment } from "react";
import clsx from "clsx";
import { X } from "lucide-react";

export default function Toast() {
    const [{ type, open, message }, setToastState] = useAtom(toastStateAtom);
    const backgroundColorStyles =
        type === "success" ? "bg-green-600" : "bg-red-600";

    const handleClose = () => {
        setToastState((prev) => ({ ...prev, open: false }));
    };

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
                className={clsx(
                    "fixed top-5 right-5 z-50 w-full max-w-xs rounded-lg p-4 text-white shadow-lg",
                    backgroundColorStyles,
                )}
            >
                {message}
                <button
                    onClick={handleClose}
                    className="float-right ml-2 font-bold text-white hover:opacity-80"
                >
                    <X />
                </button>
            </div>
        </Transition>
    );
}
