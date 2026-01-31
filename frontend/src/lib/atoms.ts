import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type ToastState = {
    open: boolean;
    message: string;
    type: string;
};

export const filterValueAtom = atom<"all" | "available">("all");
export const isBuildingMapOpenAtom = atom(false);
export const toastStateAtom = atom<ToastState>({
    open: false,
    message: "",
    type: "success",
});
export const tokenAtom = atomWithStorage("token", "");
