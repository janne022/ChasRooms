import { useCallback, useRef } from "react";
import { useSetAtom } from "jotai";
import { toastStateAtom } from "@lib/atoms";

export const useToast = () => {
    const setToastState = useSetAtom(toastStateAtom);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = useCallback(
        (
            message: string,
            type: "success" | "error",
            duration: number = 3000,
        ) => {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            setToastState({ open: true, message, type });

            timeoutRef.current = setTimeout(() => {
                setToastState((prev) => ({ ...prev, open: false }));
                timeoutRef.current = null;
            }, duration);
        },
        [setToastState],
    );

    return { show };
};
